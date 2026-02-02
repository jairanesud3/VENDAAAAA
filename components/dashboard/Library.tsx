import React, { useState, useEffect } from 'react';
import { Copy, Download, Trash2, Image as ImageIcon, FileText, Search, AlertTriangle, Loader2, Save } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { supabase } from '../../lib/supabase';

// Tipo real baseado no banco
type Creation = {
  id: number;
  type: 'text' | 'image';
  title: string;
  content?: string;
  image_url?: string;
  created_at: string;
};

const Library: React.FC = () => {
  const [items, setItems] = useState<Creation[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'text' | 'image'>('text');
  const [search, setSearch] = useState('');
  const [deleteId, setDeleteId] = useState<number | null>(null);

  useEffect(() => {
    fetchLibrary();
  }, []);

  const fetchLibrary = async () => {
    setLoading(true);
    try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        // Supondo que você criou a tabela 'saved_creations' no Supabase
        // Colunas: id, user_id, type, title, content, image_url, created_at
        const { data, error } = await supabase
            .from('saved_creations')
            .select('*')
            .order('created_at', { ascending: false });

        if (data) setItems(data);
    } catch (error) {
        console.error("Erro ao buscar biblioteca:", error);
    } finally {
        setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (deleteId) {
        await supabase.from('saved_creations').delete().eq('id', deleteId);
        setItems(items.filter(i => i.id !== deleteId));
        setDeleteId(null);
    }
  };

  const filteredItems = items.filter(item => {
      const matchesTab = item.type === activeTab;
      const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase());
      return matchesTab && matchesSearch;
  });

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col relative">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Minha Biblioteca</h1>
          <p className="text-slate-400 text-sm">Seu histórico de criações salvas na nuvem.</p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            {/* Tabs */}
            <div className="bg-[#0F0518] p-1 rounded-xl border border-white/10 flex">
                <button 
                    onClick={() => setActiveTab('text')}
                    className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'text' ? 'bg-primary text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
                >
                    <FileText className="w-4 h-4" /> Textos
                </button>
                <button 
                    onClick={() => setActiveTab('image')}
                    className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'image' ? 'bg-primary text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
                >
                    <ImageIcon className="w-4 h-4" /> Imagens
                </button>
            </div>

            {/* Search */}
            <div className="relative">
                <input 
                    type="text" 
                    placeholder="Buscar..." 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="bg-surface border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-primary w-full md:w-64 transition-all focus:w-80"
                />
                <Search className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
            </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-20 custom-scrollbar">
        {loading ? (
            <div className="flex flex-col items-center justify-center h-64">
                <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
                <p className="text-slate-500">Carregando suas criações...</p>
            </div>
        ) : filteredItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 border border-dashed border-white/10 rounded-2xl bg-white/5">
                {activeTab === 'text' ? <FileText className="w-12 h-12 text-slate-600 mb-4" /> : <ImageIcon className="w-12 h-12 text-slate-600 mb-4" />}
                <p className="text-slate-400 font-bold mb-1">Nenhum item encontrado.</p>
                <p className="text-slate-600 text-sm">Salve suas gerações para elas aparecerem aqui.</p>
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredItems.map((item) => (
                <motion.div 
                    key={item.id} 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-surface border border-white/5 rounded-2xl overflow-hidden group hover:border-primary/50 transition-all flex flex-col hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10"
                >
                    
                    {/* Preview Area */}
                    <div className="h-48 bg-black/50 relative overflow-hidden flex items-center justify-center p-4 border-b border-white/5">
                        {item.type === 'image' && item.image_url ? (
                            <img src={item.image_url} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        ) : (
                            <div className="w-full h-full text-xs text-slate-400 font-mono p-4 bg-[#05010D] rounded-xl border border-white/5 overflow-hidden leading-relaxed whitespace-pre-wrap select-none">
                                {item.content?.substring(0, 150)}...
                            </div>
                        )}
                        
                        {/* Type Icon */}
                        <div className="absolute top-3 right-3 p-2 bg-black/60 rounded-lg backdrop-blur-md border border-white/10">
                            {item.type === 'image' ? <ImageIcon className="w-4 h-4 text-pink-500" /> : <FileText className="w-4 h-4 text-blue-500" />}
                        </div>
                    </div>

                    {/* Content Info */}
                    <div className="p-5 flex-1 flex flex-col">
                        <h3 className="text-white font-bold text-sm mb-2 truncate" title={item.title}>{item.title}</h3>
                        <p className="text-slate-500 text-[10px] uppercase font-bold tracking-wider mb-6">
                            {new Date(item.created_at).toLocaleDateString('pt-BR')} às {new Date(item.created_at).toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'})}
                        </p>
                        
                        <div className="mt-auto flex items-center gap-2">
                            <button 
                                onClick={() => navigator.clipboard.writeText(item.type === 'text' ? item.content || '' : item.image_url || '')}
                                className="flex-1 py-2.5 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-bold text-white flex items-center justify-center gap-2 transition-colors border border-white/5 hover:border-white/20"
                            >
                                <Copy className="w-3 h-3" /> Copiar
                            </button>
                            
                            {item.type === 'image' && (
                                <a 
                                    href={item.image_url} 
                                    download 
                                    target="_blank"
                                    className="p-2.5 bg-white/5 hover:bg-white/10 rounded-lg text-white transition-colors border border-white/5"
                                >
                                    <Download className="w-3 h-3" />
                                </a>
                            )}
                            
                            <button 
                                onClick={() => setDeleteId(item.id)}
                                className="p-2.5 bg-white/5 hover:bg-red-500/10 hover:text-red-500 rounded-lg text-slate-500 transition-colors border border-white/5 hover:border-red-500/30 ml-auto"
                            >
                                <Trash2 className="w-3 h-3" />
                            </button>
                        </div>
                    </div>
                </motion.div>
                ))}
            </div>
        )}
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
                        Essa ação não pode ser desfeita. O item será removido permanentemente do banco de dados.
                    </p>
                    <div className="flex gap-3">
                        <button 
                            onClick={() => setDeleteId(null)}
                            className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-medium transition-colors border border-white/5"
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