import React, { useState, useEffect } from 'react';
import BroyLogo from './BroyLogo';
import { Heart, MessageCircle, Send, Bookmark, Music, Volume2, VolumeX, Play, Pause } from 'lucide-react';

export default function InstagramSimulator({ post, variant, watermarkColor = 'white', watermarkOpacity = 0.55 }) {
  const [currentSlideIdx, setCurrentSlideIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [textPhase, setTextPhase] = useState(0);

  const assetList = post?.assetList && post.assetList.length > 0
    ? post.assetList
    : [{ id: '1', url: post?.mediaUrl || '', type: 'image' }];

  const currentAsset = assetList[currentSlideIdx % assetList.length];

  const transitionEffect = variant?.transitionEffect || 'zoom_pan';
  const overlayText = variant?.overlayText || post?.title || 'SUSAN BROY';
  const textColor = variant?.textColor || 'black'; // 'black' for white space, 'white' for dark space
  const overlayPosition = variant?.overlayPosition || 'top_angled'; // 'top_angled', 'side_vertical', 'top_left', 'top_right'
  const rotationAngle = variant?.rotationAngle || (overlayPosition === 'top_angled' ? '-8deg' : overlayPosition === 'side_vertical' ? '90deg' : '0deg');

  // Text Lines Split for Kinetic Animation Phases
  const textLines = overlayText.split('\n').filter(Boolean);

  // Kinetic Text Animation Phase Loop
  useEffect(() => {
    if (!isPlaying) return;

    const textInterval = setInterval(() => {
      setTextPhase(prev => (prev + 1) % Math.max(1, textLines.length));
    }, 2400);

    return () => clearInterval(textInterval);
  }, [isPlaying, textLines.length]);

  // Reel Slide Auto-Advance Loop
  useEffect(() => {
    if (!isPlaying || assetList.length <= 1) return;

    const slideTimer = setInterval(() => {
      setCurrentSlideIdx(prev => (prev + 1) % assetList.length);
    }, 4500);

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
              <span className="text-[9px] text-gray-400">Atelier Gauting • Pure Video Reel</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-[8px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
              REEL VIDEO
            </span>
          </div>
        </div>

        {/* Video Reel Player Canvas - Pure Video without Carousel Arrows */}
        <div className="relative flex-1 bg-zinc-950 overflow-hidden flex items-center justify-center group">
          
          {/* Active Asset Image with Continuous Dynamic Motion */}
          <div className="relative w-full h-full overflow-hidden">
            <img
              src={currentAsset.url}
              alt="Reel Active Media"
              className={`w-full h-full object-cover transition-transform duration-[4500ms] ease-out ${
                isPlaying && transitionEffect === 'zoom_pan'
                  ? 'scale-125 translate-x-2 -translate-y-2'
                  : isPlaying && transitionEffect === 'light_fade'
                  ? 'scale-110 rotate-1'
                  : 'scale-105'
              }`}
            />
            
            {/* Dynamic Studio Lighting Animation */}
            {isPlaying && (
              <div className="absolute inset-0 bg-gradient-to-tr from-black/50 via-transparent to-white/20 animate-pulse duration-[2800ms] pointer-events-none" />
            )}

            {/* Subtle Vignette Overlay for Depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

            {/* ========================================================================= */}
            {/* SUBTLE MONOCHROME TRANSPARENT WATERMARK LOGO */}
            {/* ========================================================================= */}
            <div className="absolute top-4 right-4 z-20 pointer-events-none" style={{ opacity: watermarkOpacity }}>
              <BroyLogo size={30} color={watermarkColor === 'black' ? '#000000' : '#FFFFFF'} />
            </div>

            {/* ========================================================================= */}
            {/* NEGATIVE SPACE KINETIC TYPOGRAPHY (Placed in White/Empty Space - NOT over artwork) */}
            {/* Supports Angled (-8° Tilt), Vertical (90° Side), and Corner Placements */}
            {/* ========================================================================= */}

            {textLines.length > 0 && (
              <div 
                className={`absolute inset-x-4 pointer-events-none z-30 transition-all duration-500 ${
                  overlayPosition === 'side_vertical'
                    ? 'top-20 left-2 right-auto origin-top-left'
                    : overlayPosition === 'top_right'
                    ? 'top-8 right-4 left-auto text-right'
                    : overlayPosition === 'top_left'
                    ? 'top-8 left-4 text-left'
                    : 'top-10 inset-x-4 text-center' // top_angled default
                }`}
                style={{
                  transform: rotationAngle !== '0deg' ? `rotate(${rotationAngle})` : 'none'
                }}
              >
                {textLines.map((line, idx) => {
                  const isActive = idx === (textPhase % textLines.length);

                  return (
                    <div
                      key={idx}
                      className={`transition-all duration-700 transform ${
                        isActive
                          ? 'opacity-100 scale-100 translate-y-0 filter drop-shadow-md'
                          : 'opacity-0 scale-95 -translate-y-2 pointer-events-none absolute'
                      }`}
                    >
                      <h2 
                        style={{ color: textColor === 'black' ? '#000000' : '#FFFFFF' }}
                        className={`font-heading font-black uppercase tracking-widest leading-tight ${
                          line.length < 18 ? 'text-lg sm:text-xl' : 'text-xs sm:text-sm'
                        } ${
                          textColor === 'black'
                            ? 'drop-shadow-[0_1px_4px_rgba(255,255,255,0.9)]'
                            : 'drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]'
                        }`}
                      >
                        {line}
                      </h2>
                    </div>
                  );
                })}
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

            {/* Reel Video Progress Line (Single Line for Video) */}
            <div className="absolute top-2 inset-x-3 h-1 bg-white/30 rounded-full overflow-hidden z-30">
              <div 
                className={`h-full bg-white transition-all duration-300 ${
                  isPlaying ? 'w-full transition-all duration-[4500ms] ease-linear' : 'w-full'
                }`}
              />
            </div>

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
