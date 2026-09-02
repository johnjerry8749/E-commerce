import {
  getUserCartByUserId,
  addToCart,
  updateCartItemQuantity,
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

    if (!productId || quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Please select a product and ensure quantity is at least 1",
      });
    }

    const cartItem = await addToCart(req.user.id, productId, quantity, size);

    return res.status(200).json({
      success: true,
      message: "Item added to cart successfully",
      cartItem,
    });
  } catch (error) {
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
export const updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    const { cartItemId } = req.params;

    if (quantity === undefined) {
      return res.status(400).json({
        success: false,
        message: "You must provide a quantity to update the cart item",
      });
    }

    if (quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be at least 1",
      });
    }

    const item = await updateCartItemQuantity(
      cartItemId,
      req.user.id,
      quantity,
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
export const removeCartItemFromCart = async (req, res) => {
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
    console.error("Error removing cart item:", error);

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
    return res.status(500).json({
      success: false,
      message: "Error clearing cart",
      error: error.message,
    });
  }
};
