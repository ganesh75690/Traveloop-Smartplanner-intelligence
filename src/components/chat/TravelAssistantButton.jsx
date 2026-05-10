import { useState } from "react";
import { MessageCircle, X, Maximize2 } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import TravelAssistant from "./TravelAssistant";

export default function TravelAssistantButton() {
  const { darkMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    setIsMinimized(false);
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsMinimized(false);
  };

  const handleMinimize = () => {
    setIsMinimized(true);
  };

  const handleMaximize = () => {
    setIsMinimized(false);
  };

  const buttonBg = darkMode 
    ? "bg-[#1E293B] border-[#334155] hover:bg-[#334155]" 
    : "bg-white border-[#E5E7EB] hover:bg-gray-50";

  return (
    <>
      {/* Chat Button */}
      {!isOpen && !isMinimized && (
        <button
          onClick={handleOpen}
          className={`fixed bottom-20 md:bottom-4 right-4 w-14 h-14 rounded-full border shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 z-40 ${buttonBg}`}
          aria-label="Open travel assistant"
        >
          <MessageCircle size={22} className="text-blue-500" />
        </button>
      )}

      {/* Minimized Chat Button */}
      {isMinimized && (
        <button
          onClick={handleMaximize}
          className={`fixed bottom-20 md:bottom-4 right-4 px-3 py-2.5 md:px-4 rounded-full border shadow-lg flex items-center gap-2 transition-all duration-300 hover:scale-105 z-40 ${buttonBg}`}
          aria-label="Maximize travel assistant"
        >
          <MessageCircle size={18} className="text-blue-500" />
          <span className="hidden sm:inline text-sm font-medium text-[var(--text-primary)]">Travel Assistant</span>
          <Maximize2 size={14} className="text-[var(--text-muted)]" />
        </button>
      )}

      {/* Full Chat Window */}
      {isOpen && !isMinimized && (
        <TravelAssistant
          isOpen={isOpen}
          onClose={handleClose}
          onMinimize={handleMinimize}
        />
      )}
    </>
  );
}
