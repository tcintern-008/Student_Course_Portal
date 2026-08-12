"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { loginUser, registerUser } from "@/lib/authApi";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("authUser");
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  function persistSession(response) {
    const { token: newToken, ...userInfo } = response;
    localStorage.setItem("authToken", newToken);
    localStorage.setItem("authUser", JSON.stringify(userInfo));
    setToken(newToken);
    setUser(userInfo);
  }

  async function login(email, password) {
    const response = await loginUser({ email, password });
    persistSession(response);
  }

  async function register(name, email, password) {
    const response = await registerUser({ name, email, password });
    persistSession(response);
  }

  function logout() {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
