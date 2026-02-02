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
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const itemVariant = {
  hidden: { opacity: 0, y: 50, scale: 0.8 },
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 12 }
  }
};

const Features: React.FC = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Decor */}
      <motion.div 
        animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.1, 1] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute top-1/2 left-0 w-full h-[500px] bg-primary/5 blur-[120px] pointer-events-none -z-10 transform -translate-y-1/2"
      ></motion.div>

      {/* Section Headers */}
      <div className="text-center mb-16 px-4">
        <motion.h3 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-extrabold text-white mb-6"
        >
          Por que escolher o <span className="text-primary drop-shadow-[0_0_20px_rgba(168,85,247,0.5)]">DropAI</span>?
        </motion.h3>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-xl text-slate-400 max-w-3xl mx-auto"
        >
          Nossa IA foi desenhada especificamente para substituir times inteiros de marketing.
        </motion.p>
      </div>

      {/* Grid with 3D Tilt Effect */}
      <motion.div 
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4 perspective-1000"
      >
        {featuresData.map((feature, index) => (
          <motion.div 
            key={index} 
            variants={itemVariant}
            whileHover={{ 
              scale: 1.05, 
              rotateX: 10, 
              rotateY: 5,
              z: 50,
              boxShadow: "0 25px 50px -12px rgba(168, 85, 247, 0.25)"
            }}
            className="group relative bg-[#0A0510] border border-white/5 rounded-3xl p-10 overflow-hidden h-full transform-gpu transition-all duration-300 hover:border-primary/50 hover:bg-[#0F0518]"
          >
            {/* Background Glow on Hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/10 group-hover:to-purple-500/5 transition-all duration-500"></div>

            {/* Icon - Pops out in 3D */}
            <motion.div 
              className={`w-16 h-16 rounded-2xl ${feature.bg} flex items-center justify-center mb-8 shadow-inner relative z-10 border border-white/5`}
              whileHover={{ rotate: [0, 10, -10, 0], scale: 1.1 }}
              transition={{ duration: 0.5 }}
            >
              <feature.icon className={`w-8 h-8 ${feature.color} drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]`} />
            </motion.div>
            
            {/* Text Content */}
            <div className="relative z-10">
                <h4 className="text-2xl font-bold text-white mb-4 group-hover:text-primary transition-colors group-hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]">
                {feature.title}
                </h4>
                <p className="text-slate-400 leading-relaxed text-base group-hover:text-slate-200 transition-colors">
                {feature.desc}
                </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Features;