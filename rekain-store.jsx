import { useState, useEffect } from "react";

/* ─── CONFIG — ganti sesuai data kamu ─── */
const WA_NUMBER = "6289529178826"; // Ganti dengan no WA bisnis kamu
const VA_ACCOUNTS = [
  { bank: "BCA",     logo: "🏦", va: "1234567890",    name: "ReKain Fashion" },
  { bank: "Mandiri", logo: "🏛️", va: "9087654321001", name: "ReKain Fashion" },
  { bank: "BRI",     logo: "🌿", va: "0088776655443", name: "ReKain Fashion" },
];

/* ─── TRANSLATIONS ─── */
const COPY = {
  id: {
    tagline: "Esensial Tanpa Batas Waktu, Untuk Semua Usia",
    heroTitle1: "Berpakaian", heroTitle2: "dengan jiwa.",
    heroDesc: "Koleksi pakaian minimalis berkualitas — dari bayi hingga dewasa. Dibuat dengan bahan pilihan, dirancang untuk kenyamanan sehari-hari.",
    shopNow: "BELANJA SEKARANG", lookbook: "LIHAT LOOKBOOK",
    nav: ["Koleksi", "Tentang", "Kontak"],
    cats: ["Semua", "Dewasa", "Anak-anak", "Bayi"],
    featNew: "Baru", featBest: "Terlaris",
    viewDetail: "LIHAT DETAIL", pickColor: "Pilih Warna", addCart: "TAMBAH KE KERANJANG",
    cart: "Keranjang", emptyCart: "Keranjang masih kosong.", subtotal: "Subtotal",
    toCheckout: "LANJUT KE CHECKOUT", shipping: "Pengiriman", negotiate: "Dihitung saat konfirmasi",
    shippingDetail: "Detail Pengiriman", back: "← Kembali",
    fullName: "Nama Lengkap *", waNumber: "No. WhatsApp *", address: "Alamat Lengkap *", notes: "Catatan (opsional)",
    placeholderAddress: "Jl. ..., Kec., Kota", placeholderNotes: "Ukuran, warna, dll.",
    payMethod: "Metode Pembayaran", payWa: "Konfirmasi via WhatsApp", payVa: "Transfer Virtual Account",
    confirmWa: "KIRIM ORDER VIA WHATSAPP", confirmVa: "SAYA SUDAH TRANSFER",
    vaInstructions: "Transfer tepat sesuai nominal berikut:", vaCopy: "Salin", vaCopied: "Tersalin!",
    total: "Total", required: "Isi semua field wajib (*) terlebih dahulu.",
    successTitle: "Pesanan Masuk!",
    successWa: "Kamu akan diarahkan ke WhatsApp untuk konfirmasi. Pesanan kami proses setelah konfirmasi.",
    successVa: "Verifikasi transfer sedang diproses. Hubungi kami via WhatsApp jika perlu bantuan.",
    backShop: "KEMBALI BELANJA",
    quote: '"Sederhana adalah kemewahan yang sesungguhnya."', est: "Est. 2025, Medan",
    feat1t:"Gratis Ongkir", feat1d:"Min. Rp 300.000 area Medan",
    feat2t:"Bahan Premium", feat2d:"Linen, katun organik & ribbed knit pilihan",
    feat3t:"Mudah Return", feat3d:"7 hari retur jika ada cacat produksi",
    feat4t:"CS Responsif", feat4d:"WhatsApp aktif setiap hari, jam 8–21",
    footerCopy: "© 2025 ReKain Fashion. Medan, North Sumatra.",
    items: "item",
    vaNote: "Setelah transfer, klik tombol di bawah untuk konfirmasi via WhatsApp.",
    waMsg: (cart, form, total) => {
      const lines = cart.map(i=>`• ${i.name} x${i.qty} — Rp ${(i.price*i.qty).toLocaleString("id-ID")}`).join("\n");
      return `Halo ReKain! Saya ingin memesan:\n\n${lines}\n\nSubtotal: Rp ${total.toLocaleString("id-ID")}\n\nNama: ${form.name}\nAlamat: ${form.address}\nCatatan: ${form.notes||"-"}`;
    },
  },
  en: {
    tagline: "Timeless Essentials for Every Age",
    heroTitle1: "Dress", heroTitle2: "with soul.",
    heroDesc: "A minimalist quality clothing collection — from babies to adults. Crafted with curated fabrics, designed for everyday comfort.",
    shopNow: "SHOP NOW", lookbook: "VIEW LOOKBOOK",
    nav: ["Collection", "About", "Contact"],
    cats: ["All", "Adults", "Kids", "Baby"],
    featNew: "New", featBest: "Bestseller",
    viewDetail: "VIEW DETAIL", pickColor: "Choose Color", addCart: "ADD TO CART",
    cart: "Cart", emptyCart: "Your cart is empty.", subtotal: "Subtotal",
    toCheckout: "PROCEED TO CHECKOUT", shipping: "Shipping", negotiate: "Calculated at confirmation",
    shippingDetail: "Shipping Details", back: "← Back",
    fullName: "Full Name *", waNumber: "WhatsApp Number *", address: "Full Address *", notes: "Notes (optional)",
    placeholderAddress: "Street, District, City", placeholderNotes: "Size, color, etc.",
    payMethod: "Payment Method", payWa: "Confirm via WhatsApp", payVa: "Virtual Account Transfer",
    confirmWa: "SEND ORDER VIA WHATSAPP", confirmVa: "I HAVE TRANSFERRED",
    vaInstructions: "Transfer the exact amount below:", vaCopy: "Copy", vaCopied: "Copied!",
    total: "Total", required: "Please fill all required (*) fields.",
    successTitle: "Order Received!",
    successWa: "You'll be redirected to WhatsApp to confirm. We'll process your order after confirmation.",
    successVa: "We're verifying your transfer. Contact us via WhatsApp if you need help.",
    backShop: "CONTINUE SHOPPING",
    quote: '"Simplicity is the ultimate luxury."', est: "Est. 2025, Medan",
    feat1t:"Free Shipping", feat1d:"Orders above Rp 300,000 in Medan area",
    feat2t:"Premium Fabric", feat2d:"Linen, organic cotton & ribbed knit",
    feat3t:"Easy Returns", feat3d:"7-day return for manufacturing defects",
    feat4t:"Responsive CS", feat4d:"WhatsApp available daily, 8AM–9PM",
    footerCopy: "© 2025 ReKain Fashion. Medan, North Sumatra.",
    items: "items",
    vaNote: "After transferring, click the button below to confirm via WhatsApp.",
    waMsg: (cart, form, total) => {
      const lines = cart.map(i=>`• ${i.name} x${i.qty} — Rp ${(i.price*i.qty).toLocaleString("id-ID")}`).join("\n");
      return `Hi ReKain! I'd like to order:\n\n${lines}\n\nSubtotal: Rp ${total.toLocaleString("id-ID")}\n\nName: ${form.name}\nAddress: ${form.address}\nNotes: ${form.notes||"-"}`;
    },
  }
};

