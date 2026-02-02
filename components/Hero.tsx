import React from 'react';
import { Zap, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeroProps {
  onNavigate?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section className="flex flex-col items-center text-center max-w-7xl mx-auto mb-20 relative z-10 pt-24 px-4 perspective-1000">
      
      {/* Ambiente de Fundo (Glow) */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-purple-900/20 blur-[130px] rounded-full pointer-events-none -z-10"
      ></motion.div>

      {/* Trust Badge / Novidade */}
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8 hover:bg-white/10 hover:border-primary/50 transition-all cursor-default shadow-lg shadow-black/50"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accentGreen opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-accentGreen"></span>
        </span>
        <span className="text-sm font-bold text-slate-200 tracking-wide uppercase">
          Nova Engine V4.0: 100% Automática
        </span>
      </motion.div>

      {/* Título Principal (H1 High-Ticket) */}
      <motion.h1 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-7xl md:text-9xl font-extrabold tracking-tight mb-8 leading-[1.1] relative z-10"
      >
        <span className="block text-white drop-shadow-2xl">Transforme Produtos</span>
        <motion.span 
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="block mt-2"
        >
          em <span className="text-transparent bg-clip-text bg-gradient-to-r from-accentGreen via-emerald-400 to-accentGreen drop-shadow-[0_0_30px_rgba(34,197,94,0.4)] animate-pulse">
            DINHEIRO.
          </span>
        </motion.span>
      </motion.h1>

      {/* Subtítulo */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col md:flex-row items-center gap-4 justify-center mb-12"
      >
        <span className="text-3xl md:text-5xl font-bold text-slate-300">Anúncios Virais em</span>
        <motion.span 
          whileHover={{ scale: 1.1, rotate: -2 }}
          className="text-4xl md:text-6xl font-black text-white bg-primary px-4 py-1 transform -skew-x-12 shadow-[0_0_40px_rgba(168,85,247,0.6)]"
        >
          30 SEGUNDOS
        </motion.span>
      </motion.div>

      {/* Descrição Persuasiva */}
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-xl md:text-2xl text-slate-400 max-w-3xl mb-12 leading-relaxed font-medium"
      >
        A única IA treinada com <span className="text-white font-semibold">20.000+ anúncios vencedores</span>. 
        Gere copy de alta conversão, imagens 4K e personas. <br/>
        <span className="text-primary font-bold">Sem designer. Sem copywriter. Sem desculpas.</span>
      </motion.p>

      {/* Botões de Ação */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, type: "spring", bounce: 0.4 }}
        className="flex flex-col sm:flex-row items-center gap-6 w-full justify-center"
      >
         <button 
           onClick={onNavigate}
           className="relative px-12 py-6 bg-white text-black font-extrabold rounded-2xl shadow-[0_0_50px_rgba(255,255,255,0.4)] hover:shadow-[0_0_80px_rgba(255,255,255,0.6)] hover:scale-105 transition-all flex items-center gap-4 overflow-hidden group text-xl"
         >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-700 skew-x-12"></div>
            <Zap className="w-8 h-8 fill-black" />
            <span>COMEÇAR AGORA</span>
         </button>
         
         <button 
            onClick={onNavigate}
            className="px-10 py-6 rounded-2xl border border-white/20 text-white font-bold hover:bg-white/10 hover:border-primary transition-all flex items-center gap-3 group text-lg backdrop-blur-md"
         >
            <Sparkles className="w-6 h-6 text-accentYellow group-hover:animate-spin" />
            Testar Ferramenta Grátis
            <span className="bg-primary/20 text-primary text-xs px-2 py-1 rounded ml-2 border border-primary/20">10 Créditos</span>
         </button>
      </motion.div>

      {/* Prova Social "Avatares" */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="mt-20 flex flex-col md:flex-row items-center gap-8 text-base text-slate-500 font-medium bg-white/5 p-4 rounded-full border border-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors"
      >
         <div className="flex -space-x-4">
            {[
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
                "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop",
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
            ].map((src, i) => (
                <motion.img 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1.2 + (i * 0.1) }}
                    key={i} 
                    src={src} 
                    alt="User" 
                    className="w-12 h-12 rounded-full border-4 border-[#05010D] object-cover ring-2 ring-white/10" 
                />
            ))}
         </div>
         <div className="flex flex-col items-start pr-4">
             <div className="flex text-yellow-500 mb-1 gap-1">★★★★★</div>
             <span>Usado por <span className="text-white font-bold">12.400+</span> Dropshippers</span>
         </div>
      </motion.div>
    </section>
  );
};

export default Hero;