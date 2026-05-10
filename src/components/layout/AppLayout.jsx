import { useState, useRef, useEffect } from "react";
import { Outlet, Navigate, useNavigate, useLocation } from "react-router-dom";
import { Menu, Plane, Bell, User, Settings, Lock, LogOut, Moon, Sun, ChevronDown, MessageCircle, MapPin, HelpCircle } from "lucide-react";
import Sidebar from "./Sidebar";
import BottomNav from "./BottomNav";
import SettingsModal from "../ui/SettingsModal";
import HelpSupportModal from "../ui/HelpSupportModal";
import DigitalClock from "../ui/DigitalClock";
import TravelAssistantButton from "../chat/TravelAssistantButton";
import TravelSimulationModal from "../simulation/TravelSimulationModal";
import useAuth from "../../hooks/useAuth";
import { useTheme } from "../../context/ThemeContext";
import { mockNotifications } from "../../data/mockData";

// ── Notification Dropdown ─────────────────────────────────────────────────────
function NotificationDropdown({ onClose }) {
  const { darkMode } = useTheme();
  const [notifs, setNotifs] = useState(mockNotifications);
  const unread = notifs.filter((n) => !n.read).length;

  const markRead = (id) => setNotifs((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));
  const markAll  = () => setNotifs((prev) => prev.map((n) => ({ ...n, read: true })));

  const typeIcon = { reminder: "🔔", weather: "🌤️", recommendation: "✨", booking: "✅" };

  const bg     = darkMode ? "bg-[#1E293B] border-[#334155]" : "bg-white border-[#E5E7EB]";
  const hdr    = darkMode ? "border-[#334155]" : "border-[#F3F4F6]";
  const itemBg = (read) => darkMode
    ? (read ? "" : "bg-[#1E3A5F]/40")
    : (read ? "" : "bg-[#EBF2FF]/60");

  return (
    <div className={`absolute right-0 top-12 w-80 rounded-2xl border shadow-xl z-50 overflow-hidden ${bg}`}>
      <div className={`flex items-center justify-between px-4 py-3 border-b ${hdr}`}>
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-(--text-primary)">Notifications</span>
          {unread > 0 && (
            <span className="text-xs bg-[#1A56DB] text-white px-1.5 py-0.5 rounded-full font-bold">{unread}</span>
          )}
        </div>
        {unread > 0 && (
          <button onClick={markAll} className="text-xs text-[#1A56DB] font-semibold hover:underline">
            Mark all read
          </button>
        )}
      </div>
      <div className="max-h-80 overflow-y-auto divide-y divide-(--border)">
        {notifs.map((n) => (
          <button
            key={n.id}
            onClick={() => markRead(n.id)}
            className={`w-full flex items-start gap-3 px-4 py-3 text-left hover:bg-(--border)/40 transition-colors ${itemBg(n.read)}`}
          >
            <span className="text-lg shrink-0 mt-0.5">{typeIcon[n.type] || "📌"}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <p className={`text-xs font-bold truncate ${n.read ? "text-(--text-muted)" : "text-(--text-primary)"}`}>
                  {n.title}
                </p>
                {!n.read && <span className="w-2 h-2 rounded-full bg-[#1A56DB] shrink-0" />}
              </div>
              <p className="text-xs text-(--text-muted) mt-0.5 line-clamp-2">{n.message}</p>
              <p className="text-[10px] text-(--text-light) mt-1">{n.time}</p>
            </div>
          </button>
        ))}
      </div>
      <div className={`px-4 py-2.5 border-t ${hdr} text-center`}>
        <button className="text-xs text-[#1A56DB] font-semibold hover:underline">View all notifications</button>
      </div>
    </div>
  );
}

// ── Profile Dropdown ──────────────────────────────────────────────────────────
function ProfileDropdown({ onClose, onSettingsOpen, onHelpSupportOpen }) {
  const { user, logout } = useAuth();
  const { darkMode, toggleDark } = useTheme();
  const navigate = useNavigate();
  const bg = darkMode ? "bg-[#1E293B] border-[#334155]" : "bg-white border-[#E5E7EB]";
  const item = "flex items-center gap-3 w-full px-4 py-2.5 text-sm font-medium transition-colors text-left";
  const itemHover = darkMode ? "hover:bg-[#334155] text-[#CBD5E1]" : "hover:bg-[#F0F4FF] text-[#374151]";

  return (
    <div className={`absolute right-0 top-12 w-56 rounded-2xl border shadow-xl z-50 overflow-hidden ${bg}`}>
      {/* User info */}
      <div className={`px-4 py-3 border-b ${darkMode ? "border-[#334155]" : "border-[#F3F4F6]"}`}>
        <p className="text-sm font-bold text-(--text-primary) truncate">{user?.name}</p>
        <p className="text-xs text-(--text-muted) truncate">{user?.email}</p>
      </div>

      <div className="py-1">
        <button onClick={() => { navigate("/profile"); onClose(); }} className={`${item} ${itemHover}`}>
          <User size={15} className="text-[#1A56DB]" /> My Profile
        </button>
        <button onClick={() => { onSettingsOpen(); onClose(); }} className={`${item} ${itemHover}`}>
          <Settings size={15} className="text-[#6B7280]" /> Settings
        </button>
        <button onClick={() => { onHelpSupportOpen(); onClose(); }} className={`${item} ${itemHover}`}>
          <HelpCircle size={15} className="text-[#6B7280]" /> Help & Support
        </button>
        <button onClick={() => { onSettingsOpen(); onClose(); }} className={`${item} ${itemHover}`}>
          <Lock size={15} className="text-[#6B7280]" /> Change Password
        </button>
        <button onClick={toggleDark} className={`${item} ${itemHover}`}>
          {darkMode
            ? <Sun size={15} className="text-yellow-500" />
            : <Moon size={15} className="text-[#6B7280]" />
          }
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      <div className={`border-t ${darkMode ? "border-[#334155]" : "border-[#F3F4F6]"} py-1`}>
        <button
          onClick={() => { logout(); navigate("/auth"); }}
          className={`${item} text-red-500 hover:bg-red-50`}
        >
          <LogOut size={15} /> Sign out
        </button>
      </div>
    </div>
  );
}

