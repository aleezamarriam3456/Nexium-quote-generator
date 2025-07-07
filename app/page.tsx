"use client";

import React, { useState, useRef } from "react";
import { quotes } from "@/data/quotes";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Input } from "@/component/ui/input";
import { Button } from "@/component/ui/button";
import { motion } from "framer-motion";
import { ModeToggle } from "@/component/mode-toggle";

export default function Home() {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState<typeof quotes>([]);
  const quoteRef = useRef<HTMLDivElement | null>(null);

  const tags = ["Motivation", "Success", "Growth", "Leadership", "Focus"];

  const handleSearch = (key = keyword) => {
    const filtered = quotes.filter((q) =>
      q.tags.some((tag) => tag.toLowerCase().includes(key.toLowerCase()))
    );
    setResults(filtered.slice(0, 3));
  };

  const handleDownloadImage = async () => {
    if (quoteRef.current) {
      const canvas = await html2canvas(quoteRef.current);
      const link = document.createElement("a");
      link.download = "quotes.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    }
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    results.forEach((q, i) => {
      doc.text(`${i + 1}. "${q.quote}" — ${q.author}`, 10, 20 + i * 20);
    });
    doc.save("quotes.pdf");
  };

  return (
    <main className="min-h-screen bg-[#fdf6e3] dark:bg-[#2e2a25] text-[#4b2e2e] dark:text-[#d9c7a5] py-12 px-6 sm:px-10 transition-colors duration-500">
      <div className="max-w-2xl mx-auto space-y-8 font-sans">
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
            className="bg-white dark:bg-[#3a3123] border border-[#c9b391] text-[#4b2e2e] dark:text-[#d9c7a5] placeholder:text-[#a48c7b] dark:placeholder:text-[#b4a78e] rounded-full px-4 py-2 focus:ring-2 focus:ring-[#c9b391] dark:focus:ring-[#a58f66]"
          />
         <button
          onClick={() => handleSearch()}
          className="bg-[#4b2e2e] text-white dark:bg-[#d1b280] dark:text-[#4b2e2e] px-6 py-2 rounded-full font-medium shadow-md hover:shadow-lg hover:bg-[#3a1f1f] dark:hover:bg-[#b39356] transition duration-300"
            >
           Search
          </button>

        </div>

        {/* Tag Buttons */}
        <div className="flex flex-wrap justify-center gap-3">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => {
                setKeyword(tag);
                handleSearch(tag);
              }}
              className="px-5 py-2 rounded-full border border-[#c9b391] dark:border-[#a58f66] bg-white/80 dark:bg-[#3d3322] text-[#4b2e2e] dark:text-[#d9c7a5] hover:bg-[#f2e5d1] dark:hover:bg-[#4a3b27] font-semibold tracking-wide shadow-sm transition-all duration-300"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Result Count */}
        {keyword && results.length > 0 && (
          <div className="text-center mt-4">
            <h2 className="text-xl font-bold">
              Quotes for: <span className="italic">{keyword}</span>
            </h2>
            <p className="text-sm text-[#806a5a] dark:text-[#b4a78e] italic">
              {results.length} quote{results.length !== 1 && "s"} found
            </p>
          </div>
        )}

        {/* Quotes List */}
        {results.length > 0 ? (
          <div ref={quoteRef} className="mt-6 space-y-4">
            <ul className="list-disc list-inside space-y-4">
              {results.map((q, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-white/70 dark:bg-[#3a3123] border border-[#e5d8c0] dark:border-[#7f7152] rounded-xl px-5 py-4 shadow-md"
                >
                  <p className="text-lg italic leading-relaxed">
                    “{q.quote}”
                  </p>
                  <p className="text-right mt-2 text-sm font-medium text-[#806a5a] dark:text-[#b4a78e]">
                    — {q.author}
                  </p>
                </motion.li>
              ))}
            </ul>
          </div>
        ) : (
          keyword && (
            <p className="text-red-600 dark:text-red-400 italic text-center mt-4">
              No matching quotes found.
            </p>
          )
        )}

        {/* Download Buttons */}
        {results.length > 0 && (
          <div className="text-center mt-8 space-y-4">
            <div className="inline-block rounded-full bg-[#f3e9da] dark:bg-[#4b3c29] px-6 py-4 shadow-md space-x-4">
              <Button
                onClick={handleDownloadImage}
                className="bg-[#4b2e2e] dark:bg-[#d1b280] text-white dark:text-[#4b2e2e] rounded-full px-6 py-2 hover:bg-[#3a1f1f] dark:hover:bg-[#b39356] transition duration-300"
              >
                Download as Image
              </Button>
              <Button
                onClick={handleDownloadPDF}
                className="bg-[#6a4e3d] dark:bg-[#e4c89d] text-white dark:text-[#4b2e2e] rounded-full px-6 py-2 hover:bg-[#553628] dark:hover:bg-[#d2b37e] transition duration-300"
              >
                Download as PDF
              </Button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
