import React from 'react';
import { Sun, Moon, Laptop } from 'lucide-react';

export default function ThemeToggle({ theme, setTheme }) {
  return (
    <div className="flex items-center bg-zinc-200 dark:bg-zinc-900 p-1 rounded-xl border border-zinc-300 dark:border-zinc-800">
      <button
        onClick={() => setTheme('light')}
        title="Heller Modus (Künstlerin)"
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
          theme === 'light'
            ? 'bg-white text-black shadow-sm'
            : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'
        }`}
      >
        <Sun className="w-3.5 h-3.5 text-amber-500" />
        <span className="hidden sm:inline">Hell</span>
      </button>

      <button
        onClick={() => setTheme('dark')}
        title="Dunkler Modus (Atelier Dark)"
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
          theme === 'dark'
            ? 'bg-zinc-800 text-white shadow-sm'
            : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'
        }`}
      >
        <Moon className="w-3.5 h-3.5 text-blue-400" />
        <span className="hidden sm:inline">Dunkel</span>
      </button>

      <button
        onClick={() => setTheme('system')}
        title="Systemeinstellung folgen"
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
          theme === 'system'
            ? 'bg-zinc-300 dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-sm'
            : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'
        }`}
      >
        <Laptop className="w-3.5 h-3.5 text-emerald-500" />
        <span className="hidden sm:inline">System</span>
      </button>
    </div>
  );
}
