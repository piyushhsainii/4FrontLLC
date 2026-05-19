"use client";

import { useState, useRef, useCallback, useEffect } from "react";

// ─── Project data ──────────────────────────────────────────────────────────────
const projects = [
    {
        id: "p3",
        title: "Storm Damage Repair",
        subtitle: "Emergency restoration after severe weather",
        tags: ["Roofing", "Emergency"],
        accent: "#1A3A8C",
        photos: [1, 2, 3, 4, 5, 6, 7, 8, 10].map((n) => ({
            id: n,
            src: `/p3/${n}.jpg`,
            alt: `Storm repair — photo ${n}`,
        })),
    },
    {
        id: "p5",
        title: "Full Exterior Overhaul",
        subtitle: "Siding, fascia & gutter replacement",
        tags: ["Siding", "Gutters"],
        accent: "#0F5C3A",
        photos: [1, 2, 3, 4, 5, 6, 8, 9, 10].map((n) => ({
            id: n,
            src: `/p5/${n}.jpg`,
            alt: `Exterior overhaul — photo ${n}`,
        })),
    },
    {
        id: "Project1",
        title: "Residential Re-Roof",
        subtitle: "Complete tear-off and architectural shingle install",
        tags: ["Roofing", "Shingles"],
        accent: "#7C3A1A",
        photos: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => ({
            id: n,
            src: `/Project1/${n}.jpg`,
            alt: `Re-roof project — photo ${n}`,
        })),
    },
    {
        id: "Project2",
        title: "Commercial Flat Roof",
        subtitle: "TPO membrane installation & drainage",
        tags: ["Commercial", "TPO"],
        accent: "#3A1A7C",
        photos: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => ({
            id: n,
            src: `/Project2/${n}.jpg`,
            alt: `Commercial flat roof — photo ${n}`,
        })),
    },
];

const mainTags = ["Roofing", "Drywall", "Painting", "Restoration"];
const mainPhotos = [
    { id: 1, src: "/roof_completed_1.jpg", alt: "Roof replacement in progress" },
    { id: 2, src: "/roof_completed_2.jpg", alt: "Drywall installation complete" },
    { id: 3, src: "/roof_completed_3.jpg", alt: "Exterior painting finished" },
    { id: 4, src: "/in_progress_shot.jpg", alt: "New roof shingles close-up" },
    { id: 5, src: "/in_progress_2.jpg", alt: "Interior restoration complete" },
    { id: 6, src: "/chimney_.jpg", alt: "Chimney — front elevation" },
    { id: 7, src: "/center_full_house.jpg", alt: "Completed project overview" },
];

