import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

// =====================================================================
// PRODUCTS DATA
// =====================================================================
const PRODUCTS = [
  {
    id: 1,
    name: "Gaun Batik Perca Nusantara",
    category: "Gaun",
    price: 89000,
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
    price: 110000,
    stock: 5,
    desc: "Sepasang kemeja dan celana dari kain batik tradisional yang dikombinasikan dengan desain modern.",
    sizes: ["4-5T", "6-7T"],
    color: "#A0522D",
    badge: null,
    images: [],
  },
];

// =====================================================================
// ANIMATION
// =====================================================================
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

// =====================================================================
// SCROLL REVEAL COMPONENT
// =====================================================================
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


// =====================================================================
// SPARKLE RATING COMPONENT
// =====================================================================
function Sparkle({ filled, size = 12 }) {
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

function SparkleRating({ value = 0, max = 5, size = 12, interactive = false, onChange }) {
  const [hovered, setHovered] = useState(0);
  const display = interactive ? (hovered || value) : value;
  return (
    <div style={{ display: "flex", gap: "3px", alignItems: "center" }}>
      {Array.from({ length: max }).map((_, i) => (
        <span
          key={i}
          style={{ cursor: interactive ? "pointer" : "default", lineHeight: 1 }}
          onMouseEnter={() => interactive && setHovered(i + 1)}
          onMouseLeave={() => interactive && setHovered(0)}
          onClick={() => interactive && onChange && onChange(i + 1)}
        >
          <Sparkle filled={i < display} size={size} />
        </span>
      ))}
    </div>
  );
}

// =====================================================================
// PRODUCT CARD COMPONENT — dengan image slider
// =====================================================================
function ProductCard({ product, onSelect, rating }) {
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
                backgroundColor: "rgba(255,255,255,0.7)",
                border: "none",
                borderRadius: "50%",
                width: "32px",
                height: "32px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "16px",
                transition: "all 0.2s",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "rgba(255,255,255,0.9)")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "rgba(255,255,255,0.7)")}
            >
              ❮
            </button>
            <button
              onClick={nextSlide}
              style={{
                position: "absolute",
                right: "8px",
                top: "50%",
                transform: "translateY(-50%)",
                backgroundColor: "rgba(255,255,255,0.7)",
                border: "none",
                borderRadius: "50%",
                width: "32px",
                height: "32px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "16px",
                transition: "all 0.2s",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "rgba(255,255,255,0.9)")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "rgba(255,255,255,0.7)")}
            >
              ❯
            </button>
          </>
        )}
      </div>

      {/* INFO */}
      <div style={{ padding: "16px" }}>
        <p style={{ fontSize: "11px", color: "#C2552A", fontWeight: "600", letterSpacing: "1px", margin: 0 }}>
          {product.category}
        </p>
        <h3 style={{ fontSize: "15px", fontWeight: "600", color: "#2D1B0E", margin: "6px 0 8px" }}>
          {product.name}
        </h3>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: "16px", fontWeight: "700", color: "#C2552A" }}>
            Rp {product.price.toLocaleString("id-ID")}
          </span>
          <span style={{ fontSize: "12px", color: "#A08060" }}>
            {product.stock > 0 ? `${product.stock} stok` : "Habis"}
          </span>
        </div>
        {rating && rating.count > 0 && (
          <div style={{ marginTop: "8px", display: "flex", alignItems: "center", gap: "4px" }}>
            <SparkleRating value={Math.round(rating.average)} size={10} />
            <span style={{ fontSize: "11px", color: "#A08060" }}>
              ({rating.count})
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// =====================================================================
// SIZE GUIDE MODAL COMPONENT
// =====================================================================
function SizeGuideModal({ isOpen, onClose }) {
  const sizes = {
    "2-3T": { cm: 92, age: "2-3 Tahun" },
    "3-4T": { cm: 98, age: "3-4 Tahun" },
    "4-5T": { cm: 104, age: "4-5 Tahun" },
    "5-6T": { cm: 110, age: "5-6 Tahun" },
    "6-7T": { cm: 116, age: "6-7 Tahun" },
    "7-8T": { cm: 122, age: "7-8 Tahun" },
    "8-9T": { cm: 128, age: "8-9 Tahun" },
    XS: { cm: 130, age: "Remaja XS" },
    S: { cm: 140, age: "Remaja S" },
    M: { cm: 150, age: "Remaja M" },
    L: { cm: 160, age: "Remaja L" },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isOpen ? 1 : 0 }}
      exit={{ opacity: 0 }}
      style={{
        display: isOpen ? "flex" : "none",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: "12px",
          padding: "32px",
          maxHeight: "80vh",
          overflowY: "auto",
          maxWidth: "500px",
          width: "90%",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: "600", color: "#2D1B0E", margin: 0 }}>Panduan Ukuran</h2>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              fontSize: "24px",
              cursor: "pointer",
              color: "#999999",
            }}
          >
            ✕
          </button>
        </div>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #F0EDE8" }}>
              <th style={{ textAlign: "left", padding: "12px 0", color: "#2D1B0E", fontWeight: "600" }}>Ukuran</th>
              <th style={{ textAlign: "left", padding: "12px 0", color: "#2D1B0E", fontWeight: "600" }}>Tinggi Badan</th>
              <th style={{ textAlign: "left", padding: "12px 0", color: "#2D1B0E", fontWeight: "600" }}>Usia</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(sizes).map(([key, value], idx) => (
              <tr key={idx} style={{ borderBottom: "1px solid #F0EDE8" }}>
                <td style={{ padding: "12px 0", color: "#666666" }}>{key}</td>
                <td style={{ padding: "12px 0", color: "#666666" }}>{value.cm} cm</td>
                <td style={{ padding: "12px 0", color: "#666666" }}>{value.age}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <p style={{ fontSize: "12px", color: "#A08060", marginTop: "20px", fontStyle: "italic" }}>
          💡 Tips: Pilih ukuran berdasarkan tinggi badan anak. Jika tidak yakin, hubungi kami melalui WhatsApp.
        </p>
      </motion.div>
    </motion.div>
  );
}

