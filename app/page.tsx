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
    <main className="min-h-screen bg-[#fdf6e3] dark:bg-[#2e2a25] text-[#4b2e2e] dark:text-[#d9c7a5] py-12 px-6 sm:px-10 font-sans transition-colors duration-500">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-extrabold tracking-tight">Quote Generator</h1>
          <ModeToggle />
        </div>

        {/* Input Section */}
        <div className="flex gap-2 flex-col sm:flex-row">
          <Input
            placeholder="Enter a keyword (e.g., motivation)"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => {
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
        <div className="flex flex-wrap gap-3 justify-center">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => {
                setKeyword(tag);
                handleSearch(tag);
              }}
              className="px-4 py-2 rounded-full border border-[#c9b391] dark:border-[#a58f66] text-[#4b2e2e] dark:text-[#d9c7a5] bg-white/80 dark:bg-[#3d3322] hover:bg-[#f2e5d1] dark:hover:bg-[#4a3b27] font-semibold tracking-wide shadow-sm transition-all duration-300"
              style={{ fontFamily: "Georgia, serif" }}
            >
              {tag.charAt(0).toUpperCase() + tag.slice(1)}
            </button>
          ))}
        </div>

        {/* Result Count */}
        {keyword && results.length > 0 && (
          <div className="text-center">
            <h2 className="text-xl font-bold mt-6 mb-2">
              Quotes for: <span className="italic">{keyword}</span>
            </h2>
            <p className="text-sm text-[#806a5a] dark:text-[#b4a78e] italic">
              {results.length} quote{results.length !== 1 && "s"} found
            </p>
          </div>
        )}

        {/* Quotes Display */}
        {results.length > 0 ? (
          <div ref={quoteRef} className="space-y-6 mt-4">
            {results.map((q, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="rounded-2xl border border-[#e5d8c0] dark:border-[#7f7152] p-6 bg-white/80 dark:bg-[#3a3123] shadow-lg"
              >
                <div className="flex gap-3">
                  <div className="text-xl font-bold text-[#c9b391] dark:text-[#d1b280]">
                    {index + 1}.
                  </div>
                  <div>
                    <p className="text-lg italic leading-relaxed text-[#4b2e2e] dark:text-[#d9c7a5]">
                      “{q.quote}”
                    </p>
                    <p className="text-sm text-right mt-2 text-[#806a5a] dark:text-[#b4a78e]">
                      — {q.author}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          keyword && (
            <p className="text-red-600 dark:text-red-400 italic text-center">
              No matching quotes found.
            </p>
          )
        )}

        {/* Download Button */}
        {results.length > 0 && (
          <div className="text-center mt-6">
            <div className="inline-block rounded-full bg-[#f3e9da] dark:bg-[#4b3c29] px-6 py-4 shadow-md">
              <Button
                onClick={handleDownload}
                className="bg-[#4b2e2e] dark:bg-[#d1b280] text-white dark:text-[#4b2e2e] rounded-full px-6 py-2 hover:bg-[#3a1f1f] dark:hover:bg-[#b39356] transition duration-300"
              >
                Download All Quotes as Image
              </Button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
