<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>REKAIN — Maison du Batik</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=Jost:wght@200;300;400;500&display=swap" rel="stylesheet">
<style>
:root {
  --cream: #F9F6F0;
  --espresso: #1C130A;
  --gold: #B8973E;
  --gold-dim: rgba(184,151,62,0.18);
  --border: #DDD5C4;
  --muted: #7A6D5A;
  --white: #FFFFFF;
}
*, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
html { scroll-behavior:smooth; }
body {
  font-family:'Jost',sans-serif;
  background:var(--cream);
  color:var(--espresso);
  overflow-x:hidden;
  cursor:none;
}
/* Custom cursor */
.cursor {
  position:fixed; top:0; left:0; pointer-events:none; z-index:99999;
  mix-blend-mode:difference;
}
.cursor-dot {
  width:8px; height:8px; background:var(--espresso);
  border-radius:50%; position:absolute;
  transform:translate(-50%,-50%);
  transition:width 0.2s,height 0.2s;
}
.cursor-ring {
  width:36px; height:36px; border:1px solid var(--espresso);
  border-radius:50%; position:absolute;
  transform:translate(-50%,-50%);
  transition:transform 0.1s, width 0.3s, height 0.3s, opacity 0.3s;
}
body:has(a:hover) .cursor-ring,
body:has(button:hover) .cursor-ring { width:56px; height:56px; opacity:0.6; }

/* Grain */
body::after {
  content:'';position:fixed;inset:0;
  background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
  pointer-events:none; z-index:9998; opacity:0.55;
}

/* ── ANNOUNCE ── */
.announce {
  background:var(--espresso); color:var(--cream);
  text-align:center; padding:11px 20px;
  font-size:10.5px; letter-spacing:2.5px; text-transform:uppercase; font-weight:300;
}
.announce a { color:var(--gold); text-decoration:none; }
.announce a:hover { text-decoration:underline; }

/* ── NAV ── */
nav {
  position:sticky; top:0; z-index:500;
  background:rgba(249,246,240,0.96);
  backdrop-filter:blur(14px) saturate(1.4);
  border-bottom:1px solid var(--border);
  transition:box-shadow 0.4s;
}
nav.scrolled { box-shadow:0 4px 32px rgba(28,19,10,0.07); }
.nav-top {
  display:flex; align-items:center; justify-content:space-between;
  padding:0 48px; height:62px;
  border-bottom:1px solid var(--border); position:relative;
}
.nav-hamburger {
  font-size:10px; letter-spacing:2.5px; text-transform:uppercase;
  color:var(--muted); font-weight:300; cursor:pointer;
}
.nav-logo {
  font-family:'Cormorant Garamond',serif;
  font-size:22px; font-weight:400; letter-spacing:10px; text-transform:uppercase;
  color:var(--espresso); text-decoration:none;
  position:absolute; left:50%; transform:translateX(-50%);
  white-space:nowrap;
}
.nav-logo sup { font-size:9px; letter-spacing:2px; color:var(--gold); vertical-align:super; margin-left:2px; }
.nav-right { display:flex; align-items:center; gap:24px; }
.nav-icon { font-size:15px; cursor:pointer; position:relative; color:var(--espresso); }
.cart-pill {
  display:flex; align-items:center; gap:6px;
  font-size:9px; letter-spacing:2px; text-transform:uppercase;
  border:1px solid var(--border); padding:6px 14px; cursor:pointer;
  transition:border-color 0.2s;
}
.cart-pill:hover { border-color:var(--gold); color:var(--gold); }
.cart-pill-count {
  background:var(--gold); color:white;
  font-size:9px; width:16px; height:16px; border-radius:50%;
  display:flex; align-items:center; justify-content:center;
}
.nav-bottom {
  display:flex; align-items:center; justify-content:center; gap:44px;
  padding:13px 48px;
}
.nav-link {
  font-size:9.5px; font-weight:400; letter-spacing:2.8px; text-transform:uppercase;
  color:var(--espresso); text-decoration:none; cursor:pointer;
  transition:color 0.2s; position:relative; padding-bottom:3px;
}
.nav-link::after {
  content:''; position:absolute; bottom:0; left:0; right:0;
  height:1px; background:var(--gold); transform:scaleX(0);
  transform-origin:left; transition:transform 0.3s cubic-bezier(0.22,1,0.36,1);
}
.nav-link:hover,
.nav-link.active { color:var(--gold); }
.nav-link:hover::after,
.nav-link.active::after { transform:scaleX(1); }

