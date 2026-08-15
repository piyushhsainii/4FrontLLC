'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { CATEGORIES, assetUrl } from './project-manifest';

/**
 * Projects
 * --------
 * Flat masonry gallery: every file inside every CategoryConfig becomes
 * its OWN card (flatMap over categories -> files), not one card per
 * category. This produces the dense, varied Pinterest-style wall.
 *
 * Masonry:
 * - CSS `columns` with no fixed aspect ratio on cards, so each image
 *   renders at its natural size — that's what creates the organic,
 *   varied-height packing (as opposed to a uniform grid).
 *
 * Lazy loading:
 * 1. Every card image/video uses native `loading="lazy"` / `preload="metadata"`
 *    and fades in once decoded.
 * 2. Cards are revealed progressively as the user scrolls — an
 *    IntersectionObserver watches a sentinel at the bottom of the grid
 *    and reveals the next batch when it comes into view.
 * 3. Clicking a card opens a full-size lightbox with prev/next through
 *    the whole flattened set.
 */

type MediaItem = {
    id: string;
    src: string;
    type: 'image' | 'video';
};

// Deterministic shuffle (mulberry32 PRNG with a fixed seed) so the order
// is mixed across categories but stable between renders/reloads — no
// hydration mismatch between server and client.
function seededShuffle<T>(arr: T[], seed = 42): T[] {
    let s = seed;
    const rand = () => {
        s |= 0;
        s = (s + 0x6d2b79f5) | 0;
        let t = Math.imul(s ^ (s >>> 15), 1 | s);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
    const result = [...arr];
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(rand() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
}

// Flatten every category's files into one flat list, then shuffle so the
// wall mixes categories together instead of rendering as grouped blocks.
const ALL_ITEMS: MediaItem[] = seededShuffle(
    CATEGORIES.flatMap((cat) =>
        cat.files.map((f, i) => ({
            id: `${cat.id}-${i}`,
            src: assetUrl(cat, f),
            type: cat.kind,
        }))
    )
);

// How many cards get revealed per scroll-triggered batch.
const PAGE_SIZE = 12;

function TypeBadge({ type }: { type: 'image' | 'video' }) {
    if (type !== 'video') return null;
    return (
        <span className="absolute right-3 top-3 flex items-center justify-center rounded-full bg-white/90 p-1.5 shadow-sm backdrop-blur-sm">
            <svg className="h-3.5 w-3.5 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
        </span>
    );
}

/**
 * Renders at natural aspect ratio (no forced crop) — required for real
 * masonry packing. Uses native `loading="lazy"` / `preload="metadata"` for
 * lazy fetch; deliberately does NOT gate visibility behind a JS load-event
 * state — relying on onLoad/onLoadedData firing reliably caused cards to
 * get stuck invisible whenever an event was missed (cached assets, video
 * codec/CORS edge cases, etc). The browser handles the lazy fetch; we just
 * render normally once the element exists.
 */
function CardMedia({ item }: { item: MediaItem }) {
    if (item.type === 'video') {
        return (
            <video
                src={item.src}
                muted
                playsInline
                preload="metadata"
                className="block w-full transition-transform duration-500 ease-out group-hover:scale-105"
            />
        );
    }
    return (
        <img
            src={item.src}
            alt=""
            loading="lazy"
            decoding="async"
            className="block w-full transition-transform duration-500 ease-out group-hover:scale-105"
        />
    );
}

/**
 * Reveals its child with a fade + slight rise once it scrolls into view.
 * Deliberately decoupled from image load state (that caused the earlier
 * stuck-invisible bug) — this only reacts to scroll position. Unobserves
 * after first reveal so it costs nothing once animated in.
 */
function Reveal({ children }: { children: ReactNode }) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.unobserve(el);
                }
            },
            { rootMargin: '80px 0px', threshold: 0.01 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={`transition-[opacity,transform] duration-500 ease-out ${visible ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0 will-change-transform'
                }`}
        >
            {children}
        </div>
    );
}

function Card({ item, onOpen }: { item: MediaItem; onOpen: () => void }) {
    return (
        <button
            type="button"
            onClick={onOpen}
            className="group relative block w-full overflow-hidden rounded-2xl bg-muted text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
        >
            <CardMedia item={item} />
            <TypeBadge type={item.type} />
        </button>
    );
}

