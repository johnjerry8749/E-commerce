import pool from "../config/db.js";
import { sendBulkNewsletter } from "./emailTemplate/emailTemplate.js";

export const SubscribeNewsletter = async (req, res) => {
  try {
    const email = String(req.body.email || "").trim().toLowerCase();

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const result = await pool.query(
      `INSERT INTO newsletter_subscribers (email)
       VALUES ($1)
       RETURNING *`,
      [email],
    );

    return res.status(201).json({
      success: true,
      message: "Successfully subscribed to newsletter",
      subscriber: result.rows[0],
    });
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({
        success: false,
        message: "This email is already subscribed",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export const sendNewsletterToSubscribers = async (req, res) => {
  try {
    const { productName } = req.body;

    if (!productName) {
      return res.status(400).json({
        success: false,
        message: "Product name is required",
      });
    }

    const subscribers = await pool.query(
      `SELECT email
       FROM newsletter_subscribers
       WHERE is_active = true`
    );

    const emails = subscribers.rows.map((row) => row.email);

    const results = await sendBulkNewsletter(emails, productName);

    return res.status(200).json({
      success: true,
      message: "Newsletter sent to subscribers",
      total: emails.length,
      results,
    });
  } catch (error) {
    console.error("Newsletter send error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to send newsletter",
      error: error.message,
    });
  }
};