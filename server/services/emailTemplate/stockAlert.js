export const stockAlertTemplate = (productName) => ({
  subject: `New Stock Alert: ${productName}`,
  text: `Hi,

Good news! ${productName} is back in stock and available now.

Visit our store before it sells out again.`,
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #f8fafc;">
      <h2 style="color: #111827;">New Stock Available</h2>
      <p>Good news! <strong>${productName}</strong> is back in stock.</p>
      <p>Visit our store now and grab yours before it sells out again.</p>
      <a href="${process.env.FRONTEND_URL || "http://localhost:5173"}"
         style="display:inline-block; margin-top: 16px; background:#2563eb; color:#fff; padding:12px 20px; text-decoration:none; border-radius:8px;">
        Shop Now
      </a>
    </div>
  `,
});