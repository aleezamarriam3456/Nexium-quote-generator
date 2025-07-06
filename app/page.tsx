"use client";

import React, { useState, useRef } from "react";
import { quotes } from "@/data/quotes";
import html2canvas from "html2canvas";
import { Input } from "@/component/ui/input";
import { Button } from "@/component/ui/button";
import { motion } from "framer-motion";
import { ModeToggle } from "@/component/mode-toggle";

export default function Home() {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState<typeof quotes>([]);
  const quoteRef = useRef<HTMLDivElement | null>(null);

  const tags = ["motivation", "success", "growth", "leadership", "focus"];

  const handleSearch = (key = keyword) => {
    const filtered = quotes.filter((q) =>
      q.tags.some((tag) => tag.toLowerCase().includes(key.toLowerCase()))
    );
    setResults(filtered.slice(0, 3));
  };

  const handleDownload = async () => {
    if (quoteRef.current) {
      const canvas = await html2canvas(quoteRef.current);
      const link = document.createElement("a");
      link.download = "quotes.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    }
  };

  return (
    <main className="min-h-screen bg-[#fdf6e3] text-[#4b2e2e] py-12 px-6 sm:px-10 font-sans">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold tracking-tight">Quote Generator</h1>
          <ModeToggle />
        </div>

        {/* Input Section */}
        <div className="flex gap-2 flex-col sm:flex-row">
          <Input
            placeholder="Enter a keyword (e.g., motivation)"
            value={keyword}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setKeyword(e.target.value)}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === "Enter") handleSearch();
            }}
            className="bg-[#fffaf2] border-[#d9c7a5] text-[#4b2e2e] placeholder:text-[#a48c7b]"
          />
          <Button
            onClick={() => handleSearch()}
            className="bg-[#4b2e2e] text-white hover:bg-[#3a1f1f]"
          >
            Search
          </Button>
        </div>

        {/* Tag Buttons */}
        <div className="flex gap-2 flex-wrap">
          {tags.map((tag) => (
            <Button
              key={tag}
              variant="outline"
              className="border-[#c9b391] text-[#4b2e2e] hover:bg-[#f7f1e4]"
              onClick={() => {
                setKeyword(tag);
                handleSearch(tag);
              }}
            >
              {tag}
            </Button>
          ))}
        </div>

        {/* Result Count */}
        {keyword && (
          <p className="text-sm text-[#806a5a] italic">
            {results.length} quote{results.length !== 1 && "s"} found for "{keyword}"
          </p>
        )}

        {/* Quotes Display */}
        {results.length > 0 ? (
          <div className="space-y-4" ref={quoteRef}>
            {results.map((q, index) => (
              <motion.div
                key={index}
                className="p-6 rounded-xl border border-[#e5d8c0] bg-white/70 backdrop-blur shadow-md transition-all hover:scale-[1.02]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <p className="text-lg italic font-medium text-[#4b2e2e]">“{q.quote}”</p>
                <p className="text-sm text-right mt-2 text-[#806a5a]">— {q.author}</p>
              </motion.div>
            ))}
          </div>
        ) : (
          keyword && <p className="text-red-600 italic">No matching quotes found.</p>
        )}

        {/* Download Button */}
        {results.length > 0 && (
          <Button
            onClick={handleDownload}
            className="bg-[#4b2e2e] text-white hover:bg-[#3a1f1f] mt-4"
          >
            Download All Quotes as Image
          </Button>
        )}
      </div>
    </main>
  );
}
