export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { orderId, customerName, customerEmail, items, total } = req.body;

  try {
    const response = await fetch('https://api.xendit.co/v2/invoices', {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + Buffer.from(
          process.env.XENDIT_SECRET_KEY + ':'
        ).toString('base64'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        external_id: orderId,
        payer_email: customerEmail,
        description: `Order Rekain Fashion #${orderId}`,
        amount: total,
        currency: 'IDR',
        customer: {
          given_names: customerName,
          email: customerEmail,
        },
        items: items.map(item => ({
          name: item.name,
          quantity: item.qty,
          price: item.price,
        })),
        success_redirect_url: 'https://rekainfashion.vercel.app/success',
        failure_redirect_url: 'https://rekainfashion.vercel.app/failed',
      }),
    });

    const invoice = await response.json();

    if (!invoice.invoice_url) {
      throw new Error(invoice.message || 'Gagal buat invoice');
    }

    res.status(200).json({ invoiceUrl: invoice.invoice_url });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
