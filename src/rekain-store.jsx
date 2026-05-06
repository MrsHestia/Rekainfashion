import React, { useEffect } from 'react';

const RekainStore = () => {
  useEffect(() => {
    /* ── Custom cursor logic ── */
    const dot = document.getElementById('cursorDot');
    const ring = document.getElementById('cursorRing');
    let mx = 0, my = 0, rx = 0, ry = 0;
    
    const handleMouseMove = (e) => { mx = e.clientX; my = e.clientY; };
    document.addEventListener('mousemove', handleMouseMove);

    const animCursor = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      if (dot) { dot.style.left = mx + 'px'; dot.style.top = my + 'px'; }
      if (ring) { ring.style.left = rx + 'px'; ring.style.top = ry + 'px'; }
      requestAnimationFrame(animCursor);
    };
    animCursor();

    /* ── Nav scroll ── */
    const handleScroll = () => {
      const nav = document.getElementById('nav');
      if (nav) nav.classList.toggle('scrolled', window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    /* ── Scroll reveal ── */
    const io = new IntersectionObserver(entries => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('in'), i * 60);
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.07, rootMargin: '-30px' });
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {/* Custom cursor */}
      <div className="cursor" id="cursor">
        <div className="cursor-dot" id="cursorDot"></div>
        <div className="cursor-ring" id="cursorRing"></div>
      </div>

      {/* ANNOUNCEMENT */}
      <div className="announce">
        Pengiriman gratis ke seluruh Indonesia &nbsp;·&nbsp;
        <a href="https://wa.me/6289529178826">Hubungi kami via WhatsApp →</a>
      </div>

      {/* NAVIGATION */}
      <nav id="nav">
        <div className="nav-top">
          <div className="nav-hamburger">Menu</div>
          <a href="#" className="nav-logo">REKAIN <sup>™</sup></a>
          <div className="nav-right">
            <div className="nav-icon">♡</div>
            <div className="cart-pill">
              <span>Keranjang</span>
              <span className="cart-pill-count">3</span>
            </div>
          </div>
        </div>
        <div className="nav-bottom">
          <a className="nav-link active">Hadiah Ibu</a>
          <a className="nav-link">Terbaru</a>
          <a className="nav-link">Kemeja & Batik</a>
          <a className="nav-link">Gaun & Set</a>
          <a className="nav-link">Personalisasi</a>
          <a className="nav-link">Maison Rekain</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg"></div>
        <div className="hero-diamond"></div>
        <div className="hero-slash">
          <div className="hero-slash-icon">🥻</div>
        </div>
        <div className="hero-content">
          <div className="hero-eyebrow">✦ Maison du Batik &nbsp;·&nbsp; Medan, Indonesia ✦</div>
          <h1 className="hero-title">
            Untuk Ibu<br />yang <em>Selalu</em><br />Lebih dari Cukup.
          </h1>
          <p className="hero-sub">
            Setiap helai kain perca yang kami pilih membawa cerita — tentang tangan pengrajin lokal, keindahan batik nusantara, dan kasih yang tidak pernah terbuang begitu saja.
          </p>
          <div className="hero-actions">
            <button className="btn-hero" onClick={() => document.getElementById('koleksi').scrollIntoView({ behavior: 'smooth' })}>Temukan Koleksi</button>
            <span className="hero-link">Cerita Rekain</span>
          </div>
        </div>
        <div className="hero-badge">
          <div className="hero-badge-inner">Maison<br />du Batik<br /><span style={{ fontSize: '9px', letterSpacing: '2px' }}>✦ 2025 ✦</span></div>
        </div>
        <div className="hero-scroll-hint">
          <div className="hero-scroll-line"></div>
          <div className="hero-scroll-label">Scroll</div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee-wrap">
        <div className="marquee-track">
          <span className="marquee-item">Batik Perca</span><span className="marquee-sep">◆</span>
          <span className="marquee-item">Zero Waste Luxury</span><span className="marquee-sep">◆</span>
          <span className="marquee-item">Pengrajin Lokal Medan</span><span className="marquee-sep">◆</span>
          <span className="marquee-item">Koleksi Hari Ibu 2025</span><span className="marquee-sep">◆</span>
          <span className="marquee-item">Kain yang Bermakna</span><span className="marquee-sep">◆</span>
          <span className="marquee-item">Sustainable Fashion</span><span className="marquee-sep">◆</span>
        </div>
      </div>

      {/* CATEGORY GRID */}
      <section className="section reveal" id="koleksi">
        <div className="section-header">
          <div>
            <div className="eyebrow">Pilih Kategori</div>
            <h2 className="sec-title">Koleksi yang Lahir<br />dari Ketelitian</h2>
          </div>
          <a className="sec-link">Semua Koleksi</a>
        </div>
        <div className="cat-grid">
          <div className="cat-card">
            <div className="cat-img f-hero" style={{ minHeight: '620px' }}>
              <div style={{ fontSize: '90px', opacity: '0.1' }}>🥻</div>
            </div>
            <div className="cat-overlay">
              <div className="cat-label">Koleksi Utama</div>
              <div className="cat-name">Batik Kemeja<br />& Gaun Anak</div>
              <a className="cat-cta">Jelajahi Koleksi</a>
            </div>
          </div>
          <div className="cat-card">
            <div className="cat-img f2">
              <div style={{ fontSize: '60px', opacity: '0.14' }}>🌸</div>
            </div>
            <div className="cat-overlay">
              <div className="cat-label">Untuk Putri Kecilmu</div>
              <div className="cat-name">Gaun Floral</div>
              <a className="cat-cta">Jelajahi</a>
            </div>
          </div>
          <div className="cat-card">
            <div className="cat-img f6">
              <div style={{ fontSize: '60px', opacity: '0.14' }}>✨</div>
            </div>
            <div className="cat-overlay">
              <div className="cat-label">Hadiah Spesial</div>
              <div className="cat-name">Set Lengkap</div>
              <a className="cat-cta">Jelajahi</a>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCT GRID */}
      <section className="product-section reveal">
        <div className="section-header">
          <div>
            <div className="eyebrow">Terbaru</div>
            <h2 className="sec-title">Koleksi Pilihan</h2>
          </div>
          <a className="sec-link">Semua Produk</a>
        </div>
        <div className="product-grid">
          <div className="p-card">
            <div className="p-img-wrap">
              <div className="p-img f1"><div style={{ fontSize: '72px', opacity: '0.16' }}>👕</div></div>
              <span className="p-badge-new">Baru</span>
              <div className="p-overlay"><button className="p-overlay-btn">Pilih Ukuran</button></div>
            </div>
            <div className="p-info">
              <div className="p-cat">Kemeja</div>
              <div className="p-name">Batik Perca Anak</div>
              <div className="p-sub">Motif Klasik Nusantara</div>
              <div className="p-price">Rp 79.000</div>
            </div>
          </div>
          <div className="p-card">
            <div className="p-img-wrap">
              <div className="p-img f2"><div style={{ fontSize: '72px', opacity: '0.16' }}>👗</div></div>
              <div className="p-overlay"><button className="p-overlay-btn">Pilih Ukuran</button></div>
            </div>
            <div className="p-info">
              <div className="p-cat">Gaun</div>
              <div className="p-name">Gaun Perca Floral</div>
              <div className="p-sub">Lembut & Ramah Kulit</div>
              <div className="p-price">Rp 85.000</div>
            </div>
          </div>
          <div className="p-card">
            <div className="p-img-wrap">
              <div className="p-img f3"><div style={{ fontSize: '72px', opacity: '0.16' }}>👔</div></div>
              <span className="p-badge-new">Terlaris</span>
              <div className="p-overlay"><button className="p-overlay-btn">Pilih Ukuran</button></div>
            </div>
            <div className="p-info">
              <div className="p-cat">Kemeja</div>
              <div className="p-name">Batik Casual</div>
              <div className="p-sub">Formal & Santai</div>
              <div className="p-price">Rp 75.000</div>
            </div>
          </div>
          <div className="p-card">
            <div className="p-img-wrap">
              <div className="p-img f4"><div style={{ fontSize: '72px', opacity: '0.16' }}>✨</div></div>
              <span className="p-badge-lim">Terbatas</span>
              <div className="p-overlay"><button className="p-overlay-btn">Pilih Ukuran</button></div>
            </div>
            <div className="p-info">
              <div className="p-cat">Gaun</div>
              <div className="p-name">Batik Elegan</div>
              <div className="p-sub">Untuk Momen Tak Terlupakan</div>
              <div className="p-price">Rp 85.000</div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-grid">
          <div>
            <div className="f-logo">REKAIN</div>
            <div className="f-tagline">Dari kain yang hampir terbuang, lahir karya yang bermakna. Maison du Batik, Medan — untuk seluruh Indonesia.</div>
          </div>
          <div>
            <div className="f-col-title">Koleksi</div>
            <ul className="f-links">
              <li><a>Terbaru</a></li>
              <li><a>Kemeja Batik</a></li>
              <li><a>Gaun & Set</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2025 Rekain Fashion · Maison du Batik · Medan</span>
        </div>
      </footer>
    </>
  );
};

export default RekainStore;
