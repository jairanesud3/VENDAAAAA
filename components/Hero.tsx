import React from 'react';
import { Zap, PlayCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeroProps {
  onNavigate?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section className="flex flex-col items-center text-center max-w-7xl mx-auto mb-20 relative z-10 pt-20 px-4">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/10 blur-[130px] rounded-full pointer-events-none -z-10 animate-pulse-slow"></div>

      {/* Trust Badge */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/5 bg-white/5 backdrop-blur-md mb-8 hover:bg-white/10 transition-colors cursor-default"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
        </span>
        <span className="text-xs font-bold text-slate-300 tracking-wide uppercase">
          Nova Engine V4.0 Disponível
        </span>
      </motion.div>

      {/* Headline Aggressive */}
      <motion.h1 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-6xl md:text-8xl font-extrabold tracking-tight mb-6 leading-[1.1]"
      >
        <span className="block text-white drop-shadow-2xl">Transforme Produtos</span>
        <span className="block mt-1">
          em <span className="text-[#22c55e] drop-shadow-[0_0_50px_rgba(34,197,94,0.6)] animate-pulse-slow">
            DINHEIRO.
          </span>
        </span>
      </motion.h1>

      {/* Sub-headline Neon Clean */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col md:flex-row items-center gap-3 justify-center mb-8"
      >
        <span className="text-2xl md:text-4xl font-bold text-slate-200">Anúncios Virais em</span>
        <span 
          className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 italic transform -skew-x-6"
          style={{ filter: 'drop-shadow(0 0 20px rgba(168, 85, 247, 0.5))' }}
        >
          30 SEGUNDOS.
        </span>
      </motion.div>

      {/* Value Proposition */}
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-lg text-slate-400 max-w-2xl mb-10 leading-relaxed font-medium"
      >
        A única IA treinada com <span className="text-white font-semibold">20.000+ anúncios vencedores</span>. 
        Gere copy de alta conversão, imagens de estúdio e personas sem precisar de designer ou copywriter.
      </motion.p>

      {/* High-Ticket CTA */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center"
      >
         <button 
           onClick={onNavigate}
           className="relative px-8 py-5 bg-white text-black font-bold rounded-xl shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:shadow-[0_0_60px_rgba(255,255,255,0.3)] hover:scale-[1.02] transition-all flex items-center gap-3 overflow-hidden group"
         >
            <Zap className="w-5 h-5 fill-black" />
            <span className="text-lg tracking-wide">COMEÇAR GRÁTIS</span>
         </button>
         
         <button className="px-8 py-5 rounded-xl border border-white/10 text-white font-bold hover:bg-white/5 transition-all flex items-center gap-3">
            <PlayCircle className="w-5 h-5" />
            Ver Demo em Vídeo
         </button>
      </motion.div>

      {/* Social Proof (Micro) */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-12 flex items-center gap-4 text-xs text-slate-500 font-medium bg-white/5 px-6 py-3 rounded-full backdrop-blur-sm border border-white/5"
      >
         <div className="flex -space-x-2">
            {[1,2,3,4].map(i => (
                <div key={i} className="w-6 h-6 rounded-full bg-slate-700 border border-[#05010D]"></div>
            ))}
         </div>
         <span>Usado por +10.000 Dropshippers Elite</span>
      </motion.div>
    </section>
  );
};

export default Hero;