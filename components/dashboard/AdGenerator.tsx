import React, { useState } from 'react';
import { Copy, Instagram, Facebook, Zap, Loader2, Twitter, Linkedin, Pin, Megaphone, Check } from 'lucide-react';
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

  // Redes Sociais com Nomes Claros
  const socials = [
    { id: 'instagram', icon: Instagram, label: 'Instagram', color: 'text-pink-500', bg: 'hover:bg-pink-500/10' },
    { id: 'facebook', icon: Facebook, label: 'Facebook', color: 'text-blue-500', bg: 'hover:bg-blue-500/10' },
    { id: 'tiktok', icon: Zap, label: 'TikTok', color: 'text-cyan-400', bg: 'hover:bg-cyan-400/10' },
    { id: 'twitter', icon: Twitter, label: 'Twitter (X)', color: 'text-sky-500', bg: 'hover:bg-sky-500/10' },
    { id: 'linkedin', icon: Linkedin, label: 'LinkedIn', color: 'text-blue-700', bg: 'hover:bg-blue-700/10' },
    { id: 'pinterest', icon: Pin, label: 'Pinterest', color: 'text-red-600', bg: 'hover:bg-red-600/10' },
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
    <div className="h-[calc(100vh-8rem)] flex flex-col lg:flex-row gap-8">
      <Toast message="Texto copiado para a área de transferência!" isVisible={showToast} onClose={() => setShowToast(false)} />
      <HelpModal 
        isOpen={showHelp} 
        onClose={() => setShowHelp(false)} 
        title="Como criar Anúncios Virais"
        steps={[
            "Digite o nome exato do produto que você está vendendo.",
            "Selecione as redes sociais (máximo 3) onde vai anunciar.",
            "Opcional: Coloque o preço para a IA criar ancoragem de valor.",
            "Clique em Gerar e receba copies validadas pelo framework AIDA."
        ]}
      />

      {/* Painel Esquerdo: Configuração */}
      <div className="w-full lg:w-1/3 flex flex-col gap-6 overflow-y-auto pr-2 custom-scrollbar">
        
        <ToolHeader 
            title="Gerador de Anúncios" 
            description="Crie copies de alta conversão usando a engine Gemini Flash treinada com 20k anúncios." 
            icon={Megaphone}
            onHelp={() => setShowHelp(true)}
        />

        <div className="space-y-5 bg-[#0A0510] border border-white/5 p-6 rounded-2xl">
            <div>
                <label className="block text-sm font-bold text-slate-300 mb-2">Nome do Produto</label>
                <input 
                  type="text" 
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="w-full bg-surface border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-primary transition-all placeholder:text-slate-600 focus:shadow-[0_0_15px_rgba(168,85,247,0.2)]" 
                  placeholder="Ex: Corretor de Postura Ortopédico" 
                />
            </div>
            <div>
                <label className="block text-sm font-bold text-slate-300 mb-2">Preço da Oferta (Opcional)</label>
                <input 
                  type="text" 
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full bg-surface border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-primary transition-all placeholder:text-slate-600" 
                  placeholder="R$ 97,90" 
                />
            </div>
        </div>

        <div className="bg-[#0A0510] border border-white/5 p-6 rounded-2xl">
            <div className="flex justify-between items-center mb-4">
                <label className="block text-sm font-bold text-slate-300">Onde vai anunciar?</label>
                <span className="text-[10px] font-bold text-slate-500 bg-white/5 px-2 py-1 rounded-md border border-white/5">
                    SELECIONADO: <span className="text-white">{selectedSocials.length}/3</span>
                </span>
            </div>
            <div className="grid grid-cols-2 gap-3">
                {socials.map((s) => (
                    <button
                        key={s.id}
                        onClick={() => toggleSocial(s.id)}
                        className={`
                            flex items-center gap-3 p-3 rounded-xl border transition-all duration-200 text-sm font-semibold relative overflow-hidden group
                            ${selectedSocials.includes(s.id) 
                                ? `bg-primary/10 border-primary text-white shadow-[0_0_15px_rgba(168,85,247,0.15)]` 
                                : `bg-surface border-white/5 text-slate-500 hover:text-white ${s.bg}`
                            }
                        `}
                    >
                        <s.icon className={`w-4 h-4 relative z-10 ${selectedSocials.includes(s.id) ? s.color : 'text-slate-500 group-hover:text-white'}`} />
                        <span className="relative z-10">{s.label}</span>
                        {selectedSocials.includes(s.id) && <div className="absolute top-1 right-1"><Check className="w-3 h-3 text-primary" /></div>}
                    </button>
                ))}
            </div>
        </div>

        <button 
            onClick={handleGenerate}
            disabled={loading || selectedSocials.length === 0 || !productName}
            className="w-full py-4 bg-gradient-to-r from-primary to-purple-600 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_40px_rgba(168,85,247,0.5)] hover:scale-[1.02] transition-all mt-auto disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 border border-white/10"
        >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5 fill-white" />}
            {loading ? 'Consultando IA...' : 'Gerar Anúncios Virais'}
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
                <p className="font-medium max-w-sm">Preencha os dados do produto à esquerda para liberar a criatividade da IA.</p>
            </div>
        ) : (
            <>
                {/* Tabs de Resultado */}
                <div className="flex border-b border-white/5 bg-surface/50 relative z-10 px-4 pt-2">
                    {selectedSocials.map(id => {
                        const social = socials.find(s => s.id === id);
                        return (
                            <button
                                key={id}
                                onClick={() => setActiveTab(id)}
                                className={`flex items-center gap-2 px-6 py-4 text-sm font-bold transition-all relative rounded-t-lg ${activeTab === id ? 'text-white bg-white/5 border-t border-x border-white/5' : 'text-slate-500 hover:text-slate-300'}`}
                            >
                                <span className={activeTab === id ? social?.color : ''}>{social?.label}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Área de Conteúdo */}
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
                               <h3 className="text-white font-bold text-lg animate-pulse">Criando Copy Viral...</h3>
                               <p className="text-slate-500 text-sm mt-1">Analisando 20.000+ padrões vencedores</p>
                           </div>
                       </div>
                   ) : (
                       <>
                        {/* Texto Gerado - Estilo Markdown */}
                        <div className="flex-1 flex flex-col h-full">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">RESPOSTA DA IA</span>
                                <button onClick={handleCopy} className="text-xs font-bold text-white hover:bg-white/10 flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10 transition-colors">
                                    <Copy className="w-3 h-3" /> Copiar Texto
                                </button>
                            </div>
                            
                            {/* Área de Texto Formatado */}
                            <div className="flex-1 bg-black/40 border border-white/10 rounded-xl p-6 text-slate-300 text-sm font-sans leading-7 selection:bg-primary/30 shadow-inner overflow-y-auto">
                                <div className="whitespace-pre-wrap">
                                    {generatedText}
                                </div>
                            </div>
                        </div>

                        {/* Preview Mobile (Direita) */}
                        <div className="w-[300px] flex-shrink-0 hidden xl:block">
                            <div className="text-center text-xs font-bold text-slate-500 mb-3 uppercase tracking-wider">Preview Mobile</div>
                            <div className="bg-black border border-white/10 rounded-[40px] overflow-hidden shadow-2xl h-[550px] relative ring-4 ring-white/5">
                                {/* Mockup Header */}
                                <div className="h-16 border-b border-white/10 flex items-center px-5 gap-3 bg-[#111]">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 to-red-500"></div>
                                    <div className="flex-1">
                                        <div className="h-2.5 w-24 bg-white/20 rounded mb-1.5"></div>
                                        <div className="h-2 w-16 bg-white/10 rounded"></div>
                                    </div>
                                    <div className="w-1 h-5 bg-white/20 rounded-full"></div>
                                </div>
                                {/* Mockup Image */}
                                <div className="h-64 bg-[#1a1a1a] flex items-center justify-center relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                    <span className="text-slate-600 text-xs font-medium z-10">Imagem do Produto (4:5)</span>
                                </div>
                                {/* Mockup Actions */}
                                <div className="px-4 py-3 flex justify-between bg-[#111]">
                                    <div className="flex gap-4">
                                        <div className="w-6 h-6 rounded-full border border-white/20"></div>
                                        <div className="w-6 h-6 rounded-full border border-white/20"></div>
                                        <div className="w-6 h-6 rounded-full border border-white/20"></div>
                                    </div>
                                    <div className="w-6 h-6 rounded-full border border-white/20"></div>
                                </div>
                                {/* Mockup Caption */}
                                <div className="px-4 pb-4 space-y-2 bg-[#111] h-full text-[10px] text-slate-400 leading-relaxed">
                                    <p><span className="text-white font-bold">sua_loja</span> {generatedText?.substring(0, 100)}...</p>
                                    <div className="text-slate-600 text-[9px] mt-2">Ver todos os 42 comentários</div>
                                </div>
                                {/* Mockup Home Indicator */}
                                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/20 rounded-full"></div>
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