/* ── HERO ── */
.hero {
  position:relative; height:94vh; min-height:660px;
  display:flex; align-items:flex-end; overflow:hidden;
  background:var(--espresso);
}
.hero-bg {
  position:absolute; inset:0;
  background:
    radial-gradient(ellipse at 75% 35%, rgba(184,151,62,0.22) 0%, transparent 55%),
    radial-gradient(ellipse at 25% 80%, rgba(139,69,19,0.28) 0%, transparent 45%),
    linear-gradient(155deg, #2E1B0D 0%, #1C130A 45%, #0F0905 100%);
}
.hero-diamond {
  position:absolute; inset:0; opacity:0.10;
  background-image:
    repeating-linear-gradient(45deg, var(--gold) 0, var(--gold) 1px, transparent 1px, transparent 32px),
    repeating-linear-gradient(-45deg, var(--gold) 0, var(--gold) 1px, transparent 1px, transparent 32px);
}
.hero-slash {
  position:absolute; right:0; top:0; bottom:0; width:52%;
  background:
    repeating-linear-gradient(140deg, rgba(184,151,62,0.07) 0px, rgba(184,151,62,0.07) 2px, transparent 2px, transparent 22px),
    linear-gradient(175deg, #3F2210 0%, #200E05 100%);
  clip-path:polygon(18% 0%, 100% 0%, 100% 100%, 0% 100%);
}
.hero-slash-icon {
  position:absolute; right:15%; top:50%; transform:translateY(-50%);
  font-size:160px; opacity:0.07; filter:grayscale(0.3);
}
.hero-content {
  position:relative; z-index:2;
  padding:0 88px 96px; max-width:720px;
}
.hero-eyebrow {
  font-size:9.5px; letter-spacing:5px; text-transform:uppercase;
  color:var(--gold); margin-bottom:28px; font-weight:300;
  animation:fadeUp 0.9s ease 0.15s both;
}
.hero-title {
  font-family:'Cormorant Garamond',serif;
  font-size:clamp(58px,8vw,96px); font-weight:300;
  line-height:1.04; color:var(--cream); margin-bottom:30px;
  animation:fadeUp 1s ease 0.35s both;
}
.hero-title em { font-style:italic; color:var(--gold); }
.hero-sub {
  font-size:13.5px; color:rgba(249,246,240,0.6);
  line-height:1.95; margin-bottom:44px; font-weight:300;
  max-width:460px; letter-spacing:0.2px;
  animation:fadeUp 0.9s ease 0.55s both;
}
.hero-actions {
  display:flex; align-items:center; gap:32px;
  animation:fadeUp 0.9s ease 0.72s both;
}
.btn-hero {
  font-size:9.5px; letter-spacing:3.5px; text-transform:uppercase;
  color:var(--cream); background:none; border:1px solid rgba(249,246,240,0.35);
  padding:14px 32px; cursor:pointer; font-family:'Jost',sans-serif; font-weight:300;
  transition:border-color 0.3s, color 0.3s, background 0.3s;
}
.btn-hero:hover { border-color:var(--gold); color:var(--gold); background:rgba(184,151,62,0.06); }
.hero-link {
  font-size:10px; letter-spacing:3px; text-transform:uppercase;
  color:rgba(249,246,240,0.55); cursor:pointer; font-weight:300;
  border-bottom:1px solid rgba(249,246,240,0.2); padding-bottom:3px;
  transition:color 0.2s, border-color 0.2s;
}
.hero-link:hover { color:var(--gold); border-color:var(--gold); }
.hero-scroll-hint {
  position:absolute; right:52px; bottom:44px;
  display:flex; flex-direction:column; align-items:center; gap:8px;
  animation:fadeUp 1s ease 1s both;
}
.hero-scroll-line {
  width:1px; height:48px; background:rgba(184,151,62,0.4);
  animation:scrollPulse 2s ease infinite;
}
.hero-scroll-label {
  font-size:8px; letter-spacing:3px; text-transform:uppercase;
  color:var(--gold); writing-mode:vertical-rl; font-weight:300;
}
.hero-badge {
  position:absolute; right:88px; top:50%; transform:translateY(-60%);
  z-index:3; width:116px; height:116px;
  border:1px solid rgba(184,151,62,0.35); border-radius:50%;
  display:flex; align-items:center; justify-content:center;
  animation:fadeUp 1s ease 0.9s both;
}
.hero-badge-inner {
  font-family:'Cormorant Garamond',serif;
  font-size:11.5px; font-style:italic; color:var(--gold);
  line-height:1.6; text-align:center; pointer-events:none;
}

/* ── MARQUEE ── */
.marquee-wrap {
  overflow:hidden; border-top:1px solid var(--border);
  border-bottom:1px solid var(--border); background:var(--espresso); padding:15px 0;
}
.marquee-track {
  display:flex; gap:56px; animation:marquee 30s linear infinite; white-space:nowrap;
}
.marquee-item {
  font-family:'Cormorant Garamond',serif; font-size:14.5px;
  font-style:italic; color:var(--gold); letter-spacing:2px; flex-shrink:0;
}
.marquee-sep { color:rgba(184,151,62,0.35); font-size:10px; flex-shrink:0; align-self:center; }

/* ── SECTIONS ── */
.section { padding:88px 60px; }
.section-header {
  display:flex; align-items:flex-end; justify-content:space-between; margin-bottom:52px;
}
.eyebrow {
  font-size:9.5px; letter-spacing:4.5px; text-transform:uppercase;
  color:var(--gold); margin-bottom:10px; font-weight:300;
}
.sec-title {
  font-family:'Cormorant Garamond',serif;
  font-size:clamp(30px,3.8vw,46px); font-weight:300; line-height:1.18; color:var(--espresso);
}
.sec-link {
  font-size:9.5px; letter-spacing:3px; text-transform:uppercase;
  color:var(--espresso); text-decoration:none; border-bottom:1px solid currentColor;
  padding-bottom:2px; cursor:pointer; font-weight:300;
  transition:color 0.2s;
}
.sec-link:hover { color:var(--gold); }

/* ── CATEGORY GRID ── */
.cat-grid {
  display:grid;
  grid-template-columns:1.65fr 1fr 1fr;
  grid-template-rows:1fr 1fr;
  gap:3px; background:var(--border);
}
.cat-card {
  position:relative; overflow:hidden; cursor:pointer; background:var(--espresso);
}
.cat-card:first-child { grid-row:1/3; }
.cat-img {
  width:100%; height:100%; min-height:290px;
  transition:transform 0.75s cubic-bezier(0.25,0.46,0.45,0.94);
  display:flex; align-items:center; justify-content:center;
}
.cat-card:hover .cat-img { transform:scale(1.05); }
.cat-overlay {
  position:absolute; inset:0;
  background:linear-gradient(to top, rgba(18,10,4,0.72) 0%, rgba(18,10,4,0.1) 55%, transparent 100%);
  display:flex; flex-direction:column; justify-content:flex-end; padding:30px;
  transition:background 0.4s;
}
.cat-card:hover .cat-overlay { background:linear-gradient(to top, rgba(18,10,4,0.82) 0%, rgba(18,10,4,0.18) 60%, transparent 100%); }
.cat-label { font-size:8.5px; letter-spacing:3px; text-transform:uppercase; color:var(--gold); margin-bottom:7px; font-weight:300; }
.cat-name {
  font-family:'Cormorant Garamond',serif; font-size:24px;
  font-weight:400; color:white; margin-bottom:14px; font-style:italic; line-height:1.2;
}
.cat-cta {
  font-size:8.5px; letter-spacing:3px; text-transform:uppercase;
  color:rgba(255,255,255,0.6); display:inline-block;
  border-bottom:1px solid rgba(255,255,255,0.25); padding-bottom:2px; cursor:pointer;
  transition:color 0.2s, border-color 0.2s; font-weight:300;
}
.cat-card:hover .cat-cta { color:var(--gold); border-color:var(--gold); }

/* ── PRODUCT GRID ── */
.product-section { padding:88px 60px; background:white; }
.product-grid {
  display:grid; grid-template-columns:repeat(4,1fr);
  gap:0; border:1px solid var(--border);
}
.p-card { background:white; cursor:pointer; overflow:hidden; border-right:1px solid var(--border); }
.p-card:last-child { border-right:none; }
.p-img-wrap { position:relative; overflow:hidden; aspect-ratio:3/4; }
.p-img {
  width:100%; height:100%;
  transition:transform 0.65s cubic-bezier(0.25,0.46,0.45,0.94);
  display:flex; align-items:center; justify-content:center;
}
.p-card:hover .p-img { transform:scale(1.07); }
.p-badge-new {
  position:absolute; top:16px; left:16px;
  font-size:7.5px; letter-spacing:2px; text-transform:uppercase;
  background:var(--espresso); color:var(--cream); padding:4px 10px; font-weight:300;
}
.p-badge-lim {
  position:absolute; top:16px; right:16px;
  font-size:7.5px; letter-spacing:2px; text-transform:uppercase;
  background:var(--gold); color:white; padding:4px 10px; font-weight:300;
}
.p-overlay {
  position:absolute; bottom:0; left:0; right:0;
  background:rgba(28,19,10,0.88); padding:16px;
  transform:translateY(100%); transition:transform 0.32s ease;
}
.p-card:hover .p-overlay { transform:translateY(0); }
.p-overlay-btn {
  font-size:8.5px; letter-spacing:2.5px; text-transform:uppercase;
  color:var(--cream); background:none;
  border:1px solid rgba(249,246,240,0.35); padding:11px; width:100%;
  cursor:pointer; font-family:'Jost',sans-serif; font-weight:300;
  transition:border-color 0.2s, color 0.2s;
}
.p-overlay-btn:hover { border-color:var(--gold); color:var(--gold); }
.p-info { padding:22px 22px 28px; border-top:1px solid var(--border); }
.p-cat { font-size:8.5px; letter-spacing:3px; text-transform:uppercase; color:var(--muted); margin-bottom:6px; font-weight:300; }
.p-name { font-family:'Cormorant Garamond',serif; font-size:18px; font-weight:400; color:var(--espresso); margin-bottom:4px; font-style:italic; }
.p-sub { font-size:11.5px; color:var(--muted); margin-bottom:12px; font-weight:300; }
.p-price { font-size:13px; color:var(--espresso); font-weight:300; letter-spacing:0.5px; }

/* ── CAMPAIGN ── */
.campaign {
  display:grid; grid-template-columns:1fr 1fr;
  min-height:88vh; overflow:hidden;
}
.c-visual { position:relative; overflow:hidden; }
.c-visual-inner { width:100%; height:100%; transition:transform 0.9s cubic-bezier(0.25,0.46,0.45,0.94); }
.campaign:hover .c-visual-inner { transform:scale(1.04); }
.c-content {
  display:flex; flex-direction:column; justify-content:center;
  padding:88px 80px; background:var(--espresso); position:relative;
}
.c-content::before {
  content:''; position:absolute;
  top:44px; left:44px; right:44px; bottom:44px;
  border:1px solid rgba(184,151,62,0.18); pointer-events:none;
}
.c-eyebrow { font-size:9px; letter-spacing:5px; text-transform:uppercase; color:var(--gold); margin-bottom:22px; font-weight:300; }
.c-title {
  font-family:'Cormorant Garamond',serif;
  font-size:clamp(40px,4.5vw,62px); font-weight:300;
  color:var(--cream); line-height:1.08; margin-bottom:24px;
}
.c-title em { font-style:italic; color:var(--gold); }
.c-desc { font-size:13px; color:rgba(249,246,240,0.58); line-height:1.95; margin-bottom:44px; font-weight:300; max-width:380px; }
.c-cta {
  display:inline-flex; align-items:center; gap:12px;
  font-size:9.5px; letter-spacing:3.5px; text-transform:uppercase;
  color:var(--gold); cursor:pointer; font-weight:300;
  border-bottom:1px solid rgba(184,151,62,0.35); padding-bottom:4px; width:fit-content;
  transition:border-color 0.2s;
}
.c-cta:hover { border-color:var(--gold); }
.c-cta::after { content:'→'; font-size:15px; }

/* ── GIFT SCROLL ── */
.gift-section { padding:88px 0 88px 60px; }
.gift-rail {
  display:flex; gap:20px; overflow-x:auto; scroll-snap-type:x mandatory;
  padding-right:60px; cursor:grab; -webkit-overflow-scrolling:touch;
}
.gift-rail:active { cursor:grabbing; }
.gift-rail::-webkit-scrollbar { display:none; }
.g-card { flex-shrink:0; scroll-snap-align:start; width:286px; }
.g-img {
  aspect-ratio:3/4; width:100%; overflow:hidden;
  margin-bottom:18px; position:relative;
}
.g-img-inner {
  width:100%; height:100%;
  transition:transform 0.65s ease;
  display:flex; align-items:center; justify-content:center;
}
.g-card:hover .g-img-inner { transform:scale(1.05); }
.g-tag { font-size:8.5px; letter-spacing:3px; text-transform:uppercase; color:var(--gold); margin-bottom:7px; font-weight:300; }
.g-name { font-family:'Cormorant Garamond',serif; font-size:18px; font-weight:400; color:var(--espresso); margin-bottom:5px; font-style:italic; }
.g-price { font-size:12px; color:var(--muted); font-weight:300; }

/* ── SERVICES ── */
.services {
  display:grid; grid-template-columns:repeat(4,1fr);
  border-top:1px solid var(--border); border-bottom:1px solid var(--border);
  background:var(--cream);
}
.srv { padding:44px 28px; text-align:center; border-right:1px solid var(--border); }
.srv:last-child { border-right:none; }
.srv-icon { font-size:22px; margin-bottom:14px; }
.srv-label { font-size:9px; letter-spacing:3px; text-transform:uppercase; color:var(--espresso); font-weight:400; margin-bottom:8px; }
.srv-desc { font-size:12px; color:var(--muted); line-height:1.7; font-weight:300; }

/* ── EDITORIAL STRIP ── */
.editorial {
  display:grid; grid-template-columns:repeat(3,1fr);
  height:60vh; min-height:380px; overflow:hidden;
}
.ed-card { position:relative; overflow:hidden; cursor:pointer; }
.ed-img {
  width:100%; height:100%;
  transition:transform 0.75s cubic-bezier(0.25,0.46,0.45,0.94);
  display:flex; align-items:center; justify-content:center;
}
.ed-card:hover .ed-img { transform:scale(1.06); }
.ed-overlay {
  position:absolute; inset:0;
  background:linear-gradient(to top, rgba(18,10,4,0.65) 0%, transparent 55%);
  display:flex; align-items:flex-end; padding:28px;
}
.ed-label { font-family:'Cormorant Garamond',serif; font-size:20px; font-style:italic; color:white; font-weight:300; }

/* ── FOOTER ── */
footer { background:var(--espresso); color:var(--cream); padding:80px 60px 44px; }
.footer-grid {
  display:grid; grid-template-columns:2.2fr 1fr 1fr 1fr; gap:64px;
  margin-bottom:64px; padding-bottom:64px;
  border-bottom:1px solid rgba(249,246,240,0.08);
}
.f-logo {
  font-family:'Cormorant Garamond',serif; font-size:30px; font-weight:300;
  letter-spacing:10px; text-transform:uppercase; margin-bottom:18px;
}
.f-tagline { font-size:12.5px; color:rgba(249,246,240,0.48); line-height:1.85; font-weight:300; max-width:270px; margin-bottom:28px; }
.f-social { display:flex; gap:14px; }
.f-social a {
  width:34px; height:34px; border:1px solid rgba(249,246,240,0.12);
  display:flex; align-items:center; justify-content:center;
  font-size:13px; color:rgba(249,246,240,0.45); text-decoration:none;
  transition:border-color 0.2s, color 0.2s;
}
.f-social a:hover { border-color:var(--gold); color:var(--gold); }
.f-col-title { font-size:8.5px; letter-spacing:3.5px; text-transform:uppercase; color:var(--gold); margin-bottom:22px; font-weight:300; }
.f-links { list-style:none; display:flex; flex-direction:column; gap:11px; }
.f-links a {
  font-size:12.5px; color:rgba(249,246,240,0.5); text-decoration:none; font-weight:300;
  transition:color 0.2s; cursor:pointer;
}
.f-links a:hover { color:var(--gold); }
.footer-bottom {
  display:flex; justify-content:space-between; align-items:center;
  font-size:9.5px; color:rgba(249,246,240,0.3); letter-spacing:1.5px; font-weight:300;
}

/* ── FABRIC SWATCHES (CSS art) ── */
.f1 {
  background:
    repeating-linear-gradient(135deg,rgba(184,151,62,0.12) 0,rgba(184,151,62,0.12) 1px,transparent 1px,transparent 20px),
    linear-gradient(155deg,#4A2810 0%,#2A1508 100%);
}
.f2 {
  background:
    repeating-linear-gradient(45deg,rgba(200,100,60,0.16) 0,rgba(200,100,60,0.16) 1px,transparent 1px,transparent 16px),
    linear-gradient(180deg,#5C2015 0%,#3A1008 100%);
}
.f3 {
  background:
    repeating-linear-gradient(90deg,rgba(70,130,80,0.18) 0,rgba(70,130,80,0.18) 2px,transparent 2px,transparent 18px),
    linear-gradient(155deg,#2A4A30 0%,#182A1C 100%);
}
.f4 {
  background:
    repeating-linear-gradient(135deg,rgba(120,60,150,0.14) 0,rgba(120,60,150,0.14) 1px,transparent 1px,transparent 14px),
    repeating-linear-gradient(45deg,rgba(120,60,150,0.07) 0,rgba(120,60,150,0.07) 1px,transparent 1px,transparent 14px),
    linear-gradient(180deg,#3A1A4A 0%,#200D30 100%);
}
.f5 {
  background:
    repeating-linear-gradient(-45deg,rgba(44,95,138,0.18) 0,rgba(44,95,138,0.18) 2px,transparent 2px,transparent 18px),
    linear-gradient(200deg,#1A3A5A 0%,#0D1F35 100%);
}
.f6 {
  background:
    radial-gradient(ellipse at 50% 50%,rgba(184,151,62,0.22) 0%,transparent 68%),
    repeating-linear-gradient(45deg,rgba(139,105,20,0.14) 0,rgba(139,105,20,0.14) 1px,transparent 1px,transparent 18px),
    linear-gradient(155deg,#3A2A08 0%,#201808 100%);
}
.f-hero {
  background:
    radial-gradient(ellipse at 78% 32%,rgba(184,151,62,0.28) 0%,transparent 52%),
    repeating-linear-gradient(135deg,rgba(184,151,62,0.07) 0,rgba(184,151,62,0.07) 1px,transparent 1px,transparent 26px),
    linear-gradient(175deg,#3F2210 0%,#1C0D04 100%);
}
.f-campaign {
  background:
    radial-gradient(ellipse at 35% 65%,rgba(184,151,62,0.32) 0%,transparent 52%),
    radial-gradient(ellipse at 75% 25%,rgba(139,69,19,0.22) 0%,transparent 44%),
    repeating-linear-gradient(45deg,rgba(184,151,62,0.06) 0,rgba(184,151,62,0.06) 2px,transparent 2px,transparent 22px),
    linear-gradient(195deg,#5C2A0C 0%,#2A1208 100%);
}
.f-ed1 {
  background:
    repeating-linear-gradient(60deg,rgba(184,151,62,0.1) 0,rgba(184,151,62,0.1) 1px,transparent 1px,transparent 24px),
    linear-gradient(120deg,#3A1808 0%,#1C0A04 100%);
}
.f-ed2 {
  background:
    radial-gradient(ellipse at 60% 40%,rgba(80,160,100,0.22) 0%,transparent 55%),
    linear-gradient(200deg,#1C3A20 0%,#0A1C10 100%);
}
.f-ed3 {
  background:
    repeating-linear-gradient(-30deg,rgba(44,95,138,0.15) 0,rgba(44,95,138,0.15) 2px,transparent 2px,transparent 20px),
    linear-gradient(160deg,#102840 0%,#081420 100%);
}

/* ── ANIMATIONS ── */
@keyframes fadeUp {
  from { opacity:0; transform:translateY(28px); }
  to   { opacity:1; transform:translateY(0); }
}
@keyframes marquee {
  from { transform:translateX(0); }
  to   { transform:translateX(-50%); }
}
@keyframes scrollPulse {
  0%,100% { opacity:0.3; transform:scaleY(1); }
  50%      { opacity:1;   transform:scaleY(1.2); }
}

.reveal { opacity:0; transform:translateY(36px); transition:opacity 0.85s ease, transform 0.85s cubic-bezier(0.22,1,0.36,1); }
.reveal.in { opacity:1; transform:translateY(0); }

/* ── RESPONSIVE ── */
@media (max-width:900px) {
  .nav-bottom { gap:20px; }
  .cat-grid { grid-template-columns:1fr; grid-template-rows:auto; }
  .cat-card:first-child { grid-row:auto; }
  .campaign { grid-template-columns:1fr; }
  .product-grid { grid-template-columns:repeat(2,1fr); }
  .footer-grid { grid-template-columns:1fr 1fr; gap:32px; }
  .services { grid-template-columns:repeat(2,1fr); }
  .editorial { grid-template-columns:1fr; height:auto; }
  .ed-card { height:260px; }
  .hero-content { padding:0 32px 72px; }
  .hero-badge { display:none; }
}
</style>
</head>
<body>

<!-- Custom cursor -->
<div class="cursor" id="cursor">
  <div class="cursor-dot" id="cursorDot"></div>
  <div class="cursor-ring" id="cursorRing"></div>
</div>

<!-- ── ANNOUNCEMENT ── -->
<div class="announce">
  Pengiriman gratis ke seluruh Indonesia &nbsp;·&nbsp;
  <a href="https://wa.me/6289529178826">Hubungi kami via WhatsApp →</a>
</div>

<!-- ── NAVIGATION ── -->
<nav id="nav">
  <div class="nav-top">
    <div class="nav-hamburger">Menu</div>
    <a href="#" class="nav-logo">REKAIN <sup>™</sup></a>
    <div class="nav-right">
      <div class="nav-icon">♡</div>
      <div class="cart-pill">
        <span>Keranjang</span>
        <span class="cart-pill-count">3</span>
      </div>
    </div>
  </div>
  <div class="nav-bottom">
    <a class="nav-link active">Hadiah Ibu</a>
    <a class="nav-link">Terbaru</a>
    <a class="nav-link">Kemeja & Batik</a>
    <a class="nav-link">Gaun & Set</a>
    <a class="nav-link">Personalisasi</a>
    <a class="nav-link">Maison Rekain</a>
  </div>
</nav>

<!-- ── HERO ── -->
<section class="hero">
  <div class="hero-bg"></div>
  <div class="hero-diamond"></div>
  <div class="hero-slash">
    <div class="hero-slash-icon">🥻</div>
  </div>

  <div class="hero-content">
    <div class="hero-eyebrow">✦ Maison du Batik &nbsp;·&nbsp; Medan, Indonesia ✦</div>
    <h1 class="hero-title">
      Untuk Ibu<br>yang <em>Selalu</em><br>Lebih dari Cukup.
    </h1>
    <p class="hero-sub">
      Setiap helai kain perca yang kami pilih membawa cerita — tentang tangan pengrajin lokal, keindahan batik nusantara, dan kasih yang tidak pernah terbuang begitu saja.
    </p>
    <div class="hero-actions">
      <button class="btn-hero" onclick="document.getElementById('koleksi').scrollIntoView({behavior:'smooth'})">Temukan Koleksi</button>
      <span class="hero-link">Cerita Rekain</span>
    </div>
  </div>

  <div class="hero-badge">
    <div class="hero-badge-inner">Maison<br>du Batik<br><span style="font-size:9px;letter-spacing:2px">✦ 2025 ✦</span></div>
  </div>

  <div class="hero-scroll-hint">
    <div class="hero-scroll-line"></div>
    <div class="hero-scroll-label">Scroll</div>
  </div>
</section>

<!-- ── MARQUEE ── -->
<div class="marquee-wrap">
  <div class="marquee-track">
    <span class="marquee-item">Batik Perca</span><span class="marquee-sep">◆</span>
    <span class="marquee-item">Zero Waste Luxury</span><span class="marquee-sep">◆</span>
    <span class="marquee-item">Pengrajin Lokal Medan</span><span class="marquee-sep">◆</span>
    <span class="marquee-item">Koleksi Hari Ibu 2025</span><span class="marquee-sep">◆</span>
    <span class="marquee-item">Kain yang Bermakna</span><span class="marquee-sep">◆</span>
    <span class="marquee-item">Sustainable Fashion</span><span class="marquee-sep">◆</span>
    <span class="marquee-item">Batik Perca</span><span class="marquee-sep">◆</span>
    <span class="marquee-item">Zero Waste Luxury</span><span class="marquee-sep">◆</span>
    <span class="marquee-item">Pengrajin Lokal Medan</span><span class="marquee-sep">◆</span>
    <span class="marquee-item">Koleksi Hari Ibu 2025</span><span class="marquee-sep">◆</span>
    <span class="marquee-item">Kain yang Bermakna</span><span class="marquee-sep">◆</span>
    <span class="marquee-item">Sustainable Fashion</span><span class="marquee-sep">◆</span>
  </div>
</div>

<!-- ── CATEGORY EDITORIAL ── -->
<section class="section reveal" id="koleksi">
  <div class="section-header">
    <div>
      <div class="eyebrow">Pilih Kategori</div>
      <h2 class="sec-title">Koleksi yang Lahir<br>dari Ketelitian</h2>
    </div>
    <a class="sec-link">Semua Koleksi</a>
  </div>
  <div class="cat-grid">
    <div class="cat-card">
      <div class="cat-img f-hero" style="min-height:620px">
        <div style="font-size:90px;opacity:0.1">🥻</div>
      </div>
      <div class="cat-overlay">
        <div class="cat-label">Koleksi Utama</div>
        <div class="cat-name">Batik Kemeja<br>& Gaun Anak</div>
        <a class="cat-cta">Jelajahi Koleksi</a>
      </div>
    </div>
    <div class="cat-card">
      <div class="cat-img f2">
        <div style="font-size:60px;opacity:0.14">🌸</div>
      </div>
      <div class="cat-overlay">
        <div class="cat-label">Untuk Putri Kecilmu</div>
        <div class="cat-name">Gaun Floral</div>
        <a class="cat-cta">Jelajahi</a>
      </div>
    </div>
    <div class="cat-card">
      <div class="cat-img f6">
        <div style="font-size:60px;opacity:0.14">✨</div>
      </div>
      <div class="cat-overlay">
        <div class="cat-label">Hadiah Spesial</div>
        <div class="cat-name">Set Lengkap</div>
        <a class="cat-cta">Jelajahi</a>
      </div>
    </div>
  </div>
</section>

<!-- ── NEW ARRIVALS ── -->
<section class="product-section reveal">
  <div class="section-header">
    <div>
      <div class="eyebrow">Terbaru</div>
      <h2 class="sec-title">Koleksi Pilihan</h2>
    </div>
    <a class="sec-link">Semua Produk</a>
  </div>
  <div class="product-grid">
    <div class="p-card">
      <div class="p-img-wrap">
        <div class="p-img f1"><div style="font-size:72px;opacity:0.16">👕</div></div>
        <span class="p-badge-new">Baru</span>
        <div class="p-overlay"><button class="p-overlay-btn">Pilih Ukuran</button></div>
      </div>
      <div class="p-info">
        <div class="p-cat">Kemeja</div>
        <div class="p-name">Batik Perca Anak</div>
        <div class="p-sub">Motif Klasik Nusantara</div>
        <div class="p-price">Rp 79.000</div>
      </div>
    </div>
    <div class="p-card">
      <div class="p-img-wrap">
        <div class="p-img f2"><div style="font-size:72px;opacity:0.16">👗</div></div>
        <div class="p-overlay"><button class="p-overlay-btn">Pilih Ukuran</button></div>
      </div>
      <div class="p-info">
        <div class="p-cat">Gaun</div>
        <div class="p-name">Gaun Perca Floral</div>
        <div class="p-sub">Lembut & Ramah Kulit</div>
        <div class="p-price">Rp 85.000</div>
      </div>
    </div>
    <div class="p-card">
      <div class="p-img-wrap">
        <div class="p-img f3"><div style="font-size:72px;opacity:0.16">👔</div></div>
        <span class="p-badge-new">Terlaris</span>
        <div class="p-overlay"><button class="p-overlay-btn">Pilih Ukuran</button></div>
      </div>
      <div class="p-info">
        <div class="p-cat">Kemeja</div>
        <div class="p-name">Batik Casual</div>
        <div class="p-sub">Formal & Santai</div>
        <div class="p-price">Rp 75.000</div>
      </div>
    </div>
    <div class="p-card">
      <div class="p-img-wrap">
        <div class="p-img f4"><div style="font-size:72px;opacity:0.16">✨</div></div>
        <span class="p-badge-lim">Terbatas</span>
        <div class="p-overlay"><button class="p-overlay-btn">Pilih Ukuran</button></div>
      </div>
      <div class="p-info">
        <div class="p-cat">Gaun</div>
        <div class="p-name">Batik Elegan</div>
        <div class="p-sub">Untuk Momen Tak Terlupakan</div>
        <div class="p-price">Rp 85.000</div>
      </div>
    </div>
  </div>
</section>

<!-- ── CAMPAIGN ── -->
<section class="campaign reveal">
  <div class="c-visual">
    <div class="c-visual-inner f-campaign" style="display:flex;align-items:center;justify-content:center;position:relative;">
      <div style="font-size:140px;opacity:0.1;filter:grayscale(0.3)">🌸</div>
      <div style="position:absolute;bottom:0;left:0;right:0;height:55%;background:linear-gradient(to top,rgba(18,10,4,0.5),transparent)"></div>
      <div style="position:absolute;bottom:36px;left:36px;font-family:'Cormorant Garamond',serif;font-size:12px;font-style:italic;color:rgba(249,246,240,0.6);letter-spacing:2px">Edisi Hari Ibu · 2025</div>
    </div>
  </div>
  <div class="c-content">
    <div class="c-eyebrow">✦ Hadiah Paling Bermakna ✦</div>
    <h2 class="c-title">Untuk Ibu yang<br><em>Merawat</em><br>Tanpa Henti.</h2>
    <p class="c-desc">
      Kain yang kami pilih bukan sekadar bahan — ia adalah bentuk terima kasih yang tidak bisa diucapkan dengan kata-kata. Untuk ibu yang selalu ada, koleksi Hari Ibu Rekain hadir dengan keindahan batik dan kelembutan kain perca terbaik Medan.
    </p>
    <a class="c-cta">Temukan Hadiah</a>
  </div>
</section>

<!-- ── GIFT GUIDE ── -->
<section class="gift-section">
  <div class="section-header reveal" style="padding-right:60px">
    <div>
      <div class="eyebrow">Kuratif</div>
      <h2 class="sec-title">Panduan Hadiah</h2>
    </div>
    <a class="sec-link" style="margin-right:60px">Lihat Semua</a>
  </div>
  <div class="gift-rail" id="giftRail">
    <div class="g-card reveal">
      <div class="g-img"><div class="g-img-inner f1"><div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:56px;opacity:0.18">👕</div></div></div>
      <div class="g-tag">Untuk Si Kecil</div>
      <div class="g-name">Batik Perca Anak</div>
      <div class="g-price">Rp 79.000</div>
    </div>
    <div class="g-card reveal">
      <div class="g-img"><div class="g-img-inner f2"><div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:56px;opacity:0.18">👗</div></div></div>
      <div class="g-tag">Elegan & Lembut</div>
      <div class="g-name">Gaun Floral Perca</div>
      <div class="g-price">Rp 85.000</div>
    </div>
    <div class="g-card reveal">
      <div class="g-img"><div class="g-img-inner f6"><div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:56px;opacity:0.18">✨</div></div></div>
      <div class="g-tag">Paket Lengkap</div>
      <div class="g-name">Set Batik Anak</div>
      <div class="g-price">Rp 85.000</div>
    </div>
    <div class="g-card reveal">
      <div class="g-img"><div class="g-img-inner f5"><div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:56px;opacity:0.18">🎁</div></div></div>
      <div class="g-tag">Casual & Chic</div>
      <div class="g-name">Kemeja Perca Polos</div>
      <div class="g-price">Rp 75.000</div>
    </div>
    <div class="g-card reveal">
      <div class="g-img"><div class="g-img-inner f4"><div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:56px;opacity:0.18">👑</div></div></div>
      <div class="g-tag">Momen Spesial</div>
      <div class="g-name">Gaun Batik Elegan</div>
      <div class="g-price">Rp 85.000</div>
    </div>
  </div>
</section>

<!-- ── EDITORIAL STRIP ── -->
<div class="editorial reveal">
  <div class="ed-card">
    <div class="ed-img f-ed1"><div style="font-size:80px;opacity:0.1">🧵</div></div>
    <div class="ed-overlay"><div class="ed-label">Tentang Pengrajin Kami</div></div>
  </div>
  <div class="ed-card">
    <div class="ed-img f-ed2"><div style="font-size:80px;opacity:0.1">🌿</div></div>
    <div class="ed-overlay"><div class="ed-label">Cerita Zero Waste</div></div>
  </div>
  <div class="ed-card">
    <div class="ed-img f-ed3"><div style="font-size:80px;opacity:0.1">♻️</div></div>
    <div class="ed-overlay"><div class="ed-label">Sustainability Rekain</div></div>
  </div>
</div>

<!-- ── SERVICES ── -->
<div class="services reveal">
  <div class="srv">
    <div class="srv-icon">🚚</div>
    <div class="srv-label">Pengiriman Gratis</div>
    <div class="srv-desc">Ke seluruh penjuru Indonesia, tanpa minimum pembelian</div>
  </div>
  <div class="srv">
    <div class="srv-icon">✉️</div>
    <div class="srv-label">Konfirmasi WhatsApp</div>
    <div class="srv-desc">Respons dalam 1×24 jam oleh tim kami yang penuh kasih</div>
  </div>
  <div class="srv">
    <div class="srv-icon">🌿</div>
    <div class="srv-label">Zero Waste</div>
    <div class="srv-desc">Setiap pembelian adalah langkah nyata kurangi limbah tekstil</div>
  </div>
  <div class="srv">
    <div class="srv-icon">🧵</div>
    <div class="srv-label">Personalisasi</div>
    <div class="srv-desc">Ukuran dan motif dapat disesuaikan dengan keinginanmu</div>
  </div>
</div>

<!-- ── FOOTER ── -->
<footer>
  <div class="footer-grid">
    <div>
      <div class="f-logo">REKAIN</div>
      <div class="f-tagline">Dari kain yang hampir terbuang, lahir karya yang bermakna. Maison du Batik, Medan — untuk seluruh Indonesia.</div>
      <div class="f-social">
        <a href="#">📷</a>
        <a href="#">🎵</a>
        <a href="#">💬</a>
      </div>
    </div>
    <div>
      <div class="f-col-title">Koleksi</div>
      <ul class="f-links">
        <li><a>Terbaru</a></li>
        <li><a>Kemeja Batik</a></li>
        <li><a>Gaun & Set</a></li>
        <li><a>Hadiah Spesial</a></li>
        <li><a>Semua Produk</a></li>
      </ul>
    </div>
    <div>
      <div class="f-col-title">Layanan</div>
      <ul class="f-links">
        <li><a>Personalisasi</a></li>
        <li><a>Pengiriman</a></li>
        <li><a>Pengembalian</a></li>
        <li><a>Perawatan Kain</a></li>
        <li><a>Cara Pemesanan</a></li>
      </ul>
    </div>
    <div>
      <div class="f-col-title">Rekain</div>
      <ul class="f-links">
        <li><a>Cerita Kami</a></li>
        <li><a>Pengrajin Lokal</a></li>
        <li><a>Sustainability</a></li>
        <li><a>Kontak Kami</a></li>
        <li><a>rekainfashion.blog</a></li>
      </ul>
    </div>
  </div>
  <div class="footer-bottom">
    <span>© 2025 Rekain Fashion · Maison du Batik · Medan, Sumatera Utara</span>
    <span>Hak Cipta Dilindungi</span>
  </div>
</footer>

<script>
/* ── Custom cursor ── */
const dot = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove', e => { mx=e.clientX; my=e.clientY; });
(function animCursor(){
  rx += (mx-rx)*0.12; ry += (my-ry)*0.12;
  dot.style.left = mx+'px'; dot.style.top = my+'px';
  ring.style.left = rx+'px'; ring.style.top = ry+'px';
  requestAnimationFrame(animCursor);
})();

/* ── Nav scroll ── */
window.addEventListener('scroll', ()=>{
  document.getElementById('nav').classList.toggle('scrolled', scrollY>50);
});

/* ── Scroll reveal ── */
const io = new IntersectionObserver(entries=>{
  entries.forEach((e,i)=>{
    if(e.isIntersecting){
      setTimeout(()=>e.target.classList.add('in'), i*60);
      io.unobserve(e.target);
    }
  });
}, {threshold:0.07, rootMargin:'-30px'});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

/* ── Gift rail drag ── */
const rail = document.getElementById('giftRail');
let down=false, sx, sl;
rail.addEventListener('mousedown', e=>{ down=true; sx=e.pageX-rail.offsetLeft; sl=rail.scrollLeft; });
window.addEventListener('mouseup', ()=>down=false);
window.addEventListener('mousemove', e=>{
  if(!down) return; e.preventDefault();
  rail.scrollLeft = sl - (e.pageX-rail.offsetLeft-sx)*1.5;
});

/* ── Nav active state ── */
document.querySelectorAll('.nav-link').forEach(l=>{
  l.addEventListener('click', function(){
    document.querySelectorAll('.nav-link').forEach(x=>x.classList.remove('active'));
    this.classList.add('active');
  });
});
</script>
</body>
</html>
