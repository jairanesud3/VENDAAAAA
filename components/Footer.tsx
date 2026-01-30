import React, { useState } from 'react';
import { Instagram, Facebook, X, FileText, Shield } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const Footer: React.FC = () => {
  const [modalOpen, setModalOpen] = useState<'terms' | 'privacy' | null>(null);

  const LegalModal = ({ title, content }: { title: string, content: string }) => (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="bg-[#0F0518] border border-white/10 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
      >
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" /> {title}
            </h3>
            <button onClick={() => setModalOpen(null)} className="text-slate-500 hover:text-white">
                <X className="w-6 h-6" />
            </button>
        </div>
        <div className="p-6 overflow-y-auto text-slate-300 text-sm leading-relaxed whitespace-pre-line">
            {content}
        </div>
      </motion.div>
    </div>
  );

  return (
    <>
      <footer className="bg-black border-t border-white/10 py-8">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Copyright */}
          <div className="text-slate-500 text-sm">
            © 2026 DROPHACKER.AI
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            <button onClick={() => setModalOpen('terms')} className="text-slate-500 text-sm hover:text-primary transition-colors">Termos de Uso</button>
            <button onClick={() => setModalOpen('privacy')} className="text-slate-500 text-sm hover:text-primary transition-colors">Privacidade</button>
            <a href="mailto:suporte@drophacker.ai" className="text-slate-500 text-sm hover:text-primary transition-colors">Suporte</a>
          </div>

          {/* Socials */}
          <div className="flex items-center gap-4">
            <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all">
              <Facebook className="w-4 h-4" />
            </a>
          </div>

        </div>
      </footer>

      <AnimatePresence>
        {modalOpen === 'terms' && (
            <LegalModal 
                title="Termos de Uso" 
                content={`1. Aceitação dos Termos
Ao acessar e usar o DropHacker AI, você concorda em cumprir estes termos de serviço.

2. Uso da Licença
É concedida permissão para baixar temporariamente uma cópia dos materiais (informações ou software) no site DropHacker AI, apenas para visualização transitória pessoal e não comercial.

3. Isenção de responsabilidade
Os materiais no site da DropHacker AI são fornecidos 'como estão'. DropHacker AI não oferece garantias, expressas ou implícitas.`} 
            />
        )}
        {modalOpen === 'privacy' && (
             <LegalModal 
                title="Política de Privacidade" 
                content={`A sua privacidade é importante para nós. É política do DropHacker AI respeitar a sua privacidade em relação a qualquer informação que possamos coletar no site DropHacker AI.

Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço. Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento.

Apenas retemos as informações coletadas pelo tempo necessário para fornecer o serviço solicitado.`} 
            />
        )}
      </AnimatePresence>
    </>
  );
};

export default Footer;