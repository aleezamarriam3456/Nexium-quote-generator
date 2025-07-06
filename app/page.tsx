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
    <main className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Quote Generator</h1>
        <ModeToggle />
      </div>

      <div className="flex gap-2">
        <Input
          placeholder="Enter a keyword (e.g., motivation)"
          value={keyword}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setKeyword(e.target.value)}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") handleSearch();
          }}
        />
        <Button onClick={() => handleSearch()}>Search</Button>
      </div>

      <div className="flex gap-2 flex-wrap">
        {tags.map((tag) => (
          <Button
            key={tag}
            variant="outline"
            onClick={() => {
              setKeyword(tag);
              handleSearch(tag);
            }}
          >
            {tag}
          </Button>
        ))}
      </div>

      {keyword && (
        <p className="text-sm text-gray-500">
          {results.length} quote{results.length !== 1 && "s"} found for "{keyword}"
        </p>
      )}

      {results.length > 0 ? (
        <div className="space-y-4" ref={quoteRef}>
          {results.map((q, index) => (
            <motion.div
              key={index}
              className="p-4 rounded-md shadow-md border bg-muted"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-lg italic">“{q.quote}”</p>
              <p className="text-right text-sm mt-2">— {q.author}</p>
            </motion.div>
          ))}
        </div>
      ) : (
        keyword && <p className="text-red-500">No matching quotes found.</p>
      )}

      {results.length > 0 && (
        <Button onClick={handleDownload} className="mt-4">
          Download All Quotes as Image
        </Button>
      )}
    </main>
  );
}