// ─── Shared Lightbox ───────────────────────────────────────────────────────────
function Lightbox({
    photos,
    index,
    onClose,
    onPrev,
    onNext,
}: {
    photos: { src: string; alt: string }[];
    index: number;
    onClose: () => void;
    onPrev: () => void;
    onNext: () => void;
}) {
    return (
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center"
            style={{ background: "rgba(8,14,32,0.95)", backdropFilter: "blur(20px)" }}
            onClick={onClose}
        >
            <div
                className="absolute top-5 left-1/2 -translate-x-1/2 text-[11px] font-medium tracking-widest uppercase"
                style={{ color: "rgba(255,255,255,0.35)" }}
            >
                {index + 1} / {photos.length}
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
                    src={photos[index].src}
                    alt={photos[index].alt}
                    className="max-h-[80vh] max-w-full object-contain rounded-2xl"
                    style={{ boxShadow: "0 40px 100px rgba(0,0,0,0.7)" }}
                />
                <div
                    className="absolute bottom-0 left-0 right-0 px-5 py-4 rounded-b-2xl"
                    style={{ background: "linear-gradient(to top, rgba(0,0,0,0.65), transparent)" }}
                >
                    <p className="text-[13px] text-white/75">{photos[index].alt}</p>
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

// ─── ReelEmbed ─────────────────────────────────────────────────────────────────
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

// ─── PhotoCard (main carousel) ─────────────────────────────────────────────────
function PhotoCard({
    photo,
    onClick,
}: {
    photo: { src: string; alt: string };
    onClick: () => void;
}) {
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
                boxShadow: hovered ? "0 12px 40px rgba(26,58,140,0.18)" : "0 2px 10px rgba(26,58,140,0.08)",
            }}
            aria-label={`View: ${photo.alt}`}
        >
            <img src={photo.src} alt={photo.alt} className="absolute inset-0 w-full h-full object-cover" draggable={false} />
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

// ─── Main PhotoCarousel ────────────────────────────────────────────────────────
function PhotoCarousel({ onOpenLightbox }: { onOpenLightbox: (i: number) => void }) {
    const [page, setPage] = useState(0);
    const [dragging, setDragging] = useState(false);
    const [dragDelta, setDragDelta] = useState(0);
    const trackRef = useRef<HTMLDivElement>(null);
    const startX = useRef(0);
    const startPage = useRef(0);
    const PER_PAGE = 2;
    const totalPages = Math.ceil(mainPhotos.length / PER_PAGE);

    const goTo = useCallback((p: number) => {
        setPage(Math.max(0, Math.min(p, totalPages - 1)));
        setDragDelta(0);
    }, [totalPages]);

    const onPointerDown = (e: React.PointerEvent) => {
        startX.current = e.clientX; startPage.current = page;
        setDragging(true);
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    };
    const onPointerMove = (e: React.PointerEvent) => {
        if (!dragging) return;
        setDragDelta(e.clientX - startX.current);
    };
    const onPointerUp = (e: React.PointerEvent) => {
        if (!dragging) return;
        setDragging(false);
        const delta = e.clientX - startX.current;
        const trackW = trackRef.current?.offsetWidth ?? 1;
        if (Math.abs(delta) > trackW * 0.15) goTo(startPage.current + (delta < 0 ? 1 : -1));
        else setDragDelta(0);
    };

    const translatePct = -(page * 100) + (dragDelta / (trackRef.current?.offsetWidth ?? 1)) * 100;

    return (
        <div className="flex flex-col gap-4">
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
                    {Array.from({ length: totalPages }).map((_, pageIdx) => {
                        const pagePhotos = mainPhotos.slice(pageIdx * PER_PAGE, pageIdx * PER_PAGE + PER_PAGE);
                        return (
                            <div key={pageIdx} className="flex gap-2.5 flex-none w-full" style={{ padding: "0 2px" }}>
                                {pagePhotos.map((photo, slotIdx) => {
                                    const photoIdx = pageIdx * PER_PAGE + slotIdx;
                                    return <PhotoCard key={photo.id} photo={photo} onClick={() => onOpenLightbox(photoIdx)} />;
                                })}
                                {pagePhotos.length < PER_PAGE && <div className="flex-1" />}
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="flex items-center justify-between px-0.5">
                <div className="flex items-center gap-1.5">
                    {Array.from({ length: totalPages }).map((_, i) => (
                        <button key={i} onClick={() => goTo(i)} className="rounded-full transition-all duration-300 ease-out"
                            style={{ height: "5px", width: i === page ? "20px" : "5px", background: i === page ? "var(--navy)" : "rgba(26,58,140,0.18)" }}
                            aria-label={`Page ${i + 1}`} />
                    ))}
                </div>
                <div className="flex gap-2">
                    <button onClick={() => goTo(page - 1)} disabled={page === 0}
                        className="w-9 h-9 flex items-center justify-center rounded-full transition-opacity duration-200 disabled:opacity-25"
                        style={{ background: "white", color: "var(--navy)", border: "1px solid rgba(26,58,140,0.14)", boxShadow: "0 1px 4px rgba(26,58,140,0.08)" }}
                        aria-label="Previous">
                        <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </button>
                    <button onClick={() => goTo(page + 1)} disabled={page >= totalPages - 1}
                        className="w-9 h-9 flex items-center justify-center rounded-full transition-opacity duration-200 disabled:opacity-25"
                        style={{ background: "var(--navy)", color: "white", boxShadow: "0 2px 8px rgba(26,58,140,0.25)" }}
                        aria-label="Next">
                        <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </button>
                </div>
            </div>
        </div>
    );
}

// ─── StripCard (project carousel) ─────────────────────────────────────────────
// Receives pointerDownAt so it can distinguish tap vs drag at click time
function StripCard({
    photo,
    onOpen,
    accentColor,
    pointerDownX,
}: {
    photo: { src: string; alt: string };
    onOpen: () => void;
    accentColor: string;
    pointerDownX: React.MutableRefObject<number>;
}) {
    const [hovered, setHovered] = useState(false);

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        // If pointer moved more than 8px horizontally since mousedown, it was a drag — skip
        const moved = Math.abs(e.clientX - pointerDownX.current);
        if (moved > 8) return;
        onOpen();
    };

    return (
        <button
            onClick={handleClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="relative overflow-hidden rounded-xl text-left flex-shrink-0"
            style={{
                // Fixed width so cards don't collapse in a scroll container
                // On mobile (2 visible): ~48% of container; on desktop (4 visible): ~23%
                // We handle this via the parent's CSS grid/flex
                width: "100%",
                height: "280px",
                background: "var(--bg-alt)",
                border: "1px solid rgba(26,58,140,0.08)",
                transform: hovered ? "scale(1.015)" : "scale(1)",
                transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s ease",
                boxShadow: hovered
                    ? `0 12px 36px ${accentColor}28`
                    : "0 2px 8px rgba(26,58,140,0.07)",
                cursor: "pointer",
            }}
            aria-label={`View: ${photo.alt}`}
        >
            <img
                src={photo.src}
                alt={photo.alt}
                className="absolute inset-0 w-full h-full object-cover"
                draggable={false}
                style={{ pointerEvents: "none" }}
            />
            {/* Gradient overlay */}
            <div
                className="absolute inset-0 flex items-end p-3"
                style={{
                    background: "linear-gradient(to top, rgba(0,20,50,0.80) 0%, transparent 60%)",
                    opacity: hovered ? 1 : 0.6,
                    transition: "opacity 0.3s ease",
                    pointerEvents: "none",
                }}
            >
                <p className="text-white text-[11px] font-medium leading-snug drop-shadow">{photo.alt}</p>
            </div>
            {/* Expand icon */}
            <div
                className="absolute top-2.5 right-2.5 w-7 h-7 flex items-center justify-center rounded-full"
                style={{
                    background: "rgba(255,255,255,0.95)",
                    opacity: hovered ? 1 : 0.75,
                    transition: "opacity 0.25s ease, transform 0.25s ease",
                    transform: hovered ? "scale(1.1)" : "scale(1)",
                    boxShadow: "0 1px 6px rgba(0,0,0,0.18)",
                    pointerEvents: "none",
                }}
            >
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                    <path d="M7.5 1.5H10.5V4.5M10.5 1.5L6.5 5.5M4.5 10.5H1.5V7.5M1.5 10.5L5.5 6.5"
                        stroke={accentColor} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
        </button>
    );
}

// ─── ProjectStrip ──────────────────────────────────────────────────────────────
// Uses CSS scroll-snap so the browser handles drag/swipe natively.
// This means child onClick fires cleanly — no pointer-capture interference.
function ProjectStrip({
    photos,
    onOpen,
    accentColor,
}: {
    photos: { id: number; src: string; alt: string }[];
    onOpen: (i: number) => void;
    accentColor: string;
}) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [activePage, setActivePage] = useState(0);
    const pointerDownX = useRef(0); // shared with StripCard to detect drag vs tap

    // Responsive: 2 visible on mobile, 4 on desktop
    const [perPage, setPerPage] = useState(4);
    useEffect(() => {
        const update = () => setPerPage(window.innerWidth < 640 ? 2 : 4);
        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, []);

    const totalPages = Math.ceil(photos.length / perPage);

    // Track which page is visible via scroll position
    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;
        const onScroll = () => {
            const page = Math.round(el.scrollLeft / el.offsetWidth);
            setActivePage(page);
        };
        el.addEventListener("scroll", onScroll, { passive: true });
        return () => el.removeEventListener("scroll", onScroll);
    }, []);

    // Reset scroll when photos change (tab switch)
    useEffect(() => {
        if (scrollRef.current) scrollRef.current.scrollLeft = 0;
        setActivePage(0);
    }, [photos]);

    const goTo = useCallback((page: number) => {
        const el = scrollRef.current;
        if (!el) return;
        const clamped = Math.max(0, Math.min(page, totalPages - 1));
        el.scrollTo({ left: clamped * el.offsetWidth, behavior: "smooth" });
    }, [totalPages]);

    // Record X on pointerdown — StripCard onClick reads it to detect drag
    const handlePointerDown = (e: React.PointerEvent) => {
        pointerDownX.current = e.clientX;
    };

    return (
        <div className="flex flex-col gap-3">
            {/* Scroll container */}
            <div
                ref={scrollRef}
                onPointerDown={handlePointerDown}
                style={{
                    display: "grid",
                    // 2 or 4 equal columns, each = 1 page width segment
                    gridTemplateColumns: `repeat(${photos.length}, calc((100% - ${(perPage - 1) * 10}px) / ${perPage}))`,
                    gap: "10px",
                    overflowX: "auto",
                    scrollSnapType: "x mandatory",
                    scrollBehavior: "smooth",
                    WebkitOverflowScrolling: "touch",
                    // Hide scrollbar
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                }}
                className="[&::-webkit-scrollbar]:hidden"
            >
                {photos.map((photo, i) => (
                    <div
                        key={photo.id}
                        style={{
                            scrollSnapAlign: i % perPage === 0 ? "start" : "none",
                        }}
                    >
                        <StripCard
                            photo={photo}
                            onOpen={() => onOpen(i)}
                            accentColor={accentColor}
                            pointerDownX={pointerDownX}
                        />
                    </div>
                ))}
            </div>

            {/* Dots + arrows */}
            <div className="flex items-center justify-between px-0.5 mt-1">
                <div className="flex items-center gap-1.5">
                    {Array.from({ length: totalPages }).map((_, i) => (
                        <button
                            key={i}
                            onClick={() => goTo(i)}
                            className="rounded-full transition-all duration-300 ease-out"
                            style={{
                                height: "4px",
                                width: i === activePage ? "20px" : "4px",
                                background: i === activePage ? accentColor : `${accentColor}35`,
                            }}
                            aria-label={`Page ${i + 1}`}
                        />
                    ))}
                </div>
                <div className="flex gap-1.5">
                    <button
                        onClick={() => goTo(activePage - 1)}
                        disabled={activePage === 0}
                        className="w-8 h-8 flex items-center justify-center rounded-full transition-opacity disabled:opacity-25"
                        style={{
                            background: "white",
                            color: accentColor,
                            border: `1px solid ${accentColor}22`,
                            boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
                        }}
                        aria-label="Previous"
                    >
                        <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
                            <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                    <button
                        onClick={() => goTo(activePage + 1)}
                        disabled={activePage >= totalPages - 1}
                        className="w-8 h-8 flex items-center justify-center rounded-full transition-opacity disabled:opacity-25"
                        style={{
                            background: accentColor,
                            color: "white",
                            boxShadow: `0 2px 8px ${accentColor}45`,
                        }}
                        aria-label="Next"
                    >
                        <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
                            <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}

// ─── ProjectTab ────────────────────────────────────────────────────────────────
function ProjectTab({
    project,
    active,
    onClick,
}: {
    project: (typeof projects)[0];
    active: boolean;
    onClick: () => void;
}) {
    return (
        <button
            onClick={onClick}
            className="flex flex-col items-start gap-1 px-4 py-3 rounded-xl transition-all duration-300 text-left flex-1"
            style={{
                background: active ? "white" : "transparent",
                border: active ? `1.5px solid ${project.accent}28` : "1.5px solid transparent",
                boxShadow: active ? `0 4px 16px ${project.accent}18, 0 1px 4px rgba(0,0,0,0.06)` : "none",
            }}
            aria-selected={active}
        >
            <div className="w-5 h-1.5 rounded-full" style={{ background: project.accent, opacity: active ? 1 : 0.3, transition: "opacity 0.3s" }} />
            <span className="text-[12px] font-semibold leading-tight" style={{ color: active ? project.accent : "var(--muted)" }}>
                {project.title}
            </span>
            <span className="text-[10px] leading-snug hidden sm:block" style={{ color: active ? "var(--muted)" : "rgba(0,0,0,0.28)" }}>
                {project.photos.length} photos
            </span>
        </button>
    );
}

// ─── Main export ───────────────────────────────────────────────────────────────
export default function ProjectShowcase() {
    // Main showcase lightbox
    const [mainLightboxIdx, setMainLightboxIdx] = useState<number | null>(null);
    // Project carousel lightbox: { projectIdx, photoIdx }
    const [projectLightbox, setProjectLightbox] = useState<{ projectIdx: number; photoIdx: number } | null>(null);
    // Active project tab
    const [activeIdx, setActiveIdx] = useState(0);

    // ── Main lightbox handlers
    const openMain = (i: number) => setMainLightboxIdx(i);
    const closeMain = () => setMainLightboxIdx(null);
    const prevMain = () => setMainLightboxIdx((i) => (i === null ? null : (i - 1 + mainPhotos.length) % mainPhotos.length));
    const nextMain = () => setMainLightboxIdx((i) => (i === null ? null : (i + 1) % mainPhotos.length));

    // ── Project lightbox handlers
    const openProject = useCallback((projectIdx: number, photoIdx: number) => {
        setProjectLightbox({ projectIdx, photoIdx });
    }, []);
    const closeProject = () => setProjectLightbox(null);
    const prevProject = () => {
        setProjectLightbox((l) => {
            if (!l) return l;
            const total = projects[l.projectIdx].photos.length;
            return { ...l, photoIdx: (l.photoIdx - 1 + total) % total };
        });
    };
    const nextProject = () => {
        setProjectLightbox((l) => {
            if (!l) return l;
            const total = projects[l.projectIdx].photos.length;
            return { ...l, photoIdx: (l.photoIdx + 1) % total };
        });
    };

    const activeProject = projects[activeIdx];

    return (
        <>
            <section
                className="relative py-20 px-4 overflow-hidden"
                style={{ background: "var(--bg)" }}
            >
                {/* Dot grid */}
                <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                        backgroundImage: "radial-gradient(circle at 1px 1px, rgba(26,58,140,0.045) 1px, transparent 0)",
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
                                    className="text-[clamp(26px,4vw,40px)] font-bold leading-tight tracking-tight text-center lg:text-start"
                                    style={{ color: "var(--text)" }}
                                >
                                    Full home restoration —
                                    <br />
                                    <span style={{ color: "var(--navy-mid)" }}>roof to interior</span>
                                </h2>
                                <p className="mt-3 text-center lg:text-start text-[14px] leading-relaxed max-w-lg" style={{ color: "var(--muted)" }}>
                                    Two weeks of non-stop work by Chris, Tommy, and Evan. Roofing, drywall, paint — every detail handled with care.
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-2 sm:justify-end">
                                {mainTags.map((tag) => (
                                    <span key={tag} className="text-[11px] font-medium px-2.5 py-1 rounded-full"
                                        style={{ background: "rgba(26,58,140,0.07)", color: "var(--navy)", border: "1px solid rgba(26,58,140,0.1)" }}>
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
                            <div className="relative mx-auto" style={{
                                width: 295, background: "#E8E8ED", borderRadius: 44, padding: "12px 8px",
                                boxShadow: "0 0 0 1.5px #C8C8D0, 0 0 0 3px #E8E8ED, 0 0 0 4px #B8B8C2, 0 28px 60px rgba(0,0,0,0.18), 0 8px 20px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,0.9)",
                            }}>
                                <div style={{ position: "absolute", left: -3, top: 88, width: 3, height: 28, background: "#C0C0C8", borderRadius: "2px 0 0 2px" }} />
                                <div style={{ position: "absolute", left: -3, top: 124, width: 3, height: 28, background: "#C0C0C8", borderRadius: "2px 0 0 2px" }} />
                                <div style={{ position: "absolute", right: -3, top: 108, width: 3, height: 52, background: "#C0C0C8", borderRadius: "0 2px 2px 0" }} />
                                <div style={{ borderRadius: 36, overflow: "hidden", background: "#fff", position: "relative" }}>
                                    <div style={{ height: 44, background: "#fff", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", position: "relative", zIndex: 2 }}>
                                        <div style={{ position: "absolute", left: "50%", top: 10, transform: "translateX(-50%)", width: 88, height: 24, background: "#111", borderRadius: 20 }} />
                                        <span style={{ fontSize: 11, fontWeight: 600, color: "#111", letterSpacing: 0.2 }}>9:41</span>
                                        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                                            <svg width="15" height="10" viewBox="0 0 15 10" fill="#111">
                                                <rect x="0" y="6" width="2.5" height="4" rx="0.5" opacity="0.3" />
                                                <rect x="3.2" y="4" width="2.5" height="6" rx="0.5" opacity="0.5" />
                                                <rect x="6.4" y="2" width="2.5" height="8" rx="0.5" opacity="0.75" />
                                                <rect x="9.6" y="0" width="2.5" height="10" rx="0.5" />
                                            </svg>
                                            <svg width="14" height="10" viewBox="0 0 14 10" fill="#111">
                                                <path d="M7 8.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                                                <path d="M3.5 5.8C4.6 4.7 5.7 4 7 4s2.4.7 3.5 1.8l1.2-1.2C10.2 3.1 8.7 2.3 7 2.3S3.8 3.1 2.3 4.6l1.2 1.2z" opacity="0.6" />
                                                <path d="M.8 3.1C2.4 1.5 4.6.5 7 .5s4.6 1 6.2 2.6l1.2-1.2C12.4.7 9.9-.3 7-.3S1.6.7.3 1.9L.8 3.1z" opacity="0.35" />
                                            </svg>
                                            <div style={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                <div style={{ width: 20, height: 10, border: "1.2px solid rgba(0,0,0,0.35)", borderRadius: 2.5, padding: 1.5, display: "flex", alignItems: "center" }}>
                                                    <div style={{ width: "80%", height: "100%", background: "#111", borderRadius: 1 }} />
                                                </div>
                                                <div style={{ width: 2, height: 5, background: "rgba(0,0,0,0.3)", borderRadius: "0 1px 1px 0" }} />
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ position: "relative", lineHeight: 0 }} onClick={() => {
                                        const x = window.scrollX; const y = window.scrollY;
                                        const lock = () => window.scrollTo(x, y);
                                        window.addEventListener("scroll", lock, { passive: false });
                                        setTimeout(() => window.removeEventListener("scroll", lock), 800);
                                    }}>
                                        <ReelEmbed />
                                    </div>
                                    <div style={{ height: 28, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        <div style={{ width: 100, height: 4, background: "rgba(0,0,0,0.15)", borderRadius: 2 }} />
                                    </div>
                                </div>
                            </div>
                            <div className="rounded-xl px-4 py-3 mx-auto" style={{ width: "295px", background: "white", border: "1px solid rgba(26,58,140,0.08)", boxShadow: "0 1px 3px rgba(26,58,140,0.06)" }}>
                                <div className="flex items-center gap-2 mb-1">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="#1877F2">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                    <span className="text-[11px] font-semibold" style={{ color: "var(--navy)" }}>Watch on Facebook</span>
                                </div>
                                <p className="text-[11px] leading-relaxed" style={{ color: "var(--muted)" }}>See the full transformation from start to finish.</p>
                            </div>
                        </div>

                        {/* Main photo carousel */}
                        <div className="flex items-center">
                            <div className="w-full">
                                <PhotoCarousel onOpenLightbox={openMain} />
                            </div>
                        </div>
                    </div>

                    {/* ══════════════════════════════════════════════════════ */}
                    {/* ── Projects Multi-Carousel ── */}
                    {/* ══════════════════════════════════════════════════════ */}
                    <div className="mt-16">
                        {/* Section header */}
                        <div className="mb-7">
                            <div
                                className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4"
                                style={{ background: "rgba(26,58,140,0.07)", color: "var(--navy)" }}
                            >
                                <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--green)" }} />
                                More Projects
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
                                <div>
                                    <h2
                                        className="text-[clamp(20px,3vw,30px)] font-bold leading-tight tracking-tight"
                                        style={{ color: "var(--text)" }}
                                    >
                                        More of our work
                                    </h2>
                                    <p className="mt-1.5 text-[13px] leading-relaxed max-w-md" style={{ color: "var(--muted)" }}>
                                        Click any photo to view full size. Tap a project to browse its gallery.
                                    </p>
                                </div>
                                <div
                                    className="text-[11px] font-semibold px-3 py-1.5 rounded-full self-start sm:self-auto"
                                    style={{ background: "rgba(26,58,140,0.07)", color: "var(--navy)", border: "1px solid rgba(26,58,140,0.1)" }}
                                >
                                    {projects.length} projects · {projects.reduce((a, p) => a + p.photos.length, 0)} photos
                                </div>
                            </div>
                        </div>

                        {/* Project tabs */}
                        <div
                            className="grid gap-2 mb-5"
                            style={{ gridTemplateColumns: `repeat(${projects.length}, 1fr)` }}
                        >
                            {projects.map((proj, i) => (
                                <ProjectTab
                                    key={proj.id}
                                    project={proj}
                                    active={i === activeIdx}
                                    onClick={() => setActiveIdx(i)}
                                />
                            ))}
                        </div>

                        {/* Active project panel */}
                        <div
                            className="rounded-2xl p-6"
                            style={{
                                background: "white",
                                border: `1.5px solid ${activeProject.accent}1A`,
                                boxShadow: `0 8px 40px ${activeProject.accent}0D`,
                                transition: "border-color 0.4s, box-shadow 0.4s",
                            }}
                        >
                            {/* Panel header */}
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-1 h-9 rounded-full flex-shrink-0" style={{ background: activeProject.accent }} />
                                    <div>
                                        <h3 className="text-[16px] font-bold leading-tight" style={{ color: activeProject.accent }}>
                                            {activeProject.title}
                                        </h3>
                                        <p className="text-[12px] mt-0.5" style={{ color: "var(--muted)" }}>
                                            {activeProject.subtitle}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-1.5">
                                    {activeProject.tags.map((tag) => (
                                        <span key={tag} className="text-[10px] font-semibold px-2.5 py-1 rounded-full"
                                            style={{ background: `${activeProject.accent}12`, color: activeProject.accent, border: `1px solid ${activeProject.accent}25` }}>
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Strip carousel — 2 per page on mobile, 4 on desktop; accent-colored controls */}
                            <ProjectStrip
                                photos={activeProject.photos}
                                onOpen={(photoIdx) => openProject(activeIdx, photoIdx)}
                                accentColor={activeProject.accent}
                            />
                        </div>
                    </div>
                    {/* ── End Projects Multi-Carousel ── */}

                </div>
            </section>

            {/* ── Main lightbox ── */}
            {mainLightboxIdx !== null && (
                <Lightbox
                    photos={mainPhotos}
                    index={mainLightboxIdx}
                    onClose={closeMain}
                    onPrev={prevMain}
                    onNext={nextMain}
                />
            )}

            {/* ── Project lightbox ── */}
            {projectLightbox !== null && (
                <Lightbox
                    photos={projects[projectLightbox.projectIdx].photos}
                    index={projectLightbox.photoIdx}
                    onClose={closeProject}
                    onPrev={prevProject}
                    onNext={nextProject}
                />
            )}
        </>
    );
}