const PRODUCTS = [
  { id:1, name:"Linen Oversized Shirt", cat:"Adults", price:189000, tag:"Bestseller", colors:["#D4C5B2","#2C2C2C","#8B7355"], img:"👕" },
  { id:2, name:"Wide Leg Trousers",     cat:"Adults", price:225000, tag:"New",        colors:["#F5F0E8","#4A4A4A","#8B8B6B"], img:"👖" },
  { id:3, name:"Structured Tote Bag",   cat:"Adults", price:145000, tag:null,         colors:["#2C2C2C","#D4C5B2"],            img:"👜" },
  { id:4, name:"Ribbed Knit Cardigan",  cat:"Adults", price:210000, tag:"New",        colors:["#E8DDD0","#6B5E4E","#2C2C2C"], img:"🧥" },
  { id:5, name:"Mini Romper Set",       cat:"Baby",   price:95000,  tag:"Bestseller", colors:["#F9E8D8","#D4E8D8","#E8D8E8"], img:"👶" },
  { id:6, name:"Soft Knit Onesie",      cat:"Baby",   price:79000,  tag:null,         colors:["#FAEBD7","#B0D4C8"],            img:"🐣" },
  { id:7, name:"Kids Linen Set",        cat:"Kids",   price:135000, tag:"New",        colors:["#D4C5B2","#F5F0E8","#8FBCBB"], img:"🧒" },
  { id:8, name:"Kids Casual Dress",     cat:"Kids",   price:120000, tag:null,         colors:["#E8C4C4","#C4D4E8","#C4E8C4"], img:"👗" },
];
const CAT_FILTER = ["All","Adults","Kids","Baby"];
const fmt = n => `Rp ${n.toLocaleString("id-ID")}`;

