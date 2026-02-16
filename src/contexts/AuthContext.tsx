import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import data from "@/data/data.json";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  signup: (name: string, email: string, password: string, phone: string) => boolean;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("luxe_user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const login = (email: string, password: string) => {
    const found = data.users.find(u => u.email === email && u.password === password);
    if (found) {
      const u = { id: found.id, name: found.name, email: found.email, phone: found.phone };
      setUser(u);
      localStorage.setItem("luxe_user", JSON.stringify(u));
      return true;
    }
    return false;
  };

  const signup = (name: string, email: string, _password: string, phone: string) => {
    const u = { id: Date.now(), name, email, phone };
    setUser(u);
    localStorage.setItem("luxe_user", JSON.stringify(u));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("luxe_user");
  };

  const updateProfile = (updates: Partial<User>) => {
    if (user) {
      const updated = { ...user, ...updates };
      setUser(updated);
      localStorage.setItem("luxe_user", JSON.stringify(updated));
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
