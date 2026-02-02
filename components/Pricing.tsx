import React from 'react';
import { Check, Lock, Zap, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Pricing: React.FC = () => {
  // Triggers navigation in the parent App component
  const triggerCheckout = () => {
    if (typeof window !== 'undefined') {
        const event = new CustomEvent('navigate-checkout');
        window.dispatchEvent(event);
    }
  };

  return (
    <section className="py-24 bg-[#05010D] relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold text-white mb-4"
          >
            Investimento Inteligente
          </motion.h2>
          <p className="text-slate-400 text-lg">
            Escolha a velocidade do seu crescimento.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center perspective-1000">
          
          {/* Card 1: Iniciante */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-surface border border-white/5 rounded-3xl p-8 relative hover:border-white/20 transition-all group"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md border border-white/10 px-4 py-1 rounded-full text-[10px] font-bold text-slate-300 uppercase tracking-wider">
                Melhor Custo-Benefício
            </div>
            <div className="flex justify-between items-center mb-6 mt-2">
              <h3 className="text-xl font-bold text-white">INICIANTE</h3>
            </div>
            <div className="mb-8">
              <span className="text-3xl font-bold text-white">R$ 49,90</span>
              <span className="text-slate-500">/mês</span>
            </div>
            <ul className="space-y-4 mb-8">
              {['800 Gerações de Texto', '60 Imagens', 'Suporte Email'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-300 text-sm">
                  <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-slate-400" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
            <button 
                onClick={triggerCheckout}
                className="w-full py-3 rounded-full border border-white/20 text-white font-bold hover:bg-white hover:text-black transition-all duration-300"
            >
              Assinar Básico
            </button>
          </motion.div>

          {/* Card 2: Escala Pro (Aggressive Highlight) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.03 }}
            viewport={{ once: true }}
            className="bg-[#0F0518] rounded-3xl p-8 relative transform md:scale-110 z-10 shadow-2xl shadow-primary/10 border border-primary/20"
          >
            {/* Animated Border Gradient */}
            <div className="absolute inset-0 rounded-3xl p-[2px] bg-gradient-to-br from-primary via-purple-500 to-transparent opacity-50 pointer-events-none">
                 <div className="absolute inset-0 bg-[#0F0518] rounded-[22px]" />
            </div>

            <div className="relative z-10">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-purple-600 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg flex items-center gap-1">
                  <Zap className="w-3 h-3 fill-white" /> Recomendado
                </div>
                
                <div className="flex justify-between items-center mb-6 mt-4">
                  <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                    ESCALA PRO
                  </h3>
                </div>
                <div className="mb-8">
                  <div className="text-slate-500 line-through text-sm">De R$ 299</div>
                  <div className="flex items-end gap-1">
                    <span className="text-5xl font-extrabold text-white">R$ 97,00</span>
                    <span className="text-slate-400 mb-1">/mês</span>
                  </div>
                </div>
                <ul className="space-y-4 mb-8">
                  {[
                    'Textos Ilimitados', 
                    '300 Imagens de Estúdio', 
                    'Studio Product AI (4K)', 
                    'Anti-Bloqueio Avançado', 
                    'Suporte VIP WhatsApp'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-white font-medium">
                      <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
                <motion.button 
                  onClick={triggerCheckout}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-4 rounded-full bg-gradient-to-r from-primary to-purple-600 text-white font-bold shadow-lg shadow-primary/25 hover:shadow-primary/50 transition-all duration-300 mb-4 flex items-center justify-center gap-2"
                >
                  Quero Escalar Vendas <ArrowRight className="w-4 h-4" />
                </motion.button>
                <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
                  <Lock className="w-3 h-3" />
                  Pagamento Seguro SSL
                </div>
            </div>
          </motion.div>

          {/* Card 3: Enterprise */}
          <motion.div 
             initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-surface border border-white/5 rounded-3xl p-8 relative opacity-80 hover:opacity-100 transition-opacity"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">ENTERPRISE</h3>
            </div>
            <div className="mb-8">
              <span className="text-3xl font-bold text-white">Consulte</span>
            </div>
            <ul className="space-y-4 mb-8">
              {['API Dedicada', 'Múltiplos Usuários', 'Onboarding Personalizado', 'Contrato SLA'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-400 text-sm">
                  <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-slate-400" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
            <button className="w-full py-3 rounded-full bg-white/5 text-white font-bold border border-white/10 hover:bg-white/10 transition-all duration-300">
              Falar com Vendas
            </button>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Pricing;