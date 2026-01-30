import React from 'react';
import { MessageCircle, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

const FloatingWidgets: React.FC = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
      {/* AI Support Widget */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1 }}
        whileHover={{ scale: 1.1 }}
        className="w-14 h-14 bg-card border border-primary/30 rounded-full flex items-center justify-center text-primary shadow-lg hover:shadow-neon-purple transition-all"
        title="Suporte AI"
      >
        <MessageSquare className="w-6 h-6" />
      </motion.button>

      {/* WhatsApp Widget */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2 }}
        whileHover={{ scale: 1.1 }}
        className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-neon-green transition-all relative"
        title="Falar no WhatsApp"
      >
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-black animate-pulse"></span>
        <MessageCircle className="w-7 h-7" />
      </motion.button>
    </div>
  );
};

export default FloatingWidgets;