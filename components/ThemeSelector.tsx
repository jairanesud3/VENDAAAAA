"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeSelector() {
  const [theme, setTheme] = React.useState("dark");

  return (
    <div className="flex items-center gap-2 bg-white/5 p-1 rounded-lg border border-white/10">
      <button 
        onClick={() => setTheme("dark")}
        className={`p-1.5 rounded-md transition-all ${theme === 'dark' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'}`}
      >
        <Moon className="w-4 h-4" />
      </button>
      <button 
        onClick={() => setTheme("light")}
        className={`p-1.5 rounded-md transition-all ${theme === 'light' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'}`}
      >
        <Sun className="w-4 h-4" />
      </button>
    </div>
  );
}