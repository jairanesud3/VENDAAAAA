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
    <div className="flex items-start justify-between mb-6 pb-6 border-b border-white/5">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border border-primary/20 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">{title}</h1>
            <p className="text-slate-400 text-sm mt-1 font-medium">{description}</p>
        </div>
      </div>
      
      <motion.button 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={onHelp}
        className="p-2 text-slate-500 hover:text-white transition-colors bg-white/5 rounded-lg border border-white/5 hover:border-white/20"
        title="Como usar?"
      >
        <HelpCircle className="w-5 h-5" />
      </motion.button>
    </div>
  );
};