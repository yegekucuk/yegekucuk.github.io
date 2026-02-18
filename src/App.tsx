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

  const [activeWindow, setActiveWindow] = useState<string | null>("About");
  const { position, handleMouseDown } = useDraggable({ x: 0, y: 0 });

  const handleIconClick = (windowName: string) => {
    setActiveWindow(windowName);
  };

  const handleCloseWindow = () => {
    setActiveWindow(null);
  };

  const renderContent = () => {
    switch (activeWindow) {
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
      <div className="flex-1 flex p-4 relative z-0">
        {/* Desktop Icons Column */}
        <div className="flex flex-col gap-4 w-24">
          <DesktopIcon 
            label="About Me" 
            iconSrc="/icons/Notes.png" 
            isActive={activeWindow === "About"}
            onClick={() => handleIconClick("About")} 
          />
          <DesktopIcon 
            label="Education" 
            iconSrc="/icons/Books.png" 
            isActive={activeWindow === "Education"}
            onClick={() => handleIconClick("Education")} 
          />
          <DesktopIcon 
            label="Experience" 
            iconSrc="/icons/LinkedIn.png" 
            isActive={activeWindow === "Experience"}
            onClick={() => handleIconClick("Experience")} 
          />
          <DesktopIcon 
            label="Projects" 
            iconSrc="/icons/DocumentsFolder.ico" 
            isActive={activeWindow === "Projects"}
            onClick={() => handleIconClick("Projects")} 
          />
          <DesktopIcon 
            label="Contact Me" 
            iconSrc="/icons/Contacts.png" 
            isActive={activeWindow === "Contact Me"}
            onClick={() => handleIconClick("Contact Me")} 
          />
        </div>

        {/* Window Area */}
        <div className="flex-1 flex items-center justify-center p-4 relative overflow-hidden">
          {activeWindow && (
            <div 
              className="w-full max-w-4xl h-[80vh] z-50"
              style={{
                transform: `translate(${position.x}px, ${position.y}px)`,
              }}
            >
              <WindowFrame 
                title={activeWindow} 
                onClose={handleCloseWindow}
                onMinimize={() => {}} 
                onMaximize={() => {}} 
                onTitleMouseDown={handleMouseDown}
              >
                <div className="p-4">
                  {renderContent()}
                </div>
              </WindowFrame>
            </div>
          )}
        </div>
      </div>

      {/* Taskbar */}
      <Taskbar 
        activeWindow={activeWindow || undefined} 
        onStartClick={() => alert("Start Menu - Coming Soon!")}
      />
    </main>
  );
}

export default App;
