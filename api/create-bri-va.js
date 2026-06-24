export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  const {
    orderId,
    customerName,
    customerEmail,
    total,
  } = req.body;

  try {
    const response = await fetch(
      "https://api.xendit.co/callback_virtual_accounts",
      {
        method: "POST",
        headers: {
          Authorization:
            "Basic " +
            Buffer.from(
              process.env.XENDIT_SECRET_KEY + ":"
            ).toString("base64"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          external_id: orderId,
          bank_code: "BRI",
          name: customerName,
          expected_amount: total,
          is_closed: true,
        }),
      }
    );

    const va = await response.json();

    if (!va.account_number) {
      throw new Error(
        va.message || "Gagal membuat VA BRI"
      );
    }

    return res.status(200).json({
      vaNumber: va.account_number,
      bank: "BRI",
      externalId: va.external_id,
      amount: total,
    });

  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
}
