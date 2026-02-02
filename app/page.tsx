"use client";

import Link from 'next/link';
import { motion } from "framer-motion";
import { Zap, Play, Star, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden bg-[#05010D]">
      
      {/* --- AURORA ANIMATION BACKGROUND --- */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
              rotate: [0, 90, 0]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-[-20%] left-[20%] w-[800px] h-[800px] bg-purple-600/20 blur-[150px] rounded-full mix-blend-screen" 
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
              x: [-100, 100, -100]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full mix-blend-screen" 
          />
          {/* Noise Texture for Professional Matte Finish */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.07] brightness-100 contrast-150 mix-blend-overlay"></div>
      </div>

      {/* --- NAVBAR --- */}
      <nav className="fixed top-0 w-full z-50 bg-[#05010D]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-9 h-9 bg-white text-black rounded-lg flex items-center justify-center font-bold shadow-lg shadow-white/10 transition-transform group-hover:scale-105">
              <Zap className="w-5 h-5 fill-black" />
            </div>
            <span className="text-lg font-bold tracking-tight text-white">DROPHACKER</span>
          </div>
          
          <div className="flex items-center gap-8">
            <Link href="/login" className="text-sm font-medium text-slate-400 hover:text-white transition-colors hidden md:block">
              Login
            </Link>
            <Link href="/onboarding">
              <button className="bg-white text-black px-6 py-2.5 rounded-full text-sm font-bold hover:bg-slate-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                 Começar Grátis
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-48 pb-32 px-6 z-10 flex flex-col items-center text-center">
        
        {/* Badge Minimalista */}
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8 hover:border-white/20 transition-colors cursor-default"
        >
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.8)]"></span>
            <span className="text-xs font-semibold text-slate-300 tracking-wide uppercase">
              Engine V4.0 Disponível
            </span>
        </motion.div>

        {/* HEADLINE PROFISSIONAL & LIMPA */}
        <motion.h1 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "circOut" }}
            className="text-5xl md:text-8xl font-sans font-bold tracking-tighter mb-8 text-slate-100 leading-[1.1] max-w-4xl"
        >
            A <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">Nova Era</span> <br />
            do Dropshipping.
        </motion.h1>

        {/* SUBTITLE */}
        <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-slate-400 max-w-xl mx-auto mb-12 leading-relaxed font-medium"
        >
            Crie anúncios, imagens e copys validadas em segundos.
        </motion.p>

        {/* CTA BUTTONS */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center"
        >
            <Link href="/onboarding" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-slate-100 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 text-base shadow-xl shadow-white/5">
                    Criar Conta Gratuita <ArrowRight className="w-4 h-4" />
                </button>
            </Link>
            
            <button className="w-full sm:w-auto px-8 py-4 rounded-xl border border-white/10 text-slate-300 font-semibold hover:bg-white/5 hover:text-white transition-all flex items-center justify-center gap-2 text-base backdrop-blur-sm">
                <Play className="w-4 h-4 fill-current" />
                Ver como funciona
            </button>
        </motion.div>

        {/* SOCIAL PROOF MINIMALISTA */}
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-center gap-8 text-sm text-slate-500"
        >
            <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                    {[1,2,3,4].map((i) => (
                        <div key={i} className="w-8 h-8 rounded-full bg-slate-800 border-2 border-[#05010D] overflow-hidden grayscale hover:grayscale-0 transition-all">
                            <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" className="w-full h-full object-cover" />
                        </div>
                    ))}
                </div>
                <span className="font-medium text-slate-400">+10.000 usuários ativos</span>
            </div>
            <div className="hidden md:block w-px h-4 bg-white/10"></div>
            <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-white text-white" />
                <Star className="w-4 h-4 fill-white text-white" />
                <Star className="w-4 h-4 fill-white text-white" />
                <Star className="w-4 h-4 fill-white text-white" />
                <Star className="w-4 h-4 fill-white text-white" />
                <span className="ml-2 font-medium text-slate-400">4.9/5 Avaliação média</span>
            </div>
        </motion.div>

      </section>

    </div>
  );
}