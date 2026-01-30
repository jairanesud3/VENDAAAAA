import React from 'react';
import { Construction, Bell, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface PlaceholderPageProps {
  title: string;
  description: string;
  icon: any;
}

const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ title, description, icon: Icon }) => {
  return (
    <div className="h-full flex flex-col items-center justify-center p-8 text-center animate-fade-in-up">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-24 h-24 rounded-3xl bg-surface border border-white/5 flex items-center justify-center mb-6 shadow-2xl relative overflow-hidden group"
      >
        <div className="absolute inset-0 bg-primary/10 blur-xl group-hover:bg-primary/20 transition-all duration-500"></div>
        <Icon className="w-10 h-10 text-slate-400 group-hover:text-primary transition-colors relative z-10" />
      </motion.div>

      <h2 className="text-3xl font-bold text-white mb-3">{title}</h2>
      <p className="text-slate-400 max-w-md mb-8 leading-relaxed">
        {description}
      </p>

      <div className="flex flex-col gap-4 w-full max-w-sm">
        <button className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white font-medium transition-all flex items-center justify-center gap-2 group">
          <Bell className="w-4 h-4 text-primary group-hover:animate-swing" />
          Avise-me quando lançar
        </button>
        
        <div className="p-4 rounded-xl bg-gradient-to-r from-primary/10 to-blue-500/10 border border-white/5 text-left">
          <div className="text-xs font-bold text-primary mb-1 uppercase tracking-wider">Roadmap</div>
          <div className="text-sm text-slate-300">
            Esta funcionalidade está 85% concluída. Previsão de lançamento: <span className="text-white font-bold">Próxima Semana</span>.
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceholderPage;