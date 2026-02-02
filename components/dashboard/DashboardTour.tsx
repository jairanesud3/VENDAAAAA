import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, ArrowRight, X, Check, Megaphone, Camera } from 'lucide-react';

interface DashboardTourProps {
  onComplete: () => void;
  userName: string;
}

const steps = [
  {
    title: "Bem-vindo ao DropHacker!",
    desc: "Sua conta foi ativada com sucesso. Você acaba de ganhar acesso a 15 créditos gratuitos para testar nossas ferramentas de IA.",
    icon: Zap,
    color: "text-yellow-400"
  },
  {
    title: "Gerador de Anúncios",
    desc: "Use esta ferramenta para criar scripts virais para TikTok, Reels e legendas que convertem. A IA foi treinada em campanhas milionárias.",
    icon: Megaphone,
    color: "text-blue-400"
  },
  {
    title: "Studio Product AI",
    desc: "Transforme fotos amadoras em imagens profissionais de estúdio 4K em segundos. Economize milhares de reais com fotógrafos.",
    icon: Camera,
    color: "text-pink-400"
  }
];

const DashboardTour: React.FC<DashboardTourProps> = ({ onComplete, userName }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const StepIcon = steps[currentStep].icon;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div 
        key={currentStep}
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: -20 }}
        className="bg-[#0F0518] border border-white/10 rounded-3xl p-8 max-w-md w-full shadow-[0_0_50px_rgba(168,85,247,0.2)] relative overflow-hidden"
      >
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
            <motion.div 
                animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                className="h-full bg-gradient-to-r from-primary to-purple-500"
            />
        </div>

        {/* Close Button */}
        <button onClick={onComplete} className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors">
            <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="mt-4 text-center flex flex-col items-center">
            <div className={`w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 shadow-inner ${steps[currentStep].color}`}>
                <StepIcon className="w-10 h-10" />
            </div>

            <h2 className="text-2xl font-bold text-white mb-3">
                {currentStep === 0 ? `Olá, ${userName}!` : steps[currentStep].title}
            </h2>
            
            {currentStep === 0 && (
                <p className="text-primary font-bold text-sm mb-4 uppercase tracking-widest">
                    AI SUITE V4.0 ATIVADA
                </p>
            )}

            <p className="text-slate-400 leading-relaxed mb-8">
                {steps[currentStep].desc}
            </p>

            <button 
                onClick={handleNext}
                className="w-full py-4 bg-primary hover:bg-primaryDark text-white font-bold rounded-xl shadow-lg shadow-primary/20 flex items-center justify-center gap-2 transition-all active:scale-95 group"
            >
                {currentStep === steps.length - 1 ? 'Começar a Vender' : 'Próximo'}
                {currentStep === steps.length - 1 ? <Check className="w-5 h-5" /> : <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
            </button>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-6">
            {steps.map((_, i) => (
                <div 
                    key={i} 
                    className={`w-2 h-2 rounded-full transition-all ${i === currentStep ? 'bg-primary w-6' : 'bg-white/10'}`} 
                />
            ))}
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardTour;