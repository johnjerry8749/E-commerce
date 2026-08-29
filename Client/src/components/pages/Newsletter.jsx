const Newsletter = () => {
  return (
    <section
      className="w-100"
      style={{
        backgroundColor: "#fff",
        padding: "70px 20px",
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8 text-center">

            {/* Heading */}
            <h2
              style={{
                color: "#172c4d",
                fontSize: "36px",
                fontWeight: "600",
                marginBottom: "22px",
                lineHeight: "1.3",
              }}
            >
              Subscribe now & get 20% off
            </h2>

            {/* Description */}
            <p
              style={{
                color: "#9ba6ba",
                fontSize: "22px",
                marginBottom: "38px",
                lineHeight: "1.5",
              }}
            >
              Lorem Ipsum is simply dummy text of the printing and
              typesetting industry.
            </p>

            {/* Newsletter Form */}
            <form
              className="d-flex mx-auto"
              style={{
                maxWidth: "790px",
                height: "74px",
              }}
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="form-control"
                style={{
                  height: "74px",
                  border: "1px solid #dfe3e8",
                  borderRadius: "0",
                  fontSize: "22px",
                  padding: "0 20px",
                  color: "#555",
                  boxShadow: "none",
                }}
              />

              <button
                type="submit"
                className="btn"
                style={{
                  height: "74px",
                  width: "215px",
                  minWidth: "180px",
                  backgroundColor: "#000",
                  color: "#fff",
                  borderRadius: "0",
                  fontSize: "16px",
                  fontWeight: "500",
                }}
              >
                SUBSCRIBE
              </button>
            </form>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