// ── AppLayout ─────────────────────────────────────────────────────────────────
export default function AppLayout() {
  const { user, loading } = useAuth();
  const { darkMode } = useTheme();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen]     = useState(false);
  const [notifOpen, setNotifOpen]         = useState(false);
  const [profileOpen, setProfileOpen]     = useState(false);
  const [settingsOpen, setSettingsOpen]   = useState(false);
  const [simulationOpen, setSimulationOpen] = useState(false);
  const [helpSupportOpen, setHelpSupportOpen] = useState(false);

  const notifRef   = useRef(null);
  const profileRef = useRef(null);

  const unreadCount = mockNotifications.filter((n) => !n.read).length;
  const isAdminRoute = location.pathname === '/admin';

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Authentication bypassed for direct dashboard access
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "var(--bg-page)" }}>
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 bg-[#1A56DB] rounded-2xl flex items-center justify-center shadow-lg animate-pulse">
            <Plane size={22} className="text-white" strokeWidth={2.5} />
          </div>
          <p className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>Loading Traveloop...</p>
        </div>
      </div>
    );
  }

  // Authentication bypassed - allow direct access to dashboard
  if (!user) {
    // Set a mock user for display purposes
    const mockUser = { name: "Demo User", email: "demo@traveloop.com" };
    // Continue without redirecting to auth
  }

  const topBarBg = darkMode ? "bg-[#1E293B] border-[#334155]" : "bg-white border-[#E5E7EB]";

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg-page)" }}>
      <Sidebar
        mobileOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onSettingsOpen={() => setSettingsOpen(true)}
        onSimulationOpen={() => setSimulationOpen(true)}
      />

      <main className="md:ml-60 min-h-screen pb-20 md:pb-0">
        {/* Top bar — desktop + mobile */}
        <div className={`flex items-center justify-between px-4 md:px-6 py-3 border-b border-blue-500 sticky top-0 z-20 shadow-sm ${topBarBg}`}>
          {/* Left: hamburger (mobile) + logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 rounded-xl text-(--text-muted) hover:text-[#1A56DB] hover:bg-[#EBF2FF] transition-colors"
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
            {/* Traveloop logo - visible on all screens */}
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-[#1A56DB] rounded-xl flex items-center justify-center shadow-sm">
                <Plane size={16} className="text-white" strokeWidth={2.5} />
              </div>
              <span className="text-lg font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>Traveloop</span>
            </div>
          </div>

          {/* Right: digital clock + notification + profile */}
          <div className="flex items-center gap-3">
            {/* Digital Clock - hidden on mobile, visible on desktop */}
            <div className="hidden md:flex">
              <DigitalClock />
            </div>
            
            {/* Notification bell - hidden on admin route */}
            {!isAdminRoute && (
              <div ref={notifRef} className="relative">
                <button
                  onClick={() => { setNotifOpen((v) => !v); setProfileOpen(false); }}
                  className={`relative p-2 rounded-xl transition-all duration-150
                    ${notifOpen
                      ? "bg-[#EBF2FF] text-[#1A56DB]"
                      : "text-(--text-muted) hover:text-[#1A56DB] hover:bg-[#EBF2FF]"
                    }`}
                  aria-label="Notifications"
                >
                  <Bell size={18} />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                  )}
                </button>
                {notifOpen && <NotificationDropdown onClose={() => setNotifOpen(false)} />}
              </div>
            )}

            {/* Profile avatar - hidden on admin route */}
            {!isAdminRoute && (
              <div ref={profileRef} className="relative">
                <button
                  onClick={() => { setProfileOpen((v) => !v); setNotifOpen(false); }}
                  className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-xl hover:bg-[#EBF2FF] transition-all duration-150"
                  aria-label="Profile menu"
                >
                  <div className="w-8 h-8 rounded-full bg-[#1A56DB] flex items-center justify-center text-xs font-bold text-white">
                    {user?.name?.[0]?.toUpperCase() || "U"}
                  </div>
                  <span className="hidden sm:block text-sm font-semibold text-(--text-primary) max-w-25 truncate">
                    {user?.name?.split(" ")[0]}
                  </span>
                  <ChevronDown size={14} className={`text-(--text-muted) transition-transform duration-200 ${profileOpen ? "rotate-180" : ""}`} />
                </button>
                {profileOpen && (
                  <ProfileDropdown
                    onClose={() => setProfileOpen(false)}
                    onSettingsOpen={() => setSettingsOpen(true)}
                    onHelpSupportOpen={() => setHelpSupportOpen(true)}
                  />
                )}
              </div>
            )}
          </div>
        </div>

        <Outlet />
      </main>

      <BottomNav />
      <SettingsModal isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
      <HelpSupportModal isOpen={helpSupportOpen} onClose={() => setHelpSupportOpen(false)} />
      <TravelAssistantButton />
      <TravelSimulationModal isOpen={simulationOpen} onClose={() => setSimulationOpen(false)} />
    </div>
  );
}
