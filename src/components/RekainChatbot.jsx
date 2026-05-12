import { useState, useRef, useEffect } from "react";

const SYSTEM_PROMPT = `Kamu adalah Reika, asisten virtual AI untuk REKAIN — brand fashion batik premium Indonesia (Maison du Batik), berlokasi di Medan, Sumatera Utara.

TENTANG REKAIN:
- Brand batik premium yang menggabungkan warisan tradisional dengan desain kontemporer
- Produk: dress batik, kemeja batik, outer/blazer batik, rok batik, aksesori batik
- Koleksi unggulan: Mega Mendung Series, Parang Royal, Kawung Modern, Truntum Kontemporer
- Material: katun prima, katun sutera, silk batik tulis

UKURAN & HARGA:
- Ukuran: XS, S, M, L, XL, XXL — tersedia custom size
- Kemeja/Blouse: Rp 150.000 - Rp 350.000
- Dress: Rp 250.000 - Rp 650.000
- Outer/Blazer: Rp 450.000 - Rp 1.200.000
- Custom order: tambah 20-30% dari harga standar, waktu produksi 3-7 hari kerja

CARA ORDER & PEMBAYARAN:
- Order via website atau WhatsApp
- Pembayaran: Transfer bank BCA/BRI, QRIS (scan langsung)
- Konfirmasi pembayaran: upload bukti transfer di website atau via WA
- Pengiriman: JNE, J&T, SiCepat — gratis ongkir Medan kota untuk pembelian min Rp 300.000
- Same-day delivery tersedia untuk area Medan

TUGASMU:
1. Jawab pertanyaan produk dengan detail dan ramah
2. Bantu rekomendasikan produk berdasarkan acara, budget, dan ukuran
3. Guide proses order step-by-step
4. Konfirmasi pembayaran: minta pelanggan upload bukti atau hubungi WA tim REKAIN
5. Jika ada pertanyaan yang tidak kamu ketahui, arahkan ke tim via WA dengan sopan

Gunakan bahasa yang hangat, elegan, dan profesional.
Jawab dalam bahasa yang sama dengan pelanggan (Indonesia/English).
Ringkas tapi informatif.`;

const QUICK_ACTIONS = [
  { label: "Koleksi", prompt: "Tampilkan koleksi batik REKAIN yang tersedia" },
  { label: "Cara Order", prompt: "Bagaimana cara order dan pembayaran di REKAIN?" },
  { label: "Ukuran & Harga", prompt: "Info ukuran dan harga produk batik REKAIN" },
  { label: "Custom Batik", prompt: "Saya ingin pesan batik custom, apa saja yang bisa dikustomisasi?" },
  { label: "Rekomendasi", prompt: "Bantu saya memilih batik yang cocok untuk saya" },
];

