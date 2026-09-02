import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Logo from "../../assets/front/logo.png";
import { useCart } from "../context/CartContext";

import cart_icon from "../../assets/front/cart_icon.png";
import user_icon from "../../assets/front/profile_icon.png";
import search_icon from "../../assets/front/search_icon.png";
import menu_icon from "../../assets/front/menu_icon.png";

const Navbar = () => {
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // CHECK IF USER IS LOGGED IN
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");

    try {
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      return null;
    }
  });

  // TOGGLE MOBILE MENU
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // CART PAGE
  const Cartpage = () => {
    navigate("/Cart");
  };

  // LOGIN / PROFILE PAGE
  const Userpage = () => {
    if (user) {
      navigate("/Profile");
    } else {
      navigate("/Login");
    }
  };

  return (
    <>
      {/* =========================
          TOP INFO BAR
      ========================== */}
      <div className="bg-danger text-light text-end">
        <div className="container-fluid">
          <div className="d-flex justify-content-end align-items-center gap-3 pe-3">
            <p className="mb-0">+1234567890</p>
            <p className="mb-0">support@yourstore.com</p>
          </div>
        </div>
      </div>

      {/* =========================
          MAIN NAVBAR
      ========================== */}
      <div className="bg-white">
        <div className="container">
          <div className="row align-items-center">
            {/* =========================
                LOGO
            ========================== */}
            <div className="col-5 col-md-4 col-lg-3 py-3">
              <div className="image-container ps-2 mt-2">
                <img
                  src={Logo}
                  alt="logo"
                  className="img-fluid"
                  style={{
                    width: "200px",
                    height: "auto",
                  }}
                />
              </div>
            </div>

            {/* =========================
                DESKTOP NAVIGATION
            ========================== */}
            <div className="col-lg-6 d-none d-lg-block">
              <div className="Navbar-links d-flex gap-4 p-4 justify-content-center fs-5">
                <Link to="/" className="text-decoration-none text-dark">
                  Home
                </Link>

                <Link
                  to="/Collections"
                  className="text-decoration-none text-dark"
                >
                  Collection
                </Link>

                <Link to="/About" className="text-decoration-none text-dark">
                  About
                </Link>

                <Link to="/Contact" className="text-decoration-none text-dark">
                  Contact
                </Link>
              </div>
            </div>

            {/* =========================
                RIGHT ICONS
            ========================== */}
            <div className="col-7 col-md-8 col-lg-3 d-flex gap-3 p-2 justify-content-end align-items-center">
              {/* SEARCH */}
              <div className="image-container">
                <img
                  src={search_icon}
                  alt="search"
                  style={{
                    width: "25px",
                    height: "auto",
                    cursor: "pointer",
                  }}
                  onClick={() => navigate("/Search")}
                />
              </div>

              {/* =========================
                  USER / PROFILE
              ========================== */}
              <div className="image-container">
                {user ? (
                  // LOGGED IN - PROFILE CIRCLE
                  <div
                    className="d-flex justify-content-center align-items-center rounded-circle"
                    style={{
                      width: "32px",
                      height: "32px",
                      backgroundColor: "#246BCE",
                      color: "white",
                      cursor: "pointer",
                      fontSize: "13px",
                      fontWeight: "600",
                      textTransform: "uppercase",
                    }}
                    onClick={Userpage}
                  >
                    {user.name
                      ?.split(" ")
                      .map((word) => word[0])
                      .join("")
                      .slice(0, 2)}
                  </div>
                ) : (
                  // NOT LOGGED IN - USER ICON
                  <img
                    src={user_icon}
                    alt="Login"
                    style={{
                      width: "25px",
                      height: "auto",
                      cursor: "pointer",
                    }}
                    onClick={Userpage}
                  />
                )}
              </div>

              {/* =========================
                  CART
              ========================== */}
              <div
                className="image-container position-relative"
                onClick={Cartpage}
                style={{ cursor: "pointer" }}
              >
                <img
                  src={cart_icon}
                  alt="cart"
                  style={{
                    width: "25px",
                    height: "auto",
                  }}
                />

                {cartCount > 0 && (
                  <div
                    className="position-absolute top-0 start-100 translate-middle badge rounded-circle bg-danger"
                    style={{
                      fontSize: "10px",
                      minWidth: "18px",
                      minHeight: "18px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {cartCount}
                  </div>
                )}
              </div>

              {/* =========================
                  MOBILE MENU ICON
              ========================== */}
              <div className="image-container d-lg-none">
                <img
                  src={menu_icon}
                  alt="menu"
                  style={{
                    width: "25px",
                    height: "auto",
                    cursor: "pointer",
                  }}
                  onClick={toggleMenu}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================
          MOBILE SIDEBAR
      ========================== */}
      {isMenuOpen && (
        <>
          {/* OVERLAY */}
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 999,
            }}
            onClick={toggleMenu}
          />

          {/* SIDEBAR */}
          <div
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              height: "100vh",
              width: "70%",
              maxWidth: "350px",
              backgroundColor: "white",
              boxShadow: "-2px 0 5px rgba(0,0,0,0.1)",
              zIndex: 1000,
              padding: "20px",
              overflowY: "auto",
              animation: "slideInRight 0.3s ease-in-out",
            }}
          >
            {/* =========================
                CLOSE BUTTON
            ========================== */}
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="mb-0">Menu</h5>

              <button
                onClick={toggleMenu}
                className="btn border-0 bg-transparent"
                style={{
                  fontSize: "28px",
                  cursor: "pointer",
                  color: "#333",
                }}
              >
                ✕
              </button>
            </div>

            {/* =========================
                MOBILE MENU LINKS
            ========================== */}
            <div className="d-flex flex-column gap-3">
              <Link
                to="/"
                className="text-decoration-none text-dark"
                style={{
                  fontSize: "18px",
                  fontWeight: "500",
                }}
                onClick={toggleMenu}
              >
                Home
              </Link>

              <Link
                to="/Collections"
                className="text-decoration-none text-dark"
                style={{
                  fontSize: "18px",
                  fontWeight: "500",
                }}
                onClick={toggleMenu}
              >
                Collection
              </Link>

              <Link
                to="/About"
                className="text-decoration-none text-dark"
                style={{
                  fontSize: "18px",
                  fontWeight: "500",
                }}
                onClick={toggleMenu}
              >
                About
              </Link>

              <Link
                to="/Contact"
                className="text-decoration-none text-dark"
                style={{
                  fontSize: "18px",
                  fontWeight: "500",
                }}
                onClick={toggleMenu}
              >
                Contact
              </Link>

              {/* =========================
                  MOBILE PROFILE / LOGIN
              ========================== */}
              <button
                type="button"
                className="btn text-start p-0 border-0 bg-transparent"
                style={{
                  fontSize: "18px",
                  fontWeight: "500",
                }}
                onClick={() => {
                  toggleMenu();

                  if (user) {
                    navigate("/Profile");
                  } else {
                    navigate("/Login");
                  }
                }}
              >
                {user ? "Profile" : "Login"}
              </button>
            </div>
          </div>

          {/* =========================
              CSS ANIMATION
          ========================== */}
          <style>{`
            @keyframes slideInRight {
              from {
                transform: translateX(100%);
              }

              to {
                transform: translateX(0);
              }
            }
          `}</style>
        </>
      )}
    </>
  );
};

export default Navbar;
