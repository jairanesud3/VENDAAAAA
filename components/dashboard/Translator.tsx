import React, { useState } from 'react';
import { Globe, Loader2, Copy, ArrowRight } from 'lucide-react';
import { translateTextAction } from '../../lib/ai-actions';
import { cleanAIResponse } from '../../lib/utils';
import ToolHeader from './ToolHeader';

const Translator: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [text, setText] = useState('');
  const [targetLang, setTargetLang] = useState('Inglês (EUA)');

  const languages = [
      "Inglês (EUA)", "Inglês (Reino Unido)", "Espanhol (Espanha)", "Espanhol (México/Latam)", "Português (Portugal)", 
      "Francês", "Alemão", "Italiano", "Chinês (Mandarim)", "Japonês", "Russo", "Coreano", "Árabe", "Holandês", 
      "Turco", "Polonês", "Sueco", "Norueguês", "Dinamarquês", "Finlandês", "Grego", "Hebraico", "Indonésio", 
      "Tailandês", "Vietnamita", "Hindi", "Bengali", "Malaio", "Filipino", "Ucraniano", "Tcheco", "Romeno",
      "Húngaro", "Croata", "Sérvio", "Búlgaro", "Eslovaco", "Lituano", "Letão", "Estoniano"
  ];

  const handleTranslate = async () => {
    if (!text) return;
    setLoading(true);
    try {
      const res = await translateTextAction(text, targetLang);
      setResult(cleanAIResponse(res));
    } catch (e) {
      setResult("Erro na tradução. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col gap-6">
        <ToolHeader 
            title="Tradutor Neural Pro" 
            description="Tradução contextual com adaptação de gírias e termos de marketing para escala global."
            icon={Globe}
            helpSteps={[
                "Cole o texto original (descrição, ad, email, script).",
                "Selecione o idioma de destino na lista completa.",
                "A IA não traduzirá ao pé da letra, mas sim adaptará para a cultura local mantendo a persuasão."
            ]}
        />

        <div className="flex-1 flex flex-col lg:flex-row gap-6 overflow-hidden">
            {/* Input Side */}
            <div className="flex-1 flex flex-col bg-surface border border-white/10 rounded-2xl p-4 shadow-lg">
                <div className="flex justify-between mb-4">
                    <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Texto Original</span>
                </div>
                <textarea 
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="flex-1 bg-transparent resize-none outline-none text-white placeholder:text-slate-600 leading-relaxed custom-scrollbar text-sm md:text-base"
                    placeholder="Cole seu texto aqui..."
                />
            </div>

            {/* Controls */}
            <div className="flex flex-col justify-center items-center gap-4 shrink-0">
                <div className="w-full lg:w-48 relative">
                    <select 
                        value={targetLang}
                        onChange={(e) => setTargetLang(e.target.value)}
                        className="w-full bg-[#0F0518] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-primary cursor-pointer appearance-none shadow-lg hover:border-primary/50 transition-colors"
                    >
                        {languages.sort().map(l => <option key={l} value={l}>{l}</option>)}
                    </select>
                    <Globe className="absolute right-3 top-3.5 w-4 h-4 text-slate-500 pointer-events-none" />
                </div>
                
                <button 
                    onClick={handleTranslate}
                    disabled={loading || !text}
                    className="p-4 bg-gradient-to-br from-primary to-purple-600 rounded-full text-white shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:scale-110 transition-transform disabled:opacity-50 disabled:scale-100 disabled:shadow-none"
                >
                    {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <ArrowRight className="w-6 h-6" />}
                </button>
            </div>

            {/* Output Side */}
            <div className="flex-1 flex flex-col bg-[#0A0510] border border-white/5 rounded-2xl p-4 relative shadow-inner">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-sm font-bold text-primary uppercase tracking-wider">Resultado ({targetLang})</span>
                    {result && (
                        <button 
                            onClick={() => navigator.clipboard.writeText(result)}
                            className="flex items-center gap-2 text-xs font-bold text-white bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg border border-white/5 transition-colors"
                        >
                            <Copy className="w-3 h-3" /> Copiar
                        </button>
                    )}
                </div>
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    {result ? (
                        <p className="text-slate-300 leading-relaxed whitespace-pre-wrap text-sm md:text-base selection:bg-primary/30">
                            {result}
                        </p>
                    ) : (
                        <div className="h-full flex items-center justify-center text-slate-600 italic">
                            A tradução aparecerá aqui...
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>
  );
};

export default Translator;