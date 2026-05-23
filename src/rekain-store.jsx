import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

/* ============================================================
   DATA PRODUK
============================================================ */
const PRODUCTS = [
  {
    id: 1,
    name: "Gaun Batik Perca Nusantara",
    category: "Gaun",
    price: 85000,
    stock: 12,
    desc: "Gaun cantik kombinasi atasan putih bersih dan rok batik perca motif Nusantara. Dibuat dari kain batik pilihan yang penuh warna dan karakter. Cocok untuk acara spesial si kecil.",
    sizes: ["2-3T", "3-4T", "4-5T"],
    color: "#8B4513",
    badge: "Best Seller",
    images: ["/gaun-batik-perca-nusantara-1.jpeg", "/gaun-batik-perca-nusantara-2.jpeg"],
  },
  {
    id: 2,
    name: "Dress Hati Manis",
    category: "Gaun",
    price: 79000,
    stock: 8,
    desc: "Dress satin lembut dengan aplikasi hati di dada — manis dan elegan untuk si kecil. Warna pink pastel yang memesona, pilihan sempurna untuk ulang tahun atau foto keluarga.",
    sizes: ["3-4T", "4-5T", "5-6T"],
    color: "#E8A0BF",
    badge: "New Arrival",
    images: ["/dress-hati-manis-1.jpeg", "/dress-hati-manis-2.jpeg"],
  },
  {
    id: 3,
    name: "Dress Denim Rose",
    category: "Gaun",
    price: 95000,
    stock: 15,
    desc: "Perpaduan atasan denim biru tanpa lengan dengan rok floral motif mawar pink. Tampil kasual tapi tetap feminin — cocok untuk hangout atau acara santai remaja putri.",
    sizes: ["S", "M", "L"],
    color: "#6B9AC4",
    badge: null,
    images: ["/dress-denim-rose-1.jpeg", "/dress-denim-rose-2.jpeg"],
  },
  {
    id: 4,
    name: "Gaun Batik Elegan",
    category: "Gaun",
    price: 85000,
    stock: 6,
    desc: "Untuk momen spesial seperti lebaran, wisuda, atau foto keluarga.",
    sizes: ["3-4T", "5-6T", "7-8T"],
    color: "#7B3D8C",
    badge: "Limited",
    images: [],
  },
  {
    id: 5,
    name: "Kemeja Perca Polos",
    category: "Kemeja",
    price: 75000,
    stock: 10,
    desc: "Sederhana tetapi berkarakter. Kain perca solid yang dipilih satu per satu untuk kenyamanan maksimal.",
    sizes: ["2-3T", "4-5T", "6-7T", "8-9T"],
    color: "#2C5F8A",
    badge: null,
    images: [],
  },
  {
    id: 6,
    name: "Set Batik Anak",
    category: "Set",
    price: 85000,
    stock: 5,
    desc: "Satu beli langsung siap tampil. Set kemeja dan celana atau rok batik. Praktis untuk Bunda.",
    sizes: ["3-4T", "5-6T", "7-8T"],
    color: "#8B6914",
    badge: "Promo",
    images: [],
  },
];

/* ============================================================
   SIZE GUIDE DATA
============================================================ */
const SIZE_GUIDE_DATA = {
  title: "Panduan Ukuran Pakaian Anak",
  description: "Pilih ukuran yang pas untuk si kecil agar nyaman beraktivitas",
  tips: [
    "Ukur lingkar dada, panjang badan, dan berat badan anak sebelum memilih",
    "Jika anak di antara dua ukuran, pilih ukuran yang lebih besar",
    "Untuk anak yang aktif, pilih ukuran yang sedikit longgar",
    "Setiap merek mungkin memiliki standar ukuran berbeda",
  ],
  measurements: [
    { usia: "1-2 tahun", tinggi: "75-85 cm", berat: "9-12 kg", dada: "50-52 cm" },
    { usia: "2-3 tahun", tinggi: "85-95 cm", berat: "12-14 kg", dada: "52-54 cm" },
    { usia: "3-4 tahun", tinggi: "95-105 cm", berat: "14-16 kg", dada: "54-56 cm" },
    { usia: "4-5 tahun", tinggi: "105-115 cm", berat: "16-18 kg", dada: "56-58 cm" },
    { usia: "5-6 tahun", tinggi: "115-125 cm", berat: "18-20 kg", dada: "58-60 cm" },
    { usia: "6-7 tahun", tinggi: "125-135 cm", berat: "20-23 kg", dada: "60-63 cm" },
    { usia: "7-8 tahun", tinggi: "135-145 cm", berat: "23-26 kg", dada: "63-66 cm" },
    { usia: "8-9 tahun", tinggi: "145-150 cm", berat: "26-30 kg", dada: "66-69 cm" },
    { usia: "9-10 tahun", tinggi: "150-155 cm", berat: "30-34 kg", dada: "69-72 cm" },
  ],
};

/* ============================================================
   HELPERS
============================================================ */
function formatRupiah(amount) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
}

function generateOrderId() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `RKN/${year}${month}${day}/${random}`;
}

/* ============================================================
   ANIMATION
============================================================ */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
  hover: {
    y: -8,
    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
    transition: { duration: 0.2 },
  },
};

/* ============================================================
   SCROLL REVEAL COMPONENT
============================================================ */
function ScrollReveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={fadeUp}
      custom={delay}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  );
}

