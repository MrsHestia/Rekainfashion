import { useState, useRef, useEffect } from "react";

// ─── Sesuaikan info produk & kontak REKAIN kamu di sini ─────────────────────
const SYSTEM_PROMPT = `Kamu adalah Reika, asisten virtual AI untuk REKAIN — brand karya seni handmade berbahan kain perca dari Medan, Indonesia.

FILOSOFI REKAIN:
REKAIN percaya bahwa tidak ada kain yang benar-benar "sampah". Setiap helai kain perca yang dibuang memiliki potensi menjadi karya bernilai tinggi. Dengan tangan-tangan terampil, kain sisa produksi dari pabrik garmen menjadi aksesori, tas, dan pakaian yang bernilai jual tinggi.

PRODUK REKAIN (semua handmade, one-of-a-kind):
- Tas & Tote Bag perca: Rp 85.000 - Rp 250.000
- Dompet & Pouch perca: Rp 45.000 - Rp 120.000
- Outer & Jaket patchwork: Rp 250.000 - Rp 650.000
- Aksesori (scrunchie, headband, bucket hat): Rp 25.000 - Rp 95.000
- Home decor (taplak, sarung bantal, wall art): Rp 75.000 - Rp 350.000
- Custom order tersedia — waktu produksi 5-10 hari kerja

KEUNIKAN PRODUK:
- Setiap produk one-of-a-kind, tidak ada yang sama persis
- Material: kain perca sisa produksi garmen, kain batik bekas, denim, dll
- 100% handmade oleh pengrajin lokal Medan
- Setiap pembelian berkontribusi mengurangi limbah tekstil

CARA ORDER & PEMBAYARAN:
- Order via website atau WhatsApp
- Pembayaran: Transfer bank BCA/BRI, QRIS
- Pengiriman: JNE, J&T, SiCepat — gratis ongkir Medan kota untuk pembelian min Rp 200.000
- Same-day delivery tersedia untuk area Medan

TUGASMU:
1. Ceritakan filosofi REKAIN dengan penuh passion saat ditanya
2. Bantu pelanggan menemukan produk yang cocok untuk kebutuhan dan budget mereka
3. Jelaskan bahwa setiap produk unik — tidak ada stok yang sama dua kali
4. Guide proses order step-by-step
5. Untuk pertanyaan yang tidak kamu ketahui, arahkan ke WA tim REKAIN

Gunakan bahasa yang hangat, autentik, dan penuh semangat.
Jawab dalam bahasa yang sama dengan pelanggan (Indonesia/English).
Ringkas tapi berkesan.`;

const QUICK_ACTIONS = [
  { label: "Filosofi REKAIN", prompt: "Ceritakan filosofi dan cerita di balik REKAIN" },
  { label: "Lihat Produk", prompt: "Produk apa saja yang tersedia di REKAIN?" },
  { label: "Cara Order", prompt: "Bagaimana cara order dan pembayaran?" },
  { label: "Custom Order", prompt: "Saya ingin custom order, bagaimana prosesnya?" },
  { label: "Rekomendasi Hadiah", prompt: "Bantu saya pilih produk yang cocok sebagai hadiah" },
];
// ─────────────────────────────────────────────────────────────────────────────

