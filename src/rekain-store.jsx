import { useState, useRef } from "react";

const PRODUCTS = [
  { id: 1, name: "Batik Perca Anak", category: "Kemeja", price: 79000, stock: 12, desc: "Kemeja batik anak dari kain perca pilihan, motif klasik nusantara", sizes: ["2-3T","4-5T","6-7T","8-9T"], color: "#8B4513", badge: "Bestseller" },
  { id: 2, name: "Gaun Perca Floral", category: "Gaun", price: 85000, stock: 8, desc: "Gaun anak cantik dari kain perca bermotif bunga, lembut di kulit", sizes: ["2-3T","4-5T","6-7T"], color: "#C2552A", badge: "New" },
  { id: 3, name: "Kemeja Batik Casual", category: "Kemeja", price: 75000, stock: 15, desc: "Kemeja batik casual anak cocok untuk acara formal maupun santai", sizes: ["2-3T","4-5T","6-7T","8-9T","10T"], color: "#4A7A5A", badge: null },
  { id: 4, name: "Gaun Batik Elegan", category: "Gaun", price: 85000, stock: 6, desc: "Gaun batik elegan untuk acara spesial si kecil", sizes: ["3-4T","5-6T","7-8T"], color: "#7B3D8C", badge: "Limited" },
  { id: 5, name: "Kemeja Perca Polos", category: "Kemeja", price: 75000, stock: 10, desc: "Kemeja anak dari perca solid color, nyaman dipakai sehari-hari", sizes: ["2-3T","4-5T","6-7T","8-9T"], color: "#2C5F8A", badge: null },
  { id: 6, name: "Set Batik Anak", category: "Set", price: 85000, stock: 5, desc: "Set lengkap batik anak (kemeja + celana/rok) dari kain perca batik", sizes: ["3-4T","5-6T","7-8T"], color: "#8B6914", badge: "Promo" },
];

const BANK_ACCOUNTS = [
  { bank: "BCA", no: "1234567890", name: "REKAIN FASHION" },
  { bank: "BRI", no: "0987654321", name: "REKAIN FASHION" },
  { bank: "Mandiri", no: "1122334455", name: "REKAIN FASHION" },
];

function formatRp(n) {
  return "Rp" + n.toLocaleString("id-ID");
}

function generateOrderId() {
  return "RKN-" + Date.now().toString().slice(-6) + Math.random().toString(36).slice(2,5).toUpperCase();
}

