import React from 'react';
import { Check, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

const Pricing: React.FC = () => {
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
            Planos para todos os níveis
          </motion.h2>
          <p className="text-slate-400 text-lg">
            Escolha a velocidade do seu crescimento.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
          
          {/* Card 1: Iniciante */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-surface border border-white/5 rounded-3xl p-8 relative hover:border-white/10 transition-all"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">INICIANTE</h3>
              <span className="bg-accentGreen/10 text-accentGreen text-xs font-bold px-2 py-1 rounded border border-accentGreen/20">50% OFF</span>
            </div>
            <div className="mb-8">
              <span className="text-3xl font-bold text-white">R$ 49,90</span>
              <span className="text-slate-500">/mês</span>
            </div>
            <ul className="space-y-4 mb-8">
              {['800 Gerações de Texto', '60 Imagens', 'Suporte Email'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-300 text-sm">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
            <button className="w-full py-3 rounded-full border border-white text-white font-bold hover:bg-white hover:text-black transition-all duration-300">
              Assinar Básico
            </button>
          </motion.div>

          {/* Card 2: Escala Pro (Electrified) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            viewport={{ once: true }}
            className="bg-[#0F0518] border-2 border-primary rounded-3xl p-8 relative transform md:scale-105 shadow-neon-purple z-10"
          >
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-pink-500 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg animate-pulse">
              Mais Escolhido
            </div>
            <div className="flex justify-between items-center mb-6 mt-2">
              <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                ESCALA PRO <span className="text-accentYellow animate-pulse-fast">⚡</span>
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
                  <div className="w-5 h-5 rounded-full bg-accentGreen/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-accentGreen" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(168,85,247,0.8)" }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-4 rounded-full bg-gradient-to-r from-primary to-pink-600 text-white font-bold shadow-lg shadow-primary/25 transition-all duration-300 mb-4"
            >
              Quero Escalar Vendas
            </motion.button>
            <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
              <Lock className="w-3 h-3" />
              Pagamento Seguro SSL
            </div>
          </motion.div>

          {/* Card 3: Teste Grátis */}
          <motion.div 
             initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-surface border border-white/5 rounded-3xl p-8 relative opacity-80 hover:opacity-100 transition-opacity"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">TESTE GRÁTIS</h3>
            </div>
            <div className="mb-8">
              <span className="text-3xl font-bold text-white">R$ 0,00</span>
              <span className="text-slate-500">/mês</span>
            </div>
            <ul className="space-y-4 mb-8">
              {['10 Gerações de Texto', '3 Imagens (Low Res)', 'Sem Ferramentas Avançadas'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-400 text-sm">
                  <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-slate-400" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
            <button className="w-full py-3 rounded-full bg-white/5 text-white font-bold border border-white/10 hover:bg-white/10 transition-all duration-300">
              Criar Conta Grátis
            </button>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Pricing;