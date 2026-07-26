import React, { useState } from 'react';
import InstagramSimulator from './InstagramSimulator';
import BroyLogo from './BroyLogo';
import { Layers, CheckCircle2, Edit3, Music, Tag, Calendar, Sparkles, Send, RefreshCw } from 'lucide-react';

export default function ReviewStudio({ posts, onApprovePost }) {
  const [selectedPostId, setSelectedPostId] = useState(posts[0]?.id || null);
  const selectedPost = posts.find(p => p.id === selectedPostId) || posts[0];
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  
  // Local edit states
  const currentVariant = selectedPost?.variants[selectedVariantIdx] || selectedPost?.variants[0];
  const [editedCaption, setEditedCaption] = useState(currentVariant?.caption || '');

  if (!selectedPost) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="glass-panel p-8 rounded-2xl border border-zinc-800 flex flex-col items-center gap-4">
          <Layers className="w-12 h-12 text-gray-500" />
          <h2 className="text-xl font-bold text-white">Keine Entwürfe im Freigabe-Center</h2>
          <p className="text-xs text-gray-400 max-w-md">
            Wechseln Sie zum **Redaktionsplan & Input**, um neue Kunstwerke zu erfassen. Gemini AI generiert Ihnen 3 fertige Vorschläge.
          </p>
        </div>
      </div>
    );
  }

  const handleVariantSelect = (idx) => {
    setSelectedVariantIdx(idx);
    setEditedCaption(selectedPost.variants[idx].caption);
    setIsEditing(false);
  };

  const handleApprove = () => {
    const finalVariant = {
      ...currentVariant,
      caption: editedCaption
    };
    onApprovePost(selectedPost.id, finalVariant);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      
      {/* Header Info */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="badge badge-accent">3-Varianten Freigabe-Studio</span>
            <span className="badge badge-concrete">Künstlerin Review</span>
          </div>
          <h1 className="font-heading text-2xl font-bold text-white tracking-wide">
            Freigabe & Feinschliff für Instagram
          </h1>
          <p className="text-xs text-gray-400 mt-0.5">
            Wählen Sie aus den **3 generierten Vorschlägen** die stimmigste Ausführung für Ihr Werk.
          </p>
        </div>

        {/* Post Selection Tabs */}
        <div className="flex items-center gap-2 bg-zinc-900/90 p-1.5 rounded-xl border border-zinc-800 overflow-x-auto max-w-full">
          {posts.map((p) => (
            <button
              key={p.id}
              onClick={() => {
                setSelectedPostId(p.id);
                setSelectedVariantIdx(0);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                selectedPost.id === p.id 
                  ? 'bg-zinc-800 text-yellow-400 border border-zinc-700 shadow' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${p.status === 'approved' ? 'bg-emerald-400' : 'bg-yellow-400'}`}></span>
              <span>{p.title.slice(0, 22)}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Review Grid (Left: 3 Variants & Text Editor, Right: Instagram Simulator) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left 7 Columns: Variant Cards & Text Editor */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          {/* Post Meta Banner */}
          <div className="glass-panel p-5 rounded-2xl border border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img 
                src={selectedPost.mediaUrl} 
                alt="Post Media" 
                className="w-14 h-14 rounded-xl object-cover border border-zinc-700" 
              />
              <div>
                <h3 className="text-sm font-bold text-white font-heading">{selectedPost.title}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[11px] text-gray-400">{selectedPost.date}</span>
                  <span className="text-[11px] text-gray-500">•</span>
                  <span className="text-[11px] text-yellow-400 font-mono">Format: {selectedPost.type.toUpperCase()}</span>
                </div>
              </div>
            </div>

            <div className="text-right">
              {selectedPost.status === 'approved' ? (
                <span className="badge badge-status-ready flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Freigegeben
                </span>
              ) : (
                <span className="badge badge-accent">Auswahl aus 3 Entwürfen</span>
              )}
            </div>
          </div>

          {/* 3 Variants Selection Grid */}
          <div className="flex flex-col gap-3">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Vorschläge aus dem Redaktionsplan (Gemini Generierung)
            </label>

            <div className="grid grid-cols-1 gap-3">
              {selectedPost.variants.map((v, idx) => (
                <div
                  key={v.id}
                  onClick={() => handleVariantSelect(idx)}
                  className={`glass-panel p-4 rounded-xl border transition-all cursor-pointer ${
                    selectedVariantIdx === idx 
                      ? 'border-yellow-400 bg-zinc-900/90 shadow-lg shadow-yellow-400/5 accent-border-left' 
                      : 'border-zinc-800/80 hover:border-zinc-700 bg-zinc-950/40 opacity-70 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`w-5 h-5 rounded-full text-[11px] font-bold flex items-center justify-center ${
                        selectedVariantIdx === idx ? 'bg-yellow-400 text-black' : 'bg-zinc-800 text-gray-400'
                      }`}>
                        {idx === 0 ? 'A' : idx === 1 ? 'B' : 'C'}
                      </span>
                      <h4 className="text-xs font-bold text-white">{v.name}</h4>
                    </div>
                    <span className="text-[10px] text-gray-400 font-mono bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
                      {v.style.slice(0, 32)}...
                    </span>
                  </div>

                  <p className="text-xs text-gray-300 line-clamp-2 font-light">
                    "{v.caption}"
                  </p>

                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-zinc-800/60 text-[10px] text-gray-400">
                    <span className="flex items-center gap-1 text-yellow-400/90">
                      <Music className="w-3 h-3" />
                      {v.audio}
                    </span>
                    <span className="font-mono">{v.hashtags.length} Hashtags</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Caption & Tag Editor for Selected Variant */}
          <div className="glass-panel p-5 rounded-2xl border border-zinc-800 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-300 flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-yellow-400" />
                Text-Feinschliff & Beschriftung (Variante {selectedVariantIdx === 0 ? 'A' : selectedVariantIdx === 1 ? 'B' : 'C'})
              </label>
              <button
                type="button"
                onClick={() => setIsEditing(!isEditing)}
                className="text-[11px] text-yellow-400 hover:underline flex items-center gap-1"
              >
                {isEditing ? 'Vorschau speichern' : 'Bearbeiten'}
              </button>
            </div>

            <textarea
              value={editedCaption}
              onChange={(e) => setEditedCaption(e.target.value)}
              disabled={!isEditing}
              rows={5}
              className={`w-full bg-zinc-900 border rounded-xl p-3.5 text-xs text-white leading-relaxed resize-none transition-all ${
                isEditing ? 'border-yellow-400 focus:outline-none' : 'border-zinc-800 opacity-90'
              }`}
            />

            {/* Hashtags Display */}
            <div>
              <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block mb-1.5">
                Generierte Hashtags & Erwähnungen:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {currentVariant.hashtags.map((tag, idx) => (
                  <span key={idx} className="bg-zinc-900 text-blue-400 text-[10px] font-mono px-2.5 py-1 rounded-md border border-zinc-800">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Approval Action Controls */}
            <div className="pt-3 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <BroyLogo size={20} color="#FFFFFF" />
                <span>Format geprüft & BROY Logo eingebunden</span>
              </div>

              <button
                onClick={handleApprove}
                className="w-full sm:w-auto btn-accent py-3 px-6 text-xs font-bold flex items-center justify-center gap-2 shadow-lg hover:shadow-yellow-400/20"
              >
                <CheckCircle2 className="w-4 h-4 text-black" />
                <span>Variante {selectedVariantIdx === 0 ? 'A' : selectedVariantIdx === 1 ? 'B' : 'C'} freigeben & einplanen</span>
              </button>
            </div>

          </div>

        </div>

        {/* Right 5 Columns: Instagram Smartphone Simulator */}
        <div className="lg:col-span-5 flex flex-col items-center justify-start sticky top-24">
          <div className="text-center mb-3">
            <span className="badge badge-concrete">Echte Instagram Vorschau</span>
            <p className="text-[11px] text-gray-400 mt-1">Live Simulation inkl. Kameraschwenk & BROY Wasserzeichen</p>
          </div>

          <InstagramSimulator 
            post={selectedPost} 
            variant={{
              ...currentVariant,
              caption: editedCaption
            }}
            onApprove={handleApprove}
          />
        </div>

      </div>

    </section>
  );
}
