import React, { useState } from 'react';
import InstagramSimulator from './InstagramSimulator';
import BroyLogo from './BroyLogo';
import { Layers, CheckCircle2, Edit3, Music, Tag, Calendar, Sparkles, Save, ShieldCheck, Film, Type, Sliders } from 'lucide-react';

const AUDIO_PRESETS = [
  'Ambient Calm — Deep Resonance (Slow & Cinematic)',
  'Pulse of Silence — Atmospheric Beat (Rhythm)',
  'Natural Studio Acoustics — Quiet Space (Atelier)',
  'Minimalist Piano — Spatial Echo',
  'Ohne Musik (Nur Video-Ton)'
];

const OVERLAY_STYLE_OPTIONS = [
  { id: 'exhibition_card', name: 'Galerie-Poster Card (Ort, Datum & Zeiten im Video)' },
  { id: 'kinetic_hero', name: 'Kinetic Typography (Zentraler Titel im Video)' },
  { id: 'broy_watermark_quote', name: 'Susan Broy Zitat & Logo Overlay' },
  { id: 'subtitles_minimal', name: 'Minimalistische Untertitel (Unten)' }
];

export default function ReviewStudio({ posts, onApprovePost }) {
  const [selectedPostId, setSelectedPostId] = useState(posts[0]?.id || null);
  const selectedPost = posts.find(p => p.id === selectedPostId) || posts[0];
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState(null);
  
  const currentVariant = selectedPost?.variants[selectedVariantIdx] || selectedPost?.variants[0];
  
  // Editable State (Strict 100% German & Direct In-Video Text Control)
  const [editedCaption, setEditedCaption] = useState(currentVariant?.caption || '');
  const [editedOverlayText, setEditedOverlayText] = useState(currentVariant?.overlayText || '');
  const [selectedOverlayStyle, setSelectedOverlayStyle] = useState(currentVariant?.overlayStyle || 'exhibition_card');
  const [selectedAudio, setSelectedAudio] = useState(currentVariant?.audio || AUDIO_PRESETS[0]);

  if (!selectedPost) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="glass-panel p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 flex flex-col items-center gap-4">
          <Layers className="w-12 h-12 text-zinc-400 dark:text-gray-500" />
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white">Keine Entwürfe im Freigabe-Center</h2>
          <p className="text-xs text-zinc-600 dark:text-gray-400 max-w-md">
            Wechseln Sie zum **Redaktionsplan & Input**, um neue Postings zu erfassen. Gemini AI generiert Ihnen 3 fertige Reel-Varianten.
          </p>
        </div>
      </div>
    );
  }

  const handleVariantSelect = (idx) => {
    setSelectedVariantIdx(idx);
    const targetVar = selectedPost.variants[idx];
    setEditedCaption(targetVar.caption);
    setEditedOverlayText(targetVar.overlayText || '');
    setSelectedOverlayStyle(targetVar.overlayStyle || 'exhibition_card');
    setSelectedAudio(targetVar.audio || AUDIO_PRESETS[0]);
    setIsEditing(false);
  };

  const handleSaveDraftOnly = () => {
    setSaveSuccessMsg(`Reel-Änderungen & Video-Texte für Variante ${selectedVariantIdx === 0 ? 'A' : selectedVariantIdx === 1 ? 'B' : 'C'} wurden im Studio gespeichert.`);
    setTimeout(() => setSaveSuccessMsg(null), 4000);
  };

  const handleScheduleForCalendar = () => {
    const finalVariant = {
      ...currentVariant,
      caption: editedCaption,
      overlayText: editedOverlayText,
      overlayStyle: selectedOverlayStyle,
      audio: selectedAudio
    };
    onApprovePost(selectedPost.id, finalVariant);
    setSaveSuccessMsg(`Reel-Video wurde für den ${selectedPost.date} im Redaktionskalender vorgemerkt.`);
    setTimeout(() => setSaveSuccessMsg(null), 4000);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      
      {/* Header Info */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="badge badge-accent">3-Varianten Reel Studio</span>
            <span className="badge badge-concrete">100% Deutsch & In-Video Texte</span>
          </div>
          <h1 className="font-heading text-2xl font-bold text-zinc-900 dark:text-white tracking-wide">
            Instagram Reel Editor & Vorschau
          </h1>
          <p className="text-xs text-zinc-600 dark:text-gray-400 mt-0.5">
            Steuern Sie die **im Video eingebrannten Texte** (Vernissage-Daten, Zitate, Titel), wählen Sie die Musik und sichern Sie Ihren Entwurf.
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

      {/* Success Notification */}
      {saveSuccessMsg && (
        <div className="bg-emerald-500/15 border border-emerald-500/40 text-emerald-900 dark:text-emerald-300 p-4 rounded-xl text-xs mb-6 flex items-center gap-3 animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          <span className="font-medium">{saveSuccessMsg}</span>
        </div>
      )}

      {/* Main Review Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left 7 Columns: Reel Editor */}
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
                    <Film className="w-3 h-3" /> Instagram Reel Video (9:16)
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
                      {v.style}
                    </span>
                  </div>

                  {/* In-Video Text Preview Box */}
                  <div className="bg-zinc-100 dark:bg-zinc-950/80 p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 my-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 block mb-0.5 flex items-center gap-1">
                      <Type className="w-3 h-3" /> Eingebrannter Video-Text:
                    </span>
                    <p className="text-xs font-mono text-zinc-900 dark:text-white whitespace-pre-line">
                      "{v.overlayText || selectedPost.title}"
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-zinc-200 dark:border-zinc-800/60 text-[10px] text-zinc-500 dark:text-gray-400">
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

          {/* Reel In-Video Text Editor */}
          <div className="glass-panel p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 flex flex-col gap-4">
            
            {/* Direct In-Video Text Editor */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-gray-300 flex items-center gap-2 mb-1.5">
                <Type className="w-4 h-4 text-amber-500" />
                Text DIREKT IM VIDEO anpassen (Vernissage-Daten / Titel):
              </label>
              <textarea
                value={editedOverlayText}
                onChange={(e) => setEditedOverlayText(e.target.value)}
                rows={3}
                className="input-studio w-full rounded-xl p-3 text-xs leading-relaxed font-mono resize-none border-amber-500/50"
                placeholder="Dieser Text wird direkt sichtbar in das Reel-Video projiziert..."
              />
              <span className="text-[10px] text-zinc-500 dark:text-gray-500 mt-1 block">
                Tipp: Änderungen hier erscheinen sofort live in der Handy-Videovorschau rechts!
              </span>
            </div>

            {/* In-Video Layout Style Selector */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-gray-300 block mb-1.5">
                  Video-Text Einblendungs-Stil:
                </label>
                <select
                  value={selectedOverlayStyle}
                  onChange={(e) => setSelectedOverlayStyle(e.target.value)}
                  className="input-studio w-full rounded-xl px-4 py-2.5 text-xs font-medium"
                >
                  {OVERLAY_STYLE_OPTIONS.map((opt) => (
                    <option key={opt.id} value={opt.id}>{opt.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-gray-300 block mb-1.5">
                  Musik & Soundtrack:
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
            </div>

            {/* Caption Text Below Video */}
            <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-gray-300 flex items-center gap-2 mb-1.5">
                <Edit3 className="w-4 h-4 text-blue-500" />
                Begleitender Post-Text unter dem Video (Rein Deutsch):
              </label>
              <textarea
                value={editedCaption}
                onChange={(e) => setEditedCaption(e.target.value)}
                rows={4}
                className="input-studio w-full rounded-xl p-3 text-xs leading-relaxed resize-none"
              />
            </div>

            {/* Two Action Buttons: Save Draft vs Schedule */}
            <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-end gap-3">
              
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

        {/* Right 5 Columns: Dynamic Animated Reel Simulator with Live In-Video Text */}
        <div className="lg:col-span-5 flex flex-col items-center justify-start sticky top-24">
          <div className="text-center mb-3">
            <span className="badge badge-concrete">Live Reel-Video mit Text</span>
            <p className="text-[11px] text-zinc-500 dark:text-gray-400 mt-1">Der eingebrannte Video-Text wird live im Video projiziert</p>
          </div>

          <InstagramSimulator 
            post={selectedPost} 
            variant={{
              ...currentVariant,
              caption: editedCaption,
              overlayText: editedOverlayText,
              overlayStyle: selectedOverlayStyle,
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
