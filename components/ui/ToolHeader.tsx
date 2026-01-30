import React from 'react';
import { HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface ToolHeaderProps {
  title: string;
  description: string;
  icon: any;
  onHelp: () => void;
}

export const ToolHeader: React.FC<ToolHeaderProps> = ({ title, description, icon: Icon, onHelp }) => {
  return (
    <div className="flex items-start justify-between mb-8 pb-6 border-b border-white/5">
      <div className="flex items-center gap-5">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border border-primary/20 shadow-[0_0_20px_rgba(168,85,247,0.15)]">
          <Icon className="w-7 h-7 text-primary" />
        </div>
        <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">{title}</h1>
            <p className="text-slate-400 text-sm mt-1 font-medium max-w-lg">{description}</p>
        </div>
      </div>
      
      <motion.button 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onHelp}
        className="flex items-center gap-2 px-4 py-2 text-slate-400 hover:text-white transition-colors bg-white/5 rounded-full border border-white/5 hover:border-white/20 text-sm font-medium"
      >
        <HelpCircle className="w-4 h-4" />
        <span className="hidden md:inline">Como usar?</span>
      </motion.button>
    </div>
  );
};