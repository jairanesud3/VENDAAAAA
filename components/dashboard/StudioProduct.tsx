import React, { useState, useEffect } from 'react';
import { UploadCloud, RefreshCw, Download, Share2, X, ImageIcon, Camera, Lock, Save, Loader2, Sparkles, Sliders } from 'lucide-react';
import { Toast } from '../ui/Toast';
import { generateImageAction } from '../../lib/ai-actions';
import ToolHeader from './ToolHeader';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../../lib/supabase';

const MAX_IMAGE_CREDITS = 3;

// Styles Presets
const STYLES = [
    { id: 'cinematic', name: 'Cinematográfico', prompt: 'cinematic lighting, dramatic shadows, movie still, color graded', color: 'bg-purple-500' },
    { id: 'studio', name: 'Estúdio Clean', prompt: 'pure white background, soft box lighting, commercial photography, clean', color: 'bg-blue-500' },
    { id: 'neon', name: 'Neon Cyber', prompt: 'cyberpunk neon lights, pink and blue glow, futuristic, dark background', color: 'bg-pink-500' },
    { id: 'nature', name: 'Natureza', prompt: 'sunlight, outdoor, bokeh, leaves, wood texture, natural lighting', color: 'bg-green-500' },
    { id: 'luxury', name: 'Luxo Dark', prompt: 'black marble background, golden accents, luxury vibe, elegant, sharp', color: 'bg-yellow-600' },
];

