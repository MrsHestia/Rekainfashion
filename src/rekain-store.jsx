import { useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const PRODUCTS = [
  {
    id: 1,
    name: "Batik Perca Anak",
    category: "Kemeja",
    price: 79000,
    stock: 12,
    desc: "Dijahit dari potongan batik pilihan yang seharusnya terbuang — kini jadi kemeja yang bikin si kecil makin menggemaskan.",
    sizes: ["2-3T", "4-5T", "6-7T", "8-9T"],
    color: "#8B4513",
    badge: "Terlaris",
  },
  {
    id: 2,
    name: "Gaun Perca Floral",
    category: "Gaun",
    price: 85000,
    stock: 8,
    desc: "Motif bunga yang mekar dari kain perca — lembut di kulit, hangat di hati. Untuk putri kecilmu yang selalu berharga.",
    sizes: ["2-3T", "4-5T", "6-7T"],
    color: "#C2552A",
    badge: "Baru",
  },
  {
    id: 3,
    name: "Kemeja Batik Casual",
    category: "Kemeja",
    price: 75000,
    stock: 15,
    desc: "Santai ke pasar, anggun ke pengajian — kemeja ini menemani hari-hari si kecil tanpa rewel.",
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
    desc: "Untuk momen yang selalu kamu kenang — foto lebaran, wisuda TK, atau sekadar hari Minggu yang terasa spesial.",
    sizes: ["3-4T", "5-6T", "7-8T"],
    color: "#7B3D8C",
    badge: "Terbatas",
  },
  {
    id: 5,
    name: "Kemeja Perca Polos",
    category: "Kemeja",
    price: 75000,
    stock: 10,
    desc: "Sederhana tapi berkarakter. Kain perca solid yang kami pilih satu per satu agar benar-benar nyaman dipakai seharian.",
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
    desc: "Satu beli, langsung siap tampil. Set kemeja dan celana/rok batik — biar Bunda tak perlu pusing mix-and-match.",
    sizes: ["3-4T", "5-6T", "7-8T"],
    color: "#8B6914",
    badge: "Promo",
  },
];

const BANK_ACCOUNTS = [
  { bank: "BCA", no: "1234567890", name: "REKAIN FASHION" },
  { bank: "BRI", no: "0987654321", name: "REKAIN FASHION" },
  { bank: "Mandiri", no: "1122334455", name: "REKAIN FASHION" },
];

/* ─────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────── */
function formatRp(n) {
  return "Rp" + n.toLocaleString("id-ID");
}
function generateOrderId() {
  return (
    "RKN-" +
    Date.now().toString().slice(-6) +
    Math.random().toString(36).slice(2, 5).toUpperCase()
  );
}

/* ─────────────────────────────────────────────
   ANIMATION VARIANTS
───────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 36, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const overlayVariant = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const cartSidebarVariant = {
  hidden: { x: "100%" },
  visible: {
    x: 0,
    transition: { type: "spring", stiffness: 320, damping: 34 },
  },
  exit: {
    x: "100%",
    transition: { type: "spring", stiffness: 380, damping: 40 },
  },
};

const modalVariant = {
  hidden: { opacity: 0, scale: 0.93, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 360, damping: 32 },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 10,
    transition: { duration: 0.18 },
  },
};

/* ─────────────────────────────────────────────
   SCROLL-REVEAL WRAPPER
───────────────────────────────────────────── */
function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      variants={fadeUp}
      custom={delay}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   PRODUCT CARD
───────────────────────────────────────────── */
function ProductCard({ product, onSelect }) {
  return (
    <motion.div
      variants={cardVariant}
      whileHover={{ y: -6, boxShadow: "0 20px 48px rgba(45,27,14,0.14)" }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      style={styles.productCard}
      onClick={onSelect}
    >
      <div style={{ ...styles.productSwatch, background: product.color }}>
        {product.badge && <span style={styles.badge}>{product.badge}</span>}
        <motion.div
          style={styles.productSwatchIcon}
          animate={{ rotate: [0, -4, 4, 0] }}
          transition={{ repeat: Infinity, duration: 5, delay: product.id * 0.4 }}
        >
          👕
        </motion.div>
      </div>
      <div style={{ padding: "18px 18px 22px" }}>
        <div style={styles.productCategory}>{product.category}</div>
        <div style={styles.productName}>{product.name}</div>
        <div style={styles.productDesc}>{product.desc}</div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 12,
          }}
        >
          <span style={styles.productPrice}>{formatRp(product.price)}</span>
          <span style={styles.stockLabel}>Stok {product.stock}</span>
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   MAIN APP
───────────────────────────────────────────── */
export default function RekainFashion() {
  const [page, setPage] = useState("home");
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [filter, setFilter] = useState("Semua");
  const [cartOpen, setCartOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    note: "",
    bank: "BCA",
  });
  const [order, setOrder] = useState(null);
  const receiptRef = useRef();

  const categories = ["Semua", "Kemeja", "Gaun", "Set"];
  const filtered =
    filter === "Semua"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === filter);

  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const shipping = cartTotal > 0 ? 15000 : 0;
  const grandTotal = cartTotal + shipping;

  function addToCart(product, size) {
    if (!size) return alert("Pilih ukuran dulu ya, Bun! 💛");
    setCart((prev) => {
      const key = `${product.id}-${size}`;
      const existing = prev.find((i) => i.key === key);
      if (existing)
        return prev.map((i) =>
          i.key === key ? { ...i, qty: i.qty + 1 } : i
        );
      return [...prev, { key, ...product, size, qty: 1 }];
    });
    setSelectedProduct(null);
    setSelectedSize("");
    setCartOpen(true);
  }

  function removeFromCart(key) {
    setCart((prev) => prev.filter((i) => i.key !== key));
  }

  function updateQty(key, delta) {
    setCart((prev) =>
      prev.map((i) =>
        i.key === key ? { ...i, qty: Math.max(1, i.qty + delta) } : i
      )
    );
  }

  function submitOrder() {
    if (!form.name || !form.phone || !form.address)
      return alert("Lengkapi data pengiriman dulu ya, Bun!");
    const orderId = generateOrderId();
    const bankInfo = BANK_ACCOUNTS.find((b) => b.bank === form.bank);
    const newOrder = {
      id: orderId,
      date: new Date().toLocaleString("id-ID"),
      customer: form,
      items: [...cart],
      subtotal: cartTotal,
      shipping,
      total: grandTotal,
      bank: bankInfo,
    };
    setOrder(newOrder);
    setCart([]);
    setPage("receipt");
    setCartOpen(false);
  }

  function shareWA() {
    if (!order) return;
    const items = order.items
      .map(
        (i) =>
          `  - ${i.name} (${i.size}) x${i.qty} = ${formatRp(i.price * i.qty)}`
      )
      .join("\n");
    const msg = `*PESANAN REKAIN FASHION* 🌿\n\nNo. Order: *${order.id}*\nTanggal: ${order.date}\n\n*DETAIL PESANAN:*\n${items}\n\nSubtotal: ${formatRp(order.subtotal)}\nOngkir: ${formatRp(order.shipping)}\n*TOTAL: ${formatRp(order.total)}*\n\n*PEMBAYARAN:*\nTransfer ke ${order.bank.bank}\nNo. Rek: ${order.bank.no}\na.n. ${order.bank.name}\n\nNama: ${order.customer.name}\nWA: ${order.customer.phone}\nAlamat: ${order.customer.address}\n\nTerima kasih sudah berbelanja di Rekain Fashion! 🙏`;
    window.open(`https://wa.me/6289529178826?text=${encodeURIComponent(msg)}`);
  }

  return (
    <div style={styles.app}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { font-family: 'DM Sans', sans-serif; background: #FAFAF7; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #F5F0E8; }
        ::-webkit-scrollbar-thumb { background: #8B4513; border-radius: 2px; }
        input, textarea, select { font-family: 'DM Sans', sans-serif; }
        @media print {
          .no-print { display: none !important; }
          body { background: white; }
        }
      `}</style>

      {/* ── NAVBAR ── */}
      <motion.nav
        style={styles.nav}
        className="no-print"
        initial={{ y: -64, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div style={styles.navLeft} onClick={() => setPage("home")}>
          <span style={styles.logo}>REKAIN</span>
          <span style={styles.logoSub}>FASHION</span>
        </div>
        <div style={styles.navLinks}>
          {["home", "shop"].map((p) => (
            <motion.span
              key={p}
              style={{
                ...styles.navLink,
                ...(page === p
                  ? { color: "#2D1B0E", borderBottom: "2px solid #8B4513" }
                  : {}),
              }}
              onClick={() => setPage(p)}
              whileHover={{ color: "#8B4513" }}
            >
              {p === "home" ? "Beranda" : "Koleksi"}
            </motion.span>
          ))}
        </div>
        <motion.div
          style={styles.cartBtn}
          onClick={() => setCartOpen(true)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
        >
          🛒
          <AnimatePresence mode="wait">
            {cartCount > 0 && (
              <motion.span
                key={cartCount}
                style={styles.cartBadge}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 28 }}
              >
                {cartCount}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.nav>

      {/* ── CART SIDEBAR ── */}
      <AnimatePresence>
        {cartOpen && (
          <motion.div
            style={styles.overlay}
            variants={overlayVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={() => setCartOpen(false)}
          >
            <motion.div
              style={styles.cartSidebar}
              variants={cartSidebarVariant}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <div style={styles.cartHeader}>
                <span style={styles.cartTitle}>Keranjang Belanja</span>
                <motion.span
                  style={{ cursor: "pointer", fontSize: 20, lineHeight: 1 }}
                  onClick={() => setCartOpen(false)}
                  whileHover={{ rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  ✕
                </motion.span>
              </div>

              {cart.length === 0 ? (
                <motion.div
                  style={styles.emptyCart}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div style={{ fontSize: 44, marginBottom: 12 }}>🛒</div>
                  <div style={{ fontWeight: 500, marginBottom: 4 }}>
                    Keranjang masih sepi
                  </div>
                  <div style={{ fontSize: 12, color: "#AAA" }}>
                    Yuk, pilihkan sesuatu untuk si kecil!
                  </div>
                </motion.div>
              ) : (
                <>
                  <div style={{ flex: 1, overflowY: "auto", padding: "0 24px" }}>
                    <AnimatePresence>
                      {cart.map((item) => (
                        <motion.div
                          key={item.key}
                          style={styles.cartItem}
                          initial={{ opacity: 0, x: 30 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -30, height: 0, padding: 0 }}
                          transition={{ duration: 0.28, ease: "easeOut" }}
                          layout
                        >
                          <div
                            style={{
                              ...styles.cartSwatch,
                              background: item.color,
                            }}
                          />
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 13, fontWeight: 500 }}>
                              {item.name}
                            </div>
                            <div style={{ fontSize: 11, color: "#888" }}>
                              Ukuran: {item.size}
                            </div>
                            <div style={styles.cartItemPrice}>
                              {formatRp(item.price)}
                            </div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              gap: 6,
                            }}
                          >
                            <div style={styles.qtyRow}>
                              <motion.button
                                style={styles.qtyBtn}
                                onClick={() => updateQty(item.key, -1)}
                                whileTap={{ scale: 0.88 }}
                              >
                                −
                              </motion.button>
                              <span
                                style={{
                                  fontSize: 13,
                                  fontWeight: 500,
                                  minWidth: 20,
                                  textAlign: "center",
                                }}
                              >
                                {item.qty}
                              </span>
                              <motion.button
                                style={styles.qtyBtn}
                                onClick={() => updateQty(item.key, 1)}
                                whileTap={{ scale: 0.88 }}
                              >
                                +
                              </motion.button>
                            </div>
                            <motion.span
                              style={styles.removeBtn}
                              onClick={() => removeFromCart(item.key)}
                              whileHover={{ color: "#C0392B" }}
                            >
                              Hapus
                            </motion.span>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>

                  <div style={styles.cartFooter}>
                    {[
                      ["Subtotal", formatRp(cartTotal)],
                      ["Estimasi ongkir", formatRp(shipping)],
                    ].map(([label, val]) => (
                      <div key={label} style={styles.cartTotRow}>
                        <span style={{ color: "#666" }}>{label}</span>
                        <span>{val}</span>
                      </div>
                    ))}
                    <div style={styles.cartGrandTotal}>
                      <span>Total</span>
                      <span style={{ color: "#8B4513" }}>
                        {formatRp(grandTotal)}
                      </span>
                    </div>
                    <motion.button
                      style={styles.btnPrimary}
                      whileHover={{ background: "#8B4513" }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => {
                        setPage("checkout");
                        setCartOpen(false);
                      }}
                    >
                      LANJUT KE CHECKOUT
                    </motion.button>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── PRODUCT MODAL ── */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            style={{ ...styles.overlay, justifyContent: "center" }}
            variants={overlayVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              style={styles.modal}
              variants={modalVariant}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                style={{
                  ...styles.productSwatch,
                  background: selectedProduct.color,
                  height: 200,
                  borderRadius: 0,
                }}
              />
              <div style={{ padding: 24 }}>
                {selectedProduct.badge && (
                  <span style={styles.badge}>{selectedProduct.badge}</span>
                )}
                <div style={{ ...styles.productName, fontSize: 22, marginTop: 8 }}>
                  {selectedProduct.name}
                </div>
                <div style={{ fontSize: 13, color: "#666", margin: "8px 0 12px", lineHeight: 1.7 }}>
                  {selectedProduct.desc}
                </div>
                <div
                  style={{
                    fontSize: 22,
                    fontWeight: 700,
                    color: "#8B4513",
                    marginBottom: 18,
                  }}
                >
                  {formatRp(selectedProduct.price)}
                </div>
                <div style={styles.sizeLabel}>Pilih Ukuran</div>
                <div
                  style={{
                    display: "flex",
                    gap: 8,
                    flexWrap: "wrap",
                    marginBottom: 20,
                  }}
                >
                  {selectedProduct.sizes.map((s) => (
                    <motion.button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      whileHover={{ scale: 1.06 }}
                      whileTap={{ scale: 0.95 }}
                      style={{
                        padding: "8px 14px",
                        border:
                          selectedSize === s
                            ? "2px solid #8B4513"
                            : "1.5px solid #DDD",
                        background: selectedSize === s ? "#8B4513" : "white",
                        color: selectedSize === s ? "white" : "#333",
                        fontSize: 12,
                        cursor: "pointer",
                        fontFamily: "'DM Sans'",
                        transition: "background 0.15s, color 0.15s",
                      }}
                    >
                      {s}
                    </motion.button>
                  ))}
                </div>
                <motion.button
                  style={{ ...styles.btnPrimary, marginBottom: 10 }}
                  whileHover={{ background: "#8B4513" }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => addToCart(selectedProduct, selectedSize)}
                >
                  TAMBAH KE KERANJANG
                </motion.button>
                <motion.button
                  style={styles.btnOutline}
                  whileHover={{ background: "#2D1B0E", color: "#F5F0E8" }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setSelectedProduct(null)}
                >
                  KEMBALI
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ════════════════════════════════
          PAGE: HOME
      ════════════════════════════════ */}
      <AnimatePresence mode="wait">
        {page === "home" && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* ── HERO ── */}
            <section style={styles.hero}>
              <div style={styles.heroPattern} />
              <div style={styles.heroContent}>
                <motion.div
                  style={styles.heroEyebrow}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                >
                  ✦ Sustainable Local Fashion ✦
                </motion.div>
                <motion.h1
                  style={styles.heroTitle}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                >
                  Kain yang Hampir<br />Terbuang, Kini Jadi<br />
                  <em>Rompi Kesayangan.</em>
                </motion.h1>
                <motion.p
                  style={styles.heroSub}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.42 }}
                >
                  Kami percaya setiap kain punya cerita yang belum selesai.
                  Rekain hadir untuk melanjutkan cerita itu — menjadi pakaian anak
                  yang cantik, nyaman, dan ramah lingkungan. Buatan Medan, dengan cinta.
                </motion.p>
                <motion.div
                  style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.58 }}
                >
                  <motion.button
                    style={styles.btnPrimary}
                    whileHover={{ background: "#8B4513", scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setPage("shop")}
                  >
                    LIHAT KOLEKSI
                  </motion.button>
                  <motion.button
                    style={styles.btnOutlineLight}
                    whileHover={{ background: "rgba(255,255,255,0.12)" }}
                    whileTap={{ scale: 0.97 }}
                  >
                    TENTANG KAMI
                  </motion.button>
                </motion.div>
              </div>
            </section>

            {/* ── VALUES ── */}
            <section style={styles.valuesSection}>
              {[
                {
                  icon: "🌿",
                  title: "Zero Waste",
                  desc: "Setiap potongan kain perca yang biasanya terbuang, kami selamatkan dan ubah menjadi sesuatu yang berharga.",
                },
                {
                  icon: "👶",
                  title: "Lembut di Kulit",
                  desc: "Bahan dipilih satu per satu. Kalau tidak nyaman untuk kulit anak kami sendiri, tidak akan kami jual.",
                },
                {
                  icon: "🧵",
                  title: "Tangan Lokal",
                  desc: "Dijahit oleh pengrajin Medan yang sudah kami percaya. Setiap jahitan adalah keahlian yang kami banggakan.",
                },
                {
                  icon: "💛",
                  title: "Harga Jujur",
                  desc: "Kualitas tidak harus mahal. Kami menjaga harga agar Bunda bisa berbelanja tanpa rasa bersalah.",
                },
              ].map((v, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <div style={styles.valueCard}>
                    <div style={{ fontSize: 34, marginBottom: 14 }}>{v.icon}</div>
                    <div style={styles.valueTitle}>{v.title}</div>
                    <div style={styles.valueDesc}>{v.desc}</div>
                  </div>
                </Reveal>
              ))}
            </section>

            {/* ── FEATURED PRODUCTS ── */}
            <section style={{ padding: "72px 5%" }}>
              <Reveal>
                <div style={{ textAlign: "center", marginBottom: 48 }}>
                  <div style={styles.sectionEyebrow}>Pilihan Hati</div>
                  <h2 style={styles.sectionTitle}>Koleksi yang Paling Dicintai</h2>
                  <p style={styles.sectionSub}>
                    Produk yang paling sering bikin Bunda balik lagi — dan si kecil
                    ogah dilepas.
                  </p>
                </div>
              </Reveal>
              <motion.div
                style={styles.productGrid}
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
              >
                {PRODUCTS.slice(0, 3).map((p) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    onSelect={() => setSelectedProduct(p)}
                  />
                ))}
              </motion.div>
              <Reveal delay={0.2}>
                <div style={{ textAlign: "center", marginTop: 44 }}>
                  <motion.button
                    style={styles.btnOutline}
                    whileHover={{ background: "#2D1B0E", color: "#F5F0E8" }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setPage("shop")}
                  >
                    LIHAT SEMUA KOLEKSI
                  </motion.button>
                </div>
              </Reveal>
            </section>

            {/* ── STORY / SCROLL-REVEAL ── */}
            <section style={styles.storySection}>
              <Reveal>
                <div style={styles.storyLeft}>
                  <div style={styles.storyEyebrow}>Cerita di Balik Kain</div>
                  <h2 style={styles.storyTitle}>
                    Rekain — Nama yang Kami Pilih dengan Sadar
                  </h2>
                  <p style={styles.storyParagraph}>
                    Satu hari, kami berdiri di depan tumpukan kain perca di sudut
                    sebuah konveksi Medan. Ratusan potongan kain batik — cantik,
                    berkualitas — siap dibuang. Rasanya sayang sekali.
                  </p>
                  <p style={styles.storyParagraph}>
                    Dari situlah Rekain lahir. Bukan sekadar brand fashion anak, tapi
                    sebuah janji: setiap kain punya hak untuk jadi sesuatu yang
                    bermakna. Dan anak-anak kita layak memakai yang terbaik — meski
                    terbuat dari yang dianggap sisa.
                  </p>
                  <p style={{ ...styles.storyParagraph, color: "#C2A882", fontStyle: "italic" }}>
                    "Dari kain sisa, lahir karya bermakna."
                  </p>
                </div>
              </Reveal>
              <div style={styles.storyRight}>
                {[
                  { icon: "♻️", label: "Kain Perca → Karya" },
                  { icon: "📍", label: "Berbasis di Medan" },
                  { icon: "🤝", label: "Pengrajin Lokal Terpercaya" },
                  { icon: "💚", label: "Ramah Lingkungan" },
                ].map((t, i) => (
                  <Reveal key={i} delay={i * 0.1}>
                    <motion.div
                      style={styles.storyTag}
                      whileHover={{
                        x: 6,
                        borderColor: "rgba(194,170,130,0.5)",
                        background: "rgba(255,255,255,0.04)",
                      }}
                      transition={{ duration: 0.22 }}
                    >
                      <span style={{ fontSize: 20 }}>{t.icon}</span>
                      <span>{t.label}</span>
                    </motion.div>
                  </Reveal>
                ))}
              </div>
            </section>

            {/* ── FOOTER ── */}
            <footer style={styles.footer}>
              <div style={styles.footerLogo}>REKAIN FASHION</div>
              <div style={styles.footerTagline}>
                Dari Kain Sisa, Lahir Karya Bermakna
              </div>
              <div style={styles.footerCopy}>
                © 2025 Rekain Fashion · Medan, Sumatera Utara ·
                rekainfashion.blog
              </div>
            </footer>
          </motion.div>
        )}

        {/* ════════════════════════════════
            PAGE: SHOP
        ════════════════════════════════ */}
        {page === "shop" && (
          <motion.div
            key="shop"
            style={{ padding: "48px 5%" }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <div style={styles.sectionEyebrow}>Semua Koleksi</div>
              <h1 style={{ ...styles.sectionTitle, fontSize: 36 }}>
                Pilih yang Paling Cocok untuk Si Kecil
              </h1>
            </div>

            {/* FILTER */}
            <div
              style={{
                display: "flex",
                gap: 8,
                justifyContent: "center",
                marginBottom: 36,
                flexWrap: "wrap",
              }}
            >
              {categories.map((c) => (
                <motion.button
                  key={c}
                  onClick={() => setFilter(c)}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  style={{
                    padding: "9px 22px",
                    border:
                      filter === c
                        ? "2px solid #2D1B0E"
                        : "1.5px solid #DDD",
                    background: filter === c ? "#2D1B0E" : "white",
                    color: filter === c ? "white" : "#333",
                    fontSize: 12,
                    cursor: "pointer",
                    letterSpacing: 0.5,
                    fontFamily: "'DM Sans'",
                    transition: "background 0.2s, color 0.2s",
                  }}
                >
                  {c}
                </motion.button>
              ))}
            </div>

            <motion.div
              style={styles.productGrid}
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              key={filter}
            >
              {filtered.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onSelect={() => setSelectedProduct(p)}
                />
              ))}
            </motion.div>
          </motion.div>
        )}

        {/* ════════════════════════════════
            PAGE: CHECKOUT
        ════════════════════════════════ */}
        {page === "checkout" && (
          <motion.div
            key="checkout"
            style={{ maxWidth: 640, margin: "0 auto", padding: "48px 5%" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.38 }}
          >
            <div style={{ marginBottom: 32 }}>
              <motion.span
                style={styles.backLink}
                onClick={() => setPage("shop")}
                whileHover={{ x: -3 }}
              >
                ← Lanjut belanja dulu
              </motion.span>
              <h1 style={{ ...styles.sectionTitle, fontSize: 28, marginTop: 10 }}>
                Hampir Sampai! 🎁
              </h1>
              <p style={{ fontSize: 13, color: "#888", marginTop: 4 }}>
                Lengkapi data di bawah, lalu Bunda bisa langsung konfirmasi via
                WhatsApp.
              </p>
            </div>

            {/* ORDER SUMMARY */}
            <div style={styles.checkoutBox}>
              <div style={styles.checkoutBoxTitle}>RINGKASAN PESANAN</div>
              {cart.map((item) => (
                <div
                  key={item.key}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 8,
                    fontSize: 13,
                  }}
                >
                  <span>
                    {item.name} ({item.size}) ×{item.qty}
                  </span>
                  <span style={{ fontWeight: 500 }}>
                    {formatRp(item.price * item.qty)}
                  </span>
                </div>
              ))}
              <div
                style={{
                  borderTop: "1px solid #E8E0D0",
                  marginTop: 12,
                  paddingTop: 12,
                }}
              >
                <div style={styles.cartTotRow}>
                  <span style={{ color: "#666" }}>Ongkir</span>
                  <span>{formatRp(shipping)}</span>
                </div>
                <div style={styles.cartGrandTotal}>
                  <span>TOTAL</span>
                  <span style={{ color: "#8B4513" }}>{formatRp(grandTotal)}</span>
                </div>
              </div>
            </div>

            {/* FORM */}
            <div style={styles.checkoutBox}>
              <div style={styles.checkoutBoxTitle}>DATA PENGIRIMAN</div>
              {[
                {
                  label: "Nama Lengkap *",
                  key: "name",
                  type: "text",
                  ph: "Nama penerima",
                },
                {
                  label: "No. WhatsApp *",
                  key: "phone",
                  type: "tel",
                  ph: "628xxxxxxxxxx",
                },
                {
                  label: "Alamat Lengkap *",
                  key: "address",
                  type: "textarea",
                  ph: "Jl. ..., Kelurahan, Kecamatan, Kota",
                },
                {
                  label: "Catatan untuk Penjual",
                  key: "note",
                  type: "textarea",
                  ph: "Minta ukuran khusus, warna preferensi, atau pesan apa saja…",
                },
              ].map((f) => (
                <div key={f.key} style={{ marginBottom: 16 }}>
                  <label style={styles.fieldLabel}>{f.label}</label>
                  {f.type === "textarea" ? (
                    <textarea
                      rows={3}
                      placeholder={f.ph}
                      value={form[f.key]}
                      onChange={(e) =>
                        setForm({ ...form, [f.key]: e.target.value })
                      }
                      style={styles.input}
                    />
                  ) : (
                    <input
                      type={f.type}
                      placeholder={f.ph}
                      value={form[f.key]}
                      onChange={(e) =>
                        setForm({ ...form, [f.key]: e.target.value })
                      }
                      style={styles.input}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* PAYMENT */}
            <div style={styles.checkoutBox}>
              <div style={styles.checkoutBoxTitle}>METODE PEMBAYARAN</div>
              <p style={{ fontSize: 12, color: "#888", marginBottom: 12 }}>
                Transfer bank — konfirmasi via WhatsApp setelah transfer ya, Bun!
              </p>
              {BANK_ACCOUNTS.map((b) => (
                <motion.div
                  key={b.bank}
                  onClick={() => setForm({ ...form, bank: b.bank })}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "12px 16px",
                    border:
                      form.bank === b.bank
                        ? "2px solid #8B4513"
                        : "1.5px solid #E0D8CE",
                    marginBottom: 8,
                    cursor: "pointer",
                    background: form.bank === b.bank ? "#FFF8F2" : "white",
                    transition: "all 0.15s",
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>
                      Bank {b.bank}
                    </div>
                    <div style={{ fontSize: 12, color: "#666" }}>
                      {b.no} · a.n. {b.name}
                    </div>
                  </div>
                  <motion.div
                    animate={{
                      background: form.bank === b.bank ? "#8B4513" : "white",
                      borderColor: form.bank === b.bank ? "#8B4513" : "#CCC",
                    }}
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: "50%",
                      border: "2px solid",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {form.bank === b.bank && (
                      <div
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          background: "white",
                        }}
                      />
                    )}
                  </motion.div>
                </motion.div>
              ))}
            </div>

            <motion.button
              style={{ ...styles.btnPrimary, width: "100%", padding: 16, fontSize: 14 }}
              whileHover={{ background: "#8B4513" }}
              whileTap={{ scale: 0.97 }}
              onClick={submitOrder}
            >
              BUAT PESANAN & LIHAT STRUK
            </motion.button>
          </motion.div>
        )}

        {/* ════════════════════════════════
            PAGE: RECEIPT
        ════════════════════════════════ */}
        {page === "receipt" && order && (
          <motion.div
            key="receipt"
            style={{ maxWidth: 540, margin: "0 auto", padding: "48px 5%" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.38 }}
          >
            <div
              style={{ textAlign: "center", marginBottom: 32 }}
              className="no-print"
            >
              <motion.div
                style={styles.successIcon}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 28, delay: 0.1 }}
              >
                ✓
              </motion.div>
              <h2 style={{ fontFamily: "'Cormorant Garamond'", fontSize: 26, fontWeight: 700, marginBottom: 6 }}>
                Yeay, Pesanan Masuk! 🎉
              </h2>
              <p style={{ fontSize: 13, color: "#666", lineHeight: 1.6 }}>
                Segera transfer dan kirim konfirmasi via WhatsApp ya, Bun.
                Kami akan segera proses pesananmu dengan penuh kasih.
              </p>
            </div>

            {/* STRUK */}
            <div ref={receiptRef} style={styles.receipt}>
              <div style={styles.receiptHeader}>
                <div style={styles.receiptLogo}>REKAIN FASHION</div>
                <div style={styles.receiptTagline}>Sustainable Local Fashion</div>
                <div style={styles.receiptMeta}>
                  rekainfashion.blog · Medan, Sumut
                </div>
              </div>

              <div style={styles.receiptInfoBox}>
                {[
                  ["No. Order", order.id],
                  ["Tanggal", order.date],
                  ["Nama", order.customer.name],
                ].map(([k, v]) => (
                  <div
                    key={k}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 4,
                    }}
                  >
                    <span style={{ fontSize: 12, color: "#666" }}>{k}</span>
                    <span
                      style={{
                        fontSize: k === "No. Order" ? 13 : 12,
                        fontWeight: k === "No. Order" ? 700 : 500,
                        color: k === "No. Order" ? "#8B4513" : "#333",
                      }}
                    >
                      {v}
                    </span>
                  </div>
                ))}
              </div>

              <div style={styles.receiptSection}>
                <div style={styles.receiptSectionTitle}>DETAIL PRODUK</div>
                {order.items.map((item) => (
                  <div key={item.key} style={{ marginBottom: 10 }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span style={{ fontSize: 13, fontWeight: 500, flex: 1 }}>
                        {item.name}
                      </span>
                      <span style={{ fontSize: 13, fontWeight: 600 }}>
                        {formatRp(item.price * item.qty)}
                      </span>
                    </div>
                    <div style={{ fontSize: 11, color: "#888" }}>
                      Ukuran {item.size} × {item.qty} pcs @{" "}
                      {formatRp(item.price)}
                    </div>
                  </div>
                ))}
              </div>

              <div
                style={{ borderTop: "1px solid #E8E0D0", paddingTop: 12, marginBottom: 16 }}
              >
                <div style={styles.cartTotRow}>
                  <span style={{ color: "#666" }}>Subtotal</span>
                  <span>{formatRp(order.subtotal)}</span>
                </div>
                <div style={styles.cartTotRow}>
                  <span style={{ color: "#666" }}>Ongkir</span>
                  <span>{formatRp(order.shipping)}</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 16,
                    fontWeight: 700,
                    marginTop: 8,
                    paddingTop: 8,
                    borderTop: "1.5px solid #2D1B0E",
                  }}
                >
                  <span>TOTAL BAYAR</span>
                  <span style={{ color: "#8B4513" }}>
                    {formatRp(order.total)}
                  </span>
                </div>
              </div>

              <div style={styles.paymentBox}>
                <div style={styles.paymentLabel}>INFO PEMBAYARAN</div>
                <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 2 }}>
                  Bank {order.bank.bank}
                </div>
                <div
                  style={{ fontSize: 20, fontWeight: 700, letterSpacing: 1, marginBottom: 2 }}
                >
                  {order.bank.no}
                </div>
                <div style={{ fontSize: 12, color: "#C2A882" }}>
                  a.n. {order.bank.name}
                </div>
                <div style={styles.paymentNote}>
                  Transfer tepat{" "}
                  <strong style={{ color: "#FFD700" }}>
                    {formatRp(order.total)}
                  </strong>{" "}
                  dan konfirmasi via WhatsApp ya, Bun!
                </div>
              </div>

              <div style={{ fontSize: 12, color: "#666", marginBottom: 16, lineHeight: 1.7 }}>
                <div style={{ fontWeight: 500, color: "#333", marginBottom: 2 }}>
                  📦 Alamat Pengiriman:
                </div>
                <div>{order.customer.address}</div>
                <div>WA: {order.customer.phone}</div>
                {order.customer.note && (
                  <div style={{ marginTop: 4, fontStyle: "italic" }}>
                    Catatan: {order.customer.note}
                  </div>
                )}
              </div>

              <div style={styles.receiptFooter}>
                <div>Terima kasih sudah mempercayai Rekain Fashion 🌿</div>
                <div>
                  Setiap pembelianmu membantu mengurangi limbah tekstil di
                  Medan.
                </div>
                <div style={{ marginTop: 4, color: "#8B4513" }}>
                  rekainfashion.blog
                </div>
              </div>
            </div>

            <div
              style={{ display: "flex", gap: 12, marginTop: 20, flexWrap: "wrap" }}
              className="no-print"
            >
              <motion.button
                style={{ ...styles.btnPrimary, flex: 1, padding: 14 }}
                whileHover={{ background: "#8B4513" }}
                whileTap={{ scale: 0.97 }}
                onClick={shareWA}
              >
                📲 KONFIRMASI VIA WHATSAPP
              </motion.button>
              <motion.button
                style={{ ...styles.btnOutline, flex: 1, padding: 14 }}
                whileHover={{ background: "#2D1B0E", color: "#F5F0E8" }}
                whileTap={{ scale: 0.97 }}
                onClick={() => window.print()}
              >
                🖨️ CETAK STRUK
              </motion.button>
            </div>
            <div style={{ textAlign: "center", marginTop: 16 }} className="no-print">
              <motion.span
                style={styles.backLink}
                onClick={() => setPage("shop")}
                whileHover={{ x: -3 }}
              >
                ← Lanjut belanja
              </motion.span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────────────────────────────────
   STYLES
───────────────────────────────────────────── */
const styles = {
  app: {
    background: "#FAFAF7",
    minHeight: "100vh",
    fontFamily: "'DM Sans', sans-serif",
  },

  /* NAV */
  nav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 5%",
    height: 64,
    background: "#F5F0E8",
    borderBottom: "1px solid #E8E0D0",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  navLeft: {
    display: "flex",
    alignItems: "baseline",
    gap: 6,
    cursor: "pointer",
  },
  logo: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 24,
    fontWeight: 700,
    color: "#2D1B0E",
    letterSpacing: 3,
  },
  logoSub: {
    fontSize: 10,
    letterSpacing: 3,
    color: "#8B4513",
    textTransform: "uppercase",
  },
  navLinks: { display: "flex", gap: 28 },
  navLink: {
    fontSize: 12,
    fontWeight: 400,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    cursor: "pointer",
    paddingBottom: 4,
    color: "#555",
    transition: "color 0.2s",
  },
  cartBtn: {
    fontSize: 22,
    cursor: "pointer",
    position: "relative",
    userSelect: "none",
  },
  cartBadge: {
    position: "absolute",
    top: -8,
    right: -10,
    background: "#8B4513",
    color: "white",
    borderRadius: "50%",
    width: 18,
    height: 18,
    fontSize: 10,
    fontWeight: 700,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'DM Sans'",
  },

  /* HERO */
  hero: {
    position: "relative",
    minHeight: 520,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background:
      "linear-gradient(140deg,#1A0A04 0%,#4A1E0A 45%,#7A3010 100%)",
    overflow: "hidden",
  },
  heroPattern: {
    position: "absolute",
    inset: 0,
    backgroundImage:
      "repeating-linear-gradient(45deg,transparent,transparent 24px,rgba(255,255,255,0.025) 24px,rgba(255,255,255,0.025) 48px)",
    pointerEvents: "none",
  },
  heroContent: {
    position: "relative",
    textAlign: "center",
    padding: "72px 5%",
    maxWidth: 660,
  },
  heroEyebrow: {
    fontSize: 11,
    letterSpacing: 4,
    textTransform: "uppercase",
    color: "#C2A882",
    marginBottom: 18,
  },
  heroTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "clamp(34px, 5.5vw, 56px)",
    fontWeight: 600,
    color: "#F5F0E8",
    lineHeight: 1.18,
    marginBottom: 20,
  },
  heroSub: {
    fontSize: 15,
    color: "#C2A882",
    lineHeight: 1.85,
    marginBottom: 36,
    maxWidth: 500,
    margin: "0 auto 36px",
  },

  /* VALUES */
  valuesSection: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    background: "#F5F0E8",
    borderTop: "1px solid #E8E0D0",
    borderBottom: "1px solid #E8E0D0",
  },
  valueCard: { padding: "36px 24px", textAlign: "center", borderRight: "1px solid #E8E0D0" },
  valueTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 18,
    fontWeight: 700,
    marginBottom: 8,
    color: "#2D1B0E",
  },
  valueDesc: { fontSize: 13, color: "#777", lineHeight: 1.7 },

  /* SECTION TYPOGRAPHY */
  sectionEyebrow: {
    fontSize: 11,
    letterSpacing: 4,
    color: "#8B4513",
    textTransform: "uppercase",
    marginBottom: 10,
  },
  sectionTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 34,
    fontWeight: 700,
    color: "#2D1B0E",
    marginBottom: 10,
  },
  sectionSub: {
    fontSize: 14,
    color: "#888",
    lineHeight: 1.7,
    maxWidth: 480,
    margin: "0 auto",
  },

  /* PRODUCTS */
  productGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: 20,
  },
  productCard: {
    background: "white",
    border: "1px solid #EEE",
    overflow: "hidden",
    cursor: "pointer",
  },
  productSwatch: {
    height: 190,
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  productSwatchIcon: { fontSize: 52, opacity: 0.25 },
  badge: {
    position: "absolute",
    top: 12,
    left: 12,
    background: "#8B4513",
    color: "white",
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: 1,
    padding: "3px 9px",
    textTransform: "uppercase",
  },
  productCategory: {
    fontSize: 10,
    color: "#AAA",
    letterSpacing: 1.5,
    textTransform: "uppercase",
    marginBottom: 4,
  },
  productName: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 18,
    fontWeight: 700,
    color: "#2D1B0E",
    marginBottom: 6,
  },
  productDesc: { fontSize: 12, color: "#888", lineHeight: 1.65, marginBottom: 4 },
  productPrice: { fontSize: 17, fontWeight: 700, color: "#8B4513" },
  stockLabel: { fontSize: 11, color: "#4CAF50", fontWeight: 500 },

  /* STORY */
  storySection: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 0,
    background: "#1A0F07",
    padding: "72px 5%",
  },
  storyLeft: { paddingRight: 48 },
  storyRight: {
    display: "flex",
    flexDirection: "column",
    gap: 14,
    justifyContent: "center",
  },
  storyEyebrow: {
    fontSize: 11,
    letterSpacing: 4,
    color: "#C2552A",
    textTransform: "uppercase",
    marginBottom: 14,
  },
  storyTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 28,
    fontWeight: 700,
    color: "#F5F0E8",
    marginBottom: 18,
    lineHeight: 1.3,
  },
  storyParagraph: { fontSize: 14, lineHeight: 1.85, color: "#D4C5B0", marginBottom: 14 },
  storyTag: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    color: "#C2A882",
    fontSize: 15,
    fontFamily: "'Cormorant Garamond', serif",
    padding: "14px 18px",
    border: "1px solid rgba(194,170,130,0.15)",
    cursor: "default",
    transition: "all 0.22s",
  },

  /* FOOTER */
  footer: {
    background: "#0D0906",
    padding: "48px 5%",
    textAlign: "center",
    color: "#F5F0E8",
  },
  footerLogo: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 26,
    fontWeight: 700,
    letterSpacing: 3,
    marginBottom: 6,
  },
  footerTagline: { fontSize: 12, color: "#C2A882", marginBottom: 16, letterSpacing: 1 },
  footerCopy: { fontSize: 11, color: "#555" },

  /* CART */
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.45)",
    zIndex: 200,
    display: "flex",
    justifyContent: "flex-end",
  },
  cartSidebar: {
    background: "white",
    width: "min(400px, 95vw)",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    overflowY: "auto",
  },
  cartHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 24px",
    borderBottom: "1px solid #EEE",
  },
  cartTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 20,
    fontWeight: 700,
    color: "#2D1B0E",
  },
  emptyCart: {
    textAlign: "center",
    padding: "72px 20px",
    color: "#999",
    fontSize: 14,
    flex: 1,
  },
  cartItem: {
    display: "flex",
    gap: 12,
    padding: "16px 0",
    borderBottom: "1px solid #F0EAE0",
    alignItems: "flex-start",
  },
  cartSwatch: { width: 48, height: 48, flexShrink: 0, borderRadius: 2 },
  cartItemPrice: { fontSize: 13, fontWeight: 600, color: "#8B4513", marginTop: 4 },
  cartFooter: { padding: 24, borderTop: "1px solid #EEE", background: "#FAFAF7" },
  cartTotRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 6,
    fontSize: 13,
  },
  cartGrandTotal: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: 16,
    fontWeight: 700,
    marginTop: 10,
    marginBottom: 18,
    paddingTop: 10,
    borderTop: "1px solid #DDD",
  },
  qtyRow: { display: "flex", alignItems: "center", gap: 8 },
  qtyBtn: {
    width: 26,
    height: 26,
    border: "1px solid #DDD",
    background: "white",
    cursor: "pointer",
    fontSize: 14,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'DM Sans'",
    borderRadius: 2,
  },
  removeBtn: { fontSize: 11, color: "#CCC", cursor: "pointer" },

  /* MODAL */
  modal: {
    background: "white",
    width: "min(400px, 95vw)",
    maxHeight: "92vh",
    overflowY: "auto",
    margin: "auto",
    borderRadius: 2,
  },
  sizeLabel: {
    fontSize: 11,
    fontWeight: 500,
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 10,
    color: "#555",
  },

  /* CHECKOUT */
  checkoutBox: {
    background: "white",
    border: "1px solid #E8E0D0",
    padding: 20,
    marginBottom: 16,
    borderRadius: 3,
  },
  checkoutBoxTitle: {
    fontWeight: 600,
    marginBottom: 16,
    fontSize: 12,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    color: "#555",
  },
  fieldLabel: {
    display: "block",
    fontSize: 12,
    fontWeight: 500,
    letterSpacing: 0.5,
    marginBottom: 6,
    color: "#444",
  },
  input: {
    width: "100%",
    padding: "10px 12px",
    border: "1.5px solid #E0D8CE",
    fontSize: 13,
    outline: "none",
    fontFamily: "'DM Sans'",
    resize: "vertical",
    background: "#FAFAF7",
    borderRadius: 2,
  },

  /* RECEIPT */
  receipt: {
    background: "white",
    border: "2px solid #E8E0D0",
    padding: 24,
    fontFamily: "'DM Sans', sans-serif",
  },
  receiptHeader: {
    textAlign: "center",
    paddingBottom: 16,
    borderBottom: "2px dashed #C2A882",
    marginBottom: 16,
  },
  receiptLogo: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 22,
    fontWeight: 700,
    color: "#2D1B0E",
    letterSpacing: 2,
  },
  receiptTagline: {
    fontSize: 11,
    color: "#8B6914",
    letterSpacing: 2,
    textTransform: "uppercase",
    marginTop: 2,
  },
  receiptMeta: { fontSize: 11, color: "#AAA", marginTop: 4 },
  receiptInfoBox: {
    background: "#FFF8F2",
    padding: "12px 16px",
    marginBottom: 16,
    borderRadius: 3,
  },
  receiptSection: { marginBottom: 16 },
  receiptSectionTitle: {
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: 1,
    textTransform: "uppercase",
    color: "#888",
    marginBottom: 10,
    paddingBottom: 6,
    borderBottom: "1px solid #EEE",
  },
  receiptFooter: {
    textAlign: "center",
    paddingTop: 12,
    borderTop: "2px dashed #C2A882",
    fontSize: 11,
    color: "#AAA",
    lineHeight: 1.9,
  },
  paymentBox: {
    background: "#2D1B0E",
    color: "#F5F0E8",
    padding: "14px 16px",
    borderRadius: 3,
    marginBottom: 16,
  },
  paymentLabel: {
    fontSize: 10,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    color: "#C2A882",
    marginBottom: 8,
  },
  paymentNote: {
    marginTop: 10,
    fontSize: 12,
    color: "#D4C5B0",
    borderTop: "1px solid rgba(255,255,255,0.1)",
    paddingTop: 10,
  },

  /* SUCCESS */
  successIcon: {
    width: 56,
    height: 56,
    background: "#4CAF50",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 14px",
    fontSize: 24,
    color: "white",
  },

  /* BUTTONS */
  btnPrimary: {
    display: "block",
    background: "#2D1B0E",
    color: "#F5F0E8",
    border: "none",
    padding: "14px 28px",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 12,
    fontWeight: 500,
    letterSpacing: 1.8,
    textTransform: "uppercase",
    cursor: "pointer",
    width: "100%",
    transition: "background 0.2s",
  },
  btnOutline: {
    display: "block",
    background: "transparent",
    color: "#2D1B0E",
    border: "1.5px solid #2D1B0E",
    padding: "13px 28px",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 12,
    fontWeight: 500,
    letterSpacing: 1.8,
    textTransform: "uppercase",
    cursor: "pointer",
    width: "100%",
    transition: "all 0.2s",
  },
  btnOutlineLight: {
    background: "transparent",
    color: "#F5F0E8",
    border: "1.5px solid rgba(245,240,232,0.4)",
    padding: "13px 28px",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 12,
    fontWeight: 500,
    letterSpacing: 1.8,
    textTransform: "uppercase",
    cursor: "pointer",
    transition: "all 0.2s",
  },

  /* MISC */
  backLink: { fontSize: 12, color: "#8B4513", cursor: "pointer", display: "inline-block" },
};
