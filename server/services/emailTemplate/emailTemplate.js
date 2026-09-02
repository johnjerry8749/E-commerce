import nodemailer from "nodemailer";
import { welcomeTemplate } from "./welcome.js";
import { orderPlacedTemplate } from "./orderPlaced.js";
import { orderStatusTemplate } from "./orderStatus.js";
import { stockAlertTemplate } from "./stockAlert.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async ({ to, subject, html, text }) => {
  try {
    await transporter.sendMail({
      from: `"E-Commerce Store" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
      text,
    });

    return true;
  } catch (error) {
    console.error("Email failed:", error);
    return false;
  }
};

export const emailTemplates = {
  welcome: welcomeTemplate,
  orderPlaced: orderPlacedTemplate,
  orderStatus: orderStatusTemplate,
  stockAlert: stockAlertTemplate,
};

export const sendWelcomeEmail = async (email, name) => {
  const template = emailTemplates.welcome(name);
  return sendEmail({ to: email, ...template });
};

export const sendOrderPlacedEmail = async (email, order) => {
  const template = emailTemplates.orderPlaced(order);
  return sendEmail({ to: email, ...template });
};

export const sendOrderStatusEmail = async (email, order, status) => {
  const template = emailTemplates.orderStatus(order, status);
  return sendEmail({ to: email, ...template });
};

export const sendStockAlertEmail = async (email, productName) => {
  const template = emailTemplates.stockAlert(productName);
  return sendEmail({ to: email, ...template });
};

export const sendBulkNewsletter = async (emails, productName) => {
  const results = [];

  for (const email of emails) {
    const sent = await sendStockAlertEmail(email, productName);
    results.push({ email, sent });
  }

  return results;
};