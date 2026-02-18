import { useState } from "react";
import {
  HeroSection,
  AboutSection,
  WorkSection,
  EducationSection,
  SkillsSection,
  ProjectsSection,
  ContactSection,
} from "./components/sections";
import { portfolioConfig } from "./data/config";
import { DesktopIcon } from "./components/retro/DesktopIcon";
import { WindowFrame } from "./components/retro/WindowFrame";
import { Taskbar } from "./components/retro/Taskbar";
import { useDraggable } from "./hooks/useDraggable";
import { useResizable } from "./hooks/useResizable";

const WINDOW_CASCADE_OFFSET = 20;

const isMobile = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
};

function App() {
  const {
    personalInfo,
    skills,
    workExperience,
    education,
    projects,
    socials,
    contact,
  } = portfolioConfig;

  const [openWindows, setOpenWindows] = useState<string[]>([]);
  const [focusedWindow, setFocusedWindow] = useState<string | null>(null);

  const [minimizedWindows, setMinimizedWindows] = useState<string[]>([]);
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);

  const handleIconClick = (windowName: string) => {
    setSelectedIcon(windowName);
  };

  const handleIconDoubleClick = (windowName: string) => {
    if (!openWindows.includes(windowName)) {
      setOpenWindows([...openWindows, windowName]);
    }
    setFocusedWindow(windowName);
    setMinimizedWindows(minimizedWindows.filter(name => name !== windowName));
    setSelectedIcon(windowName); // Also select the icon
  };

  const handleDesktopClick = () => {
    setSelectedIcon(null);
  };

  const handleCloseWindow = (windowName: string) => {
      setOpenWindows(openWindows.filter(name => name !== windowName));
      if (focusedWindow === windowName) {
        setFocusedWindow(null);
      }
    };
  
    const handleMinimize = (windowName: string) => {
      setMinimizedWindows([...minimizedWindows, windowName]);
      if (focusedWindow === windowName) {
        setFocusedWindow(null);
      }
    };
  
    const handleFocus = (windowName: string) => {
      setFocusedWindow(windowName);
      setMinimizedWindows(minimizedWindows.filter(name => name !== windowName));
    };
  
    const toggleMinimize = (windowName: string) => {
      if (minimizedWindows.includes(windowName)) {
        handleFocus(windowName);
      } else if (focusedWindow === windowName) {
        handleMinimize(windowName);
      } else {
        handleFocus(windowName);
      }
    };

  const renderContent = (windowName: string | null) => {
    switch (windowName) {
      case "About":
        return (
          <div className="flex flex-col gap-8">
            <HeroSection
              greeting={personalInfo.greeting}
              tagline={personalInfo.tagline}
              avatarUrl={personalInfo.avatarUrl}
            />
            <AboutSection description={personalInfo.about} />
            <SkillsSection skills={skills} />
          </div>
        );
      case "Education":
        return <EducationSection education={education} />;
      case "Experience":
        return <WorkSection experiences={workExperience} />;
      case "Projects":
        return <ProjectsSection projects={projects} />;
      case "Contact Me":
        return (
          <div className="flex flex-col gap-8">
            <ContactSection contact={contact} />
            <div className="flex flex-col gap-4 p-4 border-2 border-gray-200">
              <h3 className="font-bold text-lg">Social Links</h3>
              <div className="flex gap-4 flex-wrap">
                {socials.map((social) => (
                  <a 
                    key={social.name} 
                    href={social.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded text-blue-600 font-medium"
                  >
                    {social.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };



  return (
    <main className="h-screen w-screen bg-[#008080] overflow-hidden flex flex-col font-sans relative">
      {/* Desktop Area */}
      <div className="flex-1 flex p-4 relative z-0" onClick={handleDesktopClick}>
        {/* Desktop Icons Column - Adjusted z-index */}
        <div className="flex flex-col gap-4 w-24 relative z-10" onClick={(e) => e.stopPropagation()}>
          <DesktopIcon 
            label="About Me" 
            iconSrc="/icons/Notes.png" 
            isActive={selectedIcon === "About"}
            onClick={() => handleIconClick("About")} 
            onDoubleClick={() => handleIconDoubleClick("About")}
          />
          <DesktopIcon 
            label="Education" 
            iconSrc="/icons/Books.png" 
            isActive={selectedIcon === "Education"}
            onClick={() => handleIconClick("Education")} 
            onDoubleClick={() => handleIconDoubleClick("Education")}
          />
          <DesktopIcon 
            label="Experience" 
            iconSrc="/icons/LinkedIn.png" 
            isActive={selectedIcon === "Experience"}
            onClick={() => handleIconClick("Experience")} 
            onDoubleClick={() => handleIconDoubleClick("Experience")}
          />
          <DesktopIcon 
            label="Projects" 
            iconSrc="/icons/DocumentsFolder.ico" 
            isActive={selectedIcon === "Projects"}
            onClick={() => handleIconClick("Projects")} 
            onDoubleClick={() => handleIconDoubleClick("Projects")}
          />
          <DesktopIcon 
            label="Contact Me" 
            iconSrc="/icons/Contacts.png" 
            isActive={selectedIcon === "Contact Me"}
            onClick={() => handleIconClick("Contact Me")} 
            onDoubleClick={() => handleIconDoubleClick("Contact Me")}
          />
        </div>

        {/* Window Area - Absolute overlay to allow floating over icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
          {openWindows.map((windowName) => (
            <WindowController
              key={windowName}
              title={windowName}
              isFocused={focusedWindow === windowName}
              isMinimized={minimizedWindows.includes(windowName)}
              onClose={() => handleCloseWindow(windowName)}
              onMinimize={() => handleMinimize(windowName)}
              onFocus={() => handleFocus(windowName)}
              initialPosition={{
                x: (isMobile() ? 0 : 100) + (openWindows.indexOf(windowName) * WINDOW_CASCADE_OFFSET),
                y: openWindows.indexOf(windowName) * WINDOW_CASCADE_OFFSET
              }}
            >
              {renderContent(windowName)}
            </WindowController>
          ))}
        </div>
      </div>

      {/* Taskbar */}
      <Taskbar 
        openWindows={openWindows}
        focusedWindow={focusedWindow}
        minimizedWindows={minimizedWindows}
        onTaskClick={toggleMinimize}
        onStartClick={() => alert("Start Menu - Coming Soon!")}
      />
    </main>
  );
}

interface WindowControllerProps {
  title: string;
  isFocused: boolean;
  isMinimized: boolean;
  onClose: () => void;
  onMinimize: () => void;
  onFocus: () => void;
  initialPosition?: { x: number; y: number };
  children: React.ReactNode;
}

function WindowController({ 
  title, 
  isFocused, 
  isMinimized, 
  onClose, 
  onMinimize, 
  onFocus, 
  initialPosition = { x: 0, y: 0 },
  children 
}: WindowControllerProps) {
  const { position, setPosition, handleMouseDown, handleTouchStart } = useDraggable(initialPosition);
  const { size, handleResizeMouseDown, handleResizeTouchStart } = useResizable({ 
    initialSize: { width: 600, height: 400 },
    minSize: { width: 200, height: 150 },
    position,
    setPosition
  });

  return (
    <div 
      className={`
        absolute top-10 left-10 pointer-events-auto
        ${isMinimized ? 'hidden' : 'block'}
      `}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        width: `${size.width}px`,
        height: `${size.height}px`,
        zIndex: isFocused ? 50 : 40,
      }}
      onMouseDown={onFocus}
    >
      <WindowFrame 
        title={title} 
        isActive={isFocused}
        onClose={onClose}
        onMinimize={onMinimize} 
        onMaximize={() => {}} 
        onTitleMouseDown={handleMouseDown}
        onTitleTouchStart={handleTouchStart}
        onResizeMouseDown={handleResizeMouseDown}
        onResizeTouchStart={handleResizeTouchStart}
      >
        <div className="h-full">
          {children}
        </div>
      </WindowFrame>
    </div>
  );
}

export default App;