export default function RekainFashion() {
  const [page, setPage] = useState("home"); // home | shop | cart | checkout | receipt
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [filter, setFilter] = useState("Semua");
  const [cartOpen, setCartOpen] = useState(false);
  const [form, setForm] = useState({ name:"", phone:"", address:"", note:"", bank:"BCA" });
  const [order, setOrder] = useState(null);
  const receiptRef = useRef();

  const categories = ["Semua", "Kemeja", "Gaun", "Set"];
  const filtered = filter === "Semua" ? PRODUCTS : PRODUCTS.filter(p => p.category === filter);

  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const shipping = cartTotal > 0 ? 15000 : 0;
  const grandTotal = cartTotal + shipping;

  function addToCart(product, size) {
    if (!size) return alert("Pilih ukuran dulu ya!");
    setCart(prev => {
      const key = `${product.id}-${size}`;
      const existing = prev.find(i => i.key === key);
      if (existing) return prev.map(i => i.key === key ? {...i, qty: i.qty+1} : i);
      return [...prev, { key, ...product, size, qty: 1 }];
    });
    setSelectedProduct(null);
    setSelectedSize("");
    setCartOpen(true);
  }

  function removeFromCart(key) {
    setCart(prev => prev.filter(i => i.key !== key));
  }

  function updateQty(key, delta) {
    setCart(prev => prev.map(i => i.key === key ? {...i, qty: Math.max(1, i.qty+delta)} : i));
  }

  function submitOrder() {
    if (!form.name || !form.phone || !form.address) return alert("Lengkapi data dulu ya!");
    const orderId = generateOrderId();
    const bankInfo = BANK_ACCOUNTS.find(b => b.bank === form.bank);
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
    const items = order.items.map(i => `  - ${i.name} (${i.size}) x${i.qty} = ${formatRp(i.price*i.qty)}`).join("\n");
    const msg = `*PESANAN REKAIN FASHION* 🌿\n\nNo. Order: *${order.id}*\nTanggal: ${order.date}\n\n*DETAIL PESANAN:*\n${items}\n\nSubtotal: ${formatRp(order.subtotal)}\nOngkir: ${formatRp(order.shipping)}\n*TOTAL: ${formatRp(order.total)}*\n\n*PEMBAYARAN:*\nTransfer ke ${order.bank.bank}\nNo. Rek: ${order.bank.no}\na.n. ${order.bank.name}\n\nNama: ${order.customer.name}\nWA: ${order.customer.phone}\nAlamat: ${order.customer.address}\n\nTerima kasih sudah berbelanja di Rekain Fashion! 🙏`;
    window.open(`https://wa.me/6289529178826?text=${encodeURIComponent(msg)}`);
  }

  function printReceipt() {
    window.print();
  }

  return (
    <div style={styles.app}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'DM Sans', sans-serif; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: #F5F0E8; } ::-webkit-scrollbar-thumb { background: #8B4513; border-radius: 2px; }
        @media print {
          .no-print { display: none !important; }
          .print-only { display: block !important; }
          body { background: white; }
        }
        .hover-lift { transition: transform 0.2s, box-shadow 0.2s; cursor: pointer; }
        .hover-lift:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(139,69,19,0.15); }
        .btn-primary { background: #2D1B0E; color: #F5F0E8; border: none; padding: 14px 28px; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500; letter-spacing: 1.5px; text-transform: uppercase; cursor: pointer; transition: background 0.2s; }
        .btn-primary:hover { background: #8B4513; }
        .btn-outline { background: transparent; color: #2D1B0E; border: 1.5px solid #2D1B0E; padding: 12px 24px; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500; letter-spacing: 1.5px; text-transform: uppercase; cursor: pointer; transition: all 0.2s; }
        .btn-outline:hover { background: #2D1B0E; color: #F5F0E8; }
        input, textarea, select { font-family: 'DM Sans', sans-serif; }
        .fade-in { animation: fadeIn 0.4s ease; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      {/* NAVBAR */}
      <nav style={styles.nav} className="no-print">
        <div style={styles.navLeft}>
          <span style={styles.logo} onClick={() => setPage("home")}>REKAIN</span>
          <span style={styles.logoSub}>FASHION</span>
        </div>
        <div style={styles.navLinks}>
          {["home","shop"].map(p => (
            <span key={p} style={{...styles.navLink, ...(page===p?{borderBottom:"2px solid #2D1B0E"}:{})}} onClick={() => setPage(p)}>
              {p === "home" ? "Beranda" : "Koleksi"}
            </span>
          ))}
        </div>
        <div style={styles.navRight}>
          <span style={styles.cartBtn} onClick={() => setCartOpen(true)}>
            🛒 <span style={styles.cartBadge}>{cartCount}</span>
          </span>
        </div>
      </nav>

      {/* CART SIDEBAR */}
      {cartOpen && (
        <div style={styles.overlay} onClick={() => setCartOpen(false)}>
          <div style={styles.cartSidebar} onClick={e => e.stopPropagation()}>
            <div style={styles.cartHeader}>
              <span style={{fontFamily:"'Playfair Display'",fontSize:20,fontWeight:700}}>Keranjang</span>
              <span style={{cursor:"pointer",fontSize:20}} onClick={() => setCartOpen(false)}>✕</span>
            </div>
            {cart.length === 0 ? (
              <div style={{textAlign:"center",padding:"60px 20px",color:"#999",fontSize:14}}>
                <div style={{fontSize:40,marginBottom:12}}>🛒</div>
                Keranjang masih kosong
              </div>
            ) : (
              <>
                <div style={{flex:1,overflowY:"auto",padding:"0 24px"}}>
                  {cart.map(item => (
                    <div key={item.key} style={styles.cartItem}>
                      <div style={{...styles.productSwatch, background: item.color, width:48, height:48, flexShrink:0}} />
                      <div style={{flex:1}}>
                        <div style={{fontSize:13,fontWeight:500}}>{item.name}</div>
                        <div style={{fontSize:12,color:"#888"}}>Ukuran: {item.size}</div>
                        <div style={{fontSize:13,fontWeight:600,color:"#8B4513",marginTop:4}}>{formatRp(item.price)}</div>
                      </div>
                      <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:6}}>
                        <div style={styles.qtyRow}>
                          <button style={styles.qtyBtn} onClick={() => updateQty(item.key,-1)}>−</button>
                          <span style={{fontSize:13,fontWeight:500,minWidth:20,textAlign:"center"}}>{item.qty}</span>
                          <button style={styles.qtyBtn} onClick={() => updateQty(item.key,1)}>+</button>
                        </div>
                        <span style={{fontSize:11,color:"#C0392B",cursor:"pointer"}} onClick={() => removeFromCart(item.key)}>Hapus</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={styles.cartFooter}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:8,fontSize:13}}>
                    <span style={{color:"#666"}}>Subtotal</span><span>{formatRp(cartTotal)}</span>
                  </div>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:16,fontSize:13}}>
                    <span style={{color:"#666"}}>Estimasi ongkir</span><span>{formatRp(shipping)}</span>
                  </div>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:20,fontSize:16,fontWeight:700}}>
                    <span>Total</span><span style={{color:"#8B4513"}}>{formatRp(grandTotal)}</span>
                  </div>
                  <button className="btn-primary" style={{width:"100%"}} onClick={() => { setPage("checkout"); setCartOpen(false); }}>
                    LANJUT KE CHECKOUT
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* PRODUCT MODAL */}
      {selectedProduct && (
        <div style={styles.overlay} onClick={() => setSelectedProduct(null)}>
          <div style={styles.modal} onClick={e => e.stopPropagation()}>
            <div style={{...styles.productSwatch, background: selectedProduct.color, height:200, borderRadius:0}} />
            <div style={{padding:24}}>
              {selectedProduct.badge && <span style={styles.badge}>{selectedProduct.badge}</span>}
              <div style={{fontFamily:"'Playfair Display'",fontSize:22,fontWeight:700,margin:"8px 0 4px"}}>{selectedProduct.name}</div>
              <div style={{fontSize:13,color:"#666",marginBottom:12}}>{selectedProduct.desc}</div>
              <div style={{fontSize:20,fontWeight:700,color:"#8B4513",marginBottom:16}}>{formatRp(selectedProduct.price)}</div>
              <div style={{fontSize:12,fontWeight:500,letterSpacing:1,textTransform:"uppercase",marginBottom:8}}>Pilih Ukuran</div>
              <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:20}}>
                {selectedProduct.sizes.map(s => (
                  <button key={s} onClick={() => setSelectedSize(s)} style={{
                    padding:"8px 14px", border: selectedSize===s ? "2px solid #8B4513":"1.5px solid #DDD",
                    background: selectedSize===s ? "#8B4513":"white", color: selectedSize===s ? "white":"#333",
                    fontSize:12, cursor:"pointer", fontFamily:"'DM Sans'"
                  }}>{s}</button>
                ))}
              </div>
              <button className="btn-primary" style={{width:"100%",marginBottom:12}} onClick={() => addToCart(selectedProduct, selectedSize)}>
                TAMBAH KE KERANJANG
              </button>
              <button className="btn-outline" style={{width:"100%"}} onClick={() => setSelectedProduct(null)}>BATAL</button>
            </div>
          </div>
        </div>
      )}

      {/* PAGE: HOME */}
      {page === "home" && (
        <div className="fade-in">
          {/* HERO */}
          <section style={styles.hero}>
            <div style={styles.heroPattern} />
            <div style={styles.heroContent}>
              <div style={{fontSize:11,letterSpacing:4,textTransform:"uppercase",color:"#8B4513",marginBottom:16}}>
                ✦ Sustainable Local Fashion ✦
              </div>
              <h1 style={styles.heroTitle}>Dari Kain Sisa,<br/>Lahir Karya Bermakna</h1>
              <p style={styles.heroSub}>Setiap helai kain perca kami ubah menjadi pakaian anak yang indah, nyaman, dan ramah lingkungan. Buatan lokal, penuh cinta.</p>
              <div style={{display:"flex",gap:12,flexWrap:"wrap",justifyContent:"center"}}>
                <button className="btn-primary" onClick={() => setPage("shop")}>LIHAT KOLEKSI</button>
                <button className="btn-outline" onClick={() => setPage("shop")}>TENTANG KAMI</button>
              </div>
            </div>
          </section>

          {/* VALUES */}
          <section style={styles.valuesSection}>
            {[
              {icon:"🌿",title:"Zero Waste",desc:"Memanfaatkan kain perca limbah konveksi yang berkualitas"},
              {icon:"👶",title:"Aman Anak",desc:"Bahan dipilih khusus, lembut dan nyaman untuk kulit anak"},
              {icon:"🧵",title:"Buatan Lokal",desc:"Dijahit oleh pengrajin lokal Medan dengan keahlian terbaik"},
              {icon:"💚",title:"Harga Terjangkau",desc:"Berkualitas tinggi tanpa menguras kantong orang tua"},
            ].map((v,i) => (
              <div key={i} style={styles.valueCard}>
                <div style={{fontSize:32,marginBottom:12}}>{v.icon}</div>
                <div style={{fontFamily:"'Playfair Display'",fontSize:16,fontWeight:700,marginBottom:6}}>{v.title}</div>
                <div style={{fontSize:13,color:"#777",lineHeight:1.6}}>{v.desc}</div>
              </div>
            ))}
          </section>

          {/* FEATURED */}
          <section style={{padding:"60px 5%"}}>
            <div style={{textAlign:"center",marginBottom:40}}>
              <div style={{fontSize:11,letterSpacing:4,color:"#8B4513",textTransform:"uppercase",marginBottom:8}}>Pilihan Terbaik</div>
              <h2 style={{fontFamily:"'Playfair Display'",fontSize:32,fontWeight:700}}>Koleksi Unggulan</h2>
            </div>
            <div style={styles.productGrid}>
              {PRODUCTS.slice(0,3).map(p => (
                <ProductCard key={p.id} product={p} onSelect={() => setSelectedProduct(p)} />
              ))}
            </div>
            <div style={{textAlign:"center",marginTop:40}}>
              <button className="btn-outline" onClick={() => setPage("shop")}>LIHAT SEMUA KOLEKSI</button>
            </div>
          </section>

          {/* STORY */}
          <section style={styles.storySection}>
            <div style={styles.storyLeft}>
              <div style={{fontSize:11,letterSpacing:4,color:"#C2552A",textTransform:"uppercase",marginBottom:12}}>Cerita Kami</div>
              <h2 style={{fontFamily:"'Playfair Display'",fontSize:28,fontWeight:700,color:"#F5F0E8",marginBottom:16,lineHeight:1.3}}>Rekain — Merekam Kisah dari Setiap Kain</h2>
              <p style={{fontSize:14,lineHeight:1.8,color:"#D4C5B0",marginBottom:20}}>Rekain Fashion lahir dari kepedulian terhadap limbah tekstil. Kami percaya setiap potongan kain punya cerita — dan kami hadir untuk meneruskan cerita itu menjadi pakaian anak yang cantik, berkualitas, dan bermakna.</p>
              <p style={{fontSize:14,lineHeight:1.8,color:"#D4C5B0"}}>Berbasis di Medan, kami bekerja sama dengan pengrajin lokal untuk menghadirkan koleksi batik anak yang merayakan keindahan nusantara.</p>
            </div>
            <div style={styles.storyRight}>
              {["Kain Perca → Karya", "Lokal & Berkelanjutan", "Untuk Si Kecil"].map((t,i) => (
                <div key={i} style={styles.storyTag}>
                  <span style={{fontSize:18}}>✦</span> {t}
                </div>
              ))}
            </div>
          </section>

          {/* FOOTER */}
          <footer style={styles.footer}>
            <div style={{fontFamily:"'Playfair Display'",fontSize:24,fontWeight:700,marginBottom:4}}>REKAIN FASHION</div>
            <div style={{fontSize:12,color:"#999",marginBottom:16}}>Dari Kain Sisa, Lahir Karya Bermakna</div>
            <div style={{fontSize:12,color:"#777"}}>© 2025 Rekain Fashion · Medan, Sumatera Utara · rekainfashion.blog</div>
          </footer>
        </div>
      )}

      {/* PAGE: SHOP */}
      {page === "shop" && (
        <div style={{padding:"40px 5%"}} className="fade-in">
          <div style={{textAlign:"center",marginBottom:40}}>
            <div style={{fontSize:11,letterSpacing:4,color:"#8B4513",textTransform:"uppercase",marginBottom:8}}>Koleksi Kami</div>
            <h1 style={{fontFamily:"'Playfair Display'",fontSize:36,fontWeight:700}}>Semua Produk</h1>
          </div>
          <div style={{display:"flex",gap:8,justifyContent:"center",marginBottom:32,flexWrap:"wrap"}}>
            {categories.map(c => (
              <button key={c} onClick={() => setFilter(c)} style={{
                padding:"8px 20px", border: filter===c?"2px solid #2D1B0E":"1.5px solid #DDD",
                background: filter===c?"#2D1B0E":"white", color: filter===c?"white":"#333",
                fontSize:12, cursor:"pointer", letterSpacing:0.5, fontFamily:"'DM Sans'"
              }}>{c}</button>
            ))}
          </div>
          <div style={styles.productGrid}>
            {filtered.map(p => (
              <ProductCard key={p.id} product={p} onSelect={() => setSelectedProduct(p)} />
            ))}
          </div>
        </div>
      )}

      {/* PAGE: CHECKOUT */}
      {page === "checkout" && (
        <div style={{maxWidth:640,margin:"0 auto",padding:"40px 5%"}} className="fade-in">
          <div style={{marginBottom:32}}>
            <span style={{fontSize:12,color:"#8B4513",cursor:"pointer"}} onClick={() => setPage("shop")}>← Kembali belanja</span>
            <h1 style={{fontFamily:"'Playfair Display'",fontSize:28,fontWeight:700,marginTop:8}}>Checkout</h1>
          </div>

          {/* ORDER SUMMARY */}
          <div style={styles.checkoutBox}>
            <div style={{fontWeight:600,marginBottom:16,fontSize:14,letterSpacing:0.5}}>RINGKASAN PESANAN</div>
            {cart.map(item => (
              <div key={item.key} style={{display:"flex",justifyContent:"space-between",marginBottom:8,fontSize:13}}>
                <span>{item.name} ({item.size}) x{item.qty}</span>
                <span style={{fontWeight:500}}>{formatRp(item.price*item.qty)}</span>
              </div>
            ))}
            <div style={{borderTop:"1px solid #E8E0D0",marginTop:12,paddingTop:12}}>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:13,color:"#666",marginBottom:4}}>
                <span>Ongkir</span><span>{formatRp(shipping)}</span>
              </div>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:16,fontWeight:700,marginTop:8}}>
                <span>TOTAL</span><span style={{color:"#8B4513"}}>{formatRp(grandTotal)}</span>
              </div>
            </div>
          </div>

          {/* FORM */}
          <div style={styles.checkoutBox}>
            <div style={{fontWeight:600,marginBottom:16,fontSize:14,letterSpacing:0.5}}>DATA PENGIRIMAN</div>
            {[
              {label:"Nama Lengkap *",key:"name",type:"text",ph:"Nama penerima"},
              {label:"No. WhatsApp *",key:"phone",type:"tel",ph:"628xxxxxxxxxx"},
              {label:"Alamat Lengkap *",key:"address",type:"textarea",ph:"Jl. ... No. ..., Kelurahan, Kecamatan, Kota"},
              {label:"Catatan (opsional)",key:"note",type:"textarea",ph:"Instruksi khusus untuk penjual..."},
            ].map(f => (
              <div key={f.key} style={{marginBottom:16}}>
                <label style={{display:"block",fontSize:12,fontWeight:500,letterSpacing:0.5,marginBottom:6}}>{f.label}</label>
                {f.type === "textarea" ? (
                  <textarea rows={3} placeholder={f.ph} value={form[f.key]} onChange={e => setForm({...form,[f.key]:e.target.value})} style={styles.input} />
                ) : (
                  <input type={f.type} placeholder={f.ph} value={form[f.key]} onChange={e => setForm({...form,[f.key]:e.target.value})} style={styles.input} />
                )}
              </div>
            ))}
          </div>

          {/* PAYMENT METHOD */}
          <div style={styles.checkoutBox}>
            <div style={{fontWeight:600,marginBottom:16,fontSize:14,letterSpacing:0.5}}>METODE PEMBAYARAN</div>
            <div style={{fontSize:12,color:"#666",marginBottom:12}}>Transfer Bank — konfirmasi via WhatsApp</div>
            {BANK_ACCOUNTS.map(b => (
              <div key={b.bank} onClick={() => setForm({...form,bank:b.bank})} style={{
                display:"flex",justifyContent:"space-between",alignItems:"center",
                padding:"12px 16px",border: form.bank===b.bank?"2px solid #8B4513":"1.5px solid #E0D8CE",
                marginBottom:8,cursor:"pointer",background: form.bank===b.bank?"#FFF8F2":"white",transition:"all 0.15s"
              }}>
                <div>
                  <div style={{fontWeight:600,fontSize:14}}>Bank {b.bank}</div>
                  <div style={{fontSize:12,color:"#666"}}>{b.no} · a.n. {b.name}</div>
                </div>
                <div style={{width:18,height:18,borderRadius:"50%",border:"2px solid "+( form.bank===b.bank?"#8B4513":"#CCC"),background: form.bank===b.bank?"#8B4513":"white",display:"flex",alignItems:"center",justifyContent:"center"}}>
                  {form.bank===b.bank && <div style={{width:8,height:8,borderRadius:"50%",background:"white"}} />}
                </div>
              </div>
            ))}
          </div>

          <button className="btn-primary" style={{width:"100%",padding:"16px",fontSize:14}} onClick={submitOrder}>
            BUAT PESANAN & LIHAT STRUK
          </button>
        </div>
      )}

      {/* PAGE: RECEIPT */}
      {page === "receipt" && order && (
        <div style={{maxWidth:540,margin:"0 auto",padding:"40px 5%"}} className="fade-in">
          <div style={{textAlign:"center",marginBottom:32}} className="no-print">
            <div style={{width:56,height:56,background:"#4CAF50",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 12px",fontSize:24}}>✓</div>
            <h2 style={{fontFamily:"'Playfair Display'",fontSize:24,fontWeight:700}}>Pesanan Berhasil Dibuat!</h2>
            <p style={{fontSize:13,color:"#666",marginTop:8}}>Segera lakukan pembayaran dan konfirmasi via WhatsApp</p>
          </div>

          {/* RECEIPT */}
          <div ref={receiptRef} style={styles.receipt}>
            {/* HEADER */}
            <div style={{textAlign:"center",paddingBottom:16,borderBottom:"2px dashed #C2A882",marginBottom:16}}>
              <div style={{fontFamily:"'Playfair Display'",fontSize:22,fontWeight:700,color:"#2D1B0E"}}>REKAIN FASHION</div>
              <div style={{fontSize:11,color:"#8B6914",letterSpacing:2,textTransform:"uppercase"}}>Sustainable Local Fashion</div>
              <div style={{fontSize:11,color:"#999",marginTop:4}}>rekainfashion.blog · Medan, Sumut</div>
            </div>

            {/* ORDER INFO */}
            <div style={{background:"#FFF8F2",padding:"12px 16px",marginBottom:16,borderRadius:4}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                <span style={{fontSize:12,color:"#666"}}>No. Order</span>
                <span style={{fontSize:13,fontWeight:700,color:"#8B4513"}}>{order.id}</span>
              </div>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                <span style={{fontSize:12,color:"#666"}}>Tanggal</span>
                <span style={{fontSize:12}}>{order.date}</span>
              </div>
              <div style={{display:"flex",justifyContent:"space-between"}}>
                <span style={{fontSize:12,color:"#666"}}>Nama</span>
                <span style={{fontSize:12,fontWeight:500}}>{order.customer.name}</span>
              </div>
            </div>

            {/* ITEMS */}
            <div style={{marginBottom:16}}>
              <div style={{fontSize:11,fontWeight:600,letterSpacing:1,textTransform:"uppercase",color:"#666",marginBottom:10,paddingBottom:6,borderBottom:"1px solid #EEE"}}>DETAIL PRODUK</div>
              {order.items.map(item => (
                <div key={item.key} style={{marginBottom:10}}>
                  <div style={{display:"flex",justifyContent:"space-between"}}>
                    <span style={{fontSize:13,fontWeight:500,flex:1}}>{item.name}</span>
                    <span style={{fontSize:13,fontWeight:600}}>{formatRp(item.price*item.qty)}</span>
                  </div>
                  <div style={{fontSize:11,color:"#888"}}>Ukuran {item.size} × {item.qty} pcs @ {formatRp(item.price)}</div>
                </div>
              ))}
            </div>

            {/* TOTALS */}
            <div style={{borderTop:"1px solid #E8E0D0",paddingTop:12,marginBottom:16}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:6,fontSize:13}}>
                <span style={{color:"#666"}}>Subtotal</span><span>{formatRp(order.subtotal)}</span>
              </div>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:6,fontSize:13}}>
                <span style={{color:"#666"}}>Ongkir</span><span>{formatRp(order.shipping)}</span>
              </div>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:16,fontWeight:700,marginTop:8,paddingTop:8,borderTop:"1.5px solid #2D1B0E"}}>
                <span>TOTAL BAYAR</span><span style={{color:"#8B4513"}}>{formatRp(order.total)}</span>
              </div>
            </div>

            {/* PAYMENT INFO */}
            <div style={{background:"#2D1B0E",color:"#F5F0E8",padding:"14px 16px",borderRadius:4,marginBottom:16}}>
              <div style={{fontSize:11,letterSpacing:1,textTransform:"uppercase",color:"#C2A882",marginBottom:8}}>INFO PEMBAYARAN</div>
              <div style={{fontSize:14,fontWeight:700,marginBottom:2}}>Bank {order.bank.bank}</div>
              <div style={{fontSize:18,fontWeight:700,letterSpacing:1,marginBottom:2}}>{order.bank.no}</div>
              <div style={{fontSize:12,color:"#C2A882"}}>a.n. {order.bank.name}</div>
              <div style={{marginTop:10,fontSize:12,color:"#D4C5B0",borderTop:"1px solid rgba(255,255,255,0.1)",paddingTop:10}}>
                Transfer tepat <strong style={{color:"#FFD700"}}>{formatRp(order.total)}</strong> dan konfirmasi via WhatsApp
              </div>
            </div>

            {/* ALAMAT */}
            <div style={{fontSize:12,color:"#666",marginBottom:16,lineHeight:1.6}}>
              <div style={{fontWeight:500,color:"#333",marginBottom:2}}>📦 Alamat Pengiriman:</div>
              <div>{order.customer.address}</div>
              <div>WA: {order.customer.phone}</div>
              {order.customer.note && <div style={{marginTop:4,fontStyle:"italic"}}>Catatan: {order.customer.note}</div>}
            </div>

            {/* FOOTER */}
            <div style={{textAlign:"center",paddingTop:12,borderTop:"2px dashed #C2A882",fontSize:11,color:"#999",lineHeight:1.8}}>
              <div>Terima kasih telah berbelanja di Rekain Fashion! 🌿</div>
              <div>Setiap pembelian membantu mengurangi limbah tekstil</div>
              <div style={{marginTop:4,color:"#8B4513"}}>rekainfashion.blog</div>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div style={{display:"flex",gap:12,marginTop:20,flexWrap:"wrap"}} className="no-print">
            <button className="btn-primary" style={{flex:1,padding:14}} onClick={shareWA}>
              📲 KONFIRMASI VIA WHATSAPP
            </button>
            <button className="btn-outline" style={{flex:1,padding:14}} onClick={printReceipt}>
              🖨️ CETAK STRUK
            </button>
          </div>
          <div style={{textAlign:"center",marginTop:16}} className="no-print">
            <span style={{fontSize:13,color:"#8B4513",cursor:"pointer"}} onClick={() => setPage("shop")}>← Lanjut belanja</span>
          </div>
        </div>
      )}
    </div>
  );
}

