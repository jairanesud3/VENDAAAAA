import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-jakarta'
});

export const metadata: Metadata = {
  title: "DropHacker AI - Transforme Produtos em Dinheiro",
  description: "A única IA treinada com 20.000+ anúncios vencedores. Escale seu Dropshipping.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={`${jakarta.variable} font-sans bg-[#05010D] text-slate-200 antialiased selection:bg-purple-500/30 selection:text-white overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}