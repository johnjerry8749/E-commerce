import { useNavigate, useLocation } from "react-router-dom";

import add_icon from "../../../assets/back/add_icon.png";
import order_icon from "../../../assets/back/order_icon.png";
import file_person from "../../../assets/back/file_person.svg";
import file_text from "../../../assets/back/file_text.svg";
import gear from "../../../assets/back/gear.svg";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // =========================
  // HANDLE NAVIGATION
  // =========================
  const handleNavigation = (path) => {
    navigate(path);
  };

  // =========================
  // CHECK ACTIVE ROUTE
  // =========================
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="sidebar">
      <div className="ms-0 mt-4">
        <div className="ms-2">
          <div className="d-flex flex-column gap-3">

            {/* =========================
                ADD ITEMS
            ========================= */}
            <div
              onClick={() =>
                handleNavigation("/AuthDashboard/AddProducts")
              }
              className={`p-2 ps-3 border border-end-0 rounded-start d-flex align-items-center gap-2 ${
                isActive("/AuthDashboard/AddProducts")
                  ? "bg-secondary text-white"
                  : "bg-white text-dark"
              }`}
              style={{ cursor: "pointer" }}
            >
              <img
                src={add_icon}
                alt="Add Items"
                style={{
                  height: "20px",
                  width: "20px",
                }}
              />

              <p
                className={`mb-0 d-none d-lg-block d-xl-block ${
                  isActive("/AuthDashboard/AddProducts")
                    ? "text-white"
                    : "text-dark"
                }`}
              >
                Add Items
              </p>
            </div>

            {/* =========================
                LIST ITEMS
            ========================= */}
            <div
              onClick={() =>
                handleNavigation("/AuthDashboard/ProductLists")
              }
              className={`p-2 ps-3 border border-end-0 rounded-start d-flex align-items-center gap-2 ${
                isActive("/AuthDashboard/ProductLists")
                  ? "bg-secondary text-white"
                  : "bg-white text-dark"
              }`}
              style={{ cursor: "pointer" }}
            >
              <img
                src={file_text}
                alt="List Items"
                style={{
                  height: "20px",
                  width: "20px",
                }}
              />

              <p
                className={`mb-0 d-none d-lg-block d-xl-block ${
                  isActive("/AuthDashboard/ProductLists")
                    ? "text-white"
                    : "text-dark"
                }`}
              >
                List Items
              </p>
            </div>

            {/* =========================
                ORDERS
            ========================= */}
            <div
              onClick={() =>
                handleNavigation("/AuthDashboard/Orders")
              }
              className={`p-2 ps-3 border border-end-0 rounded-start d-flex align-items-center gap-2 ${
                isActive("/AuthDashboard/Orders")
                  ? "bg-secondary text-white"
                  : "bg-white text-dark"
              }`}
              style={{ cursor: "pointer" }}
            >
              <img
                src={order_icon}
                alt="Orders"
                style={{
                  height: "20px",
                  width: "20px",
                }}
              />

              <p
                className={`mb-0 d-none d-lg-block d-xl-block ${
                  isActive("/AuthDashboard/Orders")
                    ? "text-white"
                    : "text-dark"
                }`}
              >
                Orders
              </p>
            </div>

            {/* =========================
                USERS
            ========================= */}
            <div
              onClick={() =>
                handleNavigation("/AuthDashboard/UserLists")
              }
              className={`p-2 ps-3 border border-end-0 rounded-start d-flex align-items-center gap-2 ${
                isActive("/AuthDashboard/UserLists")
                  ? "bg-secondary text-white"
                  : "bg-white text-dark"
              }`}
              style={{ cursor: "pointer" }}
            >
              <img
                src={file_person}
                alt="Users"
                style={{
                  height: "20px",
                  width: "20px",
                }}
              />

              <p
                className={`mb-0 d-none d-lg-block d-xl-block ${
                  isActive("/AuthDashboard/UserLists")
                    ? "text-white"
                    : "text-dark"
                }`}
              >
                Users
              </p>
            </div>

            {/* =========================
                SETTINGS
            ========================= */}
            <div
              onClick={() =>
                handleNavigation("/AuthDashboard/AdminSettings")
              }
              className={`p-2 ps-3 border border-end-0 rounded-start d-flex align-items-center gap-2 ${
                isActive("/AuthDashboard/AdminSettings")
                  ? "bg-secondary text-white"
                  : "bg-white text-dark"
              }`}
              style={{ cursor: "pointer" }}
            >
              <img
                src={gear}
                alt="Settings"
                style={{
                  height: "20px",
                  width: "20px",
                }}
              />

              <p
                className={`mb-0 d-none d-lg-block d-xl-block ${
                  isActive("/AuthDashboard/AdminSettings")
                    ? "text-white"
                    : "text-dark"
                }`}
              >
                Settings
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;