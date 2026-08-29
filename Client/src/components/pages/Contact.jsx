import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import Newsletter from "./Newsletter";
import Contactimg from "../../assets/front/contact_img.png";

const Contact = () => {
  return (
    <div>
      <Navbar />
      <div className=" mb-4 p-2">
        <div className="d-flex justify-content-center mt-4 align-items-center">
          <h3 className="mt-3 text-center fw-bold text-muted">
            CONTACT <span className="text-dark">US</span>
          </h3>
          <div
            className="mt-3  "
            style={{ width: "30px", height: "2px", backgroundColor: "black" }}
          ></div>
        </div>
        <div className="row mt-4 m-auto p-2 d-flex justify-content-center align-items-center gap-2">
          <div className="col-10 col-lg-5 p-2">
            <img
              src={Contactimg}
              alt=""
              className="p-4"
              style={{ width: "100%", height: "100%" }}
            />
          </div>
          <div className="col-10 col-lg-5 p-2">
            <h5 className="fs-3 fw-3">Our Store</h5>
            <p className="fs-6 mb-0">54709 Willms Station</p>
            <p className="fs-6 mb-3">Suite 350, Washington, USA</p>

            <p className="fs-6 mb-0">Tel: (415) 555-0132</p>
            <p className="fs-6">Email: admin@forever.com</p>

            
          </div>
        </div>
      </div>
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Contact;
