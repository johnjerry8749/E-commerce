import Footer from "../common/Footer";
import Navbar from "../common/Navbar";
import { useCart } from "../context/CartContext";
import Productimg2 from "../../assets/front/p_img49.png";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { addToCart } = useCart();

  // GET PRODUCT ID FROM URL
  const { id } = useParams();

  const products = [
    {
      id: 1,
      name: "Shirt black color",
      price: "$50",
    },
    {
      id: 2,
      name: "Blue Jeans",
      price: "$70",
    },
    {
      id: 3,
      name: "Shirt black color",
      price: "$50",
    },
    {
      id: 4,
      name: "Shirt white color",
      price: "$45",
    },
    {
      id: 5,
      name: "Blue Jeans",
      price: "$70",
    },
    {
      id: 6,
      name: "Shirt black color",
      price: "$50",
    },
    {
      id: 7,
      name: "Shirt white color",
      price: "$45",
    },
    {
      id: 8,
      name: "Blue Jeans",
      price: "$70",
    },
    {
      id: 9,
      name: "Shirt black color",
      price: "$50",
    },
    {
      id: 10,
      name: "Blue Jeans",
      price: "$70",
    },
    {
      id: 11,
      name: "Shirt black color",
      price: "$50",
    },
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

  // FIND THE PRODUCT THAT WAS CLICKED
  const product =
    Bestsells.find ((item) => item.id === Number(id)) ||
    products.find ((item) => item.id === Number(id));

  // PRODUCT NOT FOUND
  if (!product) {
    return (
      <div>
        <Navbar />

        <div className="container py-5 text-center">
          <h2>Product not found</h2>
        </div>

        <Footer />
      </div>
    );
  }

  // ADD THIS PRODUCT TO CART
  const handleAddToCart = () => {
    addToCart({
      ...product,
      image: Productimg2,
    });
  };

  return (
    <div className="bg-white">
      <Navbar />

      <div className="container py-5">
        <div className="row g-4 justify-content-center">
          {/* ================= SIDE IMAGES ================= */}
          <div className="col-12 col-lg-1">
            <div className="d-flex flex-row flex-lg-column justify-content-center gap-2">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="border rounded p-1"
                  style={{
                    width: "80px",
                    height: "90px",
                  }}
                >
                  <img
                    src={Productimg2}
                    alt={product.name}
                    className="w-100 h-100"
                    style={{
                      objectFit: "cover",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* ================= MAIN PRODUCT IMAGE ================= */}
          <div className="col-12 col-md-7 col-lg-5">
            <div
              className="border rounded-3 p-3 bg-light"
              style={{
                height: "550px",
              }}
            >
              <img
                src={Productimg2}
                alt={product.name}
                className="w-100 h-100"
                style={{
                  objectFit: "contain",
                }}
              />
            </div>
          </div>

          {/* ================= PRODUCT DETAILS ================= */}
          <div className="col-12 col-md-5 col-lg-5">
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
                  ${product.price.toFixed(2)}
                </span>

                <span className="text-muted text-decoration-line-through ms-3">
                  $55.00
                </span>

                <span className="badge bg-danger ms-2">27% OFF</span>
              </div>

              {/* DESCRIPTION */}
              <p className="text-muted lh-lg">
                A lightweight, usually knitted pullover shirt, close-fitting and
                designed with a round neckline and short sleeves. Perfect for
                casual everyday wear.
              </p>

              <hr />

              {/* SIZE */}
              <h5 className="fw-semibold mb-3">Select Size</h5>

              <div className="d-flex flex-wrap gap-2 mb-4">
                <button className="btn btn-outline-dark px-4">S</button>

                <button className="btn btn-outline-dark px-4">M</button>

                <button className="btn btn-outline-dark px-4">L</button>

                <button className="btn btn-outline-dark px-4">XL</button>

                <button className="btn btn-outline-dark px-4">XXL</button>
              </div>

              {/* ADD TO CART */}
              <div className="d-flex gap-2 mb-4">
                <button
                  className="btn btn-dark flex-grow-1 py-3 fw-semibold"
                  onClick={handleAddToCart}
                >
                  ADD TO CART
                </button>
              </div>

              {/* DELIVERY */}
              <div className="border rounded-3 p-3">
                <div className="d-flex gap-2 mb-3">
                  <span className="fs-4">🚚</span>

                  <div>
                    <h6 className="fw-semibold mb-1">Free Delivery</h6>

                    <small className="text-muted">
                      Free delivery on orders over $50
                    </small>
                  </div>
                </div>

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

        {/* ================= PRODUCT INFORMATION ================= */}
        <div className="row mt-5">
          <div className="col-12">
            <div className="border rounded-3 p-4">
              <h4 className="fw-semibold mb-4">Product Information</h4>

              <div className="row">
                <div className="col-6 col-md-4 mb-3">
                  <small className="text-muted">Material</small>
                  <p className="fw-semibold mb-0">100% Cotton</p>
                </div>

                <div className="col-6 col-md-4 mb-3">
                  <small className="text-muted">Fit</small>
                  <p className="fw-semibold mb-0">Regular Fit</p>
                </div>

                <div className="col-6 col-md-4 mb-3">
                  <small className="text-muted">Neck Type</small>
                  <p className="fw-semibold mb-0">Round Neck</p>
                </div>

                <div className="col-6 col-md-4 mb-3">
                  <small className="text-muted">Sleeve</small>
                  <p className="fw-semibold mb-0">Short Sleeve</p>
                </div>

                <div className="col-6 col-md-4 mb-3">
                  <small className="text-muted">Style</small>
                  <p className="fw-semibold mb-0">Casual</p>
                </div>

                <div className="col-6 col-md-4 mb-3">
                  <small className="text-muted">Availability</small>
                  <p className="text-success fw-semibold mb-0">In Stock</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= RELATED PRODUCTS ================= */}
        <div className="row mt-5">
          <div className="col-12">
            <div className="d-flex flex-column justify-content-center align-items-center mb-5">
              <div className="d-flex justify-content-center align-items-center gap-4 mb-4">
                <h1
                  className="shop-title mb-0"
                  style={{
                    fontFamily: "'Lora', serif",
                    fontWeight: "400",
                    color: "#1a1a1a",
                    whiteSpace: "nowrap",
                  }}
                >
                  <span style={{ color: "#666" }}>RELATED</span> PRODUCTS
                </h1>

                <div
                  style={{
                    width: "50px",
                    height: "2px",
                    backgroundColor: "#1a1a1a",
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* RELATED PRODUCT GRID */}
        <div className="container-fluid p-3 p-md-4">
          <div
            className="row g-3 g-md-4 mx-auto"
            style={{
              width: "90%",
            }}
          >
            {Bestsells.filter((item) => item.id !== product.id).map(
              (Bestsell) => (
                <div className="col-6 col-md-4 col-lg-3" key={Bestsell.id}>
                  <div
                    className="card h-100 shadow-sm"
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    <div className="card-body text-center">
                      <img
                        src={Productimg2}
                        alt={Bestsell.name}
                        className="img-fluid"
                        style={{
                          height: "260px",
                          width: "100%",
                          objectFit: "cover",
                        }}
                      />

                      <p className="card-text mt-3 mb-1 fw-semibold">
                        {Bestsell.name}
                      </p>

                      <p className="card-text text-success fw-bold">
                        ${Bestsell.price}
                      </p>
                    </div>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetails;
