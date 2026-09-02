import pool from "../config/db.js";

// ========================================
// CREATE PRODUCT
// ========================================

export const createProduct = async (
  name,
  description,
  price,
  category,
  subcategory,
  size,
  bestseller,
  main_image,
  other_images
) => {
  const result = await pool.query(
    `INSERT INTO products
    (
      name,
      description,
      price,
      category,
      subcategory,
      size,
      bestseller,
      main_image,
      other_images
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING *`,
    [
      name,
      description,
      price,
      category,
      subcategory,
      size,
      bestseller,
      main_image,
      other_images,
    ]
  );

  return result.rows[0];
};


// ========================================
// GET PRODUCT BY ID
// ========================================

export const getProductById = async (id) => {
  const result = await pool.query(
    `SELECT * FROM products WHERE id = $1`,
    [id]
  );

  return result.rows[0];
};


// ========================================
// GET ALL PRODUCTS
// ========================================

export const getAllProducts = async () => {
  const result = await pool.query("SELECT * FROM products");
  return result.rows;
};


// ========================================
// UPDATE PRODUCT
// ========================================

export const updateProduct = async (
  id,
  name,
  description,
  price,
  category,
  subcategory,
  size,
  bestseller,
  main_image,
  other_images
) => {
  const result = await pool.query(
    `UPDATE products
     SET
       name = $1,
       description = $2,
       price = $3,
       category = $4,
       subcategory = $5,
       size = $6,
       bestseller = $7,
       main_image = COALESCE($8, main_image),
       other_images = COALESCE($9, other_images)
     WHERE id = $10
     RETURNING *`,
    [
      name,
      description,
      price,
      category,
      subcategory,
      size,
      bestseller,
      main_image,
      other_images,
      id,
    ]
  );

  return result.rows[0];
};


// ========================================
// FILTER PRODUCTS
// ========================================

export const filterProducts = async (filters) => {
  let query = "SELECT * FROM products WHERE 1=1";
  const values = [];

  if (filters.category) {
    values.push(filters.category);
    query += ` AND category = $${values.length}`;
  }

  if (filters.subcategory) {
    values.push(filters.subcategory);
    query += ` AND subcategory = $${values.length}`;
  }

  const result = await pool.query(query, values);

  return result.rows;
};


// ========================================
// SORT PRODUCTS
// ========================================

export const sortProducts = async (sortBy) => {
  let query = "SELECT * FROM products";

  if (sortBy === "newest_asc") {
    query += " ORDER BY created_at ASC";
  } else if (sortBy === "newest_desc") {
    query += " ORDER BY created_at DESC";
  } else if (sortBy === "price_asc") {
    query += " ORDER BY price ASC";
  } else if (sortBy === "price_desc") {
    query += " ORDER BY price DESC";
  } else if (sortBy === "name_asc") {
    query += " ORDER BY name ASC";
  } else if (sortBy === "name_desc") {
    query += " ORDER BY name DESC";
  }

  const result = await pool.query(query);

  return result.rows;
};


// ========================================
// BEST SELLERS
// ========================================

export const bestSellers = async () => {
  const result = await pool.query(
    `SELECT * FROM products
     WHERE bestseller = true
     ORDER BY created_at DESC`
  );

  return result.rows;
};


// ========================================
// DELETE PRODUCT
// ========================================

export const deleteProduct = async (id) => {
  const result = await pool.query(
    `DELETE FROM products
     WHERE id = $1
     RETURNING *`,
    [id]
  );

  return result.rows[0];
};