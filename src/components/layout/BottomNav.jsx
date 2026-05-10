import { NavLink } from "react-router-dom";
import { Home, Map, Search, Compass, User } from "lucide-react";

const navItems = [
  { label: "Dashboard",  path: "/dashboard",   icon: Home    },
  { label: "Trips",      path: "/trips",       icon: Map     },
  { label: "Search",     path: "/cities",      icon: Search  },
  { label: "Activities", path: "/activities",  icon: Compass },
  { label: "Profile",    path: "/profile",     icon: User    },
];

export default function BottomNav() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-[#E5E9F2] shadow-lg">
      <div className="flex items-center justify-around px-1 py-1 pb-safe">
        {navItems.map(({ label, path, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl transition-all duration-200 min-w-0 flex-1
              ${isActive ? "text-[#006CE4]" : "text-[#9CA3AF] hover:text-[#374151]"}`
            }
          >
            {({ isActive }) => (
              <>
                <div className={`p-1 rounded-lg transition-all duration-200 ${isActive ? "bg-[#E8F1FD]" : ""}`}>
                  <Icon size={18} strokeWidth={isActive ? 2.5 : 1.75} />
                </div>
                <span className="text-[10px] font-medium leading-none">{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
