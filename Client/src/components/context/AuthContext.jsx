import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  // =========================
  // RESTORE USER
  // =========================
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  // =========================
  // RESTORE TOKEN
  // =========================
  const [token, setToken] = useState(
    () => localStorage.getItem("token") || ""
  );

  const [loading, setLoading] = useState(true);

  // =========================
  // LOGOUT
  // =========================
  const logout = () => {
    setUser(null);
    setToken("");

    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  // =========================
  // LOGIN
  // =========================
  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);

    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", authToken);
  };

  // =========================
  // CHECK JWT EXPIRATION
  // =========================
  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      // JWT format:
      // header.payload.signature
      const payload = token.split(".")[1];

      if (!payload) {
        logout();
        setLoading(false);
        return;
      }

      const decodedPayload = JSON.parse(
        atob(payload.replace(/-/g, "+").replace(/_/g, "/"))
      );

      const expirationTime = decodedPayload.exp * 1000;
      const currentTime = Date.now();

      // =========================
      // TOKEN ALREADY EXPIRED
      // =========================
      if (expirationTime <= currentTime) {
        console.log("JWT expired. Logging out...");
        logout();
        setLoading(false);
        return;
      }

      // =========================
      // AUTOMATIC LOGOUT
      // =========================
      const remainingTime = expirationTime - currentTime;

      const timeout = setTimeout(() => {
        console.log("JWT expired. Logging out...");
        logout();
      }, remainingTime);

      setLoading(false);

      return () => clearTimeout(timeout);
    } catch (error) {
      console.error("Invalid JWT:", error);

      logout();
      setLoading(false);
    }
  }, [token]);

  const value = {
    user,
    token,
    loading,
    login,
    logout,

    isAuthenticated: !!token,

    isAdmin: user?.role === "admin",
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;