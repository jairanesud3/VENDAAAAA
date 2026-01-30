import React, { useState } from 'react';
import { Copy, Instagram, Facebook, Zap, Loader2, Twitter, Linkedin, Pin, Megaphone } from 'lucide-react';
import { Toast } from '../ui/Toast';
import { generateAdCopyAction } from '../../lib/ai-actions';
import HelpModal from '../ui/HelpModal';
import { ToolHeader } from '../ui/ToolHeader';

const AdGenerator: React.FC = () => {
  const [selectedSocials, setSelectedSocials] = useState<string[]>(['instagram']);
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedText, setGeneratedText] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('instagram');
  const [showToast, setShowToast] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  const socials = [
    { id: 'instagram', icon: Instagram, label: 'Instagram', color: 'text-pink-500', hoverBorder: 'hover:border-pink-500' },
    { id: 'facebook', icon: Facebook, label: 'Facebook', color: 'text-blue-500', hoverBorder: 'hover:border-blue-500' },
    { id: 'tiktok', icon: Zap, label: 'TikTok', color: 'text-cyan-400', hoverBorder: 'hover:border-cyan-400' },
    { id: 'twitter', icon: Twitter, label: 'Twitter', color: 'text-sky-500', hoverBorder: 'hover:border-sky-500' },
    { id: 'pinterest', icon: Pin, label: 'Pinterest', color: 'text-red-600', hoverBorder: 'hover:border-red-600' },
    { id: 'linkedin', icon: Linkedin, label: 'LinkedIn', color: 'text-blue-700', hoverBorder: 'hover:border-blue-700' },
  ];

  const toggleSocial = (id: string) => {
    if (selectedSocials.includes(id)) {
      setSelectedSocials(selectedSocials.filter(s => s !== id));
    } else {
      if (selectedSocials.length < 3) {
        setSelectedSocials([...selectedSocials, id]);
      }
    }
  };

  const handleGenerate = async () => {
    if (!productName) return;
    
    setLoading(true);
    setGeneratedText(null);
    
    try {
      const result = await generateAdCopyAction(productName, price, selectedSocials[0]);
      setGeneratedText(result);
      if (selectedSocials.length > 0) setActiveTab(selectedSocials[0]);
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
        setShowToast(true);
      }
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col lg:flex-row gap-6">
      <Toast message="Texto copiado para a área de transferência!" isVisible={showToast} onClose={() => setShowToast(false)} />
      <HelpModal 
        isOpen={showHelp} 
        onClose={() => setShowHelp(false)} 
        title="Como criar Anúncios Virais"
        steps={[
            "Digite o nome exato do produto que você está vendendo.",
            "Selecione até 3 redes sociais onde você pretende anunciar.",
            "Clique em Gerar e deixe a IA usar frameworks de persuasão como AIDA para criar sua copy."
        ]}
      />

      {/* Left Panel: Configuration */}
      <div className="w-full lg:w-1/3 flex flex-col gap-6 overflow-y-auto pr-2 custom-scrollbar">
        
        <ToolHeader 
            title="Gerador de Anúncios" 
            description="Crie copies persuasivas usando Gemini Flash." 
            icon={Megaphone}
            onHelp={() => setShowHelp(true)}
        />

        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Nome do Produto</label>
                <input 
                  type="text" 
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="w-full bg-[#0A0510] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors placeholder:text-slate-600" 
                  placeholder="Ex: Corretor de Postura" 
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Preço (Opcional)</label>
                <input 
                  type="text" 
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full bg-[#0A0510] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors placeholder:text-slate-600" 
                  placeholder="R$ 97,90" 
                />
            </div>
        </div>

        <div>
            <div className="flex justify-between items-center mb-3">
                <label className="block text-sm font-medium text-slate-300">Selecione as Redes</label>
                <span className="text-xs text-slate-500 font-bold bg-white/5 px-2 py-0.5 rounded">
                    {selectedSocials.length}/3
                </span>
            </div>
            <div className="grid grid-cols-2 gap-3">
                {socials.map((s) => (
                    <button
                        key={s.id}
                        onClick={() => toggleSocial(s.id)}
                        className={`
                            flex items-center gap-3 p-3 rounded-xl border transition-all duration-200 text-sm font-medium
                            ${selectedSocials.includes(s.id) 
                                ? `bg-primary/10 border-primary text-white shadow-[0_0_10px_rgba(168,85,247,0.15)]` 
                                : `bg-[#0A0510] border-white/10 text-slate-500 hover:text-slate-300 hover:bg-white/5`
                            }
                        `}
                    >
                        <s.icon className={`w-4 h-4 ${selectedSocials.includes(s.id) ? s.color : 'text-current'}`} />
                        <span>{s.label}</span>
                    </button>
                ))}
            </div>
        </div>

        <button 
            onClick={handleGenerate}
            disabled={loading || selectedSocials.length === 0 || !productName}
            className="w-full py-4 bg-primary text-white font-bold rounded-xl shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] hover:scale-[1.02] transition-all mt-auto disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5" />}
            {loading ? 'Gerando Copies...' : 'Gerar Resultado'}
        </button>
      </div>

      {/* Right Panel: Result */}
      <div className="w-full lg:w-2/3 bg-[#0A0510] border border-white/5 rounded-2xl flex flex-col overflow-hidden shadow-inner relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none"></div>

        {!generatedText && !loading ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 text-slate-500">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                    <Copy className="w-8 h-8 opacity-40" />
                </div>
                <p className="font-medium">Configure seu produto e selecione as redes para gerar.</p>
            </div>
        ) : (
            <>
                {/* Tabs */}
                <div className="flex border-b border-white/5 bg-surface/50 relative z-10">
                    {selectedSocials.map(id => {
                        const social = socials.find(s => s.id === id);
                        return (
                            <button
                                key={id}
                                onClick={() => setActiveTab(id)}
                                className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors relative ${activeTab === id ? 'text-white bg-white/5' : 'text-slate-500 hover:text-slate-300'}`}
                            >
                                <span className={activeTab === id ? social?.color : ''}>{social?.label}</span>
                                {activeTab === id && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></div>}
                            </button>
                        );
                    })}
                </div>

                {/* Content Area */}
                <div className="flex-1 p-6 overflow-y-auto flex gap-6 custom-scrollbar relative z-10">
                   {loading ? (
                       <div className="w-full h-full flex flex-col gap-4">
                           <div className="h-64 bg-white/5 rounded-xl animate-pulse"></div>
                           <div className="space-y-2">
                               <div className="h-4 bg-white/5 rounded w-3/4 animate-pulse"></div>
                               <div className="h-4 bg-white/5 rounded w-full animate-pulse"></div>
                           </div>
                           <div className="text-center text-primary mt-4 animate-pulse font-medium">
                               A IA está criando sua copy viral...
                           </div>
                       </div>
                   ) : (
                       <>
                        {/* Copy Text - Markdown Styled */}
                        <div className="flex-1 flex flex-col">
                            <div className="flex justify-between items-center mb-3">
                                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Texto Gerado</span>
                                <button onClick={handleCopy} className="text-xs text-primary hover:text-white flex items-center gap-1 font-bold bg-primary/10 px-2 py-1 rounded">
                                    <Copy className="w-3 h-3" /> Copiar
                                </button>
                            </div>
                            <div className="flex-1 bg-black/40 border border-white/10 rounded-xl p-5 text-slate-300 text-sm whitespace-pre-wrap font-sans leading-7 selection:bg-primary/30 prose prose-invert max-w-none shadow-inner">
                                {generatedText}
                            </div>
                        </div>

                        {/* Mobile Preview Mockup */}
                        <div className="w-[280px] flex-shrink-0 hidden xl:block bg-black border border-white/10 rounded-[30px] overflow-hidden shadow-2xl scale-95 origin-top">
                            {/* Fake Header */}
                            <div className="h-14 border-b border-white/10 flex items-center px-4 gap-3 bg-neutral-900">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-pink-500"></div>
                                <div className="flex-1">
                                    <div className="h-2 w-20 bg-white/20 rounded mb-1"></div>
                                    <div className="h-1.5 w-12 bg-white/10 rounded"></div>
                                </div>
                            </div>
                            {/* Fake Image */}
                            <div className="h-72 bg-neutral-800 flex items-center justify-center text-slate-600 text-xs">
                                Imagem do Produto
                            </div>
                            {/* Fake Actions */}
                            <div className="h-12 px-4 flex items-center gap-4 bg-neutral-900">
                                <div className="w-5 h-5 rounded-full bg-white/10"></div>
                                <div className="w-5 h-5 rounded-full bg-white/10"></div>
                                <div className="w-5 h-5 rounded-full bg-white/10"></div>
                            </div>
                            {/* Fake Caption */}
                            <div className="px-4 pb-4 space-y-2 bg-neutral-900 h-full">
                                <div className="h-2 w-full bg-white/20 rounded"></div>
                                <div className="h-2 w-full bg-white/20 rounded"></div>
                                <div className="h-2 w-2/3 bg-white/20 rounded"></div>
                                <div className="mt-2 h-2 w-1/3 bg-blue-500/40 rounded"></div>
                            </div>
                        </div>
                       </>
                   )}
                </div>
            </>
        )}
      </div>
    </div>
  );
};

export default AdGenerator;