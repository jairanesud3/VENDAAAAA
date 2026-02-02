import React, { useState, useEffect } from 'react';
import { UploadCloud, RefreshCw, Download, Share2, Edit, X, ImageIcon, Camera, Lock } from 'lucide-react';
import { Toast } from '../ui/Toast';
import { generateImageAction } from '../../lib/ai-actions';
import ToolHeader from './ToolHeader';
import { motion, AnimatePresence } from 'framer-motion';

const MAX_IMAGE_CREDITS = 3;

const StudioProduct: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);

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
        const resultUrl = await generateImageAction(prompt || "Product photography");
        setResult(resultUrl);
        setShowToast(true);

        const newCount = creditsUsed + 1;
        setCreditsUsed(newCount);
        localStorage.setItem('drophacker_image_credits', newCount.toString());

    } catch (e) {
        console.error(e);
    } finally {
        setLoading(false);
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
      <Toast message="Imagem gerada com sucesso!" isVisible={showToast} onClose={() => setShowToast(false)} />

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
      <div className="w-full lg:w-1/3 flex flex-col gap-6 overflow-y-auto">
        
        <ToolHeader 
            title="Studio Product AI" 
            description="Crie fotos de estúdio ultra-realistas (4K). Tecnologia Leonardo.Ai Phoenix." 
            icon={Camera}
            helpSteps={[
                "Faça upload da foto do seu produto (fundo transparente é melhor).",
                "Descreva o cenário (ex: 'Em uma mesa de madeira ao pôr do sol').",
                "Clique em 'Transformar Produto' e aguarde a renderização."
            ]}
        />

        {/* Free Credit Counter */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between">
            <span className="text-sm font-bold text-slate-300">Créditos Imagem</span>
            <div className="flex items-center gap-2">
                <div className="w-32 h-2 bg-black/50 rounded-full overflow-hidden">
                    <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${(creditsUsed / MAX_IMAGE_CREDITS) * 100}%` }}
                        className={`h-full ${creditsUsed >= MAX_IMAGE_CREDITS ? 'bg-red-500' : 'bg-pink-500'}`}
                    />
                </div>
                <span className={`text-xs font-bold ${creditsUsed >= MAX_IMAGE_CREDITS ? 'text-red-500' : 'text-pink-500'}`}>
                    {creditsUsed}/{MAX_IMAGE_CREDITS}
                </span>
            </div>
        </div>

        {/* Upload Area */}
        <div className="border-2 border-dashed border-white/20 rounded-xl bg-[#0A0510] relative group hover:border-primary/50 transition-colors">
          {!image ? (
            <label className="flex flex-col items-center justify-center h-48 cursor-pointer">
              <UploadCloud className="w-10 h-10 text-slate-500 mb-3 group-hover:text-primary transition-colors" />
              <span className="text-sm font-medium text-slate-400 group-hover:text-white">Clique para enviar foto</span>
              <span className="text-xs text-slate-600 mt-1">PNG, JPG até 5MB</span>
              <input type="file" className="hidden" onChange={handleUpload} accept="image/*" />
            </label>
          ) : (
            <div className="relative h-48 w-full">
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

        {/* Prompt Input */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-slate-300 mb-2">Descrição do Cenário</label>
          <textarea 
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full h-32 bg-[#0A0510] border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-primary transition-colors resize-none"
            placeholder="Ex: Uma garrafa térmica preta moderna em cima de uma mesa de madeira rústica com luz solar da manhã..."
          ></textarea>
        </div>

        {/* Generate Button */}
        <button 
          onClick={handleGenerate}
          disabled={loading}
          className="w-full py-4 bg-gradient-to-r from-pink-500 to-primary text-white font-bold rounded-xl shadow-lg shadow-purple-500/20 hover:scale-[1.02] hover:shadow-purple-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <RefreshCw className="w-5 h-5" />}
          {loading ? "Processando Imagem..." : (image ? "Transformar Produto" : "Gerar do Zero")}
        </button>
      </div>

      {/* Right Panel: Preview */}
      <div className="w-full lg:w-2/3 bg-[#0A0510] border border-white/5 rounded-2xl relative overflow-hidden flex items-center justify-center">
        {!loading && !result && (
            <div className="text-center p-8">
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ImageIcon className="w-10 h-10 text-slate-600" />
                </div>
                <p className="text-slate-500 font-medium">Descreva o cenário e clique em Transformar.</p>
            </div>
        )}

        {loading && (
            <div className="text-center">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-primary font-bold animate-pulse">A Mágica Acontece...</p>
                <p className="text-xs text-slate-500 mt-2">Conectando API Leonardo.Ai</p>
            </div>
        )}

        {result && !loading && (
            <div className="relative w-full h-full group">
                <img src={result} alt="Result" className="w-full h-full object-cover" />
                
                {/* Overlay Actions */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/60 backdrop-blur-md px-6 py-3 rounded-full border border-white/10">
                    <button className="flex flex-col items-center gap-1 text-white hover:text-primary transition-colors">
                        <Download className="w-5 h-5" />
                        <span className="text-[10px]">Baixar</span>
                    </button>
                    <div className="w-px h-8 bg-white/20"></div>
                    <button className="flex flex-col items-center gap-1 text-white hover:text-primary transition-colors">
                        <Share2 className="w-5 h-5" />
                        <span className="text-[10px]">Share</span>
                    </button>
                    <div className="w-px h-8 bg-white/20"></div>
                    <button className="flex flex-col items-center gap-1 text-white hover:text-primary transition-colors">
                        <Edit className="w-5 h-5" />
                        <span className="text-[10px]">Editar</span>
                    </button>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default StudioProduct;