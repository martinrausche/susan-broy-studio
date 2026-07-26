import React, { useState, useEffect } from 'react';
import BroyLogo from './BroyLogo';
import { Heart, MessageCircle, Send, Bookmark, Music, Volume2, VolumeX, Play, Pause, ChevronLeft, ChevronRight, Sparkles, Type } from 'lucide-react';

export default function InstagramSimulator({ post, variant, onSaveDraft, onSchedulePost }) {
  const [currentSlideIdx, setCurrentSlideIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const assetList = post?.assetList && post.assetList.length > 0
    ? post.assetList
    : [{ id: '1', url: post?.mediaUrl || '', type: 'image' }];

  const currentAsset = assetList[currentSlideIdx % assetList.length];

  // Auto-advance slides in Reel video mode
  useEffect(() => {
    if (!isPlaying || assetList.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlideIdx(prev => (prev + 1) % assetList.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [isPlaying, assetList.length]);

  const overlayText = variant?.overlayText || `${post?.title || 'SUSAN BROY'}\n${post?.location || 'ATELIER GAUTING'}`;
  const overlayStyle = variant?.overlayStyle || 'kinetic_hero';

  return (
    <div className="flex flex-col items-center gap-4 my-2 w-full max-w-[360px]">
      
      {/* Smartphone Container Frame */}
      <div className="phone-frame shadow-2xl w-full">
        <div className="phone-notch" />

        {/* Instagram Reel Top Status Bar */}
        <div className="pt-7 pb-2 px-4 flex items-center justify-between bg-black/90 text-white z-10 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-zinc-800 p-1 flex items-center justify-center border border-white/20">
              <BroyLogo size={14} variant="instagram" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-white block leading-none">syken_broy</span>
              <span className="text-[9px] text-gray-400">Atelier Gauting • Video Reel</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
              REEL VIDEO
            </span>
          </div>
        </div>

        {/* Video Reel Player Canvas with In-Video Text Overlays */}
        <div className="relative flex-1 bg-black overflow-hidden flex items-center justify-center group">
          
          {/* Animated Video Motion Background (Ken Burns Pan/Zoom + Motion Effects) */}
          <div className="relative w-full h-full overflow-hidden">
            <img
              src={currentAsset.url}
              alt="Reel Asset"
              className={`w-full h-full object-cover transition-transform duration-[3800ms] ease-linear ${
                isPlaying ? 'scale-110 translate-x-1 translate-y-1' : 'scale-100'
              }`}
            />
            
            {/* Cinematic Light Sweep Overlay */}
            {isPlaying && (
              <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-transparent to-white/15 animate-pulse duration-[3000ms] pointer-events-none" />
            )}

            {/* Dark Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/40 pointer-events-none" />

            {/* BROY Watermark */}
            <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/20 flex items-center gap-1.5 z-20">
              <BroyLogo size={12} variant="instagram" />
              <span className="text-[9px] font-mono text-white font-bold tracking-widest uppercase">BROY</span>
            </div>

            {/* ========================================================================= */}
            {/* IN-VIDEO TEXT OVERLAY ENGINE (Direkt in den Videoclip eingebrannte Texte) */}
            {/* ========================================================================= */}

            {overlayStyle === 'exhibition_card' ? (
              /* Style A: Ausstellungs-Poster Card (Oben/Mitte) */
              <div className={`absolute top-12 inset-x-4 bg-black/80 backdrop-blur-md p-4 rounded-xl border border-white/20 text-white z-30 transition-all duration-700 ${
                isPlaying ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-90'
              }`}>
                <div className="flex items-center gap-1.5 text-amber-400 text-[10px] font-bold uppercase tracking-wider mb-1">
                  <Sparkles className="w-3 h-3" /> Ausstellungs-Information
                </div>
                <pre className="whitespace-pre-wrap font-sans text-xs leading-relaxed font-bold tracking-wide text-white">
                  {overlayText}
                </pre>
              </div>
            ) : overlayStyle === 'kinetic_hero' ? (
              /* Style B: Kinetic Typography (Große fette Titel-Einblendung mittig) */
              <div className={`absolute inset-x-4 top-1/3 -translate-y-1/2 text-center z-30 transition-all duration-1000 ${
                isPlaying ? 'scale-105 opacity-100' : 'scale-100 opacity-90'
              }`}>
                <div className="inline-block bg-black/75 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/25 shadow-2xl">
                  <pre className="whitespace-pre-wrap font-heading text-sm font-extrabold uppercase tracking-widest text-white leading-tight">
                    {overlayText}
                  </pre>
                </div>
              </div>
            ) : overlayStyle === 'broy_watermark_quote' ? (
              /* Style C: Zitat & Philosophie Overlay (Unten/Mitte) */
              <div className={`absolute bottom-20 inset-x-4 bg-black/75 backdrop-blur-md p-3.5 rounded-xl border border-white/20 text-center text-white z-30 transition-all duration-700 ${
                isPlaying ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-90'
              }`}>
                <div className="flex items-center justify-center gap-1.5 text-pink-400 text-[10px] font-bold uppercase tracking-wider mb-1">
                  <BroyLogo size={10} variant="instagram" /> Susan Broy Zitat
                </div>
                <p className="font-serif italic text-xs leading-relaxed text-gray-100">
                  {overlayText}
                </p>
              </div>
            ) : (
              /* Style D: Minimalistische Untertitel */
              <div className="absolute bottom-20 inset-x-4 text-center z-30">
                <span className="bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-md border border-white/20 text-[11px] font-medium text-white">
                  {overlayText.replace(/\n/g, ' • ')}
                </span>
              </div>
            )}

            {/* Play/Pause Motion Overlay Button */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity z-20"
            >
              <div className="p-3 bg-black/70 rounded-full text-white backdrop-blur-md border border-white/20">
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
              </div>
            </button>

            {/* Reel Progress Bar Top */}
            <div className="absolute top-2 inset-x-3 flex gap-1 z-30">
              {assetList.map((_, idx) => (
                <div key={idx} className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-white transition-all duration-300 ${
                      currentSlideIdx === idx ? (isPlaying ? 'w-full transition-all duration-[3500ms] ease-linear' : 'w-full') : (currentSlideIdx > idx ? 'w-full' : 'w-0')
                    }`}
                  />
                </div>
              ))}
            </div>

            {/* Multi-Slide Manual Navigation Arrows */}
            {assetList.length > 1 && (
              <>
                <button
                  onClick={() => setCurrentSlideIdx(prev => (prev > 0 ? prev - 1 : assetList.length - 1))}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black text-white p-1.5 rounded-full border border-white/20 backdrop-blur-md z-30"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setCurrentSlideIdx(prev => (prev + 1) % assetList.length)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black text-white p-1.5 rounded-full border border-white/20 backdrop-blur-md z-30"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </>
            )}

            {/* Music Audio Vibe Bar */}
            <div className="absolute bottom-4 left-3 right-3 flex items-center justify-between text-white text-[10px] z-30">
              <div className="flex items-center gap-2 bg-black/75 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 max-w-[80%] truncate">
                <Music className={`w-3.5 h-3.5 text-pink-400 ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '3s' }} />
                <span className="truncate font-medium">{variant?.audio || 'Ambient Calm — Deep Resonance'}</span>
              </div>

              <button 
                onClick={() => setIsMuted(!isMuted)}
                className="p-2 bg-black/75 backdrop-blur-md rounded-full border border-white/20 text-white hover:scale-105 transition-transform"
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5 text-gray-400" /> : <Volume2 className="w-3.5 h-3.5 text-white" />}
              </button>
            </div>
          </div>

        </div>

        {/* Caption & Description Box */}
        <div className="px-4 py-3 bg-black text-white text-xs border-t border-white/10">
          <p className="leading-relaxed">
            <span className="font-bold mr-1.5 text-white">syken_broy</span>
            <span className="text-gray-200 font-light">{variant?.caption || 'Entwurf...'}</span>
          </p>
          
          <div className="mt-2 flex flex-wrap gap-1">
            {variant?.hashtags?.map((h, i) => (
              <span key={i} className="text-[10px] text-blue-400 font-mono">
                {h}
              </span>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
