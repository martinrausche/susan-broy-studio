import React from 'react';
import BroyLogo from './BroyLogo';
import ThemeToggle from './ThemeToggle';
import { Sparkles, Calendar, Layers, Instagram, LogOut } from 'lucide-react';

export default function Header({ activeTab, setActiveTab, pendingCount, theme, setTheme, isDark }) {
  const logoColor = isDark ? '#FFFFFF' : '#000000';

  return (
    <header className="glass-panel sticky top-0 z-50 px-4 sm:px-6 py-3.5 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        
        {/* Top Mobile Bar: Logo & Actions */}
        <div className="w-full md:w-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('input')}>
            <BroyLogo size={36} color={logoColor} />
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-heading text-base sm:text-lg font-bold tracking-wider text-zinc-900 dark:text-white">
                  SUSAN BROY
                </span>
                <span className="badge badge-accent text-[9px] px-1.5 py-0.5">Studio</span>
              </div>
              <span className="text-[10px] text-zinc-500 dark:text-gray-400 tracking-widest uppercase font-medium">
                Gauting • Instagram
              </span>
            </div>
          </div>

          {/* Right Mobile Quick Actions */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle theme={theme} setTheme={setTheme} />
            <a 
              href="/api/auth/logout"
              className="p-2 text-zinc-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
              title="Abmelden"
            >
              <LogOut className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Navigation Tabs (Scrollable & Responsive on Mobile) */}
        <nav className="w-full md:w-auto flex items-center gap-1.5 bg-zinc-200/80 dark:bg-black/50 p-1.5 rounded-xl border border-zinc-300 dark:border-gray-800 overflow-x-auto max-w-full no-scrollbar">
          <button
            onClick={() => setActiveTab('input')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap tracking-wide transition-all ${
              activeTab === 'input' 
                ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm border border-zinc-300 dark:border-gray-700' 
                : 'text-zinc-600 hover:text-zinc-900 dark:text-gray-400 dark:hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
            <span>Redaktionsplan & Input</span>
          </button>

          <button
            onClick={() => setActiveTab('review')}
            className={`relative flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap tracking-wide transition-all ${
              activeTab === 'review' 
                ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm border border-zinc-300 dark:border-gray-700' 
                : 'text-zinc-600 hover:text-zinc-900 dark:text-gray-400 dark:hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
            <span>Freigabe (3 Varianten)</span>
            {pendingCount > 0 && (
              <span className="bg-amber-400 text-black text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none">
                {pendingCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('calendar')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap tracking-wide transition-all ${
              activeTab === 'calendar' 
                ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm border border-zinc-300 dark:border-gray-700' 
                : 'text-zinc-600 hover:text-zinc-900 dark:text-gray-400 dark:hover:text-white'
            }`}
          >
            <Calendar className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
            <span>Kalender & Status</span>
          </button>
        </nav>

        {/* Desktop Right Section: Theme Toggle & Logout */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle theme={theme} setTheme={setTheme} />

          <div className="hidden lg:flex items-center gap-2 text-xs text-zinc-600 dark:text-gray-400 bg-zinc-200/80 dark:bg-zinc-900/80 px-3 py-1.5 rounded-full border border-zinc-300 dark:border-gray-800">
            <Instagram className="w-3.5 h-3.5 text-pink-500" />
            <span className="font-semibold">@syken_broy</span>
          </div>

          <a 
            href="/api/auth/logout"
            className="p-2 text-zinc-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
            title="Abmelden"
          >
            <LogOut className="w-4 h-4" />
          </a>
        </div>

      </div>
    </header>
  );
}
