import React from 'react';
import { Zap, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeroProps {
  onNavigate?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section className="flex flex-col items-center text-center max-w-5xl mx-auto mb-20 relative z-10 pt-20 px-4">
      
      {/* Glow Centralizado (Ambiente) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-purple-600/20 blur-[120px] rounded-full pointer-events-none -z-10"></div>

      {/* Badge / Pill */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-900/30 backdrop-blur-md mb-8 shadow-[0_0_15px_rgba(168,85,247,0.15)]"
      >
        <Sparkles className="w-3 h-3 text-purple-300" />
        <span className="text-xs md:text-sm font-medium text-purple-200 tracking-wide">
          Nova IA V.2.5: Crie campanhas vencedoras sozinho
        </span>
      </motion.div>

      {/* Título Principal */}
      <motion.h1 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-6xl md:text-8xl font-extrabold tracking-tight mb-4 leading-[1.1] md:leading-[1.1] relative z-10"
      >
        <span className="block text-white drop-shadow-xl">Transforme Produtos</span>
        <span className="block text-[#34D399] drop-shadow-[0_0_25px_rgba(52,211,153,0.4)]">
          em Dinheiro.
        </span>
      </motion.h1>

      {/* Subtítulo (Pink) */}
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(236,72,153,0.3)]"
      >
        Anúncios Virais em 30s.
      </motion.h2>

      {/* Descrição */}
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-lg md:text-xl text-slate-300 max-w-3xl mb-12 leading-relaxed font-medium"
      >
        A IA treinada para Vendas Online. Gere <span className="text-white font-bold">textos que convencem</span> e <br className="hidden md:block" />
        <span className="text-white font-bold">imagens de estúdio</span> instantaneamente.
      </motion.p>

      {/* Botões de Ação */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="flex flex-col sm:flex-row items-center gap-5 w-full justify-center"
      >
         <button 
           onClick={onNavigate}
           className="px-10 py-5 bg-white text-black font-extrabold rounded-xl shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:shadow-[0_0_50px_rgba(255,255,255,0.5)] hover:scale-105 transition-all flex items-center gap-3 text-lg group"
         >
            <Zap className="w-6 h-6 fill-black group-hover:animate-pulse" />
            <span>COMEÇAR AGORA</span>
         </button>
         
         {/* Botão Secundário - Teste Grátis (Substituindo o vídeo demo conforme pedido anterior) */}
         <button 
            onClick={onNavigate}
            className="px-8 py-5 rounded-xl border border-white/10 text-white font-bold hover:bg-white/5 hover:border-white/30 transition-all flex items-center gap-3 text-lg backdrop-blur-sm"
         >
            Testar Grátis
         </button>
      </motion.div>
    </section>
  );
};

export default Hero;