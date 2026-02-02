import React, { useState, useEffect } from 'react';
import { 
    MessageCircle, Globe, ShieldCheck, HelpCircle, 
    FileText, Tag, TrendingUp, MessageSquareWarning, 
    Search, Lightbulb, Copy, Loader2, Sparkles, ArrowLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateSmartToolAction } from '../../lib/ai-actions';
import { cleanAIResponse } from '../../lib/utils';

// Tool Definition Interface
interface ToolDef {
    id: string;
    title: string;
    icon: any;
    desc: string;
    placeholder: string;
    color: string;
}

export const TOOLS_LIST: ToolDef[] = [
    { id: 'product_namer', title: 'Gerador de Nomes', icon: Lightbulb, desc: 'Nomes criativos e memoráveis.', placeholder: 'Ex: Fone de ouvido à prova d\'água', color: 'text-yellow-400' },
    { id: 'domain_gen', title: 'Ideias de Domínio', icon: Globe, desc: 'Encontre o .com perfeito.', placeholder: 'Ex: Loja de acessórios para gatos', color: 'text-blue-400' },
    { id: 'whatsapp_recovery', title: 'Scripts WhatsApp', icon: MessageCircle, desc: 'Recupere boletos e carrinhos.', placeholder: 'Ex: Cliente abandonou carrinho de um Smartwatch', color: 'text-green-500' },
    { id: 'review_reply', title: 'Responder Reviews', icon: MessageSquareWarning, desc: 'Respostas profissionais.', placeholder: 'Cole a avaliação do cliente aqui...', color: 'text-orange-400' },
    { id: 'policy_gen', title: 'Gerador de Políticas', icon: ShieldCheck, desc: 'Termos de uso e privacidade.', placeholder: 'Qual política você precisa? (Ex: Trocas)', color: 'text-slate-300' },
    { id: 'faq_gen', title: 'Criador de FAQ', icon: HelpCircle, desc: 'Quebre objeções de venda.', placeholder: 'Nome do produto ou serviço', color: 'text-purple-400' },
    { id: 'product_desc', title: 'Descrição Matadora', icon: FileText, desc: 'Copy para página de vendas.', placeholder: 'Nome e características do produto', color: 'text-pink-400' },
    { id: 'competitor_analysis', title: 'Análise SWOT', icon: Search, desc: 'Espione os concorrentes.', placeholder: 'Qual o seu nicho ou produto principal?', color: 'text-red-400' },
    { id: 'hashtags', title: 'Hashtags Virais', icon: Tag, desc: 'Tags para TikTok/Insta.', placeholder: 'Tema do vídeo ou produto', color: 'text-cyan-400' },
    { id: 'upsell', title: 'Estratégia Upsell', icon: TrendingUp, desc: 'Aumente o LTV.', placeholder: 'Produto principal que o cliente comprou', color: 'text-emerald-400' },
];

interface ExtraToolsProps {
    initialToolId?: string;
    onBack?: () => void;
}

const ExtraTools: React.FC<ExtraToolsProps> = ({ initialToolId, onBack }) => {
  const [selectedTool, setSelectedTool] = useState<ToolDef | null>(null);
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
      if (initialToolId) {
          const t = TOOLS_LIST.find(t => t.id === initialToolId);
          if (t) setSelectedTool(t);
      } else {
          setSelectedTool(null);
      }
  }, [initialToolId]);

  const handleGenerate = async () => {
    if (!selectedTool || !input) return;
    setLoading(true);
    try {
        const res = await generateSmartToolAction(selectedTool.id, input);
        setResult(cleanAIResponse(res));
    } catch (e) {
        setResult("Erro ao gerar. Tente novamente.");
    } finally {
        setLoading(false);
    }
  };

  const reset = () => {
      if (onBack) onBack(); 
      else setSelectedTool(null);
      setInput('');
      setResult('');
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col relative">
      
      {/* Header (Only if no specific tool selected from parent) */}
      {!selectedTool && (
          <div className="mb-6 flex-shrink-0">
            <h1 className="text-3xl font-bold text-white mb-2">Caixa de Ferramentas</h1>
            <p className="text-slate-400">10 Utilitários de IA essenciais para destravar sua operação.</p>
          </div>
      )}

      {/* Grid View */}
      {!selectedTool && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto pb-20 custom-scrollbar flex-1">
              {TOOLS_LIST.map(tool => (
                  <motion.button
                    key={tool.id}
                    onClick={() => setSelectedTool(tool)}
                    whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.03)' }}
                    whileTap={{ scale: 0.98 }}
                    className="flex flex-col items-start p-6 bg-surface border border-white/5 rounded-2xl text-left hover:border-primary/50 transition-colors group"
                  >
                      <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4 group-hover:bg-white/10 transition-colors`}>
                          <tool.icon className={`w-6 h-6 ${tool.color}`} />
                      </div>
                      <h3 className="text-lg font-bold text-white mb-1 group-hover:text-primary transition-colors">{tool.title}</h3>
                      <p className="text-sm text-slate-500">{tool.desc}</p>
                  </motion.button>
              ))}
          </div>
      )}

      {/* Detail View */}
      <AnimatePresence>
        {selectedTool && (
            <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex-1 flex flex-col lg:flex-row gap-6 h-full overflow-hidden"
            >
                {/* Input Column - FIXED LAYOUT */}
                <div className="w-full lg:w-1/3 flex flex-col bg-surface border border-white/10 rounded-2xl overflow-hidden h-full">
                    
                    {/* Header */}
                    <div className="p-6 border-b border-white/5 bg-[#0F0518] flex-shrink-0">
                         <button onClick={reset} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-4 text-xs font-bold uppercase tracking-wider">
                            <ArrowLeft className="w-3 h-3" /> Voltar
                        </button>
                        <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center`}>
                                <selectedTool.icon className={`w-5 h-5 ${selectedTool.color}`} />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-white">{selectedTool.title}</h2>
                                <p className="text-[10px] text-primary">IA Otimizada V4.0</p>
                            </div>
                        </div>
                    </div>

                    {/* Scrollable Input Area */}
                    <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                        <label className="block text-sm font-medium text-slate-300 mb-2">Entrada de Dados</label>
                        <textarea 
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="w-full h-48 bg-[#05010D] border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-primary transition-colors resize-none mb-4 leading-relaxed"
                            placeholder={selectedTool.placeholder}
                            autoFocus
                        ></textarea>
                    </div>

                    {/* Fixed Bottom Button */}
                    <div className="p-4 border-t border-white/5 bg-[#0F0518] flex-shrink-0">
                        <button 
                            onClick={handleGenerate}
                            disabled={loading || !input}
                            className="w-full py-4 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                            {loading ? 'Processando...' : 'Gerar Resultado'}
                        </button>
                    </div>
                </div>

                {/* Result Column */}
                <div className="w-full lg:w-2/3 bg-[#0A0510] border border-white/5 rounded-2xl flex flex-col overflow-hidden relative shadow-inner h-full lg:h-auto">
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
                            <selectedTool.icon className="w-16 h-16 mb-4 animate-pulse-slow" />
                            <p>O resultado da IA aparecerá aqui.</p>
                        </div>
                    )}
                </div>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ExtraTools;