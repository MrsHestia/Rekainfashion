import React, { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// =====================================================================
// PRODUCTS DATA
// =====================================================================
const PRODUCTS = [
  {
    id: 1,
    name: "Gaun Batik Perca Nusantara",
    category: "Gaun",
    price: 39999,
    stock: 2,
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
    price: 39999,
    stock: 2,
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
    price: 39999,
    stock: 2,
    desc: "Perpaduan atasan denim biru tanpa lengan dengan rok floral motif mawar pink. Tampil kasual tapi tetap feminin — cocok untuk hangout atau acara santai remaja putri.",
    sizes: ["S", "M", "L"],
    color: "#6B9AC4",
    badge: null,
    images: ["/dress-denim-rose-1.jpeg", "/dress-denim-rose-2.jpeg"],
  },
  {
    id: 4,
    name: "Ikat Rambut Perca",
    category: "Aksesoris",
    price: 9000,
    stock: 20,
    desc: "Ikat rambut handmade karya mahasiswa kewirausahaan.",
    sizes: [],
    color: "#7B3D8C",
    badge: "Limited",
    images: ["/ikat-rambut-perca.png"],
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
// SCROLL REVEAL
// =====================================================================
function ScrollReveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
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
// SPARKLE RATING
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
// PRODUCT CARD
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
      <div style={{ height: "280px", backgroundColor: product.color, position: "relative", overflow: "hidden" }}>
        {hasImages ? (
          <img
            src={product.images[slide]}
            alt={product.name}
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", display: "block" }}
          />
        ) : (
          <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: "48px", opacity: 0.3 }}>&#128085;</span>
          </div>
        )}

        {product.badge && (
          <span style={{
            position: "absolute", top: "12px", left: "12px",
            backgroundColor: "#C2552A", color: "#FFFFFF",
            fontSize: "11px", fontWeight: "600", padding: "4px 10px", borderRadius: "20px",
          }}>
            {product.badge}
          </span>
        )}

        {hasImages && product.images.length > 1 && (
          <>
            <button onClick={prevSlide} style={sliderBtnStyle("left")}>&#10094;</button>
            <button onClick={nextSlide} style={sliderBtnStyle("right")}>&#10095;</button>
            <div style={{ position: "absolute", bottom: "8px", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "5px" }}>
              {product.images.map((_, i) => (
                <div key={i} onClick={(e) => { e.stopPropagation(); setSlide(i); }}
                  style={{ width: "6px", height: "6px", borderRadius: "50%", cursor: "pointer", backgroundColor: i === slide ? "#fff" : "rgba(255,255,255,0.5)" }}
                />
              ))}
            </div>
          </>
        )}
      </div>

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
            <span style={{ fontSize: "11px", color: "#A08060" }}>({rating.count})</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function sliderBtnStyle(side) {
  return {
    position: "absolute",
    [side]: "8px",
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
  };
}

// =====================================================================
// SIZE GUIDE MODAL
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
    S: { cm: 140, age: "Remaja S" },
    M: { cm: 150, age: "Remaja M" },
    L: { cm: 160, age: "Remaja L" },
  };

  if (!isOpen) return null;

  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 }} onClick={onClose}>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        onClick={(e) => e.stopPropagation()}
        style={{ backgroundColor: "#FFFFFF", borderRadius: "12px", padding: "32px", maxHeight: "80vh", overflowY: "auto", maxWidth: "500px", width: "90%" }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: "600", color: "#2D1B0E", margin: 0 }}>Panduan Ukuran</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: "24px", cursor: "pointer", color: "#999999" }}>&#10005;</button>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #F0EDE8" }}>
              <th style={{ textAlign: "left", padding: "12px 0", color: "#2D1B0E", fontWeight: "600" }}>Ukuran</th>
              <th style={{ textAlign: "left", padding: "12px 0", color: "#2D1B0E", fontWeight: "600" }}>Tinggi</th>
              <th style={{ textAlign: "left", padding: "12px 0", color: "#2D1B0E", fontWeight: "600" }}>Usia</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(sizes).map(([key, value], idx) => (
              <tr key={idx} style={{ borderBottom: "1px solid #F0EDE8" }}>
                <td style={{ padding: "10px 0", color: "#666666" }}>{key}</td>
                <td style={{ padding: "10px 0", color: "#666666" }}>{value.cm} cm</td>
                <td style={{ padding: "10px 0", color: "#666666" }}>{value.age}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ fontSize: "12px", color: "#A08060", marginTop: "20px", fontStyle: "italic" }}>
          Tips: Jika tidak yakin, hubungi kami melalui WhatsApp.
        </p>
      </motion.div>
    </div>
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
  const [reviewForm, setReviewForm] = useState({ submitted: false, name: "", rating: 0, loading: false });
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [cartSize, setCartSize] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [customerForm, setCustomerForm] = useState({ name: "", phone: "", address: "", note: "" });

  // ---- Supabase: fetch ratings ----
  useEffect(() => {
    const fetchRatings = async () => {
      const { data, error } = await supabase.from("reviews").select("product_id, rating");
      if (error || !data) return;
      const map = {};
      data.forEach(({ product_id, rating }) => {
        if (!map[product_id]) map[product_id] = { total: 0, count: 0 };
        map[product_id].total += rating;
        map[product_id].count += 1;
      });
      const result = {};
      Object.entries(map).forEach(([id, { total, count }]) => {
        result[id] = { average: total / count, count };
      });
      setRatings(result);
    };
    fetchRatings();
  }, []);

  // ---- Supabase: submit review ----
  const submitReview = async (product) => {
    if (reviewForm.rating === 0) { alert("Silakan pilih bintang rating"); return; }
    setReviewForm((prev) => ({ ...prev, loading: true }));
    const { error } = await supabase.from("reviews").insert({
      product_id: product.id,
      reviewer_name: reviewForm.name.trim() || "Anonim",
      rating: reviewForm.rating,
    });
    if (error) { alert("Gagal mengirim review."); setReviewForm((prev) => ({ ...prev, loading: false })); return; }
    const { data } = await supabase.from("reviews").select("product_id, rating").eq("product_id", product.id);
    if (data) {
      const total = data.reduce((s, r) => s + r.rating, 0);
      setRatings((prev) => ({ ...prev, [product.id]: { average: total / data.length, count: data.length } }));
    }
    setReviewForm({ name: "", rating: 0, submitted: true, loading: false });
  };

  // ---- Cart ----
  const addToCart = (product, size) => {
    // Produk tanpa ukuran (aksesoris) tidak perlu pilih size
    const hasSizes = product.sizes && product.sizes.length > 0;
    if (hasSizes && !size) { alert("Silakan pilih ukuran"); return; }
    const effectiveSize = hasSizes ? size : "One Size";
    const cartKey = `${product.id}-${effectiveSize}`;
    const existing = cart.find((item) => item.cartKey === cartKey);
    if (existing) {
      setCart((prev) => prev.map((item) => item.cartKey === cartKey ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      setCart([...cart, { cartKey, id: product.id, name: product.name, price: product.price, size: effectiveSize, quantity: 1, images: product.images, color: product.color }]);
    }
    setSelectedProduct(null);
    setCartSize(null);
  };

  const updateQuantity = (cartKey, delta) => {
    setCart((prev) => prev.map((item) => item.cartKey === cartKey ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item));
  };

  const removeFromCart = (cartKey) => setCart((prev) => prev.filter((item) => item.cartKey !== cartKey));

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingCost = cartTotal > 0 ? 15000 : 0;
  const grandTotal = cartTotal + shippingCost;

  // ---- Xendit payment ----
  const processPayment = async () => {
    if (!customerForm.name || !customerForm.phone || !customerForm.address) {
      alert("Mohon lengkapi data pengiriman.");
      return;
    }
    setIsProcessing(true);
    try {
      const orderId = "RKN-" + Date.now();
      const res = await fetch("/api/create-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId,
          customerName: customerForm.name,
          customerEmail: `${customerForm.phone}@rekain.com`,
          items: cart.map((item) => ({ name: `${item.name} (${item.size})`, qty: item.quantity, price: item.price })),
          total: grandTotal,
        }),
      });
      const data = await res.json();
      if (!data.invoiceUrl) throw new Error(data.error || "Gagal mendapatkan link pembayaran");
      window.location.href = data.invoiceUrl;
    } catch (err) {
      alert("Gagal memproses pembayaran: " + err.message);
      setIsProcessing(false);
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
      `}</style>

      {/* NAVBAR */}
      <motion.nav style={styles.navbar} initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
        <div style={styles.logoArea} onClick={() => setCurrentPage("home")}>
          <h1 style={styles.logo}>REKAIN</h1>
          <span style={styles.logoSub}>FASHION</span>
        </div>
        <div style={styles.navLinks}>
          {["home", "shop"].map((page) => (
            <button key={page} onClick={() => setCurrentPage(page)}
              style={{ ...styles.navLink, ...(currentPage === page && styles.navLinkActive) }}>
              {page === "home" ? "Beranda" : "Koleksi"}
            </button>
          ))}
        </div>
        <motion.button style={styles.cartButton} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={() => setCurrentPage("cart")}>
          &#128722;
          {cart.length > 0 && <span style={styles.cartBadge}>{cart.reduce((s, i) => s + i.quantity, 0)}</span>}
        </motion.button>
      </motion.nav>

      {/* HOME PAGE */}
      {currentPage === "home" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <section style={styles.heroSection}>
            <div style={styles.heroOverlay} />
            <div style={styles.heroContent}>
              <motion.p style={styles.heroBadge} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                Tenunan kain perca, menautkan cerita.
              </motion.p>
              <motion.button style={styles.heroButton} whileHover={{ scale: 1.05, backgroundColor: "#A04420" }} whileTap={{ scale: 0.98 }}
                onClick={() => setCurrentPage("shop")} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                Lihat Koleksi
              </motion.button>
            </div>
          </section>

          <section style={styles.valuesSection}>
            {[
              { icon: "&#127807;", title: "Zero Waste", description: "Setiap potongan kain yang biasanya terbuang kami selamatkan" },
              { icon: "&#128118;", title: "Lembut di Kulit", description: "Bahan dipilih khusus untuk kenyamanan si kecil" },
              { icon: "&#129525;", title: "Produk Lokal", description: "Dijahit oleh pengrajin Medan yang terpercaya" },
              { icon: "&#128155;", title: "Harga Terjangkau", description: "Kualitas terbaik dengan harga bersahabat" },
            ].map((item, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div style={styles.valueCard}>
                  <div style={styles.valueIcon} dangerouslySetInnerHTML={{ __html: item.icon }} />
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
            <motion.div style={styles.productGrid} variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              {PRODUCTS.slice(0, 3).map((product) => (
                <ProductCard key={product.id} product={product} onSelect={(p) => { setSelectedProduct(p); setReviewForm({ name: "", rating: 0, submitted: false, loading: false }); setCartSize(null); }} rating={ratings[product.id]} />
              ))}
            </motion.div>
            <div style={styles.viewAllContainer}>
              <motion.button style={styles.viewAllButton} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setCurrentPage("shop")}>
                Lihat Semua Produk
              </motion.button>
            </div>
          </section>

          <footer style={styles.footer}>
            <div style={styles.footerContent}>
              <div style={styles.footerLogo}>REKAIN FASHION</div>
              <p style={styles.footerTagline}>Dari Kain Sisa, Lahir Karya Bermakna</p>
              <p style={styles.footerCopyright}>&#169; 2024 Rekain Fashion &middot; Medan, Sumatera Utara</p>
            </div>
          </footer>
        </motion.div>
      )}

      {/* SHOP PAGE */}
      {currentPage === "shop" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={styles.shopPage}>
          <div style={styles.shopContainer}>
            <div style={styles.shopHeader}>
              <h1 style={styles.shopTitle}>Koleksi Lengkap</h1>
              <p style={styles.shopSubtitle}>Temukan pakaian impian untuk si kecil</p>
            </div>
            <motion.div style={styles.productGrid} variants={staggerContainer} initial="hidden" animate="visible">
              {PRODUCTS.map((product) => (
                <ProductCard key={product.id} product={product}
                  onSelect={(p) => { setSelectedProduct(p); setReviewForm({ name: "", rating: 0, submitted: false, loading: false }); setCartSize(null); }}
                  rating={ratings[product.id]} />
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* CART PAGE */}
      {currentPage === "cart" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={styles.cartPage}>
          <div style={styles.cartContainer}>
            <h1 style={styles.cartTitle}>Keranjang Belanja</h1>
            {cart.length === 0 ? (
              <div style={{ textAlign: "center", padding: "60px 20px" }}>
                <p style={{ fontSize: "16px", color: "#888888", marginBottom: "20px" }}>Keranjang kosong</p>
                <motion.button style={styles.heroButton} whileHover={{ scale: 1.05 }} onClick={() => setCurrentPage("shop")}>
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
                          <img src={item.images[0]} alt={item.name} style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "8px" }} />
                        ) : (
                          <div style={{ width: "80px", height: "80px", backgroundColor: item.color || "#F5F0E8", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "8px" }}>
                            <span style={{ fontSize: "32px" }}>&#128085;</span>
                          </div>
                        )}
                        <div style={{ flex: 1 }}>
                          <h3 style={{ fontSize: "14px", fontWeight: "600", color: "#2D1B0E", margin: 0 }}>{item.name}</h3>
                          <p style={{ fontSize: "12px", color: "#A08060", margin: "4px 0" }}>Ukuran: {item.size}</p>
                          <p style={{ fontSize: "13px", fontWeight: "600", color: "#C2552A", margin: "4px 0" }}>Rp {item.price.toLocaleString("id-ID")}</p>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "8px" }}>
                            <button onClick={() => updateQuantity(item.cartKey, -1)} style={styles.qtyBtn}>&#8722;</button>
                            <span style={{ fontSize: "13px", fontWeight: "600", minWidth: "20px", textAlign: "center" }}>{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.cartKey, 1)} style={styles.qtyBtn}>+</button>
                          </div>
                        </div>
                      </div>
                      <button onClick={() => removeFromCart(item.cartKey)} style={{ background: "none", border: "none", fontSize: "18px", cursor: "pointer", color: "#C2552A" }}>
                        &#128465;
                      </button>
                    </div>
                  ))}
                </div>
                <div style={styles.cartSummary}>
                  <div style={styles.summaryRow}><span>Subtotal</span><span>Rp {cartTotal.toLocaleString("id-ID")}</span></div>
                  <div style={styles.summaryRow}><span>Ongkir</span><span>Rp {shippingCost.toLocaleString("id-ID")}</span></div>
                  <div style={styles.summaryTotal}><span>Total</span><span style={{ color: "#C2552A" }}>Rp {grandTotal.toLocaleString("id-ID")}</span></div>
                </div>
                <motion.button style={styles.processButton} whileHover={{ backgroundColor: "#A04420" }} whileTap={{ scale: 0.98 }} onClick={() => setCurrentPage("checkout")}>
                  Lanjut ke Pembayaran
                </motion.button>
              </>
            )}
          </div>
        </motion.div>
      )}

      {/* CHECKOUT PAGE */}
      {currentPage === "checkout" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={styles.cartPage}>
          <div style={{ maxWidth: "700px", margin: "0 auto" }}>
            <h1 style={styles.cartTitle}>Informasi Pengiriman</h1>
            <div style={{ backgroundColor: "#FFFFFF", padding: "24px", borderRadius: "16px", border: "1px solid #F0EDE8", marginBottom: "24px" }}>
              {[
                { label: "Nama Lengkap", key: "name", type: "text", placeholder: "Nama penerima" },
                { label: "Nomor WhatsApp", key: "phone", type: "tel", placeholder: "08123456789" },
              ].map(({ label, key, type, placeholder }) => (
                <div key={key} style={{ marginBottom: "16px" }}>
                  <label style={styles.formLabel}>{label}</label>
                  <input type={type} placeholder={placeholder} value={customerForm[key]}
                    onChange={(e) => setCustomerForm({ ...customerForm, [key]: e.target.value })}
                    style={styles.formInput} />
                </div>
              ))}
              <div style={{ marginBottom: "16px" }}>
                <label style={styles.formLabel}>Alamat Lengkap</label>
                <textarea rows={3} placeholder="Jl. ..., Kecamatan, Kota, Kode Pos" value={customerForm.address}
                  onChange={(e) => setCustomerForm({ ...customerForm, address: e.target.value })}
                  style={styles.formInput} />
              </div>
              <div style={{ marginBottom: "16px" }}>
                <label style={styles.formLabel}>Catatan (Opsional)</label>
                <textarea rows={2} placeholder="Misal: request warna, dll" value={customerForm.note}
                  onChange={(e) => setCustomerForm({ ...customerForm, note: e.target.value })}
                  style={styles.formInput} />
              </div>
              <div style={{ backgroundColor: "#F0F7FF", padding: "14px", borderRadius: "10px" }}>
                <p style={{ fontSize: "12px", fontWeight: "600", color: "#2C5F8A", marginBottom: "4px" }}>Metode Pembayaran</p>
                <p style={{ fontSize: "11px", color: "#555555" }}>Transfer Bank (BCA, BNI, BRI, Mandiri) &middot; QRIS &middot; GoPay &middot; OVO &middot; DANA &middot; ShopeePay</p>
              </div>
            </div>

            <div style={{ backgroundColor: "#FFFFFF", padding: "24px", borderRadius: "16px", border: "1px solid #F0EDE8" }}>
              <h3 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "16px" }}>Ringkasan Pesanan</h3>
              {cart.map((item) => (
                <div key={item.cartKey} style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                  <div>
                    <p style={{ fontSize: "13px", fontWeight: "500" }}>{item.name}</p>
                    <p style={{ fontSize: "11px", color: "#AAAAAA" }}>Ukuran {item.size} x {item.quantity}</p>
                  </div>
                  <p style={{ fontSize: "13px", color: "#C2552A", fontWeight: "500" }}>Rp {(item.price * item.quantity).toLocaleString("id-ID")}</p>
                </div>
              ))}
              <div style={{ borderTop: "1px solid #F0EDE8", paddingTop: "12px", marginTop: "12px" }}>
                <div style={styles.summaryRow}><span>Subtotal</span><span>Rp {cartTotal.toLocaleString("id-ID")}</span></div>
                <div style={styles.summaryRow}><span>Ongkir</span><span>Rp {shippingCost.toLocaleString("id-ID")}</span></div>
                <div style={styles.summaryTotal}><span>Total</span><span style={{ color: "#C2552A" }}>Rp {grandTotal.toLocaleString("id-ID")}</span></div>
              </div>
              <motion.button style={styles.processButton} whileHover={{ backgroundColor: "#A04420" }} whileTap={{ scale: 0.98 }}
                onClick={processPayment} disabled={isProcessing}>
                {isProcessing ? "Memproses..." : "Bayar via Xendit"}
              </motion.button>
              <p style={{ textAlign: "center", fontSize: "11px", color: "#AAAAAA", marginTop: "10px" }}>
                &#128274; Pembayaran aman diproses oleh Xendit
              </p>
              <button onClick={() => setCurrentPage("cart")} style={{ width: "100%", marginTop: "10px", padding: "12px", backgroundColor: "transparent", border: "1px solid #DDDDDD", borderRadius: "8px", cursor: "pointer", fontSize: "13px", color: "#888888" }}>
                Kembali ke Keranjang
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* PRODUCT DETAIL MODAL */}
      {selectedProduct && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 999, padding: "20px" }}
          onClick={() => setSelectedProduct(null)}>
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            style={{ backgroundColor: "#FFFFFF", borderRadius: "12px", overflow: "auto", maxHeight: "90vh", maxWidth: "600px", width: "100%", position: "relative" }}>
            <div style={{ height: "350px", backgroundColor: selectedProduct.color, position: "relative", overflow: "hidden" }}>
              {selectedProduct.images && selectedProduct.images.length > 0 ? (
                <img src={selectedProduct.images[0]} alt={selectedProduct.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: "80px", opacity: 0.3 }}>&#128085;</span>
                </div>
              )}
            </div>
            <button onClick={() => setSelectedProduct(null)}
              style={{ position: "absolute", top: "16px", right: "16px", background: "rgba(255,255,255,0.9)", border: "none", borderRadius: "50%", width: "36px", height: "36px", fontSize: "18px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10 }}>
              &#10005;
            </button>
            <div style={{ padding: "24px" }}>
              <p style={{ fontSize: "11px", color: "#C2552A", fontWeight: "600", letterSpacing: "1px", margin: 0 }}>{selectedProduct.category}</p>
              <h1 style={{ fontSize: "24px", fontWeight: "600", color: "#2D1B0E", margin: "8px 0" }}>{selectedProduct.name}</h1>
              {ratings[selectedProduct.id] && ratings[selectedProduct.id].count > 0 && (
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                  <SparkleRating value={Math.round(ratings[selectedProduct.id].average)} size={14} />
                  <span style={{ fontSize: "12px", color: "#A08060" }}>{ratings[selectedProduct.id].average.toFixed(1)} dari {ratings[selectedProduct.id].count} ulasan</span>
                </div>
              )}
              <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "16px" }}>
                <span style={{ fontSize: "26px", fontWeight: "700", color: "#C2552A" }}>Rp {selectedProduct.price.toLocaleString("id-ID")}</span>
                <span style={{ fontSize: "13px", color: "#A08060" }}>{selectedProduct.stock} stok tersedia</span>
              </div>
              <p style={{ fontSize: "13px", color: "#666666", lineHeight: "1.6", marginBottom: "20px" }}>{selectedProduct.desc}</p>

              {/* Hanya tampilkan pilih ukuran jika produk punya sizes */}
              {selectedProduct.sizes && selectedProduct.sizes.length > 0 && (
                <div style={{ marginBottom: "20px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                    <label style={{ fontSize: "12px", fontWeight: "600", color: "#2D1B0E" }}>PILIH UKURAN</label>
                    <button onClick={() => setSizeGuideOpen(true)} style={{ background: "none", border: "none", fontSize: "11px", color: "#C2552A", cursor: "pointer", textDecoration: "underline" }}>
                      Panduan Ukuran
                    </button>
                  </div>
                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                    {selectedProduct.sizes.map((size) => (
                      <button key={size} onClick={() => setCartSize(size)}
                        style={{ padding: "10px 16px", backgroundColor: cartSize === size ? "#C2552A" : "#F5F0E8", color: cartSize === size ? "#FFFFFF" : "#2D1B0E", border: "1px solid #EEEEEE", borderRadius: "6px", fontSize: "13px", fontWeight: "600", cursor: "pointer" }}>
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <motion.button style={styles.processButton} whileHover={{ backgroundColor: "#A04420" }} whileTap={{ scale: 0.98 }} onClick={() => addToCart(selectedProduct, cartSize)}>
                Masukkan Keranjang
              </motion.button>

              {/* Review */}
              <div style={{ marginTop: "24px", paddingTop: "20px", borderTop: "1px solid #F0EDE8" }}>
                <p style={{ fontSize: "12px", fontWeight: "600", color: "#2D1B0E", marginBottom: "12px", letterSpacing: "0.5px" }}>BERI PENILAIAN</p>
                {reviewForm.submitted ? (
                  <p style={{ fontSize: "13px", color: "#4A7C59" }}>Terima kasih atas penilaianmu!</p>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <input type="text" placeholder="Nama kamu" value={reviewForm.name}
                      onChange={(e) => setReviewForm((prev) => ({ ...prev, name: e.target.value }))}
                      style={{ padding: "10px 12px", border: "1.5px solid #EEEEEE", borderRadius: "8px", fontSize: "13px", outline: "none" }} />
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <SparkleRating value={reviewForm.rating} size={20} interactive onChange={(val) => setReviewForm((prev) => ({ ...prev, rating: val }))} />
                      <span style={{ fontSize: "12px", color: "#A08060" }}>
                        {reviewForm.rating > 0 ? ["", "Buruk", "Kurang", "Cukup", "Bagus", "Sempurna"][reviewForm.rating] : "Pilih rating"}
                      </span>
                    </div>
                    <motion.button whileHover={{ backgroundColor: "#7A5038" }} whileTap={{ scale: 0.98 }}
                      onClick={() => submitReview(selectedProduct)} disabled={reviewForm.loading}
                      style={{ padding: "10px", backgroundColor: "#4A2A1A", color: "#F5EFE6", border: "none", borderRadius: "8px", fontSize: "12px", fontWeight: "600", cursor: "pointer" }}>
                      {reviewForm.loading ? "Mengirim..." : "Kirim Penilaian"}
                    </motion.button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* SIZE GUIDE MODAL */}
      <SizeGuideModal isOpen={sizeGuideOpen} onClose={() => setSizeGuideOpen(false)} />
    </div>
  );
}

// =====================================================================
// STYLES
// =====================================================================
const styles = {
  appContainer: { minHeight: "100vh", backgroundColor: "#FAFAF7" },
  navbar: { padding: "16px 40px", backgroundColor: "#FFFFFF", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #F0EDE8", position: "sticky", top: 0, zIndex: 100 },
  logoArea: { cursor: "pointer", display: "flex", flexDirection: "column", gap: 0 },
  logo: { fontSize: "20px", fontWeight: "700", color: "#2D1B0E", fontFamily: "'Cormorant Garamond', serif", margin: 0 },
  logoSub: { fontSize: "10px", color: "#C2552A", fontWeight: "600", letterSpacing: "2px" },
  navLinks: { display: "flex", gap: "32px", justifyContent: "center", flex: 1 },
  navLink: { background: "none", border: "none", fontSize: "13px", fontWeight: "500", color: "#555555", cursor: "pointer", padding: "8px 0" },
  navLinkActive: { color: "#C2552A", borderBottom: "2px solid #C2552A" },
  cartButton: { background: "none", border: "none", fontSize: "22px", cursor: "pointer", position: "relative" },
  cartBadge: { position: "absolute", top: "-8px", right: "-12px", backgroundColor: "#C2552A", color: "#FFFFFF", fontSize: "10px", fontWeight: "600", width: "18px", height: "18px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" },
  heroSection: { position: "relative", minHeight: "560px", display: "flex", alignItems: "flex-end", justifyContent: "center", textAlign: "center", backgroundImage: "url('/rekain-hero.jpeg')", backgroundSize: "cover", backgroundPosition: "center" },
  heroOverlay: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "linear-gradient(to top, rgba(20,10,2,0.80) 0%, rgba(20,10,2,0.15) 60%, transparent 100%)" },
  heroContent: { position: "relative", padding: "60px 20px", maxWidth: "700px", margin: "0 auto" },
  heroBadge: { display: "inline-block", fontSize: "11px", letterSpacing: "3px", color: "#C2A882", textTransform: "uppercase", marginBottom: "20px" },
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
  viewAllButton: { padding: "12px 40px", backgroundColor: "#FFFFFF", color: "#C2552A", border: "2px solid #C2552A", borderRadius: "40px", fontSize: "13px", fontWeight: "600", cursor: "pointer" },
  footer: { backgroundColor: "#2D1B0E", padding: "48px 20px", textAlign: "center" },
  footerContent: { maxWidth: "600px", margin: "0 auto" },
  footerLogo: { fontFamily: "'Cormorant Garamond', serif", fontSize: "24px", fontWeight: "600", color: "#FFFFFF", letterSpacing: "2px", marginBottom: "12px" },
  footerTagline: { fontSize: "12px", color: "#C2A882", marginBottom: "16px" },
  footerCopyright: { fontSize: "11px", color: "#666666" },
  shopPage: { padding: "40px 5%" },
  shopContainer: { maxWidth: "1200px", margin: "0 auto" },
  shopHeader: { textAlign: "center", marginBottom: "40px" },
  shopTitle: { fontFamily: "'Cormorant Garamond', serif", fontSize: "36px", fontWeight: "600", color: "#2D1B0E", marginBottom: "8px" },
  shopSubtitle: { fontSize: "14px", color: "#888888" },
  cartPage: { padding: "40px 5%" },
  cartContainer: { maxWidth: "700px", margin: "0 auto" },
  cartTitle: { fontSize: "28px", fontWeight: "600", color: "#2D1B0E", marginBottom: "24px", fontFamily: "'Cormorant Garamond', serif" },
  cartItems: { display: "grid", gap: "16px", marginBottom: "24px" },
  cartItem: { display: "flex", gap: "16px", padding: "16px", backgroundColor: "#F5F0E8", borderRadius: "8px", alignItems: "flex-start" },
  cartSummary: { backgroundColor: "#F5F0E8", padding: "16px", borderRadius: "8px", marginBottom: "24px" },
  summaryRow: { display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "13px", color: "#666666" },
  summaryTotal: { display: "flex", justifyContent: "space-between", marginTop: "12px", paddingTop: "12px", borderTop: "1px solid #F0EDE8", fontSize: "16px", fontWeight: "700" },
  processButton: { width: "100%", padding: "14px", backgroundColor: "#C2552A", color: "#FFFFFF", border: "none", borderRadius: "8px", fontSize: "13px", fontWeight: "600", cursor: "pointer", marginTop: "8px" },
  qtyBtn: { width: "28px", height: "28px", backgroundColor: "#FFFFFF", border: "1px solid #DDDDDD", borderRadius: "6px", cursor: "pointer", fontSize: "14px" },
  formLabel: { display: "block", fontSize: "12px", fontWeight: "600", color: "#333333", marginBottom: "6px" },
  formInput: { width: "100%", padding: "12px", border: "1.5px solid #EEEEEE", borderRadius: "8px", fontSize: "13px", fontFamily: "'DM Sans', sans-serif", outline: "none", resize: "vertical" },
};
