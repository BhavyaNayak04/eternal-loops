// src/context/AuthContext.tsx
'use client';
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// Define the structure of the authentication data (token and userId)
interface AuthContextType {
  user: { token: string; userId: string } | null;
  login: (token: string, userId: string) => void;
  logout: () => void;
}

// Create the AuthContext with a default value of null
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
  const [user, setUser] = useState<{ token: string; userId: string } | null>(
    null
  );

  // Load stored user data (token and userId) from localStorage on app start
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUserId = localStorage.getItem("userId");
    if (storedToken && storedUserId) {
      setUser({ token: storedToken, userId: storedUserId });
    }
  }, []);

  // Login function: Store token and userId in state and localStorage
  const login = (token: string, userId: string) => {
    setUser({ token, userId });
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
  };

  // Logout function: Clear user data from state and localStorage
  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
  };

  // Provide the context value to all child components
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
