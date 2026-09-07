import { useNavigate } from "react-router-dom";
import { useState } from "react";

import add_icon from "../../../assets/back/add_icon.png";
import order_icon from "../../../assets/back/order_icon.png";
import file_person from "../../../assets/back/file_person.svg";
import file_text from "../../../assets/back/file_text.svg";
import gear from "../../../assets/back/gear.svg";

const Sidebar = () => {
  const navigate = useNavigate();

  const [active, setActive] = useState("Add Items");

  // =========================
  // HANDLE NAVIGATION
  // =========================
  const handleNavigation = (name, path) => {
    setActive(name);
    navigate(path);
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
                handleNavigation(
                  "Add Items",
                  "/AuthDashboard/AddProducts"
                )
              }
              className={`p-2 ps-3 border border-end-0 rounded-start d-flex align-items-center gap-2 ${
                active === "Add Items"
                  ? "bg-secondary text-white"
                  : "bg-white text-dark"
              }`}
              style={{
                cursor: "pointer",
              }}
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
                className="mb-0 d-none d-lg-block d-xl-block text-dark"
              >
                Add Items
              </p>
            </div>

            {/* =========================
                LIST ITEMS
            ========================= */}
            <div
              onClick={() =>
                handleNavigation(
                  "List Items",
                  "/AuthDashboard/ProductLists"
                )
              }
              className={`p-2 ps-3 border border-end-0 rounded-start d-flex align-items-center gap-2 ${
                active === "List Items"
                  ? "bg-secondary text-white"
                  : "bg-white text-dark"
              }`}
              style={{
                cursor: "pointer",
              }}
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
                className="mb-0 d-none d-lg-block d-xl-block text-dark"
              >
                List Items
              </p>
            </div>

            {/* =========================
                ORDERS
            ========================= */}
            <div
              onClick={() =>
                handleNavigation(
                  "Orders",
                  "/AuthDashboard/Orders"
                )
              }
              className={`p-2 ps-3 border border-end-0 rounded-start d-flex align-items-center gap-2 ${
                active === "Orders"
                  ? "bg-secondary text-white"
                  : "bg-white text-dark"
              }`}
              style={{
                cursor: "pointer",
              }}
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
                className="mb-0 d-none d-lg-block d-xl-block text-dark"
              >
                Orders
              </p>
            </div>

            {/* =========================
                USERS
            ========================= */}
            <div
              onClick={() =>
                handleNavigation(
                  "Users",
                  "/AuthDashboard/UserLists"
                )
              }
              className={`p-2 ps-3 border border-end-0 rounded-start d-flex align-items-center gap-2 ${
                active === "Users"
                  ? "bg-secondary text-white"
                  : "bg-white text-dark"
              }`}
              style={{
                cursor: "pointer",
              }}
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
                className="mb-0 d-none d-lg-block d-xl-block text-dark"
              >
                Users
              </p>
            </div>

            {/* =========================
                SETTINGS
            ========================= */}
            <div
              onClick={() =>
                handleNavigation(
                  "Settings",
                  "/AuthDashboard/AdminSettings"
                )
              }
              className={`p-2 ps-3 border border-end-0 rounded-start d-flex align-items-center gap-2 ${
                active === "Settings"
                  ? "bg-secondary text-white"
                  : "bg-white text-dark"
              }`}
              style={{
                cursor: "pointer",
              }}
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
                className="mb-0 d-none d-lg-block d-xl-block text-dark"
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