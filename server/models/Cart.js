import pool from "../config/db.js";

// ========================================
// GET USER CART
// ========================================

export const getUserCartByUserId = async (userId) => {
  const result = await pool.query(
    `SELECT 
      c.id AS cartitem_id,
      c.product_id,
      c.quantity,
      c.size AS cart_size,

      p.name AS product_name,
      p.description AS product_description,
      p.price AS product_price,
      p.category AS product_category,
      p.subcategory AS product_subcategory,
      p.main_image AS product_main_image,
      p.other_images AS product_other_images

    FROM cart_items c

    JOIN products p 
      ON c.product_id = p.id

    WHERE c.user_id = $1`,
    [userId],
  );

  return result.rows;
};

// ========================================
// ADD TO CART
// ========================================

export const addToCart = async (
  userId,
  productId,
  quantity = 1,
  size = null,
) => {
  // Check if product + size already exists
  const existingCartItem = await pool.query(
    `SELECT *
     FROM cart_items
     WHERE user_id = $1
       AND product_id = $2
       AND size IS NOT DISTINCT FROM $3`,
    [userId, productId, size],
  );

  // ========================================
  // ITEM ALREADY EXISTS
  // ========================================

  if (existingCartItem.rows.length > 0) {
    const result = await pool.query(
      `UPDATE cart_items
       SET quantity = quantity + $1,
           updated_at = NOW()
       WHERE user_id = $2
         AND product_id = $3
         AND size IS NOT DISTINCT FROM $4
       RETURNING *`,
      [quantity, userId, productId, size],
    );

    return result.rows[0];
  }

  // ========================================
  // NEW CART ITEM
  // ========================================

  const result = await pool.query(
    `INSERT INTO cart_items
      (user_id, product_id, quantity, size, created_at, updated_at)
     VALUES ($1, $2, $3, $4, NOW(), NOW())
     RETURNING *`,
    [userId, productId, quantity, size],
  );

  return result.rows[0];
};

// ========================================
// UPDATE QUANTITY
// ========================================

export const updateCartItemQuantity = async (cartItemId, userId, quantity) => {
  if (quantity <= 0) {
    return await removeCartItem(cartItemId, userId);
  }

  const result = await pool.query(
    `UPDATE cart_items
     SET quantity = $1,
         updated_at = NOW()
     WHERE id = $2
       AND user_id = $3
     RETURNING *`,
    [quantity, cartItemId, userId],
  );

  return result.rows[0];
};

// ========================================
// REMOVE CART ITEM
// ========================================

export const removeCartItem = async (cartItemId, userId) => {
  const result = await pool.query(
    `DELETE FROM cart_items
     WHERE id = $1
       AND user_id = $2
     RETURNING *`,
    [cartItemId, userId],
  );

  return result.rows[0];
};

// ========================================
// CLEAR CART
// ========================================

export const clearCart = async (userId) => {
  const result = await pool.query(
    `DELETE FROM cart_items
     WHERE user_id = $1`,
    [userId],
  );

  return result.rowCount;
};