const StudioProduct: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState(STYLES[0]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Usage Logic
  const [creditsUsed, setCreditsUsed] = useState(0);
  const [showLimitModal, setShowLimitModal] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('drophacker_image_credits');
    if (stored) setCreditsUsed(parseInt(stored));
  }, []);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setImage(url);
    }
  };

  const handleGenerate = async () => {
    if (!prompt && !image) return;

    if (creditsUsed >= MAX_IMAGE_CREDITS) {
        setShowLimitModal(true);
        return;
    }

    setLoading(true);
    
    try {
        // COMBINE USER PROMPT WITH STYLE
        const finalPrompt = `${prompt}. Style: ${selectedStyle.prompt}`;
        const resultUrl = await generateImageAction(finalPrompt);
        
        setResult(resultUrl);
        setToastMessage("Imagem Ultra-HD gerada com sucesso!");
        setShowToast(true);

        const newCount = creditsUsed + 1;
        setCreditsUsed(newCount);
        localStorage.setItem('drophacker_image_credits', newCount.toString());

    } catch (e) {
        console.error(e);
        setToastMessage("Erro ao gerar imagem.");
        setShowToast(true);
    } finally {
        setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!result) return;
    setIsSaving(true);
    try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
            await supabase.from('saved_creations').insert({
                user_id: user.id,
                type: 'image',
                title: `Studio (${selectedStyle.name}) - ${prompt.substring(0, 15)}...`,
                image_url: result,
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
    <div className="h-[calc(100vh-8rem)] flex flex-col lg:flex-row gap-6 relative">
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
                    <h2 className="text-2xl font-bold text-white mb-2">Limite de Imagens Atingido</h2>
                    <p className="text-slate-400 mb-8">
                        Você utilizou seus {MAX_IMAGE_CREDITS} créditos de imagens de estúdio. A geração de imagens 4K consome muitos recursos. Assine para liberar.
                    </p>
                    <button 
                        onClick={navigateToSubscription}
                        className="w-full py-4 bg-gradient-to-r from-primary to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-primary/50 hover:scale-105 transition-all mb-4"
                    >
                        Desbloquear Imagens Ilimitadas
                    </button>
                    <button 
                        onClick={() => setShowLimitModal(false)}
                        className="text-sm text-slate-500 hover:text-white"
                    >
                        Voltar
                    </button>
                </motion.div>
            </div>
        )}
      </AnimatePresence>

      {/* Left Panel: Inputs */}
      <div className="w-full lg:w-1/3 flex flex-col gap-6 overflow-y-auto pr-2 custom-scrollbar">
        
        <ToolHeader 
            title="Studio Pro Vision" 
            description="Crie fotos comerciais ultra-realistas com motor de renderização 8K." 
            icon={Camera}
            helpSteps={[
                "Faça upload da foto do seu produto (opcional).",
                "Escolha um Estilo (Cinematográfico, Neon, etc).",
                "Descreva o cenário e a IA fará o resto com qualidade de estúdio."
            ]}
        />

        {/* Upload Area */}
        <div className="border-2 border-dashed border-white/20 rounded-xl bg-[#0A0510] relative group hover:border-primary/50 transition-colors">
          {!image ? (
            <label className="flex flex-col items-center justify-center h-40 cursor-pointer">
              <UploadCloud className="w-8 h-8 text-slate-500 mb-2 group-hover:text-primary transition-colors" />
              <span className="text-xs font-medium text-slate-400 group-hover:text-white">Upload de Referência (Opcional)</span>
              <input type="file" className="hidden" onChange={handleUpload} accept="image/*" />
            </label>
          ) : (
            <div className="relative h-40 w-full">
              <img src={image} alt="Preview" className="w-full h-full object-contain p-4" />
              <button 
                onClick={() => setImage(null)}
                className="absolute top-2 right-2 p-1.5 bg-black/50 hover:bg-red-500/80 rounded-full text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Style Selector */}
        <div>
            <label className="text-sm font-medium text-slate-300 mb-3 flex items-center gap-2">
                <Sliders className="w-4 h-4" /> Estilo de Iluminação
            </label>
            <div className="grid grid-cols-2 gap-2">
                {STYLES.map(style => (
                    <button
                        key={style.id}
                        onClick={() => setSelectedStyle(style)}
                        className={`p-3 rounded-xl border text-left text-xs font-bold transition-all flex items-center gap-2 ${selectedStyle.id === style.id ? 'bg-white/10 border-primary text-white shadow-lg' : 'bg-[#0A0510] border-white/10 text-slate-500 hover:text-white'}`}
                    >
                        <div className={`w-3 h-3 rounded-full ${style.color}`}></div>
                        {style.name}
                    </button>
                ))}
            </div>
        </div>

        {/* Prompt Input */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-slate-300 mb-2">Prompt do Cenário</label>
          <textarea 
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full h-32 bg-[#0A0510] border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-primary transition-colors resize-none"
            placeholder="Ex: Tênis flutuando, partículas de energia, fundo desfocado..."
          ></textarea>
        </div>

        {/* Generate Button */}
        <button 
          onClick={handleGenerate}
          disabled={loading}
          className="w-full py-4 bg-gradient-to-r from-pink-500 to-primary text-white font-bold rounded-xl shadow-lg shadow-purple-500/20 hover:scale-[1.02] hover:shadow-purple-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
          {loading ? "Renderizando..." : "Gerar Imagem Pro"}
        </button>
      </div>

      {/* Right Panel: Preview */}
      <div className="w-full lg:w-2/3 bg-[#0A0510] border border-white/5 rounded-2xl relative overflow-hidden flex items-center justify-center">
        {!loading && !result && (
            <div className="text-center p-8">
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/5">
                    <ImageIcon className="w-10 h-10 text-slate-600" />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">Estúdio Virtual Pronto</h3>
                <p className="text-slate-500 font-medium max-w-sm mx-auto">Selecione o estilo e descreva o cenário. Nossa IA simula uma sessão de fotos de R$ 5.000,00.</p>
            </div>
        )}

        {loading && (
            <div className="text-center">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-primary font-bold animate-pulse text-lg">Renderizando 8K...</p>
                <p className="text-xs text-slate-500 mt-2">Aplicando texturas, luz e sombras (Gemini Pro Vision)</p>
            </div>
        )}

        {result && !loading && (
            <div className="relative w-full h-full group">
                <img src={result} alt="Result" className="w-full h-full object-contain bg-black" />
                
                {/* Overlay Actions */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/60 backdrop-blur-md px-6 py-3 rounded-full border border-white/10">
                    <a href={result} download="studio_render.png" className="flex flex-col items-center gap-1 text-white hover:text-primary transition-colors">
                        <Download className="w-5 h-5" />
                        <span className="text-[10px]">Baixar</span>
                    </a>
                    <div className="w-px h-8 bg-white/20"></div>
                     <button 
                        onClick={handleSave} 
                        disabled={isSaving}
                        className="flex flex-col items-center gap-1 text-white hover:text-primary transition-colors disabled:opacity-50"
                    >
                        {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                        <span className="text-[10px]">Salvar</span>
                    </button>
                    <div className="w-px h-8 bg-white/20"></div>
                    <button className="flex flex-col items-center gap-1 text-white hover:text-primary transition-colors">
                        <Share2 className="w-5 h-5" />
                        <span className="text-[10px]">Share</span>
                    </button>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default StudioProduct;