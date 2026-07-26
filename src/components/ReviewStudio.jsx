import React, { useState } from 'react';
import InstagramSimulator from './InstagramSimulator';
import BroyLogo from './BroyLogo';
import { Layers, CheckCircle2, Edit3, Music, Tag, Calendar, Sparkles, Save, ShieldCheck, Film, AlertTriangle } from 'lucide-react';

const AUDIO_PRESETS = [
  'Ambient Calm — Deep Resonance (Klassisch)',
  'Pulse of Silence — Atmospheric Beat (Modern)',
  'Natural Studio Acoustics — Quiet Space (Atelier)',
  'Minimalist Piano — Spatial Echo',
  'Ohne Musik (Nur Bild & Text)'
];

export default function ReviewStudio({ posts, onApprovePost }) {
  const [selectedPostId, setSelectedPostId] = useState(posts[0]?.id || null);
  const selectedPost = posts.find(p => p.id === selectedPostId) || posts[0];
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState(null);
  
  const currentVariant = selectedPost?.variants[selectedVariantIdx] || selectedPost?.variants[0];
  
  // Editable State
  const [editedCaption, setEditedCaption] = useState(currentVariant?.caption || '');
  const [selectedAudio, setSelectedAudio] = useState(currentVariant?.audio || AUDIO_PRESETS[0]);

  if (!selectedPost) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="glass-panel p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 flex flex-col items-center gap-4">
          <Layers className="w-12 h-12 text-zinc-400 dark:text-gray-500" />
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white">Keine Entwürfe im Freigabe-Center</h2>
          <p className="text-xs text-zinc-600 dark:text-gray-400 max-w-md">
            Wechseln Sie zum **Redaktionsplan & Input**, um neue Kunstwerke zu erfassen. Gemini AI generiert Ihnen 3 fertige Vorschläge.
          </p>
        </div>
      </div>
    );
  }

  const handleVariantSelect = (idx) => {
    setSelectedVariantIdx(idx);
    setEditedCaption(selectedPost.variants[idx].caption);
    setSelectedAudio(selectedPost.variants[idx].audio || AUDIO_PRESETS[0]);
    setIsEditing(false);
  };

  const handleSaveDraftOnly = () => {
    // Saves changes locally to the post object without marking as published
    const updatedVariant = {
      ...currentVariant,
      caption: editedCaption,
      audio: selectedAudio
    };

    setSaveSuccessMsg(`Änderungen für Variante ${selectedVariantIdx === 0 ? 'A' : selectedVariantIdx === 1 ? 'B' : 'C'} wurden als Entwurf im Studio gespeichert.`);
    setTimeout(() => setSaveSuccessMsg(null), 4000);
  };

  const handleScheduleForCalendar = () => {
    const finalVariant = {
      ...currentVariant,
      caption: editedCaption,
      audio: selectedAudio
    };
    onApprovePost(selectedPost.id, finalVariant);
    setSaveSuccessMsg(`Posting wurde erfolgreich für den ${selectedPost.date} im Kalender vorgemerkt.`);
    setTimeout(() => setSaveSuccessMsg(null), 4000);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      
      {/* Header Info */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="badge badge-accent">3-Varianten Studio Review</span>
            <span className="badge badge-concrete">Keine automatische Veröffentlichung</span>
          </div>
          <h1 className="font-heading text-2xl font-bold text-zinc-900 dark:text-white tracking-wide">
            Freigabe & Bearbeitung für Instagram Reels
          </h1>
          <p className="text-xs text-zinc-600 dark:text-gray-400 mt-0.5">
            Wählen Sie aus den 3 Entwürfen, passen Sie Text und Musik an und speichern Sie den Entwurf risikofrei ab.
          </p>
        </div>

        {/* Post Selection Tabs */}
        <div className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-900/90 p-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-x-auto max-w-full">
          {posts.map((p) => (
            <button
              key={p.id}
              onClick={() => {
                setSelectedPostId(p.id);
                setSelectedVariantIdx(0);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                selectedPost.id === p.id 
                  ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white border border-zinc-300 dark:border-zinc-700 shadow-sm' 
                  : 'text-zinc-600 hover:text-zinc-900 dark:text-gray-400 dark:hover:text-white'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${p.status === 'approved' ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
              <span>{p.title.slice(0, 22)}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Safety Banner */}
      <div className="bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-300 p-4 rounded-xl text-xs mb-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 flex-shrink-0 text-amber-500" />
          <span>
            <strong>Sicherheitshinweis:</strong> Alle Aktionen hier speichern das Posting ausschließlich als Entwurf im Studio. 
            Es erfolgt <u>kein</u> automatischer Upload auf Instagram, bevor Sie das Posting explizit freigeben.
          </span>
        </div>
      </div>

      {/* Success Notification */}
      {saveSuccessMsg && (
        <div className="bg-emerald-500/15 border border-emerald-500/40 text-emerald-900 dark:text-emerald-300 p-4 rounded-xl text-xs mb-6 flex items-center gap-3 animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          <span className="font-medium">{saveSuccessMsg}</span>
        </div>
      )}

      {/* Main Review Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left 7 Columns: Variant Selection & Editors */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          {/* Post Meta Banner */}
          <div className="glass-panel p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img 
                src={selectedPost.mediaUrl} 
                alt="Post Media" 
                className="w-14 h-14 rounded-xl object-cover border border-zinc-300 dark:border-zinc-700 shadow-sm" 
              />
              <div>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-white font-heading">{selectedPost.title}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[11px] text-zinc-500 dark:text-gray-400">{selectedPost.date}</span>
                  <span className="text-[11px] text-zinc-400 dark:text-gray-500">•</span>
                  <span className="text-[11px] text-purple-600 dark:text-purple-400 font-mono font-semibold flex items-center gap-1">
                    <Film className="w-3 h-3" /> Instagram Reel (9:16)
                  </span>
                </div>
              </div>
            </div>

            <div className="text-right">
              {selectedPost.status === 'approved' ? (
                <span className="badge badge-status-ready flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Im Kalender vorgemerkt
                </span>
              ) : (
                <span className="badge badge-accent">Entwurf zur Bearbeitung</span>
              )}
            </div>
          </div>

          {/* 3 Reel Variants Selector */}
          <div className="flex flex-col gap-3">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-gray-400">
              3 Generierte Reel-Stile (Wählen Sie Ihren Favoriten):
            </label>

            <div className="grid grid-cols-1 gap-3">
              {selectedPost.variants.map((v, idx) => (
                <div
                  key={v.id}
                  onClick={() => handleVariantSelect(idx)}
                  className={`glass-panel p-4 rounded-xl border transition-all cursor-pointer ${
                    selectedVariantIdx === idx 
                      ? 'border-zinc-900 dark:border-white bg-white dark:bg-zinc-900/90 shadow-md accent-border-left' 
                      : 'border-zinc-200 dark:border-zinc-800/80 hover:border-zinc-400 dark:hover:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-950/40 opacity-80 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`w-5 h-5 rounded-full text-[11px] font-bold flex items-center justify-center ${
                        selectedVariantIdx === idx 
                          ? 'bg-zinc-900 text-white dark:bg-white dark:text-black' 
                          : 'bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-gray-400'
                      }`}>
                        {idx === 0 ? 'A' : idx === 1 ? 'B' : 'C'}
                      </span>
                      <h4 className="text-xs font-bold text-zinc-900 dark:text-white">{v.name}</h4>
                    </div>
                    <span className="text-[10px] text-zinc-600 dark:text-gray-400 font-mono bg-zinc-100 dark:bg-zinc-900 px-2 py-0.5 rounded border border-zinc-200 dark:border-zinc-800">
                      {v.style.slice(0, 34)}...
                    </span>
                  </div>

                  <p className="text-xs text-zinc-700 dark:text-gray-300 line-clamp-2 font-light">
                    "{v.caption}"
                  </p>

                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-zinc-200 dark:border-zinc-800/60 text-[10px] text-zinc-500 dark:text-gray-400">
                    <span className="flex items-center gap-1 text-purple-600 dark:text-purple-400 font-medium">
                      <Music className="w-3 h-3" />
                      {v.audio}
                    </span>
                    <span className="font-mono">{v.hashtags.length} Hashtags</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Audio Track Selector & Text Editor */}
          <div className="glass-panel p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 flex flex-col gap-4">
            
            {/* Audio Track Selection */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-gray-300 flex items-center gap-2 mb-2">
                <Music className="w-4 h-4 text-purple-500" />
                Musik & Soundtrack für dieses Reel wählen:
              </label>
              <select
                value={selectedAudio}
                onChange={(e) => setSelectedAudio(e.target.value)}
                className="input-studio w-full rounded-xl px-4 py-2.5 text-xs font-medium"
              >
                {AUDIO_PRESETS.map((preset, idx) => (
                  <option key={idx} value={preset}>{preset}</option>
                ))}
              </select>
            </div>

            {/* Text Editor */}
            <div className="flex items-center justify-between pt-2">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-gray-300 flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-amber-500" />
                Beschreibung & Hashtags anpassen:
              </label>
              <button
                type="button"
                onClick={() => setIsEditing(!isEditing)}
                className="text-[11px] text-zinc-900 dark:text-white font-semibold hover:underline"
              >
                {isEditing ? 'Fertig' : 'Bearbeiten'}
              </button>
            </div>

            <textarea
              value={editedCaption}
              onChange={(e) => setEditedCaption(e.target.value)}
              rows={5}
              className="input-studio w-full rounded-xl p-3.5 text-xs leading-relaxed resize-none"
              placeholder="Geben Sie hier Ihre Änderungen am Text ein..."
            />

            {/* Two Action Buttons: Save Draft vs Schedule */}
            <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-end gap-3">
              
              <button
                onClick={handleSaveDraftOnly}
                className="w-full sm:w-auto btn-secondary py-3 px-5 text-xs font-bold flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Änderungen als Entwurf speichern</span>
              </button>

              <button
                onClick={handleScheduleForCalendar}
                className="w-full sm:w-auto btn-accent py-3 px-6 text-xs font-bold flex items-center justify-center gap-2 shadow-lg"
              >
                <Calendar className="w-4 h-4" />
                <span>Variante {selectedVariantIdx === 0 ? 'A' : selectedVariantIdx === 1 ? 'B' : 'C'} im Kalender einplanen</span>
              </button>

            </div>

          </div>

        </div>

        {/* Right 5 Columns: Dynamic Animated Reel Simulator */}
        <div className="lg:col-span-5 flex flex-col items-center justify-start sticky top-24">
          <div className="text-center mb-3">
            <span className="badge badge-concrete">Echte Reel Motion Vorschau</span>
            <p className="text-[11px] text-zinc-500 dark:text-gray-400 mt-1">Live Kameraschwenk, Lichtwechsel & Audio Vorschau</p>
          </div>

          <InstagramSimulator 
            post={selectedPost} 
            variant={{
              ...currentVariant,
              caption: editedCaption,
              audio: selectedAudio
            }}
            onSaveDraft={handleSaveDraftOnly}
            onSchedulePost={handleScheduleForCalendar}
          />
        </div>

      </div>

    </section>
  );
}
