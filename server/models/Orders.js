import pool from "../config/db.js";

// ========================================
// GET ACTIVE SHIPPING FEE
// ========================================

export const getShippingFee = async () => {
  const result = await pool.query(
    `SELECT *
     FROM shipping_fees
     WHERE active = true
     ORDER BY created_at DESC
     LIMIT 1`,
  );

  if (result.rows.length === 0) {
    return null;
  }

  return result.rows[0];
};

// ========================================
// CREATE ORDER
// ========================================

export const CreateOrders = async (
  userId,
  cartItems,
  totalAmount,
  shippingAddress,
  paymentMethod = "COD",
) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const orderResult = await client.query(
      `INSERT INTO orders
        (user_id, total_amount, shipping_address, payment_method, status, created_at)
       VALUES
        ($1, $2, $3, $4, 'pending', NOW())
       RETURNING *`,
      [userId, totalAmount, shippingAddress, paymentMethod],
    );

    const orderId = orderResult.rows[0].id;

    for (const item of cartItems) {
      await client.query(
        `INSERT INTO order_items
          (order_id, product_id, quantity, size, price)
         VALUES
          ($1, $2, $3, $4, $5)`,
        [orderId, item.product_id, item.quantity, item.size, item.price],
      );
    }

    await client.query("COMMIT");

    return orderResult.rows[0];
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

// ========================================
// GET ALL ORDERS BY USER
// ========================================

export const getOrdersByUserId = async (userId) => {
  const result = await pool.query(
    `SELECT *
     FROM orders
     WHERE user_id = $1
     ORDER BY created_at DESC`,
    [userId],
  );

  return result.rows;
};

// ========================================
// GET ORDER + ITEMS
// ========================================

export const getOrderById = async (orderId, userId = null) => {
  let query = `
    SELECT *
    FROM orders
    WHERE id = $1
  `;

  const params = [orderId];

  if (userId) {
    query += ` AND user_id = $2`;
    params.push(userId);
  }

  const orderResult = await pool.query(query, params);

  if (orderResult.rows.length === 0) {
    return null;
  }

  const order = orderResult.rows[0];

  const itemsResult = await pool.query(
    `SELECT
       oi.*,
       p.name AS product_name,
       p.main_image AS product_main_image
     FROM order_items oi
     JOIN products p
       ON oi.product_id = p.id
     WHERE oi.order_id = $1`,
    [orderId],
  );

  return {
    ...order,
    items: itemsResult.rows,
  };
};

// ========================================
// GET ALL ORDERS (ADMIN)
// ========================================

export const getAllOrders = async () => {
  const result = await pool.query(
    `SELECT o.*, u.name AS user_name, u.email AS user_email
     FROM orders o
     JOIN users u ON o.user_id = u.id
     ORDER BY o.created_at DESC`,
  );

  return result.rows;
};

// ========================================
// UPDATE ORDER STATUS (ADMIN)
// ========================================

export const updateOrderStatus = async (orderId, newStatus) => {
  const result = await pool.query(
    `UPDATE orders
     SET status = $1
     WHERE id = $2
     RETURNING *`,
    [newStatus, orderId],
  );

  return result.rows[0];
};
