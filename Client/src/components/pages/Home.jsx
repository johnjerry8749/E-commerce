import hero_image from "../../assets/front/hero_img.png";

const Home = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600;700&display=swap');

        @media (max-width: 768px) {
          .hero-label {
            font-size: 13px !important;
          }
          .hero-title {
            font-size: 40px !important;
          }
          .hero-button {
            font-size: 13px !important;
          }
        }

        @media (min-width: 769px) and (max-width: 1024px) {
          .hero-label {
            font-size: 14px !important;
          }
          .hero-title {
            font-size: 56px !important;
          }
          .hero-button {
            font-size: 14px !important;
          }
        }

        @media (min-width: 1025px) {
          .hero-label {
            font-size: 14px !important;
          }
          .hero-title {
            font-size: 80px !important;
          }
          .hero-button {
            font-size: 15px !important;
          }
        }
      `}</style>

      <div className="bg-white" style={{ width: "100%" }}>
        <div
          className="row m-auto border border-dark d-flex justify-content-center align-items-center"
          style={{ width: "81%" }}
        >
          {/* Left Content */}
          <div
            className="col-sm-12 col-md-12 bg-white col-lg-6 d-flex flex-column justify-content-center p-5"
            style={{ backgroundColor: "#f9f7f4" }}
          >
            <p
              className="mb-4 hero-label"
              style={{
                fontWeight: "600",
                letterSpacing: "2px",
                textTransform: "uppercase",
              }}
            >
              ── OUR BESTSELLERS
            </p>
            <h1
              className="mb-4 hero-title"
              style={{
                fontWeight: "400",
                color: "#1a1a1a",
                lineHeight: "1.1",
                fontFamily: "'Lora', serif",
              }}
            >
              Latest Arrivals
            </h1>
            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
              <div
                style={{
                  width: "40px",
                  height: "1px",
                  backgroundColor: "#1a1a1a",
                }}
              ></div>
              <p
                className="hero-button mb-0"
                style={{
                  fontWeight: "600",
                  color: "#1a1a1a",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                }}
              >
                Shop now
              </p>
              <div
                style={{
                  width: "40px",
                  height: "1px",
                  backgroundColor: "#1a1a1a",
                }}
              ></div>
            </div>
          </div>

          <div
            className="col-sm-12 col-md-12 col-lg-6 d-flex justify-content-center align-items-center"
            style={{ backgroundColor: "#deb1a07b" }}
          >
            <img
              src={hero_image}
              alt="Hero Image"
              className="img-fluid"
              style={{ height: "auto", width: "100%", objectFit: "cover" }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
