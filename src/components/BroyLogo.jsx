import React from 'react';

export default function BroyLogo({ size = 48, className = '', color = 'currentColor', opacity = 1 }) {
  return (
    <div className={`inline-flex flex-col items-center gap-1 ${className}`} style={{ opacity }}>
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 200 200" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Susan Broy Official Logo: Interlocking rotational symmetry frame */}
        <path 
          d="M 90,20 L 20,20 L 20,180 L 90,180 L 90,130" 
          stroke={color} 
          strokeWidth="13" 
          strokeLinecap="square" 
          strokeLinejoin="miter"
        />
        <path 
          d="M 110,70 L 110,20 L 180,20 L 180,180 L 110,180" 
          stroke={color} 
          strokeWidth="13" 
          strokeLinecap="square" 
          strokeLinejoin="miter"
        />
        <text 
          x="100" 
          y="116" 
          fill={color} 
          fontSize="46" 
          fontWeight="900" 
          fontFamily="Montserrat, 'Inter', system-ui, sans-serif" 
          textAnchor="middle"
          letterSpacing="3"
        >
          BROY
        </text>
      </svg>
    </div>
  );
}
