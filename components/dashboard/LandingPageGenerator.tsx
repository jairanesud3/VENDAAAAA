import React, { useState } from 'react';
import { Layout, Loader2, Sparkles, Copy } from 'lucide-react';
import { generateLandingPageAction } from '../../lib/ai-actions';
import { cleanAIResponse } from '../../lib/utils';
import ToolHeader from './ToolHeader';

const LandingPageGenerator: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [product, setProduct] = useState('');
  const [niche, setNiche] = useState('');
  const [offer, setOffer] = useState('');

  const handleGenerate = async () => {
    if (!product || !niche) return;
    setLoading(true);
    try {
      const res = await generateLandingPageAction(product, niche, offer);
      setResult(cleanAIResponse(res));
    } catch (e) {
      console.error(e);
      setResult("Erro ao gerar landing page. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col lg:flex-row gap-6">
      {/* Inputs */}
      <div className="w-full lg:w-1/3 flex flex-col gap-6 overflow-y-auto pr-2 custom-scrollbar">
        <ToolHeader 
            title="Landing Page Creator" 
            description="Gere a estrutura completa de texto para páginas de alta conversão (Shopify/Yampi)."
            icon={Layout}
            helpSteps={[
                "Informe o nome do produto.",
                "Defina o nicho (ex: Beleza, Tech).",
                "Digite sua oferta (ex: Frete Grátis + Brinde).",
                "A IA criará Headlines, Benefícios e FAQ."
            ]}
        />
        
        <div className="space-y-5">
            <div>
                <label className="text-sm font-medium text-slate-300 block mb-2">Nome do Produto</label>
                <input value={product} onChange={e => setProduct(e.target.value)} className="w-full bg-surface border border-white/10 rounded-lg p-3 text-white focus:border-primary outline-none" placeholder="Ex: Smartwatch Ultra 9" />
            </div>
            <div>
                <label className="text-sm font-medium text-slate-300 block mb-2">Nicho</label>
                <input value={niche} onChange={e => setNiche(e.target.value)} className="w-full bg-surface border border-white/10 rounded-lg p-3 text-white focus:border-primary outline-none" placeholder="Ex: Tecnologia / Acessórios" />
            </div>
            <div>
                <label className="text-sm font-medium text-slate-300 block mb-2">Oferta Irresistível (Opcional)</label>
                <input value={offer} onChange={e => setOffer(e.target.value)} className="w-full bg-surface border border-white/10 rounded-lg p-3 text-white focus:border-primary outline-none" placeholder="Ex: 50% OFF + Frete Grátis hoje" />
            </div>
        </div>

        <button 
          onClick={handleGenerate}
          disabled={loading || !product}
          className="w-full py-4 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all disabled:opacity-50 mt-8 flex items-center justify-center gap-2 group"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5 group-hover:text-yellow-200" />}
          {loading ? 'Construindo Página...' : 'Gerar Landing Page'}
        </button>
      </div>

      {/* Result */}
      <div className="w-full lg:w-2/3 bg-[#0A0510] border border-white/5 rounded-2xl flex flex-col overflow-hidden relative shadow-inner">
        {result ? (
          <div className="flex-1 p-8 overflow-y-auto relative custom-scrollbar">
            <button 
                onClick={() => navigator.clipboard.writeText(result)}
                className="absolute top-4 right-4 text-xs text-primary hover:text-white flex items-center gap-1 bg-black/50 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/10 hover:border-primary/50 transition-all z-10"
            >
              <Copy className="w-3 h-3" /> Copiar
            </button>
            <div className="whitespace-pre-wrap text-slate-300 leading-relaxed font-sans text-sm selection:bg-primary/30">
              {result}
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8 text-slate-500 opacity-50">
            <Layout className="w-16 h-16 mb-4 animate-pulse-slow" />
            <p>Preencha os dados para criar sua página de vendas.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingPageGenerator;