Baik! Saya akan berikan kode lengkap yang sudah saya sesuaikan dengan **Client Key** Anda.

**Client Key Anda:** `Mid-client-8gPYQxOju-oG9sej`

---

## File 1: `src/main.jsx` - Copy paste ini seluruhnya

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import RekainStore from './rekain-store.jsx'
import './index.css'

// Client Key Midtrans Anda
const CLIENT_KEY = 'Mid-client-8gPYQxOju-oG9sej'

// URL Midtrans Snap (sandbox untuk testing)
const MIDTRANS_SCRIPT_URL = 'https://api.sandbox.midtrans.com/v2/assets/js/snap.js'

// Fungsi untuk memuat script Midtrans
const loadMidtransScript = () => {
  return new Promise((resolve) => {
    // Cek apakah script sudah ada
    if (document.getElementById('midtrans-snap-script')) {
      resolve(true)
      return
    }
    
    // Buat script baru
    const script = document.createElement('script')
    script.id = 'midtrans-snap-script'
    script.src = MIDTRANS_SCRIPT_URL
    script.setAttribute('data-client-key', CLIENT_KEY)
    
    script.onload = () => {
      console.log('Midtrans Snap loaded successfully')
      resolve(true)
    }
    
    script.onerror = () => {
      console.error('Failed to load Midtrans Snap')
      resolve(false)
    }
    
    document.body.appendChild(script)
  })
}

// Root element
const rootElement = document.getElementById('root')

// Load Midtrans dulu, baru render aplikasi
loadMidtransScript().then(() => {
  if (rootElement) {
    ReactDOM.createRoot(rootElement).render(
      <React.StrictMode>
        <RekainStore />
      </React.StrictMode>
    )
  } else {
    console.error('Element dengan id "root" tidak ditemukan')
  }
})
```

---

## File 2: `src/rekain-store.jsx` - Copy paste ini seluruhnya

**Perhatian:** Kode ini panjang, pastikan Anda copy SEMUA dari awal sampai akhir.

```jsx
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

/* ============================================================
   DATA PRODUK
============================================================ */
const PRODUCTS = [
  {
    id: 1,
    name: "Batik Perca Anak",
    category: "Kemeja",
    price: 79000,
    stock: 12,
    desc: "Dijahit dari potongan batik pilihan yang seharusnya terbuang. Kini menjadi kemeja yang nyaman dipakai si kecil seharian.",
    sizes: ["2-3T", "4-5T", "6-7T", "8-9T"],
    color: "#8B4513",
    badge: "Best Seller",
  },
  {
    id: 2,
    name: "Gaun Perca Floral",
    category: "Gaun",
    price: 85000,
    stock: 8,
    desc: "Motif bunga dari kain perca yang lembut di kulit. Untuk putri kecil yang selalu berharga.",
    sizes: ["2-3T", "4-5T", "6-7T"],
    color: "#C2552A",
    badge: "New Arrival",
  },
  {
    id: 3,
    name: "Kemeja Batik Casual",
    category: "Kemeja",
    price: 75000,
    stock: 15,
    desc: "Santai ke taman atau hangout bersama teman. Kemeja ini menemani hari-hari si kecil tanpa rewel.",
    sizes: ["2-3T", "4-5T", "6-7T", "8-9T", "10T"],
    color: "#4A7A5A",
    badge: null,
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
  },
];

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

