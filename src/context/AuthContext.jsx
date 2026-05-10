import { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { authAPI } from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Authentication completely bypassed - provide mock user immediately
  const mockUser = {
    id: "demo-user",
    name: "Demo User", 
    email: "demo@traveloop.com",
    avatar: null
  };
  const [user, setUser] = useState(mockUser);
  const [loading, setLoading] = useState(false);

  const login = async (email, password, role = "user") => {
    // Authentication bypassed - always succeed with mock user
    const mockUser = {
      id: role === "admin" ? "admin-user" : "demo-user",
      name: role === "admin" ? "Admin User" : (email.split('@')[0] || "Demo User"),
      email: email,
      role: role,
      avatar: null
    };
    setUser(mockUser);
    return { success: true, user: mockUser };
  };

  const logout = () => {
    // Keep the mock user for demo purposes
    const mockUser = {
      id: "demo-user", 
      name: "Demo User",
      email: "demo@traveloop.com",
      avatar: null
    };
    setUser(mockUser);
  };

  const register = async (data) => {
    // Authentication bypassed - always succeed with mock user
    const mockUser = {
      id: data.role === "admin" ? "admin-user" : "demo-user",
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      role: data.role || "user",
      avatar: null
    };
    setUser(mockUser);
    return { success: true, user: mockUser };
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthContext must be used within AuthProvider");
  return ctx;
}
