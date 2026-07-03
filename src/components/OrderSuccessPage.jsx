import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { createClient } from "@supabase/supabase-js";
import { useConfetti } from "../hooks/useNotifications";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

function Sparkle({ filled, size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ display: "block" }}>
      <path
        d="M12 2 L13.8 10.2 L22 12 L13.8 13.8 L12 22 L10.2 13.8 L2 12 L10.2 10.2 Z"
        fill={filled ? "#C2552A" : "none"}
        stroke={filled ? "#C2552A" : "#C8B49A"}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function OrderSuccessPage({ order, onContinue }) {
  const { triggerConfetti } = useConfetti();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [hovered, setHovered] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showRatingForm, setShowRatingForm] = useState(true);

  // Trigger confetti on mount
  useEffect(() => {
    triggerConfetti();
  }, [triggerConfetti]);

  const submitRating = async () => {
    if (rating === 0) {
      alert("Silakan pilih bintang rating");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.from("order_ratings").insert({
        order_id: order.id,
        rating,
        comment: comment.trim() || null,
        created_at: new Date().toISOString(),
      });

      if (error) throw error;

      setSubmitted(true);
      setShowRatingForm(false);
    } catch (err) {
      console.error("Error submitting rating:", err);
      alert("Gagal mengirim rating. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  const skipRating = () => {
    setShowRatingForm(false);
  };

  const displayRating = hovered || rating;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        padding: "40px 20px",
      }}
    >
      {/* Success Message */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            fontSize: "64px",
            marginBottom: "16px",
          }}
        >
          ✅
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={{
            fontSize: "28px",
            fontWeight: "600",
            color: "#2D1B0E",
            margin: "0 0 8px",
          }}
        >
          Pesanan Berhasil!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{
            fontSize: "14px",
            color: "#888888",
            margin: 0,
          }}
        >
          Terima kasih telah berbelanja di Rekain Fashion
        </motion.p>
      </div>

      {/* Order Details */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{
          backgroundColor: "#F9F5EE",
          padding: "20px",
          borderRadius: "12px",
          marginBottom: "32px",
          border: "1px solid #F0EDE8",
        }}
      >
        <div style={{ marginBottom: "16px" }}>
          <p style={{ fontSize: "12px", color: "#999999", margin: "0 0 4px" }}>
            Nomor Pesanan
          </p>
          <p
            style={{
              fontSize: "16px",
              fontWeight: "600",
              color: "#2D1B0E",
              margin: 0,
              wordBreak: "break-all",
            }}
          >
            {order.id}
          </p>
        </div>

        <div style={{ marginBottom: "16px" }}>
          <p style={{ fontSize: "12px", color: "#999999", margin: "0 0 4px" }}>
            Metode Pembayaran
          </p>
          <p style={{ fontSize: "14px", fontWeight: "500", color: "#2D1B0E", margin: 0 }}>
            {order.payment_method === "cod"
              ? "Bayar di Tempat (COD)"
              : order.payment_method === "transfer"
                ? "Transfer Bank"
                : order.payment_method?.toUpperCase()}
          </p>
        </div>

        <div style={{ marginBottom: "16px" }}>
          <p style={{ fontSize: "12px", color: "#999999", margin: "0 0 4px" }}>
            Total Pembayaran
          </p>
          <p
            style={{
              fontSize: "18px",
              fontWeight: "700",
              color: "#C2552A",
              margin: 0,
            }}
          >
            Rp {order.total.toLocaleString("id-ID")}
          </p>
        </div>

        <div>
          <p style={{ fontSize: "12px", color: "#999999", margin: "0 0 4px" }}>
            Alamat Pengiriman
          </p>
          <p
            style={{
              fontSize: "13px",
              color: "#555555",
              lineHeight: "1.5",
              margin: 0,
            }}
          >
            {order.customer_name}
            <br />
            {order.customer_address}
            <br />
            {order.customer_phone}
          </p>
        </div>
      </motion.div>

      {/* Rating Section */}
      {showRatingForm && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          style={{
            backgroundColor: "#FFFFFF",
            padding: "24px",
            borderRadius: "12px",
            border: "1px solid #F0EDE8",
            marginBottom: "24px",
          }}
        >
          <h3
            style={{
              fontSize: "16px",
              fontWeight: "600",
              color: "#2D1B0E",
              margin: "0 0 16px",
            }}
          >
            Bagaimana Pengalaman Belanja Anda?
          </h3>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                padding: "16px",
                backgroundColor: "#F0FFF4",
                borderRadius: "8px",
                border: "1px solid #C6F6D5",
                textAlign: "center",
              }}
            >
              <p style={{ fontSize: "14px", color: "#276749", margin: 0 }}>
                ✓ Terima kasih atas rating Anda!
              </p>
            </motion.div>
          ) : (
            <div>
              {/* Star Rating */}
              <div style={{ marginBottom: "16px" }}>
                <p style={{ fontSize: "12px", color: "#999999", margin: "0 0 12px" }}>
                  Rating Produk & Layanan
                </p>
                <div style={{ display: "flex", gap: "8px" }}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      style={{ cursor: "pointer", lineHeight: 1 }}
                      onMouseEnter={() => setHovered(i + 1)}
                      onMouseLeave={() => setHovered(0)}
                      onClick={() => setRating(i + 1)}
                    >
                      <Sparkle filled={i < displayRating} size={28} />
                    </span>
                  ))}
                </div>
                {rating > 0 && (
                  <p style={{ fontSize: "12px", color: "#A08060", margin: "8px 0 0" }}>
                    {
                      ["", "Buruk", "Kurang", "Cukup", "Bagus", "Sempurna"][rating]
                    }
                  </p>
                )}
              </div>

              {/* Comment */}
              <div style={{ marginBottom: "16px" }}>
                <label style={{ fontSize: "12px", color: "#333333", fontWeight: "600", display: "block", marginBottom: "6px" }}>
                  Komentar (Opsional)
                </label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Bagikan pengalaman belanja Anda..."
                  rows={3}
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "1.5px solid #EEEEEE",
                    borderRadius: "8px",
                    fontSize: "13px",
                    fontFamily: "'DM Sans', sans-serif",
                    outline: "none",
                    resize: "vertical",
                  }}
                />
              </div>

              {/* Buttons */}
              <div style={{ display: "flex", gap: "12px" }}>
                <motion.button
                  whileHover={{ backgroundColor: "#A04420" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={submitRating}
                  disabled={loading || rating === 0}
                  style={{
                    flex: 1,
                    padding: "12px",
                    backgroundColor: rating === 0 ? "#D0B89A" : "#C2552A",
                    color: "#FFFFFF",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "13px",
                    fontWeight: "600",
                    cursor: rating === 0 ? "not-allowed" : "pointer",
                  }}
                >
                  {loading ? "Mengirim..." : "Kirim Rating"}
                </motion.button>
                <motion.button
                  whileHover={{ backgroundColor: "#E8E0D5" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={skipRating}
                  disabled={loading}
                  style={{
                    flex: 1,
                    padding: "12px",
                    backgroundColor: "#F5F0E8",
                    color: "#2D1B0E",
                    border: "1px solid #EEEEEE",
                    borderRadius: "8px",
                    fontSize: "13px",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                >
                  Lewati
                </motion.button>
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* Continue Button */}
      {!showRatingForm && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          whileHover={{ backgroundColor: "#A04420" }}
          whileTap={{ scale: 0.98 }}
          onClick={onContinue}
          style={{
            width: "100%",
            padding: "14px",
            backgroundColor: "#C2552A",
            color: "#FFFFFF",
            border: "none",
            borderRadius: "8px",
            fontSize: "13px",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          Kembali ke Beranda
        </motion.button>
      )}

      {/* Info Box */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        style={{
          marginTop: "32px",
          padding: "16px",
          backgroundColor: "#F0F7FF",
          borderRadius: "8px",
          border: "1px solid #D0E8FF",
        }}
      >
        <p style={{ fontSize: "12px", color: "#2C5F8A", margin: "0 0 8px", fontWeight: "600" }}>
          📧 Informasi Pesanan
        </p>
        <p style={{ fontSize: "12px", color: "#555555", margin: 0, lineHeight: "1.6" }}>
          Kami telah mengirimkan detail pesanan ke WhatsApp Anda. Pantau status pesanan melalui menu "Pesanan Saya".
        </p>
      </motion.div>
    </motion.div>
  );
}
