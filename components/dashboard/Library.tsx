import React, { useState } from 'react';
import { Copy, Download, Trash2, Image, FileText, Search, AlertTriangle, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const historyData = [
  { id: 1, type: 'copy', title: 'Corretor Postural - FB Ads', date: 'Hoje, 14:30', content: '🔥 PARE DE SOFRER COM DORES! \n\nConheça a solução definitiva...' },
  { id: 2, type: 'image', title: 'Garrafa Térmica - Mesa Luxo', date: 'Hoje, 10:15', imageUrl: 'https://images.unsplash.com/photo-1602143407151-11115cd4e69b?q=80&w=400&auto=format&fit=crop' },
  { id: 3, type: 'copy', title: 'Email Boas Vindas', date: 'Ontem', content: 'Oi [Nome], seja muito bem-vindo à família...' },
  { id: 4, type: 'image', title: 'Fone Bluetooth - Cyberpunk', date: '12 Out', imageUrl: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=400&auto=format&fit=crop' },
];

const Library: React.FC = () => {
  const [items, setItems] = useState(historyData);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const handleDelete = () => {
    if (deleteId) {
        setItems(items.filter(i => i.id !== deleteId));
        setDeleteId(null);
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col relative">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Minha Biblioteca</h1>
          <p className="text-slate-400 text-sm">Seu histórico de criações salvas na nuvem.</p>
        </div>
        <div className="relative">
          <input 
            type="text" 
            placeholder="Buscar..." 
            className="bg-surface border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-primary w-64 transition-all focus:w-80"
          />
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 overflow-y-auto pb-10 custom-scrollbar">
        {items.map((item) => (
          <div key={item.id} className="bg-surface border border-white/5 rounded-2xl overflow-hidden group hover:border-primary/50 transition-all flex flex-col hover:-translate-y-1 hover:shadow-lg">
            
            {/* Preview Area */}
            <div className="h-40 bg-black/50 relative overflow-hidden flex items-center justify-center p-4">
              {item.type === 'image' ? (
                <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              ) : (
                <div className="text-xs text-slate-400 line-clamp-6 font-mono p-2 bg-white/5 rounded w-full h-full border border-white/5">
                  {item.content}
                </div>
              )}
              <div className="absolute top-2 right-2 p-1.5 bg-black/60 rounded-md backdrop-blur-sm">
                {item.type === 'image' ? <Image className="w-4 h-4 text-pink-500" /> : <FileText className="w-4 h-4 text-blue-500" />}
              </div>
            </div>

            {/* Content Info */}
            <div className="p-4 flex-1 flex flex-col">
              <h3 className="text-white font-bold text-sm mb-1 truncate">{item.title}</h3>
              <p className="text-slate-500 text-xs mb-4">{item.date}</p>
              
              <div className="mt-auto flex items-center gap-2">
                <button className="flex-1 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-bold text-white flex items-center justify-center gap-2 transition-colors">
                  <Copy className="w-3 h-3" /> Copiar
                </button>
                {item.type === 'image' && (
                  <button className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-white transition-colors">
                    <Download className="w-3 h-3" />
                  </button>
                )}
                <button 
                    onClick={() => setDeleteId(item.id)}
                    className="p-2 bg-white/5 hover:bg-red-500/20 hover:text-red-500 rounded-lg text-slate-500 transition-colors ml-auto"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Modal */}
      <AnimatePresence>
        {deleteId && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                <motion.div 
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="bg-[#0F0518] border border-white/10 rounded-2xl p-6 max-w-sm w-full shadow-2xl"
                >
                    <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-4 text-red-500">
                        <AlertTriangle className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Excluir item?</h3>
                    <p className="text-slate-400 text-sm mb-6">
                        Essa ação não pode ser desfeita. O item será removido permanentemente da sua biblioteca.
                    </p>
                    <div className="flex gap-3">
                        <button 
                            onClick={() => setDeleteId(null)}
                            className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-medium transition-colors"
                        >
                            Cancelar
                        </button>
                        <button 
                            onClick={handleDelete}
                            className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold transition-colors shadow-lg shadow-red-900/20"
                        >
                            Sim, Excluir
                        </button>
                    </div>
                </motion.div>
            </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Library;