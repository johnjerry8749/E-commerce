import AdminNavbar from "../../Layout/AdminNavbar";
import Sidebar from "../../Layout/Sidebar";

import {
  getProducts,
  updateProduct,
  deleteProduct as deleteProductService,
} from "../../../services/productServices";

import { useEffect, useState } from "react";

const ProductList = () => {
  // =========================
  // PRODUCTS
  // =========================
  const [products, setProducts] = useState([]);

  // =========================
  // LOADING
  // =========================
  const [loading, setLoading] = useState(true);

  // =========================
  // PAGE MESSAGES
  // =========================
  const [successMessage, setSuccessMessage] = useState("");
  const [actionError, setActionError] = useState("");

  // =========================
  // DELETE
  // =========================
  const [deletingId, setDeletingId] = useState(null);

  // =========================
  // EDIT MODAL
  // =========================
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // =========================
  // UPDATE LOADING
  // =========================
  const [updating, setUpdating] = useState(false);

  // =========================
  // EDIT FORM
  // =========================
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [bestseller, setBestseller] = useState(false);

  // =========================
  // CATEGORY OPTIONS
  // =========================
  const categoryOptions = ["Men", "Women", "Kid"];

  // =========================
  // SUBCATEGORY OPTIONS
  // =========================
  const subcategoryOptions = ["TopWear", "Footwear", "BottomWear"];

  // =========================
  // SELECTED SIZES
  // =========================
  const [selectedSizes, setSelectedSizes] = useState([]);

  // =========================
  // IMAGE FILES
  // =========================
  const [mainImage, setMainImage] = useState(null);
  const [otherImages, setOtherImages] = useState([]);

  // =========================
  // AVAILABLE SIZE OPTIONS
  // =========================
  const sizeOptions = ["XS", "S", "M", "L", "XL", "XXL"];

  // =========================
  // GET ALL PRODUCTS
  // =========================
  const loadProducts = async () => {
    try {
      setLoading(true);
      setActionError("");

      const response = await getProducts();

      console.log("ALL PRODUCTS:", response.data);

      if (response.data?.success && Array.isArray(response.data.products)) {
        setProducts(response.data.products);
      } else {
        setProducts([]);
        setActionError("No products found.");
      }
    } catch (err) {
      console.error("Get Products Error:", err);

      setActionError(err.response?.data?.message || "Unable to load products.");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // LOAD PRODUCTS
  // =========================
  useEffect(() => {
    loadProducts();
  }, []);

  // =========================
  // GET PRODUCT IMAGE
  // =========================
  const getProductImage = (product) => {
    return product.mainImage || product.main_image || product.image || "";
  };

  // =========================
  // FORMAT SIZES
  // =========================
  const formatSizes = (productSize) => {
    let sizes = productSize || [];

    if (typeof sizes === "string") {
      try {
        sizes = JSON.parse(sizes);
      } catch {
        // PostgreSQL array format
        if (sizes.startsWith("{") && sizes.endsWith("}")) {
          sizes = sizes
            .slice(1, -1)
            .split(",")
            .map((item) => item.trim().replace(/^"(.*)"$/, "$1"));
        } else {
          // Comma-separated string
          sizes = sizes.split(",").map((item) => item.trim());
        }
      }
    }

    if (!Array.isArray(sizes)) {
      return [];
    }

    return [
      ...new Set(
        sizes
          .map((item) =>
            String(item)
              .trim()
              .replace(/^"(.*)"$/, "$1")
              .replace(/^{|}$/g, ""),
          )
          .filter(Boolean),
      ),
    ];
  };

  // =========================
  // SELECT / UNSELECT SIZE
  // =========================
  const handleSizeSelect = (selectedSize) => {
    setSelectedSizes((previousSizes) => {
      if (previousSizes.includes(selectedSize)) {
        return previousSizes.filter((size) => size !== selectedSize);
      }

      return [...previousSizes, selectedSize];
    });

    setActionError("");
  };

  // =========================
  // SELECT CATEGORY
  // =========================
  const handleCategorySelect = (selectedCategory) => {
    setCategory(selectedCategory);
    setActionError("");
  };

  // =========================
  // SELECT SUBCATEGORY
  // =========================
  const handleSubcategorySelect = (selectedSubcategory) => {
    setSubcategory(selectedSubcategory);
    setActionError("");
  };

  // =========================
  // OPEN EDIT MODAL
  // =========================
  const handleEdit = (product) => {
    // Clear old messages
    setActionError("");
    setSuccessMessage("");

    setSelectedProduct(product);

    setName(product.name || "");
    setDescription(product.description || "");
    setPrice(product.price || "");

    // Existing category is automatically selected
    setCategory(product.category || "");

    // Existing subcategory is automatically selected
    setSubcategory(product.subcategory || "");

    // Existing sizes
    const productSizes = formatSizes(product.size || product.sizes);

    setSelectedSizes(productSizes);

    setBestseller(product.bestseller === true || product.bestseller === "true");

    setMainImage(null);
    setOtherImages([]);

    setShowModal(true);
  };

  // =========================
  // CLOSE MODAL
  // =========================
  const closeModal = () => {
    if (updating) return;

    setShowModal(false);
    setSelectedProduct(null);

    setName("");
    setDescription("");
    setPrice("");
    setCategory("");
    setSubcategory("");
    setSelectedSizes([]);
    setBestseller(false);

    setMainImage(null);
    setOtherImages([]);

    setActionError("");
  };

  // =========================
  // UPDATE PRODUCT
  // =========================
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!selectedProduct) {
      return;
    }

    // Clear old messages
    setActionError("");
    setSuccessMessage("");

    // Validate category
    if (!category) {
      setActionError("Please select a category.");
      return;
    }

    // Validate subcategory
    if (!subcategory) {
      setActionError("Please select a subcategory.");
      return;
    }

    // Validate sizes
    if (selectedSizes.length === 0) {
      setActionError("Please select at least one size before saving.");
      return;
    }

    try {
      setUpdating(true);

      const formData = new FormData();

      // =========================
      // PRODUCT INFORMATION
      // =========================
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subcategory", subcategory);

      // =========================
      // SELECTED SIZES
      // =========================
      formData.append("size", JSON.stringify(selectedSizes));

      // =========================
      // BESTSELLER
      // =========================
      formData.append("bestseller", bestseller ? "true" : "false");

      // =========================
      // MAIN IMAGE
      // =========================
      if (mainImage) {
        formData.append("mainImage", mainImage);
      }

      // =========================
      // OTHER IMAGES
      // =========================
      if (otherImages.length > 0) {
        otherImages.forEach((image) => {
          formData.append("otherImages", image);
        });
      }

      console.log("Updating product:", selectedProduct.id);

      const response = await updateProduct(selectedProduct.id, formData);

      console.log("UPDATED PRODUCT:", response.data);

      if (response.data?.success) {
        // =========================
        // UPDATE PRODUCT IN TABLE
        // =========================
        setProducts((previousProducts) =>
          previousProducts.map((product) =>
            product.id === selectedProduct.id
              ? {
                  ...product,
                  ...response.data.product,
                }
              : product,
          ),
        );

        // =========================
        // CLOSE MODAL
        // =========================
        closeModal();

        // =========================
        // SUCCESS MESSAGE
        // =========================
        setSuccessMessage("Product updated successfully.");

        setTimeout(() => {
          setSuccessMessage("");
        }, 4000);
      } else {
        setActionError(response.data?.message || "Unable to update product.");
      }
    } catch (err) {
      console.error("Update Product Error:", err);

      setActionError(
        err.response?.data?.message ||
          "Unable to update product. Please try again.",
      );
    } finally {
      setUpdating(false);
    }
  };

  // =========================
  // DELETE PRODUCT
  // =========================
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!confirmDelete) {
      return;
    }

    setActionError("");
    setSuccessMessage("");

    try {
      setDeletingId(id);

      const response = await deleteProductService(id);

      if (response.data?.success) {
        // Remove product from table
        setProducts((previousProducts) =>
          previousProducts.filter((product) => product.id !== id),
        );

        // Success message
        setSuccessMessage("Product deleted successfully.");

        setTimeout(() => {
          setSuccessMessage("");
        }, 4000);
      } else {
        setActionError(response.data?.message || "Unable to delete product.");
      }
    } catch (err) {
      console.error("Delete Product Error:", err);

      setActionError(
        err.response?.data?.message || "Unable to delete product.",
      );
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      {/* =========================
          ADMIN NAVBAR
      ========================= */}
      <AdminNavbar />

      <div className="row g-0">
        {/* =========================
            SIDEBAR
        ========================= */}
        <div className="col-2 col-sm-2 col-md-3 col-lg-2">
          <Sidebar />
        </div>

        {/* =========================
            MAIN CONTENT
        ========================= */}
        <div className="col-9 col-sm-9 col-md-9 col-lg-10 border-start border-3">
          <div className="p-2 p-md-3">
            {/* =========================
                PAGE HEADER
            ========================= */}
            <h4 className="fw-semibold mb-3">All Products</h4>

            {/* =========================
                SUCCESS MESSAGE
            ========================= */}
            {successMessage && (
              <div
                className="alert alert-success alert-dismissible fade show"
                role="alert"
              >
                <strong>Success!</strong> {successMessage}
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setSuccessMessage("")}
                ></button>
              </div>
            )}

            {/* =========================
                ERROR MESSAGE
            ========================= */}
            {actionError && !showModal && (
              <div
                className="alert alert-danger alert-dismissible fade show"
                role="alert"
              >
                <strong>Error!</strong> {actionError}
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setActionError("")}
                ></button>
              </div>
            )}

            {/* =========================
                PRODUCT TABLE
            ========================= */}
            <div className="border border-dark rounded overflow-hidden">
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  {/* TABLE HEADER */}
                  <thead className="table-light">
                    <tr>
                      <th>#</th>
                      <th>Image</th>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Category</th>
                      <th>Subcategory</th>
                      <th>Sizes</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  {/* TABLE BODY */}
                  <tbody>
                    {/* LOADING */}
                    {loading && (
                      <tr>
                        <td colSpan="8" className="text-center py-5">
                          <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </div>

                          <p className="text-muted mt-2 mb-0">
                            Loading products...
                          </p>
                        </td>
                      </tr>
                    )}

                    {/* NO PRODUCTS */}
                    {!loading && products.length === 0 && !actionError && (
                      <tr>
                        <td colSpan="8" className="text-center py-5">
                          <h5>No products found</h5>

                          <p className="text-muted mb-0">
                            Add a product to see it here.
                          </p>
                        </td>
                      </tr>
                    )}

                    {/* PRODUCTS */}
                    {!loading &&
                      products.map((product, index) => {
                        const image = getProductImage(product);

                        const sizes = formatSizes(
                          product.size || product.sizes,
                        );

                        return (
                          <tr key={product.id}>
                            {/* NUMBER */}
                            <td>{index + 1}</td>

                            {/* IMAGE */}
                            <td>
                              <div
                                className="border rounded bg-light d-flex justify-content-center align-items-center"
                                style={{
                                  width: "70px",
                                  height: "70px",
                                  overflow: "hidden",
                                }}
                              >
                                {image ? (
                                  <img
                                    src={image}
                                    alt={product.name || "Product"}
                                    style={{
                                      width: "100%",
                                      height: "100%",
                                      objectFit: "contain",
                                    }}
                                  />
                                ) : (
                                  <small className="text-muted">No image</small>
                                )}
                              </div>
                            </td>

                            {/* PRODUCT NAME */}
                            <td>
                              <strong>{product.name || "N/A"}</strong>
                            </td>

                            {/* PRICE */}
                            <td>${Number(product.price || 0).toFixed(2)}</td>

                            {/* CATEGORY */}
                            <td>{product.category || "N/A"}</td>

                            {/* SUBCATEGORY */}
                            <td>{product.subcategory || "N/A"}</td>

                            {/* SIZES */}
                            <td>
                              {sizes.length > 0 ? sizes.join(", ") : "N/A"}
                            </td>

                            {/* ACTIONS */}
                            <td>
                              <div className="d-flex gap-2">
                                {/* EDIT */}
                                <button
                                  type="button"
                                  className="btn btn-primary btn-sm"
                                  onClick={() => handleEdit(product)}
                                >
                                  Edit
                                </button>

                                {/* DELETE */}
                                <button
                                  type="button"
                                  className="btn btn-danger btn-sm"
                                  onClick={() => handleDelete(product.id)}
                                  disabled={deletingId === product.id}
                                >
                                  {deletingId === product.id
                                    ? "Deleting..."
                                    : "Delete"}
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          EDIT PRODUCT MODAL
      ===================================================== */}
      {showModal && (
        <>
          {/* BACKDROP */}
          <div className="modal-backdrop fade show" onClick={closeModal}></div>

          {/* MODAL */}
          <div
            className="modal fade show d-block"
            tabIndex="-1"
            role="dialog"
            aria-modal="true"
          >
            <div className="modal-dialog modal-lg modal-dialog-centered">
              <div className="modal-content">
                {/* =========================
                    MODAL HEADER
                ========================= */}
                <div className="modal-header">
                  <h5 className="modal-title">Edit Product</h5>

                  <button
                    type="button"
                    className="btn-close"
                    onClick={closeModal}
                    disabled={updating}
                  ></button>
                </div>

                {/* =========================
                    FORM
                ========================= */}
                <form onSubmit={handleUpdate}>
                  {/* =========================
                      SCROLLABLE BODY
                  ========================= */}
                  <div
                    className="modal-body"
                    style={{
                      maxHeight: "65vh",
                      overflowY: "auto",
                    }}
                  >
                    {/* MODAL ERROR */}
                    {actionError && (
                      <div
                        className="alert alert-danger alert-dismissible fade show"
                        role="alert"
                      >
                        <strong>Error!</strong> {actionError}
                        <button
                          type="button"
                          className="btn-close"
                          onClick={() => setActionError("")}
                        ></button>
                      </div>
                    )}

                    {/* PRODUCT NAME */}
                    <div className="mb-3">
                      <label className="form-label fw-semibold">
                        Product Name
                      </label>

                      <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>

                    {/* DESCRIPTION */}
                    <div className="mb-3">
                      <label className="form-label fw-semibold">
                        Description
                      </label>

                      <textarea
                        className="form-control"
                        rows="4"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                      ></textarea>
                    </div>

                    {/* PRICE */}
                    <div className="mb-3">
                      <label className="form-label fw-semibold">Price</label>

                      <input
                        type="number"
                        className="form-control"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                      />
                    </div>

                    {/* =========================
                        CATEGORY
                    ========================= */}
                    <div className="mb-4">
                      <label className="form-label fw-semibold">Category</label>

                      <div className="d-flex flex-wrap gap-2">
                        {categoryOptions.map((item) => {
                          const isSelected = category === item;

                          return (
                            <button
                              key={item}
                              type="button"
                              className={`btn ${
                                isSelected
                                  ? "btn-dark"
                                  : "btn-outline-secondary"
                              }`}
                              onClick={() => handleCategorySelect(item)}
                            >
                              {item}
                            </button>
                          );
                        })}
                      </div>

                      <div className="mt-2">
                        <small className="text-muted">
                          Selected: <strong>{category || "None"}</strong>
                        </small>
                      </div>
                    </div>

                    {/* =========================
                        SUBCATEGORY
                    ========================= */}
                    <div className="mb-4">
                      <label className="form-label fw-semibold">
                        Subcategory
                      </label>

                      <div className="d-flex flex-wrap gap-2">
                        {subcategoryOptions.map((item) => {
                          const isSelected = subcategory === item;

                          return (
                            <button
                              key={item}
                              type="button"
                              className={`btn ${
                                isSelected
                                  ? "btn-dark"
                                  : "btn-outline-secondary"
                              }`}
                              onClick={() => handleSubcategorySelect(item)}
                            >
                              {item}
                            </button>
                          );
                        })}
                      </div>

                      <div className="mt-2">
                        <small className="text-muted">
                          Selected: <strong>{subcategory || "None"}</strong>
                        </small>
                      </div>
                    </div>

                    {/* =========================
                        SELECTABLE SIZES
                    ========================= */}
                    <div className="mb-4">
                      <label className="form-label fw-semibold">
                        Available Sizes
                      </label>

                      <div className="d-flex flex-wrap gap-2">
                        {sizeOptions.map((item) => {
                          const isSelected = selectedSizes.includes(item);

                          return (
                            <button
                              key={item}
                              type="button"
                              className={`btn ${
                                isSelected
                                  ? "btn-dark"
                                  : "btn-outline-secondary"
                              }`}
                              onClick={() => handleSizeSelect(item)}
                              style={{
                                minWidth: "60px",
                              }}
                            >
                              {item}
                            </button>
                          );
                        })}
                      </div>

                      {/* SELECTED SIZES */}
                      <div className="mt-3">
                        <small className="text-muted">Selected sizes:</small>

                        <div className="d-flex flex-wrap gap-2 mt-2">
                          {selectedSizes.length > 0 ? (
                            selectedSizes.map((item) => (
                              <span
                                key={item}
                                className="badge text-bg-dark px-3 py-2"
                              >
                                {item}
                              </span>
                            ))
                          ) : (
                            <span className="text-danger">
                              No sizes selected
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* =========================
                        BESTSELLER
                    ========================= */}
                    <div className="form-check mb-4">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="editBestseller"
                        checked={bestseller}
                        onChange={(e) => setBestseller(e.target.checked)}
                      />

                      <label
                        className="form-check-label"
                        htmlFor="editBestseller"
                      >
                        Bestseller
                      </label>
                    </div>

                    {/* =========================
                        MAIN IMAGE
                    ========================= */}
                    <div className="mb-3">
                      <label className="form-label fw-semibold">
                        Change Main Image
                      </label>

                      <input
                        type="file"
                        className="form-control"
                        accept="image/*"
                        onChange={(e) => setMainImage(e.target.files[0])}
                      />
                    </div>

                    {/* =========================
                        OTHER IMAGES
                    ========================= */}
                    <div className="mb-3">
                      <label className="form-label fw-semibold">
                        Change Other Images
                      </label>

                      <input
                        type="file"
                        className="form-control"
                        accept="image/*"
                        multiple
                        onChange={(e) =>
                          setOtherImages(Array.from(e.target.files))
                        }
                      />
                    </div>
                  </div>

                  {/* =========================
                      MODAL FOOTER
                      ALWAYS VISIBLE
                  ========================= */}
                  <div className="modal-footer bg-white">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={closeModal}
                      disabled={updating}
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="btn btn-success px-4"
                      disabled={updating}
                    >
                      {updating ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductList;