// =====================================================================
// MAIN APP
// =====================================================================
export default function RekainStore() {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [ratings, setRatings] = useState({});
  const [reviewForm, setReviewForm] = useState({
    submitted: false,
    name: "",
    rating: 0,
    comment: "",
  });
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [cartSize, setCartSize] = useState(null);
  const [paymentData, setPaymentData] = useState(null);
  const [paymentUrl, setPaymentUrl] = useState(null);

  // Fetch ratings function
  const fetchRatings = async () => {
    // Here you'd typically fetch from an API
    const mockRatings = {
      1: { average: 4.8, count: 12 },
      2: { average: 4.6, count: 8 },
      3: { average: 4.5, count: 5 },
    };
    setRatings(mockRatings);
  };

  // Submit review function
  const submitReview = async (product) => {
    if (reviewForm.rating === 0) {
      alert("Silakan pilih bintang rating");
      return;
    }

    // Update local ratings
    const updatedRatings = { ...ratings };
    if (!updatedRatings[product.id]) {
      updatedRatings[product.id] = { average: 0, count: 0 };
    }

    const current = updatedRatings[product.id];
    current.average = (current.average * current.count + reviewForm.rating) / (current.count + 1);
    current.count += 1;

    setRatings(updatedRatings);
    setReviewForm({ submitted: true, name: "", rating: 0, comment: "" });

    // Simulate API submission
    setTimeout(() => {
      setReviewForm({ submitted: false, name: "", rating: 0, comment: "" });
    }, 2000);
  };

  // Add to cart function
  const addToCart = (product, size) => {
    if (!size) {
      alert("Silakan pilih ukuran");
      return;
    }

    const cartKey = `${product.id}-${size}`;
    const existing = cart.find((item) => item.cartKey === cartKey);

    if (existing) {
      updateQuantity(cartKey, 1);
    } else {
      setCart([
        ...cart,
        {
          cartKey,
          id: product.id,
          name: product.name,
          price: product.price,
          size,
          quantity: 1,
          images: product.images,
        },
      ]);
    }

    alert("Ditambahkan ke keranjang!");
    setSelectedProduct(null);
  };

  const updateQuantity = (cartKey, delta) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.cartKey === cartKey ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (cartKey) => {
    setCart((prev) => prev.filter((item) => item.cartKey !== cartKey));
  };

  const processPayment = async () => {
    if (cart.length === 0) {
      alert("Keranjang kosong");
      return;
    }

    const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const orderData = {
      orderId: "RKN-" + Date.now(),
      items: cart,
      totalAmount,
      timestamp: new Date().toISOString(),
    };

    setPaymentData(orderData);
    setCurrentPage("checkout");
  };

  React.useEffect(() => {
    fetchRatings();
  }, []);

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
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setCurrentPage("cart")}
          className="no-print"
        >
          🛒
          {cart.length > 0 && <span style={styles.cartBadge}>{cart.length}</span>}
        </motion.button>
      </motion.nav>

      {/* HOME PAGE */}
      {currentPage === "home" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          {/* Hero Section */}
          <section style={styles.heroSection}>
            <div style={styles.heroOverlay} />
            <div style={styles.heroContent}>
              <motion.p
                style={styles.heroBadge}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Tenunan kain perca, menautkan cerita.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <motion.button
                  style={styles.heroButton}
                  whileHover={{ scale: 1.05, backgroundColor: "#A04420" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setCurrentPage("shop")}
                >
                  Lihat Koleksi
                </motion.button>
              </motion.div>
            </div>
          </section>

          {/* Values Section */}
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
                <ScrollReveal key={product.id}>
                  <ProductCard
                    product={product}
                    onSelect={setSelectedProduct}
                    rating={ratings[product.id]}
                  />
                </ScrollReveal>
              ))}
            </motion.div>

            <div style={styles.viewAllContainer}>
              <motion.button
                style={styles.viewAllButton}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentPage("shop")}
              >
                Lihat Semua Produk
              </motion.button>
            </div>
          </section>
        </motion.div>
      )}

      {/* SHOP PAGE */}
      {currentPage === "shop" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={styles.shopPage}>
          <div style={styles.shopContainer}>
            <div style={styles.shopHeader}>
              <h1 style={styles.shopTitle}>Koleksi Lengkap</h1>
              <p style={styles.shopSubtitle}>Temukan pakaian impian untuk si kecil</p>
            </div>

            <div style={styles.productGrid}>
              {PRODUCTS.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelect={setSelectedProduct}
                  rating={ratings[product.id]}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* PRODUCT DETAIL MODAL */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: selectedProduct ? 1 : 0 }}
        exit={{ opacity: 0 }}
        style={{
          display: selectedProduct ? "flex" : "none",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 999,
          padding: "20px",
        }}
        onClick={() => setSelectedProduct(null)}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: "12px",
            overflow: "auto",
            maxHeight: "90vh",
            maxWidth: "600px",
            width: "100%",
          }}
        >
          {selectedProduct && (
            <div>
              {/* Product Images Slider */}
              <div
                style={{
                  height: "350px",
                  backgroundColor: selectedProduct.color,
                  position: "relative",
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
                    <span style={{ fontSize: "80px", opacity: 0.3 }}>👕</span>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div style={{ padding: "32px 24px" }}>
                <p style={{ fontSize: "11px", color: "#C2552A", fontWeight: "600", letterSpacing: "1px", margin: 0 }}>
                  {selectedProduct.category}
                </p>
                <h1 style={{ fontSize: "28px", fontWeight: "600", color: "#2D1B0E", margin: "12px 0 8px" }}>
                  {selectedProduct.name}
                </h1>

                {/* Rating */}
                {ratings[selectedProduct.id] && ratings[selectedProduct.id].count > 0 && (
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
                    <SparkleRating value={Math.round(ratings[selectedProduct.id].average)} size={14} />
                    <span style={{ fontSize: "12px", color: "#A08060" }}>
                      {ratings[selectedProduct.id].average.toFixed(1)} dari {ratings[selectedProduct.id].count} ulasan
                    </span>
                  </div>
                )}

                <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "20px" }}>
                  <span style={{ fontSize: "28px", fontWeight: "700", color: "#C2552A" }}>
                    Rp {selectedProduct.price.toLocaleString("id-ID")}
                  </span>
                  <span style={{ fontSize: "13px", color: "#A08060" }}>
                    {selectedProduct.stock > 0 ? `${selectedProduct.stock} stok tersedia` : "Habis"}
                  </span>
                </div>

                <p style={{ fontSize: "13px", color: "#666666", lineHeight: "1.6", marginBottom: "24px" }}>
                  {selectedProduct.desc}
                </p>

                {/* Size Selection */}
                {selectedProduct.sizes.length > 0 && (
                  <div style={{ marginBottom: "24px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                      <label style={{ fontSize: "12px", fontWeight: "600", color: "#2D1B0E" }}>PILIH UKURAN</label>
                      <button
                        onClick={() => setSizeGuideOpen(true)}
                        style={{
                          background: "none",
                          border: "none",
                          fontSize: "11px",
                          color: "#C2552A",
                          cursor: "pointer",
                          textDecoration: "underline",
                        }}
                      >
                        Panduan Ukuran
                      </button>
                    </div>
                    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                      {selectedProduct.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setCartSize(size)}
                          style={{
                            padding: "10px 16px",
                            backgroundColor: cartSize === size ? "#C2552A" : "#F5F0E8",
                            color: cartSize === size ? "#FFFFFF" : "#2D1B0E",
                            border: "1px solid #EEEEEE",
                            borderRadius: "6px",
                            fontSize: "13px",
                            fontWeight: "600",
                            cursor: "pointer",
                            transition: "all 0.2s",
                          }}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Add to Cart Button */}
                <motion.button
                  style={styles.heroButton}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => addToCart(selectedProduct, cartSize)}
                >
                  🛒 Masukkan Keranjang
                </motion.button>

                {/* Review Section */}
                <div style={{ marginTop: "32px", borderTop: "1px solid #F0EDE8", paddingTop: "24px" }}>
                  <p style={{ fontSize: "12px", fontWeight: "600", color: "#2D1B0E", marginBottom: "12px", letterSpacing: "0.5px" }}>
                    BERI PENILAIAN
                  </p>

                  {/* Show existing rating */}
                  {ratings[selectedProduct.id] && ratings[selectedProduct.id].count > 0 && (
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
                      <SparkleRating value={Math.round(ratings[selectedProduct.id].average)} size={14} />
                      <span style={{ fontSize: "12px", color: "#A08060" }}>
                        {ratings[selectedProduct.id].average.toFixed(1)} dari {ratings[selectedProduct.id].count} ulasan
                      </span>
                    </div>
                  )}

                  {reviewForm.submitted ? (
                    <div style={{ backgroundColor: "#F0F0F0", padding: "12px", borderRadius: "6px", textAlign: "center" }}>
                      <p style={{ fontSize: "12px", color: "#2D1B0E", margin: 0 }}>✓ Terima kasih atas ulasan Anda!</p>
                    </div>
                  ) : (
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <SparkleRating
                        value={reviewForm.rating}
                        max={5}
                        size={16}
                        interactive={true}
                        onChange={(val) => setReviewForm({ ...reviewForm, rating: val })}
                      />
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => submitReview(selectedProduct)}
                        style={{
                          padding: "6px 16px",
                          backgroundColor: "#C2552A",
                          color: "#FFFFFF",
                          border: "none",
                          borderRadius: "20px",
                          fontSize: "11px",
                          fontWeight: "600",
                          cursor: "pointer",
                        }}
                      >
                        Kirim
                      </motion.button>
                    </div>
                  )}
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setSelectedProduct(null)}
                style={{
                  position: "absolute",
                  top: "16px",
                  right: "16px",
                  background: "rgba(255,255,255,0.9)",
                  border: "none",
                  borderRadius: "50%",
                  width: "36px",
                  height: "36px",
                  fontSize: "20px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 10,
                }}
              >
                ✕
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* SIZE GUIDE MODAL */}
      <SizeGuideModal isOpen={sizeGuideOpen} onClose={() => setSizeGuideOpen(false)} />

      {/* CART PAGE */}
      {currentPage === "cart" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={styles.cartPage}>
          <div style={styles.cartContainer}>
            <h1 style={styles.cartTitle}>🛒 Keranjang Belanja</h1>

            {cart.length === 0 ? (
              <div style={{ textAlign: "center", padding: "60px 20px" }}>
                <p style={{ fontSize: "16px", color: "#888888", marginBottom: "20px" }}>Keranjang kosong</p>
                <motion.button
                  style={styles.heroButton}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setCurrentPage("shop")}
                >
                  Lanjut Belanja
                </motion.button>
              </div>
            ) : (
              <>
                <div style={styles.cartItems}>
                  {cart.map((item) => (
                    <div key={item.cartKey} style={styles.cartItem}>
                      <div style={{ display: "flex", gap: "16px", flex: 1 }}>
                        {item.images && item.images.length > 0 ? (
                          <img
                            src={item.images[0]}
                            alt={item.name}
                            style={{
                              width: "80px",
                              height: "80px",
                              objectFit: "cover",
                              borderRadius: "8px",
                            }}
                          />
                        ) : (
                          <div
                            style={{
                              width: "80px",
                              height: "80px",
                              backgroundColor: "#F5F0E8",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              borderRadius: "8px",
                            }}
                          >
                            👕
                          </div>
                        )}

                        <div style={{ flex: 1 }}>
                          <h3 style={{ fontSize: "14px", fontWeight: "600", color: "#2D1B0E", margin: 0 }}>
                            {item.name}
                          </h3>
                          <p style={{ fontSize: "12px", color: "#A08060", margin: "4px 0" }}>Ukuran: {item.size}</p>
                          <p style={{ fontSize: "13px", fontWeight: "600", color: "#C2552A", margin: "4px 0" }}>
                            Rp {item.price.toLocaleString("id-ID")}
                          </p>

                          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "8px" }}>
                            <button
                              onClick={() => updateQuantity(item.cartKey, -1)}
                              style={{
                                width: "24px",
                                height: "24px",
                                backgroundColor: "#F5F0E8",
                                border: "1px solid #EEEEEE",
                                borderRadius: "4px",
                                cursor: "pointer",
                                fontSize: "12px",
                              }}
                            >
                              −
                            </button>
                            <span style={{ fontSize: "12px", fontWeight: "600", minWidth: "20px", textAlign: "center" }}>
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.cartKey, 1)}
                              style={{
                                width: "24px",
                                height: "24px",
                                backgroundColor: "#F5F0E8",
                                border: "1px solid #EEEEEE",
                                borderRadius: "4px",
                                cursor: "pointer",
                                fontSize: "12px",
                              }}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.cartKey)}
                        style={{
                          background: "none",
                          border: "none",
                          fontSize: "18px",
                          cursor: "pointer",
                          color: "#C2552A",
                          padding: 0,
                        }}
                      >
                        🗑️
                      </button>
                    </div>
                  ))}
                </div>

                {/* Cart Summary */}
                <div style={styles.cartSummary}>
                  <div style={styles.summaryRow}>
                    <span>Subtotal:</span>
                    <span>
                      Rp {cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toLocaleString("id-ID")}
                    </span>
                  </div>
                  <div style={styles.summaryRow}>
                    <span>Ongkir:</span>
                    <span>Rp 0</span>
                  </div>
                  <div style={styles.summaryTotal}>
                    <span>Total:</span>
                    <span>
                      Rp {cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toLocaleString("id-ID")}
                    </span>
                  </div>
                </div>

                <motion.button
                  style={styles.processButton}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={processPayment}
                >
                  Lanjutkan ke Pembayaran
                </motion.button>
              </>
            )}
          </div>
        </motion.div>
      )}

      {/* CHECKOUT PAGE */}
      {currentPage === "checkout" && paymentData && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={styles.cartPage}>
          <div style={styles.cartContainer}>
            <h1 style={styles.cartTitle}>💳 Pembayaran</h1>

            <div style={styles.cartItems}>
              {paymentData.items.map((item) => (
                <div key={item.cartKey} style={styles.cartItem}>
                  <div style={{ display: "flex", gap: "16px", flex: 1 }}>
                    {item.images && item.images.length > 0 ? (
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        style={{
                          width: "80px",
                          height: "80px",
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          width: "80px",
                          height: "80px",
                          backgroundColor: "#F5F0E8",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: "8px",
                        }}
                      >
                        👕
                      </div>
                    )}

                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontSize: "14px", fontWeight: "600", color: "#2D1B0E", margin: 0 }}>
                        {item.name}
                      </h3>
                      <p style={{ fontSize: "12px", color: "#A08060", margin: "4px 0" }}>Ukuran: {item.size}</p>
                      <p style={{ fontSize: "13px", fontWeight: "600", color: "#C2552A", margin: "4px 0" }}>
                        Rp {item.price.toLocaleString("id-ID")} × {item.quantity}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Payment Summary */}
            <div style={styles.cartSummary}>
              <div style={styles.summaryRow}>
                <span>Total Pembayaran:</span>
                <span style={{ fontWeight: "700", color: "#C2552A", fontSize: "16px" }}>
                  Rp {paymentData.totalAmount.toLocaleString("id-ID")}
                </span>
              </div>
            </div>

            <motion.button
              style={styles.processButton}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                alert("Pembayaran melalui Xendit dipromosikan di sini");
                setCurrentPage("home");
                setCart([]);
              }}
            >
              Bayar Sekarang (Xendit)
            </motion.button>
            <p style={styles.xenditNote}>Anda akan diarahkan ke gateway pembayaran Xendit</p>

            <motion.button
              style={{
                ...styles.processButton,
                backgroundColor: "#999999",
                marginTop: "12px",
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setCurrentPage("cart")}
            >
              Kembali ke Keranjang
            </motion.button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

/* ============================================================
   STYLES
============================================================ */
const styles = {
  appContainer: { minHeight: "100vh", backgroundColor: "#FAFAF7" },
  navbar: { padding: "16px 40px", backgroundColor: "#FFFFFF", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #F0EDE8", position: "sticky", top: 0, zIndex: 100 },
  logoArea: { cursor: "pointer", display: "flex", flexDirection: "column", gap: 0 },
  logo: { fontSize: "20px", fontWeight: "700", color: "#2D1B0E", fontFamily: "'Cormorant Garamond', serif", margin: 0 },
  logoSub: { fontSize: "10px", color: "#C2552A", fontWeight: "600", letterSpacing: "2px" },
  navLinks: { display: "flex", gap: "32px", justifyContent: "center", flex: 1 },
  navLink: { background: "none", border: "none", fontSize: "13px", fontWeight: "500", color: "#555555", cursor: "pointer", padding: "8px 0", transition: "color 0.2s" },
  navLinkActive: { color: "#C2552A", borderBottom: "2px solid #C2552A" },
  cartButton: { background: "none", border: "none", fontSize: "22px", cursor: "pointer", position: "relative" },
  cartBadge: { position: "absolute", top: "-8px", right: "-12px", backgroundColor: "#C2552A", color: "#FFFFFF", fontSize: "10px", fontWeight: "600", width: "18px", height: "18px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" },
  heroSection: { position: "relative", minHeight: "560px", display: "flex", alignItems: "flex-end", justifyContent: "center", textAlign: "center", backgroundImage: "url('/rekain-hero.jpeg')", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" },
  heroOverlay: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "linear-gradient(to top, rgba(20,10,2,0.80) 0%, rgba(20,10,2,0.15) 60%, transparent 100%)" },
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
  viewAllButton: { padding: "12px 40px", backgroundColor: "#FFFFFF", color: "#C2552A", border: "2px solid #C2552A", borderRadius: "40px", fontSize: "13px", fontWeight: "600", cursor: "pointer", transition: "all 0.2s" },
  shopPage: { padding: "40px 5%" },
  shopContainer: { maxWidth: "1200px", margin: "0 auto" },
  shopHeader: { textAlign: "center", marginBottom: "40px" },
  shopTitle: { fontFamily: "'Cormorant Garamond', serif", fontSize: "36px", fontWeight: "600", color: "#2D1B0E", marginBottom: "8px" },
  shopSubtitle: { fontSize: "14px", color: "#888888" },
  categoryFilter: { display: "flex", justifyContent: "center", gap: "12px", marginBottom: "40px", flexWrap: "wrap" },
  filterButton: { padding: "8px 20px", backgroundColor: "#FFFFFF", color: "#666666", border: "1.5px solid #EEEEEE", borderRadius: "30px", fontSize: "13px", cursor: "pointer", transition: "all 0.2s" },
  filterButtonActive: { backgroundColor: "#C2552A", color: "#FFFFFF", borderColor: "#C2552A" },
  cartPage: { padding: "40px 5%" },
  cartContainer: { maxWidth: "700px", margin: "0 auto" },
  cartTitle: { fontSize: "28px", fontWeight: "600", color: "#2D1B0E", marginBottom: "24px" },
  cartItems: { display: "grid", gap: "16px", marginBottom: "24px" },
  cartItem: { display: "flex", gap: "16px", padding: "16px", backgroundColor: "#F5F0E8", borderRadius: "8px", alignItems: "flex-start" },
  cartSummary: { backgroundColor: "#F5F0E8", padding: "16px", borderRadius: "8px", marginBottom: "24px" },
  summaryRow: { display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "13px", color: "#666666" },
  summaryTotal: { display: "flex", justifyContent: "space-between", marginTop: "12px", paddingTop: "12px", borderTop: "1px solid #F0EDE8", fontSize: "16px", fontWeight: "700" },
  processButton: { width: "100%", padding: "14px", backgroundColor: "#C2552A", color: "#FFFFFF", border: "none", borderRadius: "8px", fontSize: "13px", fontWeight: "600", cursor: "pointer", marginTop: "20px" },
  xenditNote: { textAlign: "center", fontSize: "11px", color: "#AAAAAA", marginTop: "10px" },
  receiptPage: { padding: "48px 5%", minHeight: "calc(100vh - 70px)", backgroundColor: "#F5F0E8" },
};
