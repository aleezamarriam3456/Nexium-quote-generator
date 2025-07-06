"use client";

import React, { useState, useRef } from "react";
import { quotes } from "@/data/quotes";
import html2canvas from "html2canvas";
import { Input } from "@/component/ui/input";      // components (plural)
import { Button } from "@/component/ui/button";    // components (plural)
import { motion } from "framer-motion";
import { ModeToggle } from "@/component/mode-toggle";  // components (plural)

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
    <main className="min-h-screen bg-[#fdf6e3] dark:bg-[#2e2a25] text-[#4b2e2e] dark:text-[#d9c7a5] py-12 px-6 sm:px-10 font-sans transition-colors duration-500">
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setKeyword(e.target.value)
            }
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === "Enter") handleSearch();
            }}
            className="bg-[#fffaf2] dark:bg-[#3b342c] border-[#d9c7a5] dark:border-[#6f675e] text-[#4b2e2e] dark:text-[#d9c7a5] placeholder:text-[#a48c7b] dark:placeholder:text-[#b4a78e] rounded-full px-4 py-2 focus:ring-2 focus:ring-[#c9b391] dark:focus:ring-[#a58f66] transition-colors duration-300"
          />
          <Button
            onClick={() => handleSearch()}
            className="bg-[#4b2e2e] dark:bg-[#d1b280] text-white dark:text-[#4b2e2e] rounded-full px-6 py-2 shadow-md hover:bg-[#3a1f1f] dark:hover:bg-[#b39356] transition duration-300"
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
              onClick={() => {
                setKeyword(tag);
                handleSearch(tag);
              }}
              className="border-[#c9b391] dark:border-[#a58f66] text-[#4b2e2e] dark:text-[#d9c7a5] rounded-full px-4 py-2 hover:bg-[#f3e9da] dark:hover:bg-[#4b3c29] shadow-sm transition duration-300"
            >
              {tag}
            </Button>
          ))}
        </div>

        {/* Result Count */}
        {keyword && (
          <p className="text-sm text-[#806a5a] dark:text-[#b4a78e] italic transition-colors duration-300">
            {results.length} quote{results.length !== 1 && "s"} found for "{keyword}"
          </p>
        )}

        {/* Quotes Display */}
        {results.length > 0 ? (
          <div className="space-y-4" ref={quoteRef}>
            {results.map((q, index) => (
              <motion.div
                key={index}
                className="p-6 rounded-xl border border-[#e5d8c0] dark:border-[#7f7152] bg-white/70 dark:bg-[#4b432e]/90 backdrop-blur shadow-md transition-all hover:scale-[1.02]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <p className="text-lg italic font-medium text-[#4b2e2e] dark:text-[#d9c7a5]">
                  “{q.quote}”
                </p>
                <p className="text-sm text-right mt-2 text-[#806a5a] dark:text-[#b4a78e]">
                  — {q.author}
                </p>
              </motion.div>
            ))}
          </div>
        ) : (
          keyword && (
            <p className="text-red-600 dark:text-red-400 italic">
              No matching quotes found.
            </p>
          )
        )}

        {/* Download Button */}
        {results.length > 0 && (
          <Button
            onClick={handleDownload}
            className="bg-[#4b2e2e] dark:bg-[#d1b280] text-white dark:text-[#4b2e2e] rounded-full px-6 py-2 shadow-md hover:bg-[#3a1f1f] dark:hover:bg-[#b39356] transition duration-300 mt-4"
          >
            Download All Quotes as Image
          </Button>
        )}
      </div>
    </main>
  );
}