export default function RekainChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Selamat datang di REKAIN — Maison du Batik.\n\nSaya Reika, asisten virtual Anda. Saya siap membantu soal koleksi, ukuran, harga, pemesanan, hingga rekomendasi batik yang tepat untuk Anda.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const sendMessage = async (text) => {
    const content = (text || input).trim();
    if (!content || loading) return;

    const newMessages = [...messages, { role: "user", content }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await response.json();
      const reply =
        data.content?.[0]?.text ||
        "Maaf, terjadi kesalahan. Silakan coba lagi.";
      setMessages([...newMessages, { role: "assistant", content: reply }]);
    } catch {
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: "Koneksi terputus. Silakan coba beberapa saat lagi.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const isFirstMessage = messages.length === 1;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        
        .rekain-chat-window {
          position: fixed;
          bottom: 90px;
          right: 24px;
          width: 360px;
          height: 520px;
          background: #F9F5EE;
          border-radius: 20px;
          border: 1px solid #D4C4A8;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          box-shadow: 0 16px 48px rgba(28, 16, 7, 0.18);
          z-index: 9998;
          font-family: 'DM Sans', sans-serif;
          animation: rekainSlideUp 0.25s ease;
        }

        .rekain-toggle {
          position: fixed;
          bottom: 24px;
          right: 24px;
          width: 58px;
          height: 58px;
          background: #1C1007;
          border: 2px solid #C8A252;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          box-shadow: 0 4px 20px rgba(28, 16, 7, 0.25);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .rekain-toggle:hover {
          transform: scale(1.06);
          box-shadow: 0 6px 28px rgba(28, 16, 7, 0.35);
        }

        .rekain-messages {
          flex: 1;
          overflow-y: auto;
          padding: 18px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          scroll-behavior: smooth;
        }

        .rekain-messages::-webkit-scrollbar { width: 4px; }
        .rekain-messages::-webkit-scrollbar-track { background: transparent; }
        .rekain-messages::-webkit-scrollbar-thumb { background: #D4C4A8; border-radius: 4px; }

        .rekain-bubble-assistant {
          display: flex;
          align-items: flex-end;
          gap: 8px;
          animation: rekainFadeIn 0.25s ease;
        }

        .rekain-bubble-user {
          display: flex;
          justify-content: flex-end;
          animation: rekainFadeIn 0.25s ease;
        }

        .rekain-msg-assistant {
          max-width: 80%;
          background: #FFFFFF;
          border: 1px solid #E8DCC8;
          border-radius: 16px 16px 16px 4px;
          padding: 11px 15px;
          font-size: 13px;
          line-height: 1.65;
          color: #2C1A05;
          white-space: pre-line;
        }

        .rekain-msg-user {
          max-width: 78%;
          background: #1C1007;
          border-radius: 16px 16px 4px 16px;
          padding: 11px 15px;
          font-size: 13px;
          line-height: 1.65;
          color: #F9F5EE;
          white-space: pre-line;
        }

        .rekain-avatar {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #C8A252;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          font-family: 'Cormorant Garamond', serif;
          font-size: 13px;
          font-weight: 600;
          color: #1C1007;
        }

        .rekain-quick-btn {
          padding: 6px 13px;
          background: none;
          border: 1px solid #C8A252;
          border-radius: 20px;
          color: #8B6520;
          font-size: 12px;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          transition: background 0.15s;
        }

        .rekain-quick-btn:hover { background: #F5EDD8; }

        .rekain-input-area {
          padding: 12px 14px;
          border-top: 1px solid #E0D4BE;
          background: #F9F5EE;
          display: flex;
          gap: 9px;
          align-items: center;
        }

        .rekain-input {
          flex: 1;
          padding: 9px 15px;
          border: 1px solid #C8B89A;
          border-radius: 22px;
          background: #FFFFFF;
          color: #2C1A05;
          font-size: 13px;
          font-family: 'DM Sans', sans-serif;
          outline: none;
          transition: border-color 0.2s;
        }

        .rekain-input:focus { border-color: #C8A252; }
        .rekain-input::placeholder { color: #B0A090; }

        .rekain-send-btn {
          width: 40px;
          height: 40px;
          background: #1C1007;
          border: none;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: opacity 0.2s;
        }

        .rekain-send-btn:disabled { opacity: 0.4; cursor: not-allowed; }

        .rekain-typing {
          display: flex;
          align-items: flex-end;
          gap: 8px;
        }

        .rekain-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #C8A252;
          animation: rekainDot 1.4s infinite;
        }

        .rekain-dot:nth-child(2) { animation-delay: 0.2s; }
        .rekain-dot:nth-child(3) { animation-delay: 0.4s; }

        @keyframes rekainDot {
          0%, 80%, 100% { opacity: 0.2; transform: scale(0.7); }
          40% { opacity: 1; transform: scale(1); }
        }

        @keyframes rekainSlideUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes rekainFadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 400px) {
          .rekain-chat-window {
            right: 12px;
            left: 12px;
            width: auto;
            bottom: 84px;
          }
        }
      `}</style>

      {/* Chat Window */}
      {isOpen && (
        <div className="rekain-chat-window">
          {/* Header */}
          <div style={{ background: "#1C1007", padding: "16px 18px", display: "flex", alignItems: "center", gap: "13px" }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg, #C8A252, #8B6520)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, border: "1.5px solid #C8A252" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1C1007" strokeWidth="2.5" strokeLinecap="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M8 12h8M12 8v8" />
              </svg>
            </div>
            <div>
              <p style={{ margin: 0, color: "#F9F5EE", fontFamily: "'Cormorant Garamond', serif", fontSize: 15, fontWeight: 600, letterSpacing: "0.04em" }}>Reika · REKAIN</p>
              <p style={{ margin: 0, color: "#C8A252", fontSize: 10, fontWeight: 300, letterSpacing: "0.08em", textTransform: "uppercase", marginTop: 1 }}>Asisten Virtual Maison du Batik</p>
            </div>
            <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 5 }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#5DB880" }} />
              <span style={{ color: "#5DB880", fontSize: 11 }}>Online</span>
            </div>
            <button onClick={() => setIsOpen(false)} style={{ background: "none", border: "none", color: "#C8A252", cursor: "pointer", fontSize: 22, lineHeight: 1, marginLeft: 6, padding: 2 }}>×</button>
          </div>

          {/* Messages */}
          <div className="rekain-messages">
            {messages.map((msg, i) => (
              <div key={i}>
                {msg.role === "assistant" ? (
                  <div className="rekain-bubble-assistant">
                    <div className="rekain-avatar">R</div>
                    <div className="rekain-msg-assistant">{msg.content}</div>
                  </div>
                ) : (
                  <div className="rekain-bubble-user">
                    <div className="rekain-msg-user">{msg.content}</div>
                  </div>
                )}
              </div>
            ))}

            {/* Quick Actions - only on first message */}
            {isFirstMessage && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, paddingLeft: 36 }}>
                {QUICK_ACTIONS.map((action, i) => (
                  <button key={i} className="rekain-quick-btn" onClick={() => sendMessage(action.prompt)}>
                    {action.label}
                  </button>
                ))}
              </div>
            )}

            {/* Typing indicator */}
            {loading && (
              <div className="rekain-typing">
                <div className="rekain-avatar">R</div>
                <div style={{ background: "#FFFFFF", border: "1px solid #E8DCC8", borderRadius: "16px 16px 16px 4px", padding: "10px 14px", display: "flex", gap: 5, alignItems: "center" }}>
                  <div className="rekain-dot" />
                  <div className="rekain-dot" />
                  <div className="rekain-dot" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="rekain-input-area">
            <input
              ref={inputRef}
              className="rekain-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Tanya soal koleksi, harga, atau order..."
            />
            <button className="rekain-send-btn" onClick={() => sendMessage()} disabled={loading || !input.trim()}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#C8A252" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button className="rekain-toggle" onClick={() => setIsOpen((o) => !o)} aria-label="Buka chat REKAIN">
        {isOpen ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C8A252" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C8A252" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>
    </>
  );
}
