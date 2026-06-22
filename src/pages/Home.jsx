// src/pages/Home.jsx

export default function Home() {
  return (
    <>
      {/* NAVBAR (dari rekain-store) */}
      <div style={{
        padding: "20px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid #eee"
      }}>
        <h2>REKAIN</h2>

        <div style={{ display: "flex", gap: "20px" }}>
          <span>Home</span>
          <span>Products</span>
          <span>About</span>
          <span>Contact</span>
        </div>
      </div>

      {/* HERO */}
      <div style={{
        padding: "80px 40px",
        textAlign: "center",
        background: "#f9f5ee"
      }}>
        <h1 style={{ fontSize: "48px" }}>
          REKAIN — From Waste to Art
        </h1>
        <p style={{ fontSize: "18px", marginTop: "10px" }}>
          Mengubah kain perca menjadi karya fashion bernilai tinggi
        </p>
      </div>

      {/* VALUES / ABOUT */}
      <div style={{ padding: "60px 40px" }}>
        <h2>Tentang REKAIN</h2>
        <p>
          REKAIN adalah brand handmade dari Medan yang mengubah kain sisa menjadi produk unik dan berkelanjutan.
        </p>
      </div>

      {/* PRODUCTS */}
      <div style={{ padding: "60px 40px", background: "#fafafa" }}>
        <h2>Produk</h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px", marginTop: "20px" }}>
          <div>Tas & Tote Bag</div>
          <div>Dompet & Pouch</div>
          <div>Outer & Jaket</div>
          <div>Aksesoris</div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{
        padding: "30px",
        textAlign: "center",
        borderTop: "1px solid #eee"
      }}>
        © 2026 REKAIN
      </div>
    </>
  );
}
