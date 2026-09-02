import { useState } from "react";

export default function useAuth() {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const token = localStorage.getItem("token");
  const isAuthenticated = !!token;
  const isAdmin = user?.role === "admin";

  return { user, token, isAuthenticated, isAdmin, setUser };
}