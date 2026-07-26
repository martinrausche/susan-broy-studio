import React, { useState, useEffect } from 'react';
import BroyLogo from './BroyLogo';
import { Heart, MessageCircle, Send, Bookmark, Music, Volume2, Sparkles, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';

export default function InstagramSimulator({ post, variant, onApprove }) {
  const [currentSlideIdx, setCurrentSlideIdx] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isPlayingMotion, setIsPlayingMotion] = useState(true);

  // If variant has multiple asset slides
  const assetList = post?.assetList && post.assetList.length > 0
    ? post.assetList
    : [{ id: '1', url: post?.mediaUrl || '', type: 'image' }];

  const currentAsset = assetList[currentSlideIdx % assetList.length];

  return (
    <div className="flex flex-col items-center gap-4 my-2">
      
      {/* Phone Mockup Frame */}
      <div className="phone-frame shadow-2xl">
        <div className="phone-notch" />

        {/* Top Header Bar */}
        <div className="pt-7 pb-2 px-4 flex items-center justify-between bg-black/90 text-white z-10 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-zinc-800 p-1 flex items-center justify-center border border-white/20">
              <BroyLogo size={14} color="#FFFFFF" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-white block leading-none">syken_broy</span>
              <span className="text-[9px] text-gray-400">Atelier Gauting • Original</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="badge badge-accent text-[9px] py-0.5 px-2">
              {variant?.name ? variant.name.split(' ')[0] : 'Entwurf'}
            </span>
          </div>
        </div>

        {/* Media Player / Viewer */}
        <div className="relative flex-1 bg-zinc-950 overflow-hidden flex items-center justify-center group">
          
          {/* Main Visual Content */}
          <div className="relative w-full h-full">
            <img
              src={currentAsset.url}
              alt="Instagram Media"
              className={`w-full h-full object-cover transition-transform duration-[4000ms] ease-out ${
                isPlayingMotion ? 'scale-105 translate-y-1' : 'scale-100'
              }`}
            />
            
            {/* Dark Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-black/25 pointer-events-none" />

            {/* BROY Atelier Watermark Branding */}
            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/15 flex items-center gap-1.5">
              <BroyLogo size={12} color="#FFFFFF" />
              <span className="text-[9px] font-mono text-gray-300 font-bold tracking-widest uppercase">BROY</span>
            </div>

            {/* Multi-Slide Navigation Arrows if > 1 asset */}
            {assetList.length > 1 && (
              <>
                <button
                  onClick={() => setCurrentSlideIdx(prev => (prev > 0 ? prev - 1 : assetList.length - 1))}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black text-white p-1.5 rounded-full border border-white/20 backdrop-blur-md"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setCurrentSlideIdx(prev => (prev + 1) % assetList.length)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black text-white p-1.5 rounded-full border border-white/20 backdrop-blur-md"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

                {/* Dots indicator */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-black/50 px-2 py-1 rounded-full backdrop-blur-md">
                  {assetList.map((_, idx) => (
                    <div
                      key={idx}
                      className={`w-1.5 h-1.5 rounded-full transition-all ${
                        currentSlideIdx === idx ? 'bg-yellow-400 w-3' : 'bg-white/40'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}

            {/* Audio Vibe Pill Overlay */}
            <div className="absolute bottom-16 left-3 right-3 flex items-center justify-between text-white text-[10px]">
              <div className="flex items-center gap-1.5 bg-black/65 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15 max-w-[80%] truncate">
                <Music className="w-3 h-3 text-yellow-400 animate-spin" style={{ animationDuration: '4s' }} />
                <span className="truncate">{variant?.audio || 'Minimal Ambient Art Sound'}</span>
              </div>
              <div className="p-1.5 bg-black/65 backdrop-blur-md rounded-full border border-white/15">
                <Volume2 className="w-3 h-3 text-white" />
              </div>
            </div>
          </div>

        </div>

        {/* Action Bar (Like, Comment, Share, Save) */}
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

      {/* Quick Approve Button Below Phone */}
      <button
        onClick={onApprove}
        className="btn-accent text-xs py-2.5 px-5 rounded-xl font-bold flex items-center gap-2 shadow-lg hover:scale-105 transition-transform"
      >
        <CheckCircle2 className="w-4 h-4" />
        <span>Entwurf freigeben</span>
      </button>

    </div>
  );
}
