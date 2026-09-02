import {
  getUserCartByUserId,
  addToCart,
  updateCartItemQuantity as updateCartItemQuantityModel,
  removeCartItem,
  clearCart,
} from "../models/Cart.js";

// ========================================
// GET USER CART
// ========================================
export const getUserCart = async (req, res) => {
  try {
    const cart = await getUserCartByUserId(req.user.id);

    return res.status(200).json({
      success: true,
      cart,
    });
  } catch (error) {
    console.error("Get User Cart Error:", error);

    return res.status(500).json({
      success: false,
      message: "Error fetching user cart",
      error: error.message,
    });
  }
};

// ========================================
// ADD TO CART
// ========================================
export const addItemToCart = async (req, res) => {
  try {
    const { productId, quantity = 1, size = null } = req.body;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product is required",
      });
    }

    const parsedQuantity = Number(quantity);

    if (!Number.isInteger(parsedQuantity) || parsedQuantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be at least 1",
      });
    }

    const cartItem = await addToCart(
      req.user.id,
      productId,
      parsedQuantity,
      size,
    );

    return res.status(200).json({
      success: true,
      message: "Item added to cart successfully",
      cartItem,
    });
  } catch (error) {
    console.error("Add To Cart Error:", error);

    return res.status(500).json({
      success: false,
      message: "Error adding item to cart",
      error: error.message,
    });
  }
};

// ========================================
// UPDATE CART ITEM QUANTITY
// ========================================
export const updateCartItemQuantity = async (req, res) => {
  try {
    const { cartItemId } = req.params;
    const { quantity } = req.body;

    if (quantity === undefined) {
      return res.status(400).json({
        success: false,
        message: "Quantity is required",
      });
    }

    const parsedQuantity = Number(quantity);

    if (!Number.isInteger(parsedQuantity) || parsedQuantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be at least 1",
      });
    }

    const item = await updateCartItemQuantityModel(
      cartItemId,
      req.user.id,
      parsedQuantity,
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Cart item updated successfully",
      cartItem: item,
    });
  } catch (error) {
    console.error("Update Cart Item Error:", error);

    return res.status(500).json({
      success: false,
      message: "Error updating cart item",
      error: error.message,
    });
  }
};

// ========================================
// REMOVE CART ITEM
// ========================================
export const removeCartItemfromCart = async (req, res) => {
  try {
    const { cartItemId } = req.params;

    const item = await removeCartItem(cartItemId, req.user.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Item removed successfully",
      cartItem: item,
    });
  } catch (error) {
    console.error("Remove Cart Item Error:", error);

    return res.status(500).json({
      success: false,
      message: "Error removing cart item",
      error: error.message,
    });
  }
};

// ========================================
// CLEAR CART
// ========================================
export const clearUserCart = async (req, res) => {
  try {
    const deletedItems = await clearCart(req.user.id);

    return res.status(200).json({
      success: true,
      message: "Cart cleared successfully",
      deletedItems,
    });
  } catch (error) {
    console.error("Clear Cart Error:", error);

    return res.status(500).json({
      success: false,
      message: "Error clearing cart",
      error: error.message,
    });
  }
};
