import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ErrorHandler from "./components/ErrorHandler";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "LED Display Screen Technical Training",
  description: "Comprehensive bilingual technical training program for LED display screen technology, video walls, and digital signage",
  viewport: "width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
        <meta name="theme-color" content="#0066cc" />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <ErrorHandler />
        {children}
      </body>
    </html>
  );
}
