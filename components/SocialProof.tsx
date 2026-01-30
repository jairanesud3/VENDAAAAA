import React from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: "Ricardo Mattos",
    role: "E-commerce Pet",
    quote: "Meu ROAS saiu de 1.8 para 4.2 em 3 dias.",
    badge: "+133% de ROAS",
    initials: "RM",
    delay: 0
  },
  {
    name: "Juliana Costa",
    role: "Loja de Moda",
    quote: "As imagens parecem ensaios fotográficos de estúdio.",
    badge: "Economia de R$ 2.5k/mês",
    initials: "JC",
    delay: 0.2
  },
  {
    name: "Carlos Ferraz",
    role: "Gestor de Tráfego",
    quote: "O filtro anti-bloqueio é real, parei de tomar shadowban.",
    badge: "CTR de 3.5% (Média)",
    initials: "CF",
    delay: 0.4
  }
];

const SocialProof: React.FC = () => {
  return (
    <section className="py-24 bg-[#05010D] relative overflow-hidden">
        {/* Subtle Gradient Background */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/10 via-[#05010D] to-[#05010D] pointer-events-none"></div>

        <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
                    Quem Usa, <span className="text-accentGreen">Escala.</span>
                </h2>
                <p className="text-lg text-slate-400 font-medium">
                    Não acredite na nossa palavra. Veja os resultados de quem parou de perder tempo.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {testimonials.map((t, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: t.delay, duration: 0.5 }}
                        whileHover={{ y: -10, boxShadow: '0 10px 30px -10px rgba(168, 85, 247, 0.2)' }}
                        className="bg-surface border border-white/5 p-8 rounded-2xl hover:border-white/10 transition-all flex flex-col h-full glass-card"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center font-bold text-white border border-white/5">
                                {t.initials}
                            </div>
                            <div>
                                <h4 className="text-white font-bold text-lg">{t.name}</h4>
                                <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">{t.role}</span>
                            </div>
                        </div>
                        <p className="text-slate-300 italic mb-6 text-lg flex-grow">"{t.quote}"</p>
                        <div className="flex items-center justify-between mt-auto">
                            <div className="flex text-yellow-500 gap-0.5">
                                {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-current" />)}
                            </div>
                            <span className="bg-accentGreen/10 text-accentGreen px-3 py-1.5 rounded-full text-xs font-bold border border-accentGreen/20 shadow-[0_0_10px_rgba(34,197,94,0.1)]">
                                {t.badge}
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
  );
};
export default SocialProof;