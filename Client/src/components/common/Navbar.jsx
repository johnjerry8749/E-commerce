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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const Cartpage = () => {
    navigate("/Cart");
  };

  const Loginpage = () => {
    navigate("/Login");
  };
  return (
    <>
      {/* Top Info Bar */}
      <div className="bg-danger text-light text-right">
        <div className="col-12">
          <p className="mb-0 ps-3">+1234567890</p>
          <p className="mb-0 ps-3">support@yourstore.com</p>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="bg-white row d-flex justify-content-center align-items-center m-auto mt-0">
        <div className="container">
          <div className="row align-items-center d-flex gap-3 pe-2 justify-content-center">
            {/* Logo */}
            <div className="col-3 py-3">
              <div className="image-container ps-2 mt-2">
                <img
                  src={Logo}
                  alt="logo"
                  style={{ width: "200px", height: "auto" }}
                />
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="col-4 fs-4">
              <div className="Navbar-links d-none gap-4 p-4 justify-content-start d-md-none d-lg-flex">
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

            {/* Right Icons */}
            <div className="col-3 d-flex gap-3 p-2 ps-3 justify-content-end">
              <div className="image-container ps-2 mt-2">
                <img
                  src={search_icon}
                  alt="search"
                  style={{ width: "25px", height: "auto", cursor: "pointer" }}
                />
              </div>
              <div className="image-container ps-2 mt-2">
                <img
                  src={user_icon}
                  alt="user"
                  style={{ width: "25px", height: "auto", cursor: "pointer" }}
                  onClick={Loginpage}
                />
              </div>
              <div className="image-container ps-2 mt-2">
                <img
                  src={cart_icon}
                  alt="cart"
                  style={{ width: "25px", height: "auto", cursor: "pointer" }}
                  onClick={Cartpage}
                />
                {cartCount > 0 && (
                  <div className="border border-danger translate-middle badge rounded-circle bg-danger">
                    {cartCount}
                  </div>
                )}
              </div>
              {/* Mobile Menu Icon */}
              <div className="image-container ps-2 mt-2 d-lg-none d-md-flex">
                <img
                  src={menu_icon}
                  alt="menu"
                  style={{ width: "25px", height: "auto", cursor: "pointer" }}
                  onClick={toggleMenu}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {isMenuOpen && (
        <>
          {/* Overlay */}
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

          {/* Sidebar Menu */}
          <div
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              height: "100vh",
              width: "70%",
              backgroundColor: "white",
              boxShadow: "-2px 0 5px rgba(0,0,0,0.1)",
              zIndex: 1000,
              padding: "20px",
              overflowY: "auto",
              animation: "slideInRight 0.3s ease-in-out",
            }}
          >
            {/* Close Button */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "30px",
              }}
            >
              <h5 className="mb-0">Menu</h5>
              <button
                onClick={toggleMenu}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "28px",
                  cursor: "pointer",
                  color: "#333",
                }}
              >
                ✕
              </button>
            </div>

            {/* Menu Links */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "15px",
              }}
            >
              <Link
                to="/"
                className="text-decoration-none text-dark"
                style={{ fontSize: "18px", fontWeight: "500" }}
                onClick={toggleMenu}
              >
                Home
              </Link>
              <Link
                to="/"
                className="text-decoration-none text-dark"
                style={{ fontSize: "18px", fontWeight: "500" }}
                onClick={toggleMenu}
              >
                Collection
              </Link>
              <Link
                to="/"
                className="text-decoration-none text-dark"
                style={{ fontSize: "18px", fontWeight: "500" }}
                onClick={toggleMenu}
              >
                About
              </Link>
              <Link
                to="/"
                className="text-decoration-none text-dark"
                style={{ fontSize: "18px", fontWeight: "500" }}
                onClick={toggleMenu}
              >
                Contact
              </Link>
            </div>
          </div>

          {/* CSS Animation */}
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
