export const welcomeTemplate = (name = "Customer") => ({
  subject: "Welcome to Our Store!",
  text: `Hi ${name},

Welcome to our store! We’re glad to have you with us.

You can now browse our latest products, track your orders, and get special offers.

Thanks for joining us.
The E-Commerce Team`,
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #1f2937;">
      <h2 style="color: #111827;">Welcome, ${name}!</h2>
      <p>We’re excited to have you join our store.</p>
      <p>You can now shop our latest collections, track your orders, and receive updates about new arrivals.</p>
      <a href="${process.env.FRONTEND_URL || "http://localhost:5173"}"
         style="display:inline-block; margin-top: 16px; background:#111827; color:#fff; padding:12px 20px; text-decoration:none; border-radius:8px;">
        Start Shopping
      </a>
      <p style="margin-top: 24px;">Thanks for choosing us.</p>
      <p style="color:#6b7280;">The E-Commerce Team</p>
    </div>
  `,
});