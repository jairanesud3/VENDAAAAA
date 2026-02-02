import React, { useState } from 'react';
import { HelpCircle, X, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ToolHeaderProps {
  title: string;
  description: string;
  icon: any;
  helpSteps: string[];
}

const ToolHeader: React.FC<ToolHeaderProps> = ({ title, description, icon: Icon, helpSteps }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-start justify-between mb-8 pb-6 border-b border-white/5 gap-4">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border border-primary/20 shadow-[0_0_20px_rgba(168,85,247,0.15)] shrink-0">
            <Icon className="w-7 h-7 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">{title}</h1>
            <p className="text-slate-400 text-sm mt-1 font-medium max-w-lg leading-relaxed">{description}</p>
          </div>
        </div>
        
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 text-slate-300 hover:text-white transition-colors bg-white/5 hover:bg-white/10 rounded-full border border-white/10 hover:border-primary/50 text-sm font-bold shadow-lg hover:shadow-primary/20 whitespace-nowrap self-start md:self-center"
        >
          <HelpCircle className="w-4 h-4 text-primary" />
          <span>Como usar?</span>
        </motion.button>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-[#0F0518] border border-white/10 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden relative"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-white/5 bg-white/5 flex justify-between items-center">
                 <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-primary" /> Guia Rápido
                 </h3>
                 <button onClick={() => setIsModalOpen(false)} className="text-slate-500 hover:text-white transition-colors">
                    <X className="w-5 h-5" />
                 </button>
              </div>

              {/* Steps */}
              <div className="p-6 space-y-4">
                {helpSteps.map((step, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-4 group"
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-sm font-bold text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      {index + 1}
                    </div>
                    <p className="text-slate-300 text-sm leading-relaxed pt-1.5 group-hover:text-white transition-colors">
                      {step}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Footer */}
              <div className="p-6 pt-2">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="w-full py-3 bg-gradient-to-r from-primary to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-primary/30 transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  Entendi, vamos começar <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ToolHeader;