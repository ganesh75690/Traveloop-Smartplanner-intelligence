import { useAuthContext } from "../context/AuthContext";

// Convenience re-export so components import from hooks/useAuth
export default function useAuth() {
  return useAuthContext();
}
