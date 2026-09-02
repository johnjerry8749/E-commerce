export const orderStatusTemplate = (order, status) => {
  const formattedStatus = status?.toUpperCase() || "UPDATED";

  return {
    subject: `Your order #${order.id} status: ${formattedStatus}`,
    text: `Hi,

Your order #${order.id} has been updated to ${formattedStatus}.

Thank you for shopping with us.`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #f9fafb;">
        <h2 style="color: #111827;">Order Update</h2>
        <p>Your order <strong>#${order.id}</strong> status has changed to <strong>${formattedStatus}</strong>.</p>
        <p>We’ll keep you informed on the next steps.</p>
        <p style="color:#6b7280;">Thanks for shopping with us.</p>
      </div>
    `,
  };
};