import React from 'react';
import { BarChart3, Users, DollarSign, MousePointer2 } from 'lucide-react';
import { motion } from 'framer-motion';

const DashboardPreview: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 100, rotateX: 10 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
      style={{ perspective: 1000 }}
      className="relative w-full max-w-6xl mx-auto mb-32 group px-4 md:px-0"
    >
      {/* Glow Effect behind the dashboard */}
      <div className="absolute inset-0 bg-primary/20 blur-[60px] rounded-3xl -z-10 group-hover:bg-primary/30 transition-all duration-700"></div>

      {/* Main Dashboard Container */}
      <motion.div 
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.5 }}
        className="relative animate-float bg-[#05010D] rounded-2xl border border-white/10 shadow-2xl shadow-black overflow-hidden ring-1 ring-white/5"
      >
        
        {/* Window Controls (Fake Browser UI) */}
        <div className="h-10 bg-[#0A0510] border-b border-white/5 flex items-center px-4 gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
          <div className="ml-4 px-3 py-1 rounded-md bg-white/5 text-[10px] text-slate-500 font-mono flex-1 text-center border border-white/5 flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            drophacker.ai/dashboard
          </div>
        </div>

        {/* Dashboard Content Mockup */}
        <div className="flex h-[400px] md:h-[500px]">
          {/* Sidebar */}
          <div className="w-16 md:w-64 border-r border-white/5 bg-[#0A0510] p-4 hidden md:flex flex-col gap-4">
            <div className="h-8 w-3/4 bg-white/5 rounded-lg mb-6 animate-pulse"></div>
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-10 w-full rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer flex items-center px-3 gap-3">
                <div className="w-5 h-5 rounded bg-white/10"></div>
                <div className="h-2 w-20 bg-white/10 rounded"></div>
              </div>
            ))}
          </div>

          {/* Main Content Area */}
          <div className="flex-1 p-6 bg-[#05010D] relative overflow-hidden">
            
            {/* Header Mock */}
            <div className="flex justify-between items-center mb-8">
              <div className="h-8 w-48 bg-white/10 rounded animate-pulse"></div>
              <div className="h-8 w-8 rounded-full bg-primary/20 border border-primary/50"></div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {[
                { label: 'Receita Total', val: 'R$ 142.305', icon: DollarSign, color: 'text-green-400' },
                { label: 'Conversão', val: '4.2%', icon: MousePointer2, color: 'text-primary' },
                { label: 'Visitantes', val: '85.2k', icon: Users, color: 'text-blue-400' },
              ].map((stat, idx) => (
                <div key={idx} className="bg-[#0F0518] border border-white/5 p-4 rounded-xl">
                  <div className="flex justify-between items-start mb-2">
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                      <stat.icon className={`w-4 h-4 ${stat.color}`} />
                    </div>
                    <span className="text-xs text-green-400 font-mono">+12%</span>
                  </div>
                  <div className="text-slate-400 text-xs mb-1">{stat.label}</div>
                  <div className="text-xl font-bold text-white">{stat.val}</div>
                </div>
              ))}
            </div>

            {/* Big Chart Area */}
            <div className="bg-[#0F0518] border border-white/5 rounded-xl p-4 h-48 md:h-64 relative overflow-hidden">
                <div className="flex items-end justify-between h-full gap-2 px-2 pb-2">
                    {[35, 45, 30, 60, 75, 50, 65, 80, 70, 90, 65, 85].map((h, i) => (
                        <div 
                            key={i} 
                            className="w-full bg-gradient-to-t from-primary/20 to-primary rounded-t-sm hover:from-primary/40 hover:to-primaryDark transition-all duration-300"
                            style={{ height: `${h}%` }}
                        ></div>
                    ))}
                </div>
                {/* Floating tooltip simulation */}
                <div className="absolute top-1/3 left-1/2 bg-surface border border-white/10 px-3 py-1.5 rounded-lg shadow-xl shadow-black/50 pointer-events-none transform -translate-x-1/2 animate-float">
                    <span className="text-xs text-slate-300">ROI: </span>
                    <span className="text-xs font-bold text-green-400">850%</span>
                </div>
            </div>

          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DashboardPreview;