export const orderPlacedTemplate = (order) => {
  const itemsHtml = Array.isArray(order.items)
    ? order.items
        .map(
          (item) => `
            <tr>
              <td style="padding: 8px 12px; border-bottom: 1px solid #e5e7eb;">${item.product_name || "Product"}</td>
              <td style="padding: 8px 12px; border-bottom: 1px solid #e5e7eb; text-align: center;">${item.quantity}</td>
              <td style="padding: 8px 12px; border-bottom: 1px solid #e5e7eb; text-align: right;">$${Number(item.price || 0).toFixed(2)}</td>
            </tr>
          `,
        )
        .join("")
    : "";

  return {
    subject: `Your order #${order.id} has been placed`,
    text: `Hi,

Your order #${order.id} has been successfully placed.

Total: $${Number(order.total_amount || 0).toFixed(2)}

Thank you for shopping with us.`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto; background: #f9fafb; padding: 24px;">
        <h2 style="color: #111827;">Order Confirmed</h2>
        <p>Hi, your order <strong>#${order.id}</strong> has been placed successfully.</p>

        <table style="width: 100%; border-collapse: collapse; margin-top: 20px; background: white;">
          <thead>
            <tr style="background:#111827; color:white;">
              <th style="padding: 10px 12px; text-align:left;">Product</th>
              <th style="padding: 10px 12px; text-align:center;">Qty</th>
              <th style="padding: 10px 12px; text-align:right;">Price</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
        </table>

        <p style="margin-top: 20px; font-size: 16px;">
          <strong>Total:</strong> $${Number(order.total_amount || 0).toFixed(2)}
        </p>

        <p>We’ll keep you updated as your order moves through processing.</p>
        <p style="color:#6b7280;">Thank you for shopping with us.</p>
      </div>
    `,
  };
};