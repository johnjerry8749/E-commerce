import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import '../pages/css/collection.css'
import { useState } from "react";
import Productimg2 from "../../assets/front/p_img49.png";
import { useNavigate } from "react-router-dom";

const Collections = () => {
    const navigate = useNavigate(); 

  const [sortOpen, setSortOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState("High to Low");
  const [filterOpen, setFilterOpen] = useState(false);

  const sortOptions = [
    "High to Low",
    "Low to High",
    "Newest",
    "Oldest",
  ];

  const Bestsells = [
    {
      id: 1,
      name: "Shirt black color",
      price: 50,
    },
    {
      id: 2,
      name: "Shirt white color",
      price: 45,
    },
    {
      id: 3,
      name: "Blue Jeans",
      price: 70,
    },
    {
      id: 4,
      name: "Shirt black color",
      price: 50,
    },
    {
      id: 5,
      name: "Classic T-Shirt",
      price: 55,
    },
    {
      id: 6,
      name: "Slim Fit Jeans",
      price: 75,
    },
    {
      id: 7,
      name: "Winter Jacket",
      price: 95,
    },
    {
      id: 8,
      name: "White Polo",
      price: 60,
    },
    {
      id: 9,
      name: "Casual Shirt",
      price: 65,
    },
    {
      id: 10,
      name: "Black Trousers",
      price: 80,
    },
    {
      id: 11,
      name: "Denim Jacket",
      price: 90,
    },
    {
      id: 12,
      name: "Cotton Shirt",
      price: 48,
    },
  ];

  const toggleSort = () => {
    setSortOpen((prev) => !prev);
  };

  const toggleFilter = () => {
    setFilterOpen((prev) => !prev);
  };

  const handleSort = (option) => {
    setSelectedSort(option);
    setSortOpen(false);
  };

  const productDetails = (product) => {
  navigate(`/productdetails/${product.id}`);
};
  

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
          >
            <h2>FILTERS</h2>

            <i
              className={`ti ${
                filterOpen
                  ? "ti-chevron-down"
                  : "ti-chevron-right"
              }`}
            ></i>
          </div>

          {/* MOBILE FILTER */}
          <div
            className={`mobile-filter-wrapper ${
              filterOpen ? "filter-visible" : "filter-hidden"
            }`}
          >
            <div className="filter-box mb-4">
              <h3>CATEGORIES</h3>

              <label>
                <input type="checkbox" />
                <span>Men</span>
              </label>

              <label>
                <input type="checkbox" />
                <span>Women</span>
              </label>

              <label>
                <input type="checkbox" />
                <span>Kids</span>
              </label>
            </div>

            <div className="filter-box mb-4">
              <h3>TYPE</h3>

              <label>
                <input type="checkbox" />
                <span>Topwear</span>
              </label>

              <label>
                <input type="checkbox" />
                <span>Bottomwear</span>
              </label>

              <label>
                <input type="checkbox" />
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
              >
                <span>Sort by:</span>

                <strong>
                  {selectedSort}
                </strong>

                <i
                  className={`ti ${
                    sortOpen
                      ? "ti-chevron-up"
                      : "ti-chevron-down"
                  }`}
                ></i>
              </div>

              {sortOpen && (
                <div className="sort-dropdown">
                  {sortOptions.map((option) => (
                    <div
                      key={option}
                      className={`sort-option ${
                        selectedSort === option
                          ? "active-sort"
                          : ""
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


          {/* MOBILE PRODUCT GRID */}
          <div className="product-grid row g-3 g-md-4 mt-3">

            {Bestsells.map((product, index) => (
              <div
                className="col-6 col-md-4"
                key={product.id || index}>
                <div
                  className="product-card"
                  onClick={() => productDetails(product)}
                >

                  <div className="product-image-wrapper">
                    <img
                      src={Productimg2}
                      alt={product.name}
                      className="product-image"
                    />
                  </div>

                  <div className="product-info">
                    <p className="product-name">
                      {product.name}
                    </p>

                    <p className="product-price">
                      ${product.price}
                    </p>
                  </div>

                </div>
              </div>
            ))}

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
                  <input type="checkbox" />
                  <span>Men</span>
                </label>

                <label>
                  <input type="checkbox" />
                  <span>Women</span>
                </label>

                <label>
                  <input type="checkbox" />
                  <span>Kids</span>
                </label>

              </div>


              {/* TYPE */}
              <div className="filter-box">

                <h3>TYPE</h3>

                <label>
                  <input type="checkbox" />
                  <span>Topwear</span>
                </label>

                <label>
                  <input type="checkbox" />
                  <span>Bottomwear</span>
                </label>

                <label>
                  <input type="checkbox" />
                  <span>Winterwear</span>
                </label>

              </div>

            </aside>

          </div>


          {/* COLLECTION AREA */}
          <div className="col-lg-9">

            {/* COLLECTION HEADER */}
            <div className="desktop-collection-header">

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
                >
                  <span>Sort by:</span>

                  <strong>
                    {selectedSort}
                  </strong>

                  <i
                    className={`ti ${
                      sortOpen
                        ? "ti-chevron-up"
                        : "ti-chevron-down"
                    }`}
                  ></i>
                </div>

                {sortOpen && (
                  <div className="sort-dropdown">

                    {sortOptions.map((option) => (
                      <div
                        key={option}
                        className={`sort-option ${
                          selectedSort === option
                            ? "active-sort"
                            : ""
                        }`}
                        onClick={() =>
                          handleSort(option)
                        }
                      >
                        {option}
                      </div>
                    ))}

                  </div>
                )}

              </div>

            </div>


            {/* DESKTOP PRODUCT GRID */}
            <div className="row g-4 mt-3">

              {Bestsells.map((product, index) => (
                <div
                  className="col-lg-4 col-xl-4"
                  key={product.id || index}
                >
                  <div
                          className="card h-100 shadow-sm"
                          onClick={() => productDetails(product)}
                          style={{ cursor: "pointer" }}
                        >

                    <div className="product-image-wrapper">
                      <img
                        src={Productimg2}
                        alt={product.name}
                        className="product-image"
                      />
                    </div>

                    <div className="product-info">
                      <p className="product-name">
                        {product.name}
                      </p>

                      <p className="product-price">
                        ${product.price}
                      </p>
                    </div>

                  </div>
                </div>
              ))}

            </div>

          </div>

        </div>

      </main>


    

      <Footer />
    </div>
  );
};

export default Collections;