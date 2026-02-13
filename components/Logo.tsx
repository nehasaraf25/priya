
import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

const Logo: React.FC<LogoProps> = ({ className = "", size = 40 }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform duration-500 hover:rotate-45"
      >
        {/* Diamond Prism Base */}
        <path d="M50 10L85 50L50 90L15 50L50 10Z" stroke="currentColor" strokeWidth="2.5" />
        {/* Internal Facets */}
        <path d="M15 50H85" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" />
        <path d="M50 10V90" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" />
        {/* Central Core */}
        <rect x="42" y="42" width="16" height="16" transform="rotate(45 50 50)" fill="currentColor" />
        {/* Sparkle Details */}
        <circle cx="50" cy="50" r="28" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />
      </svg>
      <span className="text-2xl font-black tracking-tighter luxury-font">LŪM</span>
    </div>
  );
};

export default Logo;
