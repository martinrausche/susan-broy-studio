import React, { useState, useEffect } from 'react';
import BroyLogo from './BroyLogo';
import { Heart, MessageCircle, Send, Bookmark, Music, Volume2, VolumeX, Play, Pause, ChevronLeft, ChevronRight, Sparkles, Sliders } from 'lucide-react';

export default function InstagramSimulator({ post, variant, watermarkColor = 'white', watermarkOpacity = 0.55 }) {
  const [currentSlideIdx, setCurrentSlideIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [transitionProgress, setTransitionProgress] = useState(0);

  const assetList = post?.assetList && post.assetList.length > 0
    ? post.assetList
    : [{ id: '1', url: post?.mediaUrl || '', type: 'image' }];

  const currentAsset = assetList[currentSlideIdx % assetList.length];
  const nextAsset = assetList[(currentSlideIdx + 1) % assetList.length];

  const transitionEffect = variant?.transitionEffect || 'zoom_pan';
  const overlayPosition = variant?.overlayPosition || 'bottom_bar';
  const overlayText = variant?.overlayText || '';

  // Reel Motion Loop with Smooth Transitions
  useEffect(() => {
    if (!isPlaying || assetList.length <= 1) return;

    const slideTimer = setInterval(() => {
      // Trigger transition animation
      setTransitionProgress(1);
      setTimeout(() => {
        setCurrentSlideIdx(prev => (prev + 1) % assetList.length);
        setTransitionProgress(0);
      }, 600); // 600ms transition fade/slide
    }, 3800);

    return () => clearInterval(slideTimer);
  }, [isPlaying, assetList.length]);

  return (
    <div className="flex flex-col items-center gap-4 my-2 w-full max-w-[360px]">
      
      {/* Smartphone Container Frame */}
      <div className="phone-frame shadow-2xl w-full">
        <div className="phone-notch" />

        {/* Instagram Reel Top Status Bar */}
        <div className="pt-7 pb-2 px-4 flex items-center justify-between bg-black/90 text-white z-10 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-zinc-800 p-1 flex items-center justify-center border border-white/20">
              <BroyLogo size={12} color="#FFFFFF" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-white block leading-none">syken_broy</span>
              <span className="text-[9px] text-gray-400">Atelier Gauting • Original Reel</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="bg-white/15 text-white text-[9px] font-mono px-2 py-0.5 rounded-full uppercase tracking-wider">
              {transitionEffect === 'zoom_pan' ? 'ZOOM & SCHWENK' : transitionEffect === 'light_fade' ? 'CROSSFADE' : 'SLIDE'}
            </span>
          </div>
        </div>

        {/* Video Reel Player Canvas */}
        <div className="relative flex-1 bg-black overflow-hidden flex items-center justify-center group">
          
          {/* Active Asset Image with Ken-Burns Motion Animation */}
          <div className="relative w-full h-full overflow-hidden">
            <img
              src={currentAsset.url}
              alt="Reel Active Media"
              className={`w-full h-full object-cover transition-all duration-[3800ms] ease-linear ${
                isPlaying && transitionEffect === 'zoom_pan'
                  ? 'scale-115 translate-x-2 translate-y-1'
                  : isPlaying && transitionEffect === 'light_fade'
                  ? 'scale-105 filter brightness-105'
                  : 'scale-100'
              } ${
                transitionProgress > 0 && transitionEffect === 'light_fade'
                  ? 'opacity-30 blur-sm transition-opacity duration-500'
                  : transitionProgress > 0 && transitionEffect === 'slide_push'
                  ? '-translate-x-full transition-transform duration-500'
                  : 'opacity-100 translate-x-0'
              }`}
            />
            
            {/* Transition Overlay (Next Slide Incoming) */}
            {transitionProgress > 0 && assetList.length > 1 && (
              <img
                src={nextAsset.url}
                alt="Reel Incoming Media"
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${
                  transitionEffect === 'slide_push'
                    ? 'translate-x-0'
                    : 'opacity-100'
                }`}
              />
            )}

            {/* Dark Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

            {/* ========================================================================= */}
            {/* SUBTLE TRANSPARENT WATERMARK LOGO (Pure Monochrome - No colorful BROY text) */}
            {/* ========================================================================= */}
            <div className="absolute top-4 right-4 z-20 pointer-events-none transition-opacity duration-300" style={{ opacity: watermarkOpacity }}>
              <BroyLogo size={32} color={watermarkColor === 'black' ? '#000000' : '#FFFFFF'} />
            </div>

            {/* ========================================================================= */}
            {/* IN-VIDEO TEXT OVERLAYS (Positioned cleanly without obscuring artwork) */}
            {/* ========================================================================= */}
            {overlayPosition === 'bottom_bar' && overlayText && (
              /* Style A: Subtle Dark Banner at the Bottom */
              <div className="absolute bottom-16 inset-x-3 bg-black/75 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-white/15 text-white z-30 shadow-lg">
                <pre className="whitespace-pre-wrap font-sans text-[11px] font-medium leading-relaxed tracking-wide text-gray-100">
                  {overlayText}
                </pre>
              </div>
            )}

            {overlayPosition === 'top_left' && overlayText && (
              /* Style B: Top-Left Minimalist Header */
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-2 rounded-lg border border-white/15 text-white z-30">
                <pre className="whitespace-pre-wrap font-heading text-[10px] font-bold tracking-widest text-white uppercase">
                  {overlayText}
                </pre>
              </div>
            )}

            {/* Play/Pause Motion Controls */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity z-20"
            >
              <div className="p-3 bg-black/70 rounded-full text-white backdrop-blur-md border border-white/20">
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
              </div>
            </button>

            {/* Reel Progress Line */}
            <div className="absolute top-2 inset-x-3 flex gap-1 z-30">
              {assetList.map((_, idx) => (
                <div key={idx} className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-white transition-all duration-300 ${
                      currentSlideIdx === idx ? (isPlaying ? 'w-full transition-all duration-[3800ms] ease-linear' : 'w-full') : (currentSlideIdx > idx ? 'w-full' : 'w-0')
                    }`}
                  />
                </div>
              ))}
            </div>

            {/* Multi-Slide Navigation */}
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

            {/* Music Bar */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-[10px] z-30">
              <div className="flex items-center gap-2 bg-black/75 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 max-w-[80%] truncate">
                <Music className={`w-3.5 h-3.5 text-white ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '3s' }} />
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

        {/* Caption Box Below Video */}
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
