import Logo from "../../../assets/back/logo.png";

const AdminNavbar = () => {
  return (
    <div className="border border-danger">
      <div className="row m-auto mx-4 d-flex justify-content-between align-items-center ">
        <div className="col-4">
          <div className="col-3 py-3">
            <div className="image-container ps-2 mt-2">
              <img
                src={Logo}
                alt="logo"
                style={{ width: "140px", height: "auto" }}
              />
            </div>
          </div>
        </div>
        <div className="col-3 col-sm-3 col-md-3 col-lg-1">
          <div className="bg-secondary text-white p-2 rounded-pill text-center">
            <h3 className="mb-0 fs-6">Logout</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
