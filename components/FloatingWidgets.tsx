import React, { useState } from 'react';
import { MessageCircle, MessageSquare, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FloatingWidgets: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<{from: 'bot' | 'user', text: string}[]>([
      { from: 'bot', text: 'Olá! Sou o assistente do DropHacker. Como posso ajudar você a escalar hoje?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
      if (!input.trim()) return;
      setMessages([...messages, { from: 'user', text: input }]);
      setInput('');
      
      // Simulate reply
      setTimeout(() => {
          setMessages(prev => [...prev, { from: 'bot', text: 'Entendi! Um de nossos especialistas humanos entrará em contato em breve.' }]);
      }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4 items-end">
      
      {/* Chat Window */}
      <AnimatePresence>
        {isChatOpen && (
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="w-80 h-96 bg-[#0F0518] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden mb-2"
            >
                {/* Chat Header */}
                <div className="bg-primary/10 p-4 border-b border-white/5 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        <span className="text-white font-bold text-sm">Suporte Online</span>
                    </div>
                    <button onClick={() => setIsChatOpen(false)} className="text-slate-400 hover:text-white">
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Messages */}
                <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-surface/50">
                    {messages.map((m, i) => (
                        <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] p-3 rounded-xl text-xs leading-relaxed ${m.from === 'user' ? 'bg-primary text-white rounded-br-none' : 'bg-white/10 text-slate-300 rounded-bl-none'}`}>
                                {m.text}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Input */}
                <div className="p-3 border-t border-white/5 flex gap-2 bg-[#0F0518]">
                    <input 
                        type="text" 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        className="flex-1 bg-surface border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-primary"
                        placeholder="Digite sua dúvida..."
                    />
                    <button onClick={handleSend} className="p-2 bg-primary rounded-lg text-white hover:bg-primaryDark">
                        <Send className="w-4 h-4" />
                    </button>
                </div>
            </motion.div>
        )}
      </AnimatePresence>

      {/* Buttons Container */}
      <div className="flex flex-col gap-4">
          {/* AI Support Widget Toggle */}
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1 }}
            onClick={() => setIsChatOpen(!isChatOpen)}
            className="w-14 h-14 bg-card border border-primary/30 rounded-full flex items-center justify-center text-primary shadow-lg hover:shadow-neon-purple transition-all group"
            title="Chat Suporte"
          >
            {isChatOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6 group-hover:scale-110 transition-transform" />}
          </motion.button>

          {/* WhatsApp Widget (Functional) */}
          <motion.a
            href="https://wa.me/5511999999999?text=Ol%C3%A1%2C%20tenho%20d%C3%BAvidas%20sobre%20o%20DropHacker"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.2 }}
            whileHover={{ scale: 1.1 }}
            className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-neon-green transition-all relative"
            title="Falar no WhatsApp"
          >
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-black animate-pulse"></span>
            <MessageCircle className="w-7 h-7" />
          </motion.a>
      </div>
    </div>
  );
};

export default FloatingWidgets;