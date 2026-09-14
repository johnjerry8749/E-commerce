import { useEffect, useState } from "react";

import Footer from "../common/Footer";
import Navbar from "../common/Navbar";

import { useCart } from "../context/CartContext";

import { getMe } from "../services/userServices";
import { placeOrder } from "../services/ordersService";

const Checkout = () => {
  const { cartItems, totalPrice, clearCart } = useCart();

  // ==========================================
  // FORM DATA
  // ==========================================
  const [formData, setFormData] = useState({
    FullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    country: "Nigeria",
  });

  // ==========================================
  // STATES
  // ==========================================
  const [loadingUser, setLoadingUser] = useState(true);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  // ==========================================
  // SHIPPING
  // ==========================================
  // The backend calculates the real shipping fee
  // from the database.
  const shippingFee = cartItems.length > 0 ? 10 : 0;
  const total = Number(totalPrice) + shippingFee;

  // ==========================================
  // LOAD LOGGED-IN USER
  // ==========================================
  useEffect(() => {
    const loadUser = async () => {
      try {
        setLoadingUser(true);
        setError("");

        const response = await getMe();

        console.log("Logged-in user:", response);

        const user =
          response?.data?.user ||
          response?.user ||
          response?.data ||
          response;

        setFormData((prev) => ({
          ...prev,

          FullName:
            user?.name ||
            user?.FullName ||
            user?.fullName ||
            "",

          email: user?.email || "",

          phone:
            user?.phone ||
            user?.phone_number ||
            "",

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

  // ==========================================
  // HANDLE INPUT
  // ==========================================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setFieldErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    setError("");
    setSuccess("");
  };

  // ==========================================
  // VALIDATE FORM
  // ==========================================
  const validateForm = () => {
    const errors = {};

    // Full name
    if (!formData.FullName.trim()) {
      errors.FullName = "Full name is required.";
    }

    // Email
    if (!formData.email.trim()) {
      errors.email = "Email address is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formData.email.trim()
      )
    ) {
      errors.email = "Please enter a valid email address.";
    }

    // Phone
    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required.";
    }

    // Address
    if (!formData.address.trim()) {
      errors.address = "Delivery address is required.";
    }

    // City
    if (!formData.city.trim()) {
      errors.city = "City is required.";
    }

    // State
    if (!formData.state.trim()) {
      errors.state = "State is required.";
    }

    // Country
    if (!formData.country.trim()) {
      errors.country = "Country is required.";
    }

    setFieldErrors(errors);

    return Object.keys(errors).length === 0;
  };

  // ==========================================
  // PLACE ORDER
  // ==========================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // ========================================
    // CHECK CART
    // ========================================
    if (
      !Array.isArray(cartItems) ||
      cartItems.length === 0
    ) {
      setError("Your cart is empty.");
      return;
    }

    // ========================================
    // VALIDATE CHECKOUT FORM
    // ========================================
    if (!validateForm()) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      setPlacingOrder(true);

      // ========================================
      // PREPARE CART ITEMS
      // ========================================
      const items = cartItems.map((item) => ({
        product_id: Number(item.product_id || item.id),
        quantity: Number(item.quantity),
        size: item.size || null,
      }));

      // ========================================
      // PREPARE SHIPPING ADDRESS
      // ========================================
      const shippingAddress = {
        address: formData.address.trim(),
        city: formData.city.trim(),
        state: formData.state.trim(),
        country: formData.country.trim(),
      };

      // ========================================
      // ORDER DATA
      // ========================================
      const orderData = {
        items,

        // IMPORTANT:
        // Phone must be outside shippingAddress
        // because the backend expects req.body.phone
        phone: formData.phone.trim(),

        shippingAddress,

        paymentMethod: "COD",
      };

      console.log(
        "ORDER DATA SENT TO BACKEND:",
        orderData
      );

      // ========================================
      // SEND ORDER TO BACKEND
      // ========================================
      const response = await placeOrder(orderData);

      console.log("ORDER RESPONSE:", response);

      // ========================================
      // CLEAR FRONTEND CART
      // ========================================
      clearCart();

      // ========================================
      // SUCCESS MESSAGE
      // ========================================
      setSuccess(
        response?.message ||
          "Your order has been placed successfully."
      );
    } catch (err) {
      console.error("PLACE ORDER ERROR:", err);

      setError(
        err?.response?.data?.message ||
          err?.response?.data?.error ||
          "Unable to place your order. Please try again."
      );
    } finally {
      setPlacingOrder(false);
    }
  };

  // ==========================================
  // RENDER
  // ==========================================
  return (
    <div>
      <Navbar />

      <div className="container-fluid px-3 px-md-4 px-lg-5 py-4 py-md-5">

        {/* PAGE TITLE */}
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
            />
          </div>

          <p className="text-muted mt-2 mb-0">
            Complete your details to place your order.
          </p>
        </div>

        {/* ERROR */}
        {error && (
          <div className="alert alert-danger rounded-0">
            {error}
          </div>
        )}

        {/* SUCCESS */}
        {success && (
          <div className="alert alert-success rounded-0">
            {success}
          </div>
        )}

        <div className="row g-4 align-items-start">

          {/* =====================================
              LEFT SIDE
          ====================================== */}
          <div className="col-12 col-lg-7">
            <div className="border p-3 p-md-4">

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
                />
              </div>

              <form
                onSubmit={handleSubmit}
                noValidate
              >
                <div className="row g-3">

                  {/* FULL NAME */}
                  <div className="col-12">
                    <label className="form-label fw-semibold">
                      Full Name
                    </label>

                    <input
                      type="text"
                      name="FullName"
                      value={formData.FullName}
                      onChange={handleChange}
                      className={`form-control rounded-0 py-2 ${
                        fieldErrors.FullName
                          ? "is-invalid"
                          : ""
                      }`}
                      placeholder="Enter full name"
                    />

                    {fieldErrors.FullName && (
                      <div className="invalid-feedback">
                        {fieldErrors.FullName}
                      </div>
                    )}
                  </div>

                  {/* EMAIL */}
                  <div className="col-12">
                    <label className="form-label fw-semibold">
                      Email Address
                    </label>

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`form-control rounded-0 py-2 ${
                        fieldErrors.email
                          ? "is-invalid"
                          : ""
                      }`}
                      placeholder="Enter email address"
                    />

                    {fieldErrors.email && (
                      <div className="invalid-feedback">
                        {fieldErrors.email}
                      </div>
                    )}
                  </div>

                  {/* PHONE */}
                  <div className="col-12">
                    <label className="form-label fw-semibold">
                      Phone Number
                    </label>

                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`form-control rounded-0 py-2 ${
                        fieldErrors.phone
                          ? "is-invalid"
                          : ""
                      }`}
                      placeholder="Enter phone number"
                    />

                    {fieldErrors.phone && (
                      <div className="invalid-feedback">
                        {fieldErrors.phone}
                      </div>
                    )}
                  </div>

                  {/* ADDRESS */}
                  <div className="col-12">
                    <label className="form-label fw-semibold">
                      Delivery Address
                    </label>

                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className={`form-control rounded-0 ${
                        fieldErrors.address
                          ? "is-invalid"
                          : ""
                      }`}
                      rows="3"
                      placeholder="Enter your full delivery address"
                    />

                    {fieldErrors.address && (
                      <div className="invalid-feedback">
                        {fieldErrors.address}
                      </div>
                    )}
                  </div>

                  {/* CITY */}
                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold">
                      City
                    </label>

                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={`form-control rounded-0 py-2 ${
                        fieldErrors.city
                          ? "is-invalid"
                          : ""
                      }`}
                      placeholder="Enter city"
                    />

                    {fieldErrors.city && (
                      <div className="invalid-feedback">
                        {fieldErrors.city}
                      </div>
                    )}
                  </div>

                  {/* STATE */}
                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold">
                      State
                    </label>

                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className={`form-control rounded-0 py-2 ${
                        fieldErrors.state
                          ? "is-invalid"
                          : ""
                      }`}
                      placeholder="Enter state"
                    />

                    {fieldErrors.state && (
                      <div className="invalid-feedback">
                        {fieldErrors.state}
                      </div>
                    )}
                  </div>

                  {/* COUNTRY */}
                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold">
                      Country
                    </label>

                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className={`form-select rounded-0 py-2 ${
                        fieldErrors.country
                          ? "is-invalid"
                          : ""
                      }`}
                    >
                      <option value="Nigeria">
                        Nigeria
                      </option>
                    </select>

                    {fieldErrors.country && (
                      <div className="invalid-feedback">
                        {fieldErrors.country}
                      </div>
                    )}
                  </div>
                </div>

                {/* PAYMENT */}
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
                        value="COD"
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

                {/* PLACE ORDER */}
                <div className="mt-4">
                  <button
                    type="submit"
                    className="btn btn-dark rounded-0 py-3 px-4 w-100"
                    disabled={
                      placingOrder ||
                      loadingUser
                    }
                  >
                    {loadingUser
                      ? "LOADING..."
                      : placingOrder
                        ? "PLACING ORDER..."
                        : "PLACE ORDER"}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* =====================================
              RIGHT SIDE
          ====================================== */}
          <div className="col-12 col-lg-5">
            <div className="border p-3 p-md-4">

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
                />
              </div>

              {/* CART ITEMS */}
              <div>
                {cartItems.length === 0 ? (
                  <div className="text-center py-4">
                    <p className="text-muted mb-0">
                      Your cart is empty.
                    </p>
                  </div>
                ) : (
                  cartItems.map((item, index) => (
                    <div
                      key={`${item.id}-${item.size || "no-size"}-${index}`}
                      className="d-flex align-items-center gap-3 border-bottom py-3"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{
                          width: "65px",
                          height: "75px",
                          objectFit: "cover",
                        }}
                      />

                      <div className="flex-grow-1">
                        <h6 className="mb-1">
                          {item.name}
                        </h6>

                        <div className="d-flex gap-2 flex-wrap">
                          <small className="text-muted">
                            Size:{" "}
                            {item.size || "N/A"}
                          </small>

                          <small className="text-muted">
                            Qty: {item.quantity}
                          </small>
                        </div>

                        <p className="mb-0 mt-1">
                          ₦ {Number(item.price).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* TOTALS */}
              <div className="mt-3">

                <div className="d-flex justify-content-between py-2">
                  <span className="text-muted">
                    Subtotal
                  </span>

                  <span>
                    ₦ {Number(totalPrice).toFixed(2)}
                  </span>
                </div>

                <div className="d-flex justify-content-between py-2 border-bottom">
                  <span className="text-muted">
                    Shipping
                  </span>

                  <span>
                    ₦ {shippingFee.toFixed(2)}
                  </span>
                </div>

                <div className="d-flex justify-content-between align-items-center py-3">
                  <span className="fw-bold fs-5">
                    Total
                  </span>

                  <span className="fw-bold fs-5">
                    ₦ {total.toFixed(2)}
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

