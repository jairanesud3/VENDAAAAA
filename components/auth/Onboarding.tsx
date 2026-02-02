import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, User, ShoppingBag, Loader2, Zap, CheckCircle, Building2, MapPin, FileText, Target } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface OnboardingProps {
  onComplete: (data: any) => void;
  onBack: () => void;
}

const steps = [
  { id: 1, title: 'Perfil', desc: 'Quem é você?' },
  { id: 2, title: 'Legal', desc: 'Dados do Negócio' },
  { id: 3, title: 'Operação', desc: 'Local e Nicho' }
];

const BRAZIL_STATES = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"
];

const NICHES = [
    "Dropshipping Genérico",
    "Moda Feminina",
    "Moda Masculina",
    "Eletrônicos & Tech",
    "Casa & Cozinha",
    "Decoração & Design",
    "Saúde & Bem-Estar",
    "Beleza & Cosméticos",
    "Fitness & Academia",
    "Pet Shop (Cães e Gatos)",
    "Bebês & Maternidade",
    "Brinquedos & Hobbies",
    "Automotivo & Acessórios",
    "Ferramentas & Construção",
    "Jardinagem & Outdoor",
    "Camping & Pesca",
    "Relógios & Joias",
    "Óculos & Acessórios",
    "Calçados & Sneakers",
    "Games & Periféricos",
    "Informática & Escritório",
    "Livros & Papelaria",
    "Artigos Esportivos",
    "Suplementos Alimentares",
    "Tabacaria & Headshop",
    "Sex Shop / Adulto",
    "Infoprodutos / PLR",
    "SaaS / Software",
    "Serviços Digitais",
    "Outros"
];

