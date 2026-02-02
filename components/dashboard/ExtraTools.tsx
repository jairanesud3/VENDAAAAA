import React, { useState, useEffect } from 'react';
import { 
    MessageCircle, Globe, ShieldCheck, HelpCircle, 
    FileText, Tag, TrendingUp, MessageSquareWarning, 
    Search, Lightbulb, Copy, Loader2, Sparkles, ArrowLeft,
    Video, Instagram, Mail, Key, Users, Target, List, MousePointer, Compass, Award, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateSmartToolAction } from '../../lib/ai-actions';
import { SmartText } from '../ui/SmartText';

// Tool Definition Interface
interface ToolDef {
    id: string;
    title: string;
    icon: any;
    desc: string;
    placeholder: string;
    color: string;
    category: 'Essential' | 'Social' | 'Strategy' | 'Copy';
    help: string[];
}

export const TOOLS_LIST: ToolDef[] = [
    // ESSENTIALS
    { id: 'product_namer', title: 'Gerador de Nomes', icon: Lightbulb, desc: 'Nomes criativos e memoráveis.', placeholder: 'Ex: Fone de ouvido à prova d\'água', color: 'text-yellow-400', category: 'Essential', help: ["Digite o tipo do produto.", "A IA criará nomes brandables."] },
    { id: 'domain_gen', title: 'Ideias de Domínio', icon: Globe, desc: 'Encontre o .com perfeito.', placeholder: 'Ex: Loja de acessórios para gatos', color: 'text-blue-400', category: 'Essential', help: ["Insira o nicho.", "A IA verifica disponibilidade de nomes."] },
    { id: 'policy_gen', title: 'Gerador de Políticas', icon: ShieldCheck, desc: 'Termos de uso e privacidade.', placeholder: 'Qual política você precisa? (Ex: Trocas)', color: 'text-slate-300', category: 'Essential', help: ["Escolha o tipo de política.", "Copie e cole no rodapé da loja."] },
    { id: 'faq_gen', title: 'Criador de FAQ', icon: HelpCircle, desc: 'Quebre objeções de venda.', placeholder: 'Nome do produto ou serviço', color: 'text-purple-400', category: 'Essential', help: ["Digite o produto.", "A IA gera perguntas e respostas para quebra de objeção."] },
    { id: 'review_reply', title: 'Responder Reviews', icon: MessageSquareWarning, desc: 'Respostas profissionais.', placeholder: 'Cole a avaliação do cliente aqui...', color: 'text-orange-400', category: 'Essential', help: ["Cole o review negativo ou positivo.", "A IA responde com empatia."] },

    // SOCIAL & ADS
    { id: 'video_script', title: 'Roteiro TikTok/Reels', icon: Video, desc: 'Scripts virais de 15s.', placeholder: 'Produto para o vídeo', color: 'text-pink-500', category: 'Social', help: ["Insira o produto.", "A IA cria a estrutura visual e falada do vídeo."] },
    { id: 'insta_bio', title: 'Bio Instagram', icon: Instagram, desc: 'Bios que convertem visitantes.', placeholder: 'Nicho da sua loja', color: 'text-fuchsia-500', category: 'Social', help: ["Descreva sua loja.", "Escolha a bio que passa mais autoridade."] },
    { id: 'hashtags', title: 'Hashtags Virais', icon: Tag, desc: 'Tags para TikTok/Insta.', placeholder: 'Tema do vídeo ou produto', color: 'text-cyan-400', category: 'Social', help: ["Digite o assunto.", "Copie os blocos de hashtags segmentadas."] },
    { id: 'influencer_brief', title: 'Briefing Influencer', icon: Users, desc: 'Guia para parcerias.', placeholder: 'Produto e objetivo', color: 'text-rose-400', category: 'Social', help: ["Defina o objetivo da campanha.", "Envie o PDF gerado para o influencer."] },
    { id: 'whatsapp_recovery', title: 'Scripts WhatsApp', icon: MessageCircle, desc: 'Recupere boletos e carrinhos.', placeholder: 'Ex: Cliente abandonou carrinho de um Smartwatch', color: 'text-green-500', category: 'Social', help: ["Escolha o motivo do contato.", "Use a mensagem para converter a venda."] },

    // COPYWRITING
    { id: 'product_desc', title: 'Descrição Matadora', icon: FileText, desc: 'Copy para página de vendas.', placeholder: 'Nome e características do produto', color: 'text-pink-400', category: 'Copy', help: ["Cole as características técnicas.", "A IA transforma em benefícios emocionais."] },
    { id: 'headline_seo', title: 'Headlines SEO', icon: Search, desc: 'Títulos de alta taxa de clique.', placeholder: 'Palavra-chave principal', color: 'text-blue-500', category: 'Copy', help: ["Palavra-chave principal.", "Use os títulos em H1 e H2."] },
    { id: 'email_sequence', title: 'Sequência de E-mail', icon: Mail, desc: '3 e-mails de aquecimento.', placeholder: 'Produto ou Isca Digital', color: 'text-indigo-400', category: 'Copy', help: ["Defina o produto.", "Configure os emails no seu CRM."] },
    { id: 'cta_generator', title: 'Gerador de CTA', icon: MousePointer, desc: 'Chamadas para ação agressivas.', placeholder: 'Onde o cliente deve clicar?', color: 'text-red-500', category: 'Copy', help: ["Onde vai o botão?", "A IA cria textos curtos de ação."] },
    { id: 'benefit_stack', title: 'Lista de Benefícios', icon: List, desc: 'Transforme features em desejos.', placeholder: 'Característica técnica do produto', color: 'text-emerald-400', category: 'Copy', help: ["Liste o que o produto faz.", "A IA lista por que o cliente precisa disso."] },

    // STRATEGY
    { id: 'competitor_analysis', title: 'Análise SWOT', icon: Target, desc: 'Espione os concorrentes.', placeholder: 'Qual o seu nicho ou produto principal?', color: 'text-red-400', category: 'Strategy', help: ["Seu nicho.", "A IA analisa forças e fraquezas do mercado."] },
    { id: 'upsell', title: 'Estratégia Upsell', icon: TrendingUp, desc: 'Aumente o LTV.', placeholder: 'Produto principal que o cliente comprou', color: 'text-emerald-400', category: 'Strategy', help: ["Produto principal.", "A IA sugere produtos complementares."] },
    { id: 'objection_killer', title: 'Quebra Objeções', icon: Key, desc: 'Mate a dúvida do cliente.', placeholder: 'Produto/Serviço', color: 'text-amber-400', category: 'Strategy', help: ["O que impede a compra?", "A IA gera argumentos lógicos."] },
    { id: 'niche_finder', title: 'Explorador de Nicho', icon: Compass, desc: 'Encontre oceanos azuis.', placeholder: 'Interesse geral (ex: Pets)', color: 'text-teal-400', category: 'Strategy', help: ["Interesse macro.", "A IA encontra sub-nichos lucrativos."] },
    { id: 'value_prop', title: 'Proposta de Valor', icon: Award, desc: 'Sua frase única (PUV).', placeholder: 'O que você vende?', color: 'text-gold-400', category: 'Strategy', help: ["O que você vende?", "A IA define sua frase única de marketing."] },
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
  const [showHelp, setShowHelp] = useState(false);

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
        // SECURITY CHECK - Prevent rapid fire requests (Basic Frontend Rate Limit)
        const lastRun = localStorage.getItem(`last_run_${selectedTool.id}`);
        const now = Date.now();
        if (lastRun && now - parseInt(lastRun) < 2000) {
            throw new Error("Aguarde um momento entre gerações.");
        }
        localStorage.setItem(`last_run_${selectedTool.id}`, now.toString());

        const res = await generateSmartToolAction(selectedTool.id, input);
        setResult(res); 
    } catch (e: any) {
        setResult(e.message || "Erro ao gerar. Tente novamente.");
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

  const categories = ['Essential', 'Social', 'Copy', 'Strategy'];

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col relative">
      
      {/* Header (Only if no specific tool selected from parent) */}
      {!selectedTool && (
          <div className="mb-6 flex-shrink-0">
            <h1 className="text-3xl font-bold text-white mb-2">Caixa de Ferramentas Pro</h1>
            <p className="text-slate-400">20 Utilitários de IA organizados para cada etapa da sua operação.</p>
          </div>
      )}

      {/* Grid View */}
      {!selectedTool && (
          <div className="overflow-y-auto pb-20 custom-scrollbar flex-1 pr-2">
              {categories.map(cat => (
                  <div key={cat} className="mb-8">
                      <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4 pl-1">{cat === 'Essential' ? 'Essenciais' : cat === 'Social' ? 'Social Media' : cat === 'Copy' ? 'Copywriting' : 'Estratégia'}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {TOOLS_LIST.filter(t => t.category === cat).map(tool => (
                            <motion.button
                                key={tool.id}
                                onClick={() => setSelectedTool(tool)}
                                whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.03)' }}
                                whileTap={{ scale: 0.98 }}
                                className="flex flex-col items-start p-5 bg-surface border border-white/5 rounded-2xl text-left hover:border-primary/50 transition-colors group h-full"
                            >
                                <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-3 group-hover:bg-white/10 transition-colors`}>
                                    <tool.icon className={`w-5 h-5 ${tool.color}`} />
                                </div>
                                <h3 className="text-sm font-bold text-white mb-1 group-hover:text-primary transition-colors">{tool.title}</h3>
                                <p className="text-xs text-slate-500 line-clamp-2">{tool.desc}</p>
                            </motion.button>
                        ))}
                      </div>
                  </div>
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
                         <div className="flex justify-between items-start mb-4">
                             <button onClick={reset} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-xs font-bold uppercase tracking-wider">
                                <ArrowLeft className="w-3 h-3" /> Voltar
                            </button>
                            <button 
                                onClick={() => setShowHelp(true)}
                                className="flex items-center gap-1 text-[10px] bg-white/5 hover:bg-white/10 text-primary px-2 py-1 rounded-full border border-white/10 transition-colors font-bold"
                            >
                                <HelpCircle className="w-3 h-3" /> Como usar?
                            </button>
                         </div>
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
                        <label className="block text-sm font-medium text-slate-300 mb-2">O que você precisa?</label>
                        <textarea 
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="w-full h-48 bg-[#05010D] border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-primary transition-colors resize-none mb-4 leading-relaxed"
                            placeholder={selectedTool.placeholder}
                            autoFocus
                        ></textarea>
                        
                        <div className="bg-primary/5 border border-primary/10 rounded-lg p-3">
                            <p className="text-xs text-slate-400 flex gap-2">
                                <Sparkles className="w-4 h-4 text-primary flex-shrink-0" />
                                <span>Dica: Quanto mais detalhes você der, melhor será o resultado da IA.</span>
                            </p>
                        </div>
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
                            <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
                                <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">RESPOSTA DA IA</span>
                                <button 
                                    onClick={() => navigator.clipboard.writeText(result)}
                                    className="text-xs text-white hover:text-primary flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10 transition-all"
                                >
                                    <Copy className="w-3 h-3" /> Copiar
                                </button>
                            </div>
                            
                            {/* USE SMART TEXT RENDERER */}
                            <SmartText content={result} />
                            
                        </div>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-center p-8 text-slate-500 opacity-50">
                            <selectedTool.icon className="w-16 h-16 mb-4 animate-pulse-slow" />
                            <p>O resultado formatado aparecerá aqui.</p>
                        </div>
                    )}
                </div>
            </motion.div>
        )}
      </AnimatePresence>

      {/* Help Modal */}
      <AnimatePresence>
        {showHelp && selectedTool && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="bg-[#0F0518] border border-white/10 rounded-2xl p-6 max-w-sm w-full relative"
                >
                    <button onClick={() => setShowHelp(false)} className="absolute top-4 right-4 text-slate-500 hover:text-white">
                        <X className="w-5 h-5" />
                    </button>
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <HelpCircle className="w-5 h-5 text-primary" /> Como usar
                    </h3>
                    <ul className="space-y-3">
                        {selectedTool.help.map((step, i) => (
                            <li key={i} className="flex gap-3 text-sm text-slate-300">
                                <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold shrink-0">{i+1}</span>
                                {step}
                            </li>
                        ))}
                    </ul>
                </motion.div>
            </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ExtraTools;