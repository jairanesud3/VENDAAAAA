import React from 'react';
import { MessageSquare, Image, Shield, Zap, Layout, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const featuresData = [
  {
    icon: MessageSquare,
    color: 'text-primary',
    bg: 'bg-primary/10',
    title: 'Copywriting Humano',
    desc: 'Esqueça textos robóticos. Frameworks AIDA/PAS integrados para alta conversão.'
  },
  {
    icon: Image,
    color: 'text-pink-500',
    bg: 'bg-pink-500/10',
    title: 'Studio AI',
    desc: 'Gere fotos de produtos em qualquer cenário (mesa de luxo, modelos) instantaneamente.'
  },
  {
    icon: Shield,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
    title: 'Anti-Bloqueio',
    desc: 'Criativos validados contra políticas do Facebook Ads para evitar restrições.'
  },
  {
    icon: Zap,
    color: 'text-accentYellow',
    bg: 'bg-accentYellow/10',
    title: 'Velocidade Absurda',
    desc: 'Campanhas em 5 minutos. Teste 10 produtos/dia e escale o que funciona.'
  },
  {
    icon: Layout,
    color: 'text-accentGreen',
    bg: 'bg-accentGreen/10',
    title: 'Landing Pages',
    desc: 'Gerador de páginas de vendas completas para Shopify e outras plataformas.'
  },
  {
    icon: Globe,
    color: 'text-indigo-500',
    bg: 'bg-indigo-500/10',
    title: 'Multilíngue',
    desc: 'Tradução automática e adaptação cultural para +30 idiomas globais.'
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const Features: React.FC = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-0 w-full h-[500px] bg-primary/5 blur-[120px] pointer-events-none -z-10 transform -translate-y-1/2"></div>

      {/* Section Headers */}
      <div className="text-center mb-16 px-4">
        <motion.h3 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-extrabold text-white mb-4"
        >
          Por que escolher o <span className="text-primary">DropAI</span>?
        </motion.h3>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-lg text-slate-400 max-w-2xl mx-auto"
        >
          Nossa IA foi desenhada especificamente para substituir times inteiros de marketing.
        </motion.p>
      </div>

      {/* Grid */}
      <motion.div 
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-4"
      >
        {featuresData.map((feature, index) => (
          <motion.div 
            key={index} 
            variants={item}
            className="group bg-card/50 backdrop-blur-sm border border-white/5 rounded-2xl p-8 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] hover:-translate-y-2 cursor-default"
          >
            <div className={`w-14 h-14 rounded-xl ${feature.bg} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-inner`}>
              <feature.icon className={`w-7 h-7 ${feature.color}`} />
            </div>
            <h4 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
              {feature.title}
            </h4>
            <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
              {feature.desc}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Features;