import { useEffect, useMemo, useState } from "react";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import "../pages/css/collection.css";

import { useNavigate } from "react-router-dom";
import { getProducts } from "../services/productServices";

const Collections = () => {
  const navigate = useNavigate();

  // =========================
  // PRODUCTS
  // =========================
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================
  // SORT
  // =========================
  const [sortOpen, setSortOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState("High to Low");

  // =========================
  // FILTER
  // =========================
  const [filterOpen, setFilterOpen] = useState(false);

  const [selectedCategories, setSelectedCategories] = useState([]);

  const [selectedTypes, setSelectedTypes] = useState([]);

  // =========================
  // SORT OPTIONS
  // =========================
  const sortOptions = ["High to Low", "Low to High", "Newest", "Oldest"];

  // =========================
  // GET PRODUCTS
  // =========================
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getProducts();

        console.log("COLLECTION PRODUCTS:", response.data);

        if (response.data?.success && Array.isArray(response.data.products)) {
          setProducts(response.data.products);
        } else {
          setProducts([]);
          setError("No products found.");
        }
      } catch (err) {
        console.error("Get Collections Products Error:", err);

        setError(err.response?.data?.message || "Unable to load products.");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // =========================
  // TOGGLE SORT
  // =========================
  const toggleSort = () => {
    setSortOpen((prev) => !prev);
  };

  // =========================
  // TOGGLE FILTER
  // =========================
  const toggleFilter = () => {
    setFilterOpen((prev) => !prev);
  };

  // =========================
  // HANDLE SORT
  // =========================
  const handleSort = (option) => {
    setSelectedSort(option);
    setSortOpen(false);
  };

  // =========================
  // PRODUCT DETAILS
  // =========================
  const productDetails = (product) => {
    if (!product?.id) {
      console.error("Product ID is missing:", product);
      return;
    }

    navigate(`/productdetails/${product.id}`);
  };

  // =========================
  // CATEGORY FILTER
  // =========================
  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter((item) => item !== category);
      }

      return [...prev, category];
    });
  };

  // =========================
  // TYPE FILTER
  // =========================
  const handleTypeChange = (type) => {
    setSelectedTypes((prev) => {
      if (prev.includes(type)) {
        return prev.filter((item) => item !== type);
      }

      return [...prev, type];
    });
  };

  // =========================
  // FILTER + SORT PRODUCTS
  // =========================
  const displayedProducts = useMemo(() => {
    let result = [...products];

    // =========================
    // CATEGORY FILTER
    // =========================
    if (selectedCategories.length > 0) {
      result = result.filter((product) =>
        selectedCategories.some(
          (category) =>
            String(product.category || "").toLowerCase() ===
            category.toLowerCase(),
        ),
      );
    }

    // =========================
    // TYPE / SUBCATEGORY FILTER
    // =========================
    if (selectedTypes.length > 0) {
      result = result.filter((product) =>
        selectedTypes.some(
          (type) =>
            String(product.subcategory || "").toLowerCase() ===
            type.toLowerCase(),
        ),
      );
    }

    // =========================
    // SORT
    // =========================
    switch (selectedSort) {
      case "High to Low":
        result.sort((a, b) => Number(b.price || 0) - Number(a.price || 0));
        break;

      case "Low to High":
        result.sort((a, b) => Number(a.price || 0) - Number(b.price || 0));
        break;

      case "Newest":
        result.sort((a, b) => {
          const dateA = new Date(a.created_at || a.createdAt || 0);

          const dateB = new Date(b.created_at || b.createdAt || 0);

          return dateB - dateA;
        });
        break;

      case "Oldest":
        result.sort((a, b) => {
          const dateA = new Date(a.created_at || a.createdAt || 0);

          const dateB = new Date(b.created_at || b.createdAt || 0);

          return dateA - dateB;
        });
        break;

      default:
        break;
    }

    return result;
  }, [products, selectedCategories, selectedTypes, selectedSort]);

  // =========================
  // PRODUCT IMAGE
  // =========================
  const getProductImage = (product) => {
    return product.mainImage || product.main_image || product.image || "";
  };

  // =========================
  // LOADING
  // =========================
  if (loading) {
    return (
      <div className="collections-page">
        <Navbar />

        <div
          className="container d-flex justify-content-center align-items-center"
          style={{ minHeight: "500px" }}
        >
          <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>

            <p className="text-muted mt-3">Loading products...</p>
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  return (
    <div className="collections-page">
      <Navbar />

      <main className="container px-3 px-md-4 px-lg-5 py-4">
        {/* =====================================================
            MOBILE / TABLET
        ===================================================== */}
        <div className="d-lg-none">
          {/* FILTER HEADER */}
          <div
            className="mobile-filter-header d-flex align-items-center gap-2 mb-4"
            onClick={toggleFilter}
            style={{ cursor: "pointer" }}
          >
            <h2 className="mb-0">FILTERS</h2>

            <i
              className={`ti ${
                filterOpen ? "ti-chevron-down" : "ti-chevron-right"
              }`}
            ></i>
          </div>

          {/* MOBILE FILTER */}
          <div
            className={`mobile-filter-wrapper ${
              filterOpen ? "filter-visible" : "filter-hidden"
            }`}
          >
            {/* CATEGORIES */}
            <div className="filter-box mb-4">
              <h3>CATEGORIES</h3>

              <label>
                <input
                  type="checkbox"
                  checked={selectedCategories.includes("Men")}
                  onChange={() => handleCategoryChange("Men")}
                />

                <span>Men</span>
              </label>

              <label>
                <input
                  type="checkbox"
                  checked={selectedCategories.includes("Women")}
                  onChange={() => handleCategoryChange("Women")}
                />

                <span>Women</span>
              </label>

              <label>
                <input
                  type="checkbox"
                  checked={selectedCategories.includes("Kids")}
                  onChange={() => handleCategoryChange("Kids")}
                />

                <span>Kids</span>
              </label>
            </div>

            {/* TYPE */}
            <div className="filter-box mb-4">
              <h3>TYPE</h3>

              <label>
                <input
                  type="checkbox"
                  checked={selectedTypes.includes("Topwear")}
                  onChange={() => handleTypeChange("Topwear")}
                />

                <span>Topwear</span>
              </label>

              <label>
                <input
                  type="checkbox"
                  checked={selectedTypes.includes("Bottomwear")}
                  onChange={() => handleTypeChange("Bottomwear")}
                />

                <span>Bottomwear</span>
              </label>

              <label>
                <input
                  type="checkbox"
                  checked={selectedTypes.includes("Winterwear")}
                  onChange={() => handleTypeChange("Winterwear")}
                />

                <span>Winterwear</span>
              </label>
            </div>
          </div>

          {/* COLLECTION HEADER */}
          <div className="mobile-collection-header">
            {/* TITLE */}
            <div className="collection-heading">
              <h1>
                <span>ALL</span> COLLECTIONS
              </h1>

              <div className="heading-line"></div>
            </div>

            {/* SORT */}
            <div className="sort-wrapper">
              <div
                className="sort-button"
                onClick={toggleSort}
                style={{ cursor: "pointer" }}
              >
                <span>Sort by:</span>

                <strong>{selectedSort}</strong>

                <i
                  className={`ti ${
                    sortOpen ? "ti-chevron-up" : "ti-chevron-down"
                  }`}
                ></i>
              </div>

              {sortOpen && (
                <div className="sort-dropdown">
                  {sortOptions.map((option) => (
                    <div
                      key={option}
                      className={`sort-option ${
                        selectedSort === option ? "active-sort" : ""
                      }`}
                      onClick={() => handleSort(option)}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ERROR */}
          {error && <div className="alert alert-danger mt-4">{error}</div>}

          {/* NO PRODUCTS */}
          {!error && displayedProducts.length === 0 && (
            <div className="text-center py-5">
              <h5>No products found</h5>

              <p className="text-muted">Try changing your filters.</p>
            </div>
          )}

          {/* MOBILE PRODUCT GRID */}
          <div className="product-grid row g-3 g-md-4 mt-3">
            {displayedProducts.map((product) => {
              const image = getProductImage(product);

              return (
                <div className="col-6 col-md-4" key={product.id}>
                  <div
                    className="product-card"
                    onClick={() => productDetails(product)}
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    {/* IMAGE */}
                    <div className="product-image-wrapper">
                      {image ? (
                        <img
                          src={image}
                          alt={product.name || "Product"}
                          className="product-image"
                        />
                      ) : (
                        <div className="d-flex justify-content-center align-items-center h-100 text-muted">
                          No image
                        </div>
                      )}
                    </div>

                    {/* INFO */}
                    <div className="product-info">
                      <p className="product-name">{product.name}</p>

                      <p className="product-price">
                        ${Number(product.price || 0).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* =====================================================
            LARGE SCREEN
        ===================================================== */}
        <div className="row g-4 d-none d-lg-flex">
          {/* FILTER SIDEBAR */}
          <div className="col-lg-3">
            <aside className="large-filter">
              <h2>FILTERS</h2>

              {/* CATEGORIES */}
              <div className="filter-box">
                <h3>CATEGORIES</h3>

                <label>
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes("Men")}
                    onChange={() => handleCategoryChange("Men")}
                  />

                  <span>Men</span>
                </label>

                <label>
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes("Women")}
                    onChange={() => handleCategoryChange("Women")}
                  />

                  <span>Women</span>
                </label>

                <label>
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes("Kids")}
                    onChange={() => handleCategoryChange("Kids")}
                  />

                  <span>Kids</span>
                </label>
              </div>

              {/* TYPE */}
              <div className="filter-box">
                <h3>TYPE</h3>

                <label>
                  <input
                    type="checkbox"
                    checked={selectedTypes.includes("Topwear")}
                    onChange={() => handleTypeChange("Topwear")}
                  />

                  <span>Topwear</span>
                </label>

                <label>
                  <input
                    type="checkbox"
                    checked={selectedTypes.includes("Bottomwear")}
                    onChange={() => handleTypeChange("Bottomwear")}
                  />

                  <span>Bottomwear</span>
                </label>

                <label>
                  <input
                    type="checkbox"
                    checked={selectedTypes.includes("Winterwear")}
                    onChange={() => handleTypeChange("Winterwear")}
                  />

                  <span>Winterwear</span>
                </label>
              </div>
            </aside>
          </div>

          {/* COLLECTION AREA */}
          <div className="col-lg-9">
            {/* COLLECTION HEADER */}
            <div className="desktop-collection-header">
              {/* TITLE */}
              <div className="collection-heading desktop-heading">
                <h1>
                  <span>All</span> Collections
                </h1>

                <div className="heading-line mt-4"></div>
              </div>

              {/* SORT */}
              <div className="sort-wrapper desktop-sort">
                <div
                  className="sort-button"
                  onClick={toggleSort}
                  style={{
                    cursor: "pointer",
                  }}
                >
                  <span>Sort by:</span>

                  <strong>{selectedSort}</strong>

                  <i
                    className={`ti ${
                      sortOpen ? "ti-chevron-up" : "ti-chevron-down"
                    }`}
                  ></i>
                </div>

                {sortOpen && (
                  <div className="sort-dropdown">
                    {sortOptions.map((option) => (
                      <div
                        key={option}
                        className={`sort-option ${
                          selectedSort === option ? "active-sort" : ""
                        }`}
                        onClick={() => handleSort(option)}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* ERROR */}
            {error && <div className="alert alert-danger mt-4">{error}</div>}

            {/* NO PRODUCTS */}
            {!error && displayedProducts.length === 0 && (
              <div className="text-center py-5">
                <h5>No products found</h5>

                <p className="text-muted">Try changing your filters.</p>
              </div>
            )}

            {/* DESKTOP PRODUCT GRID */}
            <div className="row g-4 mt-3">
              {displayedProducts.map((product) => {
                const image = getProductImage(product);

                return (
                  <div className="col-lg-4 col-xl-4" key={product.id}>
                    <div
                      className="card h-100 shadow-sm"
                      onClick={() => productDetails(product)}
                      style={{
                        cursor: "pointer",
                      }}
                    >
                      {/* IMAGE */}
                      <div className="product-image-wrapper">
                        {image ? (
                          <img
                            src={image}
                            alt={product.name || "Product"}
                            className="product-image"
                          />
                        ) : (
                          <div className="d-flex justify-content-center align-items-center h-100 text-muted">
                            No image
                          </div>
                        )}
                      </div>

                      {/* INFO */}
                      <div className="product-info">
                        <p className="product-name">{product.name}</p>

                        <p className="product-price">
                          ${Number(product.price || 0).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Collections;
