import "./globals.css";
import { ThemeProvider } from "next-themes"; // Correct import
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quote Generator",
  description: "Get motivational quotes instantly",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className="min-h-screen bg-[#fdf6e3] dark:bg-[#2e2a25] font-sans antialiased text-[#4b2e2e] dark:text-[#d9c7a5] transition-colors duration-500">
        <ThemeProvider attribute="class" enableSystem={true} defaultTheme="light">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
