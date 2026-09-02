import pool from "../config/db.js";

export const findUserByEmail = async (email) => {
  const result = await pool.query("SELECT * FROM users WHERE email=$1", [
    email,
  ]);
  return result.rows[0];
};

export const Registeruser = async (name, email, password) => {
  const result = await pool.query(
    `INSERT INTO users(name, email, password)
     VALUES ($1, $2, $3)
     RETURNING id, name, email, role`,
    [name, email, password]
  );

  return result.rows[0];
};


// LOGIN USER export
export const Loginuser = async (email) => {
  const result = await pool.query(
    `SELECT id, name, email, password, role
     FROM users
     WHERE email = $1`,
    [email]
  );

  return result.rows[0];
};