function ProductCard({ product, onSelect }) {
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
      <div
        style={{
          height: "240px",
          backgroundColor: product.color,
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span style={{ fontSize: "48px", opacity: 0.3 }}>👕</span>
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
      </div>

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
          <span
            style={{ fontSize: "18px", fontWeight: "700", color: "#C2552A" }}
          >
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
  const [customerForm, setCustomerForm] = useState({
    name: "",
    phone: "",
    address: "",
    note: "",
  });
  const [snapReady, setSnapReady] = useState(false);

  const categories = ["all", "Kemeja", "Gaun", "Set"];
  const filteredProducts =
    categoryFilter === "all"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === categoryFilter);

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const shippingCost = cartTotal > 0 ? 15000 : 0;
  const grandTotal = cartTotal + shippingCost;

  // Cek apakah Midtrans Snap sudah siap
  useEffect(() => {
    const checkSnap = () => {
      if (window.snap) {
        setSnapReady(true);
      } else {
        setTimeout(checkSnap, 500);
      }
    };
    checkSnap();
  }, []);

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

  // Proses pembayaran dengan Midtrans
  const processPayment = async () => {
    if (!customerForm.name || !customerForm.phone || !customerForm.address) {
      alert("Mohon lengkapi data pengiriman terlebih dahulu.");
      return;
    }

    if (!snapReady) {
      alert("Sistem pembayaran sedang dimuat, silakan tunggu sebentar.");
      return;
    }

    setIsProcessing(true);

    const orderId = generateOrderId();
    const newOrder = {
      orderId: orderId,
      orderDate: new Date().toLocaleString("id-ID"),
      customer: customerForm,
      items: [...cart],
      subtotal: cartTotal,
      shipping: shippingCost,
      total: grandTotal,
    };

    setOrderData(newOrder);

    // Parameter untuk Midtrans
    const transactionDetails = {
      transaction_details: {
        order_id: orderId,
        gross_amount: grandTotal,
      },
      customer_details: {
        first_name: customerForm.name,
        email: `${customerForm.phone}@customer.com`,
        phone: customerForm.phone,
        billing_address: {
          address: customerForm.address,
        },
        shipping_address: {
          address: customerForm.address,
        },
      },
      item_details: [
        ...cart.map((item) => ({
          id: item.id.toString(),
          name: `${item.name} (${item.selectedSize})`,
          price: item.price,
          quantity: item.quantity,
          brand: "Rekain Fashion",
          category: item.category,
        })),
        {
          id: "SHIPPING",
          name: "Ongkos Kirim",
          price: shippingCost,
          quantity: 1,
          brand: "Rekain Fashion",
          category: "Shipping",
        },
      ],
      enabled_payments: [
        "credit_card",
        "bank_transfer",
        "qris",
        "gopay",
        "shopeepay",
        "ovo",
        "dana",
        "linkaja",
      ],
      bank_transfer: {
        banks: ["bca", "bri", "mandiri", "bni"],
      },
    };

    try {
      // Buka popup pembayaran Midtrans
      window.snap.pay(transactionDetails, {
        onSuccess: (result) => {
          console.log("Payment Success:", result);
          setIsProcessing(false);
          setCurrentPage("receipt");
          setCart([]);
          alert("Pembayaran berhasil! Terima kasih sudah berbelanja.");
        },
        onPending: (result) => {
          console.log("Payment Pending:", result);
          setIsProcessing(false);
          alert("Menunggu pembayaran. Silakan selesaikan pembayaran Anda.");
        },
        onError: (result) => {
          console.log("Payment Error:", result);
          setIsProcessing(false);
          alert("Pembayaran gagal. Silakan coba lagi.");
        },
        onClose: () => {
          console.log("Payment popup closed");
          setIsProcessing(false);
        },
      });
    } catch (error) {
      console.error("Payment error:", error);
      setIsProcessing(false);
      alert("Terjadi kesalahan. Silakan coba lagi.");
    }
  };

  return (
    <div style={styles.appContainer}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&family=Cormorant+Garamond:wght@400;500;600;700&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'DM Sans', sans-serif;
          background-color: #FAFAF7;
        }
        
        ::-webkit-scrollbar {
          width: 6px;
        }
        
        ::-webkit-scrollbar-track {
          background: #F0EDE8;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #C2552A;
          border-radius: 4px;
        }
        
        @media print {
          .no-print {
            display: none !important;
          }
          body {
            background: white;
          }
        }
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
                <button style={styles.closeButton} onClick={() => setIsCartOpen(false)}>
                  ✕
                </button>
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
                      <motion.div
                        key={item.cartKey}
                        style={styles.cartItem}
                        layout
                      >
                        <div
                          style={{
                            ...styles.cartItemImage,
                            backgroundColor: item.color,
                          }}
                        />
                        <div style={styles.cartItemDetails}>
                          <h4 style={styles.cartItemName}>{item.name}</h4>
                          <p style={styles.cartItemMeta}>
                            Ukuran: {item.selectedSize}
                          </p>
                          <p style={styles.cartItemPrice}>
                            {formatRupiah(item.price)}
                          </p>
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
                      <span style={{ color: "#C2552A" }}>
                        {formatRupiah(grandTotal)}
                      </span>
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
              <div
                style={{
                  ...styles.modalImage,
                  backgroundColor: selectedProduct.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ fontSize: "64px", opacity: 0.3 }}>👕</span>
              </div>
              <div style={styles.modalContent}>
                <div style={styles.modalHeader}>
                  <div>
                    <span style={styles.modalCategory}>
                      {selectedProduct.category}
                    </span>
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

                <div style={styles.modalPrice}>
                  {formatRupiah(selectedProduct.price)}
                </div>

                <div style={styles.sizeSection}>
                  <label style={styles.sizeLabel}>Pilih Ukuran</label>
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
          </motion.div>
        )}
      </AnimatePresence>

      {/* Home Page */}
      <AnimatePresence mode="wait">
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
                {
                  icon: "🌿",
                  title: "Zero Waste",
                  description: "Setiap potongan kain yang biasanya terbuang kami selamatkan",
                },
                {
                  icon: "👶",
                  title: "Lembut di Kulit",
                  description: "Bahan dipilih khusus untuk kenyamanan si kecil",
                },
                {
                  icon: "🧵",
                  title: "Produk Lokal",
                  description: "Dijahit oleh pengrajin Medan yang terpercaya",
                },
                {
                  icon: "💛",
                  title: "Harga Terjangkau",
                  description: "Kualitas terbaik dengan harga bersahabat",
                },
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
                  <p style={styles.sectionSubtitle}>
                    Produk yang paling sering dipilih para Bunda
                  </p>
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
                  <ProductCard
                    key={product.id}
                    product={product}
                    onSelect={setSelectedProduct}
                  />
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
                <p style={styles.footerCopyright}>
                  © 2024 Rekain Fashion · Medan, Sumatera Utara
                </p>
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
              <p style={styles.shopSubtitle}>
                Pilih pakaian terbaik untuk si kecil
              </p>
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
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelect={setSelectedProduct}
                />
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
                Lengkapi data di bawah untuk melanjutkan pembayaran
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
                      onChange={(e) =>
                        setCustomerForm({ ...customerForm, name: e.target.value })
                      }
                    />
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Nomor WhatsApp</label>
                    <input
                      type="tel"
                      style={styles.formInput}
                      placeholder="08123456789"
                      value={customerForm.phone}
                      onChange={(e) =>
                        setCustomerForm({ ...customerForm, phone: e.target.value })
                      }
                    />
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Alamat Lengkap</label>
                    <textarea
                      rows={3}
                      style={styles.formTextarea}
                      placeholder="Jl. ..., Kecamatan, Kota, Kode Pos"
                      value={customerForm.address}
                      onChange={(e) =>
                        setCustomerForm({ ...customerForm, address: e.target.value })
                      }
                    />
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Catatan (Opsional)</label>
                    <textarea
                      rows={2}
                      style={styles.formTextarea}
                      placeholder="Misal: request ukuran, warna, dll"
                      value={customerForm.note}
                      onChange={(e) =>
                        setCustomerForm({ ...customerForm, note: e.target.value })
                      }
                    />
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
                    <span style={{ color: "#C2552A" }}>
                      {formatRupiah(grandTotal)}
                    </span>
                  </div>

                  <motion.button
                    style={styles.processButton}
                    whileHover={{ backgroundColor: "#A04420" }}
                    whileTap={{ scale: 0.98 }}
                    onClick={processPayment}
                  >
                    Bayar Sekarang
                  </motion.button>
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
            exit={{ opacity:
