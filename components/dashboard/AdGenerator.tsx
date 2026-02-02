import React, { useState, useEffect } from 'react';
import { Copy, Instagram, Facebook, Zap, Loader2, Twitter, Linkedin, Pin, Megaphone, Check, ShoppingBag, ShoppingBasket, Box, Shirt, Repeat, ExternalLink, Lock, Save } from 'lucide-react';
import { Toast } from '../ui/Toast';
import { generateAdCopyAction } from '../../lib/ai-actions';
import { cleanAIResponse } from '../../lib/utils';
import ToolHeader from './ToolHeader';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../../lib/supabase';

const MAX_FREE_CREDITS = 10;

const AdGenerator: React.FC = () => {
  const [channelType, setChannelType] = useState<'social' | 'marketplace'>('social');
  const [selectedChannels, setSelectedChannels] = useState<string[]>(['instagram']);
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedText, setGeneratedText] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('instagram');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  
  // Usage Logic
  const [creditsUsed, setCreditsUsed] = useState(0);
  const [showLimitModal, setShowLimitModal] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('drophacker_text_credits');
    if (stored) setCreditsUsed(parseInt(stored));
  }, []);

  // Platform Configurations
  const socialPlatforms = [
    { id: 'instagram', icon: Instagram, label: 'Instagram', color: 'text-pink-500', bg: 'hover:bg-pink-500/10', url: 'https://www.instagram.com' },
    { id: 'facebook', icon: Facebook, label: 'Facebook', color: 'text-blue-500', bg: 'hover:bg-blue-500/10', url: 'https://business.facebook.com' },
    { id: 'tiktok', icon: Zap, label: 'TikTok', color: 'text-cyan-400', bg: 'hover:bg-cyan-400/10', url: 'https://ads.tiktok.com' },
    { id: 'twitter', icon: Twitter, label: 'Twitter (X)', color: 'text-sky-500', bg: 'hover:bg-sky-500/10', url: 'https://twitter.com' },
    { id: 'linkedin', icon: Linkedin, label: 'LinkedIn', color: 'text-blue-700', bg: 'hover:bg-blue-700/10', url: 'https://www.linkedin.com' },
    { id: 'pinterest', icon: Pin, label: 'Pinterest', color: 'text-red-600', bg: 'hover:bg-red-600/10', url: 'https://pinterest.com' },
  ];

  const marketplacePlatforms = [
    { id: 'mercadolivre', icon: ShoppingBag, label: 'Mercado Livre', color: 'text-yellow-400', bg: 'hover:bg-yellow-400/10', url: 'https://www.mercadolivre.com.br/vender' },
    { id: 'shopee', icon: ShoppingBasket, label: 'Shopee', color: 'text-orange-500', bg: 'hover:bg-orange-500/10', url: 'https://seller.shopee.com.br' },
    { id: 'amazon', icon: Box, label: 'Amazon', color: 'text-white', bg: 'hover:bg-white/10', url: 'https://sellercentral.amazon.com.br' },
    { id: 'shein', icon: Shirt, label: 'Shein', color: 'text-white', bg: 'hover:bg-slate-800', url: 'https://br.shein.com/sell-on-shein' },
    { id: 'olx', icon: Repeat, label: 'OLX', color: 'text-purple-400', bg: 'hover:bg-purple-400/10', url: 'https://www.olx.com.br' },
  ];

  const currentPlatforms = channelType === 'social' ? socialPlatforms : marketplacePlatforms;

  const toggleChannel = (id: string) => {
    if (selectedChannels.includes(id)) {
      setSelectedChannels(selectedChannels.filter(s => s !== id));
    } else {
      if (selectedChannels.length < 3) {
        setSelectedChannels([...selectedChannels, id]);
      }
    }
  };

  const handleTypeChange = (type: 'social' | 'marketplace') => {
      setChannelType(type);
      setSelectedChannels([]); 
      setGeneratedText(null);
  };

  const handleGenerate = async () => {
    if (!productName) return;

    if (creditsUsed >= MAX_FREE_CREDITS) {
        setShowLimitModal(true);
        return;
    }
    
    setLoading(true);
    setGeneratedText(null);
    
    try {
      const context = `${channelType.toUpperCase()}_${selectedChannels[0] || 'GENERIC'}`;
      const result = await generateAdCopyAction(productName, price, context);
      
      setGeneratedText(cleanAIResponse(result)); 
      if (selectedChannels.length > 0) setActiveTab(selectedChannels[0]);

      const newCount = creditsUsed + 1;
      setCreditsUsed(newCount);
      localStorage.setItem('drophacker_text_credits', newCount.toString());

    } catch (error) {
      console.error(error);
      setGeneratedText("Erro ao conectar com a IA. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
      if (generatedText) {
        navigator.clipboard.writeText(generatedText);
        setToastMessage("Texto copiado!");
        setShowToast(true);
      }
  };

  const handleSave = async () => {
    if (!generatedText) return;
    setIsSaving(true);
    try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
            await supabase.from('saved_creations').insert({
                user_id: user.id,
                type: 'text',
                title: `${productName} - ${channelType === 'social' ? 'Social' : 'Mkt'}`,
                content: generatedText,
                created_at: new Date().toISOString()
            });
            setToastMessage("Salvo na Biblioteca!");
            setShowToast(true);
        }
    } catch (error) {
        console.error(error);
        setToastMessage("Erro ao salvar.");
        setShowToast(true);
    } finally {
        setIsSaving(false);
    }
  };

  const navigateToSubscription = () => {
      if (typeof window !== 'undefined') {
          const event = new CustomEvent('navigate-checkout');
          window.dispatchEvent(event);
      }
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col lg:flex-row gap-8 relative">
      <Toast message={toastMessage} isVisible={showToast} onClose={() => setShowToast(false)} />

      {/* LIMIT MODAL */}
      <AnimatePresence>
        {showLimitModal && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-[#0F0518] border border-primary/50 rounded-2xl p-8 max-w-md w-full shadow-[0_0_50px_rgba(168,85,247,0.3)] text-center relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-purple-600"></div>
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
                        <Lock className="w-8 h-8 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">Limite Gratuito Atingido</h2>
                    <p className="text-slate-400 mb-8">
                        Você utilizou seus {MAX_FREE_CREDITS} créditos gratuitos de texto. Para continuar gerando copies virais e escalando suas vendas, faça o upgrade para o plano PRO.
                    </p>
                    <button 
                        onClick={navigateToSubscription}
                        className="w-full py-4 bg-gradient-to-r from-primary to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-primary/50 hover:scale-105 transition-all mb-4"
                    >
                        Desbloquear Acesso Ilimitado
                    </button>
                    <button 
                        onClick={() => setShowLimitModal(false)}
                        className="text-sm text-slate-500 hover:text-white"
                    >
                        Voltar (Apenas visualizar)
                    </button>
                </motion.div>
            </div>
        )}
      </AnimatePresence>

      {/* Painel Esquerdo */}
      <div className="w-full lg:w-1/3 flex flex-col gap-6 overflow-y-auto pr-2 custom-scrollbar">
        <ToolHeader 
            title="Gerador de Anúncios" 
            description={channelType === 'social' ? "Crie scripts e legendas virais para redes sociais." : "Crie títulos SEO e descrições de alta conversão para Marketplaces."}
            icon={Megaphone}
            helpSteps={[
                "Escolha o Tipo de Canal (Redes Sociais ou Marketplace).",
                "Digite o nome do produto e características.",
                "Selecione as plataformas alvo.",
                "Clique em Gerar para receber a copy otimizada."
            ]}
        />
        
        {/* ... Inputs existing code ... */}
        {/* Mantendo o código existente dos inputs para economizar espaço na resposta, mas assumindo que ele está aqui */}
        
        <div className="space-y-5 bg-[#0A0510] border border-white/5 p-6 rounded-2xl">
            <div>
                <label className="block text-sm font-bold text-slate-300 mb-2">Nome do Produto</label>
                <input 
                  type="text" 
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="w-full bg-surface border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-primary transition-all placeholder:text-slate-600 focus:shadow-[0_0_15px_rgba(168,85,247,0.2)]" 
                  placeholder="Ex: Fone Bluetooth Pro" 
                />
            </div>
            <div>
                <label className="block text-sm font-bold text-slate-300 mb-2">Preço (Opcional)</label>
                <input 
                  type="text" 
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full bg-surface border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-primary transition-all placeholder:text-slate-600" 
                  placeholder="R$ 97,90" 
                />
            </div>
        </div>

         {/* Channel Selector Logic */}
         <div className="bg-[#0A0510] border border-white/5 p-6 rounded-2xl">
             {/* ... Platform grid code ... */}
            <div className="grid grid-cols-2 gap-3">
                {currentPlatforms.map((s) => (
                    <motion.div
                        key={s.id}
                        initial={false}
                        whileHover={{ scale: 1.02 }}
                        className={`
                            relative flex items-center justify-between p-3 rounded-xl border transition-all duration-200 text-sm font-semibold group overflow-hidden cursor-pointer
                            ${selectedChannels.includes(s.id) 
                                ? `bg-primary/10 border-primary text-white shadow-[0_0_15px_rgba(168,85,247,0.15)]` 
                                : `bg-surface border-white/5 text-slate-500 hover:text-white ${s.bg}`
                            }
                        `}
                        onClick={() => toggleChannel(s.id)}
                    >
                        <div className="flex items-center gap-3 relative z-0 pointer-events-none">
                            <s.icon className={`w-4 h-4 ${selectedChannels.includes(s.id) ? s.color : 'text-slate-500 group-hover:text-white'}`} />
                            <span>{s.label}</span>
                        </div>
                        {selectedChannels.includes(s.id) && (
                            <div className="absolute top-1/2 -translate-y-1/2 right-3 pointer-events-none">
                                <Check className="w-3 h-3 text-primary" />
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>
         </div>

        <button 
            onClick={handleGenerate}
            disabled={loading || selectedChannels.length === 0 || !productName}
            className="w-full py-4 bg-gradient-to-r from-primary to-purple-600 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_40px_rgba(168,85,247,0.5)] hover:scale-[1.02] transition-all mt-auto disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 border border-white/10"
        >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5 fill-white" />}
            {loading ? 'Consultando IA...' : (channelType === 'social' ? 'Gerar Anúncios Virais' : 'Gerar Descrição SEO')}
        </button>
      </div>

      {/* Painel Direito: Resultado */}
      <div className="w-full lg:w-2/3 bg-[#0A0510] border border-white/5 rounded-2xl flex flex-col overflow-hidden shadow-2xl relative">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[80px] rounded-full pointer-events-none"></div>

        {!generatedText && !loading ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 text-slate-500">
                <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6 border border-white/5">
                    <Copy className="w-8 h-8 opacity-30" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Aguardando Comando</h3>
                <p className="font-medium max-w-sm">
                    {channelType === 'social' 
                        ? 'Preencha os dados para criar scripts de vídeo e legendas.' 
                        : 'Preencha os dados para criar títulos e descrições otimizadas para venda.'}
                </p>
            </div>
        ) : (
            <>
                <div className="flex border-b border-white/5 bg-surface/50 relative z-10 px-4 pt-2 overflow-x-auto custom-scrollbar">
                    {selectedChannels.map(id => {
                        const platform = [...socialPlatforms, ...marketplacePlatforms].find(s => s.id === id);
                        return (
                            <button
                                key={id}
                                onClick={() => setActiveTab(id)}
                                className={`flex items-center gap-2 px-6 py-4 text-sm font-bold transition-all relative rounded-t-lg shrink-0 ${activeTab === id ? 'text-white bg-white/5 border-t border-x border-white/5' : 'text-slate-500 hover:text-slate-300'}`}
                            >
                                <span className={activeTab === id ? platform?.color : ''}>{platform?.label}</span>
                            </button>
                        );
                    })}
                </div>

                <div className="flex-1 p-6 overflow-y-auto flex gap-8 custom-scrollbar relative z-10 bg-[#0A0510]/50">
                   {loading ? (
                       <div className="w-full h-full flex flex-col items-center justify-center gap-6">
                           <div className="relative">
                               <div className="w-20 h-20 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                               <div className="absolute inset-0 flex items-center justify-center">
                                   <Zap className="w-8 h-8 text-primary animate-pulse" />
                               </div>
                           </div>
                           <div className="text-center">
                               <h3 className="text-white font-bold text-lg animate-pulse">
                                   {channelType === 'social' ? 'Criando Copy Viral...' : 'Otimizando SEO...'}
                               </h3>
                               <p className="text-slate-500 text-sm mt-1">Analisando 20.000+ padrões vencedores</p>
                           </div>
                       </div>
                   ) : (
                       <div className="flex-1 flex flex-col h-full">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">RESPOSTA DA IA</span>
                                <div className="flex gap-2">
                                    <button 
                                        onClick={handleSave} 
                                        disabled={isSaving}
                                        className="text-xs font-bold text-white hover:bg-white/10 flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10 transition-colors disabled:opacity-50"
                                    >
                                        {isSaving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
                                        Salvar
                                    </button>
                                    <button onClick={handleCopy} className="text-xs font-bold text-white hover:bg-white/10 flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10 transition-colors">
                                        <Copy className="w-3 h-3" /> Copiar
                                    </button>
                                </div>
                            </div>
                            
                            <div className="flex-1 bg-black/40 border border-white/10 rounded-xl p-6 text-slate-300 text-sm font-sans leading-7 selection:bg-primary/30 shadow-inner overflow-y-auto">
                                <div className="whitespace-pre-wrap">
                                    {generatedText}
                                </div>
                            </div>
                        </div>
                   )}
                </div>
            </>
        )}
      </div>
    </div>
  );
};

export default AdGenerator;