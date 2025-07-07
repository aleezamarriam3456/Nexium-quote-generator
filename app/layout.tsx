import "./globals.css";
import { ThemeProvider } from "next-themes";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quote Generator",
  description: "Get motivational quotes instantly",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className="min-h-screen font-sans antialiased transition-colors duration-500"
      >
        <ThemeProvider attribute="class" enableSystem={true} defaultTheme="light">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
