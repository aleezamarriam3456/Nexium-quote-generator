import "./globals.css";
import { ThemeProvider } from "@/component/theme-provider"; // ✅ Correct path if file exists
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quote Generator",
  description: "Get motivational quotes instantly",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className="min-h-screen font-sans antialiased bg-[#fdf6e3] text-[#4b2e2e] dark:bg-[#2e2a25] dark:text-[#d9c7a5] transition-colors duration-500">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
