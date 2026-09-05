import AdminNavbar from "../../Layout/AdminNavbar"
import Sidebar from "../../Layout/Sidebar";
import { getAllOrdersAdmin, updateOrderStatus , getOrderById  } from "../../../services/ordersService";


const OrderList = () => {
  return (
    <div>
     <AdminNavbar />

      <div className="row g-0">
        {/* SIDEBAR */}
        <div className="col-3 col-sm-3 col-md-3 col-lg-2">
          <Sidebar />
          </div>
          <div className="col-9 col-sm-9 col-md-9 col-lg-10 border-start border-3">
            <div className="p-2">
              <p className="fs-4">All Orders</p>
              <div className="row border border-dark p-2 m-auto">

              </div>
            </div>
            
          </div>
        </div>
      </div>
  )
}

export default OrderList
