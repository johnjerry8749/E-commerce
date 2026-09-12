import {
  CreateOrders,
  getOrdersByUserId,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
  getShippingFee,
} from "../models/Orders.js";

import { clearCart } from "../models/Cart.js";
import { getProductById } from "../models/Product.js";

// ========================================
// CREATE ORDER
// ========================================
export const placeOrder = async (req, res) => {
  try {
    const {
      items,
      shippingAddress,
      paymentMethod = "COD",
    } = req.body;

    // ======================================
    // CHECK AUTHENTICATION
    // ======================================
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "You must be logged in to place an order",
      });
    }

    // ======================================
    // CHECK CART
    // ======================================
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    // ======================================
    // CHECK SHIPPING ADDRESS
    // ======================================
    if (
      !shippingAddress ||
      typeof shippingAddress !== "object"
    ) {
      return res.status(400).json({
        success: false,
        message: "Shipping address is required",
      });
    }

    const {
      address,
      city,
      state,
      country,
    } = shippingAddress;

    // ======================================
    // VALIDATE SHIPPING INFORMATION
    // ======================================
    if (!address || !address.trim()) {
      return res.status(400).json({
        success: false,
        message: "Shipping address is required",
      });
    }

    if (!city || !city.trim()) {
      return res.status(400).json({
        success: false,
        message: "Shipping city is required",
      });
    }

    if (!state || !state.trim()) {
      return res.status(400).json({
        success: false,
        message: "Shipping state is required",
      });
    }

    if (!country || !country.trim()) {
      return res.status(400).json({
        success: false,
        message: "Shipping country is required",
      });
    }

    // ======================================
    // CALCULATE SUBTOTAL
    // ======================================
    let subtotal = 0;

    const orderItems = [];

    for (const item of items) {
      const productId = Number(item.product_id);
      const quantity = Number(item.quantity);

      // ====================================
      // VALIDATE PRODUCT ID
      // ====================================
      if (!Number.isInteger(productId) || productId < 1) {
        return res.status(400).json({
          success: false,
          message: "Invalid product ID",
        });
      }

      // ====================================
      // VALIDATE QUANTITY
      // ====================================
      if (!Number.isInteger(quantity) || quantity < 1) {
        return res.status(400).json({
          success: false,
          message: "Invalid product quantity",
        });
      }

      // ====================================
      // GET PRODUCT FROM DATABASE
      // ====================================
      const product = await getProductById(productId);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product not found: ${productId}`,
        });
      }

      // ====================================
      // GET TRUSTED PRICE
      // ====================================
      const price = Number(product.price);

      if (Number.isNaN(price) || price < 0) {
        return res.status(500).json({
          success: false,
          message: `Invalid price for product: ${productId}`,
        });
      }

      // ====================================
      // CALCULATE SUBTOTAL
      // ====================================
      subtotal += price * quantity;

      // ====================================
      // ADD ORDER ITEM
      // ====================================
      orderItems.push({
        product_id: product.id,
        quantity,
        size: item.size || null,
        price,
      });
    }

    // ======================================
    // GET SHIPPING FEE
    // ======================================
    const shipping = await getShippingFee();

    if (!shipping) {
      return res.status(500).json({
        success: false,
        message: "Shipping fee is not configured",
      });
    }

    const shippingFee = Number(shipping.amount);

    if (Number.isNaN(shippingFee) || shippingFee < 0) {
      return res.status(500).json({
        success: false,
        message: "Invalid shipping fee",
      });
    }

    // ======================================
    // CALCULATE TOTAL
    // ======================================
    const totalAmount = subtotal + shippingFee;

    // ======================================
    // CREATE ORDER
    // ======================================
    const order = await CreateOrders(
      req.user.id,
      orderItems,
      totalAmount,
      address.trim(),
      city.trim(),
      state.trim(),
      country.trim(),
      paymentMethod
    );

    // ======================================
    // CLEAR USER CART
    // ======================================
    await clearCart(req.user.id);

    // ======================================
    // SUCCESS RESPONSE
    // ======================================
    return res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
      subtotal,
      shippingFee,
      totalAmount,
    });
  } catch (error) {
    console.error("Error placing order:", error);

    return res.status(500).json({
      success: false,
      message: "Error placing order",
      error: error.message,
    });
  }
};

// ========================================
// GET USER ORDERS
// ========================================
export const getMyOrders = async (req, res) => {
  try {
    const orders = await getOrdersByUserId(req.user.id);

    return res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("Error fetching user orders:", error);

    return res.status(500).json({
      success: false,
      message: "Error fetching user orders",
      error: error.message,
    });
  }
};

// ========================================
// GET SINGLE USER ORDER
// ========================================
export const getMyOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await getOrderById(
      orderId,
      req.user.id
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    return res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Error fetching order:", error);

    return res.status(500).json({
      success: false,
      message: "Error fetching order",
      error: error.message,
    });
  }
};

// ========================================
// ADMIN - GET ALL ORDERS
// ========================================
export const getAllOrdersAdmin = async (req, res) => {
  try {
    const orders = await getAllOrders();

    return res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("Error fetching all orders:", error);

    return res.status(500).json({
      success: false,
      message: "Error fetching all orders",
      error: error.message,
    });
  }
};

// ========================================
// ADMIN - UPDATE ORDER STATUS
// ========================================
export const updateOrderStatusAdmin = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    // ======================================
    // CHECK STATUS
    // ======================================
    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Order status is required",
      });
    }

    // ======================================
    // VALID STATUSES
    // ======================================
    const allowedStatuses = [
      "pending",
      "processing",
      "shipped",
      "delivered",
      "cancelled",
      "payment_pending",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order status",
        allowedStatuses,
      });
    }

    // ======================================
    // UPDATE ORDER
    // ======================================
    const order = await updateOrderStatus(
      orderId,
      status
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    console.error(
      "Error updating order status:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Error updating order status",
      error: error.message,
    });
  }
};
