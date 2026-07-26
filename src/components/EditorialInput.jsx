import React, { useState } from 'react';
import { ART_MEDIUMS, PRESET_IMAGES, generatePostVariants } from '../services/geminiCopilot';
import { Upload, Sparkles, Image as ImageIcon, Calendar, Tag } from 'lucide-react';

const PRESET_ARTWORKS = [
  {
    title: 'Beton-Skulptur "STRUCTURE I"',
    medium: 'concrete',
    url: PRESET_IMAGES.concrete,
    desc: 'Rauer Gießbeton mit geometrischem Schattenwurf'
  },
  {
    title: 'Metall & Beton "SPATIAL BALANCE"',
    medium: 'mixed',
    url: PRESET_IMAGES.metal,
    desc: 'Stahl-Installation auf schwerem Beton-Sockel'
  },
  {
    title: 'S/W Grafik "NOIR & NEON NO. 3"',
    medium: 'bw_painting',
    url: PRESET_IMAGES.bw_painting,
    desc: 'Acryl auf Strukturleinwand mit leuchtendem Akzent'
  }
];

export default function EditorialInput({ onNewPostCreated }) {
  const [title, setTitle] = useState('');
  const [medium, setMedium] = useState('concrete');
  const [keywords, setKeywords] = useState('');
  const [tagsInput, setTagsInput] = useState('@galerie_vonundvon, @artkarlsruhe');
  const [postType, setPostType] = useState('reel');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [accentColor, setAccentColor] = useState('#E2F518');
  const [selectedPresetUrl, setSelectedPresetUrl] = useState(PRESET_ARTWORKS[0].url);
  const [customFileUrl, setCustomFileUrl] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCustomFileUrl(url);
    }
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    setIsGenerating(true);

    const tags = tagsInput
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0)
      .map(t => t.startsWith('@') ? t : `@${t}`);

    const inputData = {
      title: title || 'Kunstwerk ohne Titel',
      medium,
      keywords: keywords || 'Form im Raum, Stille, Reduktion',
      tags: tags.length ? tags : ['@syken_broy'],
      type: postType,
      date,
      accentColor,
      mediaUrl: customFileUrl || selectedPresetUrl
    };

    try {
      const newPost = await generatePostVariants(inputData);
      onNewPostCreated(newPost);
      setTitle('');
      setKeywords('');
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const currentMediaUrl = customFileUrl || selectedPresetUrl;

  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      
      {/* Intro Banner */}
      <div className="glass-panel p-6 rounded-2xl mb-8 border border-zinc-200 dark:border-zinc-800 bg-gradient-to-r from-zinc-100 via-white to-zinc-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-black">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="badge badge-concrete">Redaktionsplan Input</span>
              <span className="badge badge-accent">Susan Broy Ästhetik</span>
            </div>
            <h1 className="font-heading text-2xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
              Neues Kunstwerk & Thema erfassen
            </h1>
            <p className="text-xs text-zinc-600 dark:text-gray-400 mt-1 max-w-2xl leading-relaxed">
              Erfassen Sie Werkdaten für Beton-Skulpturen, Metall-Installationen oder S/W-Malereien. 
              Google Gemini AI generiert daraus **3 hochwertige, komplett ausgearbeitete Varianten** zur Freigabe.
            </p>
          </div>
          <div className="text-right hidden md:block">
            <span className="text-xs text-zinc-500 dark:text-gray-500 block">Status Ökosystem</span>
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 justify-end mt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Google AI Pro Ready
            </span>
          </div>
        </div>
      </div>

      <form onSubmit={handleGenerate} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Media Selection & Upload (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Main Media Preview Box */}
          <div className="glass-panel p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-gray-300 flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-amber-500" />
                Medien-Vorschau (Kunstwerk Foto / Video)
              </label>
              {customFileUrl && (
                <button
                  type="button"
                  onClick={() => setCustomFileUrl(null)}
                  className="text-[11px] text-red-500 hover:underline font-semibold"
                >
                  Zurück zu Presets
                </button>
              )}
            </div>

            <div className="relative aspect-square rounded-xl overflow-hidden bg-zinc-900 border border-zinc-300 dark:border-zinc-800 group">
              <img 
                src={currentMediaUrl} 
                alt="Kunstwerk Vorschau" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
              
              {/* Material Badge Overlay */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                <span className="badge badge-concrete bg-black/80 text-white backdrop-blur-md border-white/20">
                  {ART_MEDIUMS.find(m => m.id === medium)?.label}
                </span>
                <span className="text-[10px] text-gray-200 font-mono">
                  Format: {postType === 'reel' ? 'Reel / Story (9:16)' : 'Feed Post (4:5)'}
                </span>
              </div>
            </div>

            {/* Custom Upload Drop Area */}
            <label className="border-2 border-dashed border-zinc-300 dark:border-zinc-700 hover:border-zinc-500 dark:hover:border-yellow-400/60 rounded-xl p-4 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all bg-zinc-50/50 dark:bg-zinc-950/50 hover:bg-zinc-100/50 dark:hover:bg-zinc-900/50">
              <Upload className="w-5 h-5 text-zinc-500 dark:text-gray-400" />
              <div className="text-center">
                <span className="text-xs font-semibold text-zinc-800 dark:text-gray-200 block">Foto eines Werkstücks hochladen</span>
                <span className="text-[10px] text-zinc-500 dark:text-gray-500">JPG, PNG oder MP4 (Beton, Metall, Leinwand)</span>
              </div>
              <input type="file" accept="image/*,video/*" onChange={handleFileUpload} className="hidden" />
            </label>

            {/* Quick Demo Presets */}
            <div>
              <span className="text-[11px] font-semibold text-zinc-500 dark:text-gray-400 uppercase tracking-wider block mb-2">
                Oder Demo-Werkstück auswählen:
              </span>
              <div className="grid grid-cols-3 gap-2">
                {PRESET_ARTWORKS.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setSelectedPresetUrl(preset.url);
                      setMedium(preset.medium);
                      setTitle(preset.title);
                      setCustomFileUrl(null);
                    }}
                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedPresetUrl === preset.url && !customFileUrl 
                        ? 'border-zinc-900 dark:border-yellow-400 scale-95 shadow-md' 
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={preset.url} alt={preset.title} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Right Column: Metadata Parameters (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          <div className="glass-panel p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 flex flex-col gap-5">
            
            {/* Title & Medium */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-zinc-700 dark:text-gray-300 uppercase tracking-wider block mb-1.5">
                  Titel des Kunstwerks / Thema
                </label>
                <input 
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="z.B. Beton-Skulptur 'SILENCE IV'"
                  className="input-studio w-full rounded-xl px-4 py-2.5 text-xs placeholder-zinc-400 dark:placeholder-gray-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-700 dark:text-gray-300 uppercase tracking-wider block mb-1.5">
                  Material / Kategorie
                </label>
                <select
                  value={medium}
                  onChange={(e) => {
                    setMedium(e.target.value);
                    if (PRESET_IMAGES[e.target.value]) {
                      setSelectedPresetUrl(PRESET_IMAGES[e.target.value]);
                    }
                  }}
                  className="input-studio w-full rounded-xl px-4 py-2.5 text-xs"
                >
                  {ART_MEDIUMS.map(m => (
                    <option key={m.id} value={m.id}>{m.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Keywords */}
            <div>
              <label className="text-xs font-bold text-zinc-700 dark:text-gray-300 uppercase tracking-wider block mb-1.5">
                Stichwörter & Beschriftungs-Impulse
              </label>
              <textarea
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                rows={3}
                placeholder="z.B. Raues Mineral, tiefe Lichtschatten, Form im Raum, Galerie von&von"
                className="input-studio w-full rounded-xl px-4 py-2.5 text-xs placeholder-zinc-400 dark:placeholder-gray-500 resize-none"
              />
              <span className="text-[10px] text-zinc-500 dark:text-gray-500 mt-1 block">
                Tipp: Gemini nutzt diese Stichwörter zusammen mit der Bildanalyse für 3 nuancierte Text-Stile.
              </span>
            </div>

            {/* Tagged Accounts & Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-zinc-700 dark:text-gray-300 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-blue-500" />
                  Erwähnungen & Partner (@)
                </label>
                <input 
                  type="text" 
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="@galerie_vonundvon, @artkarlsruhe"
                  className="input-studio w-full rounded-xl px-4 py-2.5 text-xs placeholder-zinc-400 dark:placeholder-gray-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-700 dark:text-gray-300 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-emerald-500" />
                  Geplantes Veröffentlichungsdatum
                </label>
                <input 
                  type="date" 
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="input-studio w-full rounded-xl px-4 py-2.5 text-xs"
                />
              </div>
            </div>

            {/* Format & Color Accent Selector */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-zinc-200 dark:border-zinc-800">
              
              <div>
                <label className="text-xs font-bold text-zinc-700 dark:text-gray-300 uppercase tracking-wider block mb-1.5">
                  Post-Format
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setPostType('reel')}
                    className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold border transition-all ${
                      postType === 'reel' 
                        ? 'bg-zinc-900 text-white dark:bg-yellow-400/10 dark:border-yellow-400 dark:text-yellow-400 shadow-sm' 
                        : 'bg-zinc-100 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-gray-400 hover:text-zinc-900 dark:hover:text-white'
                    }`}
                  >
                    Reel / Story (9:16)
                  </button>
                  <button
                    type="button"
                    onClick={() => setPostType('feed')}
                    className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold border transition-all ${
                      postType === 'feed' 
                        ? 'bg-zinc-900 text-white dark:bg-yellow-400/10 dark:border-yellow-400 dark:text-yellow-400 shadow-sm' 
                        : 'bg-zinc-100 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-gray-400 hover:text-zinc-900 dark:hover:text-white'
                    }`}
                  >
                    Feed Post (4:5)
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-700 dark:text-gray-300 uppercase tracking-wider block mb-1.5">
                  Akzentfarbe (für B&W-Bilder)
                </label>
                <div className="flex items-center gap-2">
                  {['#E2F518', '#0A84FF', '#FF3B30', '#D4AF37', '#111116'].map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setAccentColor(color)}
                      style={{ backgroundColor: color }}
                      className={`w-7 h-7 rounded-full border-2 transition-transform ${
                        accentColor === color ? 'scale-110 border-zinc-900 dark:border-white shadow-lg' : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    />
                  ))}
                </div>
              </div>

            </div>

            {/* Action Button */}
            <div className="pt-3">
              <button
                type="submit"
                disabled={isGenerating}
                className="w-full btn-accent py-3.5 rounded-xl font-bold flex items-center justify-center gap-3 text-sm transition-all shadow-lg hover:shadow-xl"
              >
                {isGenerating ? (
                  <>
                    <span className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
                    <span>Gemini AI analysiert Kunstwerk & rendert 3 Varianten...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>3 Post-Varianten jetzt generieren</span>
                  </>
                )}
              </button>
            </div>

          </div>

        </div>

      </form>

    </section>
  );
}
