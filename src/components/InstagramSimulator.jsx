import React, { useState } from 'react';
import BroyLogo from './BroyLogo';
import { Heart, MessageCircle, Send, Bookmark, Music, Volume2, Sparkles, CheckCircle2, Copy } from 'lucide-react';

export default function InstagramSimulator({ post, variant, onApprove }) {
  const [isPlayingAudio, setIsPlayingAudio] = useState(true);
  const [isCopied, setIsCopied] = useState(false);

  if (!post || !variant) return null;

  const handleCopyCaption = () => {
    const fullText = `${variant.caption}\n\n${variant.hashtags.join(' ')}`;
    navigator.clipboard.writeText(fullText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const isStoryOrReel = post.type === 'reel' || variant.layout === 'fullscreen_clean';

  return (
    <div className="flex flex-col items-center gap-6">
      
      {/* Smartphone Container Frame */}
      <div className="phone-frame shadow-2xl relative">
        <div className="phone-notch"></div>

        {/* Story / Reel Fullscreen Mode */}
        {isStoryOrReel ? (
          <div className="relative w-full h-full bg-black overflow-hidden flex flex-col justify-between p-4 pt-8">
            
            {/* Background Animated Artwork */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              <img 
                src={post.mediaUrl} 
                alt="Story Artwork" 
                className="w-full h-full object-cover anim-pan-zoom" 
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90 pointer-events-none" />
              <div className="absolute inset-0 bg-black/10 anim-shadow-sweep pointer-events-none" />
            </div>

            {/* Top Story Header & BROY Watermark */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-2.5 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                <div className="w-7 h-7 rounded-full bg-zinc-900 border border-white/20 overflow-hidden flex items-center justify-center p-1">
                  <BroyLogo size={20} color="#FFFFFF" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-white tracking-wide">syken_broy</span>
                  <span className="text-[9px] text-gray-300">Susan Broy · Original</span>
                </div>
              </div>

              {/* BROY Logo Watermark Overlay */}
              <div className="bg-black/60 backdrop-blur-md p-2 rounded-xl border border-white/15">
                <BroyLogo size={28} color={post.accentColor || '#FFFFFF'} />
              </div>
            </div>

            {/* Middle Audio Vibe Pill */}
            <div className="relative z-10 self-center bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15 flex items-center gap-2">
              <Music className={`w-3.5 h-3.5 ${isPlayingAudio ? 'text-yellow-400 animate-spin' : 'text-gray-400'}`} />
              <span className="text-[10px] text-gray-200 font-mono tracking-tight">{variant.audio}</span>
            </div>

            {/* Bottom Caption & Action Overlays */}
            <div className="relative z-10 flex flex-col gap-3">
              <div className="bg-black/70 backdrop-blur-lg p-3.5 rounded-2xl border border-white/15">
                <p className="text-xs text-white whitespace-pre-line leading-relaxed font-sans font-light">
                  {variant.caption.slice(0, 140)}...
                </p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {variant.hashtags.slice(0, 3).map((tag, idx) => (
                    <span key={idx} className="text-[10px] text-yellow-400 font-mono">{tag}</span>
                  ))}
                </div>
              </div>

              {/* Story Interaction Icons */}
              <div className="flex items-center justify-between text-white px-2">
                <div className="flex items-center gap-4">
                  <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                  <MessageCircle className="w-5 h-5 text-gray-200" />
                  <Send className="w-5 h-5 text-gray-200" />
                </div>
                <Bookmark className="w-5 h-5 text-gray-200" />
              </div>
            </div>

          </div>
        ) : (
          
          /* Feed Post 4:5 Passepartout Mode */
          <div className="relative w-full h-full bg-zinc-950 flex flex-col justify-between pt-8 pb-4">
            
            {/* Header */}
            <div className="px-4 py-2 flex items-center justify-between border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center p-1">
                  <BroyLogo size={18} color="#FFFFFF" />
                </div>
                <span className="text-xs font-bold text-white">syken_broy</span>
              </div>
              <BroyLogo size={22} color={post.accentColor || '#FFFFFF'} />
            </div>

            {/* Feed Image Container with Passepartout Frame */}
            <div className="relative w-full aspect-square bg-zinc-900 p-4 flex items-center justify-center border-y border-zinc-800 overflow-hidden">
              <div className="relative w-full h-full border border-zinc-700 rounded-lg overflow-hidden bg-black">
                <img 
                  src={post.mediaUrl} 
                  alt="Feed Post" 
                  className="w-full h-full object-cover anim-pan-zoom"
                />
                <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-[9px] font-mono text-yellow-400 border border-zinc-700">
                  BROY STUDIO
                </div>
              </div>
            </div>

            {/* Actions & Caption Area */}
            <div className="px-4 flex flex-col gap-2 overflow-y-auto">
              <div className="flex items-center justify-between text-white py-1">
                <div className="flex items-center gap-3">
                  <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                  <MessageCircle className="w-5 h-5 text-gray-300" />
                  <Send className="w-5 h-5 text-gray-300" />
                </div>
                <Bookmark className="w-5 h-5 text-gray-300" />
              </div>

              <div className="text-[11px] text-gray-300">
                <span className="font-bold text-white mr-1.5">syken_broy</span>
                <span className="whitespace-pre-line leading-normal">{variant.caption}</span>
              </div>

              <div className="flex flex-wrap gap-1 mt-1">
                {variant.hashtags.map((tag, idx) => (
                  <span key={idx} className="text-[10px] text-blue-400 font-mono">{tag}</span>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>

      {/* Simulator Quick Action Toolbar */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleCopyCaption}
          className="btn-secondary py-2 px-3 text-xs"
        >
          {isCopied ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-400">Text kopiert!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 text-gray-400" />
              <span>Caption & Hashtags kopieren</span>
            </>
          )}
        </button>

        {onApprove && (
          <button
            onClick={() => onApprove(variant)}
            className="btn-accent py-2 px-4 text-xs font-bold"
          >
            <CheckCircle2 className="w-4 h-4 text-black" />
            <span>Diese Variante freigeben</span>
          </button>
        )}
      </div>

    </div>
  );
}
