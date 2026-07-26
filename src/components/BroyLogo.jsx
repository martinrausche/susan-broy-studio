import React from 'react';

export default function BroyLogo({ size = 48, className = '', color = 'currentColor', showStudioText = false }) {
  return (
    <div className={`inline-flex flex-col items-center gap-1 ${className}`}>
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 200 200" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform duration-300 hover:scale-105"
      >
        {/* Outer Square Brackets Frame (BROY Geometric Logo) */}
        {/* Top-Left Bracket */}
        <path d="M 95,20 L 20,20 L 20,180 L 95,180" stroke={color} strokeWidth="12" strokeLinecap="square" strokeLinejoin="miter"/>
        {/* Top-Right Bracket */}
        <path d="M 105,20 L 180,20 L 180,180 L 105,180" stroke={color} strokeWidth="12" strokeLinecap="square" strokeLinejoin="miter"/>
        
        {/* Inner vertical accents forming frame gap */}
        <line x1="100" y1="20" x2="100" y2="60" stroke={color} strokeWidth="12"/>
        <line x1="100" y1="140" x2="100" y2="180" stroke={color} strokeWidth="12"/>

        {/* Central Bold Typography BROY */}
        <text 
          x="100" 
          y="118" 
          fill={color} 
          fontSize="48" 
          fontWeight="900" 
          fontFamily="Montserrat, sans-serif" 
          textAnchor="middle"
          letterSpacing="2"
        >
          BROY
        </text>
      </svg>
      {showStudioText && (
        <span 
          style={{ fontSize: Math.max(9, size * 0.18), letterSpacing: '0.25em' }}
          className="text-xs uppercase tracking-widest text-gray-400 font-light"
        >
          contemporary studio
        </span>
      )}
    </div>
  );
}
