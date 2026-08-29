import Footer from "../common/Footer";
import Navbar from "../common/Navbar";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    totalPrice,
  } = useCart();

  const shippingFee = cartItems.length > 0 ? 10 : 0;
  const total = totalPrice + shippingFee;

  return (
    <div>
      <Navbar />

      <div className="container-fluid px-3 px-md-4 px-lg-5 py-4">
        <div className="row justify-content-center g-4">

          {/* =========================
              YOUR CART
          ========================= */}
          <div className="col-12 col-lg-6">

            {/* YOUR CART HEADING */}
            <div className="d-flex align-items-center gap-2 mb-4">

              <h3 className="mt-3 text-start fw-bold text-muted">
                YOUR <span className="text-dark">CART</span>
              </h3>

              <div
                className="bg-dark flex-shrink-0"
                style={{
                  width: "30px",
                  height: "2px",
                }}
              ></div>

            </div>


            {/* CART UI DISPLAY */}
            <div className="w-100">

              {/* CART ITEMS */}
              {cartItems.map((item) => (

                <div
                  key={item.id}
                  className="border-top border-bottom py-4"
                >

                  <div className="row align-items-center g-3">

                    {/* PRODUCT IMAGE */}
                    <div className="col-3 col-sm-2">

                      <img
                        src={item.image}
                        alt={item.name}
                        className="img-fluid"
                        style={{
                          height: "100px",
                          width: "80px",
                          objectFit: "cover",
                        }}
                      />

                    </div>


                    {/* PRODUCT NAME + PRICE + SIZE */}
                    <div className="col-9 col-sm-6 col-md-6">

                      <h5 className="mb-3 fw-normal">
                        {item.name}
                      </h5>


                      <div className="d-flex align-items-center gap-3 flex-wrap">

                        {/* PRICE */}
                        <p className="mb-0 fs-6">
                          $ {Number(item.price).toFixed(2)}
                        </p>


                        {/* SIZE */}
                        <div
                          className="border d-flex align-items-center justify-content-center"
                          style={{
                            width: "42px",
                            height: "30px",
                          }}
                        >
                          <p className="mb-0">
                            {item.size || "L"}
                          </p>
                        </div>

                      </div>

                    </div>


                    {/* QUANTITY */}
                    <div className="col-6 col-sm-3 col-md-2">

                      <div
                        className="border d-flex align-items-center justify-content-center"
                        style={{
                          height: "50px",
                          width: "60px",
                        }}
                      >

                        <button
                          className="btn btn-sm p-0 border-0"
                          onClick={() =>
                            decreaseQuantity(item.id)
                          }
                        >
                          -
                        </button>

                        <span className="mx-2">
                          {item.quantity}
                        </span>

                        <button
                          className="btn btn-sm p-0 border-0"
                          onClick={() =>
                            increaseQuantity(item.id)
                          }
                        >
                          +
                        </button>

                      </div>

                    </div>


                    {/* DELETE */}
                    <div className="col-6 col-sm-1 text-end">

                      <button
                        className="btn p-0 border-0"
                        onClick={() =>
                          removeFromCart(item.id)
                        }
                      >
                        <i
                          className="ti ti-trash"
                          style={{
                            fontSize: "20px",
                            cursor: "pointer",
                          }}
                        ></i>
                      </button>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          </div>


          {/* =========================
              CART TOTALS
          ========================= */}
          <div className="col-12 col-lg-6">

            <div className="mt-4 mt-lg-5 w-100">

              {/* CART TOTALS HEADING */}
              <div className="d-flex align-items-center gap-2 gap-md-3 mb-4">

                <h3 className="mb-0 fw-normal fs-2 text-nowrap">

                  <span className="text-muted">
                    CART
                  </span>{" "}

                  <span className="text-dark">
                    TOTALS
                  </span>

                </h3>


                <div
                  className="bg-dark flex-shrink-0"
                  style={{
                    width: "50px",
                    height: "2px",
                  }}
                ></div>

              </div>


              {/* SUBTOTAL */}
              <div className="d-flex justify-content-between align-items-center border-bottom py-3">

                <p className="mb-0 fs-5">
                  Subtotal
                </p>

                <p className="mb-0 fs-5">
                  $ {totalPrice.toFixed(2)}
                </p>

              </div>


              {/* SHIPPING */}
              <div className="d-flex justify-content-between align-items-center border-bottom py-3">

                <p className="mb-0 fs-5">
                  Shipping Fee
                </p>

                <p className="mb-0 fs-5">
                  $ {shippingFee.toFixed(2)}
                </p>

              </div>


              {/* TOTAL */}
              <div className="d-flex justify-content-between align-items-center py-3">

                <p className="mb-0 fs-5 fw-bold">
                  Total
                </p>

                <p className="mb-0 fs-5 fw-bold">
                  $ {total.toFixed(2)}
                </p>

              </div>


              {/* CHECKOUT BUTTON */}
              <div className="d-flex justify-content-end mt-4">

                <button
                  className="btn btn-dark rounded-0 p-3 w-100"
                  style={{
                    maxWidth: "342px",
                    fontSize: "18px",
                  }}
                >
                  PROCEED TO CHECKOUT
                </button>

              </div>

            </div>

          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Cart;