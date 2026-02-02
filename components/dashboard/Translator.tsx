import React, { useState } from 'react';
import { Globe, Loader2, RefreshCw, Copy, ArrowRight } from 'lucide-react';
import { translateTextAction } from '../../lib/ai-actions';
import { cleanAIResponse } from '../../lib/utils';
import ToolHeader from './ToolHeader';

const Translator: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [text, setText] = useState('');
  const [targetLang, setTargetLang] = useState('Inglês (EUA)');

  const languages = [
      "Inglês (EUA)", "Espanhol (Espanha)", "Espanhol (Latam)", "Francês", "Alemão", "Italiano", "Chinês (Mandarim)", "Japonês", "Russo"
  ];

  const handleTranslate = async () => {
    if (!text) return;
    setLoading(true);
    try {
      const res = await translateTextAction(text, targetLang);
      setResult(cleanAIResponse(res));
    } catch (e) {
      setResult("Erro na tradução.");
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
                "Cole o texto original (descrição, ad, email).",
                "Selecione o idioma de destino.",
                "A IA não traduzirá ao pé da letra, mas sim adaptará para a cultura local."
            ]}
        />

        <div className="flex-1 flex flex-col lg:flex-row gap-6 overflow-hidden">
            {/* Input Side */}
            <div className="flex-1 flex flex-col bg-surface border border-white/10 rounded-2xl p-4">
                <div className="flex justify-between mb-4">
                    <span className="text-sm font-bold text-slate-400">Texto Original</span>
                </div>
                <textarea 
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="flex-1 bg-transparent resize-none outline-none text-white placeholder:text-slate-600 leading-relaxed"
                    placeholder="Cole seu texto aqui..."
                />
            </div>

            {/* Controls (Desktop: Center Column, Mobile: Row between) */}
            <div className="flex flex-col justify-center items-center gap-4">
                <select 
                    value={targetLang}
                    onChange={(e) => setTargetLang(e.target.value)}
                    className="bg-[#0F0518] border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-primary cursor-pointer w-full lg:w-48"
                >
                    {languages.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
                
                <button 
                    onClick={handleTranslate}
                    disabled={loading || !text}
                    className="p-4 bg-primary rounded-full text-white shadow-lg hover:scale-110 transition-transform disabled:opacity-50 disabled:scale-100"
                >
                    {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <ArrowRight className="w-6 h-6" />}
                </button>
            </div>

            {/* Output Side */}
            <div className="flex-1 flex flex-col bg-[#0A0510] border border-white/5 rounded-2xl p-4 relative">
                <div className="flex justify-between mb-4">
                    <span className="text-sm font-bold text-primary">Tradução ({targetLang})</span>
                    {result && (
                        <button onClick={() => navigator.clipboard.writeText(result)} className="text-slate-500 hover:text-white">
                            <Copy className="w-4 h-4" />
                        </button>
                    )}
                </div>
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    {result ? (
                        <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">{result}</p>
                    ) : (
                        <p className="text-slate-600 italic">A tradução aparecerá aqui...</p>
                    )}
                </div>
            </div>
        </div>
    </div>
  );
};

export default Translator;