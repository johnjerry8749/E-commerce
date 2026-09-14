import { useEffect, useState } from "react";

import AdminNavbar from "../../Layout/AdminNavbar";
import Sidebar from "../../Layout/Sidebar";

import {
  getAllOrdersAdmin,
  updateOrderStatus,
  getOrderById,
} from "../../../services/ordersService";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [updatingId, setUpdatingId] = useState(null);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);

  // ========================================
  // GET ALL ORDERS
  // ========================================
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getAllOrdersAdmin();

        console.log("ALL ORDERS:", response);

        const orderList = Array.isArray(response)
          ? response
          : response?.orders || response?.data || [];

        setOrders(orderList);
      } catch (error) {
        console.error("Error fetching orders:", error);

        setError(error?.response?.data?.message || "Failed to load orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // ========================================
  // VIEW ORDER DETAILS
  // ========================================
  const handleViewDetails = async (order) => {
    try {
      setLoadingDetails(true);
      setError("");

      // Show existing order information immediately
      setSelectedOrder(order);

      console.log("SELECTED ORDER:", order);

      // Fetch complete order details
      const response = await getOrderById(order.id);

      console.log("SINGLE ORDER RESPONSE:", response);

      const detailedOrder =
        response?.order || response?.data?.order || response?.data || response;

      if (detailedOrder && typeof detailedOrder === "object") {
        setSelectedOrder({
          ...order,
          ...detailedOrder,
        });
      }

      openOrderModal();
    } catch (error) {
      console.error("Error fetching order details:", error);

      setSelectedOrder(order);

      setError(
        error?.response?.data?.message ||
          "Could not load additional order details.",
      );

      // Still show available order information
      openOrderModal();
    } finally {
      setLoadingDetails(false);
    }
  };

  // ========================================
  // OPEN BOOTSTRAP MODAL
  // ========================================
  const openOrderModal = () => {
    const modalElement = document.getElementById("orderDetailsModal");

    if (modalElement && window.bootstrap) {
      const modal = window.bootstrap.Modal.getOrCreateInstance(modalElement);

      modal.show();
    }
  };

  // ========================================
  // UPDATE ORDER STATUS
  // ========================================
  const handleStatusChange = async (orderId, status) => {
    try {
      setUpdatingId(orderId);
      setError("");

      const response = await updateOrderStatus(orderId, { status });

      console.log("UPDATED ORDER RESPONSE:", response);

      const updatedOrder = response?.order;

      setOrders((currentOrders) =>
        currentOrders.map((order) => {
          if (Number(order.id) !== Number(orderId)) {
            return order;
          }

          return (
            updatedOrder || {
              ...order,
              status,
            }
          );
        }),
      );

      // Update selected order if modal is open
      setSelectedOrder((currentOrder) => {
        if (currentOrder && Number(currentOrder.id) === Number(orderId)) {
          return {
            ...currentOrder,
            status,
          };
        }

        return currentOrder;
      });
    } catch (error) {
      console.error("Error updating order status:", error);

      setError(
        error?.response?.data?.message || "Failed to update order status.",
      );
    } finally {
      setUpdatingId(null);
    }
  };

  // ========================================
  // GET ORDER ITEMS
  // ========================================
  const getOrderItems = () => {
    if (!selectedOrder) {
      return [];
    }

    return (
      selectedOrder.items ||
      selectedOrder.order_items ||
      selectedOrder.orderItems ||
      selectedOrder.products ||
      []
    );
  };

  const orderItems = getOrderItems();

  // ========================================
  // RENDER
  // ========================================
  return (
    <div>
      <AdminNavbar />

      <div className="row g-0">
        {/* SIDEBAR */}
        <div className="col-2 col-sm-2 col-md-3 col-lg-2">
          <Sidebar />
        </div>

        {/* MAIN CONTENT */}
        <div className="col-10 col-sm-10 col-md-9 col-lg-10 border-start border-3">
          <div className="p-3">
            <p className="fs-4 mb-3">All Orders</p>

            {/* ERROR */}
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}

            {/* LOADING */}
            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>

                <p className="mt-2">Loading orders...</p>
              </div>
            ) : orders.length === 0 ? (
              <div className="alert alert-info">No orders found.</div>
            ) : (
              /* ORDERS TABLE */
              <div className="table-responsive border border-dark">
                <table className="table table-bordered table-hover align-middle mb-0">
                  <thead className="table-dark">
                    <tr>
                      <th>#</th>
                      <th>Customer</th>
                      <th>Email</th>
                      <th>Total</th>
                      <th>Payment</th>
                      <th>Address</th>
                      <th>Status</th>
                      <th>Date</th>
                      <th>Details</th>
                    </tr>
                  </thead>

                  <tbody>
                    {orders.map((order, index) => (
                      <tr key={order.id}>
                        {/* NUMBER */}
                        <td>{index + 1}</td>

                        {/* CUSTOMER */}
                        <td>
                          {order.user_name ||
                            order.username ||
                            order.name ||
                            "N/A"}
                        </td>

                        {/* EMAIL */}
                        <td>{order.user_email || order.email || "N/A"}</td>

                        {/* TOTAL */}
                        <td>
                          ₦{Number(order.total_amount || 0).toLocaleString()}
                        </td>

                        {/* PAYMENT */}
                        <td>{order.payment_method || "COD"}</td>

                        {/* ADDRESS */}
                        <td>
                          <div>{order.shipping_address || "N/A"}</div>

                          <small className="text-muted">
                            {order.shipping_city || ""}

                            {order.shipping_city && order.shipping_state
                              ? ", "
                              : ""}

                            {order.shipping_state || ""}

                            {order.shipping_country
                              ? `, ${order.shipping_country}`
                              : ""}
                          </small>
                        </td>

                        {/* STATUS */}
                        <td>
                          <select
                            className="form-select form-select-sm"
                            value={order.status || "pending"}
                            disabled={updatingId === order.id}
                            onChange={(event) =>
                              handleStatusChange(order.id, event.target.value)
                            }
                          >
                            <option value="pending">Pending</option>

                            <option value="processing">Processing</option>

                            <option value="shipped">Shipped</option>

                            <option value="delivered">Delivered</option>

                            <option value="cancelled">Cancelled</option>

                            <option value="payment_pending">
                              Payment Pending
                            </option>
                          </select>
                        </td>

                        {/* DATE */}
                        <td>
                          {order.created_at
                            ? new Date(order.created_at).toLocaleDateString()
                            : "N/A"}
                        </td>

                        {/* DETAILS */}
                        <td>
                          <button
                            type="button"
                            className="btn btn-primary btn-sm"
                            onClick={() => handleViewDetails(order)}
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ==========================================
          ORDER DETAILS MODAL
      ========================================== */}
      <div
        className="modal fade"
        id="orderDetailsModal"
        tabIndex="-1"
        aria-labelledby="orderDetailsModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl modal-dialog-scrollable">
          <div className="modal-content">
            {/* MODAL HEADER */}
            <div className="modal-header">
              <h5 className="modal-title" id="orderDetailsModalLabel">
                Order Details
                {selectedOrder?.id ? ` #${selectedOrder.id}` : ""}
              </h5>

              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>

            {/* MODAL BODY */}
            <div className="modal-body">
              {loadingDetails ? (
                <div className="text-center py-4">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>

                  <p className="mt-2">Loading order details...</p>
                </div>
              ) : selectedOrder ? (
                <>
                  {/* CUSTOMER INFORMATION */}
                  <div className="card mb-3">
                    <div className="card-header fw-bold">
                      Customer Information
                    </div>

                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-4 mb-3">
                          <strong>Name</strong>

                          <div>
                            {selectedOrder.user_name ||
                              selectedOrder.username ||
                              selectedOrder.name ||
                              selectedOrder.user?.name ||
                              "N/A"}
                          </div>
                        </div>

                        <div className="col-md-4 mb-3">
                          <strong>Email</strong>

                          <div>
                            {selectedOrder.user_email ||
                              selectedOrder.email ||
                              selectedOrder.user?.email ||
                              "N/A"}
                          </div>
                        </div>

                        <div className="col-md-4 mb-3">
                          <strong>Phone</strong>

                          <div>
                            {selectedOrder.phone_number ||
                              selectedOrder.phone ||
                              selectedOrder.user_phone ||
                              selectedOrder.user?.phone ||
                              "N/A"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* SHIPPING ADDRESS */}
                  <div className="card mb-3">
                    <div className="card-header fw-bold">Shipping Address</div>

                    <div className="card-body">
                      <div className="mb-3">
                        <strong>Address</strong>

                        <div>{selectedOrder.shipping_address || "N/A"}</div>
                      </div>

                      <div className="row">
                        <div className="col-md-4">
                          <strong>City</strong>

                          <div>{selectedOrder.shipping_city || "N/A"}</div>
                        </div>

                        <div className="col-md-4">
                          <strong>State</strong>

                          <div>{selectedOrder.shipping_state || "N/A"}</div>
                        </div>

                        <div className="col-md-4">
                          <strong>Country</strong>

                          <div>{selectedOrder.shipping_country || "N/A"}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ORDERED PRODUCTS */}
                  <div className="card mb-3">
                    <div className="card-header fw-bold">Ordered Products</div>

                    <div className="card-body p-0">
                      {orderItems.length === 0 ? (
                        <div className="alert alert-warning m-3 mb-0">
                          No product items were returned for this order.
                        </div>
                      ) : (
                        <div className="table-responsive">
                          <table className="table table-bordered align-middle mb-0">
                            <thead className="table-light">
                              <tr>
                                <th>Product</th>
                                <th>Image</th>
                                <th>Size</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Subtotal</th>
                              </tr>
                            </thead>

                            <tbody>
                              {orderItems.map((item, index) => {
                                const product =
                                  item.product || item.product_details || {};

                                const productName =
                                  item.product_name ||
                                  item.name ||
                                  product.name ||
                                  "N/A";

                                const productImage =
                                  item.main_image ||
                                  item.product_image ||
                                  item.image ||
                                  product.main_image ||
                                  product.image ||
                                  "";

                                const size =
                                  item.size ||
                                  item.selected_size ||
                                  item.selectedSize ||
                                  product.size ||
                                  "N/A";

                                const quantity = Number(item.quantity || 1);

                                const price = Number(
                                  item.price ||
                                    item.unit_price ||
                                    item.product_price ||
                                    product.price ||
                                    0,
                                );

                                const subtotal = quantity * price;

                                return (
                                  <tr key={item.id || index}>
                                    {/* PRODUCT */}
                                    <td>
                                      <strong>{productName}</strong>
                                    </td>

                                    {/* IMAGE */}
                                    <td>
                                      {productImage ? (
                                        <img
                                          src={productImage}
                                          alt={productName}
                                          style={{
                                            width: "70px",
                                            height: "70px",
                                            objectFit: "cover",
                                            borderRadius: "6px",
                                            border: "1px solid #ddd",
                                          }}
                                        />
                                      ) : (
                                        <div
                                          className="d-flex align-items-center justify-content-center bg-light text-muted"
                                          style={{
                                            width: "70px",
                                            height: "70px",
                                            borderRadius: "6px",
                                            border: "1px solid #ddd",
                                            fontSize: "12px",
                                          }}
                                        >
                                          No Image
                                        </div>
                                      )}
                                    </td>

                                    {/* SIZE */}
                                    <td>
                                      <span className="badge bg-secondary">
                                        {size}
                                      </span>
                                    </td>

                                    {/* QUANTITY */}
                                    <td>{quantity}</td>

                                    {/* PRICE */}
                                    <td>₦{price.toLocaleString()}</td>

                                    {/* SUBTOTAL */}
                                    <td>₦{subtotal.toLocaleString()}</td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <div className="alert alert-info">No order selected.</div>
              )}
            </div>

            {/* MODAL FOOTER */}
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderList;
