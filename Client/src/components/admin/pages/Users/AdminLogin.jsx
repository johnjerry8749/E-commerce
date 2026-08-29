import { useState } from "react";
import {useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


   const handleAdminLogin =()=>{
    navigate('/AuthDashboard')
   }
  return (
    <div>
      {/* <Navbar /> */}

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
              Admin Login
            </h1>

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

          {/* SIGN IN */}
          <div className="d-flex justify-content-center">
            <button
              type="button"
              className="btn btn-dark rounded-0 px-5 py-3"
              style={{
                width: "166px",
                height: "61px",
                fontSize: "20px",
              }}
            onClick={handleAdminLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default AdminLogin;
