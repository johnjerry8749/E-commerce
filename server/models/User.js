
import pool from "../config/db.js";

// ======================
// FIND USER BY EMAIL
// ======================
export const findUserByEmail = async (email) => {
  const result = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );

  return result.rows[0];
};

// ======================
// REGISTER USER
// ======================
export const Registeruser = async (name, email, password) => {
  const result = await pool.query(
    `INSERT INTO users(name, email, password)
     VALUES ($1, $2, $3)
     RETURNING id, name, email, role`,
    [name, email, password]
  );

  return result.rows[0];
};

// ======================
// LOGIN USER
// ======================
export const Loginuser = async (email) => {
  const result = await pool.query(
    `SELECT id, name, email, password, role
     FROM users
     WHERE email = $1`,
    [email]
  );

  return result.rows[0];
};

// ======================
// GET USER BY ID
// ======================
export const getUserByid = async (id) => {
  const result = await pool.query(
    `SELECT id, name, email, created_at
     FROM users
     WHERE id = $1`,
    [id]
  );

  return result.rows[0];
};

// ======================
// GET ALL USERS
// ======================
export const getAllUsers = async () => {
  const result = await pool.query(
    `SELECT id, name, email, role, created_at
     FROM users
     ORDER BY created_at DESC`
  );

  return result.rows;
};

