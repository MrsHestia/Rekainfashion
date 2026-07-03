import React from "react";
import { motion } from "framer-motion";
import { getStatusInfo, getStatusFlow } from "../constants/orderStatuses";

export default function OrderTrackingStatus({ order }) {
  const statusFlow = getStatusFlow(order.payment_method);
  const currentStatusIndex = statusFlow.indexOf(order.status);

  return (
    <div style={{ padding: "24px" }}>
      <h2
        style={{
          fontSize: "18px",
          fontWeight: "600",
          color: "#2D1B0E",
          margin: "0 0 24px",
        }}
      >
        Status Pesanan
      </h2>

      {/* Timeline */}
      <div style={{ position: "relative" }}>
        {/* Vertical Line */}
        <div
          style={{
            position: "absolute",
            left: "15px",
            top: "40px",
            bottom: "0",
            width: "2px",
            backgroundColor: "#E8E0D5",
          }}
        />

        {/* Status Steps */}
        {statusFlow.map((statusId, index) => {
          const statusInfo = getStatusInfo(statusId);
          const isCompleted = index < currentStatusIndex;
          const isCurrent = index === currentStatusIndex;

          return (
            <motion.div
              key={statusId}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              style={{
                marginBottom: "24px",
                position: "relative",
              }}
            >
              {/* Dot */}
              <motion.div
                animate={{
                  scale: isCurrent ? 1.3 : 1,
                  boxShadow: isCurrent
                    ? `0 0 0 8px ${statusInfo.color}33`
                    : "none",
                }}
                style={{
                  position: "absolute",
                  left: "0",
                  top: "0",
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  backgroundColor: isCompleted || isCurrent ? statusInfo.color : "#E8E0D5",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: isCompleted || isCurrent ? "#FFFFFF" : "#999999",
                  fontWeight: "600",
                  fontSize: "14px",
                  zIndex: 10,
                }}
              >
                {isCompleted ? "✓" : isCurrent ? "●" : index + 1}
              </motion.div>

              {/* Content */}
              <div style={{ marginLeft: "56px" }}>
                <motion.h3
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.1 }}
                  style={{
                    fontSize: "14px",
                    fontWeight: isCurrent ? "600" : "500",
                    color: isCurrent ? statusInfo.color : "#2D1B0E",
                    margin: "0 0 4px",
                  }}
                >
                  {statusInfo.icon} {statusInfo.label}
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.15 }}
                  style={{
                    fontSize: "12px",
                    color: "#888888",
                    margin: 0,
                  }}
                >
                  {statusInfo.description}
                </motion.p>

                {isCurrent && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                    style={{
                      marginTop: "8px",
                      padding: "8px 12px",
                      backgroundColor: `${statusInfo.color}15`,
                      borderLeft: `3px solid ${statusInfo.color}`,
                      borderRadius: "4px",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "11px",
                        color: statusInfo.color,
                        fontWeight: "600",
                        margin: 0,
                      }}
                    >
                      Status saat ini
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* COD-specific note */}
      {order.payment_method === "cod" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          style={{
            marginTop: "24px",
            padding: "16px",
            backgroundColor: "#FFF8E1",
            borderRadius: "8px",
            border: "1px solid #FFE082",
          }}
        >
          <p
            style={{
              fontSize: "12px",
              color: "#F57F17",
              fontWeight: "600",
              margin: "0 0 4px",
            }}
          >
            💳 Pembayaran COD
          </p>
          <p style={{ fontSize: "12px", color: "#F57F17", margin: 0 }}>
            Silakan siapkan uang sejumlah Rp {order.total.toLocaleString("id-ID")} saat kurir tiba.
          </p>
        </motion.div>
      )}

      {/* Order details summary */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{
          marginTop: "24px",
          padding: "16px",
          backgroundColor: "#F9F5EE",
          borderRadius: "8px",
          border: "1px solid #F0EDE8",
        }}
      >
        <h4
          style={{
            fontSize: "12px",
            fontWeight: "600",
            color: "#2D1B0E",
            margin: "0 0 12px",
          }}
        >
          Rincian Pesanan
        </h4>

        <div style={{ display: "grid", gap: "8px" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: "12px", color: "#888888" }}>Nomor Pesanan</span>
            <span
              style={{
                fontSize: "12px",
                fontWeight: "600",
                color: "#2D1B0E",
                wordBreak: "break-all",
              }}
            >
              {order.id}
            </span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: "12px", color: "#888888" }}>Metode Pembayaran</span>
            <span style={{ fontSize: "12px", fontWeight: "600", color: "#2D1B0E" }}>
              {order.payment_method === "cod"
                ? "Bayar di Tempat"
                : order.payment_method?.toUpperCase()}
            </span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: "12px", color: "#888888" }}>Total Pembayaran</span>
            <span
              style={{
                fontSize: "13px",
                fontWeight: "700",
                color: "#C2552A",
              }}
            >
              Rp {order.total.toLocaleString("id-ID")}
            </span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: "12px", color: "#888888" }}>Jumlah Item</span>
            <span style={{ fontSize: "12px", fontWeight: "600", color: "#2D1B0E" }}>
              {order.items?.length || 0} item
            </span>
          </div>
        </div>
      </motion.div>

      {/* Help section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        style={{
          marginTop: "24px",
          padding: "16px",
          backgroundColor: "#F0F7FF",
          borderRadius: "8px",
          border: "1px solid #D0E8FF",
        }}
      >
        <p
          style={{
            fontSize: "12px",
            color: "#2C5F8A",
            fontWeight: "600",
            margin: "0 0 8px",
          }}
        >
          💬 Butuh bantuan?
        </p>
        <p style={{ fontSize: "12px", color: "#555555", margin: 0 }}>
          Hubungi kami melalui WhatsApp di{" "}
          <strong>083822584035</strong> untuk informasi lebih lanjut.
        </p>
      </motion.div>
    </div>
  );
}
