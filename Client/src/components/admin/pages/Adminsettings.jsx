
import AdminNavbar from "../Layout/AdminNavbar";
import Sidebar from "../Layout/Sidebar";

const Adminsettings = () => {
  return (
    <div>
      <AdminNavbar />

      <div className="row g-0">
        {/* SIDEBAR */}
        <div className="col-2 col-sm-2 col-md-3 col-lg-2">
          <Sidebar />
          </div>
          <div className="col-9 col-sm-9 col-md-9 col-lg-10 border-start border-3"></div>
        </div>
      </div>
  
  );
};

export default Adminsettings;
