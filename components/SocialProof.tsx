import React from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: "Ricardo Mattos",
    role: "Dropshipper Elite (7 Dígitos)",
    quote: "A copy que essa IA gerou me fez bater R$ 14.000,00 em um único dia. Eu demitiria meu copywriter hoje.",
    badge: "Faturou R$ 14k/dia",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
    delay: 0
  },
  {
    name: "Juliana Costa",
    role: "Dona da 'Moda Vibe'",
    quote: "Estava gastando R$ 2.000 com fotógrafo. O Studio AI fez fotos melhores de graça em 5 segundos.",
    badge: "Economizou R$ 2k/mês",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
    delay: 0.2
  },
  {
    name: "Carlos Ferraz",
    role: "Gestor de Tráfego",
    quote: "O filtro anti-bloqueio é absurdo. Minhas contas pararam de cair no Facebook Ads. ROI subiu pra 5.5.",
    badge: "ROI 5.5 (Escala)",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop",
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
                    Quem Usa, <span className="text-accentGreen">Imprime Dinheiro.</span>
                </h2>
                <p className="text-lg text-slate-400 font-medium max-w-2xl mx-auto">
                    Não somos mais uma "ferramentinha". Somos a arma secreta dos maiores players do mercado.
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
                        className="bg-surface border border-white/5 p-8 rounded-2xl hover:border-white/10 transition-all flex flex-col h-full glass-card group"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <div className="relative">
                              <img 
                                src={t.image} 
                                alt={t.name}
                                className="w-14 h-14 rounded-full border-2 border-white/10 object-cover group-hover:border-primary transition-colors"
                              />
                              <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-[#0A0510]" title="Verificado"></div>
                            </div>
                            <div>
                                <h4 className="text-white font-bold text-lg">{t.name}</h4>
                                <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">{t.role}</span>
                            </div>
                        </div>
                        <p className="text-slate-300 italic mb-6 text-lg flex-grow leading-relaxed">"{t.quote}"</p>
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