// @ts-nocheck
'use client'
import { useState, useRef, useEffect, useCallback } from "react";

const PHOTOS = [
  { id: 0, src: "/chimney_.jpg", label: "Chimney Damage — Close Up", note: "damage" },
  { id: 1, src: "/center_full_house.jpg", label: "Property — Before Work", note: "before" },
  { id: 2, src: "/in_progress_2.jpg", label: "Setup — Ladder & Access", note: "process" },
  { id: 3, src: "/in_progress_shot.jpg", label: "Crew on Roof — Active Work", note: "process" },
  { id: 4, src: "/roof_completed_1.jpg", label: "Completed Roof — Left View", note: "after" },
  { id: 5, src: "/roof_completed_2.jpg", label: "Completed Roof — Center View", note: "after" },
  { id: 6, src: "/roof_completed_3.jpg", label: "Completed Roof — Right View", note: "after" },
];

const NOTE_COLORS = {
  damage: { bg: "rgba(220,38,38,0.88)", label: "Damage" },
  before: { bg: "rgba(245,158,11,0.88)", label: "Before" },
  process: { bg: "rgba(46,107,176,0.88)", label: "In Progress" },
  after: { bg: "rgba(77,184,78,0.88)", label: "Completed" },
};

/* ─── Tile ────────────────────────────────────────────────────── */
function PhotoTile({ photo, tall = false, wide = false, onClick, isActive }) {
  const { bg, label } = NOTE_COLORS[photo.note];
  return (
    <div
      onClick={() => onClick(photo.id)}
      style={{
        gridRow: tall ? "span 2" : "span 1",
        gridColumn: wide ? "span 2" : "span 1",
        position: "relative",
        overflow: "hidden",
        borderRadius: 16,
        cursor: "pointer",
        border: isActive ? "2px solid #4DB84E" : "2px solid rgba(255,255,255,0.06)",
        transition: "border-color 0.25s, transform 0.3s cubic-bezier(.22,.68,0,1.2), box-shadow 0.3s",
        transform: isActive ? "scale(1.015)" : "scale(1)",
        boxShadow: isActive
          ? "0 0 0 4px rgba(77,184,78,0.22), 0 16px 48px rgba(0,0,0,0.55)"
          : "0 4px 24px rgba(0,0,0,0.42)",
        background: "#0a1628",
        minHeight: tall ? 340 : 160,
      }}
    >
      <img
        src={photo.src}
        alt={photo.label}
        style={{
          position: "absolute", inset: 0,
          width: "100%", height: "100%",
          objectFit: "cover", objectPosition: "center",
          transition: "transform 0.45s ease",
        }}
        className="tile-img"
      />

      {/* Gradient */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "linear-gradient(to top, rgba(10,22,40,0.82) 0%, rgba(10,22,40,0.08) 55%, transparent 100%)",
      }} />

      {/* Badge */}
      <div style={{ position: "absolute", bottom: 12, left: 12 }}>
        <span style={{
          background: bg, backdropFilter: "blur(8px)",
          color: "#fff", fontSize: 10, fontWeight: 700,
          letterSpacing: "1.4px", textTransform: "uppercase",
          padding: "4px 10px", borderRadius: 100,
        }}>{label}</span>
      </div>

      {/* Title on large tiles */}
      {(tall || wide) && (
        <div style={{
          position: "absolute", bottom: 40, left: 14, right: 14,
          fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.85)",
          letterSpacing: "-0.2px", lineHeight: 1.35,
        }}>{photo.label}</div>
      )}

      {/* Hover shine */}
      <div className="tile-shine" style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 60%)",
        opacity: 0, transition: "opacity 0.25s",
      }} />
    </div>
  );
}

/* ─── Shared styles ───────────────────────────────────────────── */
const arrowBtnStyle = {
  background: "rgba(26,58,140,0.72)",
  border: "1px solid rgba(255,255,255,0.13)",
  borderRadius: "50%",
  width: 36, height: 36, cursor: "pointer",
  color: "#fff", fontSize: 22, lineHeight: 1,
  display: "flex", alignItems: "center", justifyContent: "center",
  backdropFilter: "blur(8px)", transition: "background 0.2s", flexShrink: 0,
};

const lbArrowStyle = {
  position: "absolute", top: "50%", transform: "translateY(-50%)",
  background: "rgba(10,22,40,0.72)", border: "1px solid rgba(255,255,255,0.15)",
  borderRadius: "50%", width: 44, height: 44, cursor: "pointer",
  color: "#fff", fontSize: 26, lineHeight: 1,
  display: "flex", alignItems: "center", justifyContent: "center",
  backdropFilter: "blur(8px)", transition: "background 0.2s",
};

