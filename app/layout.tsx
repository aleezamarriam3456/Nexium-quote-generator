import "./globals.css";
import { ThemeProvider } from "../component/theme-provider";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quote Generator",
  description: "Get motivational quotes instantly",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
