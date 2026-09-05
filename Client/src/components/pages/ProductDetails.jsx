import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import { useCart } from "../context/CartContext";
import { getProductById } from "../services/productServices";

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================
  // GET PRODUCT BY ID
  // =========================
  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getProductById(id);

        console.log("PRODUCT DETAILS:", response.data);

        if (response.data?.success && response.data?.product) {
          const productData = response.data.product;

          setProduct(productData);

          // Main image
          const mainImage =
            productData.mainImage || productData.main_image || "";

          setSelectedImage(mainImage);

          // No size selected initially
          setSelectedSize("");
        } else {
          setError("Product not found");
        }
      } catch (err) {
        console.error("Get Product Error:", err);

        setError(err.response?.data?.message || "Unable to load product.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadProduct();
    }
  }, [id]);

  // =========================
  // LOADING
  // =========================
  if (loading) {
    return (
      <>
        <Navbar />

        <div
          className="container d-flex justify-content-center align-items-center"
          style={{ minHeight: "400px" }}
        >
          <div className="text-center">
            <div className="spinner-border text-success" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>

            <p className="mt-3 text-muted">Loading product...</p>
          </div>
        </div>

        <Footer />
      </>
    );
  }

  // =========================
  // ERROR
  // =========================
  if (error || !product) {
    return (
      <>
        <Navbar />

        <div
          className="container text-center py-5"
          style={{ minHeight: "400px" }}
        >
          <h2 className="fw-semibold">Product not found</h2>

          <p className="text-muted">
            {error || "This product does not exist."}
          </p>
        </div>

        <Footer />
      </>
    );
  }

  // =========================
  // MAIN IMAGE
  // =========================
  const mainImage = product.mainImage || product.main_image || "";

  // =========================
  // OTHER IMAGES
  // =========================
  let otherImages = product.otherImages || product.other_images || [];

  if (typeof otherImages === "string") {
    try {
      otherImages = JSON.parse(otherImages);
    } catch {
      otherImages = [otherImages];
    }
  }

  if (!Array.isArray(otherImages)) {
    otherImages = [];
  }

  // =========================
  // ALL PRODUCT IMAGES
  // =========================
  const allImages = [
    ...(mainImage ? [mainImage] : []),
    ...otherImages.filter((image) => image && image !== mainImage),
  ];

  // =========================
  // PRODUCT SIZES
  // =========================
  // =========================
  // PRODUCT SIZES
  // =========================
  let sizes = product.size || product.sizes || [];

  // Handle PostgreSQL array format:
  // {"S","M","L","XL","XXL"}
  if (typeof sizes === "string") {
    const trimmedSizes = sizes.trim();

    if (trimmedSizes.startsWith("{") && trimmedSizes.endsWith("}")) {
      sizes = trimmedSizes
        .slice(1, -1)
        .split(",")
        .map((size) => size.trim().replace(/^"(.*)"$/, "$1"));
    } else {
      // Handle JSON format:
      // ["S","M","L","XL"]
      try {
        const parsed = JSON.parse(trimmedSizes);

        if (Array.isArray(parsed)) {
          sizes = parsed;
        } else {
          sizes = [parsed];
        }
      } catch {
        // Handle normal comma-separated format:
        // S,M,L,XL
        sizes = trimmedSizes.split(",").map((size) => size.trim());
      }
    }
  }

  // Make sure it is an array
  if (!Array.isArray(sizes)) {
    sizes = [];
  }

  // Clean the values
  sizes = [
    ...new Set(
      sizes
        .map((size) =>
          String(size)
            .trim()
            .replace(/^{|}$/g, "")
            .replace(/^"(.*)"$/, "$1")
            .trim(),
        )
        .filter(Boolean),
    ),
  ];

  // =========================
  // SIZE SELECTION
  // =========================
  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  // =========================
  // ADD TO CART
  // =========================
  const handleAddToCart = () => {
    // Require size if product has sizes
    if (sizes.length > 0 && !selectedSize) {
      alert("Please select a size before adding to cart.");
      return;
    }

    addToCart({
      ...product,

      // Selected image
      image: selectedImage || mainImage,

      // Selected size
      size: selectedSize || null,

      // Default quantity
      quantity: 1,
    });
  };

  return (
    <div className="bg-white">
      <Navbar />

      {/* ==================================================
          PRODUCT SECTION
      ================================================== */}
      <div className="container py-4 py-md-5">
        <div className="row g-4">
          {/* ==================================================
              PRODUCT IMAGES
          ================================================== */}
          <div className="col-12 col-lg-7">
            <div className="row g-3">
              {/* ==================================================
                  IMAGE THUMBNAILS
              ================================================== */}
              <div className="col-12 col-lg-2">
                <div
                  className="
                    d-flex
                    flex-row
                    flex-lg-column
                    gap-2
                    justify-content-start
                    overflow-auto
                  "
                  style={{
                    maxHeight: "550px",
                  }}
                >
                  {allImages.length > 0 ? (
                    allImages.map((image, index) => {
                      const isSelected = selectedImage === image;

                      return (
                        <button
                          key={index}
                          type="button"
                          onClick={() => setSelectedImage(image)}
                          className={`
                            bg-white
                            border
                            rounded
                            p-1
                            ${isSelected ? "border-dark border-2" : ""}
                          `}
                          style={{
                            width: "80px",
                            height: "90px",
                            minWidth: "80px",
                          }}
                        >
                          <img
                            src={image}
                            alt={`${product.name} ${index + 1}`}
                            className="w-100 h-100"
                            style={{
                              objectFit: "cover",
                            }}
                          />
                        </button>
                      );
                    })
                  ) : (
                    <span className="text-muted">No images</span>
                  )}
                </div>
              </div>

              {/* ==================================================
                  MAIN PRODUCT IMAGE
              ================================================== */}
              <div className="col-12 col-lg-10">
                <div
                  className="
                    border
                    rounded-3
                    bg-light
                    p-3
                  "
                  style={{
                    height: "550px",
                    maxHeight: "75vh",
                    minHeight: "350px",
                  }}
                >
                  {selectedImage ? (
                    <img
                      src={selectedImage}
                      alt={product.name}
                      className="w-100 h-100"
                      style={{
                        objectFit: "contain",
                      }}
                    />
                  ) : (
                    <div className="h-100 d-flex justify-content-center align-items-center">
                      <span className="text-muted">No image available</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ==================================================
              PRODUCT DETAILS
          ================================================== */}
          <div className="col-12 col-lg-5">
            <div className="px-lg-3">
              {/* PRODUCT NAME */}
              <h1 className="fs-3 fw-semibold mb-2">{product.name}</h1>

              {/* RATING */}
              <div className="d-flex align-items-center gap-2 mb-3">
                <span className="text-warning fs-5">★★★★★</span>

                <span className="text-muted">122 Reviews</span>
              </div>

              {/* PRICE */}
              <div className="mb-3">
                <span className="fs-2 fw-bold">
                  ${Number(product.price || 0).toFixed(2)}
                </span>
              </div>

              {/* DESCRIPTION */}
              <p className="text-muted lh-lg">
                {product.description || "No description available."}
              </p>

              <hr />

              {/* CATEGORY */}
              <div className="mb-3">
                <span className="fw-semibold">Category:</span>{" "}
                <span className="text-muted">{product.category || "N/A"}</span>
              </div>

              {/* SUBCATEGORY */}
              <div className="mb-3">
                <span className="fw-semibold">Subcategory:</span>{" "}
                <span className="text-muted">
                  {product.subcategory || "N/A"}
                </span>
              </div>

              {/* ==================================================
                  PRODUCT SIZES
              ================================================== */}
              {sizes.length > 0 && (
                <div className="mb-4">
                  <h5 className="fw-semibold mb-3">Select Size</h5>

                  <div className="d-flex flex-wrap gap-2">
                    {sizes.map((size) => {
                      const isSelected = selectedSize === size;

                      return (
                        <button
                          key={size}
                          type="button"
                          onClick={() => handleSizeSelect(size)}
                          className={
                            isSelected
                              ? "btn btn-dark fw-semibold"
                              : "btn btn-outline-dark fw-semibold"
                          }
                          style={{
                            width: "65px",
                            height: "45px",
                            borderRadius: "4px",
                          }}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>

                  {/* SELECTED SIZE */}
                  {selectedSize && (
                    <div className="mt-3">
                      <span className="text-muted">Selected size:</span>{" "}
                      <strong>{selectedSize}</strong>
                    </div>
                  )}
                </div>
              )}

              {/* NO SIZES */}
              {sizes.length === 0 && (
                <p className="text-muted mb-4">No sizes available</p>
              )}

              {/* ==================================================
                  ADD TO CART
              ================================================== */}
              <button
                type="button"
                className="
                  btn
                  btn-dark
                  w-100
                  py-3
                  fw-semibold
                  mb-4
                "
                onClick={handleAddToCart}
              >
                ADD TO CART
              </button>

              {/* ==================================================
                  DELIVERY
              ================================================== */}
              <div className="border rounded-3 p-3">
                {/* FREE DELIVERY */}
                <div className="d-flex gap-3 mb-3">
                  <span className="fs-4">🚚</span>

                  <div>
                    <h6 className="fw-semibold mb-1">Free Delivery</h6>

                    <small className="text-muted">
                      Free delivery on orders over $50
                    </small>
                  </div>
                </div>

                {/* EASY RETURNS */}
                <div className="d-flex gap-3">
                  <span className="fs-4">↩</span>

                  <div>
                    <h6 className="fw-semibold mb-1">Easy Returns</h6>

                    <small className="text-muted">
                      30 days easy return policy
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ==================================================
            PRODUCT INFORMATION
        ================================================== */}
        <div className="row mt-5">
          <div className="col-12">
            <div className="border rounded-3 p-3 p-md-4">
              <h4 className="fw-semibold mb-4">Product Information</h4>

              <div className="row">
                {/* NAME */}
                <div className="col-6 col-md-4 mb-3">
                  <small className="text-muted">Name</small>

                  <p className="fw-semibold mb-0">{product.name}</p>
                </div>

                {/* PRICE */}
                <div className="col-6 col-md-4 mb-3">
                  <small className="text-muted">Price</small>

                  <p className="fw-semibold mb-0">
                    ${Number(product.price || 0).toFixed(2)}
                  </p>
                </div>

                {/* CATEGORY */}
                <div className="col-6 col-md-4 mb-3">
                  <small className="text-muted">Category</small>

                  <p className="fw-semibold mb-0">
                    {product.category || "N/A"}
                  </p>
                </div>

                {/* SUBCATEGORY */}
                <div className="col-6 col-md-4 mb-3">
                  <small className="text-muted">Subcategory</small>

                  <p className="fw-semibold mb-0">
                    {product.subcategory || "N/A"}
                  </p>
                </div>

                {/* SIZES */}
                <div className="col-6 col-md-4 mb-3">
                  <small className="text-muted">Sizes</small>

                  <p className="fw-semibold mb-0">
                    {sizes.length > 0 ? sizes.join(", ") : "N/A"}
                  </p>
                </div>

                {/* SELECTED SIZE */}
                <div className="col-6 col-md-4 mb-3">
                  <small className="text-muted">Selected Size</small>

                  <p className="fw-semibold mb-0">
                    {selectedSize || "Not selected"}
                  </p>
                </div>

                {/* AVAILABILITY */}
                <div className="col-6 col-md-4 mb-3">
                  <small className="text-muted">Availability</small>

                  <p className="text-success fw-semibold mb-0">In Stock</p>
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

export default ProductDetails;
