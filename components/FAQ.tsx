import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const questions = [
  { q: "As imagens têm direitos autorais?", a: "Não. Todas as imagens geradas são 100% livres de direitos autorais e pertencem a você." },
  { q: "Funciona para qualquer nicho?", a: "Sim! A IA foi treinada em milhares de nichos, desde moda e eletrônicos até produtos digitais e serviços." },
  { q: "Posso cancelar quando quiser?", a: "Sim, o cancelamento pode ser feito em 1 clique dentro do painel, sem burocracia." },
  { q: "Preciso saber design ou photoshop?", a: "Zero. A IA faz todo o trabalho pesado. Você só precisa descrever o produto ou colar o link." },
  { q: "Existe alguma garantia?", a: "Oferecemos 7 dias de garantia incondicional. Se não gostar, devolvemos seu dinheiro." },
  { q: "Consigo exportar as imagens em alta qualidade?", a: "Sim, o plano Escala Pro suporta exportação em até 4K para máxima nitidez." },
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-[#05010D]">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-3xl font-bold text-white mb-12 text-center">Perguntas Frequentes</h2>
        
        <div className="space-y-4">
          {questions.map((item, index) => (
            <div key={index} className="rounded-lg overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-5 bg-card border border-white/5 text-left hover:bg-white/5 transition-colors"
              >
                <span className="text-white font-medium">{item.q}</span>
                <ChevronDown 
                  className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} 
                />
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out bg-[#0A0510] border-x border-b border-white/5 ${openIndex === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <p className="p-5 text-slate-400 leading-relaxed">
                  {item.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;