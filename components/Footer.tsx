import React from 'react';
import { Instagram, Facebook } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-white/10 py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Copyright */}
        <div className="text-slate-500 text-sm">
          © 2026 DROPHACKER.AI
        </div>

        {/* Links */}
        <div className="flex items-center gap-6">
          <a href="#" className="text-slate-500 text-sm hover:text-primary transition-colors">Termos de Uso</a>
          <a href="#" className="text-slate-500 text-sm hover:text-primary transition-colors">Privacidade</a>
          <a href="#" className="text-slate-500 text-sm hover:text-primary transition-colors">Suporte</a>
        </div>

        {/* Socials */}
        <div className="flex items-center gap-4">
          <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all">
            <Instagram className="w-4 h-4" />
          </a>
          <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all">
            <Facebook className="w-4 h-4" />
          </a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;