import React, { useState, useEffect } from 'react';
import BroyLogo from './BroyLogo';
import { Heart, MessageCircle, Send, Bookmark, Music, Volume2, VolumeX, Play, Pause, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

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
    }, 3200); // 3.2 seconds per shot

    return () => clearInterval(interval);
  }, [isPlaying, assetList.length]);

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
              <span className="text-[9px] text-gray-400">Atelier Gauting • Original Reel</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
              REEL VORVIEW
            </span>
          </div>
        </div>

        {/* Video Reel Player Canvas with Animated Motion */}
        <div className="relative flex-1 bg-black overflow-hidden flex items-center justify-center group">
          
          {/* Animated Video Motion Background (Ken Burns Pan/Zoom + Light Sweep) */}
          <div className="relative w-full h-full overflow-hidden">
            <img
              src={currentAsset.url}
              alt="Reel Asset"
              className={`w-full h-full object-cover transition-transform duration-[3500ms] ease-linear ${
                isPlaying ? 'scale-110 translate-x-1 translate-y-1' : 'scale-100'
              }`}
            />
            
            {/* Cinematic Light Sweep Overlay (Simulating Studio Lighting Motion) */}
            {isPlaying && (
              <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-transparent to-white/15 animate-pulse duration-[3000ms] pointer-events-none" />
            )}

            {/* Dark Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/30 pointer-events-none" />

            {/* BROY Watermark */}
            <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/20 flex items-center gap-1.5 z-20">
              <BroyLogo size={12} variant="instagram" />
              <span className="text-[9px] font-mono text-white font-bold tracking-widest uppercase">BROY</span>
            </div>

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
                      currentSlideIdx === idx ? (isPlaying ? 'w-full transition-all duration-[3200ms] ease-linear' : 'w-full') : (currentSlideIdx > idx ? 'w-full' : 'w-0')
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
            <div className="absolute bottom-16 left-3 right-3 flex items-center justify-between text-white text-[10px] z-30">
              <div className="flex items-center gap-2 bg-black/75 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 max-w-[80%] truncate">
                <Music className={`w-3.5 h-3.5 text-pink-400 ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '3s' }} />
                <span className="truncate font-medium">{variant?.audio || 'Minimal Ambient Art Sound'}</span>
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

        {/* Action Controls */}
        <div className="px-4 py-2 bg-black text-white flex items-center justify-between border-t border-white/10">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsLiked(!isLiked)} className="transition-transform active:scale-125">
              <Heart className={`w-5 h-5 ${isLiked ? 'text-red-500 fill-red-500' : 'text-white'}`} />
            </button>
            <MessageCircle className="w-5 h-5 text-white" />
            <Send className="w-5 h-5 text-white" />
          </div>
          <Bookmark className="w-5 h-5 text-white" />
        </div>

        {/* Caption & Hashtags Section */}
        <div className="px-4 pb-4 pt-1 bg-black text-white text-xs overflow-y-auto max-h-[140px] border-t border-white/5">
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
