import React from 'react';
import { X, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  steps: string[];
}

const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose, title, steps }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-[#0F0518] border border-white/10 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden relative"
          >
            <button 
                onClick={onClose}
                className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
            >
                <X className="w-5 h-5" />
            </button>

            <div className="p-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <HelpCircle className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-white">{title}</h3>
                </div>

                <div className="space-y-4">
                    {steps.map((step, index) => (
                        <div key={index} className="flex gap-4">
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-white">
                                {index + 1}
                            </div>
                            <p className="text-slate-300 text-sm leading-relaxed">
                                {step}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="mt-8 pt-6 border-t border-white/5 text-center">
                    <button 
                        onClick={onClose}
                        className="text-sm font-bold text-primary hover:text-white transition-colors"
                    >
                        Entendi, vamos começar!
                    </button>
                </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default HelpModal;