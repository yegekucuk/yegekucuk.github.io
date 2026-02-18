import { useState, useEffect } from 'react';

interface TaskbarProps {
  onStartClick?: () => void;
  activeWindow?: string;
  isMinimized?: boolean;
  onTaskClick?: () => void;
}

export function Taskbar({ 
  onStartClick, 
  activeWindow, 
  isMinimized = false,
  onTaskClick 
}: TaskbarProps) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 h-[28px] bg-[#c0c0c0] border-t border-[#ffffff] flex items-center px-1 z-50 select-none pt-0.5">
      {/* Start Button */}
      <button
        onClick={onStartClick}
        className="
          flex items-center justify-center gap-1 px-1 py-0.5 mr-1
          win95-btn
          active:box-shadow-inverse
        "
        style={{ height: '22px' }}
      >
        <div className="flex items-center justify-center">
            {/* Simple Windows Flag representation */}
            <div className="grid grid-cols-2 gap-px w-3 h-3">
                <div className="bg-[#e65f25] w-full h-full"></div>
                <div className="bg-[#48b23c] w-full h-full"></div>
                <div className="bg-[#1c92d5] w-full h-full"></div>
                <div className="bg-[#e5c332] w-full h-full"></div>
            </div>
        </div>
        <span className="font-bold text-black text-xs tracking-wide relative top-px">Start</span>
      </button>

      {/* Divider */}
      <div className="w-[2px] h-[20px] border-l border-[#808080] border-r mx-1"></div>

      {/* Active Tasks */}
      <div className="flex-1 flex gap-1 px-0 overflow-hidden">
        {activeWindow && (
          <button 
            onClick={onTaskClick}
            className={`
              flex items-center gap-2 px-2 h-[22px] w-[160px]
              bg-[#c0c0c0] 
              ${isMinimized ? 'win95-border-outset' : 'win95-border-inset'}
              cursor-default
            `}
          >
            {/* Icon */}
            <span className="text-xs">💻</span>
            <span className="truncate text-xs font-bold">{activeWindow}</span>
          </button>
        )}
      </div>

      {/* System Tray */}
      <div className="
        flex items-center px-2 py-0 h-[22px] ml-1
        win95-border-inset
        bg-[#c0c0c0]
        text-xs
      ">
        <span className="mr-2 text-xs">🔈</span>
        <span>{formatTime(time)}</span>
      </div>
    </div>
  );
}