function ProductCard({ product, onSelect }) {
  return (
    <div className="hover-lift" style={styles.productCard} onClick={onSelect}>
      <div style={{...styles.productSwatch, background: product.color}}>
        {product.badge && <span style={styles.badge}>{product.badge}</span>}
        <div style={styles.productSwatchIcon}>👕</div>
      </div>
      <div style={{padding:"16px 16px 20px"}}>
        <div style={{fontSize:10,color:"#888",letterSpacing:1,textTransform:"uppercase",marginBottom:4}}>{product.category}</div>
        <div style={{fontFamily:"'Playfair Display'",fontSize:16,fontWeight:600,marginBottom:4}}>{product.name}</div>
        <div style={{fontSize:12,color:"#777",marginBottom:10,lineHeight:1.5}}>{product.desc}</div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <span style={{fontSize:16,fontWeight:700,color:"#8B4513"}}>{formatRp(product.price)}</span>
          <span style={{fontSize:11,color:"#4CAF50"}}>Stok {product.stock}</span>
        </div>
      </div>
    </div>
  );
}

const styles = {
  app: { background:"#FAFAF7", minHeight:"100vh", fontFamily:"'DM Sans', sans-serif" },
  nav: { display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 5%",height:64,background:"#F5F0E8",borderBottom:"1px solid #E8E0D0",position:"sticky",top:0,zIndex:100 },
  navLeft: { display:"flex",alignItems:"baseline",gap:6,cursor:"pointer" },
  logo: { fontFamily:"'Playfair Display'",fontSize:22,fontWeight:700,color:"#2D1B0E",letterSpacing:2 },
  logoSub: { fontSize:10,letterSpacing:3,color:"#8B4513",textTransform:"uppercase" },
  navLinks: { display:"flex",gap:28 },
  navLink: { fontSize:13,fontWeight:400,letterSpacing:1,textTransform:"uppercase",cursor:"pointer",paddingBottom:4,transition:"border 0.2s" },
  navRight: { display:"flex",alignItems:"center",gap:16 },
  cartBtn: { fontSize:22,cursor:"pointer",position:"relative" },
  cartBadge: { position:"absolute",top:-8,right:-8,background:"#8B4513",color:"white",borderRadius:"50%",width:18,height:18,fontSize:10,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'DM Sans'" },
  hero: { position:"relative",minHeight:480,display:"flex",alignItems:"center",justifyContent:"center",background:"linear-gradient(135deg,#2D1B0E 0%,#5C3317 50%,#8B4513 100%)",overflow:"hidden" },
  heroPattern: { position:"absolute",inset:0,backgroundImage:"repeating-linear-gradient(45deg,transparent,transparent 20px,rgba(255,255,255,0.03) 20px,rgba(255,255,255,0.03) 40px)",pointerEvents:"none" },
  heroContent: { position:"relative",textAlign:"center",padding:"60px 5%",maxWidth:640 },
  heroTitle: { fontFamily:"'Playfair Display'",fontSize:"clamp(32px,5vw,52px)",fontWeight:700,color:"#F5F0E8",lineHeight:1.2,marginBottom:16 },
  heroSub: { fontSize:15,color:"#C2A882",lineHeight:1.8,marginBottom:32,maxWidth:480,margin:"0 auto 32px" },
  valuesSection: { display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:0,background:"#F5F0E8",borderTop:"1px solid #E8E0D0",borderBottom:"1px solid #E8E0D0" },
  valueCard: { padding:"32px 24px",textAlign:"center",borderRight:"1px solid #E8E0D0" },
  productGrid: { display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:20 },
  productCard: { background:"white",border:"1px solid #EEE",overflow:"hidden" },
  productSwatch: { height:180,position:"relative",display:"flex",alignItems:"center",justifyContent:"center" },
  productSwatchIcon: { fontSize:48,opacity:0.3 },
  badge: { position:"absolute",top:12,left:12,background:"#8B4513",color:"white",fontSize:10,fontWeight:700,letterSpacing:1,padding:"3px 8px",textTransform:"uppercase" },
  storySection: { display:"grid",gridTemplateColumns:"1fr 1fr",gap:0,background:"#1A0F07",padding:"60px 5%" },
  storyLeft: { paddingRight:40 },
  storyRight: { display:"flex",flexDirection:"column",gap:16,justifyContent:"center" },
  storyTag: { display:"flex",alignItems:"center",gap:12,color:"#C2A882",fontSize:16,fontFamily:"'Playfair Display'",padding:"16px 20px",border:"1px solid rgba(194,170,130,0.2)" },
  footer: { background:"#0D0906",padding:"40px 5%",textAlign:"center",color:"#F5F0E8" },
  overlay: { position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",zIndex:200,display:"flex",justifyContent:"flex-end" },
  cartSidebar: { background:"white",width:"min(400px,95vw)",height:"100%",display:"flex",flexDirection:"column",overflowY:"auto" },
  cartHeader: { display:"flex",justifyContent:"space-between",alignItems:"center",padding:"20px 24px",borderBottom:"1px solid #EEE" },
  cartItem: { display:"flex",gap:12,padding:"16px 0",borderBottom:"1px solid #F0EAE0",alignItems:"flex-start" },
  cartFooter: { padding:24,borderTop:"1px solid #EEE",background:"#FAFAF7" },
  qtyRow: { display:"flex",alignItems:"center",gap:8 },
  qtyBtn: { width:24,height:24,border:"1px solid #DDD",background:"white",cursor:"pointer",fontSize:14,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'DM Sans'" },
  modal: { background:"white",width:"min(400px,95vw)",maxHeight:"90vh",overflowY:"auto",margin:"auto",borderRadius:4 },
  checkoutBox: { background:"white",border:"1px solid #E8E0D0",padding:20,marginBottom:16,borderRadius:4 },
  input: { width:"100%",padding:"10px 12px",border:"1.5px solid #E0D8CE",fontSize:13,outline:"none",fontFamily:"'DM Sans'",resize:"vertical",background:"#FAFAF7",borderRadius:2 },
  receipt: { background:"white",border:"2px solid #E8E0D0",padding:24,fontFamily:"'DM Sans',sans-serif" },
};
