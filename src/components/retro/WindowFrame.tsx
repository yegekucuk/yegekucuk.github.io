import type { ReactNode } from 'react';
import type { ResizeDirection } from '../../hooks/useResizable';

interface WindowFrameProps {
  title: string;
  children: ReactNode;
  isActive?: boolean;
  onClose?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  onTitleMouseDown?: (e: React.MouseEvent) => void;
  onResizeMouseDown?: (e: React.MouseEvent, direction: ResizeDirection) => void;
  style?: React.CSSProperties;
}

export function WindowFrame({ 
  title, 
  children, 
  isActive = true,
  onClose,
  onMinimize,
  onMaximize,
  onTitleMouseDown,
  onResizeMouseDown,
  style
}: WindowFrameProps) {
  return (
    <div 
      className="flex flex-col h-full w-full bg-[#c0c0c0] shadow-md relative p-1"
      style={style}
    >
      {/* Outer sizing/padding wrapper to create the double border effect */}
      <div className="absolute inset-px pointer-events-none border-t border-l border-[#ffffff] border-b border-r"></div>
      <div className="absolute inset-0 pointer-events-none border-t border-l border-[#dfdfdf] border-b border-r"></div>

      {/* Main Container Content - adjusts for the borders */}
      <div className="flex flex-col h-full w-full relative z-10">
      
        {/* Title Bar */}
        <div 
          className={`
            flex items-center justify-between px-1 py-0.5 m-0.5
            ${isActive ? 'bg-[#000080]' : 'bg-[#808080]'}
            cursor-default
          `}
          onMouseDown={onTitleMouseDown}
        >
          <div className="flex items-center gap-1">
            {/* Icon placeholder */}
            <div className="w-4 h-4 text-xs flex items-center justify-center">💻</div>
            <span className="text-white font-bold text-sm truncate select-none font-sans">
              {title}
            </span>
          </div>
          
          <div className="flex gap-0.5">
             {/* Minimize */}
            <button 
              onClick={onMinimize}
              className="w-4 h-4 bg-[#c0c0c0] flex items-center justify-center win95-btn active:ml-px active:mt-px"
            >
              <div className="w-2 h-0.5 bg-black translate-y-1"></div>
            </button>
            {/* Maximize */}
            <button 
              onClick={onMaximize}
              className="w-4 h-4 bg-[#c0c0c0] flex items-center justify-center win95-btn active:ml-px active:mt-px"
            >
              <div className="w-2 h-2 border border-black border-t-2"></div>
            </button>
            {/* Close */}
            <button 
              onClick={onClose}
              className="w-4 h-4 bg-[#c0c0c0] flex items-center justify-center win95-btn ml-0.5 active:ml-px active:mt-px"
            >
              <span className="text-black text-[10px] leading-none font-bold -mt-0.5">✕</span>
            </button>
          </div>
        </div>

        {/* Menu Bar */}
        <div className="flex px-1 py-0.5 gap-3 text-sm">
          <span className="cursor-pointer hover:bg-[#000080] hover:text-white px-1">File</span>
          <span className="cursor-pointer hover:bg-[#000080] hover:text-white px-1">Edit</span>
          <span className="cursor-pointer hover:bg-[#000080] hover:text-white px-1">View</span>
          <span className="cursor-pointer hover:bg-[#000080] hover:text-white px-1">Help</span>
        </div>

         {/* Content Area */}
        <div className="flex-1 overflow-auto p-4 bg-white m-0.5 win95-border-inset">
          {children}
        </div>

        {/* Resize Handles - Positioned over the border area (negative margins) to avoid blocking content/scrollbars */}
        {onResizeMouseDown && (
          <>
            {/* Corners */}
            <div className="absolute -top-1 -left-1 w-3 h-3 cursor-nw-resize z-20" onMouseDown={(e) => onResizeMouseDown(e, 'nw')} />
            <div className="absolute -top-1 -right-1 w-3 h-3 cursor-ne-resize z-20" onMouseDown={(e) => onResizeMouseDown(e, 'ne')} />
            <div className="absolute -bottom-1 -left-1 w-3 h-3 cursor-sw-resize z-20" onMouseDown={(e) => onResizeMouseDown(e, 'sw')} />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 cursor-se-resize z-20" onMouseDown={(e) => onResizeMouseDown(e, 'se')} />

            {/* Edges */}
            <div className="absolute -top-1 left-2 right-2 h-2 cursor-n-resize z-20" onMouseDown={(e) => onResizeMouseDown(e, 'n')} />
            <div className="absolute -bottom-1 left-2 right-2 h-2 cursor-s-resize z-20" onMouseDown={(e) => onResizeMouseDown(e, 's')} />
            <div className="absolute -left-1 top-2 bottom-2 w-2 cursor-w-resize z-20" onMouseDown={(e) => onResizeMouseDown(e, 'w')} />
            <div className="absolute -right-1 top-2 bottom-2 w-2 cursor-e-resize z-20" onMouseDown={(e) => onResizeMouseDown(e, 'e')} />
          </>
        )}
      </div>
    </div>
  );
}
