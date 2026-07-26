import React from 'react';
import BroyLogo from './BroyLogo';
import { Sparkles, Calendar, Layers, CheckCircle2, Instagram } from 'lucide-react';

export default function Header({ activeTab, setActiveTab, pendingCount }) {
  return (
    <header className="glass-panel sticky top-0 z-50 border-b border-gray-800 px-6 py-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Brand Header */}
        <div className="flex items-center gap-4 cursor-pointer" onClick={() => setActiveTab('input')}>
          <BroyLogo size={42} color="#FFFFFF" />
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-heading text-lg font-bold text-white tracking-wider">SUSAN BROY</span>
              <span className="badge badge-accent">Instagram Studio</span>
            </div>
            <span className="text-xs text-gray-400 tracking-widest uppercase">contemporary studio · Gauting</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-2 bg-black/50 p-1.5 rounded-xl border border-gray-800">
          <button
            onClick={() => setActiveTab('input')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
              activeTab === 'input' 
                ? 'bg-zinc-800 text-white shadow-sm border border-gray-700' 
                : 'text-gray-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            <Sparkles className="w-4 h-4 text-yellow-400" />
            Redaktionsplan & Input
          </button>

          <button
            onClick={() => setActiveTab('review')}
            className={`relative flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
              activeTab === 'review' 
                ? 'bg-zinc-800 text-white shadow-sm border border-gray-700' 
                : 'text-gray-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            <Layers className="w-4 h-4 text-emerald-400" />
            Freigabe-Center (3 Varianten)
            {pendingCount > 0 && (
              <span className="ml-1 bg-yellow-400 text-black text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {pendingCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('calendar')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
              activeTab === 'calendar' 
                ? 'bg-zinc-800 text-white shadow-sm border border-gray-700' 
                : 'text-gray-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            <Calendar className="w-4 h-4 text-blue-400" />
            Kalender & Status
          </button>
        </nav>

        {/* System Meta Status */}
        <div className="hidden lg:flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs text-gray-400 bg-zinc-900/80 px-3 py-1.5 rounded-full border border-gray-800">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Gemini Pro Vision AI</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-400 bg-zinc-900/80 px-3 py-1.5 rounded-full border border-gray-800">
            <Instagram className="w-3.5 h-3.5 text-pink-400" />
            <span>@syken_broy</span>
          </div>
        </div>

      </div>
    </header>
  );
}
