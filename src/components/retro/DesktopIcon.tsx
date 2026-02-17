interface DesktopIconProps {
  label: string;
  iconSrc?: string; // Changed from icon node to source string
  onClick: () => void;
  isActive?: boolean;
}

export function DesktopIcon({ label, iconSrc, onClick, isActive }: DesktopIconProps) {
  return (
    <div
      onClick={onClick}
      className={`
        flex flex-col items-center justify-center w-20 p-px cursor-pointer gap-1
        ${isActive ? 'bg-transparent' : ''}
      `}
    >
      <div className={`w-8 h-8 mb-1 flex items-center justify-center ${isActive ? 'brightness-75 icon-blue-overlay' : ''}`}>
        {iconSrc ? (
            <img src={iconSrc} alt={label} className="w-full h-full object-contain pointer-events-none" />
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
         // Win95 text shadow for desktop icons
         textShadow: isActive ? 'none' : '1px 1px 0px black'
      }}
      >
        {label}
      </span>
    </div>
  );
}
