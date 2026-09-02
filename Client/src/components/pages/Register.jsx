import { useState } from "react";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);
      const { data } = await registerUser({ name, email, password });

      if (!data.success) {
        setError(data.message || "Registration failed");
        return;
      }

      // Save token and redirect
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => {
    navigate("/Login");
  };

  return (
    <div>
      <Navbar />
      <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center bg-white">
        <div className="w-100" style={{ maxWidth: "576px" }}>
          {/* TITLE */}
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
              Register
            </h1>
            <div
              className="bg-dark"
              style={{
                width: "55px",
                height: "2px",
              }}
            ></div>
          </div>

          {/* ERROR MESSAGE */}
          {error && (
            <div className="alert alert-danger rounded-0 text-center">
              {error}
            </div>
          )}

          {/* NAME */}
          <div className="mb-4">
            <input
              type="text"
              className="form-control rounded-0 border-dark px-3"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                height: "62px",
                fontSize: "23px",
              }}
            />
          </div>

          {/* EMAIL */}
          <div className="mb-4">
            <input
              type="email"
              className="form-control rounded-0 border-dark px-3"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                height: "62px",
                fontSize: "23px",
              }}
            />
          </div>

          {/* PASSWORD */}
          <div className="mb-3">
            <input
              type="password"
              className="form-control rounded-0 border-dark px-3"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                height: "62px",
                fontSize: "23px",
              }}
            />
          </div>

          {/* LOGIN LINK */}
          <div className="d-flex justify-content-between align-items-center mb-5">
            <button
              type="button"
              className="btn p-0 border-0 bg-transparent"
              style={{
                fontSize: "20px",
                color: "#111",
              }}
            >
              Already have account?
            </button>
            <button
              type="button"
              className="btn p-0 border-0 bg-transparent"
              style={{
                fontSize: "20px",
                color: "#111",
              }}
              onClick={handleLogin}
            >
              Login
            </button>
          </div>

          {/* SIGN UP */}
          <div className="d-flex justify-content-center">
            <button
              type="submit"
              className="btn btn-dark rounded-0 px-5 py-3"
              style={{
                width: "166px",
                height: "61px",
                fontSize: "20px",
              }}
              onClick={handleRegister}
              disabled={loading}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Register;