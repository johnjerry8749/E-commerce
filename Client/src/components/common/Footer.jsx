import Logo from "../../assets/front/logo.png";

const Footer = () => {
  return (
    <>
      <style>
        {`
          .custom-footer {
            background: #fff;
            color: #172c4d;
            padding: 75px 0 25px;
          }

          .footer-logo {
            font-size: 42px;
            font-weight: 600;
            letter-spacing: -2px;
            color: #292929;
            line-height: 1;
            margin-bottom: 35px;
          }

          .footer-logo span {
            color: #c58aae;
          }

          .footer-description {
            max-width: 550px;
            font-size: 19px;
            line-height: 1.6;
            color: #17304f;
            margin: 0;
          }

          .footer-heading {
            font-size: 29px;
            font-weight: 500;
            color: #000;
            margin-bottom: 35px;
          }

          .footer-links {
            list-style: none;
            padding: 0;
            margin: 0;
          }

          .footer-links li {
            margin-bottom: 13px;
          }

          .footer-links a {
            text-decoration: none;
            color: #263d5b;
            font-size: 19px;
            transition: color 0.3s ease;
          }

          .footer-links a:hover {
            color: #c58aae;
          }

          .footer-contact p {
            margin-bottom: 13px;
            color: #263d5b;
            font-size: 19px;
          }

          .footer-divider {
            border: 0;
            border-top: 1px solid #ddd;
            margin: 60px 0 30px;
          }

          .footer-copyright {
            text-align: center;
            color: #000;
            font-size: 18px;
            margin: 0;
          }

          @media (max-width: 991px) {
            .custom-footer {
              padding: 55px 0 25px;
            }

            .footer-logo {
              font-size: 38px;
            }

            .footer-description {
              font-size: 17px;
            }

            .footer-heading {
              font-size: 25px;
            }

            .footer-links a,
            .footer-contact p {
              font-size: 17px;
            }
          }

          @media (max-width: 767px) {
            .custom-footer {
              padding: 50px 20px 25px;
              text-align: center;
            }

            .footer-logo {
              font-size: 36px;
              margin-bottom: 25px;
            }

            .footer-description {
              max-width: 100%;
              font-size: 16px;
              margin: 0 auto 45px;
            }

            .footer-heading {
              font-size: 24px;
              margin-bottom: 20px;
            }

            .footer-links li {
              margin-bottom: 10px;
            }

            .footer-links a,
            .footer-contact p {
              font-size: 16px;
            }

            .footer-divider {
              margin: 45px 0 25px;
            }

            .footer-copyright {
              font-size: 15px;
              line-height: 1.5;
            }
          }
        `}
      </style>

      <footer className="custom-footer">
        <div className="container">
          <div className="row">
            {/* BRAND / DESCRIPTION */}
            <div className="col-12 col-md-6 col-lg-7 mb-5 mb-lg-0">
              <div className="col-3 py-3">
                <div className="image-container ps-2 mt-2">
                  <img
                    src={Logo}
                    alt="logo"
                    style={{ width: "200px", height: "auto" }}
                  />
                </div>
              </div>

              <p className="footer-description">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
              </p>
            </div>

            {/* COMPANY */}
            <div className="col-6 col-md-3 col-lg-2 mb-4 mb-md-0">
              <h4 className="footer-heading">COMPANY</h4>

              <ul className="footer-links">
                <li>
                  <a href="/">Home</a>
                </li>

                <li>
                  <a href="/about">About us</a>
                </li>

                <li>
                  <a href="/delivery">Delivery</a>
                </li>

                <li>
                  <a href="/privacy">Privacy policy</a>
                </li>
              </ul>
            </div>

            {/* GET IN TOUCH */}
            <div className="col-6 col-md-3 col-lg-3">
              <h4 className="footer-heading">GET IN TOUCH</h4>

              <div className="footer-contact">
                <p>+1-212-456-7890</p>

                <p>contact@foreveryou.com</p>
              </div>
            </div>
          </div>

          {/* DIVIDER */}
          <hr className="footer-divider" />

          {/* COPYRIGHT */}
          <p className="footer-copyright">
            Copyright 2024@ forever.com - All Right Reserved.
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