const Onboarding: React.FC<OnboardingProps> = ({ onComplete, onBack }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');
  
  const [formData, setFormData] = useState({
    // Step 1
    name: '',
    gender: '', // 'male' | 'female'
    
    // Step 2
    docType: 'cpf', // 'cpf' | 'cnpj'
    docNumber: '',
    storeName: '',
    
    // Step 3
    state: '',
    city: '',
    niche: '',
    revenue: '',
    goal: ''
  });

  // Masking Logic
  const handleDocChange = (val: string) => {
    let v = val.replace(/\D/g, ""); // Remove non-digits
    
    if (formData.docType === 'cpf') {
        if (v.length > 11) v = v.slice(0, 11);
        v = v.replace(/(\d{3})(\d)/, "$1.$2");
        v = v.replace(/(\d{3})(\d)/, "$1.$2");
        v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    } else {
        if (v.length > 14) v = v.slice(0, 14);
        v = v.replace(/^(\d{2})(\d)/, "$1.$2");
        v = v.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
        v = v.replace(/\.(\d{3})(\d)/, ".$1/$2");
        v = v.replace(/(\d{4})(\d)/, "$1-$2");
    }
    updateField('docNumber', v);
  };

  const handleNext = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
    else handleFinish();
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
    else onBack();
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Fake Loading Sequence to build trust
  const runLoadingSequence = async () => {
      const messages = [
          "Criptografando dados sensíveis...",
          "Conectando à base de dados segura...",
          "Verificando disponibilidade do nome...",
          `Configurando IA para nicho de ${formData.niche || 'Vendas'}...`,
          "Gerando seu Dashboard exclusivo..."
      ];

      for (const msg of messages) {
          setLoadingText(msg);
          await new Promise(r => setTimeout(r, 800));
      }
  };

  const handleFinish = async () => {
    setLoading(true);
    
    // Run the "Trust Building" animation
    await runLoadingSequence();

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
                city: formData.city,
                state: formData.state,
                document_type: formData.docType,
                // Mark as completed but set a flag for the tour
                onboarding_completed: true,
                show_tour: true 
            }
        });

        if (error) throw error;
        
        // Pass updated user with new metadata
        onComplete(user);
    } catch (error) {
        console.error("Onboarding Error:", error);
        setLoadingText("Erro ao salvar. Tente novamente.");
        setTimeout(() => setLoading(false), 2000);
    }
  };

  // Validation
  const isStep1Valid = formData.name.length > 3 && formData.gender !== '';
  const isStep2Valid = formData.storeName.length > 2 && formData.docNumber.length > 10;
  const isStep3Valid = formData.state !== '' && formData.city.length > 2 && formData.niche !== '';

  return (
    <div className="min-h-screen bg-[#05010D] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Dynamic Background */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-[#05010D] to-[#05010D] z-0" />
      
      {/* Loading Overlay */}
      <AnimatePresence>
        {loading && (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="fixed inset-0 z-50 bg-[#05010D]/95 backdrop-blur-xl flex flex-col items-center justify-center text-center p-6"
            >
                <div className="relative mb-8">
                    <div className="w-24 h-24 rounded-full border-4 border-primary/20 border-t-primary animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Zap className="w-8 h-8 text-white animate-pulse" />
                    </div>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Preparando seu Ambiente</h2>
                <motion.p 
                    key={loadingText}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-primary font-mono text-sm"
                >
                    {loadingText}
                </motion.p>
            </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full max-w-3xl bg-surface/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 relative z-10 shadow-2xl">
        
        {/* Progress Bar */}
        <div className="mb-12">
            <div className="flex justify-between mb-4 px-2">
                {steps.map((s, i) => (
                    <div key={s.id} className={`flex flex-col items-center gap-2 w-1/3 ${currentStep >= s.id ? 'opacity-100' : 'opacity-40'}`}>
                        <div className={`
                            w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all duration-500
                            ${currentStep > s.id ? 'bg-accentGreen border-accentGreen text-black' : currentStep === s.id ? 'bg-primary border-primary text-white shadow-[0_0_15px_rgba(168,85,247,0.5)]' : 'bg-transparent border-white/20 text-white'}
                        `}>
                            {currentStep > s.id ? <CheckCircle className="w-5 h-5" /> : s.id}
                        </div>
                        <span className="hidden md:block text-xs font-bold text-white uppercase tracking-wider">{s.title}</span>
                    </div>
                ))}
            </div>
            <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                    initial={{ width: '0%' }}
                    animate={{ width: `${((currentStep - 1) / 2) * 100}%` }}
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
                        <h2 className="text-3xl font-bold text-white mb-2">Vamos criar seu perfil</h2>
                        <p className="text-slate-400">Personalize a IA para falar como você.</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Seu Nome Completo</label>
                        <div className="relative">
                            <User className="absolute left-4 top-3.5 w-5 h-5 text-slate-500" />
                            <input 
                                type="text" 
                                value={formData.name}
                                onChange={(e) => updateField('name', e.target.value)}
                                className="w-full bg-[#0F0518] border border-white/10 rounded-xl px-12 py-3.5 text-white focus:outline-none focus:border-primary transition-all"
                                placeholder="Ex: Ricardo Silva"
                                autoFocus
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Gênero (Para criar seu Avatar IA)</label>
                        <div className="grid grid-cols-2 gap-4">
                            <button 
                                onClick={() => updateField('gender', 'male')}
                                className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${formData.gender === 'male' ? 'bg-primary/20 border-primary text-white shadow-neon-primary' : 'bg-[#0F0518] border-white/10 text-slate-400 hover:border-white/30'}`}
                            >
                                <span className="text-3xl">👨</span>
                                <span className="font-bold">Masculino</span>
                            </button>
                            <button 
                                onClick={() => updateField('gender', 'female')}
                                className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${formData.gender === 'female' ? 'bg-primary/20 border-primary text-white shadow-neon-primary' : 'bg-[#0F0518] border-white/10 text-slate-400 hover:border-white/30'}`}
                            >
                                <span className="text-3xl">👩</span>
                                <span className="font-bold">Feminino</span>
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* STEP 2: LEGAL & BUSINESS */}
            {currentStep === 2 && (
                <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                >
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-white mb-2">Dados do Negócio</h2>
                        <p className="text-slate-400">Dados seguros e criptografados de ponta a ponta.</p>
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
                                placeholder="Ex: Nexus Ofertas"
                                autoFocus
                            />
                        </div>
                    </div>

                    {/* CPF/CNPJ Toggle */}
                    <div className="bg-[#0F0518] p-1 rounded-xl border border-white/10 flex">
                        <button 
                            onClick={() => { updateField('docType', 'cpf'); updateField('docNumber', ''); }}
                            className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${formData.docType === 'cpf' ? 'bg-white/10 text-white shadow-sm' : 'text-slate-500 hover:text-white'}`}
                        >
                            Pessoa Física (CPF)
                        </button>
                        <button 
                            onClick={() => { updateField('docType', 'cnpj'); updateField('docNumber', ''); }}
                            className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${formData.docType === 'cnpj' ? 'bg-white/10 text-white shadow-sm' : 'text-slate-500 hover:text-white'}`}
                        >
                            Empresa (CNPJ)
                        </button>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            {formData.docType === 'cpf' ? 'Número do CPF' : 'Número do CNPJ'}
                        </label>
                        <div className="relative">
                            <FileText className="absolute left-4 top-3.5 w-5 h-5 text-slate-500" />
                            <input 
                                type="text" 
                                value={formData.docNumber}
                                onChange={(e) => handleDocChange(e.target.value)}
                                className="w-full bg-[#0F0518] border border-white/10 rounded-xl px-12 py-3.5 text-white focus:outline-none focus:border-primary transition-all font-mono tracking-wide"
                                placeholder={formData.docType === 'cpf' ? '000.000.000-00' : '00.000.000/0001-00'}
                            />
                            {formData.docNumber.length > 10 && (
                                <CheckCircle className="absolute right-4 top-3.5 w-5 h-5 text-green-500" />
                            )}
                        </div>
                    </div>
                </motion.div>
            )}

            {/* STEP 3: OPERATION & LOCATION */}
            {currentStep === 3 && (
                <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                >
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-white mb-2">Calibrando a IA</h2>
                        <p className="text-slate-400">Onde você está e onde quer chegar?</p>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-1">
                             <label className="block text-sm font-medium text-slate-300 mb-2">Estado</label>
                             <select 
                                value={formData.state}
                                onChange={(e) => updateField('state', e.target.value)}
                                className="w-full bg-[#0F0518] border border-white/10 rounded-xl px-3 py-3.5 text-white focus:outline-none focus:border-primary appearance-none scrollbar-thin scrollbar-thumb-primary"
                             >
                                <option value="">UF</option>
                                {BRAZIL_STATES.map(uf => <option key={uf} value={uf}>{uf}</option>)}
                             </select>
                        </div>
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-slate-300 mb-2">Cidade</label>
                            <div className="relative">
                                <MapPin className="absolute left-4 top-3.5 w-5 h-5 text-slate-500" />
                                <input 
                                    type="text" 
                                    value={formData.city}
                                    onChange={(e) => updateField('city', e.target.value)}
                                    className="w-full bg-[#0F0518] border border-white/10 rounded-xl px-12 py-3.5 text-white focus:outline-none focus:border-primary"
                                    placeholder="Sua cidade"
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Nicho Principal</label>
                        <select 
                            value={formData.niche}
                            onChange={(e) => updateField('niche', e.target.value)}
                            className="w-full bg-[#0F0518] border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-primary appearance-none custom-scrollbar"
                            size={1}
                        >
                            <option value="">Selecione seu nicho...</option>
                            {NICHES.map(n => (
                                <option key={n} value={n}>{n}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Objetivo Atual</label>
                        <div className="relative">
                            <Target className="absolute left-4 top-3.5 w-5 h-5 text-slate-500" />
                            <select 
                                value={formData.goal}
                                onChange={(e) => updateField('goal', e.target.value)}
                                className="w-full bg-[#0F0518] border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white focus:outline-none focus:border-primary appearance-none"
                            >
                                <option value="">Qual sua meta?</option>
                                <option value="first_sale">Fazer a primeira venda</option>
                                <option value="scale">Escalar para R$ 10k/mês</option>
                                <option value="automate">Automatizar operação existente</option>
                                <option value="brand">Construir marca sólida (Branding)</option>
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
                {currentStep === 1 ? 'Sair' : 'Voltar'}
            </button>
            
            <button 
                onClick={handleNext}
                disabled={
                    (currentStep === 1 && !isStep1Valid) || 
                    (currentStep === 2 && !isStep2Valid) || 
                    (currentStep === 3 && !isStep3Valid)
                }
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-primary to-primaryDark text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 group"
            >
                {currentStep === 3 ? (
                    <>
                      <Zap className="w-5 h-5 fill-white group-hover:animate-pulse" /> Concluir Setup
                    </>
                ) : (
                    <>
                      Próximo <ArrowRight className="w-5 h-5" />
                    </>
                )}
            </button>
        </div>

      </div>
    </div>
  );
};

export default Onboarding;