import { useNavigate } from "react-router-dom";
import add_icon from "../../../assets/back/add_icon.png";
import order_icon from "../../../assets/back/order_icon.png";
import { useState } from "react";

const Sidebar = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState("Add Items");

  const AddProductpage = () => {
    navigate("/AddProducts");
  };

  const OrderListpage = () => {
    navigate("/AddProducts");
  };

  const Orderpage = () => {
    navigate("/AddProducts");
  };

  return (
    <div className="sidebar">
      <div className="ms-4 mt-4">
        <div className="ms-3">
          <div className="d-flex flex-column gap-3">
            {/* ADD ITEMS */}
            <div
              onClick={() => setActive("Add Items")}
              className={`p-2 ps-3 border border-end-0 rounded-start d-flex align-items-center gap-2 ${
                active === "Add Items"
                  ? "bg-secondary text-white"
                  : "bg-white text-dark"
              }`}
              style={{ cursor: "pointer" }}
              onclick={AddProductpage}
            >
              <img
                src={add_icon}
                alt="Add Items"
                style={{
                  height: "20px",
                  width: "20px",
                }}
              />

              <p className="mb-0 d-none d-lg-block text-dark d-xl-block">Add Items</p>
            </div>

            {/* LIST ITEMS */}
            <div
              onClick={() => setActive("List Items")}
              className={`p-2 ps-3 border border-end-0 rounded-start d-flex align-items-center gap-2 ${
                active === "List Items"
                  ? "bg-secondary text-white"
                  : "bg-white text-dark"
              }`}
              style={{ cursor: "pointer" }}
              onclick={OrderListpage}
            >
              <img
                src={order_icon}
                alt="List Items"
                style={{
                  height: "20px",
                  width: "20px",
                }}
              />

              <p className="mb-0 d-none d-lg-block text-dark d-xl-block">List Items</p>
            </div>

            {/* ORDERS */}
            <div
              onClick={() => setActive("Orders")}
              className={`p-2 ps-3 border border-end-0 rounded-start d-flex align-items-center gap-2 ${
                active === "Orders"
                  ? "bg-secondary text-white"
                  : "bg-white text-dark"
              }`}
              style={{ cursor: "pointer" }}
              onclick={Orderpage}
            >
              <img
                src={order_icon}
                alt="Orders"
                style={{
                  height: "20px",
                  width: "20px",
                }}
              />

              <p className="mb-0 d-none text-dark d-lg-block d-xl-block">Orders</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
