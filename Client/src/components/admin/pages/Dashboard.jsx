import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../Layout/AdminNavbar.jsx";
import Sidebar from "../Layout/Sidebar.jsx";
import upload_area from "../../../assets/back/upload_area.png";
import { createProduct } from "../../services/productServices.js";

const Dashboard = () => {
  const navigate = useNavigate();

  // =========================
  // IMAGES
  // =========================
  const [images, setImages] = useState({
    image1: null,
    image2: null,
    image3: null,
    image4: null,
  });

  const [preview, setPreview] = useState({
    image1: null,
    image2: null,
    image3: null,
    image4: null,
  });

  // =========================
  // FORM DATA
  // =========================
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "Men",
    subcategory: "Topwear",
    price: "",
    bestseller: false,
  });

  const [selectedSizes, setSelectedSizes] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const sizes = ["S", "M", "L", "XL", "XXL"];

  // =========================
  // HANDLE INPUTS
  // =========================
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // =========================
  // HANDLE IMAGE UPLOAD
  // =========================
  const handleImageChange = (e, key) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image must be less than 5MB.");
      return;
    }

    setImages((prev) => ({
      ...prev,
      [key]: file,
    }));

    setPreview((prev) => ({
      ...prev,
      [key]: URL.createObjectURL(file),
    }));

    // Remove image error after selecting image
    setErrors((prev) => ({
      ...prev,
      [key]: "",
    }));
  };

  // =========================
  // SELECT SIZE
  // =========================
  const toggleSize = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size)
        ? prev.filter((item) => item !== size)
        : [...prev, size],
    );

    setErrors((prev) => ({
      ...prev,
      sizes: "",
    }));
  };

  // =========================
  // VALIDATION
  // =========================
  const validate = () => {
    const newErrors = {};

    if (!images.image1) {
      newErrors.image1 = "Main image is required";
    }

    if (!images.image2) {
      newErrors.image2 = "At least 2 images are required";
    }

    if (!formData.name.trim()) {
      newErrors.name = "Product name is required";
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Product description is required";
    } else if (formData.description.trim().length < 10) {
      newErrors.description = "Description must be at least 10 characters";
    }

    if (!formData.price || Number(formData.price) <= 0) {
      newErrors.price = "Price must be greater than 0";
    }

    if (selectedSizes.length === 0) {
      newErrors.sizes = "Select at least one size";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // =========================
  // SUBMIT PRODUCT
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    setServerError("");

    // Validate form
    const isValid = validate();

    if (!isValid) {
      return;
    }

    setLoading(true);

    try {
      const data = new FormData();

      // =========================
      // IMAGES
      // =========================

      data.append("mainImage", images.image1);

      data.append("otherImages", images.image2);

      if (images.image3) {
        data.append("otherImages", images.image3);
      }

      if (images.image4) {
        data.append("otherImages", images.image4);
      }

      // =========================
      // PRODUCT INFORMATION
      // =========================

      data.append("name", formData.name.trim());

      data.append("description", formData.description.trim());

      data.append("category", formData.category);

      data.append("subcategory", formData.subcategory);

      data.append("price", formData.price);

      data.append("size", JSON.stringify(selectedSizes));

      data.append("bestseller", String(formData.bestseller));

      // =========================
      // SEND TO BACKEND
      // =========================

      const response = await createProduct(data);

      console.log("CREATE PRODUCT RESPONSE:", response.data);

      if (response.data?.success) {
        // alert("Product added successfully!");
        setSuccessMessage("Product added successfully!");

        // Reset form
        setImages({
          image1: null,
          image2: null,
          image3: null,
          image4: null,
        });

        setPreview({
          image1: null,
          image2: null,
          image3: null,
          image4: null,
        });

        setFormData({
          name: "",
          description: "",
          category: "Men",
          subcategory: "Topwear",
          price: "",
          bestseller: false,
        });

        setSelectedSizes([]);
        setErrors({});

        // Go to product list
        navigate("/ProductList");
      } else {
        setServerError(response.data?.message || "Failed to add product.");
      }
    } catch (error) {
      console.error("CREATE PRODUCT ERROR:", error);

      setServerError(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Unable to add product. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <AdminNavbar />

      <div className="row g-0">
        {/* SIDEBAR */}
        <div className="col-3 col-sm-3 col-md-3 col-lg-2">
          <Sidebar />
        </div>

        {/* CONTENT */}
        <div className="col-9 col-sm-9 col-md-9 col-lg-10 border-start border-3">
          <form onSubmit={handleSubmit} className="p-3 p-md-4">
            {/* =========================
                UPLOAD IMAGES
            ========================= */}
            <h5>Upload Images</h5>

            <p className="text-muted small">
              First image is the main image. At least 2 images are required.
            </p>

            <div className="d-flex gap-2 gap-md-3 flex-wrap mb-2">
              {["image1", "image2", "image3", "image4"].map((key, index) => (
                <label
                  key={key}
                  className="text-center"
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={preview[key] || upload_area}
                    alt={`Upload ${index + 1}`}
                    className="img-fluid"
                    style={{
                      height: "100px",
                      width: "100px",
                      objectFit: "cover",
                      borderStyle: "dotted",
                      borderWidth: "1.5px",
                      borderColor: errors[key] ? "red" : "#d1d5db",
                    }}
                  />

                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) => handleImageChange(e, key)}
                  />
                </label>
              ))}
            </div>

            {errors.image1 && (
              <div className="text-danger small mb-2">{errors.image1}</div>
            )}

            {errors.image2 && (
              <div className="text-danger small mb-2">{errors.image2}</div>
            )}

            {/* =========================
                PRODUCT NAME
            ========================= */}
            <div className="mt-4">
              <h5>Product Name</h5>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Type here..."
                className="form-control"
                style={{
                  maxWidth: "400px",
                }}
              />

              {errors.name && (
                <div className="text-danger small">{errors.name}</div>
              )}
            </div>

            {/* =========================
                DESCRIPTION
            ========================= */}
            <div className="mt-4">
              <h5>Product Description</h5>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Write content here..."
                rows="5"
                className="form-control"
                style={{
                  maxWidth: "400px",
                }}
              />

              {errors.description && (
                <div className="text-danger small">{errors.description}</div>
              )}
            </div>

            {/* =========================
                CATEGORY / SUBCATEGORY / PRICE
            ========================= */}
            <div
              className="mt-4"
              style={{
                maxWidth: "700px",
              }}
            >
              <div className="row g-3">
                {/* CATEGORY */}
                <div className="col-12 col-md-4">
                  <label className="form-label fs-5">Product Category</label>

                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="form-select form-select-lg"
                  >
                    <option value="Men">Men</option>

                    <option value="Women">Women</option>

                    <option value="Kids">Kids</option>
                  </select>
                </div>

                {/* SUBCATEGORY */}
                <div className="col-12 col-md-4">
                  <label className="form-label fs-5">Sub Category</label>

                  <select
                    name="subcategory"
                    value={formData.subcategory}
                    onChange={handleChange}
                    className="form-select form-select-lg"
                  >
                    <option value="Topwear">Topwear</option>

                    <option value="Bottomwear">Bottomwear</option>

                    <option value="Footwear">Footwear</option>
                  </select>
                </div>

                {/* PRICE */}
                <div className="col-12 col-md-4">
                  <label className="form-label fs-5">Product Price</label>

                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="0"
                    min="0"
                    step="0.01"
                    className="form-control form-control-lg"
                  />

                  {errors.price && (
                    <div className="text-danger small">{errors.price}</div>
                  )}
                </div>
              </div>

              {/* =========================
                  SIZES
              ========================= */}
              <div className="mt-4">
                <label className="form-label fs-5 d-block">Product Sizes</label>

                <div className="d-flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => toggleSize(size)}
                      className={`btn rounded-0 px-4 py-2 ${
                        selectedSizes.includes(size) ? "btn-dark" : "btn-light"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>

                {errors.sizes && (
                  <div className="text-danger small mt-1">{errors.sizes}</div>
                )}
              </div>

              {/* =========================
                  BESTSELLER
              ========================= */}
              <div className="form-check mt-4">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="bestseller"
                  name="bestseller"
                  checked={formData.bestseller}
                  onChange={handleChange}
                />

                <label className="form-check-label fs-5" htmlFor="bestseller">
                  Add to bestseller
                </label>
              </div>

              {/* =========================
                  SERVER ERROR
              ========================= */}
              {serverError && (
                <div className="alert alert-danger mt-3">{serverError}</div>
              )}

              {/* =========================
                  ADD BUTTON
              ========================= */}

              {successMessage && (
                <div
                  className="alert alert-success alert-dismissible fade show mt-3"
                  role="alert"
                >
                  <strong>Success!</strong> {successMessage}
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setSuccessMessage("")}
                    aria-label="Close"
                  ></button>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn btn-dark rounded-0 mt-4 px-5 py-3"
              >
                {loading ? "ADDING..." : "ADD"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
