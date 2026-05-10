import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Home, Map, Search, Compass, User, LogOut, X, Settings, MapPin, TrendingUp, Users, AlertTriangle, BookOpen, Package, Wallet } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import { useTheme } from "../../context/ThemeContext";

const navItems = [
  { label: "Dashboard",   path: "/dashboard",   icon: Home    },
  { label: "My Trips",    path: "/trips",       icon: Map     },
  { label: "City Search", path: "/cities",      icon: Search  },
  { label: "Activities",  path: "/activities",  icon: Compass },
  { label: "Community",   path: "/community",   icon: Users   },
  { label: "Travel Journal", path: "/travel-journal", icon: BookOpen },
  { label: "Smart Packing", path: "/smart-packing", icon: Package },
  { label: "Expense Intelligence", path: "/expense-intelligence", icon: Wallet },
  { label: "AI Budget Intelligence", path: "/budget-intelligence", icon: TrendingUp },
  { label: "Profile",     path: "/profile",     icon: User    },
];

export default function Sidebar({ mobileOpen, onClose, onSettingsOpen, onSimulationOpen }) {
  const { user, logout } = useAuth();
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Handle demo user when not authenticated
  const displayUser = user || { name: "Demo User", email: "demo@traveloop.com" };
  const handleLogout = () => { 
    if (logout) logout(); 
    navigate("/"); 
  };
  const handleLogoutClick = () => setShowLogoutModal(true);

  const bg    = darkMode ? "bg-[#1E293B] border-[#334155]" : "bg-white border-[#E2E8F0]";
  const logo  = darkMode ? "text-[#F1F5F9]" : "text-[#1E3A8A]";
  const muted = darkMode ? "text-[#94A3B8]" : "text-[#64748B]";
  const hover = darkMode ? "hover:bg-[#334155] hover:text-[#F1F5F9]" : "hover:bg-[#F1F5F9] hover:text-[#1E40AF] hover:shadow-sm";
  const activeClass = darkMode
    ? "bg-[#1E3A5F] text-[#93C5FD] border-l-3 border-[#3B82F6] shadow-sm"
    : "bg-[#EFF6FF] text-[#1E40AF] border-l-3 border-[#1E40AF] shadow-sm";
  const inactiveClass = darkMode
    ? `text-[#94A3B8] border-l-3 border-transparent ${hover}`
    : `text-[#64748B] border-l-3 border-transparent ${hover}`;
  const divider = darkMode ? "border-[#334155]" : "border-[#E2E8F0]";
  const userBg  = darkMode ? "bg-[#334155]" : "bg-[#F8FAFC]";
  const userText = darkMode ? "text-[#F1F5F9]" : "text-[#1E3A8A]";

  return (
    <>
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden" onClick={onClose} />
      )}

      <aside className={`
        fixed left-0 top-0 z-50 h-full w-64 flex flex-col border-r border-blue-500 shadow-xl
        transition-transform duration-300 ease-in-out
        md:w-60 md:translate-x-0 md:z-30 md:shadow-md md:border-r md:border-blue-500
        ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        ${bg}
      `}>
        {/* Mobile close button */}
        <div className={`flex md:hidden items-center justify-end px-4 py-3 border-b ${divider} shrink-0`}>
          <button
            onClick={onClose}
            className={`p-1.5 rounded-lg ${muted} hover:bg-[#F3F4F6] transition-colors`}
            aria-label="Close sidebar"
          >
            <X size={17} />
          </button>
        </div>

        {/* User section */}
        <div className={`px-3 py-3 border-b ${divider} shrink-0`}>
          <div className={`flex items-center gap-3 px-3 py-2.5 rounded-xl ${userBg}`}>
            <div className="w-8 h-8 rounded-full bg-[#1A56DB] flex items-center justify-center text-xs font-bold text-white shrink-0">
              {displayUser?.name?.[0]?.toUpperCase() || "D"}
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-semibold truncate leading-tight ${userText}`}>
                {displayUser?.name || "Demo User"}
              </p>
              <p className={`text-xs truncate leading-tight mt-0.5 ${muted}`}>
                {displayUser?.email || "demo@traveloop.com"}
              </p>
            </div>
          </div>
        </div>

        {/* Nav label */}
        <div className="px-5 pt-4 pb-1">
          <p className={`text-[10px] font-bold uppercase tracking-widest ${muted}`}>Navigation</p>
        </div>

        {/* Nav items */}
        <nav className="flex-1 px-3 pb-4 space-y-0.5 overflow-y-auto">
          {navItems.map(({ label, path, icon: Icon }) => {
            // Insert Travel Simulation before Profile item
            if (label === "Profile") {
              return (
                <React.Fragment key={path}>
                  {/* Travel Simulation */}
                  <button
                    onClick={() => { onClose?.(); onSimulationOpen?.(); }}
                    className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 pl-[10px] border-l-2 border-transparent ${inactiveClass}`}
                  >
                    <MapPin size={17} strokeWidth={1.75} className="shrink-0 text-purple-500" />
                    <span>Travel Simulation</span>
                  </button>
                  
                  <NavLink
                    to={path}
                    end={path === "/"}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 pl-[10px]
                      ${isActive ? activeClass : inactiveClass}`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <Icon size={17} className="shrink-0" strokeWidth={isActive ? 2.5 : 1.75} />
                        <span>{label}</span>
                      </>
                    )}
                  </NavLink>
                  
                  {/* Settings */}
                  <button
                    onClick={() => { onClose?.(); onSettingsOpen?.(); }}
                    className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 pl-[10px] border-l-2 border-transparent ${inactiveClass}`}
                  >
                    <Settings size={17} strokeWidth={1.75} className="shrink-0" />
                    <span>Settings</span>
                  </button>
                </React.Fragment>
              );
            }
            
            return (
              <NavLink
                key={path}
                to={path}
                end={path === "/"}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 pl-[10px]
                  ${isActive ? activeClass : inactiveClass}`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon size={17} className="shrink-0" strokeWidth={isActive ? 2.5 : 1.75} />
                    <span>{label}</span>
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Sign out button */}
        <div className={`px-3 py-3 border-t ${divider} shrink-0`}>
          <button
            onClick={handleLogoutClick}
            className={`flex items-center gap-2.5 w-full px-3 py-2 rounded-xl text-sm font-medium transition-all duration-150 ${muted} hover:text-red-500 hover:bg-red-50`}
          >
            <LogOut size={15} />
            <span>Sign out</span>
          </button>
        </div>
      </aside>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <div className={`rounded-2xl p-6 w-full max-w-md shadow-2xl ${darkMode ? "bg-[#1E293B] border border-[#334155]" : "bg-white border border-[#E2E8F0]"}`}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <AlertTriangle size={20} className="text-red-500" />
              </div>
              <h3 className="text-lg font-bold text-[var(--text-primary)]">Sign Out</h3>
            </div>
            <p className="text-sm text-[var(--text-secondary)] mb-6 font-medium">
              Are you sure you want to sign out? You will need to sign in again to access your account.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${darkMode ? "bg-[#334155] text-[#F1F5F9] hover:bg-[#475569]" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
              >
                No, Cancel
              </button>
              <button
                onClick={() => {
                  handleLogout();
                  setShowLogoutModal(false);
                }}
                className="flex-1 px-4 py-2.5 bg-red-500 text-white rounded-xl text-sm font-semibold hover:bg-red-600 transition-colors"
              >
                Yes, Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
