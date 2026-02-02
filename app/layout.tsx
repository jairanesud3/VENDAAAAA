import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React from "react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

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
    <html lang="pt-BR">
      <body className={`${inter.className} bg-[#05010D] text-white antialiased selection:bg-purple-500/30 selection:text-white`}>
        {children}
      </body>
    </html>
  );
}