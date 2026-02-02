import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { chatSupportAction } from '../lib/ai-actions';
import { cleanAIResponse } from '../lib/utils';

const FloatingWidgets: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<{from: 'bot' | 'user', text: string}[]>([
      { from: 'bot', text: 'Olá! Sou a IA Estratégica do DropHacker. Me pergunte sobre tráfego, copy ou como escalar sua loja.' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async () => {
      if (!input.trim() || isTyping) return;
      
      const userMsg = input;
      setInput(''); // Limpa input imediatamente
      setMessages(prev => [...prev, { from: 'user', text: userMsg }]);
      
      setIsTyping(true);

      try {
          const aiResponse = await chatSupportAction(userMsg);
          // CLEANING RESPONSE TO REMOVE ** AND #
          const cleanResponse = cleanAIResponse(aiResponse);
          setMessages(prev => [...prev, { from: 'bot', text: cleanResponse }]);
      } catch (error) {
          setMessages(prev => [...prev, { from: 'bot', text: 'Minha conexão neural instabilizou. Tente novamente em alguns segundos.' }]);
      } finally {
          setIsTyping(false);
      }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[999] flex flex-col gap-4 items-end font-sans">
      
      {/* Janela de Chat */}
      <AnimatePresence>
        {isChatOpen && (
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="w-80 md:w-96 h-[500px] bg-[#0F0518] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden mb-2 ring-1 ring-white/5"
            >
                {/* Header do Chat */}
                <div className="bg-gradient-to-r from-primary to-purple-900 p-4 flex justify-between items-center shadow-lg relative z-10">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm border border-white/10">
                                <Bot className="w-6 h-6 text-white" />
                            </div>
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#0F0518] rounded-full animate-pulse"></div>
                        </div>
                        <div>
                            <div className="text-white font-bold text-sm">DropHacker AI</div>
                            <div className="text-white/70 text-[10px] uppercase tracking-wider font-bold">Consultor Elite Online</div>
                        </div>
                    </div>
                    <button onClick={() => setIsChatOpen(false)} className="text-white/70 hover:text-white transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Área de Mensagens */}
                <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-surface/50 scroll-smooth custom-scrollbar">
                    {messages.map((m, i) => (
                        <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'} items-end gap-2`}>
                            {m.from === 'bot' && (
                                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                                    <Bot className="w-3 h-3 text-primary" />
                                </div>
                            )}
                            <div 
                                className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm whitespace-pre-wrap ${
                                    m.from === 'user' 
                                    ? 'bg-primary text-white rounded-br-none' 
                                    : 'bg-white/10 text-slate-200 rounded-bl-none border border-white/5'
                                }`}
                            >
                                {m.text}
                            </div>
                            {m.from === 'user' && (
                                <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0">
                                    <User className="w-3 h-3 text-white" />
                                </div>
                            )}
                        </div>
                    ))}
                    
                    {/* Indicador de Digitação */}
                    {isTyping && (
                        <div className="flex justify-start items-end gap-2">
                             <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                                <Bot className="w-3 h-3 text-primary" />
                            </div>
                            <div className="bg-white/10 p-3 rounded-2xl rounded-bl-none border border-white/5 flex gap-1 items-center h-10">
                                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Área de Input */}
                <div className="p-3 border-t border-white/5 bg-[#0F0518] flex gap-2 items-center">
                    <input 
                        type="text" 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        disabled={isTyping}
                        className="flex-1 bg-surface border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary transition-colors placeholder:text-slate-600 disabled:opacity-50"
                        placeholder="Ex: Como escalar campanha de CBO?"
                        autoFocus
                    />
                    <button 
                        onClick={handleSend} 
                        disabled={!input.trim() || isTyping}
                        className="p-3 bg-primary rounded-xl text-white hover:bg-primaryDark disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg shadow-primary/20"
                    >
                        {isTyping ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                    </button>
                </div>
            </motion.div>
        )}
      </AnimatePresence>

      {/* Botão Flutuante Principal */}
      <div className="flex flex-col gap-4 items-end">
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1 }}
            onClick={() => setIsChatOpen(!isChatOpen)}
            className={`w-14 h-14 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-all group ${isChatOpen ? 'bg-white text-black' : 'bg-primary text-white hover:scale-110'}`}
          >
            {isChatOpen ? (
                <X className="w-6 h-6" />
            ) : (
                <div className="relative">
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border border-primary animate-ping"></span>
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border border-primary"></span>
                    <MessageSquare className="w-6 h-6 fill-current" />
                </div>
            )}
          </motion.button>
      </div>
    </div>
  );
};

export default FloatingWidgets;