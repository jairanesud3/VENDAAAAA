import type { Metadata } from "next";
import React from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "DropHacker AI - Transforme Produtos em Dinheiro",
  description: "A IA secreta dos maiores dropshippers do Brasil.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans antialiased bg-[#05010D] text-white min-h-screen selection:bg-purple-500/30 selection:text-white">
        <div className="living-bg">
            <div className="orb-1"></div>
            <div className="orb-2"></div>
        </div>
        {children}
      </body>
    </html>
  );
}