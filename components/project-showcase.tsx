"use client";

import { useState, useRef, useEffect, useCallback } from "react";

const photos = [
    { id: 1, src: "/roof_completed_1.jpg", alt: "Roof replacement in progress" },
    { id: 2, src: "/roof_completed_2.jpg", alt: "Drywall installation complete" },
    { id: 3, src: "/roof_completed_3.jpg", alt: "Exterior painting finished" },
    { id: 4, src: "/in_progress_shot.jpg", alt: "New roof shingles close-up" },
    { id: 5, src: "/in_progress_2.jpg", alt: "Interior restoration complete" },
    { id: 6, src: "/chimney_.jpg", alt: "Chimney — front elevation" },
    { id: 7, src: "/center_full_house.jpg", alt: "Completed project overview" },
];

const tags = ["Roofing", "Drywall", "Painting", "Restoration"];

// ─── Lightbox ──────────────────────────────────────────────────────────────────
function Lightbox({
    photo,
    onClose,
    onPrev,
    onNext,
    index,
    total,
}: {
    photo: (typeof photos)[0];
    onClose: () => void;
    onPrev: () => void;
    onNext: () => void;
    index: number;
    total: number;
}) {
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowLeft") onPrev();
            if (e.key === "ArrowRight") onNext();
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [onClose, onPrev, onNext]);

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ background: "rgba(8,14,32,0.94)", backdropFilter: "blur(20px)" }}
            onClick={onClose}
        >
            <div
                className="absolute top-5 left-1/2 -translate-x-1/2 text-[11px] font-medium tracking-widest uppercase"
                style={{ color: "rgba(255,255,255,0.35)" }}
            >
                {index + 1} / {total}
            </div>

            <button
                onClick={onClose}
                className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center rounded-full"
                style={{ background: "rgba(255,255,255,0.1)", color: "white" }}
                aria-label="Close"
            >
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                    <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
            </button>

            <button
                onClick={(e) => { e.stopPropagation(); onPrev(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full"
                style={{ background: "rgba(255,255,255,0.1)", color: "white" }}
                aria-label="Previous"
            >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>

            <div
                className="relative max-w-4xl max-h-[80vh] mx-16"
                onClick={(e) => e.stopPropagation()}
            >
                <img
                    src={photo.src}
                    alt={photo.alt}
                    className="max-h-[80vh] max-w-full object-contain rounded-2xl"
                    style={{ boxShadow: "0 40px 100px rgba(0,0,0,0.7)" }}
                />
                <div
                    className="absolute bottom-0 left-0 right-0 px-5 py-4 rounded-b-2xl"
                    style={{ background: "linear-gradient(to top, rgba(0,0,0,0.65), transparent)" }}
                >
                    <p className="text-[13px] text-white/75">{photo.alt}</p>
                </div>
            </div>

            <button
                onClick={(e) => { e.stopPropagation(); onNext(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full"
                style={{ background: "rgba(255,255,255,0.1)", color: "white" }}
                aria-label="Next"
            >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>
        </div>
    );
}

function PhotoCarousel({ onOpenLightbox }: { onOpenLightbox: (i: number) => void }) {
    const [page, setPage] = useState(0);
    const [dragging, setDragging] = useState(false);
    const [dragDelta, setDragDelta] = useState(0);
    const trackRef = useRef<HTMLDivElement>(null);
    const startX = useRef(0);
    const startPage = useRef(0);

    // 2 slides per page
    const PER_PAGE = 2;
    const totalPages = Math.ceil(photos.length / PER_PAGE);

    const goTo = useCallback((p: number) => {
        setPage(Math.max(0, Math.min(p, totalPages - 1)));
        setDragDelta(0);
    }, [totalPages]);

    // Pointer drag
    const onPointerDown = (e: React.PointerEvent) => {
        startX.current = e.clientX;
        startPage.current = page;
        setDragging(true);
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e: React.PointerEvent) => {
        if (!dragging) return;
        const delta = e.clientX - startX.current;
        setDragDelta(delta);
    };

    const onPointerUp = (e: React.PointerEvent) => {
        if (!dragging) return;
        setDragging(false);
        const delta = e.clientX - startX.current;
        const trackW = trackRef.current?.offsetWidth ?? 1;
        if (Math.abs(delta) > trackW * 0.15) {
            goTo(startPage.current + (delta < 0 ? 1 : -1));
        } else {
            setDragDelta(0);
        }
    };

    // Translate: each page moves by 100% of the track width
    const translatePct = -(page * 100) + (dragDelta / (trackRef.current?.offsetWidth ?? 1)) * 100;

    return (
        <div className="flex flex-col gap-4">
            {/* Track wrapper — overflow hidden, centred */}
            <div ref={trackRef} className="relative overflow-hidden rounded-2xl" style={{ touchAction: "pan-y" }}>
                <div
                    className="flex"
                    style={{
                        transform: `translateX(${translatePct}%)`,
                        transition: dragging ? "none" : "transform 0.52s cubic-bezier(0.16,1,0.3,1)",
                        willChange: "transform",
                    }}
                    onPointerDown={onPointerDown}
                    onPointerMove={onPointerMove}
                    onPointerUp={onPointerUp}
                    onPointerCancel={onPointerUp}
                >
                    {/* Pages */}
                    {Array.from({ length: totalPages }).map((_, pageIdx) => {
                        const pagePhotos = photos.slice(pageIdx * PER_PAGE, pageIdx * PER_PAGE + PER_PAGE);
                        return (
                            <div
                                key={pageIdx}
                                className="flex gap-2.5 flex-none w-full"
                                style={{ padding: "0 2px" }}
                            >
                                {pagePhotos.map((photo, slotIdx) => {
                                    const photoIdx = pageIdx * PER_PAGE + slotIdx;
                                    return (
                                        <PhotoCard
                                            key={photo.id}
                                            photo={photo}
                                            index={photoIdx}
                                            active={pageIdx === page}
                                            onClick={() => onOpenLightbox(photoIdx)}
                                        />
                                    );
                                })}
                                {/* Ghost card if odd total on last page */}
                                {pagePhotos.length < PER_PAGE && (
                                    <div className="flex-1" />
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Controls row */}
            <div className="flex items-center justify-between px-0.5">
                {/* Pill dots */}
                <div className="flex items-center gap-1.5">
                    {Array.from({ length: totalPages }).map((_, i) => (
                        <button
                            key={i}
                            onClick={() => goTo(i)}
                            className="rounded-full transition-all duration-300 ease-out"
                            style={{
                                height: "5px",
                                width: i === page ? "20px" : "5px",
                                background: i === page ? "var(--navy)" : "rgba(26,58,140,0.18)",
                            }}
                            aria-label={`Page ${i + 1}`}
                        />
                    ))}
                </div>

                {/* Prev / Next */}
                <div className="flex gap-2">
                    <button
                        onClick={() => goTo(page - 1)}
                        disabled={page === 0}
                        className="w-9 h-9 flex items-center justify-center rounded-full transition-opacity duration-200 disabled:opacity-25"
                        style={{
                            background: "white",
                            color: "var(--navy)",
                            border: "1px solid rgba(26,58,140,0.14)",
                            boxShadow: "0 1px 4px rgba(26,58,140,0.08)",
                        }}
                        aria-label="Previous"
                    >
                        <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                            <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                    <button
                        onClick={() => goTo(page + 1)}
                        disabled={page >= totalPages - 1}
                        className="w-9 h-9 flex items-center justify-center rounded-full transition-opacity duration-200 disabled:opacity-25"
                        style={{
                            background: "var(--navy)",
                            color: "white",
                            boxShadow: "0 2px 8px rgba(26,58,140,0.25)",
                        }}
                        aria-label="Next"
                    >
                        <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                            <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}

function ReelEmbed() {
    return (

        <iframe
            src="https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F2479773449123567%2F&show_text=false&width=279&t=0"
            width="279"
            height="476"
            style={{ border: "none", display: "block" }}
            scrolling="no"
            allow="autoplay;"
            allowFullScreen

        />
    );
}

function PhotoCard({
    photo,
    index,
    active,
    onClick,
}: {
    photo: (typeof photos)[0];
    index: number;
    active: boolean;
    onClick: () => void;
}) {
    const [loaded, setLoaded] = useState(false);
    const [hovered, setHovered] = useState(false);

    return (
        <button
            onClick={onClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="relative overflow-hidden rounded-xl flex-1 text-left"
            style={{
                aspectRatio: "3/4",
                background: "var(--bg-alt)",
                border: "1px solid rgba(26,58,140,0.08)",
                transform: hovered ? "scale(1.015)" : "scale(1)",
                transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s ease",
                boxShadow: hovered
                    ? "0 12px 40px rgba(26,58,140,0.18)"
                    : "0 2px 10px rgba(26,58,140,0.08)",
            }}
            aria-label={`View: ${photo.alt}`}
        >
            <img
                src={photo.src}
                alt={photo.alt}
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                    transition: "opacity 0.4s ease",
                }}
                draggable={false}
            />
            {/* Caption overlay */}
            <div
                className="absolute inset-0 flex items-end p-3"
                style={{
                    background: "linear-gradient(to top, rgba(0,30,65,0.72) 0%, transparent 55%)",
                    opacity: hovered ? 1 : 0,
                    transition: "opacity 0.3s ease",
                }}
            >
                <p className="text-white text-[11px] font-medium leading-snug">{photo.alt}</p>
            </div>
        </button>
    );
}

// ─── Main component ────────────────────────────────────────────────────────────
export default function ProjectShowcase() {
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    const openLightbox = (i: number) => setLightboxIndex(i);
    const closeLightbox = () => setLightboxIndex(null);
    const prev = () =>
        setLightboxIndex((i) => (i === null ? null : (i - 1 + photos.length) % photos.length));
    const next = () =>
        setLightboxIndex((i) => (i === null ? null : (i + 1) % photos.length));

    return (
        <section
            className="relative py-20 px-4 overflow-hidden"
            style={{ background: "var(--bg)" }}
        >
            {/* Dot grid */}
            <div
                className="pointer-events-none absolute inset-0"
                style={{
                    backgroundImage:
                        "radial-gradient(circle at 1px 1px, rgba(26,58,140,0.045) 1px, transparent 0)",
                    backgroundSize: "32px 32px",
                }}
            />

            <div className="relative max-w-6xl mx-auto">

                {/* ── Header ── */}
                <div className="mb-10">
                    <div
                        className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5"
                        style={{ background: "rgba(26,58,140,0.07)", color: "var(--navy)" }}
                    >
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--green)" }} />
                        Recent Work
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                        <div>
                            <h2
                                className="text-[clamp(26px,4vw,40px)] font-bold leading-tight tracking-tight"
                                style={{ color: "var(--text)" }}
                            >
                                Full home restoration —
                                <br />
                                <span style={{ color: "var(--navy-mid)" }}>roof to interior</span>
                            </h2>
                            <p
                                className="mt-3 text-[14px] leading-relaxed max-w-lg"
                                style={{ color: "var(--muted)" }}
                            >
                                Two weeks of non-stop work by Chris, Tommy, and Evan. Roofing, drywall, paint —
                                every detail handled with care.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-2 sm:justify-end">
                            {tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="text-[11px] font-medium px-2.5 py-1 rounded-full"
                                    style={{
                                        background: "rgba(26,58,140,0.07)",
                                        color: "var(--navy)",
                                        border: "1px solid rgba(26,58,140,0.1)",
                                    }}
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── Reel + Carousel ── */}
                <div className="grid grid-cols-1 lg:grid-cols-[267px_1fr] gap-12 items-start">

                    {/* Reel */}
                    <div className="flex flex-col gap-3 mr-10">
                        {/* Phone mockup */}
                        <div
                            className="relative mx-auto"
                            style={{
                                width: 295,
                                background: "#E8E8ED",
                                borderRadius: 44,
                                padding: "12px 8px",
                                boxShadow: `
            0 0 0 1.5px #C8C8D0,
            0 0 0 3px #E8E8ED,
            0 0 0 4px #B8B8C2,
            0 28px 60px rgba(0,0,0,0.18),
            0 8px 20px rgba(0,0,0,0.10),
            inset 0 1px 0 rgba(255,255,255,0.9)
        `,
                            }}
                        >
                            {/* Side buttons — volume */}
                            <div style={{ position: "absolute", left: -3, top: 88, width: 3, height: 28, background: "#C0C0C8", borderRadius: "2px 0 0 2px" }} />
                            <div style={{ position: "absolute", left: -3, top: 124, width: 3, height: 28, background: "#C0C0C8", borderRadius: "2px 0 0 2px" }} />
                            {/* Side button — power */}
                            <div style={{ position: "absolute", right: -3, top: 108, width: 3, height: 52, background: "#C0C0C8", borderRadius: "0 2px 2px 0" }} />

                            {/* Screen bezel */}
                            <div
                                style={{
                                    borderRadius: 36,
                                    overflow: "hidden",
                                    background: "#fff",
                                    position: "relative",
                                }}
                            >
                                {/* Status bar */}
                                <div
                                    style={{
                                        height: 44,
                                        background: "#fff",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        padding: "0 20px",
                                        position: "relative",
                                        zIndex: 2,
                                    }}
                                >
                                    {/* Dynamic island */}
                                    <div style={{
                                        position: "absolute",
                                        left: "50%",
                                        top: 10,
                                        transform: "translateX(-50%)",
                                        width: 88,
                                        height: 24,
                                        background: "#111",
                                        borderRadius: 20,
                                    }} />

                                    <span style={{ fontSize: 11, fontWeight: 600, color: "#111", letterSpacing: 0.2 }}>9:41</span>
                                    <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                                        {/* Signal */}
                                        <svg width="15" height="10" viewBox="0 0 15 10" fill="#111">
                                            <rect x="0" y="6" width="2.5" height="4" rx="0.5" opacity="0.3" />
                                            <rect x="3.2" y="4" width="2.5" height="6" rx="0.5" opacity="0.5" />
                                            <rect x="6.4" y="2" width="2.5" height="8" rx="0.5" opacity="0.75" />
                                            <rect x="9.6" y="0" width="2.5" height="10" rx="0.5" />
                                        </svg>
                                        {/* Wifi */}
                                        <svg width="14" height="10" viewBox="0 0 14 10" fill="#111">
                                            <path d="M7 8.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                                            <path d="M3.5 5.8C4.6 4.7 5.7 4 7 4s2.4.7 3.5 1.8l1.2-1.2C10.2 3.1 8.7 2.3 7 2.3S3.8 3.1 2.3 4.6l1.2 1.2z" opacity="0.6" />
                                            <path d="M.8 3.1C2.4 1.5 4.6.5 7 .5s4.6 1 6.2 2.6l1.2-1.2C12.4.7 9.9-.3 7-.3S1.6.7.3 1.9L.8 3.1z" opacity="0.35" />
                                        </svg>
                                        {/* Battery */}
                                        <div style={{ display: "flex", alignItems: "center", gap: 1 }}>
                                            <div style={{ width: 20, height: 10, border: "1.2px solid rgba(0,0,0,0.35)", borderRadius: 2.5, padding: 1.5, display: "flex", alignItems: "center" }}>
                                                <div style={{ width: "80%", height: "100%", background: "#111", borderRadius: 1 }} />
                                            </div>
                                            <div style={{ width: 2, height: 5, background: "rgba(0,0,0,0.3)", borderRadius: "0 1px 1px 0" }} />
                                        </div>
                                    </div>
                                </div>

                                <div
                                    style={{ position: "relative", lineHeight: 0 }}
                                    onClick={() => {
                                        const x = window.scrollX;
                                        const y = window.scrollY;
                                        const lock = () => window.scrollTo(x, y);
                                        window.addEventListener("scroll", lock, { passive: false });
                                        setTimeout(() => window.removeEventListener("scroll", lock), 800);
                                    }}
                                >
                                    <ReelEmbed />
                                </div>

                                <div style={{ height: 28, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <div style={{ width: 100, height: 4, background: "rgba(0,0,0,0.15)", borderRadius: 2 }} />
                                </div>
                            </div>
                        </div>

                        {/* Watch on Facebook label */}
                        <div
                            className="rounded-xl px-4 py-3 mx-auto"
                            style={{
                                width: "295px",
                                background: "white",
                                border: "1px solid rgba(26,58,140,0.08)",
                                boxShadow: "0 1px 3px rgba(26,58,140,0.06)",
                            }}
                        >
                            <div className="flex items-center gap-2 mb-1">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="#1877F2">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                                <span className="text-[11px] font-semibold" style={{ color: "var(--navy)" }}>
                                    Watch on Facebook
                                </span>
                            </div>
                            <p className="text-[11px] leading-relaxed" style={{ color: "var(--muted)" }}>
                                See the full transformation from start to finish.
                            </p>
                        </div>
                    </div>

                    {/* Carousel — same component for all breakpoints */}
                    <div className="flex items-center">
                        <div className="w-full">
                            <PhotoCarousel onOpenLightbox={openLightbox} />
                        </div>
                    </div>
                </div>

                {/* ── Stats bar ── */}
                <div
                    className="mt-10 grid grid-cols-2 sm:grid-cols-4 rounded-2xl overflow-hidden"
                    style={{
                        background: "white",
                        border: "1px solid rgba(26,58,140,0.08)",
                        boxShadow:
                            "0 1px 3px rgba(26,58,140,0.07), 0 4px 16px rgba(26,58,140,0.05)",
                    }}
                >
                    {[
                        { value: "14", label: "Days on site" },
                        { value: "3", label: "Crew members" },
                        { value: "100%", label: "Client satisfaction" },
                        { value: "5★", label: "Google rating" },
                    ].map((stat, i) => (
                        <div
                            key={stat.label}
                            className="flex flex-col items-center py-5 px-4 text-center"
                            style={{
                                borderRight: i < 3 ? "1px solid rgba(26,58,140,0.08)" : "none",
                            }}
                        >
                            <span
                                className="text-[22px] font-bold tracking-tight"
                                style={{ color: "var(--navy)" }}
                            >
                                {stat.value}
                            </span>
                            <span className="text-[11px] mt-0.5" style={{ color: "var(--muted)" }}>
                                {stat.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {lightboxIndex !== null && (
                <Lightbox
                    photo={photos[lightboxIndex]}
                    index={lightboxIndex}
                    total={photos.length}
                    onClose={closeLightbox}
                    onPrev={prev}
                    onNext={next}
                />
            )}

            <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
        </section>
    );
}