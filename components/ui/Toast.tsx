import React, { useEffect } from 'react';
import { CheckCircle, X } from 'lucide-react';

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[100] animate-fade-in-up">
      <div className="bg-[#0A0510] border border-primary/30 text-white px-6 py-4 rounded-lg shadow-[0_0_20px_rgba(168,85,247,0.3)] flex items-center gap-3">
        <CheckCircle className="text-accentGreen w-5 h-5" />
        <span className="font-medium">{message}</span>
        <button onClick={onClose} className="ml-4 hover:text-slate-300">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};