function Lightbox({
    items,
    startIndex,
    onClose,
}: {
    items: MediaItem[];
    startIndex: number;
    onClose: () => void;
}) {
    const [index, setIndex] = useState(startIndex);
    const item = items[index];

    useEffect(() => {
        function onKey(e: KeyboardEvent) {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowRight') setIndex((i) => Math.min(i + 1, items.length - 1));
            if (e.key === 'ArrowLeft') setIndex((i) => Math.max(i - 1, 0));
        }
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [items.length, onClose]);

    return (
        <div className="fixed inset-0 z-50 flex flex-col bg-black/95 p-4 md:p-8">
            <div className="mb-4 flex items-center justify-between text-white">
                <span className="text-sm text-white/70">
                    {index + 1} / {items.length}
                </span>
                <button
                    type="button"
                    onClick={onClose}
                    className="rounded-full p-2 hover:bg-white/10"
                    aria-label="Close"
                >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <div className="relative flex flex-1 items-center justify-center overflow-hidden">
                {index > 0 && (
                    <button
                        type="button"
                        onClick={() => setIndex((i) => i - 1)}
                        aria-label="Previous"
                        className="absolute left-0 z-10 rounded-full p-2 text-white hover:bg-white/10"
                    >
                        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                )}

                {item.type === 'video' ? (
                    <video
                        key={item.id}
                        src={item.src}
                        controls
                        autoPlay
                        preload="none"
                        className="max-h-full max-w-full rounded-lg"
                    />
                ) : (
                    <img key={item.id} src={item.src} alt="" className="max-h-full max-w-full rounded-lg object-contain" />
                )}

                {index < items.length - 1 && (
                    <button
                        type="button"
                        onClick={() => setIndex((i) => i + 1)}
                        aria-label="Next"
                        className="absolute right-0 z-10 rounded-full p-2 text-white hover:bg-white/10"
                    >
                        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                )}
            </div>
        </div>
    );
}

export default function page() {
    const [visibleCount, setVisibleCount] = useState(Math.min(PAGE_SIZE, ALL_ITEMS.length));
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const sentinelRef = useRef<HTMLDivElement | null>(null);

    const visibleItems = ALL_ITEMS.slice(0, visibleCount);
    const hasMore = visibleCount < ALL_ITEMS.length;

    // Scroll-driven progressive loading: reveal the next batch of cards
    // as the sentinel div nears the viewport — no button, no manual click.
    useEffect(() => {
        if (!hasMore) return;
        const el = sentinelRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setVisibleCount((count) => Math.min(count + PAGE_SIZE, ALL_ITEMS.length));
                }
            },
            { rootMargin: '600px 0px' } // start loading well before it's on-screen
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [hasMore]);

    return (
        <section id="projects" className="px-6 py-24">
            <div className="mx-auto max-w-6xl mt-10">
                <h2 className="mb-4 text-3xl font-normal tracking-tighter text-foreground ">
                    Our Projects
                </h2>
                <p className="mb-12 max-w-2xl text-base leading-5 text-muted-foreground md:text-lg tracking-tighter ">
                    Explore our portfolio of structural integrity and premium craftsmanship. From
                    robust commercial roofing to precise residential framing, every project is a
                    testament to our commitment to excellence.
                </p>

                {/* True masonry: columns own the layout, each card keeps its
                    natural aspect ratio, tight gaps for a dense Pinterest-style pack. */}
                <div className="columns-2 gap-3 sm:columns-3 lg:columns-4 xl:columns-5 [&>*]:mb-3 [&>*]:break-inside-avoid">
                    {visibleItems.map((item, i) => (
                        <Reveal key={item.id}>
                            <Card item={item} onOpen={() => setOpenIndex(i)} />
                        </Reveal>
                    ))}
                </div>

                {/* Sentinel — invisible, triggers the next batch when scrolled near */}
                {hasMore && <div ref={sentinelRef} aria-hidden className="h-1 w-full" />}
            </div>

            {openIndex !== null && (
                <Lightbox items={visibleItems} startIndex={openIndex} onClose={() => setOpenIndex(null)} />
            )}
        </section>
    );
}