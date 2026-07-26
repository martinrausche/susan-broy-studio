import React, { useState } from 'react';
import InstagramSimulator from './InstagramSimulator';
import BroyLogo from './BroyLogo';
import { REEL_TRANSITION_EFFECTS } from '../services/geminiCopilot';
import { Layers, CheckCircle2, Edit3, Music, Tag, Calendar, Sparkles, Save, ShieldCheck, Film, Type, Sliders, Eye } from 'lucide-react';

const AUDIO_PRESETS = [
  'Ambient Calm — Deep Resonance (Slow & Cinematic)',
  'Pulse of Silence — Atmospheric Beat (Rhythm)',
  'Natural Studio Acoustics — Quiet Space (Atelier)',
  'Minimalist Piano — Spatial Echo',
  'Ohne Musik (Nur Video-Ton)'
];

export default function ReviewStudio({ posts, onApprovePost }) {
  const [selectedPostId, setSelectedPostId] = useState(posts[0]?.id || null);
  const selectedPost = posts.find(p => p.id === selectedPostId) || posts[0];
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState(null);
  
  const currentVariant = selectedPost?.variants[selectedVariantIdx] || selectedPost?.variants[0];
  
  // Editable State (Strict Zero-Invention Rule & High Creativity Controls)
  const [editedCaption, setEditedCaption] = useState(currentVariant?.caption || '');
  const [editedOverlayText, setEditedOverlayText] = useState(currentVariant?.overlayText || '');
  const [textColor, setTextColor] = useState(currentVariant?.textColor || 'black'); // 'black' for white bg, 'white' for dark bg
  const [selectedTransition, setSelectedTransition] = useState(currentVariant?.transitionEffect || 'zoom_pan');
  const [selectedAudio, setSelectedAudio] = useState(currentVariant?.audio || AUDIO_PRESETS[0]);
  
  // Watermark Settings (Subtle Monochrome Transparent)
  const [watermarkColor, setWatermarkColor] = useState('white');
  const [watermarkOpacity, setWatermarkOpacity] = useState(0.55);

  if (!selectedPost) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="glass-panel p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 flex flex-col items-center gap-4">
          <Layers className="w-12 h-12 text-zinc-400 dark:text-gray-500" />
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white">Keine Entwürfe im Freigabe-Center</h2>
          <p className="text-xs text-zinc-600 dark:text-gray-400 max-w-md">
            Wechseln Sie zum **Redaktionsplan & Input**, um neue Postings zu erfassen.
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
    setTextColor(targetVar.textColor || 'black');
    setSelectedTransition(targetVar.transitionEffect || 'zoom_pan');
    setSelectedAudio(targetVar.audio || AUDIO_PRESETS[0]);
  };

  const handleSaveDraftOnly = () => {
    setSaveSuccessMsg(`Änderungen an Variante ${selectedVariantIdx === 0 ? 'A' : selectedVariantIdx === 1 ? 'B' : 'C'} gespeichert.`);
    setTimeout(() => setSaveSuccessMsg(null), 4000);
  };

  const handleScheduleForCalendar = () => {
    const finalVariant = {
      ...currentVariant,
      caption: editedCaption,
      overlayText: editedOverlayText,
      textColor,
      transitionEffect: selectedTransition,
      audio: selectedAudio
    };
    onApprovePost(selectedPost.id, finalVariant);
    setSaveSuccessMsg(`Posting für den ${selectedPost.date} im Kalender vorgemerkt.`);
    setTimeout(() => setSaveSuccessMsg(null), 4000);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      
      {/* Header Info */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="badge badge-accent">Kinetisches Reel Studio</span>
            <span className="badge badge-concrete">Direkte Video-Typografie</span>
          </div>
          <h1 className="font-heading text-2xl font-bold text-zinc-900 dark:text-white tracking-wide">
            Kinetische Texte, Effekte & Wasserzeichen
          </h1>
          <p className="text-xs text-zinc-600 dark:text-gray-400 mt-0.5">
            Texte werden mit **Fade- & Zoom-Animationen direkt im Video** eingeblendet (Schwarz auf hellen Stellen / Weiß auf dunklen Stellen).
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
        
        {/* Left 7 Columns: Reel Controls */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          {/* 3 Reel Variants Selector */}
          <div className="flex flex-col gap-3">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-gray-400">
              3 Kinetische Reel-Stile:
            </label>

            <div className="grid grid-cols-1 gap-3">
              {selectedPost.variants.map((v, idx) => (
                <div
                  key={v.id}
                  onClick={() => handleVariantSelect(idx)}
                  className={`glass-panel p-4 rounded-xl border transition-all cursor-pointer ${
                    selectedVariantIdx === idx 
                      ? 'border-zinc-900 dark:border-white bg-white dark:bg-zinc-900/90 shadow-md' 
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
                  </div>

                  {v.overlayText && (
                    <div className="bg-zinc-100 dark:bg-zinc-950/80 p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 my-1">
                      <span className="text-[10px] font-mono text-zinc-700 dark:text-gray-300 block truncate">
                        Kinetischer Video-Text: "{v.overlayText.replace(/\n/g, ' • ')}"
                      </span>
                    </div>
                  )}

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-zinc-200 dark:border-zinc-800/60 text-[10px] text-zinc-500 dark:text-gray-400">
                    <span className="flex items-center gap-1 font-medium">
                      <Film className="w-3 h-3 text-amber-500" />
                      {v.transitionEffect === 'zoom_pan' ? 'Raum-Zoom & Kameraschwenk' : 'Licht-Crossfade'}
                    </span>
                    <span className="flex items-center gap-1 text-purple-600 dark:text-purple-400 font-medium">
                      <Music className="w-3 h-3" />
                      {v.audio}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reel Controls Form */}
          <div className="glass-panel p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 flex flex-col gap-5">
            
            {/* 1. Kinetischer Video-Text & Farbe */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-gray-300 flex items-center gap-2">
                  <Type className="w-4 h-4 text-blue-500" />
                  1. Kinetischer Video-Text (Zeilen faden & zoomen rhythmisch ein):
                </label>

                {/* Text Color Toggle: Black on White vs White on Black */}
                <div className="flex items-center gap-1.5 bg-zinc-100 dark:bg-zinc-900 p-1 rounded-lg border border-zinc-200 dark:border-zinc-800">
                  <button
                    type="button"
                    onClick={() => setTextColor('black')}
                    className={`px-2.5 py-1 rounded text-[10px] font-bold transition-all ${
                      textColor === 'black'
                        ? 'bg-black text-white shadow-sm'
                        : 'text-zinc-600 dark:text-gray-400'
                    }`}
                  >
                    ⚫ Schwarz (auf hellen Stellen)
                  </button>
                  <button
                    type="button"
                    onClick={() => setTextColor('white')}
                    className={`px-2.5 py-1 rounded text-[10px] font-bold transition-all ${
                      textColor === 'white'
                        ? 'bg-white text-black shadow-sm'
                        : 'text-zinc-600 dark:text-gray-400'
                    }`}
                  >
                    ⚪ Weiß (auf dunklen Stellen)
                  </button>
                </div>
              </div>

              <textarea
                value={editedOverlayText}
                onChange={(e) => setEditedOverlayText(e.target.value)}
                rows={3}
                className="input-studio w-full rounded-xl p-3 text-xs leading-relaxed font-mono resize-none border-blue-500/40"
                placeholder="Jede Zeile wird nacheinander dynamisch im Video eingeblendet..."
              />
              <span className="text-[10px] text-zinc-500 dark:text-gray-500 mt-1 block">
                Tipp: Jede neue Zeile wird im Video als eigener animierter Impuls gefadet und gezoomt!
              </span>
            </div>

            {/* 2. Kameraschwenks & Übergangseffekte */}
            <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-gray-300 flex items-center gap-2 mb-2">
                <Film className="w-4 h-4 text-amber-500" />
                2. Kamera-Bewegung & Video-Dynamik wählen:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {REEL_TRANSITION_EFFECTS.map((eff) => (
                  <button
                    key={eff.id}
                    type="button"
                    onClick={() => setSelectedTransition(eff.id)}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      selectedTransition === eff.id
                        ? 'bg-zinc-900 text-white dark:bg-white dark:text-black border-zinc-900 shadow-sm'
                        : 'bg-zinc-100 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-gray-300'
                    }`}
                  >
                    <span className="text-xs font-bold block">{eff.label}</span>
                    <span className="text-[9px] opacity-75">{eff.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Wasserzeichen-Logo Controls */}
            <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-gray-300 flex items-center gap-2 mb-2">
                <BroyLogo size={14} color="currentColor" />
                3. BROY Wasserzeichen-Logo (Schlicht & transparent):
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-zinc-600 dark:text-gray-400">Farbe:</span>
                  <button
                    type="button"
                    onClick={() => setWatermarkColor('white')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                      watermarkColor === 'white' 
                        ? 'bg-white text-black border-zinc-400 shadow-sm' 
                        : 'bg-zinc-800 text-white border-zinc-700 opacity-60'
                    }`}
                  >
                    ⚪ Weiß
                  </button>
                  <button
                    type="button"
                    onClick={() => setWatermarkColor('black')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                      watermarkColor === 'black' 
                        ? 'bg-black text-white border-zinc-700 shadow-sm' 
                        : 'bg-zinc-200 text-black border-zinc-300 opacity-60'
                    }`}
                  >
                    ⚫ Schwarz
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-zinc-600 dark:text-gray-400">Deckkraft:</span>
                  <input 
                    type="range" 
                    min="0.2" 
                    max="1" 
                    step="0.05"
                    value={watermarkOpacity}
                    onChange={(e) => setWatermarkOpacity(parseFloat(e.target.value))}
                    className="w-full accent-zinc-900 dark:accent-white"
                  />
                  <span className="text-xs font-mono w-10 text-right">{Math.round(watermarkOpacity * 100)}%</span>
                </div>
              </div>
            </div>

            {/* 4. Soundtrack Selector */}
            <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-gray-300 flex items-center gap-2 mb-1.5">
                <Music className="w-4 h-4 text-purple-500" />
                4. Soundtrack & Musik:
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

            {/* 5. Post Caption Below */}
            <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-gray-300 flex items-center gap-2 mb-1.5">
                <Edit3 className="w-4 h-4 text-zinc-500" />
                5. Begleitender Instagram Post-Text:
              </label>
              <textarea
                value={editedCaption}
                onChange={(e) => setEditedCaption(e.target.value)}
                rows={3}
                className="input-studio w-full rounded-xl p-3 text-xs leading-relaxed resize-none"
              />
            </div>

            {/* Action Buttons */}
            <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-end gap-3">
              <button
                onClick={handleSaveDraftOnly}
                className="w-full sm:w-auto btn-secondary py-3 px-5 text-xs font-bold flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Als Entwurf speichern</span>
              </button>

              <button
                onClick={handleScheduleForCalendar}
                className="w-full sm:w-auto btn-accent py-3 px-6 text-xs font-bold flex items-center justify-center gap-2 shadow-lg"
              >
                <Calendar className="w-4 h-4" />
                <span>Im Kalender einplanen</span>
              </button>
            </div>

          </div>

        </div>

        {/* Right 5 Columns: Dynamic Animated Reel Simulator with Live In-Video Text */}
        <div className="lg:col-span-5 flex flex-col items-center justify-start sticky top-24">
          <div className="text-center mb-3">
            <span className="badge badge-concrete">Kinetische Video-Typografie</span>
            <p className="text-[11px] text-zinc-500 dark:text-gray-400 mt-1">Einfaden & Zoom-Effekt direkt auf dem Videoclip</p>
          </div>

          <InstagramSimulator 
            post={selectedPost} 
            variant={{
              ...currentVariant,
              caption: editedCaption,
              overlayText: editedOverlayText,
              textColor,
              transitionEffect: selectedTransition,
              audio: selectedAudio
            }}
            watermarkColor={watermarkColor}
            watermarkOpacity={watermarkOpacity}
          />
        </div>

      </div>

    </section>
  );
}
