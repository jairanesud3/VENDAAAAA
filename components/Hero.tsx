import React from 'react';
import { ArrowRight, Play, Check } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeroProps {
  onNavigate?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section className="flex flex-col items-center text-center max-w-6xl mx-auto mb-20 relative z-10 pt-10">
      
      {/* 10x Speed Orb Background (CSS Animation in index.html) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/20 blur-[100px] rounded-full pointer-events-none -z-10 animate-pulse-fast opacity-50"></div>

      {/* Badge */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8 hover:bg-white/10 transition-colors cursor-default"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accentGreen opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accentGreen"></span>
        </span>
        <span className="text-sm font-medium text-slate-300">
          Nova IA V.2.5: O Poder do Gemini Flash
        </span>
      </motion.div>

      {/* Headline */}
      <motion.h1 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-6xl md:text-8xl font-extrabold tracking-tight mb-6 leading-[1.1]"
      >
        <span className="block text-white">Transforme Produtos</span>
        <span className="block mt-2">
          em <span className="text-transparent bg-clip-text bg-gradient-to-r from-accentGreen to-emerald-400 drop-shadow-[0_0_20px_rgba(34,197,94,0.4)]">
            DINHEIRO.
          </span>
        </span>
      </motion.h1>

      {/* Sub-headline */}
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-2xl md:text-3xl font-bold text-white mb-6"
      >
        Anúncios Virais em <span className="relative inline-block px-2 text-white italic transform -skew-x-6 bg-primaryNeon/20 border border-primaryNeon/50 rounded shadow-[0_0_15px_rgba(217,70,239,0.5)]">30 SEGUNDOS</span>.
      </motion.h2>

      {/* Description */}
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-lg md:text-xl text-slate-400 max-w-3xl mb-10 leading-relaxed"
      >
        A IA treinada para Vendas Online. Gere <span className="text-white font-semibold">textos que convencem</span> e <span className="text-white font-semibold">imagens de estúdio</span> instantaneamente.
      </motion.p>

      {/* NEW PAYMENT / CONVERSION BOX */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-surface/50 border border-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 w-full max-w-2xl relative overflow-hidden shadow-2xl"
      >
        {/* Glow behind box */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>

        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Option A: Free Trial */}
          <div className="w-full md:w-1/2">
             <button 
               onClick={onNavigate}
               className="w-full py-4 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 transition-all flex flex-col items-center gap-1 group"
             >
                <span className="text-lg group-hover:text-white transition-colors">Começar Teste Grátis</span>
                <span className="text-xs text-slate-500 font-normal">Sem cartão de crédito necessário</span>
             </button>
          </div>

          <div className="text-slate-500 font-bold text-sm">OU</div>

          {/* Option B: Pro Plan (Pulsing) */}
          <div className="w-full md:w-1/2 relative group">
             <div className="absolute -inset-1 bg-gradient-to-r from-primary to-primaryNeon rounded-xl blur opacity-30 group-hover:opacity-60 transition duration-500 animate-pulse"></div>
             <button 
               onClick={onNavigate}
               className="relative w-full py-4 bg-gradient-to-r from-primary to-primaryDark text-white font-bold rounded-xl shadow-neon-primary hover:scale-[1.02] transition-all flex flex-col items-center gap-1 overflow-hidden"
             >
                {/* Shine Effect */}
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] skew-x-12 group-hover:translate-x-[200%] transition-transform duration-700"></div>
                
                <span className="text-lg flex items-center gap-2">
                  Plano Pro - R$ 97,00 <ArrowRight className="w-4 h-4" />
                </span>
                <span className="text-xs text-white/80 font-normal bg-black/20 px-2 py-0.5 rounded-full">
                  Oferta por tempo limitado
                </span>
             </button>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs text-slate-400">
           <div className="flex items-center gap-1.5">
             <Check className="w-3 h-3 text-accentGreen" /> Cancelamento fácil
           </div>
           <div className="flex items-center gap-1.5">
             <Check className="w-3 h-3 text-accentGreen" /> 7 dias de garantia
           </div>
           <div className="flex items-center gap-1.5">
             <Check className="w-3 h-3 text-accentGreen" /> Acesso imediato
           </div>
        </div>

      </motion.div>
    </section>
  );
};

export default Hero;