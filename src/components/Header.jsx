import React from 'react';
import BroyLogo from './BroyLogo';
import ThemeToggle from './ThemeToggle';
import { Sparkles, Calendar, Layers, Instagram, LogOut } from 'lucide-react';

export default function Header({ activeTab, setActiveTab, pendingCount, theme, setTheme, isDark }) {
  const logoColor = isDark ? '#FFFFFF' : '#000000';

  return (
    <header className="glass-panel sticky top-0 z-50 px-6 py-4 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Brand Header */}
        <div className="flex items-center gap-4 cursor-pointer" onClick={() => setActiveTab('input')}>
          <BroyLogo size={42} color={logoColor} />
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-heading text-lg font-bold tracking-wider text-zinc-900 dark:text-white">
                SUSAN BROY
              </span>
              <span className="badge badge-accent">Instagram Studio</span>
            </div>
            <span className="text-xs text-zinc-500 dark:text-gray-400 tracking-widest uppercase font-medium">
              contemporary studio · Gauting
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-2 bg-zinc-200/80 dark:bg-black/50 p-1.5 rounded-xl border border-zinc-300 dark:border-gray-800">
          <button
            onClick={() => setActiveTab('input')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
              activeTab === 'input' 
                ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm border border-zinc-300 dark:border-gray-700' 
                : 'text-zinc-600 hover:text-zinc-900 dark:text-gray-400 dark:hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            Redaktionsplan & Input
          </button>

          <button
            onClick={() => setActiveTab('review')}
            className={`relative flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
              activeTab === 'review' 
                ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm border border-zinc-300 dark:border-gray-700' 
                : 'text-zinc-600 hover:text-zinc-900 dark:text-gray-400 dark:hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4 text-emerald-500" />
            Freigabe-Center (3 Varianten)
            {pendingCount > 0 && (
              <span className="ml-1 bg-amber-400 text-black text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {pendingCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('calendar')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
              activeTab === 'calendar' 
                ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm border border-zinc-300 dark:border-gray-700' 
                : 'text-zinc-600 hover:text-zinc-900 dark:text-gray-400 dark:hover:text-white'
            }`}
          >
            <Calendar className="w-4 h-4 text-blue-500" />
            Kalender & Status
          </button>
        </nav>

        {/* Right Section: Theme Toggle, Instagram Badge & Logout */}
        <div className="flex items-center gap-3">
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
