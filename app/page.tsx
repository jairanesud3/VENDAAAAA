"use client";

import Link from 'next/link';
import { ArrowRight, Play, Zap, Star, Shield, CheckCircle2 } from 'lucide-react';
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden">
      
      {/* --- AURORA BACKGROUND (ALIVE) --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
          <motion.div 
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
              x: [-50, 50, -50],
              y: [-20, 20, -20],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px] mix-blend-screen"
          />
          <motion.div 
             animate={{
                scale: [1.1, 1, 1.1],
                opacity: [0.2, 0.4, 0.2],
                x: [20, -20, 20],
                y: [50, -50, 50],
              }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] mix-blend-screen"
          />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
      </div>

      {/* --- NAVBAR --- */}
      <nav className="fixed top-0 w-full z-50 bg-[#05010D]/70 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-10 h-10 bg-gradient-to-tr from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(147,51,234,0.3)] group-hover:shadow-[0_0_30px_rgba(147,51,234,0.5)] transition-all duration-300">
              <Zap className="w-6 h-6 text-white fill-white" />
            </div>
            <span className="text-lg font-extrabold tracking-wide text-white">DROPHACKER</span>
          </div>
          
          <div className="flex items-center gap-6">
            <Link href="/login" className="text-sm font-medium text-slate-400 hover:text-white transition-colors hidden md:block">
              Login
            </Link>
            <Link href="/onboarding" className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur opacity-60 group-hover:opacity-100 transition duration-200"></div>
              <button className="relative bg-black px-6 py-2.5 rounded-full text-sm font-bold text-white flex items-center gap-2 hover:bg-slate-900 transition-all border border-white/10">
                 Começar Grátis
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-40 pb-32 px-6 z-10 flex flex-col items-center text-center">
        
        {/* Badge V4 */}
        <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8 hover:bg-white/10 transition-colors cursor-default"
        >
            <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22c55e] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22c55e]"></span>
            </span>
            <span className="text-[10px] md:text-xs font-bold text-slate-300 tracking-widest uppercase">
            Nova Engine V4.0 Liberada
            </span>
        </motion.div>

        {/* Headline Agressiva */}
        <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-8xl font-black tracking-tight mb-8 leading-[1.1] text-white max-w-5xl"
        >
            Transforme Produtos
            <br />
            em <span className="text-[#22c55e] drop-shadow-[0_0_40px_rgba(34,197,94,0.6)] animate-pulse-slow">
            DINHEIRO.
            </span>
        </motion.h1>

        {/* Subtitle Neon Clean (SEM FUNDO) */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col md:flex-row items-center gap-3 md:gap-4 justify-center mb-12"
        >
            <span className="text-2xl md:text-4xl font-bold text-slate-200">
                Anúncios Virais em
            </span>
            <span 
                className="text-3xl md:text-5xl font-black italic transform -skew-x-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-500"
                style={{ 
                    filter: 'drop-shadow(0 0 25px rgba(168, 85, 247, 0.5))',
                    WebkitTextStroke: '0.5px rgba(255,255,255,0.1)' 
                }}
            >
                30 SEGUNDOS.
            </span>
        </motion.div>

        {/* Descrição */}
        <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-lg text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed font-medium"
        >
            A única IA treinada com <span className="text-white">20.000+ anúncios vencedores</span>. 
            Gere copy de alta conversão, imagens de estúdio e personas sem precisar de designer.
        </motion.p>

        {/* CTA Buttons High-Ticket */}
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row items-center gap-5 w-full justify-center mb-20"
        >
            <Link href="/onboarding" className="group relative w-full sm:w-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-white/80 to-slate-200 rounded-xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                <button className="relative w-full sm:w-auto px-10 py-5 bg-white text-black font-extrabold rounded-xl shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:scale-[1.02] transition-all flex items-center justify-center gap-3 text-lg">
                    <Zap className="w-5 h-5 fill-black" />
                    COMEÇAR AGORA
                </button>
            </Link>
            
            <button className="px-10 py-5 rounded-xl border border-white/10 text-white font-bold hover:bg-white/5 hover:border-white/20 transition-all flex items-center gap-3 backdrop-blur-sm group">
                <Play className="w-5 h-5 fill-white/20 group-hover:fill-white transition-colors" />
                Ver Demo em Vídeo
            </button>
        </motion.div>

        {/* Social Proof Bar */}
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex flex-col md:flex-row items-center gap-6 px-6 py-3 rounded-full bg-white/5 border border-white/5 backdrop-blur-md"
        >
            <div className="flex -space-x-3">
                {[1,2,3,4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-slate-700 border-2 border-[#05010D] flex items-center justify-center overflow-hidden">
                        <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" className="w-full h-full object-cover" />
                    </div>
                ))}
            </div>
            <div className="text-sm font-medium text-slate-400">
                <span className="text-white font-bold">4.9/5</span> de satisfação de <span className="text-white font-bold">10.000+</span> usuários.
            </div>
        </motion.div>

      </section>

      {/* --- DASHBOARD PREVIEW (Tilt Effect) --- */}
      <section className="relative px-4 pb-32 z-10">
        <div className="max-w-6xl mx-auto perspective-1000">
            <motion.div 
                initial={{ rotateX: 15, opacity: 0, y: 50 }}
                whileInView={{ rotateX: 0, opacity: 1, y: 0 }}
                transition={{ duration: 1, type: "spring", bounce: 0.2 }}
                viewport={{ once: true }}
                className="relative rounded-2xl border border-white/10 bg-[#0A0510] shadow-2xl shadow-purple-900/20 overflow-hidden group"
            >
                {/* Glow Behind */}
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 via-transparent to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                
                {/* Fake Browser Header */}
                <div className="h-10 border-b border-white/5 bg-[#0F0518] flex items-center px-4 gap-2">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                    </div>
                    <div className="ml-4 px-3 py-1 rounded bg-black/40 border border-white/5 text-[10px] text-slate-500 font-mono">
                        app.drophacker.ai
                    </div>
                </div>

                {/* Dashboard Image / Content */}
                <div className="aspect-[16/9] bg-[#05010D] relative flex items-center justify-center overflow-hidden">
                    {/* Placeholder Grid Animation */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]"></div>
                    
                    <div className="z-10 text-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg shadow-purple-500/30">
                            <Zap className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">Dashboard Pro V4</h3>
                        <p className="text-slate-500">Interface Inteligente de Alta Conversão</p>
                    </div>
                </div>
            </motion.div>
        </div>
      </section>

    </div>
  );
}