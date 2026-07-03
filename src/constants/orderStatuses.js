// Order status tracking configuration
// Supports two workflows: Transfer/QRIS/GoPay/DANA and COD (Cash on Delivery)

export const ORDER_STATUSES = {
  // Transfer/QRIS/GoPay/DANA workflow
  pending_payment: {
    id: "pending_payment",
    label: "Menunggu Pembayaran",
    description: "Menunggu konfirmasi pembayaran Anda",
    icon: "⏳",
    color: "#FFA500",
    workflow: "online",
    nextStatus: "payment_confirmed",
  },
  payment_confirmed: {
    id: "payment_confirmed",
    label: "Pembayaran Dikonfirmasi",
    description: "Pembayaran Anda telah diterima",
    icon: "✓",
    color: "#4CAF50",
    workflow: "online",
    nextStatus: "processing",
  },
  processing: {
    id: "processing",
    label: "Diproses",
    description: "Pesanan sedang dipersiapkan",
    icon: "⚙️",
    color: "#2196F3",
    workflow: "both",
    nextStatus: "packed",
  },
  packed: {
    id: "packed",
    label: "Dikemas",
    description: "Pesanan sedang dikemas untuk dikirim",
    icon: "📦",
    color: "#9C27B0",
    workflow: "both",
    nextStatus: "shipped",
  },
  shipped: {
    id: "shipped",
    label: "Dikirim",
    description: "Pesanan sedang dalam perjalanan",
    icon: "🚚",
    color: "#00BCD4",
    workflow: "both",
    nextStatus: "completed",
  },

  // COD-specific workflow
  pending_confirmation: {
    id: "pending_confirmation",
    label: "Menunggu Konfirmasi",
    description: "Menunggu konfirmasi pesanan COD",
    icon: "⏳",
    color: "#FFA500",
    workflow: "cod",
    nextStatus: "processing",
  },
  courier_heading: {
    id: "courier_heading",
    label: "Kurir Menuju Lokasi",
    description: "Kurir sedang dalam perjalanan ke lokasi Anda",
    icon: "🛵",
    color: "#FF9800",
    workflow: "cod",
    nextStatus: "payment_at_location",
  },
  payment_at_location: {
    id: "payment_at_location",
    label: "Bayar di Tempat",
    description: "Silakan bersiap melakukan pembayaran saat kurir tiba",
    icon: "💰",
    color: "#FF5722",
    workflow: "cod",
    nextStatus: "completed",
  },

  completed: {
    id: "completed",
    label: "Selesai",
    description: "Pesanan telah diterima",
    icon: "✅",
    color: "#4CAF50",
    workflow: "both",
    nextStatus: null,
  },
  cancelled: {
    id: "cancelled",
    label: "Dibatalkan",
    description: "Pesanan telah dibatalkan",
    icon: "❌",
    color: "#F44336",
    workflow: "both",
    nextStatus: null,
  },
};

// Define status flow for each payment method
export const getStatusFlow = (paymentMethod) => {
  if (paymentMethod === "cod") {
    return [
      "pending_confirmation",
      "processing",
      "packed",
      "courier_heading",
      "payment_at_location",
      "completed",
    ];
  }
  // Online payment (Transfer, QRIS, GoPay, DANA)
  return [
    "pending_payment",
    "payment_confirmed",
    "processing",
    "packed",
    "shipped",
    "completed",
  ];
};

export const getStatusInfo = (statusId) => {
  return ORDER_STATUSES[statusId] || null;
};

export const getNextStatus = (currentStatusId) => {
  const current = ORDER_STATUSES[currentStatusId];
  return current?.nextStatus || null;
};
