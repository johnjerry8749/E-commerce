import { useEffect, useState } from "react";
import Footer from "../common/Footer";
import Navbar from "../common/Navbar";
import { useCart } from "../context/CartContext";
import { getMe } from "../services/userServices";

const Checkout = () => {
  const { cartItems, totalPrice } = useCart();

  // =========================
  // FORM DATA
  // =========================
  const [formData, setFormData] = useState({
    FullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    country: "Nigeria",
  });

  const [loadingUser, setLoadingUser] = useState(true);
  const [error, setError] = useState("");

  // =========================
  // TOTALS
  // =========================
  const shippingFee = cartItems.length > 0 ? 10 : 0;
  const total = totalPrice + shippingFee;

  // =========================
  // GET LOGGED-IN USER
  // =========================
  useEffect(() => {
    const loadUser = async () => {
      try {
        setLoadingUser(true);
        setError("");

        const response = await getMe();

        console.log("Logged-in user:", response);

        // Handles common API response formats
        const user = response?.data?.user || response?.data || response;

        setFormData((prev) => ({
          ...prev,
          FullName:
            user?.FullName ||
            user?.fullName ||
            user?.name ||
            "",
          email: user?.email || "",
          phone: user?.phone || "",
          address: user?.address || "",
          city: user?.city || "",
          state: user?.state || "",
          country: user?.country || "Nigeria",
        }));
      } catch (err) {
        console.error("Failed to load user:", err);

        setError(
          err?.response?.data?.message ||
          "Unable to load your account information."
        );
      } finally {
        setLoadingUser(false);
      }
    };

    loadUser();
  }, []);

  // =========================
  // HANDLE INPUT
  // =========================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // PLACE ORDER
  // =========================
  const handleSubmit = (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    console.log("Checkout Details:", formData);
    console.log("Cart Items:", cartItems);
    console.log("Total:", total);

    // Add your create order API here
  };

  return (
    <div>
      <Navbar />

      {/* =========================
          CHECKOUT CONTAINER
      ========================= */}
      <div className="container-fluid px-3 px-md-4 px-lg-5 py-4 py-md-5">

        {/* =========================
            PAGE TITLE
        ========================= */}
        <div className="mb-4">
          <div className="d-flex align-items-center gap-2">
            <h2 className="mb-0 fw-normal text-muted">
              CHECK
              <span className="text-dark">OUT</span>
            </h2>

            <div
              className="bg-dark"
              style={{
                width: "45px",
                height: "2px",
              }}
            ></div>
          </div>

          <p className="text-muted mt-2 mb-0">
            Complete your details to place your order.
          </p>
        </div>

        {/* =========================
            ERROR MESSAGE
        ========================= */}
        {error && (
          <div className="alert alert-danger rounded-0">
            {error}
          </div>
        )}

        {/* =========================
            MAIN CHECKOUT ROW
        ========================= */}
        <div className="row g-4 align-items-start">

          {/* ==================================================
              LEFT SIDE - BILLING INFORMATION
          ================================================== */}
          <div className="col-12 col-lg-7">

            <div className="border p-3 p-md-4">

              {/* TITLE */}
              <div className="mb-4">
                <h4 className="fw-normal mb-1">
                  Billing Information
                </h4>

                <div
                  className="bg-dark"
                  style={{
                    width: "40px",
                    height: "2px",
                  }}
                ></div>
              </div>

              <form onSubmit={handleSubmit}>

                <div className="row g-3">

                  {/* =========================
                      FULL NAME
                  ========================= */}
                  <div className="col-12">
                    <label className="form-label fw-semibold">
                      Full Name
                    </label>

                    <input
                      type="text"
                      name="FullName"
                      value={formData.FullName}
                      onChange={handleChange}
                      className="form-control rounded-0 py-2"
                      placeholder="Enter full name"
                      required
                    />
                  </div>

                  {/* =========================
                      EMAIL
                  ========================= */}
                  <div className="col-12">
                    <label className="form-label fw-semibold">
                      Email Address
                    </label>

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-control rounded-0 py-2"
                      placeholder="Enter email address"
                      required
                    />
                  </div>

                  {/* =========================
                      PHONE
                  ========================= */}
                  <div className="col-12">
                    <label className="form-label fw-semibold">
                      Phone Number
                    </label>

                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="form-control rounded-0 py-2"
                      placeholder="Enter phone number"
                      required
                    />
                  </div>

                  {/* =========================
                      ADDRESS
                  ========================= */}
                  <div className="col-12">
                    <label className="form-label fw-semibold">
                      Delivery Address
                    </label>

                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="form-control rounded-0"
                      rows="3"
                      placeholder="Enter your full delivery address"
                      required
                    ></textarea>
                  </div>

                  {/* =========================
                      CITY
                  ========================= */}
                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold">
                      City
                    </label>

                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="form-control rounded-0 py-2"
                      placeholder="Enter city"
                      required
                    />
                  </div>

                  {/* =========================
                      STATE
                  ========================= */}
                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold">
                      State
                    </label>

                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className="form-control rounded-0 py-2"
                      placeholder="Enter state"
                      required
                    />
                  </div>

                  {/* =========================
                      COUNTRY
                  ========================= */}
                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold">
                      Country
                    </label>

                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="form-select rounded-0 py-2"
                    >
                      <option value="Nigeria">
                        Nigeria
                      </option>
                    </select>
                  </div>

                </div>

                {/* =========================
                    PAYMENT
                ========================= */}
                <div className="mt-4 border-top pt-4">

                  <h5 className="fw-normal mb-3">
                    Payment Method
                  </h5>

                  <div className="border p-3">

                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="paymentMethod"
                        id="cashOnDelivery"
                        defaultChecked
                      />

                      <label
                        className="form-check-label fw-semibold"
                        htmlFor="cashOnDelivery"
                      >
                        Cash on Delivery
                      </label>
                    </div>

                    <small className="text-muted d-block mt-2">
                      Pay when your order is delivered.
                    </small>

                  </div>

                </div>

                {/* =========================
                    PLACE ORDER
                ========================= */}
                <div className="mt-4">

                  <button
                    type="submit"
                    className="btn btn-dark rounded-0 py-3 px-4 w-100"
                    disabled={
                      cartItems.length === 0 ||
                      loadingUser
                    }
                  >
                    {loadingUser
                      ? "LOADING..."
                      : "PLACE ORDER"}
                  </button>

                </div>

              </form>
            </div>
          </div>

          {/* ==================================================
              RIGHT SIDE - ORDER SUMMARY
          ================================================== */}
          <div className="col-12 col-lg-5">

            <div className="border p-3 p-md-4">

              {/* TITLE */}
              <div className="d-flex align-items-center gap-2 mb-4">

                <h4 className="mb-0 fw-normal text-muted">
                  YOUR
                  <span className="text-dark">
                    {" "}ORDER
                  </span>
                </h4>

                <div
                  className="bg-dark flex-shrink-0"
                  style={{
                    width: "40px",
                    height: "2px",
                  }}
                ></div>

              </div>

              {/* =========================
                  CART ITEMS
              ========================= */}
              <div>

                {cartItems.length === 0 ? (
                  <div className="text-center py-4">
                    <p className="text-muted mb-0">
                      Your cart is empty.
                    </p>
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="d-flex align-items-center gap-3 border-bottom py-3"
                    >

                      {/* IMAGE */}
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{
                          width: "65px",
                          height: "75px",
                          objectFit: "cover",
                        }}
                      />

                      {/* DETAILS */}
                      <div className="flex-grow-1">

                        <h6 className="mb-1">
                          {item.name}
                        </h6>

                        <div className="d-flex gap-2 flex-wrap">

                          <small className="text-muted">
                            Size: {item.size || "L"}
                          </small>

                          <small className="text-muted">
                            Qty: {item.quantity}
                          </small>

                        </div>

                        <p className="mb-0 mt-1">
                          $ {Number(item.price).toFixed(2)}
                        </p>

                      </div>

                    </div>
                  ))
                )}

              </div>

              {/* =========================
                  TOTALS
              ========================= */}
              <div className="mt-3">

                <div className="d-flex justify-content-between py-2">
                  <span className="text-muted">
                    Subtotal
                  </span>

                  <span>
                    $ {totalPrice.toFixed(2)}
                  </span>
                </div>

                <div className="d-flex justify-content-between py-2 border-bottom">
                  <span className="text-muted">
                    Shipping
                  </span>

                  <span>
                    $ {shippingFee.toFixed(2)}
                  </span>
                </div>

                <div className="d-flex justify-content-between align-items-center py-3">

                  <span className="fw-bold fs-5">
                    Total
                  </span>

                  <span className="fw-bold fs-5">
                    $ {total.toFixed(2)}
                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Checkout;

