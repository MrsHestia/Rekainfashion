import React from "react";
import { motion, AnimatePresence } from "framer-motion";

// Toast Notification Component
export function ToastContainer({ toasts, removeToast }) {
  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        zIndex: 10000,
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        pointerEvents: "none",
      }}
    >
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 100, y: -20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.3 }}
            style={{
              minWidth: "300px",
              padding: "16px",
              borderRadius: "8px",
              backgroundColor:
                toast.type === "success"
                  ? "#4CAF50"
                  : toast.type === "error"
                    ? "#F44336"
                    : "#2196F3",
              color: "#FFFFFF",
              fontSize: "14px",
              fontFamily: "'DM Sans', sans-serif",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              pointerEvents: "auto",
              cursor: "pointer",
            }}
            onClick={() => removeToast(toast.id)}
          >
            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
              <span style={{ fontSize: "18px" }}>
                {toast.type === "success"
                  ? "✓"
                  : toast.type === "error"
                    ? "✕"
                    : "ℹ"}
              </span>
              <span>{toast.message}</span>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// Modal with Backdrop
export function Modal({ isOpen, onClose, title, children, size = "md" }) {
  const sizes = {
    sm: "400px",
    md: "600px",
    lg: "800px",
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
            padding: "20px",
          }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "12px",
              maxWidth: sizes[size],
              width: "100%",
              maxHeight: "85vh",
              overflow: "auto",
              boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
            }}
          >
            {title && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "20px 24px",
                  borderBottom: "1px solid #F0EDE8",
                }}
              >
                <h2
                  style={{
                    fontSize: "20px",
                    fontWeight: "600",
                    color: "#2D1B0E",
                    margin: 0,
                  }}
                >
                  {title}
                </h2>
                <button
                  onClick={onClose}
                  style={{
                    background: "none",
                    border: "none",
                    fontSize: "24px",
                    cursor: "pointer",
                    color: "#999999",
                    padding: "4px",
                  }}
                >
                  ✕
                </button>
              </div>
            )}
            <div style={{ padding: "24px" }}>{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Skeleton Loading Component
export function Skeleton({ width = "100%", height = "16px", count = 1 }) {
  return (
    <div>
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{
            width,
            height,
            backgroundColor: "#E8E0D5",
            borderRadius: "4px",
            marginBottom: count > 1 ? "8px" : 0,
          }}
        />
      ))}
    </div>
  );
}

// Loading Spinner
export function LoadingSpinner({ size = 40 }) {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      style={{
        width: size,
        height: size,
        border: `4px solid #E8E0D5`,
        borderTopColor: "#C2552A",
        borderRadius: "50%",
      }}
    />
  );
}

// Badge Component
export function Badge({ children, variant = "default", size = "md" }) {
  const variants = {
    default: {
      bg: "#F0EDE8",
      text: "#2D1B0E",
    },
    primary: {
      bg: "#C2552A",
      text: "#FFFFFF",
    },
    success: {
      bg: "#4CAF50",
      text: "#FFFFFF",
    },
    warning: {
      bg: "#FFA500",
      text: "#FFFFFF",
    },
    error: {
      bg: "#F44336",
      text: "#FFFFFF",
    },
  };

  const sizes_map = {
    sm: { padding: "4px 8px", fontSize: "11px" },
    md: { padding: "6px 12px", fontSize: "12px" },
    lg: { padding: "8px 16px", fontSize: "13px" },
  };

  const v = variants[variant];
  const s = sizes_map[size];

  return (
    <span
      style={{
        display: "inline-block",
        padding: s.padding,
        backgroundColor: v.bg,
        color: v.text,
        fontSize: s.fontSize,
        fontWeight: "600",
        borderRadius: "20px",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
}

// Step Indicator Component
export function StepIndicator({ steps, currentStep }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "24px" }}>
      {steps.map((step, index) => (
        <div key={index} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <motion.div
            animate={{
              scale: index === currentStep ? 1.1 : 1,
              backgroundColor: index <= currentStep ? "#C2552A" : "#E8E0D5",
            }}
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: index <= currentStep ? "#FFFFFF" : "#999999",
              fontWeight: "600",
              fontSize: "14px",
            }}
          >
            {index < currentStep ? "✓" : index + 1}
          </motion.div>
          <span
            style={{
              fontSize: "12px",
              color: index <= currentStep ? "#C2552A" : "#999999",
              fontWeight: index === currentStep ? "600" : "400",
              display: index === steps.length - 1 ? "none" : "block",
            }}
          >
            {step}
          </span>
          {index < steps.length - 1 && (
            <motion.div
              animate={{
                backgroundColor: index < currentStep ? "#C2552A" : "#E8E0D5",
              }}
              style={{
                width: "20px",
                height: "2px",
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
