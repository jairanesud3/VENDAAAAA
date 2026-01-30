import React from 'react';
import { Zap, PlayCircle, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeroProps {
  onNavigate?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section className="flex flex-col items-center text-center max-w-7xl mx-auto mb-20 relative z-10 pt-24 px-4">
      
      {/* Ambiente de Fundo (Glow) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-purple-900/20 blur-[130px] rounded-full pointer-events-none -z-10 animate-pulse-slow"></div>

      {/* Trust Badge / Novidade */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/5 bg-white/5 backdrop-blur-md mb-8 hover:bg-white/10 transition-colors cursor-default"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22c55e] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22c55e]"></span>
        </span>
        <span className="text-xs font-bold text-slate-300 tracking-wide uppercase">
          Nova Engine V4.0: Vendas Automáticas
        </span>
      </motion.div>

      {/* Título Principal (H1 High-Ticket) */}
      <motion.h1 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-6xl md:text-8xl font-extrabold tracking-tight mb-6 leading-[1.1]"
      >
        <span className="block text-white drop-shadow-2xl">Transforme Produtos</span>
        <span className="block mt-2">
          em <span className="text-[#22c55e] drop-shadow-[0_0_60px_rgba(34,197,94,0.6)] animate-pulse-slow">
            DINHEIRO.
          </span>
        </span>
      </motion.h1>

      {/* Subtítulo (Correção do 30 Segundos) */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col md:flex-row items-center gap-3 justify-center mb-10"
      >
        <span className="text-2xl md:text-4xl font-bold text-slate-200">Anúncios Virais em</span>
        {/* Efeito Neon Puro sem fundo sólido */}
        <span 
          className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-400 to-purple-500 italic transform -skew-x-6"
          style={{ 
            filter: 'drop-shadow(0 0 25px rgba(168, 85, 247, 0.6))',
            WebkitTextStroke: '1px rgba(255,255,255,0.1)'
          }}
        >
          30 SEGUNDOS.
        </span>
      </motion.div>

      {/* Descrição Persuasiva */}
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-lg md:text-xl text-slate-400 max-w-2xl mb-12 leading-relaxed font-medium"
      >
        A única IA treinada com <span className="text-white font-semibold">20.000+ anúncios vencedores</span>. 
        Gere copy de alta conversão, imagens de estúdio 4K e personas sem precisar de designer.
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
           className="relative px-10 py-5 bg-white text-black font-extrabold rounded-xl shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.5)] hover:scale-[1.02] transition-all flex items-center gap-3 overflow-hidden group border-2 border-transparent hover:border-purple-500"
         >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-700 skew-x-12"></div>
            <Zap className="w-6 h-6 fill-black" />
            <span className="text-lg tracking-wide">COMEÇAR AGORA</span>
         </button>
         
         <button className="px-10 py-5 rounded-xl border border-white/10 text-white font-bold hover:bg-white/5 transition-all flex items-center gap-3 group">
            <PlayCircle className="w-6 h-6 group-hover:text-primary transition-colors" />
            Ver Demo em Vídeo
         </button>
      </motion.div>

      {/* Prova Social "Avatares" */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-16 flex flex-col md:flex-row items-center gap-6 text-sm text-slate-500 font-medium"
      >
         <div className="flex -space-x-3">
            {[
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
                "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop",
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
            ].map((src, i) => (
                <img key={i} src={src} alt="User" className="w-10 h-10 rounded-full border-2 border-[#05010D] object-cover ring-2 ring-white/10" />
            ))}
         </div>
         <div className="flex flex-col items-start">
             <div className="flex text-yellow-500 mb-1">★★★★★</div>
             <span>Usado por <span className="text-white font-bold">10.000+</span> Dropshippers Elite</span>
         </div>
      </motion.div>
    </section>
  );
};

export default Hero;