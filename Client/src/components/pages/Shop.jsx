import Productimg from "../../assets/front/p_img50.png";
import Productimg2 from "../../assets/front/p_img49.png";
import exchange from "../../assets/front/exchange_icon.png";
import support from "../../assets/front/support_img.png";
import quality from "../../assets/front/quality_icon.png";
import { useNavigate } from "react-router-dom";

const Shop = () => {
  const navigate = useNavigate();

  const productDetails = (id) => {
    navigate(`/productdetails/${id}`);
  };

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

  const product = [
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

  return (
    <>
      <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600;700&display=swap');

        @media (max-width: 768px) {
          .shop-title {
            font-size: 36px !important;
          }
          .product-item {
            flex: 0 0 calc(50% - 12px) !important;
          }
        }

        @media (min-width: 769px) and (max-width: 1024px) {
          .shop-title {
            font-size: 38px !important;
          }
          .product-item {
            flex: 0 0 calc(25% - 12px) !important;
          }
        }

        @media (min-width: 1025px) {
          .shop-title {
            font-size: 44px !important;
          }
          .product-item {
            flex: 0 0 calc(10% - 10px) !important;
          }
        }

  `}
      </style>

      <div className="container-fluid p-4 mt-5">
        <div className="row">
          <div className="col-12">
            <div className="d-flex flex-column justify-content-center align-items-center mb-5">
              {/* Title with decorative lines */}
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
                  <span style={{ color: "#666" }}>LATEST</span> COLLECTIONS
                </h1>
                <div
                  style={{
                    width: "50px",
                    height: "2px",
                    backgroundColor: "#1a1a1a",
                  }}
                ></div>
              </div>

              {/* Description text */}
              <p
                style={{
                  maxWidth: "700px",
                  textAlign: "center",
                  color: "#666",
                  fontSize: "15px",
                  lineHeight: "1.6",
                }}
              >
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the.
              </p>
            </div>
          </div>
        </div>

        <div className="container-fluid  p-3 p-md-4">
          <div className="row g-3 g-md-4 mx-auto " style={{ width: "90%" }}>
            {product.map((products, index) => (
              <div
                className="col-6 col-md-4 col-lg-3"
                key={products.id || index}
              >
                <div
                  className="card h-100 shadow-sm"
                  onClick= {() => productDetails(products.id)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="card-body text-center">
                    <img
                      src={Productimg}
                      alt={products.name}
                      className="img-fluid"
                      style={{
                        height: "260px",
                        width: "100%",
                        objectFit: "cover",
                      }}
                    />

                    <p className="card-text mt-3 mb-1 fw-semibold">
                      {products.name}
                    </p>

                    <p className="card-text text-success fw-bold">
                      {products.price}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* //BEST SELLER SECTION */}

        <div className="row mt-4">
          <div className="col-12">
            <div className="d-flex flex-column justify-content-center align-items-center mb-5">
              {/* Title with decorative lines */}
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
                  <span style={{ color: "#666" }}>BEST</span> SELLERS
                </h1>
                <div
                  style={{
                    width: "50px",
                    height: "2px",
                    backgroundColor: "#1a1a1a",
                  }}
                ></div>
              </div>

              {/* Description text */}
              <p
                style={{
                  maxWidth: "700px",
                  textAlign: "center",
                  color: "#666",
                  fontSize: "15px",
                  lineHeight: "1.6",
                }}
              >
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the.
              </p>
            </div>
          </div>
        </div>

        <div className="container-fluid  p-3 p-md-4">
          <div className="row g-3 g-md-4 mx-auto " style={{ width: "90%" }}>
            {Bestsells.map((Bestsell, index) => (
              <div
                className="col-6 col-md-4 col-lg-3"
                key={Bestsell.id || index}
              >
                <div
                  className="card h-100 shadow-sm"
                  onClick= {() => productDetails(Bestsell.id)}
                  style={{ cursor: "pointer" }}
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
                      {Bestsell.price}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="row  mt-3 p-2 d-flex justify-content-center gap-2 mx-4">
          <div className="col-12 col-md-12 col-lg-3  p-2 ">
            <img src={exchange} alt="" className="d-block mx-auto" />
            <h4 className="text-dark text-center">Easy Exchange Policy</h4>
            <p className="text-muted text-center">
              We offer hassle free exchange policy
            </p>
          </div>
          <div className="col-12 col-md-12 col-lg-4 p-2">
            <img src={quality} alt="" className="d-block mx-auto" />
            <h4 className="text-dark text-center">7 Days Return Policy</h4>
            <p className="text-muted text-center">
              We provide 7 days free return policy
            </p>
          </div>
          <div className="col-12 col-md-12 col-lg-3 p-2">
            <img src={support} alt="" className="d-block mx-auto" />
            <h4 className="text-dark text-center">Best customer support</h4>
            <p className="text-muted text-center">
              we provide 24/7 customer support
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
