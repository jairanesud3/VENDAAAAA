import React from 'react';
import { Zap, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeroProps {
  onNavigate?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section className="flex flex-col items-center text-center max-w-6xl mx-auto mb-20 relative z-10 pt-28 px-4">
      
      {/* Glow Centralizado (Ambiente) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-purple-600/15 blur-[120px] rounded-full pointer-events-none -z-10"></div>

      {/* Badge / Pill */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-purple-500/30 bg-[#1e0b36]/80 backdrop-blur-md mb-10 shadow-[0_0_25px_rgba(168,85,247,0.2)]"
      >
        <Sparkles className="w-3.5 h-3.5 text-purple-300" />
        <span className="text-sm font-medium text-purple-200 tracking-wide">
          Nova IA V.2.5: Crie campanhas vencedoras sozinho
        </span>
      </motion.div>

      {/* Título Principal */}
      <motion.h1 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-7xl md:text-9xl font-extrabold tracking-tighter mb-6 leading-[1] md:leading-[1.1] relative z-10 font-sans"
      >
        <span className="block text-white drop-shadow-2xl">Transforme Produtos</span>
        <span className="block text-[#34D399] drop-shadow-[0_0_35px_rgba(52,211,153,0.5)]">
          em Dinheiro.
        </span>
      </motion.h1>

      {/* Subtítulo (Pink) */}
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-5xl md:text-7xl font-bold mb-10 text-[#EC4899] drop-shadow-[0_0_25px_rgba(236,72,153,0.4)] tracking-tight"
      >
        Anúncios Virais em 30s.
      </motion.h2>

      {/* Descrição */}
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-xl md:text-2xl text-slate-300 max-w-4xl mb-14 leading-relaxed font-medium"
      >
        A IA treinada para Vendas Online. Gere <span className="text-white font-bold">textos que convencem</span> e <br className="hidden md:block" />
        <span className="text-white font-bold">imagens de estúdio</span> instantaneamente.
      </motion.p>

      {/* Botões de Ação */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="flex flex-col sm:flex-row items-center gap-6 w-full justify-center"
      >
         <button 
           onClick={onNavigate}
           className="px-12 py-6 bg-white text-black font-extrabold rounded-2xl shadow-[0_0_40px_rgba(255,255,255,0.4)] hover:shadow-[0_0_60px_rgba(255,255,255,0.6)] hover:scale-105 transition-all flex items-center gap-3 text-xl group"
         >
            <Zap className="w-6 h-6 fill-black group-hover:animate-pulse" />
            <span>COMEÇAR AGORA</span>
         </button>
         
         <button 
            onClick={onNavigate}
            className="px-10 py-6 rounded-2xl border border-white/10 text-white font-bold hover:bg-white/5 hover:border-white/30 transition-all flex items-center gap-3 text-xl backdrop-blur-sm"
         >
            Ver Demo em Vídeo
         </button>
      </motion.div>
    </section>
  );
};

export default Hero;