/* ══════════════════════════════════════════
   ROOT
══════════════════════════════════════════ */
export default function ReKainStore() {
  const [lang, setLang]         = useState("id");
  const [cart, setCart]         = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [activeCat, setActiveCat] = useState(0);
  const [modal, setModal]       = useState(null);
  const [selColor, setSelColor] = useState(0);
  const [step, setStep]         = useState("cart");
  const [payMethod, setPayMethod] = useState("wa");
  const [selVa, setSelVa]       = useState(0);
  const [copied, setCopied]     = useState(false);
  const [err, setErr]           = useState(false);
  const [form, setForm]         = useState({ name:"", phone:"", address:"", notes:"" });

  const T = COPY[lang];
  const filtered = activeCat===0 ? PRODUCTS : PRODUCTS.filter(p=>p.cat===CAT_FILTER[activeCat]);
  const cartCount = cart.reduce((s,i)=>s+i.qty,0);
  const cartTotal = cart.reduce((s,i)=>s+i.price*i.qty,0);

  const addToCart = p => {
    setCart(prev => {
      const ex = prev.find(i=>i.id===p.id);
      return ex ? prev.map(i=>i.id===p.id?{...i,qty:i.qty+1}:i) : [...prev,{...p,qty:1}];
    });
    setCartOpen(true); setModal(null);
  };
  const updateQty = (id,d) => setCart(prev=>prev.map(i=>i.id===id?{...i,qty:Math.max(0,i.qty+d)}:i).filter(i=>i.qty>0));

  const handleProceed = () => {
    if (!form.name||!form.phone||!form.address){ setErr(true); return; }
    setErr(false);
    if(payMethod==="wa"){
      window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(T.waMsg(cart,form,cartTotal))}`,"_blank");
      setStep("success-wa");
    } else { setStep("va"); }
  };
  const handleVaConfirm = () => {
    const msg = T.waMsg(cart,form,cartTotal)+`\n\nMetode: VA ${VA_ACCOUNTS[selVa].bank}`;
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`,"_blank");
    setStep("success-va");
  };
  const resetAll = () => { setCart([]); setCartOpen(false); setStep("cart"); setForm({name:"",phone:"",address:"",notes:""}); setErr(false); setPayMethod("wa"); };
  const copyVa = va => { navigator.clipboard.writeText(va); setCopied(true); setTimeout(()=>setCopied(false),2000); };

  useEffect(()=>{ document.title="ReKain — Timeless Essentials"; },[]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        *,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
        :root{--cream:#F7F4EF;--warm:#FDFCFA;--ink:#1A1A18;--muted:#6B6A66;--accent:#8B7355;--al:#D4C5B2;--border:#E8E3DC;--green:#25D366;--serif:'Cormorant Garamond',Georgia,serif;--sans:'DM Sans',sans-serif}
        html{scroll-behavior:smooth}body{background:var(--cream);color:var(--ink);font-family:var(--sans)}
        input:focus{outline:2px solid var(--al)!important;border-color:var(--accent)!important}
        .fi{animation:fu .6s ease forwards;opacity:0}
        @keyframes fu{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
        .s1{animation-delay:.1s}.s2{animation-delay:.22s}.s3{animation-delay:.38s}
        @keyframes sli{from{transform:translateX(100%)}to{transform:translateX(0)}}
        @keyframes pop{0%{opacity:0;transform:scale(.96)}100%{opacity:1;transform:scale(1)}}
        ::-webkit-scrollbar{width:3px}::-webkit-scrollbar-thumb{background:var(--al);border-radius:2px}
      `}</style>

      {/* NAV */}
      <nav style={{position:"sticky",top:0,zIndex:100,background:"rgba(247,244,239,.93)",backdropFilter:"blur(14px)",borderBottom:"1px solid var(--border)",padding:"0 24px",display:"flex",alignItems:"center",justifyContent:"space-between",height:60}}>
        <span style={{fontFamily:"var(--serif)",fontSize:22,letterSpacing:"0.12em"}}>Re<span style={{color:"var(--accent)"}}>Kain</span></span>
        <div style={{display:"flex",gap:24,fontSize:13,letterSpacing:"0.06em",color:"var(--muted)"}}>
          {T.nav.map(m=>(
            <span key={m} style={{cursor:"pointer",transition:"color .2s"}}
              onMouseEnter={e=>e.target.style.color="var(--ink)"}
              onMouseLeave={e=>e.target.style.color="var(--muted)"}>{m}</span>
          ))}
        </div>
        <div style={{display:"flex",alignItems:"center",gap:14}}>
          <button onClick={()=>setLang(l=>l==="id"?"en":"id")}
            style={{background:"var(--border)",border:"none",borderRadius:20,padding:"4px 12px",fontSize:11,letterSpacing:"0.1em",cursor:"pointer",fontFamily:"var(--sans)",color:"var(--ink)",fontWeight:500}}>
            {lang==="id"?"EN":"ID"}
          </button>
          <button onClick={()=>{setCartOpen(true);setStep("cart");}} style={{background:"none",border:"none",cursor:"pointer",display:"flex",alignItems:"center",gap:6,fontSize:13,color:"var(--ink)"}}>
            <span style={{fontSize:18}}>🛍️</span>
            {cartCount>0&&<span style={{background:"var(--accent)",color:"#fff",borderRadius:"50%",width:18,height:18,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11}}>{cartCount}</span>}
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section style={{minHeight:"88vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",padding:"80px 24px 60px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse 80% 60% at 50% 40%,rgba(212,197,178,.2) 0%,transparent 70%)",pointerEvents:"none"}}/>
        <p className="fi s1" style={{fontSize:11,letterSpacing:"0.22em",color:"var(--accent)",textTransform:"uppercase",marginBottom:20}}>{T.tagline}</p>
        <h1 className="fi s2" style={{fontFamily:"var(--serif)",fontSize:"clamp(52px,10vw,110px)",fontWeight:300,lineHeight:1.05,marginBottom:24}}>
          {T.heroTitle1}<br/><em style={{color:"var(--accent)"}}>{T.heroTitle2}</em>
        </h1>
        <p className="fi s3" style={{fontSize:15,color:"var(--muted)",maxWidth:420,lineHeight:1.75,marginBottom:40}}>{T.heroDesc}</p>
        <div className="fi s3" style={{display:"flex",gap:12}}>
          <button onClick={()=>document.getElementById("shop").scrollIntoView({behavior:"smooth"})}
            style={{background:"var(--ink)",color:"var(--cream)",border:"none",padding:"14px 32px",fontSize:13,letterSpacing:"0.08em",cursor:"pointer",fontFamily:"var(--sans)"}}
            onMouseEnter={e=>e.currentTarget.style.opacity=".8"} onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
            {T.shopNow}
          </button>
          <button style={{background:"none",color:"var(--ink)",border:"1px solid var(--border)",padding:"14px 32px",fontSize:13,letterSpacing:"0.08em",cursor:"pointer",fontFamily:"var(--sans)"}}>{T.lookbook}</button>
        </div>
        <div style={{position:"absolute",top:"18%",right:"7%",background:"var(--warm)",border:"1px solid var(--border)",padding:"12px 16px",fontSize:12,color:"var(--muted)",boxShadow:"0 4px 20px rgba(0,0,0,.06)"}}>
          👶 Baby · 🧒 Kids · 🧑 Adults
        </div>
      </section>

      {/* CATEGORY BAR */}
      <div id="shop" style={{borderTop:"1px solid var(--border)",borderBottom:"1px solid var(--border)",display:"flex",justifyContent:"center"}}>
        {T.cats.map((cat,i)=>(
          <button key={cat} onClick={()=>setActiveCat(i)}
            style={{background:"none",border:"none",padding:"16px 28px",fontSize:12,letterSpacing:"0.1em",textTransform:"uppercase",cursor:"pointer",fontFamily:"var(--sans)",color:activeCat===i?"var(--ink)":"var(--muted)",borderBottom:activeCat===i?"2px solid var(--ink)":"2px solid transparent",transition:"all .2s"}}>
            {cat}
          </button>
        ))}
      </div>

      {/* PRODUCT GRID */}
      <section style={{maxWidth:1200,margin:"0 auto",padding:"60px 24px"}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:32}}>
          {filtered.map((p,i)=><PCard key={p.id} p={p} i={i} T={T} onOpen={()=>{setModal(p);setSelColor(0);}}/>)}
        </div>
      </section>

      {/* QUOTE */}
      <section style={{background:"var(--ink)",color:"var(--cream)",padding:"60px 24px",textAlign:"center"}}>
        <p style={{fontFamily:"var(--serif)",fontSize:"clamp(22px,4vw,40px)",fontWeight:300,letterSpacing:"0.04em",marginBottom:12}}>{T.quote}</p>
        <p style={{fontSize:11,letterSpacing:"0.16em",color:"var(--al)",textTransform:"uppercase"}}>ReKain — {T.est}</p>
      </section>

      {/* FEATURES */}
      <section style={{maxWidth:900,margin:"0 auto",padding:"80px 24px",display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:40}}>
        {[{icon:"📦",t:T.feat1t,d:T.feat1d},{icon:"✨",t:T.feat2t,d:T.feat2d},{icon:"🔄",t:T.feat3t,d:T.feat3d},{icon:"💬",t:T.feat4t,d:T.feat4d}].map(f=>(
          <div key={f.t} style={{textAlign:"center"}}>
            <div style={{fontSize:28,marginBottom:12}}>{f.icon}</div>
            <div style={{fontWeight:500,fontSize:14,marginBottom:6}}>{f.t}</div>
            <div style={{fontSize:13,color:"var(--muted)",lineHeight:1.6}}>{f.d}</div>
          </div>
        ))}
      </section>

      {/* FOOTER */}
      <footer style={{borderTop:"1px solid var(--border)",padding:"32px 24px",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12}}>
        <span style={{fontFamily:"var(--serif)",fontSize:18}}>Re<span style={{color:"var(--accent)"}}>Kain</span></span>
        <span style={{fontSize:12,color:"var(--muted)"}}>{T.footerCopy}</span>
        <div style={{display:"flex",gap:16}}>
          {["Instagram","TikTok","WhatsApp"].map(s=><span key={s} style={{fontSize:12,color:"var(--muted)",cursor:"pointer"}}>{s}</span>)}
        </div>
      </footer>

      {/* PRODUCT MODAL */}
      {modal&&(
        <div onClick={()=>setModal(null)} style={{position:"fixed",inset:0,background:"rgba(26,26,24,.5)",zIndex:200,display:"flex",alignItems:"center",justifyContent:"center",padding:24}}>
          <div onClick={e=>e.stopPropagation()} style={{background:"var(--warm)",maxWidth:480,width:"100%",padding:36,position:"relative",animation:"pop .28s ease"}}>
            <button onClick={()=>setModal(null)} style={{position:"absolute",top:16,right:16,background:"none",border:"none",fontSize:20,cursor:"pointer",color:"var(--muted)"}}>✕</button>
            <div style={{fontSize:64,textAlign:"center",background:"var(--cream)",padding:24,marginBottom:20}}>{modal.img}</div>
            {modal.tag&&<span style={{fontSize:10,letterSpacing:"0.14em",textTransform:"uppercase",background:"var(--accent)",color:"#fff",padding:"3px 10px"}}>{modal.tag==="New"?T.featNew:T.featBest}</span>}
            <h2 style={{fontFamily:"var(--serif)",fontSize:26,fontWeight:400,margin:"12px 0 4px"}}>{modal.name}</h2>
            <p style={{fontSize:12,color:"var(--muted)",marginBottom:4}}>{modal.cat}</p>
            <p style={{fontSize:20,fontFamily:"var(--serif)",color:"var(--accent)",marginBottom:20}}>{fmt(modal.price)}</p>
            <p style={{fontSize:11,letterSpacing:"0.08em",textTransform:"uppercase",color:"var(--muted)",marginBottom:8}}>{T.pickColor}</p>
            <div style={{display:"flex",gap:8,marginBottom:28}}>
              {modal.colors.map((c,i)=>(
                <button key={i} onClick={()=>setSelColor(i)}
                  style={{width:28,height:28,borderRadius:"50%",background:c,border:selColor===i?"2px solid var(--ink)":"2px solid transparent",outline:selColor===i?"2px solid var(--ink)":"none",outlineOffset:2,cursor:"pointer",transition:"all .15s"}}/>
              ))}
            </div>
            <button onClick={()=>addToCart(modal)}
              style={{width:"100%",background:"var(--ink)",color:"var(--cream)",border:"none",padding:16,fontSize:13,letterSpacing:"0.1em",cursor:"pointer",fontFamily:"var(--sans)"}}>
              {T.addCart}
            </button>
          </div>
        </div>
      )}

      {/* DRAWER */}
      {cartOpen&&(
        <>
          <div onClick={()=>setCartOpen(false)} style={{position:"fixed",inset:0,background:"rgba(26,26,24,.4)",zIndex:300}}/>
          <div style={{position:"fixed",top:0,right:0,bottom:0,width:"min(440px,100vw)",background:"var(--warm)",zIndex:301,display:"flex",flexDirection:"column",boxShadow:"-4px 0 30px rgba(0,0,0,.1)",animation:"sli .3s ease"}}>

            {step==="success-wa"||step==="success-va" ? (
              /* SUCCESS */
              <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:40,textAlign:"center"}}>
                <div style={{fontSize:56,marginBottom:20}}>{step==="success-wa"?"💬":"✅"}</div>
                <h2 style={{fontFamily:"var(--serif)",fontSize:28,fontWeight:400,marginBottom:12}}>{T.successTitle}</h2>
                <p style={{fontSize:13,color:"var(--muted)",lineHeight:1.75,maxWidth:300,marginBottom:32}}>{step==="success-wa"?T.successWa:T.successVa}</p>
                <button onClick={resetAll} style={{background:"var(--ink)",color:"var(--cream)",border:"none",padding:"14px 32px",fontSize:13,cursor:"pointer",fontFamily:"var(--sans)",letterSpacing:"0.08em"}}>{T.backShop}</button>
              </div>

            ) : step==="va" ? (
              /* VA SCREEN */
              <>
                <div style={{padding:"18px 24px",borderBottom:"1px solid var(--border)",display:"flex",justifyContent:"space-between",alignItems:"center",flexShrink:0}}>
                  <button onClick={()=>setStep("form")} style={{background:"none",border:"none",fontSize:13,cursor:"pointer",color:"var(--muted)",fontFamily:"var(--sans)"}}>{T.back}</button>
                  <span style={{fontFamily:"var(--serif)",fontSize:18}}>Virtual Account</span>
                  <div style={{width:60}}/>
                </div>
                <div style={{flex:1,overflow:"auto",padding:24}}>
                  <div style={{display:"flex",gap:8,marginBottom:24}}>
                    {VA_ACCOUNTS.map((v,i)=>(
                      <button key={v.bank} onClick={()=>setSelVa(i)}
                        style={{flex:1,background:selVa===i?"var(--ink)":"var(--cream)",color:selVa===i?"var(--cream)":"var(--muted)",border:"1px solid var(--border)",padding:"10px 6px",fontSize:13,cursor:"pointer",fontFamily:"var(--sans)",fontWeight:500,transition:"all .2s"}}>
                        {v.logo} {v.bank}
                      </button>
                    ))}
                  </div>
                  <div style={{background:"var(--cream)",border:"1px solid var(--border)",padding:24,marginBottom:20,textAlign:"center"}}>
                    <p style={{fontSize:11,letterSpacing:"0.12em",textTransform:"uppercase",color:"var(--muted)",marginBottom:8}}>{VA_ACCOUNTS[selVa].bank} Virtual Account</p>
                    <p style={{fontFamily:"var(--serif)",fontSize:32,letterSpacing:"0.1em",color:"var(--ink)",marginBottom:4}}>{VA_ACCOUNTS[selVa].va}</p>
                    <p style={{fontSize:12,color:"var(--muted)",marginBottom:16}}>{VA_ACCOUNTS[selVa].name}</p>
                    <button onClick={()=>copyVa(VA_ACCOUNTS[selVa].va)}
                      style={{background:copied?"#4A7C59":"var(--accent)",color:"#fff",border:"none",padding:"8px 24px",fontSize:12,cursor:"pointer",fontFamily:"var(--sans)",letterSpacing:"0.08em",transition:"background .2s"}}>
                      {copied?`✓ ${T.vaCopied}`:`📋 ${T.vaCopy}`}
                    </button>
                  </div>
                  <p style={{fontSize:13,color:"var(--muted)",marginBottom:8}}>{T.vaInstructions}</p>
                  <div style={{background:"var(--ink)",color:"var(--cream)",padding:"16px 20px",display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
                    <span style={{fontSize:13}}>{T.total}</span>
                    <span style={{fontFamily:"var(--serif)",fontSize:22}}>{fmt(cartTotal)}</span>
                  </div>
                  <p style={{fontSize:12,color:"var(--muted)",lineHeight:1.7}}>⚠ {T.vaNote}</p>
                </div>
                <div style={{padding:24,borderTop:"1px solid var(--border)",flexShrink:0}}>
                  <button onClick={handleVaConfirm}
                    style={{width:"100%",background:"var(--green)",color:"#fff",border:"none",padding:16,fontSize:13,cursor:"pointer",fontFamily:"var(--sans)",letterSpacing:"0.08em"}}>
                    💬 {T.confirmVa}
                  </button>
                </div>
              </>

            ) : step==="form" ? (
              /* FORM SCREEN */
              <>
                <div style={{padding:"18px 24px",borderBottom:"1px solid var(--border)",display:"flex",justifyContent:"space-between",alignItems:"center",flexShrink:0}}>
                  <button onClick={()=>setStep("cart")} style={{background:"none",border:"none",fontSize:13,cursor:"pointer",color:"var(--muted)",fontFamily:"var(--sans)"}}>{T.back}</button>
                  <span style={{fontFamily:"var(--serif)",fontSize:18}}>{T.shippingDetail}</span>
                  <div style={{width:60}}/>
                </div>
                <div style={{flex:1,overflow:"auto",padding:24}}>
                  {[
                    {label:T.fullName,key:"name",type:"text",ph:"e.g. Hestia"},
                    {label:T.waNumber,key:"phone",type:"tel",ph:"08xxxxxxxxxx"},
                    {label:T.address,key:"address",type:"text",ph:T.placeholderAddress},
                    {label:T.notes,key:"notes",type:"text",ph:T.placeholderNotes},
                  ].map(f=>(
                    <div key={f.key} style={{marginBottom:16}}>
                      <label style={{display:"block",fontSize:11,letterSpacing:"0.1em",textTransform:"uppercase",color:"var(--muted)",marginBottom:6}}>{f.label}</label>
                      <input value={form[f.key]} onChange={e=>setForm(p=>({...p,[f.key]:e.target.value}))}
                        type={f.type} placeholder={f.ph}
                        style={{width:"100%",border:"1px solid var(--border)",background:"var(--cream)",padding:"12px 14px",fontSize:14,fontFamily:"var(--sans)",outline:"none",color:"var(--ink)",transition:"border .2s"}}/>
                    </div>
                  ))}
                  <p style={{fontSize:11,letterSpacing:"0.1em",textTransform:"uppercase",color:"var(--muted)",marginBottom:10,marginTop:8}}>{T.payMethod}</p>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16}}>
                    {[{key:"wa",label:T.payWa,icon:"💬"},{key:"va",label:T.payVa,icon:"🏦"}].map(m=>(
                      <button key={m.key} onClick={()=>setPayMethod(m.key)}
                        style={{background:payMethod===m.key?"var(--ink)":"var(--cream)",color:payMethod===m.key?"var(--cream)":"var(--muted)",border:"1px solid var(--border)",padding:"12px 8px",fontSize:12,cursor:"pointer",fontFamily:"var(--sans)",lineHeight:1.5,transition:"all .2s",textAlign:"center"}}>
                        <div style={{fontSize:20,marginBottom:4}}>{m.icon}</div>{m.label}
                      </button>
                    ))}
                  </div>
                  <div style={{background:"var(--cream)",padding:16}}>
                    <div style={{display:"flex",justifyContent:"space-between",fontSize:13,color:"var(--muted)",marginBottom:6}}>
                      <span>{cartCount} {T.items}</span><span>{fmt(cartTotal)}</span>
                    </div>
                    <div style={{display:"flex",justifyContent:"space-between",fontSize:14}}>
                      <span>{T.shipping}</span><span style={{color:"var(--accent)",fontSize:12}}>{T.negotiate}</span>
                    </div>
                  </div>
                  {err&&<p style={{color:"#C0392B",fontSize:12,marginTop:12}}>⚠ {T.required}</p>}
                </div>
                <div style={{padding:24,borderTop:"1px solid var(--border)",flexShrink:0}}>
                  <button onClick={handleProceed}
                    style={{width:"100%",background:payMethod==="wa"?"var(--green)":"var(--ink)",color:"#fff",border:"none",padding:16,fontSize:13,cursor:"pointer",fontFamily:"var(--sans)",letterSpacing:"0.08em"}}>
                    {payMethod==="wa"?`💬 ${T.confirmWa}`:`🏦 ${T.confirmVa}`}
                  </button>
                </div>
              </>

            ) : (
              /* CART SCREEN */
              <>
                <div style={{padding:"18px 24px",borderBottom:"1px solid var(--border)",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <span style={{fontFamily:"var(--serif)",fontSize:20}}>{T.cart}</span>
                  <button onClick={()=>setCartOpen(false)} style={{background:"none",border:"none",fontSize:20,cursor:"pointer",color:"var(--muted)"}}>✕</button>
                </div>
                <div style={{flex:1,overflow:"auto",padding:"8px 24px"}}>
                  {cart.length===0?(
                    <div style={{textAlign:"center",padding:60}}>
                      <div style={{fontSize:40,marginBottom:12}}>🛍️</div>
                      <p style={{color:"var(--muted)",fontSize:13}}>{T.emptyCart}</p>
                    </div>
                  ):cart.map(item=>(
                    <div key={item.id} style={{display:"flex",gap:14,padding:"16px 0",borderBottom:"1px solid var(--border)"}}>
                      <div style={{fontSize:34,background:"var(--cream)",width:54,height:54,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{item.img}</div>
                      <div style={{flex:1}}>
                        <p style={{fontSize:14,marginBottom:2}}>{item.name}</p>
                        <p style={{fontSize:12,color:"var(--muted)",marginBottom:8}}>{fmt(item.price)}</p>
                        <div style={{display:"flex",alignItems:"center",gap:10}}>
                          <button onClick={()=>updateQty(item.id,-1)} style={{width:24,height:24,border:"1px solid var(--border)",background:"none",cursor:"pointer",fontSize:14,display:"flex",alignItems:"center",justifyContent:"center"}}>−</button>
                          <span style={{fontSize:13,minWidth:16,textAlign:"center"}}>{item.qty}</span>
                          <button onClick={()=>updateQty(item.id,+1)} style={{width:24,height:24,border:"1px solid var(--border)",background:"none",cursor:"pointer",fontSize:14,display:"flex",alignItems:"center",justifyContent:"center"}}>+</button>
                        </div>
                      </div>
                      <p style={{fontFamily:"var(--serif)",fontSize:15,flexShrink:0}}>{fmt(item.price*item.qty)}</p>
                    </div>
                  ))}
                </div>
                {cart.length>0&&(
                  <div style={{padding:24,borderTop:"1px solid var(--border)",flexShrink:0}}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:16}}>
                      <span style={{fontSize:13,color:"var(--muted)"}}>{T.subtotal}</span>
                      <span style={{fontFamily:"var(--serif)",fontSize:16}}>{fmt(cartTotal)}</span>
                    </div>
                    <button onClick={()=>setStep("form")}
                      style={{width:"100%",background:"var(--ink)",color:"var(--cream)",border:"none",padding:16,fontSize:13,cursor:"pointer",fontFamily:"var(--sans)",letterSpacing:"0.08em"}}>
                      {T.toCheckout}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </>
      )}
    </>
  );
}

function PCard({ p, i, T, onOpen }) {
  const [hov, setHov] = useState(false);
  return (
    <div className={`fi s${(i%3)+1}`} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)} style={{cursor:"pointer"}} onClick={onOpen}>
      <div style={{background:"var(--warm)",aspectRatio:"3/4",display:"flex",alignItems:"center",justifyContent:"center",fontSize:64,position:"relative",overflow:"hidden",transition:"transform .3s",transform:hov?"scale(1.02)":"scale(1)"}}>
        {p.img}
        {p.tag&&<span style={{position:"absolute",top:12,left:12,fontSize:10,letterSpacing:"0.14em",textTransform:"uppercase",background:"var(--accent)",color:"#fff",padding:"4px 10px"}}>{p.tag==="New"?T.featNew:T.featBest}</span>}
        <div style={{position:"absolute",inset:0,background:"rgba(26,26,24,.04)",opacity:hov?1:0,transition:"opacity .3s"}}/>
        <button style={{position:"absolute",bottom:12,left:"50%",transform:hov?"translateX(-50%) translateY(0)":"translateX(-50%) translateY(40px)",opacity:hov?1:0,transition:"all .25s",background:"var(--ink)",color:"var(--cream)",border:"none",padding:"10px 24px",fontSize:11,letterSpacing:"0.1em",cursor:"pointer",fontFamily:"var(--sans)",whiteSpace:"nowrap"}}>
          {T.viewDetail}
        </button>
      </div>
      <div style={{padding:"14px 0"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline"}}>
          <p style={{fontSize:14}}>{p.name}</p>
          <p style={{fontFamily:"var(--serif)",fontSize:15,color:"var(--accent)"}}>{fmt(p.price)}</p>
        </div>
        <p style={{fontSize:11,color:"var(--muted)",marginTop:2,letterSpacing:"0.06em"}}>{p.cat}</p>
        <div style={{display:"flex",gap:5,marginTop:8}}>
          {p.colors.map((c,j)=><div key={j} style={{width:12,height:12,borderRadius:"50%",background:c,border:"1px solid rgba(0,0,0,.1)"}}/>)}
        </div>
      </div>
    </div>
  );
}
