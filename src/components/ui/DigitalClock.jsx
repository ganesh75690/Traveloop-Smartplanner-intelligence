import { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";

export default function DigitalClock() {
  const { darkMode } = useTheme();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const textColor = darkMode ? "text-[#CBD5E1]" : "text-[#6B7280]";
  const timeColor = darkMode ? "text-[#1A56DB]" : "text-[#1A56DB]";

  return (
    <div className="flex flex-col items-center">
      <div className={`text-lg font-bold ${timeColor} tabular-nums`}>
        {formatTime(time)}
      </div>
      <div className={`text-xs ${textColor}`}>
        {formatDate(time)}
      </div>
    </div>
  );
}
