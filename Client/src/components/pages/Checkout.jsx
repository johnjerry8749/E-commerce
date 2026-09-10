import Footer from "../common/Footer";
import Navbar from "../common/Navbar";

const Checkout = () => {
  return (
    <div>
      <Navbar />
      <div className="p-2 ms-3">
        <div className="row m-auto border border-danger gap-2 p-2">
          <div class="col-12 col-md-12 col-lg-5   border border-danger p-2"></div>
          <div class="col-4 border border-danger p-2 d-block d-md-none d-sm-none d-lg-block"></div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Checkout;