/* ─── Main ────────────────────────────────────────────────────── */
export function Projects() {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(null);
  const carouselRef = useRef(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  const checkScroll = useCallback(() => {
    const el = carouselRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 8);
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  }, []);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll, { passive: true });
    checkScroll();
    return () => el.removeEventListener("scroll", checkScroll);
  }, [checkScroll]);

  const scroll = (dir) => carouselRef.current?.scrollBy({ left: dir * 280, behavior: "smooth" });

  const openLightbox = (id) => { setActive(id); setLightbox(id); };
  const closeLightbox = () => setLightbox(null);
  const lbPrev = () => setLightbox((l) => (l - 1 + PHOTOS.length) % PHOTOS.length);
  const lbNext = () => setLightbox((l) => (l + 1) % PHOTOS.length);

  useEffect(() => {
    const h = (e) => {
      if (lightbox === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") lbPrev();
      if (e.key === "ArrowRight") lbNext();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [lightbox]);

  const activeMeta = NOTE_COLORS[PHOTOS[active].note];

  return (
    <section id="projects" style={{
      background: "linear-gradient(180deg, #0d1b35 0%, #0a1628 100%)",
      padding: "100px 0", position: "relative", overflow: "hidden",
      fontFamily: "'Inter', sans-serif",
    }}>
      {/* Ambient glows */}
      <div style={{ position: "absolute", top: -120, left: "50%", transform: "translateX(-50%)", width: 800, height: 400, pointerEvents: "none", background: "radial-gradient(ellipse, rgba(26,58,140,0.22) 0%, transparent 70%)" }} />
      <div style={{ position: "absolute", bottom: -80, right: "10%", width: 500, height: 300, pointerEvents: "none", background: "radial-gradient(ellipse, rgba(77,184,78,0.1) 0%, transparent 70%)" }} />

      <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 40px" }}>

        {/* Header */}
        <div style={{ marginBottom: 48, display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 20 }}>
          <div>
            <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "2.2px", textTransform: "uppercase", color: "#4DB84E", marginBottom: 12 }}>
              Recent Projects
            </div>
            <h2 style={{ fontSize: "clamp(30px,4vw,50px)", fontWeight: 700, color: "#F5F7FA", letterSpacing: "-1.8px", lineHeight: 1.08, margin: 0, maxWidth: 520 }}>
              Storm Damage Roof<br />Replacement
            </h2>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(245,245,250,0.06)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 100, padding: "8px 16px" }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#4DB84E", display: "inline-block", animation: "pulseDot 2s ease-in-out infinite" }} />
              <span style={{ fontSize: 12, fontWeight: 600, color: "rgba(245,247,250,0.7)", letterSpacing: "0.3px" }}>
                Full Replacement · 2 Days · Insurance Handled
              </span>
            </div>
            <p style={{ fontSize: 14, color: "rgba(245,247,250,0.45)", marginTop: 10, marginBottom: 0, lineHeight: 1.6 }}>
              Storm-damaged home in need of complete shingle replacement.<br />
              Documented, claimed, and installed — start to finish.
            </p>
          </div>
        </div>

        {/* Bento Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gridTemplateRows: "260px 210px", gap: 12, marginBottom: 12 }}>
          {/* Hero 2×2 */}
          <PhotoTile photo={PHOTOS[0]} tall wide onClick={openLightbox} isActive={active === 0} />
          {/* Top-right pair */}
          <PhotoTile photo={PHOTOS[1]} onClick={openLightbox} isActive={active === 1} />
          <PhotoTile photo={PHOTOS[2]} onClick={openLightbox} isActive={active === 2} />
          {/* Bottom-right pair */}
          <PhotoTile photo={PHOTOS[3]} onClick={openLightbox} isActive={active === 3} />
          <PhotoTile photo={PHOTOS[4]} onClick={openLightbox} isActive={active === 4} />
        </div>

        {/* Carousel Strip */}
        <div style={{ position: "relative" }}>
          {/* Left arrow */}
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 80, zIndex: 2, background: "linear-gradient(to right,#0a1628 0%,transparent 100%)", display: "flex", alignItems: "center", paddingLeft: 8, opacity: canLeft ? 1 : 0, transition: "opacity 0.2s", pointerEvents: canLeft ? "auto" : "none" }}>
            <button onClick={() => scroll(-1)} style={arrowBtnStyle}>‹</button>
          </div>

          <div ref={carouselRef} style={{ display: "flex", gap: 10, overflowX: "auto", scrollSnapType: "x mandatory", scrollbarWidth: "none", WebkitOverflowScrolling: "touch", padding: "4px 2px 8px" }}>
            {PHOTOS.map((photo) => (
              <div key={photo.id} onClick={() => openLightbox(photo.id)} style={{
                flexShrink: 0, width: 200, height: 130, borderRadius: 12, overflow: "hidden",
                cursor: "pointer", scrollSnapAlign: "start", position: "relative",
                border: active === photo.id ? "2px solid #4DB84E" : "2px solid rgba(255,255,255,0.05)",
                transition: "border-color 0.2s, transform 0.2s, box-shadow 0.2s",
                transform: active === photo.id ? "translateY(-3px)" : "translateY(0)",
                boxShadow: active === photo.id ? "0 8px 28px rgba(77,184,78,0.25)" : "0 2px 12px rgba(0,0,0,0.4)",
              }}>
                <img src={photo.src} alt={photo.label} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }} />
                <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: active === photo.id ? "linear-gradient(to top,rgba(10,22,40,0.45) 0%,transparent 60%)" : "linear-gradient(to top,rgba(10,22,40,0.72) 0%,transparent 60%)" }} />
                {active === photo.id && (
                  <div style={{ position: "absolute", bottom: 7, left: 8, width: 6, height: 6, borderRadius: "50%", background: "#4DB84E", boxShadow: "0 0 8px rgba(77,184,78,0.8)" }} />
                )}
              </div>
            ))}
          </div>

          {/* Right arrow */}
          <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 80, zIndex: 2, background: "linear-gradient(to left,#0a1628 0%,transparent 100%)", display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: 8, opacity: canRight ? 1 : 0, transition: "opacity 0.2s", pointerEvents: canRight ? "auto" : "none" }}>
            <button onClick={() => scroll(1)} style={arrowBtnStyle}>›</button>
          </div>
        </div>

        {/* Caption bar */}
        <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 12, padding: "14px 20px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12 }}>
          <span style={{ background: activeMeta.bg, color: "#fff", fontSize: 10, fontWeight: 700, letterSpacing: "1.4px", textTransform: "uppercase", padding: "4px 10px", borderRadius: 100 }}>
            {activeMeta.label}
          </span>
          <span style={{ fontSize: 14, fontWeight: 500, color: "rgba(245,247,250,0.75)", letterSpacing: "-0.1px" }}>
            {PHOTOS[active].label}
          </span>
          <span style={{ marginLeft: "auto", fontSize: 12, color: "rgba(245,247,250,0.32)", fontWeight: 500 }}>
            {active + 1} / {PHOTOS.length} — Click any photo to expand
          </span>
        </div>

      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div onClick={closeLightbox} style={{ position: "fixed", inset: 0, zIndex: 999, background: "rgba(5,10,20,0.94)", backdropFilter: "blur(14px)", display: "flex", alignItems: "center", justifyContent: "center", animation: "fadeIn 0.2s ease" }}>
          <div onClick={(e) => e.stopPropagation()} style={{ position: "relative", borderRadius: 20, overflow: "hidden", boxShadow: "0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.08)", animation: "scaleIn 0.22s cubic-bezier(.22,.68,0,1.2)", maxWidth: "88vw", maxHeight: "84vh" }}>
            <img src={PHOTOS[lightbox].src} alt={PHOTOS[lightbox].label} style={{ display: "block", maxWidth: "88vw", maxHeight: "80vh", objectFit: "contain" }} />
            <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "linear-gradient(to top,rgba(5,10,20,0.9) 0%,transparent 45%)" }} />
            <div style={{ position: "absolute", bottom: 22, left: 24, right: 24, display: "flex", alignItems: "flex-end", justifyContent: "space-between", pointerEvents: "none" }}>
              <div>
                <span style={{ background: NOTE_COLORS[PHOTOS[lightbox].note].bg, color: "#fff", fontSize: 10, fontWeight: 700, letterSpacing: "1.4px", textTransform: "uppercase", padding: "4px 10px", borderRadius: 100 }}>
                  {NOTE_COLORS[PHOTOS[lightbox].note].label}
                </span>
                <div style={{ fontSize: 17, fontWeight: 600, color: "#fff", marginTop: 8, letterSpacing: "-0.3px" }}>
                  {PHOTOS[lightbox].label}
                </div>
              </div>
              <span style={{ fontSize: 13, color: "rgba(255,255,255,0.42)", fontWeight: 500 }}>{lightbox + 1} / {PHOTOS.length}</span>
            </div>
            <button onClick={lbPrev} style={{ ...lbArrowStyle, left: 14 }}>‹</button>
            <button onClick={lbNext} style={{ ...lbArrowStyle, right: 14 }}>›</button>
            <button onClick={closeLightbox} style={{ position: "absolute", top: 14, right: 14, background: "rgba(10,22,40,0.7)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "50%", width: 36, height: 36, cursor: "pointer", color: "#fff", fontSize: 18, lineHeight: 1, display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(8px)" }}>×</button>
          </div>

          {/* Dot strip */}
          <div style={{ position: "absolute", bottom: 24, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 8 }}>
            {PHOTOS.map((_, i) => (
              <div key={i} onClick={(e) => { e.stopPropagation(); setLightbox(i); }} style={{ width: i === lightbox ? 28 : 8, height: 8, borderRadius: 100, background: i === lightbox ? "#4DB84E" : "rgba(255,255,255,0.28)", cursor: "pointer", transition: "all 0.25s" }} />
            ))}
          </div>
        </div>
      )}

      <style>{`
        @keyframes pulseDot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(1.45)} }
        @keyframes fadeIn   { from{opacity:0} to{opacity:1} }
        @keyframes scaleIn  { from{transform:scale(0.93);opacity:0} to{transform:scale(1);opacity:1} }
        .tile-img:hover { transform: scale(1.06) !important; }
        div:hover > .tile-shine { opacity: 1 !important; }
        div::-webkit-scrollbar { display: none; }
        @media (max-width: 768px) {
          #projects div[style*="gridTemplateColumns"] {
            grid-template-columns: repeat(2,1fr) !important;
            grid-template-rows: auto !important;
          }
        }
      `}</style>
    </section>
  );
}