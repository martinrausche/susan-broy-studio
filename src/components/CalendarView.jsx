import React from 'react';
import BroyLogo from './BroyLogo';
import { Calendar as CalendarIcon, CheckCircle2, Clock, Instagram, Sparkles, Send, Download } from 'lucide-react';

export default function CalendarView({ posts }) {
  const approvedCount = posts.filter(p => p.status === 'approved').length;
  const pendingCount = posts.filter(p => p.status !== 'approved').length;

  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      
      {/* Top Summary Banner */}
      <div className="glass-panel p-6 rounded-2xl mb-8 border border-zinc-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="badge badge-concrete">Redaktions-Übersicht</span>
            <span className="badge badge-accent">Meta Graph API Ready</span>
          </div>
          <h1 className="font-heading text-2xl font-bold text-white tracking-wide">
            Veröffentlichungs-Kalender & Status
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Alle geplanten Veröffentlichungen für Susan Broy (`@syken_broy`) im Überblick.
          </p>
        </div>

        {/* Stats Pills */}
        <div className="flex items-center gap-3">
          <div className="bg-zinc-900 border border-zinc-800 px-4 py-2.5 rounded-xl text-center">
            <span className="text-lg font-bold text-emerald-400 block font-mono">{approvedCount}</span>
            <span className="text-[10px] text-gray-400 uppercase tracking-wider">Freigegeben</span>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 px-4 py-2.5 rounded-xl text-center">
            <span className="text-lg font-bold text-yellow-400 block font-mono">{pendingCount}</span>
            <span className="text-[10px] text-gray-400 uppercase tracking-wider">In Review</span>
          </div>
        </div>
      </div>

      {/* Calendar List Timeline */}
      <div className="glass-panel p-6 rounded-2xl border border-zinc-800 flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <CalendarIcon className="w-4 h-4 text-blue-400" />
            Geplante Instagram Postings
          </h3>
          <span className="text-xs text-gray-400">Sortierung nach Veröffentlichungsdatum</span>
        </div>

        <div className="flex flex-col gap-4">
          {posts.map((post) => {
            const isApproved = post.status === 'approved';
            const selectedVariant = post.selectedVariant || post.variants[0];

            return (
              <div 
                key={post.id}
                className="bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700 rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all"
              >
                {/* Left: Thumbnail & Info */}
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-zinc-700 bg-black flex-shrink-0">
                    <img src={post.mediaUrl} alt={post.title} className="w-full h-full object-cover" />
                    <div className="absolute bottom-0 inset-x-0 bg-black/80 py-0.5 text-[8px] text-center font-mono text-yellow-400">
                      {post.type.toUpperCase()}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-white">{post.title}</h4>
                      <span className="badge badge-concrete text-[10px]">
                        {post.medium === 'concrete' ? 'Beton' : post.medium === 'bw_painting' ? 'S/W Malerei' : 'Metall'}
                      </span>
                    </div>

                    <p className="text-xs text-gray-400 mt-1 line-clamp-1">
                      "{selectedVariant.caption.slice(0, 75)}..."
                    </p>

                    <div className="flex items-center gap-3 mt-2 text-[11px] text-gray-500">
                      <span className="flex items-center gap-1 text-gray-300">
                        <Clock className="w-3 h-3 text-blue-400" />
                        {post.date}
                      </span>
                      <span>•</span>
                      <span>Audio: {selectedVariant.audio.slice(0, 24)}</span>
                    </div>
                  </div>
                </div>

                {/* Right: Status & Auto-Publish Indicator */}
                <div className="flex flex-col md:items-end gap-2 w-full md:w-auto border-t md:border-t-0 pt-3 md:pt-0 border-zinc-800">
                  {isApproved ? (
                    <div className="flex items-center gap-2">
                      <span className="badge badge-status-ready">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Terminiert (Auto-Publish)
                      </span>
                      <button 
                        className="p-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-gray-300 transition-colors"
                        title="Export Meta Package"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <span className="badge badge-accent">
                      Freigabe ausstehend
                    </span>
                  )}

                  <span className="text-[10px] text-gray-500 font-mono">
                    Target Account: @syken_broy
                  </span>
                </div>

              </div>
            );
          })}
        </div>

      </div>

    </section>
  );
}
