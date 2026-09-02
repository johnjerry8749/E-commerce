import { useState } from "react";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService.js";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // CREATE ACCOUNT
  const handleCreateAccount = () => {
    navigate("/Register");
  };

  // LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();

    setErrors({});

    try {
      setLoading(true);

      const { data } = await login({
        email: email.trim(),
        password,
      });

      if (!data.success) {
        setErrors({
          general: data.message || "Login failed",
        });

        return;
      }

      // Save login information
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      // Login successful
      navigate("/");
    } catch (requestError) {
      console.error("Login Error:", requestError);

      const backendErrors = requestError.response?.data?.errors;

      if (backendErrors) {
        const formattedErrors = {};

        backendErrors.forEach((error) => {
          formattedErrors[error.path] = error.msg;
        });

        setErrors(formattedErrors);
      } else {
        setErrors({
          general: requestError.response?.data?.message || "Login failed",
        });
      }
    } finally {
      setLoading(false);
    }
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
              Login
            </h1>

            <div
              className="bg-dark"
              style={{
                width: "55px",
                height: "2px",
              }}
            ></div>
          </div>

          <form onSubmit={handleLogin}>
            {/* GENERAL ERROR */}
            {errors.general && (
              <div className="alert alert-danger rounded-0">
                {errors.general}
              </div>
            )}

            {/* EMAIL */}
            <div className="mb-4">
              <input
                type="email"
                className={`form-control rounded-0 border-dark px-3 ${
                  errors.email ? "is-invalid" : ""
                }`}
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  height: "62px",
                  fontSize: "23px",
                }}
              />

              {errors.email && (
                <div className="text-danger mt-1">{errors.email}</div>
              )}
            </div>

            {/* PASSWORD */}
            <div className="mb-3">
              <input
                type="password"
                className={`form-control rounded-0 border-dark px-3 ${
                  errors.password ? "is-invalid" : ""
                }`}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  height: "62px",
                  fontSize: "23px",
                }}
              />

              {errors.password && (
                <div className="text-danger mt-1">{errors.password}</div>
              )}
            </div>

            {/* FORGOT / CREATE ACCOUNT */}
            <div className="d-flex justify-content-between align-items-center mb-5">
              <button
                type="button"
                className="btn p-0 border-0 bg-transparent"
                style={{
                  fontSize: "20px",
                  color: "#111",
                }}
              >
                Forgot your password?
              </button>

              <button
                type="button"
                className="btn p-0 border-0 bg-transparent"
                style={{
                  fontSize: "20px",
                  color: "#111",
                }}
                onClick={handleCreateAccount}
              >
                Create account
              </button>
            </div>

            {/* SIGN IN */}
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
                {loading ? "Signing In..." : "Sign In"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Login;
