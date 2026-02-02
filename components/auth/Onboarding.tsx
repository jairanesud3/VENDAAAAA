import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, User, ShoppingBag, Loader2, Zap, CheckCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface OnboardingProps {
  onComplete: (data: any) => void;
  onBack: () => void;
}

const steps = [
  { id: 1, title: 'Perfil', desc: 'Vamos personalizar sua experiência.' },
  { id: 2, title: 'Negócio', desc: 'Fale sobre sua operação.' }
];

const Onboarding: React.FC<OnboardingProps> = ({ onComplete, onBack }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    gender: '', // 'male' | 'female'
    storeName: '',
    niche: '',
    revenue: ''
  });

  const handleNext = () => {
    if (currentStep < 2) setCurrentStep(currentStep + 1);
    else handleFinish();
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
    else onBack();
  };

  const handleFinish = async () => {
    setLoading(true);
    try {
        const avatar = formData.gender === 'female' 
        ? 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop'
        : 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop';

        const { data: { user }, error } = await supabase.auth.updateUser({
            data: {
                full_name: formData.name,
                avatar_url: avatar,
                store_name: formData.storeName,
                niche: formData.niche,
                revenue: formData.revenue,
                onboarding_completed: true
            }
        });

        if (error) throw error;
        
        onComplete(user);
    } catch (error) {
        console.error("Onboarding Error:", error);
    } finally {
        setLoading(false);
    }
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-[#05010D] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-[#05010D] to-[#05010D] z-0" />
      
      <div className="w-full max-w-2xl bg-surface/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 relative z-10 shadow-2xl">
        
        {/* Progress Bar */}
        <div className="mb-12">
            <div className="flex justify-between mb-4">
                {steps.map((s, i) => (
                    <div key={s.id} className={`flex flex-col items-center gap-2 w-1/2 ${currentStep >= s.id ? 'opacity-100' : 'opacity-40'}`}>
                        <div className={`
                            w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all duration-500
                            ${currentStep > s.id ? 'bg-accentGreen border-accentGreen text-black' : currentStep === s.id ? 'bg-primary border-primary text-white shadow-[0_0_15px_rgba(168,85,247,0.5)]' : 'bg-transparent border-white/20 text-white'}
                        `}>
                            {currentStep > s.id ? <CheckCircle className="w-5 h-5" /> : s.id}
                        </div>
                        <span className="text-xs font-bold text-white uppercase tracking-wider">{s.title}</span>
                    </div>
                ))}
            </div>
            <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                    initial={{ width: '0%' }}
                    animate={{ width: `${((currentStep - 1) / 1) * 100}%` }}
                    className="h-full bg-gradient-to-r from-primary to-accentGreen"
                />
            </div>
        </div>

        {/* Wizard Content */}
        <AnimatePresence mode="wait">
            
            {/* STEP 1: PERSONAL */}
            {currentStep === 1 && (
                <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                >
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-white mb-2">Quem é você?</h2>
                        <p className="text-slate-400">Isso define o tom da IA para suas copies.</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Como devemos te chamar?</label>
                        <div className="relative">
                            <User className="absolute left-4 top-3.5 w-5 h-5 text-slate-500" />
                            <input 
                                type="text" 
                                value={formData.name}
                                onChange={(e) => updateField('name', e.target.value)}
                                className="w-full bg-[#0F0518] border border-white/10 rounded-xl px-12 py-3.5 text-white focus:outline-none focus:border-primary transition-all"
                                placeholder="Seu nome completo"
                                autoFocus
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Gênero (Para Avatar)</label>
                        <div className="grid grid-cols-2 gap-4">
                            <button 
                                onClick={() => updateField('gender', 'male')}
                                className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${formData.gender === 'male' ? 'bg-primary/20 border-primary text-white shadow-neon-primary' : 'bg-[#0F0518] border-white/10 text-slate-400 hover:border-white/30'}`}
                            >
                                <span className="text-2xl">👨</span>
                                <span className="font-bold">Masculino</span>
                            </button>
                            <button 
                                onClick={() => updateField('gender', 'female')}
                                className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${formData.gender === 'female' ? 'bg-primary/20 border-primary text-white shadow-neon-primary' : 'bg-[#0F0518] border-white/10 text-slate-400 hover:border-white/30'}`}
                            >
                                <span className="text-2xl">👩</span>
                                <span className="font-bold">Feminino</span>
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* STEP 2: BUSINESS */}
            {currentStep === 2 && (
                <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                >
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-white mb-2">Sobre sua Operação</h2>
                        <p className="text-slate-400">A IA vai analisar seu nicho para sugerir produtos.</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Nome da Loja / Projeto</label>
                        <div className="relative">
                            <ShoppingBag className="absolute left-4 top-3.5 w-5 h-5 text-slate-500" />
                            <input 
                                type="text" 
                                value={formData.storeName}
                                onChange={(e) => updateField('storeName', e.target.value)}
                                className="w-full bg-[#0F0518] border border-white/10 rounded-xl px-12 py-3.5 text-white focus:outline-none focus:border-primary transition-all"
                                placeholder="Ex: Mega Ofertas"
                                autoFocus
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Nicho Principal</label>
                            <select 
                                value={formData.niche}
                                onChange={(e) => updateField('niche', e.target.value)}
                                className="w-full bg-[#0F0518] border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-primary appearance-none"
                            >
                                <option value="">Selecione...</option>
                                <option value="dropshipping">Dropshipping Genérico</option>
                                <option value="fashion">Moda & Acessórios</option>
                                <option value="electronics">Eletrônicos</option>
                                <option value="infoproduto">Infoproduto / PLR</option>
                                <option value="saas">SaaS / Software</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Faturamento Atual</label>
                            <select 
                                value={formData.revenue}
                                onChange={(e) => updateField('revenue', e.target.value)}
                                className="w-full bg-[#0F0518] border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-primary appearance-none"
                            >
                                <option value="">Selecione...</option>
                                <option value="0">Começando do zero</option>
                                <option value="1k">Até R$ 5.000/mês</option>
                                <option value="10k">R$ 10k - R$ 50k/mês</option>
                                <option value="100k">Acima de R$ 100k/mês</option>
                            </select>
                        </div>
                    </div>
                </motion.div>
            )}

        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-12 pt-6 border-t border-white/5">
            <button 
                onClick={handlePrev}
                className="flex items-center gap-2 px-6 py-3 text-slate-400 hover:text-white transition-colors font-medium"
            >
                <ArrowLeft className="w-4 h-4" />
                {currentStep === 1 ? 'Cancelar' : 'Voltar'}
            </button>
            
            <button 
                onClick={handleNext}
                disabled={loading || (currentStep === 1 && !formData.name) || (currentStep === 2 && !formData.storeName)}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-primary to-primaryDark text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                    currentStep === 2 ? (
                        <>
                          <Zap className="w-5 h-5 fill-white" /> Concluir Setup
                        </>
                    ) : (
                        <>
                          Próximo <ArrowRight className="w-5 h-5" />
                        </>
                    )
                )}
            </button>
        </div>

      </div>
    </div>
  );
};

export default Onboarding;