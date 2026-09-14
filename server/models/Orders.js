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
     LIMIT 1`
  );

  return result.rows[0] || null;
};

// ========================================
// CREATE ORDER
// ========================================
export const CreateOrders = async (
  userId,
  cartItems,
  phonenumber,
  totalAmount,
  shippingAddress,
  shippingCity,
  shippingState,
  shippingCountry,
  paymentMethod = "COD"
) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // ======================================
    // CREATE ORDER
    // ======================================
    const orderResult = await client.query(
      `INSERT INTO orders
        (
          user_id,
          total_amount,
          phone_number,
          shipping_address,
          shipping_city,
          shipping_state,
          shipping_country,
          payment_method,
          status,
          created_at,
          updated_at
        )
       VALUES
        (
          $1,
          $2,
          $3,
          $4,
          $5,
          $6,
          $7,
          $8,
          'pending',
          NOW(),
          NOW()
        )
       RETURNING *`,
      [
        userId,
        totalAmount,
        phonenumber,
        shippingAddress,
        shippingCity,
        shippingState,
        shippingCountry,
        paymentMethod,
      ]
    );

    const orderId = orderResult.rows[0].id;

    // ======================================
    // CREATE ORDER ITEMS
    // ======================================
    for (const item of cartItems) {
      await client.query(
        `INSERT INTO order_items
          (
            order_id,
            product_id,
            quantity,
            size,
            price
          )
         VALUES
          ($1, $2, $3, $4, $5)`,
        [
          orderId,
          item.product_id,
          item.quantity,
          item.size || null,
          item.price,
        ]
      );
    }

    // ======================================
    // COMMIT
    // ======================================
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
// GET ORDERS BY USER
// ========================================
export const getOrdersByUserId = async (userId) => {
  const result = await pool.query(
    `SELECT *
     FROM orders
     WHERE user_id = $1
     ORDER BY created_at DESC`,
    [userId]
  );

  return result.rows;
};

// ========================================
// GET SINGLE ORDER
// ========================================
export const getOrderById = async (
  orderId,
  userId = null
) => {
  let query = `
    SELECT
      o.*,
      u.name AS user_name,
      u.email AS user_email
    FROM orders o
    LEFT JOIN users u
      ON o.user_id = u.id
    WHERE o.id = $1
  `;

  const params = [orderId];

  // ======================================
  // CUSTOMER CAN ONLY VIEW THEIR OWN ORDER
  // ======================================
  if (userId) {
    query += ` AND o.user_id = $2`;
    params.push(userId);
  }

  const orderResult = await pool.query(
    query,
    params
  );

  if (orderResult.rows.length === 0) {
    return null;
  }

  const order = orderResult.rows[0];

  // ======================================
  // GET ORDER ITEMS + PRODUCT INFORMATION
  // ======================================
  const itemsResult = await pool.query(
    `SELECT
       oi.id,
       oi.order_id,
       oi.product_id,
       oi.quantity,
       oi.size,
       oi.price,

       p.name AS product_name,
       p.main_image AS main_image,
       p.description AS product_description,
       p.category AS product_category,
       p.subcategory AS product_subcategory

     FROM order_items oi

     LEFT JOIN products p
       ON oi.product_id = p.id

     WHERE oi.order_id = $1

     ORDER BY oi.id ASC`,
    [orderId]
  );

  return {
    ...order,
    items: itemsResult.rows,
  };
};

// ========================================
// GET ALL ORDERS - ADMIN
// ========================================
export const getAllOrders = async () => {
  const result = await pool.query(
    `SELECT
       o.*,
       u.name AS user_name,
       u.email AS user_email
     FROM orders o
     LEFT JOIN users u
       ON o.user_id = u.id
     ORDER BY o.created_at DESC`
  );

  return result.rows;
};

// ========================================
// UPDATE ORDER STATUS - ADMIN
// ========================================
export const updateOrderStatus = async (
  orderId,
  newStatus
) => {
  const result = await pool.query(
    `UPDATE orders
     SET
       status = $1,
       updated_at = NOW()
     WHERE id = $2
     RETURNING *`,
    [newStatus, orderId]
  );

  return result.rows[0] || null;
};

