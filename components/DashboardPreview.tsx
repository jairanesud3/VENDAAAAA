import React from 'react';
import { motion } from 'framer-motion';
import { Sidebar, LayoutDashboard, Wand2, Image as ImageIcon, Settings } from 'lucide-react';

const DashboardPreview: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 100, rotateX: 15 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 1.2, delay: 0.2, type: "spring", bounce: 0.2 }}
      style={{ perspective: 2000 }}
      className="relative w-full max-w-5xl mx-auto mb-32 group px-4 md:px-0 z-0"
    >
      {/* Glow Effect behind the dashboard */}
      <div className="absolute inset-0 bg-primary/30 blur-[80px] rounded-[3rem] -z-10 group-hover:bg-primary/40 transition-all duration-700 opacity-60"></div>

      {/* Main Dashboard Container */}
      <motion.div 
        whileHover={{ scale: 1.02, translateY: -10 }}
        transition={{ duration: 0.5 }}
        className="relative bg-[#05010D] rounded-2xl border border-white/10 shadow-2xl shadow-black overflow-hidden ring-1 ring-white/10"
      >
        
        {/* Window Controls (Minimalist) */}
        <div className="h-8 bg-[#0A0510] border-b border-white/5 flex items-center px-4 gap-2">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
          </div>
        </div>

        {/* Clean Interface Layout */}
        <div className="flex h-[450px] md:h-[550px]">
          {/* Sidebar */}
          <div className="w-16 md:w-20 border-r border-white/5 bg-[#0A0510] flex flex-col items-center py-6 gap-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primaryDark flex items-center justify-center shadow-lg">
                <div className="w-5 h-5 bg-white mask-star" />
            </div>
            <div className="h-px w-8 bg-white/10"></div>
            {[LayoutDashboard, Wand2, ImageIcon, Settings].map((Icon, i) => (
                <div key={i} className={`p-3 rounded-lg ${i === 0 ? 'bg-white/10 text-white' : 'text-slate-500 hover:text-white hover:bg-white/5'} transition-colors`}>
                    <Icon className="w-5 h-5" />
                </div>
            ))}
          </div>

          {/* Main Area */}
          <div className="flex-1 bg-[#05010D] p-8 flex gap-8">
             {/* Left Column - Input Simulation */}
             <div className="w-1/3 flex flex-col gap-4">
                 <div className="h-8 w-32 bg-white/10 rounded-lg mb-4 animate-pulse"></div>
                 <div className="space-y-3">
                     <div className="h-10 w-full bg-surface border border-white/5 rounded-lg"></div>
                     <div className="h-10 w-full bg-surface border border-white/5 rounded-lg"></div>
                     <div className="h-32 w-full bg-surface border border-white/5 rounded-lg"></div>
                 </div>
                 <div className="mt-auto h-12 w-full bg-primary/20 border border-primary/30 rounded-xl"></div>
             </div>

             {/* Right Column - Result Simulation */}
             <div className="flex-1 bg-surface border border-white/5 rounded-2xl p-6 relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-purple-400 to-primary animate-electric-pulse"></div>
                 <div className="flex items-center gap-3 mb-6">
                     <div className="w-8 h-8 rounded-full bg-white/5"></div>
                     <div className="h-4 w-40 bg-white/10 rounded"></div>
                 </div>
                 <div className="space-y-3">
                     <div className="h-3 w-full bg-white/5 rounded"></div>
                     <div className="h-3 w-5/6 bg-white/5 rounded"></div>
                     <div className="h-3 w-4/6 bg-white/5 rounded"></div>
                     <div className="h-40 w-full bg-black/40 rounded-xl mt-4 border border-white/5 flex items-center justify-center">
                         <ImageIcon className="w-8 h-8 text-slate-700" />
                     </div>
                 </div>
             </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DashboardPreview;