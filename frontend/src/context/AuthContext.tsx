// src/context/AuthContext.tsx
"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// Define the structure of the authentication data
interface AuthContextType {
  user: { token: string; userId: string; role: string } | null;
  login: (token: string, userId: string, role: string) => void;
  logout: () => void;
}

// Create the AuthContext with a default value of undefined
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to use the AuthContext
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// Define the AuthProvider component
interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<{
    token: string;
    userId: string;
    role: string;
  } | null>(null);

  // Load stored user data from localStorage on app start
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUserId = localStorage.getItem("userId");
    const storedRole = localStorage.getItem("role");
    if (storedToken && storedUserId && storedRole) {
      setUser({ token: storedToken, userId: storedUserId, role: storedRole });
    }
  }, []);

  // Login function: Store token, userId, and role
  const login = (token: string, userId: string, role: string) => {
    setUser({ token, userId, role });
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    localStorage.setItem("role", role);
  };

  // Logout function: Clear all user-related data
  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
