import React, { useState } from 'react';
import { ART_MEDIUMS, PRESET_IMAGES, generatePostVariants } from '../services/geminiCopilot';
import { Upload, Sparkles, Image as ImageIcon, Video, Calendar, Tag, Trash2, Plus, Film, CheckCircle2 } from 'lucide-react';

const DEMO_ASSET_BUNDLES = [
  {
    title: 'Beton-Skulptur "SILENCE IV" (3 Werkstatt-Fotos + 1 Video)',
    medium: 'concrete',
    assets: [
      { id: 'a1', type: 'image', url: PRESET_IMAGES.concrete, name: 'Gesamtansicht_Front.jpg' },
      { id: 'a2', type: 'image', url: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80', name: 'Detail_Struktur_Guss.jpg' },
      { id: 'a3', type: 'video', url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80', name: 'LivePhoto_Schattenlauf.mov', isLivePhoto: true }
    ]
  },
  {
    title: 'S/W Grafik "NOIR & NEON" (2 Leinwand-Aufnahmen)',
    medium: 'bw_painting',
    assets: [
      { id: 'b1', type: 'image', url: PRESET_IMAGES.bw_painting, name: 'Leinwand_Gesamt.jpg' },
      { id: 'b2', type: 'image', url: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80', name: 'Detail_Neon_Farbauftrag.jpg' }
    ]
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
  
  // Multi-Asset State
  const [uploadedAssets, setUploadedAssets] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);

  // Handle Multi-file Upload (Supports Images, Videos & Apple Live Photos .heic/.mov)
  const handleMultipleFiles = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const newAssets = files.map((file, idx) => {
      const isVideo = file.type.startsWith('video/') || file.name.endsWith('.mov') || file.name.endsWith('.mp4');
      const isLivePhoto = file.name.endsWith('.mov') || file.name.includes('Live');

      return {
        id: `file-${Date.now()}-${idx}`,
        name: file.name,
        type: isVideo ? 'video' : 'image',
        isLivePhoto,
        url: URL.createObjectURL(file),
        fileObject: file
      };
    });

    setUploadedAssets(prev => [...prev, ...newAssets]);
  };

  const removeAsset = (assetId) => {
    setUploadedAssets(prev => prev.filter(a => a.id !== assetId));
  };

  const loadDemoBundle = (bundle) => {
    setTitle(bundle.title);
    setMedium(bundle.medium);
    setUploadedAssets(bundle.assets);
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    setIsGenerating(true);

    const tags = tagsInput
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0)
      .map(t => t.startsWith('@') ? t : `@${t}`);

    // If no assets uploaded, use default medium preview
    const primaryMediaUrl = uploadedAssets.length > 0 
      ? uploadedAssets[0].url 
      : PRESET_IMAGES[medium] || PRESET_IMAGES.concrete;

    const inputData = {
      title: title || 'Kunstwerk ohne Titel',
      medium,
      keywords: keywords || 'Form im Raum, Stille, Reduktion',
      tags: tags.length ? tags : ['@syken_broy'],
      type: postType,
      date,
      accentColor,
      mediaUrl: primaryMediaUrl,
      assetCount: Math.max(1, uploadedAssets.length),
      assetList: uploadedAssets
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

  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      
      {/* Intro Banner */}
      <div className="glass-panel p-6 rounded-2xl mb-8 border border-zinc-200 dark:border-zinc-800 bg-gradient-to-r from-zinc-100 via-white to-zinc-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-black">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="badge badge-concrete">Redaktionsplan Input</span>
              <span className="badge badge-accent">Multi-Asset & Live Photos</span>
            </div>
            <h1 className="font-heading text-2xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
              Medien hochladen & Post-Varianten generieren
            </h1>
            <p className="text-xs text-zinc-600 dark:text-gray-400 mt-1 max-w-2xl leading-relaxed">
              Laden Sie mehrere Fotos, Detail-Aufnahmen, Videos oder **Apple Live Photos** eines Kunstwerks hoch. 
              Gemini AI kombiniert Ihre Medien zu 3 verschiedenen Post-Formaten (Karussell, Reel-Animation oder Single Hero-Shot).
            </p>
          </div>
          <div className="text-right hidden md:block">
            <span className="text-xs text-zinc-500 dark:text-gray-500 block">Status Ökosystem</span>
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 justify-end mt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Multi-Media Engine Ready
            </span>
          </div>
        </div>
      </div>

      <form onSubmit={handleGenerate} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Multi-Asset Upload Vault (6 cols) */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          
          <div className="glass-panel p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-gray-300 flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-amber-500" />
                Medien-Pool für dieses Posting ({uploadedAssets.length} Dateien)
              </label>
              {uploadedAssets.length > 0 && (
                <button
                  type="button"
                  onClick={() => setUploadedAssets([])}
                  className="text-[11px] text-red-500 hover:underline font-semibold"
                >
                  Alle entfernen
                </button>
              )}
            </div>

            {/* Empty State / Main Multi-Upload Zone */}
            {uploadedAssets.length === 0 ? (
              <label className="border-2 border-dashed border-zinc-300 dark:border-zinc-700 hover:border-zinc-900 dark:hover:border-yellow-400/80 rounded-2xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all bg-zinc-50/70 dark:bg-zinc-950/60 hover:bg-zinc-100/70 dark:hover:bg-zinc-900/60 group text-center min-h-[220px]">
                <div className="w-12 h-12 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-zinc-700 dark:text-gray-300 group-hover:scale-110 transition-transform">
                  <Upload className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-sm font-bold text-zinc-900 dark:text-white block">
                    Fotos & Videos hierher ziehen
                  </span>
                  <span className="text-xs text-zinc-500 dark:text-gray-400 block mt-0.5">
                    Unterstützt Mehrfachauswahl: JPG, PNG, HEIC, MP4 & **Apple Live Photos (.mov)**
                  </span>
                </div>
                <span className="btn-secondary py-1.5 px-4 text-xs font-bold mt-1">
                  Dateien auswählen
                </span>
                <input 
                  type="file" 
                  multiple 
                  accept="image/*,video/*,.heic,.mov" 
                  onChange={handleMultipleFiles} 
                  className="hidden" 
                />
              </label>
            ) : (
              
              /* Multi-Asset Gallery Grid */
              <div className="flex flex-col gap-3">
                <div className="grid grid-cols-3 gap-3">
                  {uploadedAssets.map((asset, idx) => (
                    <div 
                      key={asset.id} 
                      className="relative aspect-square rounded-xl overflow-hidden bg-zinc-900 border border-zinc-300 dark:border-zinc-700 group shadow-sm"
                    >
                      <img src={asset.url} alt={asset.name} className="w-full h-full object-cover" />
                      
                      {/* Badge for Type & Live Photo */}
                      <div className="absolute top-1.5 left-1.5 flex flex-col gap-1">
                        <span className="bg-black/75 backdrop-blur-md text-white text-[9px] font-mono px-1.5 py-0.5 rounded">
                          #{idx + 1} {asset.type === 'video' ? 'VIDEO' : 'FOTO'}
                        </span>
                        {asset.isLivePhoto && (
                          <span className="bg-amber-500 text-black text-[8px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1">
                            <Film className="w-2.5 h-2.5" /> LIVE
                          </span>
                        )}
                      </div>

                      {/* Remove Button */}
                      <button
                        type="button"
                        onClick={() => removeAsset(asset.id)}
                        className="absolute top-1.5 right-1.5 bg-red-600/90 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110"
                        title="Datei entfernen"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      <div className="absolute bottom-0 inset-x-0 bg-black/80 px-2 py-1 text-[9px] text-gray-300 truncate font-mono">
                        {asset.name}
                      </div>
                    </div>
                  ))}

                  {/* Add More Assets Card */}
                  <label className="aspect-square border-2 border-dashed border-zinc-300 dark:border-zinc-700 hover:border-zinc-900 dark:hover:border-yellow-400 rounded-xl flex flex-col items-center justify-center gap-1 cursor-pointer transition-all bg-zinc-50 dark:bg-zinc-950/50 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-500 dark:text-gray-400">
                    <Plus className="w-6 h-6" />
                    <span className="text-[10px] font-bold">Weitere hinzufügen</span>
                    <input 
                      type="file" 
                      multiple 
                      accept="image/*,video/*,.heic,.mov" 
                      onChange={handleMultipleFiles} 
                      className="hidden" 
                    />
                  </label>
                </div>
              </div>
            )}

            {/* Quick Demo Asset Bundles */}
            <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800">
              <span className="text-[11px] font-semibold text-zinc-500 dark:text-gray-400 uppercase tracking-wider block mb-2">
                Oder Demo-Medienpaket laden:
              </span>
              <div className="flex flex-col gap-2">
                {DEMO_ASSET_BUNDLES.map((bundle, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => loadDemoBundle(bundle)}
                    className="text-left p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 bg-zinc-50 dark:bg-zinc-900/60 transition-all flex items-center justify-between"
                  >
                    <div>
                      <span className="text-xs font-bold text-zinc-900 dark:text-white block">{bundle.title}</span>
                      <span className="text-[10px] text-zinc-500 dark:text-gray-400">{bundle.assets.length} Medien-Dateien hinterlegt</span>
                    </div>
                    <Plus className="w-4 h-4 text-zinc-400" />
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Right Column: Parameters & Generation (6 cols) */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          
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
                  onChange={(e) => setMedium(e.target.value)}
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
                Tipp: Gemini analysiert alle hochgeladenen Dateien zusammen mit diesen Stichwörtern.
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

            {/* Post Format & Color Accent Selector */}
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
                  Akzentfarbe (für S/W-Bilder)
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
                    <span>Gemini AI kombiniert {uploadedAssets.length || 1} Medien & rendert 3 Varianten...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>3 Post-Varianten aus Medienpool generieren</span>
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
