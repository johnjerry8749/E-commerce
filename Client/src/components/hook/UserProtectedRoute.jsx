import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const UserProtectedRoute = ({ children }) => {
  const { user, token, loading } = useAuth();

  console.log("AUTH USER:", user);
  console.log("USER ROLE:", user?.role);
  console.log("TOKEN:", token);

  // =========================
  // WAIT FOR AUTH TO RESTORE
  // =========================
  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>

        <p className="mt-2">Loading...</p>
      </div>
    );
  }

  // =========================
  // USER NOT LOGGED IN
  // =========================
  if (!user || !token) {
    return <Navigate to="/login" replace />;
  }

  // =========================
  // USER IS LOGGED IN
  // =========================
  return children;
};

export default UserProtectedRoute;