/* ============================================================
   PRODUCT CARD COMPONENT — dengan image slider
============================================================ */
function ProductCard({ product, onSelect }) {
  const [slide, setSlide] = useState(0);
  const hasImages = product.images && product.images.length > 0;

  const nextSlide = (e) => {
    e.stopPropagation();
    setSlide((prev) => (prev + 1) % product.images.length);
  };
  const prevSlide = (e) => {
    e.stopPropagation();
    setSlide((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  return (
    <motion.div
      variants={cardVariant}
      whileHover="hover"
      onClick={() => onSelect(product)}
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: "12px",
        overflow: "hidden",
        cursor: "pointer",
        border: "1px solid #EEEEEE",
      }}
    >
      {/* IMAGE / SLIDER */}
      <div
        style={{
          height: "280px",
          backgroundColor: product.color,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {hasImages ? (
          <img
            src={product.images[slide]}
            alt={product.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "top center",
              display: "block",
            }}
          />
        ) : (
          <div
            style={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ fontSize: "48px", opacity: 0.3 }}>👕</span>
          </div>
        )}

        {/* Badge */}
        {product.badge && (
          <span
            style={{
              position: "absolute",
              top: "12px",
              left: "12px",
              backgroundColor: "#C2552A",
              color: "#FFFFFF",
              fontSize: "11px",
              fontWeight: "600",
              padding: "4px 10px",
              borderRadius: "20px",
            }}
          >
            {product.badge}
          </span>
        )}

        {/* Slider controls — hanya tampil jika ada 2+ foto */}
        {hasImages && product.images.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              style={{
                position: "absolute",
                left: "8px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "rgba(255,255,255,0.85)",
                border: "none",
                borderRadius: "50%",
                width: "28px",
                height: "28px",
                fontSize: "16px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              }}
            >
              ‹
            </button>
            <button
              onClick={nextSlide}
              style={{
                position: "absolute",
                right: "8px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "rgba(255,255,255,0.85)",
                border: "none",
                borderRadius: "50%",
                width: "28px",
                height: "28px",
                fontSize: "16px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              }}
            >
              ›
            </button>

            {/* Dots indicator */}
            <div
              style={{
                position: "absolute",
                bottom: "8px",
                left: "50%",
                transform: "translateX(-50%)",
                display: "flex",
                gap: "5px",
              }}
            >
              {product.images.map((_, i) => (
                <div
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSlide(i);
                  }}
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    cursor: "pointer",
                    backgroundColor: i === slide ? "#fff" : "rgba(255,255,255,0.5)",
                    transition: "background 0.2s",
                  }}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* INFO */}
      <div style={{ padding: "20px" }}>
        <div
          style={{
            fontSize: "11px",
            color: "#AAAAAA",
            letterSpacing: "1px",
            textTransform: "uppercase",
            marginBottom: "6px",
          }}
        >
          {product.category}
        </div>
        <h3
          style={{
            fontSize: "18px",
            fontWeight: "600",
            color: "#2D1B0E",
            marginBottom: "8px",
            fontFamily: "'Cormorant Garamond', serif",
          }}
        >
          {product.name}
        </h3>
        <p
          style={{
            fontSize: "13px",
            color: "#666666",
            lineHeight: "1.5",
            marginBottom: "12px",
          }}
        >
          {product.desc.length > 80 ? product.desc.slice(0, 80) + "..." : product.desc}
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: "18px", fontWeight: "700", color: "#C2552A" }}>
            {formatRupiah(product.price)}
          </span>
          <span style={{ fontSize: "11px", color: "#4CAF50" }}>
            Stok {product.stock}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/* ============================================================
   SIZE GUIDE MODAL COMPONENT
============================================================ */
function SizeGuideModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <motion.div
      style={styles.overlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        style={styles.sizeGuideModal}
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 25 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={styles.sizeGuideHeader}>
          <h2 style={styles.sizeGuideTitle}>{SIZE_GUIDE_DATA.title}</h2>
          <button style={styles.closeButton} onClick={onClose}>✕</button>
        </div>

        <p style={styles.sizeGuideDescription}>{SIZE_GUIDE_DATA.description}</p>

        <div style={styles.sizeGuideTips}>
          <h4 style={styles.sizeGuideSubtitle}>Tips Memilih Ukuran:</h4>
          <ul style={styles.sizeGuideTipList}>
            {SIZE_GUIDE_DATA.tips.map((tip, i) => (
              <li key={i} style={styles.sizeGuideTipItem}>• {tip}</li>
            ))}
          </ul>
        </div>

        <h4 style={styles.sizeGuideSubtitle}>Tabel Ukuran (Rekomendasi):</h4>

        <div style={styles.sizeGuideTableWrapper}>
          <table style={styles.sizeGuideTable}>
            <thead>
              <tr>
                <th style={styles.sizeGuideTh}>Usia</th>
                <th style={styles.sizeGuideTh}>Tinggi Badan</th>
                <th style={styles.sizeGuideTh}>Berat Badan</th>
                <th style={styles.sizeGuideTh}>Lingkar Dada</th>
              </tr>
            </thead>
            <tbody>
              {SIZE_GUIDE_DATA.measurements.map((row, i) => (
                <tr key={i}>
                  <td style={styles.sizeGuideTd}>{row.usia}</td>
                  <td style={styles.sizeGuideTd}>{row.tinggi}</td>
                  <td style={styles.sizeGuideTd}>{row.berat}</td>
                  <td style={styles.sizeGuideTd}>{row.dada}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={styles.sizeGuideNote}>
          <p style={styles.sizeGuideNoteText}>
            *Catatan: Tabel ini adalah panduan umum. Setiap anak memiliki bentuk tubuh yang berbeda.
            Jika ragu, pilih ukuran yang lebih besar atau hubungi kami.
          </p>
        </div>

        <motion.button
          style={styles.sizeGuideCloseButton}
          whileHover={{ backgroundColor: "#A04420" }}
          whileTap={{ scale: 0.98 }}
          onClick={onClose}
        >
          Tutup
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

/* ============================================================
   MAIN APP
============================================================ */
export default function RekainStore() {
  const [currentPage, setCurrentPage] = useState("home");
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [customerForm, setCustomerForm] = useState({
    name: "",
    phone: "",
    address: "",
    note: "",
  });

  const categories = ["all", "Kemeja", "Gaun", "Set"];
  const filteredProducts =
    categoryFilter === "all"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === categoryFilter);

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const shippingCost = cartTotal > 0 ? 15000 : 0;
  const grandTotal = cartTotal + shippingCost;

  const addToCart = (product, size) => {
    if (!size) {
      alert("Silakan pilih ukuran terlebih dahulu.");
      return;
    }

    const cartKey = `${product.id}-${size}`;
    setCart((prev) => {
      const existingItem = prev.find((item) => item.cartKey === cartKey);
      if (existingItem) {
        return prev.map((item) =>
          item.cartKey === cartKey
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prev,
        {
          ...product,
          cartKey,
          selectedSize: size,
          quantity: 1,
        },
      ];
    });

    setSelectedProduct(null);
    setSelectedSize("");
    setIsCartOpen(true);
  };

  const updateQuantity = (cartKey, delta) => {
    setCart((prev) =>
      prev.map((item) =>
        item.cartKey === cartKey
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeFromCart = (cartKey) => {
    setCart((prev) => prev.filter((item) => item.cartKey !== cartKey));
  };

  const processPayment = async () => {
    if (!customerForm.name || !customerForm.phone || !customerForm.address) {
      alert("Mohon lengkapi data pengiriman terlebih dahulu.");
      return;
    }

    setIsProcessing(true);

    const orderId = generateOrderId();
    const newOrder = {
      orderId,
      orderDate: new Date().toLocaleString("id-ID"),
      customer: customerForm,
      items: [...cart],
      subtotal: cartTotal,
      shipping: shippingCost,
      total: grandTotal,
    };

    setOrderData(newOrder);

    try {
      const res = await fetch("/api/create-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId,
          customerName: customerForm.name,
          customerEmail: `${customerForm.phone}@rekain.com`,
          items: cart.map((item) => ({
            name: `${item.name} (${item.selectedSize})`,
            qty: item.quantity,
            price: item.price,
          })),
          total: grandTotal,
        }),
      });

      const data = await res.json();

      if (!data.invoiceUrl) {
        throw new Error(data.error || "Gagal mendapatkan link pembayaran");
      }

      window.location.href = data.invoiceUrl;

    } catch (err) {
      console.error("Payment error:", err);
      setIsProcessing(false);
      alert("Gagal memproses pembayaran: " + err.message);
    }
  };

  return (
    <div style={styles.appContainer}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&family=Cormorant+Garamond:wght@400;500;600;700&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'DM Sans', sans-serif; background-color: #FAFAF7; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #F0EDE8; }
        ::-webkit-scrollbar-thumb { background: #C2552A; border-radius: 4px; }
        @media print { .no-print { display: none !important; } body { background: white; } }
      `}</style>

      {/* Navigation */}
      <motion.nav
        style={styles.navbar}
        className="no-print"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div style={styles.logoArea} onClick={() => setCurrentPage("home")}>
          <h1 style={styles.logo}>REKAIN</h1>
          <span style={styles.logoSub}>FASHION</span>
        </div>

        <div style={styles.navLinks}>
          {["home", "shop"].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              style={{
                ...styles.navLink,
                ...(currentPage === page && styles.navLinkActive),
              }}
            >
              {page === "home" ? "Beranda" : "Koleksi"}
            </button>
          ))}
        </div>

        <motion.button
          style={styles.cartButton}
          onClick={() => setIsCartOpen(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>🛒</span>
          {cartQuantity > 0 && (
            <motion.span
              style={styles.cartBadge}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            >
              {cartQuantity}
            </motion.span>
          )}
        </motion.button>
      </motion.nav>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            style={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
          >
            <motion.div
              style={styles.cartSidebar}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={styles.cartHeader}>
                <h3 style={styles.cartTitle}>Keranjang Belanja</h3>
                <button style={styles.closeButton} onClick={() => setIsCartOpen(false)}>✕</button>
              </div>

              {cart.length === 0 ? (
                <div style={styles.emptyCart}>
                  <p>Keranjang belanja masih kosong</p>
                  <p style={{ fontSize: "13px", color: "#AAAAAA" }}>
                    Yuk, pilihkan pakaian untuk si kecil
                  </p>
                </div>
              ) : (
                <>
                  <div style={styles.cartItems}>
                    {cart.map((item) => (
                      <motion.div key={item.cartKey} style={styles.cartItem} layout>
                        {/* Cart item thumbnail */}
                        <div
                          style={{
                            ...styles.cartItemImage,
                            backgroundColor: item.color,
                            overflow: "hidden",
                          }}
                        >
                          {item.images && item.images.length > 0 ? (
                            <img
                              src={item.images[0]}
                              alt={item.name}
                              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
                            />
                          ) : null}
                        </div>
                        <div style={styles.cartItemDetails}>
                          <h4 style={styles.cartItemName}>{item.name}</h4>
                          <p style={styles.cartItemMeta}>Ukuran: {item.selectedSize}</p>
                          <p style={styles.cartItemPrice}>{formatRupiah(item.price)}</p>
                        </div>
                        <div style={styles.cartItemActions}>
                          <div style={styles.quantityControl}>
                            <button
                              style={styles.quantityButton}
                              onClick={() => updateQuantity(item.cartKey, -1)}
                            >
                              -
                            </button>
                            <span style={styles.quantityValue}>{item.quantity}</span>
                            <button
                              style={styles.quantityButton}
                              onClick={() => updateQuantity(item.cartKey, 1)}
                            >
                              +
                            </button>
                          </div>
                          <button
                            style={styles.removeButton}
                            onClick={() => removeFromCart(item.cartKey)}
                          >
                            Hapus
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div style={styles.cartFooter}>
                    <div style={styles.cartTotalRow}>
                      <span>Subtotal</span>
                      <span>{formatRupiah(cartTotal)}</span>
                    </div>
                    <div style={styles.cartTotalRow}>
                      <span>Ongkos Kirim</span>
                      <span>{formatRupiah(shippingCost)}</span>
                    </div>
                    <div style={styles.cartGrandTotal}>
                      <span>Total</span>
                      <span style={{ color: "#C2552A" }}>{formatRupiah(grandTotal)}</span>
                    </div>
                    <motion.button
                      style={styles.checkoutButton}
                      whileHover={{ backgroundColor: "#A04420" }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setCurrentPage("checkout");
                        setIsCartOpen(false);
                      }}
                    >
                      Lanjut ke Pembayaran
                    </motion.button>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Product Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            style={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              style={styles.productModal}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal image — tampilkan foto asli */}
              <div
                style={{
                  ...styles.modalImage,
                  backgroundColor: selectedProduct.color,
                  overflow: "hidden",
                }}
              >
                {selectedProduct.images && selectedProduct.images.length > 0 ? (
                  <img
                    src={selectedProduct.images[0]}
                    alt={selectedProduct.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "top center",
                    }}
                  />
                ) : (
                  <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: "64px", opacity: 0.3 }}>👕</span>
                  </div>
                )}
              </div>

              <div style={styles.modalContent}>
                <div style={styles.modalHeader}>
                  <div>
                    <span style={styles.modalCategory}>{selectedProduct.category}</span>
                    <h2 style={styles.modalTitle}>{selectedProduct.name}</h2>
                  </div>
                  <button
                    style={styles.closeButton}
                    onClick={() => setSelectedProduct(null)}
                  >
                    ✕
                  </button>
                </div>

                <p style={styles.modalDescription}>{selectedProduct.desc}</p>
                <div style={styles.modalPrice}>{formatRupiah(selectedProduct.price)}</div>

                <div style={styles.sizeSection}>
                  <div style={styles.sizeSectionHeader}>
                    <label style={styles.sizeLabel}>Pilih Ukuran</label>
                    <button
                      style={styles.sizeGuideLink}
                      onClick={() => setShowSizeGuide(true)}
                    >
                      📏 Panduan Ukuran
                    </button>
                  </div>
                  <div style={styles.sizeOptions}>
                    {selectedProduct.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        style={{
                          ...styles.sizeButton,
                          ...(selectedSize === size && styles.sizeButtonActive),
                        }}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <motion.button
                  style={styles.addToCartButton}
                  whileHover={{ backgroundColor: "#A04420" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => addToCart(selectedProduct, selectedSize)}
                >
                  Tambah ke Keranjang
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Size Guide Modal */}
      <AnimatePresence>
        {showSizeGuide && (
          <SizeGuideModal
            isOpen={showSizeGuide}
            onClose={() => setShowSizeGuide(false)}
          />
        )}
      </AnimatePresence>

      {/* Loading Overlay */}
      <AnimatePresence>
        {isProcessing && (
          <motion.div
            style={styles.loadingOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              style={styles.loadingSpinner}
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            />
            <p style={styles.loadingText}>Memproses pesanan Anda...</p>
            <p style={{ fontSize: "12px", color: "#AAAAAA" }}>
              Anda akan diarahkan ke halaman pembayaran Xendit
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pages */}
      <AnimatePresence mode="wait">
        {/* Home Page */}
        {currentPage === "home" && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <section style={styles.heroSection}>
              <div style={styles.heroOverlay} />
              <div style={styles.heroContent}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <span style={styles.heroBadge}>Sustainable Fashion</span>
                </motion.div>
                <motion.h1
                  style={styles.heroTitle}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Kain yang Hampir Terbuang,
                  <br />
                  Kini Menjadi Pakaian Kesayangan
                </motion.h1>
                <motion.p
                  style={styles.heroSubtitle}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Kami percaya setiap kain punya cerita. Rekain hadir untuk melanjutkan
                  cerita itu menjadi pakaian anak yang nyaman dan ramah lingkungan.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <motion.button
                    style={styles.heroButton}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setCurrentPage("shop")}
                  >
                    Lihat Koleksi
                  </motion.button>
                </motion.div>
              </div>
            </section>

            <section style={styles.valuesSection}>
              {[
                { icon: "🌿", title: "Zero Waste", description: "Setiap potongan kain yang biasanya terbuang kami selamatkan" },
                { icon: "👶", title: "Lembut di Kulit", description: "Bahan dipilih khusus untuk kenyamanan si kecil" },
                { icon: "🧵", title: "Produk Lokal", description: "Dijahit oleh pengrajin Medan yang terpercaya" },
                { icon: "💛", title: "Harga Terjangkau", description: "Kualitas terbaik dengan harga bersahabat" },
              ].map((item, index) => (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <div style={styles.valueCard}>
                    <div style={styles.valueIcon}>{item.icon}</div>
                    <h3 style={styles.valueTitle}>{item.title}</h3>
                    <p style={styles.valueDescription}>{item.description}</p>
                  </div>
                </ScrollReveal>
              ))}
            </section>

            <section style={styles.productsSection}>
              <ScrollReveal>
                <div style={styles.sectionHeader}>
                  <span style={styles.sectionBadge}>Koleksi Kami</span>
                  <h2 style={styles.sectionTitle}>Paling Banyak Dicari</h2>
                  <p style={styles.sectionSubtitle}>Produk yang paling sering dipilih para Bunda</p>
                </div>
              </ScrollReveal>

              <motion.div
                style={styles.productGrid}
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {PRODUCTS.slice(0, 3).map((product) => (
                  <ProductCard key={product.id} product={product} onSelect={setSelectedProduct} />
                ))}
              </motion.div>

              <div style={styles.viewAllContainer}>
                <motion.button
                  style={styles.viewAllButton}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setCurrentPage("shop")}
                >
                  Lihat Semua Koleksi
                </motion.button>
              </div>
            </section>

            <footer style={styles.footer}>
              <div style={styles.footerContent}>
                <div style={styles.footerLogo}>REKAIN FASHION</div>
                <p style={styles.footerTagline}>Dari Kain Sisa, Lahir Karya Bermakna</p>
                <p style={styles.footerCopyright}>© 2024 Rekain Fashion · Medan, Sumatera Utara</p>
              </div>
            </footer>
          </motion.div>
        )}

        {/* Shop Page */}
        {currentPage === "shop" && (
          <motion.div
            key="shop"
            style={styles.shopPage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <div style={styles.shopHeader}>
              <h1 style={styles.shopTitle}>Semua Koleksi</h1>
              <p style={styles.shopSubtitle}>Pilih pakaian terbaik untuk si kecil</p>
            </div>

            <div style={styles.categoryFilter}>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setCategoryFilter(category)}
                  style={{
                    ...styles.filterButton,
                    ...(categoryFilter === category && styles.filterButtonActive),
                  }}
                >
                  {category === "all" ? "Semua" : category}
                </button>
              ))}
            </div>

            <motion.div
              style={styles.productGrid}
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              key={categoryFilter}
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} onSelect={setSelectedProduct} />
              ))}
            </motion.div>
          </motion.div>
        )}

        {/* Checkout Page */}
        {currentPage === "checkout" && (
          <motion.div
            key="checkout"
            style={styles.checkoutPage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <div style={styles.checkoutContainer}>
              <h1 style={styles.checkoutTitle}>Informasi Pengiriman</h1>
              <p style={styles.checkoutSubtitle}>
                Lengkapi data di bawah untuk melanjutkan pembayaran via Xendit
              </p>

              <div style={styles.checkoutGrid}>
                <div style={styles.checkoutForm}>
                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Nama Lengkap</label>
                    <input
                      type="text"
                      style={styles.formInput}
                      placeholder="Nama penerima"
                      value={customerForm.name}
                      onChange={(e) => setCustomerForm({ ...customerForm, name: e.target.value })}
                    />
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Nomor WhatsApp</label>
                    <input
                      type="tel"
                      style={styles.formInput}
                      placeholder="08123456789"
                      value={customerForm.phone}
                      onChange={(e) => setCustomerForm({ ...customerForm, phone: e.target.value })}
                    />
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Alamat Lengkap</label>
                    <textarea
                      rows={3}
                      style={styles.formTextarea}
                      placeholder="Jl. ..., Kecamatan, Kota, Kode Pos"
                      value={customerForm.address}
                      onChange={(e) => setCustomerForm({ ...customerForm, address: e.target.value })}
                    />
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Catatan (Opsional)</label>
                    <textarea
                      rows={2}
                      style={styles.formTextarea}
                      placeholder="Misal: request ukuran, warna, dll"
                      value={customerForm.note}
                      onChange={(e) => setCustomerForm({ ...customerForm, note: e.target.value })}
                    />
                  </div>

                  <div style={styles.paymentInfo}>
                    <p style={styles.paymentInfoTitle}>💳 Metode Pembayaran Tersedia</p>
                    <p style={styles.paymentInfoDesc}>
                      Transfer Bank (BCA, BNI, BRI, Mandiri) · QRIS · GoPay · OVO · DANA · ShopeePay · Kartu Kredit
                    </p>
                  </div>
                </div>

                <div style={styles.orderSummary}>
                  <h3 style={styles.summaryTitle}>Ringkasan Pesanan</h3>

                  {cart.map((item) => (
                    <div key={item.cartKey} style={styles.summaryItem}>
                      <div>
                        <p style={styles.summaryItemName}>{item.name}</p>
                        <p style={styles.summaryItemMeta}>
                          Ukuran {item.selectedSize} x {item.quantity}
                        </p>
                      </div>
                      <p style={styles.summaryItemPrice}>
                        {formatRupiah(item.price * item.quantity)}
                      </p>
                    </div>
                  ))}

                  <div style={styles.summaryDivider} />

                  <div style={styles.summaryRow}>
                    <span>Subtotal</span>
                    <span>{formatRupiah(cartTotal)}</span>
                  </div>
                  <div style={styles.summaryRow}>
                    <span>Ongkos Kirim</span>
                    <span>{formatRupiah(shippingCost)}</span>
                  </div>
                  <div style={styles.summaryTotal}>
                    <span>Total</span>
                    <span style={{ color: "#C2552A" }}>{formatRupiah(grandTotal)}</span>
                  </div>

                  <motion.button
                    style={styles.processButton}
                    whileHover={{ backgroundColor: "#A04420" }}
                    whileTap={{ scale: 0.98 }}
                    onClick={processPayment}
                    disabled={isProcessing}
                  >
                    {isProcessing ? "Memproses..." : "Bayar via Xendit"}
                  </motion.button>

                  <p style={styles.xenditNote}>
                    🔒 Pembayaran aman diproses oleh Xendit
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Receipt Page */}
        {currentPage === "receipt" && orderData && (
          <motion.div
            key="receipt"
            style={styles.receiptPage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <div style={styles.receiptContainer}>
              <div style={styles.receiptHeader}>
                <h1 style={styles.receiptLogo}>REKAIN FASHION</h1>
                <p style={styles.receiptTagline}>Sustainable Local Fashion</p>
                <p style={styles.receiptMeta}>Medan, Sumatera Utara</p>
              </div>

              <div style={styles.receiptInfo}>
                <div style={styles.receiptInfoRow}>
                  <span>Nomor Order</span>
                  <strong>{orderData.orderId}</strong>
                </div>
                <div style={styles.receiptInfoRow}>
                  <span>Tanggal</span>
                  <span>{orderData.orderDate}</span>
                </div>
                <div style={styles.receiptInfoRow}>
                  <span>Nama</span>
                  <span>{orderData.customer.name}</span>
                </div>
              </div>

              <div style={styles.receiptItems}>
                <h3 style={styles.receiptSectionTitle}>Detail Produk</h3>
                {orderData.items.map((item) => (
                  <div key={item.cartKey} style={styles.receiptItem}>
                    <div>
                      <p style={styles.receiptItemName}>{item.name}</p>
                      <p style={styles.receiptItemMeta}>
                        Ukuran {item.selectedSize} x {item.quantity}
                      </p>
                    </div>
                    <p style={styles.receiptItemPrice}>
                      {formatRupiah(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              <div style={styles.receiptTotals}>
                <div style={styles.receiptRow}>
                  <span>Subtotal</span>
                  <span>{formatRupiah(orderData.subtotal)}</span>
                </div>
                <div style={styles.receiptRow}>
                  <span>Ongkos Kirim</span>
                  <span>{formatRupiah(orderData.shipping)}</span>
                </div>
                <div style={styles.receiptGrandTotal}>
                  <span>Total</span>
                  <span style={{ color: "#C2552A" }}>{formatRupiah(orderData.total)}</span>
                </div>
              </div>

              <div style={styles.receiptAddress}>
                <h4 style={styles.receiptAddressTitle}>Alamat Pengiriman</h4>
                <p>{orderData.customer.address}</p>
                <p>WhatsApp: {orderData.customer.phone}</p>
                {orderData.customer.note && (
                  <p style={styles.receiptNote}>Catatan: {orderData.customer.note}</p>
                )}
              </div>

              <div style={styles.receiptFooter}>
                <p>Terima kasih sudah berbelanja di Rekain Fashion</p>
                <p>Pesanan akan diproses setelah pembayaran terverifikasi</p>
              </div>

              <motion.button
                style={styles.receiptCloseButton}
                whileHover={{ backgroundColor: "#A04420" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setCurrentPage("home")}
              >
                Kembali ke Beranda
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ============================================================
   STYLES
============================================================ */
const styles = {
  appContainer: { minHeight: "100vh", backgroundColor: "#FAFAF7" },
  navbar: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 5%", height: "70px", backgroundColor: "#FFFFFF", borderBottom: "1px solid #F0EDE8", position: "sticky", top: 0, zIndex: 100 },
  logoArea: { display: "flex", alignItems: "baseline", gap: "8px", cursor: "pointer" },
  logo: { fontFamily: "'Cormorant Garamond', serif", fontSize: "24px", fontWeight: "700", color: "#2D1B0E", letterSpacing: "2px" },
  logoSub: { fontSize: "10px", letterSpacing: "3px", color: "#C2552A", textTransform: "uppercase" },
  navLinks: { display: "flex", gap: "32px" },
  navLink: { background: "none", border: "none", fontSize: "13px", fontWeight: "500", color: "#555555", cursor: "pointer", padding: "8px 0", transition: "color 0.2s" },
  navLinkActive: { color: "#C2552A", borderBottom: "2px solid #C2552A" },
  cartButton: { background: "none", border: "none", fontSize: "22px", cursor: "pointer", position: "relative" },
  cartBadge: { position: "absolute", top: "-8px", right: "-12px", backgroundColor: "#C2552A", color: "#FFFFFF", fontSize: "10px", fontWeight: "600", width: "18px", height: "18px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" },
  overlay: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.5)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "flex-end" },
  closeButton: { background: "none", border: "none", fontSize: "20px", cursor: "pointer", color: "#888888" },
  cartSidebar: { width: "400px", maxWidth: "90vw", height: "100%", backgroundColor: "#FFFFFF", display: "flex", flexDirection: "column" },
  cartHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px", borderBottom: "1px solid #EEEEEE" },
  cartTitle: { fontSize: "18px", fontWeight: "600", color: "#2D1B0E" },
  emptyCart: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "8px", color: "#AAAAAA" },
  cartItems: { flex: 1, overflowY: "auto", padding: "20px" },
  cartItem: { display: "flex", gap: "12px", padding: "12px 0", borderBottom: "1px solid #F0EDE8" },
  cartItemImage: { width: "60px", height: "60px", borderRadius: "8px" },
  cartItemDetails: { flex: 1 },
  cartItemName: { fontSize: "14px", fontWeight: "600", color: "#2D1B0E", marginBottom: "4px" },
  cartItemMeta: { fontSize: "12px", color: "#888888", marginBottom: "4px" },
  cartItemPrice: { fontSize: "13px", fontWeight: "600", color: "#C2552A" },
  cartItemActions: { display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "8px" },
  quantityControl: { display: "flex", alignItems: "center", gap: "8px" },
  quantityButton: { width: "28px", height: "28px", borderRadius: "6px", border: "1px solid #DDDDDD", background: "#FFFFFF", cursor: "pointer" },
  quantityValue: { fontSize: "14px", fontWeight: "500", minWidth: "24px", textAlign: "center" },
  removeButton: { background: "none", border: "none", fontSize: "11px", color: "#CCCCCC", cursor: "pointer" },
  cartFooter: { padding: "20px", borderTop: "1px solid #EEEEEE", backgroundColor: "#FAFAF7" },
  cartTotalRow: { display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "13px", color: "#666666" },
  cartGrandTotal: { display: "flex", justifyContent: "space-between", marginTop: "12px", paddingTop: "12px", borderTop: "1px solid #EEEEEE", fontSize: "16px", fontWeight: "700" },
  checkoutButton: { width: "100%", padding: "14px", backgroundColor: "#C2552A", color: "#FFFFFF", border: "none", borderRadius: "8px", fontSize: "13px", fontWeight: "600", cursor: "pointer", marginTop: "16px" },
  productModal: { width: "90%", maxWidth: "500px", maxHeight: "90vh", backgroundColor: "#FFFFFF", borderRadius: "16px", overflowY: "auto", margin: "auto" },
  modalImage: { height: "260px", display: "flex", alignItems: "center", justifyContent: "center" },
  modalContent: { padding: "24px" },
  modalHeader: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" },
  modalCategory: { fontSize: "11px", color: "#AAAAAA", letterSpacing: "1px", textTransform: "uppercase" },
  modalTitle: { fontSize: "22px", fontWeight: "600", color: "#2D1B0E", marginTop: "4px" },
  modalDescription: { fontSize: "13px", color: "#666666", lineHeight: "1.6", marginBottom: "16px" },
  modalPrice: { fontSize: "24px", fontWeight: "700", color: "#C2552A", marginBottom: "20px" },
  sizeSection: { marginBottom: "24px" },
  sizeSectionHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" },
  sizeLabel: { fontSize: "12px", fontWeight: "600", color: "#333333" },
  sizeGuideLink: { background: "none", border: "none", fontSize: "11px", color: "#C2552A", textDecoration: "underline", cursor: "pointer" },
  sizeOptions: { display: "flex", flexWrap: "wrap", gap: "10px" },
  sizeButton: { padding: "8px 16px", border: "1.5px solid #DDDDDD", background: "#FFFFFF", borderRadius: "8px", fontSize: "12px", cursor: "pointer", transition: "all 0.2s" },
  sizeButtonActive: { borderColor: "#C2552A", backgroundColor: "#C2552A", color: "#FFFFFF" },
  addToCartButton: { width: "100%", padding: "14px", backgroundColor: "#C2552A", color: "#FFFFFF", border: "none", borderRadius: "8px", fontSize: "13px", fontWeight: "600", cursor: "pointer" },
  sizeGuideModal: { backgroundColor: "#FFFFFF", borderRadius: "16px", width: "90%", maxWidth: "700px", maxHeight: "85vh", overflowY: "auto", padding: "24px", margin: "auto" },
  sizeGuideHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", borderBottom: "1px solid #EEEEEE", paddingBottom: "12px" },
  sizeGuideTitle: { fontFamily: "'Cormorant Garamond', serif", fontSize: "22px", fontWeight: "600", color: "#2D1B0E" },
  sizeGuideDescription: { fontSize: "13px", color: "#666666", marginBottom: "20px", lineHeight: "1.6" },
  sizeGuideTips: { backgroundColor: "#FFF8F2", padding: "16px", borderRadius: "12px", marginBottom: "20px" },
  sizeGuideSubtitle: { fontSize: "14px", fontWeight: "600", color: "#2D1B0E", marginBottom: "10px" },
  sizeGuideTipList: { listStyle: "none", padding: 0, margin: 0 },
  sizeGuideTipItem: { fontSize: "13px", color: "#555555", marginBottom: "8px", paddingLeft: "8px" },
  sizeGuideTableWrapper: { overflowX: "auto", marginBottom: "20px" },
  sizeGuideTable: { width: "100%", borderCollapse: "collapse", fontSize: "12px" },
  sizeGuideTh: { backgroundColor: "#F5F0E8", padding: "10px 8px", textAlign: "left", fontWeight: "600", color: "#2D1B0E", borderBottom: "1px solid #E8E0D0" },
  sizeGuideTd: { padding: "8px", borderBottom: "1px solid #EEEEEE", color: "#555555" },
  sizeGuideNote: { backgroundColor: "#FAFAF7", padding: "12px", borderRadius: "8px", marginBottom: "20px" },
  sizeGuideNoteText: { fontSize: "11px", color: "#888888", lineHeight: "1.5", margin: 0 },
  sizeGuideCloseButton: { backgroundColor: "#C2552A", color: "#FFFFFF", border: "none", padding: "12px 24px", borderRadius: "8px", fontSize: "13px", fontWeight: "600", cursor: "pointer", width: "100%" },
  loadingOverlay: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(255,255,255,0.9)", zIndex: 300, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "16px" },
  loadingSpinner: { width: "40px", height: "40px", border: "3px solid #F0EDE8", borderTopColor: "#C2552A", borderRadius: "50%" },
  loadingText: { fontSize: "14px", color: "#666666" },
  heroSection: { position: "relative", minHeight: "560px", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", backgroundImage: "url('/rekain-hero.jpeg')", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" },
  heroOverlay: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(28, 14, 4, 0.62)" },
  heroContent: { position: "relative", padding: "60px 20px", maxWidth: "700px", margin: "0 auto" },
  heroBadge: { display: "inline-block", fontSize: "11px", letterSpacing: "3px", color: "#C2A882", textTransform: "uppercase", marginBottom: "20px" },
  heroTitle: { fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px, 5vw, 48px)", fontWeight: "600", color: "#FFFFFF", lineHeight: "1.2", marginBottom: "20px" },
  heroSubtitle: { fontSize: "15px", color: "#D4C5B0", lineHeight: "1.7", marginBottom: "32px", maxWidth: "500px", margin: "0 auto 32px" },
  heroButton: { padding: "12px 32px", backgroundColor: "#C2552A", color: "#FFFFFF", border: "none", borderRadius: "40px", fontSize: "13px", fontWeight: "600", cursor: "pointer" },
  valuesSection: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", backgroundColor: "#FFFFFF", borderBottom: "1px solid #F0EDE8" },
  valueCard: { padding: "48px 24px", textAlign: "center", borderRight: "1px solid #F0EDE8" },
  valueIcon: { fontSize: "36px", marginBottom: "16px" },
  valueTitle: { fontSize: "16px", fontWeight: "600", color: "#2D1B0E", marginBottom: "8px" },
  valueDescription: { fontSize: "13px", color: "#888888", lineHeight: "1.6" },
  productsSection: { padding: "80px 5%" },
  sectionHeader: { textAlign: "center", marginBottom: "48px" },
  sectionBadge: { fontSize: "11px", letterSpacing: "3px", color: "#C2552A", textTransform: "uppercase", display: "block", marginBottom: "12px" },
  sectionTitle: { fontFamily: "'Cormorant Garamond', serif", fontSize: "32px", fontWeight: "600", color: "#2D1B0E", marginBottom: "12px" },
  sectionSubtitle: { fontSize: "14px", color: "#888888", maxWidth: "500px", margin: "0 auto" },
  productGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "24px" },
  viewAllContainer: { textAlign: "center", marginTop: "48px" },
  viewAllButton: { padding: "12px 32px", backgroundColor: "transparent", color: "#C2552A", border: "2px solid #C2552A", borderRadius: "40px", fontSize: "13px", fontWeight: "600", cursor: "pointer" },
  footer: { backgroundColor: "#2D1B0E", padding: "48px 20px", textAlign: "center" },
  footerContent: { maxWidth: "600px", margin: "0 auto" },
  footerLogo: { fontFamily: "'Cormorant Garamond', serif", fontSize: "24px", fontWeight: "600", color: "#FFFFFF", letterSpacing: "2px", marginBottom: "12px" },
  footerTagline: { fontSize: "12px", color: "#C2A882", marginBottom: "16px" },
  footerCopyright: { fontSize: "11px", color: "#666666" },
  shopPage: { padding: "48px 5%" },
  shopHeader: { textAlign: "center", marginBottom: "40px" },
  shopTitle: { fontFamily: "'Cormorant Garamond', serif", fontSize: "36px", fontWeight: "600", color: "#2D1B0E", marginBottom: "8px" },
  shopSubtitle: { fontSize: "14px", color: "#888888" },
  categoryFilter: { display: "flex", justifyContent: "center", gap: "12px", marginBottom: "40px", flexWrap: "wrap" },
  filterButton: { padding: "8px 20px", backgroundColor: "#FFFFFF", color: "#666666", border: "1.5px solid #EEEEEE", borderRadius: "30px", fontSize: "13px", cursor: "pointer", transition: "all 0.2s" },
  filterButtonActive: { backgroundColor: "#C2552A", color: "#FFFFFF", borderColor: "#C2552A" },
  checkoutPage: { padding: "48px 5%", minHeight: "calc(100vh - 70px)" },
  checkoutContainer: { maxWidth: "1000px", margin: "0 auto" },
  checkoutTitle: { fontFamily: "'Cormorant Garamond', serif", fontSize: "28px", fontWeight: "600", color: "#2D1B0E", marginBottom: "8px" },
  checkoutSubtitle: { fontSize: "13px", color: "#888888", marginBottom: "32px" },
  checkoutGrid: { display: "grid", gridTemplateColumns: "1fr 380px", gap: "32px" },
  checkoutForm: { backgroundColor: "#FFFFFF", padding: "24px", borderRadius: "16px", border: "1px solid #F0EDE8" },
  formGroup: { marginBottom: "20px" },
  formLabel: { display: "block", fontSize: "12px", fontWeight: "600", color: "#333333", marginBottom: "8px" },
  formInput: { width: "100%", padding: "12px", border: "1.5px solid #EEEEEE", borderRadius: "8px", fontSize: "13px", fontFamily: "'DM Sans', sans-serif" },
  formTextarea: { width: "100%", padding: "12px", border: "1.5px solid #EEEEEE", borderRadius: "8px", fontSize: "13px", fontFamily: "'DM Sans', sans-serif", resize: "vertical" },
  paymentInfo: { backgroundColor: "#F0F7FF", padding: "14px 16px", borderRadius: "10px", marginTop: "8px" },
  paymentInfoTitle: { fontSize: "12px", fontWeight: "600", color: "#2C5F8A", marginBottom: "6px" },
  paymentInfoDesc: { fontSize: "11px", color: "#555555", lineHeight: "1.6" },
  orderSummary: { backgroundColor: "#FFFFFF", padding: "24px", borderRadius: "16px", border: "1px solid #F0EDE8", height: "fit-content" },
  summaryTitle: { fontSize: "16px", fontWeight: "600", color: "#2D1B0E", marginBottom: "16px", paddingBottom: "12px", borderBottom: "1px solid #F0EDE8" },
  summaryItem: { display: "flex", justifyContent: "space-between", marginBottom: "12px" },
  summaryItemName: { fontSize: "13px", fontWeight: "500", color: "#333333" },
  summaryItemMeta: { fontSize: "11px", color: "#AAAAAA" },
  summaryItemPrice: { fontSize: "13px", fontWeight: "500", color: "#C2552A" },
  summaryDivider: { height: "1px", backgroundColor: "#F0EDE8", margin: "16px 0" },
  summaryRow: { display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "13px", color: "#666666" },
  summaryTotal: { display: "flex", justifyContent: "space-between", marginTop: "12px", paddingTop: "12px", borderTop: "1px solid #F0EDE8", fontSize: "16px", fontWeight: "700" },
  processButton: { width: "100%", padding: "14px", backgroundColor: "#C2552A", color: "#FFFFFF", border: "none", borderRadius: "8px", fontSize: "13px", fontWeight: "600", cursor: "pointer", marginTop: "20px" },
  xenditNote: { textAlign: "center", fontSize: "11px", color: "#AAAAAA", marginTop: "10px" },
  receiptPage: { padding: "48px 5%", minHeight: "calc(100vh - 70px)", backgroundColor: "#F5F0E8" },
  receiptContainer: { maxWidth: "500px", margin: "0 auto", backgroundColor: "#FFFFFF", borderRadius: "16px", padding: "32px" },
  receiptHeader: { textAlign: "center", marginBottom: "24px", paddingBottom: "20px", borderBottom: "2px dashed #F0EDE8" },
  receiptLogo: { fontFamily: "'Cormorant Garamond', serif", fontSize: "24px", fontWeight: "700", color: "#2D1B0E", letterSpacing: "2px" },
  receiptTagline: { fontSize: "10px", color: "#C2552A", letterSpacing: "2px", textTransform: "uppercase", marginTop: "4px" },
  receiptMeta: { fontSize: "11px", color: "#AAAAAA", marginTop: "8px" },
  receiptInfo: { backgroundColor: "#FAFAF7", padding: "16px", borderRadius: "12px", marginBottom: "24px" },
  receiptInfoRow: { display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "12px" },
  receiptItems: { marginBottom: "24px" },
  receiptSectionTitle: { fontSize: "12px", fontWeight: "600", color: "#2D1B0E", marginBottom: "12px", paddingBottom: "8px", borderBottom: "1px solid #F0EDE8" },
  receiptItem: { display: "flex", justifyContent: "space-between", marginBottom: "12px" },
  receiptItemName: { fontSize: "13px", fontWeight: "500", color: "#333333" },
  receiptItemMeta: { fontSize: "11px", color: "#AAAAAA" },
  receiptItemPrice: { fontSize: "13px", fontWeight: "500", color: "#C2552A" },
  receiptTotals: { borderTop: "1px solid #F0EDE8", paddingTop: "16px", marginBottom: "24px" },
  receiptRow: { display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "13px", color: "#666666" },
  receiptGrandTotal: { display: "flex", justifyContent: "space-between", marginTop: "12px", paddingTop: "12px", borderTop: "1px solid #F0EDE8", fontSize: "16px", fontWeight: "700" },
  receiptAddress: { backgroundColor: "#FAFAF7", padding: "16px", borderRadius: "12px", marginBottom: "24px" },
  receiptAddressTitle: { fontSize: "12px", fontWeight: "600", color: "#2D1B0E", marginBottom: "8px" },
  receiptNote: { marginTop: "8px", fontStyle: "italic", color: "#888888" },
  receiptFooter: { textAlign: "center", paddingTop: "20px", borderTop: "2px dashed #F0EDE8", fontSize: "11px", color: "#AAAAAA", lineHeight: "1.6", marginBottom: "24px" },
  receiptCloseButton: { width: "100%", padding: "12px", backgroundColor: "#C2552A", color: "#FFFFFF", border: "none", borderRadius: "8px", fontSize: "13px", fontWeight: "600", cursor: "pointer" },
};
