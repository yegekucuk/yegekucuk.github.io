"use client";

import { useState } from 'react';
import Image from 'next/image';

interface DesktopIconProps {
  label: string;
  iconSrc?: string;
  onClick: () => void;
  onDoubleClick?: () => void;
  isActive?: boolean;
}

export function DesktopIcon({ label, iconSrc, onClick, onDoubleClick, isActive }: DesktopIconProps) {
  const [lastTapTime, setLastTapTime] = useState(0);

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.stopPropagation();
    
    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTapTime;
    
    if (tapLength < 300 && tapLength > 0) {
      onDoubleClick?.();
      e.preventDefault();
    } else {
      onClick();
    }
    
    setLastTapTime(currentTime);
  };

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onDoubleClick={(e) => {
        e.stopPropagation();
        onDoubleClick?.();
      }}
      onTouchEnd={handleTouchEnd}
      className={`
        flex flex-col items-center justify-center w-20 p-px cursor-pointer gap-1 select-none
        ${isActive ? 'bg-transparent' : ''}
      `}
    >
      <div className={`w-8 h-8 mb-1 flex items-center justify-center ${isActive ? 'brightness-75 icon-blue-overlay' : ''}`}>
        {iconSrc ? (
            <Image src={iconSrc} alt={label} width={32} height={32} className="w-full h-full object-contain pointer-events-none" />
        ) : (
            <div className="text-3xl">📁</div>
        )}
      </div>
      <span className={`
        text-xs font-normal px-1 text-center select-none truncate w-full
        ${isActive 
          ? 'bg-[#000080] text-white' 
          : 'text-white'}
      `}
      style={{
         textShadow: isActive ? 'none' : '1px 1px 0px black'
      }}
      >
        {label}
      </span>
    </div>
  );
}
