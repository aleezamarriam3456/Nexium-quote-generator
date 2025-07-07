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
  // State to hold current keyword for searching quotes
  const [keyword, setKeyword] = useState("");

  // State to hold filtered quote results based on keyword search
  const [results, setResults] = useState<typeof quotes>([]);

  // Ref for the quotes container, used for image/pdf download
  const quoteRef = useRef<HTMLDivElement | null>(null);

  // Preset tags for quick filtering
  const tags = ["Motivation", "Success", "Growth", "Leadership", "Focus"];

  // Static dashboard stats for demo purpose
  const totalQuotes = 30;
  const totalTags = 44;

  // Function to filter quotes by tag keyword (case-insensitive)
  const handleSearch = (key = keyword) => {
    const filtered = quotes.filter((q) =>
      q.tags.some((tag) => tag.toLowerCase().includes(key.toLowerCase()))
    );
    setResults(filtered.slice(0, 3)); // Limit results to first 3
  };

  // Clears search input and results
  const handleClearSearch = () => {
    setKeyword("");
    setResults([]);
  };

  // Downloads the visible quote list as an image (PNG)
  const handleDownloadImage = async () => {
    if (quoteRef.current) {
      const canvas = await html2canvas(quoteRef.current);
      const link = document.createElement("a");
      link.download = "quotes.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    }
  };

  // Downloads the visible quote list as a PDF file
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    results.forEach((q, i) => {
      doc.text(`${i + 1}. "${q.quote}" — ${q.author}`, 10, 20 + i * 20);
    });
    doc.save("quotes.pdf");
  };

  return (
    <>
      <main className="min-h-screen bg-[#fdf6e3] dark:bg-[#2e2a25] text-[#4b2e2e] dark:text-[#d9c7a5] py-12 px-6 sm:px-10 transition-colors duration-500 flex flex-col">
        <div className="max-w-2xl mx-auto space-y-8 font-sans flex-grow">
          {/* Header Section with Title and Theme Toggle */}
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-extrabold tracking-tight">Quote Generator</h1>
            <ModeToggle />
          </div>

          {/* Dashboard Section showing stats and buttons */}
          <section className="dashboard">
            {/* Display total quotes */}
            <div>
              <p>Total Quotes</p>
              <p className="text-3xl">{totalQuotes}</p>
            </div>

            {/* Display unique tags count */}
            <div>
              <p>Unique Tags</p>
              <p className="text-3xl">{totalTags}</p>
            </div>

            {/* Dashboard buttons: Mode toggle and Clear search */}
            <div className="dashboard-buttons">
              <ModeToggle />
              <Button
                onClick={handleClearSearch}
                className="bg-[#4b2e2e] dark:bg-[#d1b280] text-white dark:text-[#4b2e2e] rounded-full px-6 py-2 shadow-md hover:bg-[#3a1f1f] dark:hover:bg-[#b39356] transition duration-300"
              >
                Clear Search
              </Button>
            </div>
          </section>

          {/* Search Input and Search Button stacked vertically */}
          <div className="flex flex-col gap-3 max-w-md mx-auto">
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
              className="bg-[#4b2e2e] text-white dark:bg-[#d1b280] dark:text-[#4b2e2e] px-6 py-2 rounded-full font-medium shadow-md hover:shadow-lg hover:bg-[#3a1f1f] dark:hover:bg-[#b39356] transition duration-300 mx-auto"
            >
              Search
            </button>
          </div>

          {/* Tag Buttons for quick search */}
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  setKeyword(tag);
                  handleSearch(tag);
                }}
                className="px-5 py-2 rounded-full border border-[#c9b391] dark:border-[#a58f66] bg-white/80 dark:bg-[#3d3322] text-[#4b2e2e] dark:text-[#d9a78e] hover:bg-[#f2e5d1] dark:hover:bg-[#4a3b27] font-semibold tracking-wide shadow-sm transition-all duration-300"
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Display number of quotes found for the keyword */}
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

          {/* List of quotes matching the search */}
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
            // Show message if no quotes found for entered keyword
            keyword && (
              <p className="text-red-600 dark:text-red-400 italic text-center mt-4">
                No matching quotes found.
              </p>
            )
          )}

          {/* Download buttons shown only if there are results */}
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

      {/* Footer Section */}
      <footer>
        {/* Copyright text */}
        <p>© 2025 Nexium — Inspiring Quotes for You</p>

        {/* Footer buttons with simple alert actions */}
        <div className="footer-buttons">
          <Button
            onClick={() => alert("Contact us at contact@nexium.com")}
            className="bg-[#4b2e2e] dark:bg-[#d1b280] text-white dark:text-[#4b2e2e] rounded-full px-6 py-2 shadow-md hover:bg-[#3a1f1f] dark:hover:bg-[#b39356] transition duration-300"
          >
            Contact Us
          </Button>
          <Button
            onClick={() => alert("Privacy policy page")}
            className="bg-[#6a4e3d] dark:bg-[#e4c89d] text-white dark:text-[#4b2e2e] rounded-full px-6 py-2 shadow-md hover:bg-[#553628] dark:hover:bg-[#d2b37e] transition duration-300"
          >
            Privacy Policy
          </Button>
        </div>
      </footer>
    </>
  );
}
