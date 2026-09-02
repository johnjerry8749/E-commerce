import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../../../services/authService.js";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAdminLogin = async (event) => {
    event.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Email and password are required");
      return;
    }

    try {
      setLoading(true);

      const { data } = await adminLogin({
        email: email.trim(),
        password,
      });

      if (!data.success) {
        setError(data.message || "Login failed");
        return;
      }

      if (data.user?.role !== "admin") {
        setError("Access denied. Admin account required.");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/AuthDashboard");
    } catch (requestError) {
      console.error("Admin Login Error:", requestError);

      setError(
        requestError.response?.data?.message || "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center bg-white">
      <div className="w-100" style={{ maxWidth: "576px" }}>
        <div className="d-flex justify-content-center align-items-center gap-2 mb-5">
          <h1
            className="mb-0"
            style={{
              fontFamily: "'Lora', serif",
              fontSize: "50px",
              fontWeight: "400",
              color: "#111",
            }}
          >
            AdminLogin
          </h1>
        </div>

        <form onSubmit={handleAdminLogin}>
          {error && (
            <div className="alert alert-danger rounded-0 text-center">
              {error}
            </div>
          )}

          <div className="mb-4">
            <input
              type="email"
              className="form-control rounded-0 border-dark px-3"
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              style={{ height: "62px", fontSize: "23px" }}
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              className="form-control rounded-0 border-dark px-3"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              style={{ height: "62px", fontSize: "23px" }}
            />
          </div>

          <div className="d-flex justify-content-center">
            <button
              type="submit"
              className="btn btn-dark rounded-0 px-5 py-3"
              disabled={loading}
              style={{
                width: "166px",
                height: "61px",
                fontSize: "20px",
              }}
            >
              {loading ? "Logging..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;