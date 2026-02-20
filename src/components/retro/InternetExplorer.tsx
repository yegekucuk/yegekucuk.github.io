"use client";

import { useState } from "react";
import { GlobeIcon } from "@/components/Icons";

export function InternetExplorer() {
  const [url, setUrl] = useState("https://www.wikipedia.org");
  const [inputUrl, setInputUrl] = useState("https://www.wikipedia.org");
  const [history, setHistory] = useState<string[]>(["https://www.wikipedia.org"]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const handleNavigate = (e: React.FormEvent) => {
    e.preventDefault();
    let targetUrl = inputUrl;
    if (!targetUrl.startsWith("http://") && !targetUrl.startsWith("https://")) {
      targetUrl = "https://" + targetUrl;
    }
    
    if (targetUrl !== history[historyIndex]) {
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push(targetUrl);
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
    }
    
    setUrl(targetUrl);
    setInputUrl(targetUrl);
  };

  const goBack = () => {
    if (historyIndex > 0) {
      const prevUrl = history[historyIndex - 1];
      setHistoryIndex(historyIndex - 1);
      setUrl(prevUrl);
      setInputUrl(prevUrl);
    }
  };

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      const nextUrl = history[historyIndex + 1];
      setHistoryIndex(historyIndex + 1);
      setUrl(nextUrl);
      setInputUrl(nextUrl);
    }
  };

  const reload = () => {
    const currentUrl = url;
    setUrl("");
    setTimeout(() => setUrl(currentUrl), 50);
  };

  const goHome = () => {
    const homeUrl = "https://www.wikipedia.org";
    if (url !== homeUrl) {
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push(homeUrl);
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
      setUrl(homeUrl);
      setInputUrl(homeUrl);
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-[#ECE9D8] font-sans text-sm select-none">
      {/* Toolbar */}
      <div className="flex items-center px-1 py-1 border-b border-gray-300">
        <div className="flex items-center gap-1 border-r border-gray-400 pr-2 mr-2">
          <button 
            onClick={goBack} 
            disabled={historyIndex === 0}
            className="flex flex-col items-center justify-center p-1 min-w-[50px] hover:ring hover:ring-gray-400 hover:shadow-sm disabled:opacity-50 disabled:hover:ring-transparent disabled:hover:shadow-none"
          >
            <span className="text-xl leading-none text-blue-800">⇦</span>
            <span className="text-[10px] mt-1">Back</span>
          </button>
          <button 
            onClick={goForward} 
            disabled={historyIndex === history.length - 1}
            className="flex flex-col items-center justify-center p-1 min-w-[50px] hover:ring hover:ring-gray-400 hover:shadow-sm disabled:opacity-50 disabled:hover:ring-transparent disabled:hover:shadow-none"
          >
            <span className="text-xl leading-none text-blue-800">⇨</span>
            <span className="text-[10px] mt-1">Forward</span>
          </button>
        </div>
        
        <div className="flex items-center gap-1">
          <button 
            onClick={reload}
            className="flex flex-col items-center justify-center p-1 min-w-[50px] hover:ring hover:ring-gray-400 hover:shadow-sm"
          >
            <span className="text-xl leading-none text-blue-800">↻</span>
            <span className="text-[10px] mt-1">Refresh</span>
          </button>
          <button 
            onClick={goHome}
            className="flex flex-col items-center justify-center p-1 min-w-[50px] hover:ring hover:ring-gray-400 hover:shadow-sm"
          >
            <span className="text-xl leading-none text-blue-800">⌂</span>
            <span className="text-[10px] mt-1">Home</span>
          </button>
        </div>
      </div>

      {/* Address Bar */}
      <div className="flex items-center gap-2 px-2 py-1.5 border-b border-gray-300 bg-[#ECE9D8]">
        <span className="text-gray-600 whitespace-nowrap">Address</span>
        <form onSubmit={handleNavigate} className="flex-1 flex bg-white border border-gray-400 shadow-inner h-6">
          <div className="px-1 flex items-center bg-white">
            <GlobeIcon className="text-blue-600 size-3" />
          </div>
          <input 
            type="text" 
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            className="flex-1 px-1 outline-none text-sm text-black"
          />
        </form>
        <button 
          onClick={handleNavigate}
          className="px-3 flex items-center justify-center h-6 bg-gray-200 border border-gray-400 hover:bg-gray-300 active:bg-gray-400 active:shadow-inner text-xs"
        >
          Go
        </button>
      </div>

      {/* Browser Content Workspace */}
      <div className="flex-1 bg-white border-t border-b border-gray-400 relative overflow-hidden">
        {url ? (
          <iframe 
            src={url} 
            title="Internet Explorer Content"
            className="w-full h-full border-none bg-white"
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            Loading...
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div className="flex items-center justify-between px-2 py-0.5 bg-[#ECE9D8] text-[11px] text-gray-600 border-t border-gray-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
        <div className="flex items-center gap-1">
          <GlobeIcon className="size-3" />
          <span>Internet</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 border-l border-gray-400 pl-2">
            <span>Protected Mode: On</span>
          </div>
          <div className="flex items-center gap-1 border-l border-gray-400 pl-2">
            <span>100%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
