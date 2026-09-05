import exchange from "../../assets/front/exchange_icon.png";
import support from "../../assets/front/support_img.png";
import quality from "../../assets/front/quality_icon.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProducts, getBestSellers } from "../services/productServices";

const Shop = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const productDetails = (id) => {
    navigate(`/productdetails/${id}`);
  };

  // =========================
  // GET PRODUCTS
  // =========================
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const [productsResponse, bestSellersResponse] = await Promise.all([
          getProducts(),
          getBestSellers(),
        ]);

        console.log("PRODUCTS RESPONSE:", productsResponse.data);
        console.log("BEST SELLERS RESPONSE:", bestSellersResponse.data);

        setProducts(
          productsResponse.data?.products || productsResponse.data?.data || [],
        );

        setBestSellers(
          bestSellersResponse.data?.products ||
            bestSellersResponse.data?.data ||
            [],
        );
      } catch (err) {
        console.error("Error loading products:", err);

        setError(err.response?.data?.message || "Unable to load products.");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <>
      <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600;700&display=swap');

        .shop-section {
          width: 100%;
          overflow-x: hidden;
        }

        .shop-title-wrap {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 12px;
          margin-bottom: 1rem;
          flex-wrap: wrap;
          padding: 0 8px;
        }

        .shop-title {
          font-family: 'Lora', serif;
          font-weight: 400;
          color: #1a1a1a;
          margin: 0;
          text-align: center;
          line-height: 1.2;
        }

        .shop-title span {
          color: #666;
        }

        .shop-title-line {
          width: 40px;
          height: 2px;
          background-color: #1a1a1a;
          flex-shrink: 0;
        }

        .shop-desc {
          max-width: 700px;
          text-align: center;
          color: #666;
          font-size: 14px;
          line-height: 1.6;
          padding: 0 12px;
          margin: 0 auto;
        }

        .product-grid-row {
          margin-left: auto;
          margin-right: auto;
        }

        .product-image-shop-wrapper {
          width: 100%;
          aspect-ratio: 1.45 / 1;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: #fff;
        }

        .product-card-shop {
          height: 100%;
          cursor: pointer;
          border: 1px solid #eee;
          border-radius: 8px;
          overflow: hidden;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .product-card-shop:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.08);
        }

        .product-img-shop {
          width: 100%;
          height: 100%;
          object-fit: contain;
          mix-blend-mode: multiply;
          display: block;
        }

        .product-name-shop {
          margin: 10px 0 4px;
          font-weight: 600;
          font-size: 14px;
          color: #222;
          line-height: 1.3;
          min-height: 2.6em;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .product-price-shop {
          margin: 0;
          font-weight: 700;
          color: #198754;
          font-size: 15px;
        }

        .shop-loading {
          min-height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* ---- MOBILE ---- */
        @media (max-width: 575.98px) {
          .product-grid-row {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            column-gap: 10px;
            row-gap: 18px;
            width: 100% !important;
            max-width: 100%;
          }

          .product-grid-row > [class*="col-"] {
            width: 100%;
            max-width: none;
            padding-left: 0;
            padding-right: 0;
            min-width: 0;
          }

          .product-image-shop-wrapper {
            height: 165px;
          }

          .product-img-shop {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .shop-title {
            font-size: 22px !important;
          }

          .shop-title-line {
            width: 28px;
          }

          .shop-desc {
            font-size: 13px;
          }

          .product-name-shop {
            font-size: 13px;
            min-height: 2.4em;
          }

          .product-price-shop {
            font-size: 14px;
          }

          .product-card-shop {
            border-radius: 0;
            box-shadow: none !important;
          }
        }

        /* ---- LARGE PHONE ---- */
        @media (min-width: 576px) and (max-width: 767.98px) {
          .product-image-shop-wrapper {
            height: 240px;
          }

          .shop-title {
            font-size: 28px !important;
          }

          .product-grid-row {
            width: 100% !important;
          }
        }

        /* ---- TABLET ---- */
        @media (min-width: 768px) and (max-width: 991.98px) {
          .product-image-shop-wrapper {
            height: 230px;
            aspect-ratio: 1.45 / 1;
          }

          .shop-title {
            font-size: 34px !important;
          }

          .product-grid-row {
            width: 95% !important;
          }
        }

        /* ---- DESKTOP ---- */
        @media (min-width: 992px) {
          .shop-title {
            font-size: 42px !important;
            white-space: nowrap;
          }

          .shop-title-line {
            width: 50px;
          }

          .product-image-shop-wrapper {
            height: 260px;
          }

          .product-name-shop {
            font-size: 15px;
          }

          .product-grid-row {
            width: 90% !important;
          }
        }
      `}
      </style>

      <div className="container-fluid px-2 px-sm-3 px-md-4 mt-5 shop-section">
        {/* =========================================
            LATEST COLLECTIONS HEADER
        ========================================= */}
        <div className="row">
          <div className="col-12">
            <div className="d-flex flex-column justify-content-center align-items-center mb-4 mb-md-5">
              <div className="shop-title-wrap">
                <h1 className="shop-title">
                  <span>LATEST</span> COLLECTIONS
                </h1>

                <div className="shop-title-line"></div>
              </div>

              <p className="shop-desc">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the.
              </p>
            </div>
          </div>
        </div>

        {/* =========================================
            LATEST PRODUCTS
        ========================================= */}
        <div className="px-1 px-sm-2 px-md-3">
          {loading ? (
            <div className="shop-loading">
              <div className="spinner-border text-success" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : error ? (
            <div className="alert alert-danger text-center">{error}</div>
          ) : products.length === 0 ? (
            <div className="alert alert-info text-center">
              No products available.
            </div>
          ) : (
            <div className="row g-2 g-sm-3 g-md-4 product-grid-row">
              {products.map((product, index) => (
                <div
                  className="col-6 col-md-4 col-lg-3"
                  key={product.id || index}
                >
                  <div
                    className="card product-card-shop h-100 shadow-sm"
                    onClick={() => productDetails(product.id)}
                  >
                    <div className="card-body text-center p-0">
                      <div className="product-image-shop-wrapper">
                        <img
                          src={
                            product.mainImage ||
                            product.main_image ||
                            product.image1
                          }
                          alt={product.name}
                          className="product-img-shop"
                        />
                      </div>

                      <div className="px-2 pb-3 pt-1">
                        <p className="product-name-shop">{product.name}</p>

                        <p className="product-price-shop">${product.price}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* =========================================
            BEST SELLERS HEADER
        ========================================= */}
        <div className="row mt-5">
          <div className="col-12">
            <div className="d-flex flex-column justify-content-center align-items-center mb-4 mb-md-5">
              <div className="shop-title-wrap">
                <h1 className="shop-title">
                  <span>BEST</span> SELLERS
                </h1>

                <div className="shop-title-line"></div>
              </div>

              <p className="shop-desc">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the.
              </p>
            </div>
          </div>
        </div>

        {/* =========================================
            BEST SELLERS
        ========================================= */}
        <div className="px-1 px-sm-2 px-md-3">
          {loading ? (
            <div className="shop-loading">
              <div className="spinner-border text-success" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : bestSellers.length === 0 ? (
            <div className="alert alert-info text-center">
              No best sellers available.
            </div>
          ) : (
            <div className="row g-2 g-sm-3 g-md-4 product-grid-row">
              {bestSellers.map((product, index) => (
                <div
                  className="col-6 col-md-4 col-lg-3"
                  key={product.id || index}
                >
                  <div
                    className="card product-card-shop h-100 shadow-sm"
                    onClick={() => productDetails(product.id)}
                  >
                    <div className="card-body text-center p-0">
                      <div className="product-image-shop-wrapper">
                        <img
                          src={
                            product.mainImage ||
                            product.main_image ||
                            product.image1 ||
                            Productimg2
                          }
                          alt={product.name}
                          className="product-img-shop"
                        />
                      </div>

                      <div className="px-2 pb-3 pt-1">
                        <p className="product-name-shop">{product.name}</p>

                        <p className="product-price-shop">${product.price}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* =========================================
            POLICY SECTION
        ========================================= */}
        <div className="row mt-4 mt-md-5 p-2 d-flex justify-content-center g-3 mx-1 mx-md-4">
          <div className="col-12 col-md-4 col-lg-3 p-2">
            <img src={exchange} alt="" className="d-block mx-auto" />

            <h4 className="text-dark text-center mt-2">Easy Exchange Policy</h4>

            <p className="text-muted text-center mb-0">
              We offer hassle free exchange policy
            </p>
          </div>

          <div className="col-12 col-md-4 col-lg-4 p-2">
            <img src={quality} alt="" className="d-block mx-auto" />

            <h4 className="text-dark text-center mt-2">7 Days Return Policy</h4>

            <p className="text-muted text-center mb-0">
              We provide 7 days free return policy
            </p>
          </div>

          <div className="col-12 col-md-4 col-lg-3 p-2">
            <img src={support} alt="" className="d-block mx-auto" />

            <h4 className="text-dark text-center mt-2">
              Best customer support
            </h4>

            <p className="text-muted text-center mb-0">
              we provide 24/7 customer support
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