export default function RekainChatbot() {
  const [isOpen, setIsOpen]   = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Halo! Selamat datang di REKAIN.\n\nKami mengubah kain perca yang terbuang menjadi karya seni bernilai — satu helai, satu cerita.\n\nSaya Reika, siap membantu kamu menemukan produk yang tepat untuk kebutuhan dan budget kamu.",
    },
  ]);
  const [input,    setInput]   = useState("");
  const [loading,  setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef       = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const sendMessage = async (text) => {
    const content = (text ?? input).trim();
    if (!content || loading) return;

    const updated = [...messages, { role: "user", content }];
    setMessages(updated);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": import.meta.env.VITE_ANTHROPIC_API_KEY,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-calls": "true",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: updated.map(({ role, content: c }) => ({ role, content: c })),
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error?.message ?? `HTTP ${res.status}`);
      }

      const data  = await res.json();
      const reply =
        data.content?.find((b) => b.type === "text")?.text ??
        "Maaf, terjadi kesalahan. Silakan coba lagi.";

      setMessages([...updated, { role: "assistant", content: reply }]);
    } catch (err) {
      console.error("[REKAIN Chatbot]", err);
      setMessages([
        ...updated,
        {
          role: "assistant",
          content: err.message.includes("HTTP")
            ? `Terjadi kesalahan (${err.message}). Coba lagi atau hubungi tim kami.`
            : "Koneksi terputus. Silakan coba beberapa saat lagi.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const isFirst = messages.length === 1;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        .rk-window {
          position: fixed; bottom: 90px; right: 24px;
          width: 360px; height: 520px;
          background: #F9F5EE; border-radius: 20px;
          border: 1px solid #D4C4A8;
          display: flex; flex-direction: column; overflow: hidden;
          box-shadow: 0 16px 48px rgba(28,16,7,.18);
          z-index: 9998 !important; font-family: 'DM Sans', sans-serif;
          animation: rk-up .25s ease;
        }
        .rk-msgs {
          flex: 1; overflow-y: auto; padding: 18px;
          display: flex; flex-direction: column; gap: 14px;
          scroll-behavior: smooth;
        }
        .rk-msgs::-webkit-scrollbar { width: 4px; }
        .rk-msgs::-webkit-scrollbar-thumb { background: #D4C4A8; border-radius: 4px; }

        .rk-bot-row { display: flex; align-items: flex-end; gap: 8px; animation: rk-fade .25s ease; }
        .rk-usr-row { display: flex; justify-content: flex-end; animation: rk-fade .25s ease; }

        .rk-avatar {
          width: 28px; height: 28px; border-radius: 50%; background: #C8A252;
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
          font-family: 'Cormorant Garamond', serif; font-size: 13px; font-weight: 600; color: #1C1007;
        }
        .rk-bot-bubble {
          max-width: 80%; background: #fff; border: 1px solid #E8DCC8;
          border-radius: 16px 16px 16px 4px; padding: 11px 15px;
          font-size: 13px; line-height: 1.7; color: #2C1A05; white-space: pre-line;
        }
        .rk-usr-bubble {
          max-width: 78%; background: #1C1007;
          border-radius: 16px 16px 4px 16px; padding: 11px 15px;
          font-size: 13px; line-height: 1.7; color: #F9F5EE; white-space: pre-line;
        }
        .rk-quick {
          padding: 6px 13px; background: none; border: 1px solid #C8A252;
          border-radius: 20px; color: #8B6520; font-size: 12px; cursor: pointer;
          font-family: 'DM Sans', sans-serif; transition: background .15s;
        }
        .rk-quick:hover { background: #F5EDD8; }

        .rk-input-area {
          padding: 12px 14px; border-top: 1px solid #E0D4BE; background: #F9F5EE;
          display: flex; gap: 9px; align-items: center;
        }
        .rk-input {
          flex: 1; padding: 9px 15px; border: 1px solid #C8B89A; border-radius: 22px;
          background: #fff; color: #2C1A05; font-size: 13px;
          font-family: 'DM Sans', sans-serif; outline: none; transition: border-color .2s;
        }
        .rk-input:focus { border-color: #C8A252; }
        .rk-input::placeholder { color: #B0A090; }

        .rk-send {
          width: 40px; height: 40px; background: #1C1007; border: none; border-radius: 50%;
          cursor: pointer; display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; transition: opacity .2s;
        }
        .rk-send:disabled { opacity: .4; cursor: not-allowed; }

        .rk-toggle {
          position: fixed; bottom: 24px; right: 24px;
          width: 58px; height: 58px; background: #1C1007;
          border: 2px solid #C8A252; border-radius: 50%; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          z-index: 9999 !important; box-shadow: 0 4px 20px rgba(28,16,7,.25);
          transition: transform .2s, box-shadow .2s;
        }
        .rk-toggle:hover { transform: scale(1.06); box-shadow: 0 6px 28px rgba(28,16,7,.35); }

        .rk-dot {
          width: 6px; height: 6px; border-radius: 50%; background: #C8A252;
          animation: rk-dot 1.4s infinite;
        }
        .rk-dot:nth-child(2) { animation-delay: .2s; }
        .rk-dot:nth-child(3) { animation-delay: .4s; }

        @keyframes rk-dot  { 0%,80%,100%{opacity:.2;transform:scale(.7)} 40%{opacity:1;transform:scale(1)} }
        @keyframes rk-up   { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        @keyframes rk-fade { from{opacity:0;transform:translateY(4px)}  to{opacity:1;transform:translateY(0)} }

        @media(max-width:400px){
          .rk-window { right:12px; left:12px; width:auto; bottom:84px; }
        }
      `}</style>

      {/* ── Chat Window ── */}
      {isOpen && (
        <div className="rk-window">

          {/* Header */}
          <div style={{ background:"#1C1007", padding:"16px 18px", display:"flex", alignItems:"center", gap:13 }}>
            <div style={{ width:40, height:40, borderRadius:"50%", background:"linear-gradient(135deg,#C8A252,#8B6520)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, borderRadius:"50%", border:"2px solid #8B6520" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1C1007" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </div>
            <div>
              <p style={{ margin:0, color:"#F9F5EE", fontFamily:"'Cormorant Garamond',serif", fontSize:15, fontWeight:600, letterSpacing:"0.04em" }}>Reika · REKAIN</p>
              <p style={{ margin:0, color:"#C8A252", fontSize:10, fontWeight:300, letterSpacing:"0.08em", textTransform:"uppercase", marginTop:1 }}>Karya Seni dari Kain Perca</p>
            </div>
            <div style={{ marginLeft:"auto", display:"flex", alignItems:"center", gap:5 }}>
              <div style={{ width:7, height:7, borderRadius:"50%", background:"#5DB880" }}/>
              <span style={{ color:"#5DB880", fontSize:11 }}>Online</span>
            </div>
            <button onClick={() => setIsOpen(false)} style={{ background:"none", border:"none", color:"#C8A252", cursor:"pointer", fontSize:22, lineHeight:1, marginLeft:6, padding:2 }}>×</button>
          </div>

          {/* Messages */}
          <div className="rk-msgs">
            {messages.map((msg, i) =>
              msg.role === "assistant" ? (
                <div key={i} className="rk-bot-row">
                  <div className="rk-avatar">R</div>
                  <div className="rk-bot-bubble">{msg.content}</div>
                </div>
              ) : (
                <div key={i} className="rk-usr-row">
                  <div className="rk-usr-bubble">{msg.content}</div>
                </div>
              )
            )}

            {/* Quick action pills — only on opening message */}
            {isFirst && (
              <div style={{ display:"flex", flexWrap:"wrap", gap:8, paddingLeft:36 }}>
                {QUICK_ACTIONS.map((a, i) => (
                  <button key={i} className="rk-quick" onClick={() => sendMessage(a.prompt)}>
                    {a.label}
                  </button>
                ))}
              </div>
            )}

            {/* Typing indicator */}
            {loading && (
              <div className="rk-bot-row">
                <div className="rk-avatar">R</div>
                <div style={{ background:"#fff", border:"1px solid #E8DCC8", borderRadius:"16px 16px 16px 4px", padding:"10px 14px", display:"flex", gap:5, alignItems:"center" }}>
                  <div className="rk-dot"/><div className="rk-dot"/><div className="rk-dot"/>
                </div>
              </div>
            )}

            <div ref={messagesEndRef}/>
          </div>

          {/* Input */}
          <div className="rk-input-area">
            <input
              ref={inputRef}
              className="rk-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
              placeholder="Tanya soal produk, filosofi, atau cara order..."
            />
            <button className="rk-send" onClick={() => sendMessage()} disabled={loading || !input.trim()}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#C8A252" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"/>
                <polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* ── Toggle Button ── */}
      <button className="rk-toggle" onClick={() => setIsOpen((o) => !o)} aria-label="Buka chat REKAIN">
        {isOpen ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C8A252" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C8A252" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
        )}
      </button>
    </>
  );
}
