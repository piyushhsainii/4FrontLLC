'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo, CSSProperties } from 'react';
import { CATEGORIES, CategoryConfig, assetUrl } from './../app/projects/project-manifest';
import InfiniteCurvedCarousel from './infinite-carousel';

/* ============================================================================
   DESIGN TOKENS — swap hex values here to re-theme everything below.
   ============================================================================ */
const TOKENS: CSSProperties = {
    ['--navy-950' as any]: '#0B1F3A',
    ['--navy-900' as any]: '#0F2A4D',
    ['--slate-50' as any]: '#F5F7FA',
    ['--slate-100' as any]: '#EDF0F5',
    ['--slate-200' as any]: '#E1E6EE',
    ['--slate-400' as any]: '#8A95A6',
    ['--slate-600' as any]: '#4B5566',
    ['--ink' as any]: '#111827',
    ['--accent' as any]: '#2F6FED',
    ['--white' as any]: '#FFFFFF',
    ['--radius-lg' as any]: '16px',
    ['--radius-md' as any]: '10px',
    ['--space-1' as any]: '4px',
    ['--space-2' as any]: '8px',
    ['--space-3' as any]: '12px',
    ['--space-4' as any]: '16px',
    ['--space-5' as any]: '24px',
    ['--space-6' as any]: '32px',
    ['--space-8' as any]: '48px',
};

const AUTOPLAY_MS = 5000;
const PRELOAD_WINDOW = 1;
const ROW_HEIGHT = 560;

function useReducedMotion(): boolean {
    const [reduced, setReduced] = useState(false);
    useEffect(() => {
        const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
        setReduced(mq.matches);
        const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
        mq.addEventListener('change', handler);
        return () => mq.removeEventListener('change', handler);
    }, []);
    return reduced;
}

function useHoverCapable(): boolean {
    const [hoverCapable, setHoverCapable] = useState(true);
    useEffect(() => {
        const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
        setHoverCapable(mq.matches);
        const handler = (e: MediaQueryListEvent) => setHoverCapable(e.matches);
        mq.addEventListener('change', handler);
        return () => mq.removeEventListener('change', handler);
    }, []);
    return hoverCapable;
}

interface VideoSlideProps {
    src: string;
    isActive: boolean;
    playing: boolean;
    inView: boolean;
    singleVideo: boolean;
    onEnded: () => void;
    onLoadedMeta: (w: number, h: number, durationMs: number) => void;
    preload: 'auto' | 'metadata' | 'none';
}

function VideoSlide({ src, isActive, playing, inView, singleVideo, onEnded, onLoadedMeta, preload }: VideoSlideProps) {
    const ref = useRef<HTMLVideoElement | null>(null);
    const wantsPlayRef = useRef(false);

    const attemptPlay = useCallback(() => {
        const el = ref.current;
        if (!el) return;
        const p = el.play();
        if (p && typeof p.catch === 'function') {
            p.catch(() => { });
        }
    }, []);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        wantsPlayRef.current = isActive && playing && inView;
        if (wantsPlayRef.current) {
            attemptPlay();
        } else {
            el.pause();
            if (!isActive) {
                try {
                    el.currentTime = 0;
                } catch { }
            }
        }
    }, [isActive, playing, inView, attemptPlay]);

    return (
        <video
            ref={ref}
            className="showcase-media"
            src={src}
            muted
            loop={singleVideo}
            playsInline
            autoPlay={isActive && playing && inView}
            preload={preload}
            onLoadedMetadata={(e) => {
                const v = e.currentTarget;
                onLoadedMeta(v.videoWidth, v.videoHeight, v.duration * 1000);
            }}
            onCanPlay={() => {
                if (wantsPlayRef.current) attemptPlay();
            }}
            onEnded={() => {
                if (!singleVideo) onEnded();
            }}
        />
    );
}

interface CellProps {
    category: CategoryConfig;
    size: 'lg' | 'sm';
    onRatio?: (ratio: number) => void;
}

function Cell({ category, size, onRatio }: CellProps) {
    const [index, setIndex] = useState(0);
    const [playing, setPlaying] = useState(true);
    const [inView, setInView] = useState(true);
    const [segmentKey, setSegmentKey] = useState(0);
    const [videoDurationMs, setVideoDurationMs] = useState(AUTOPLAY_MS);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const reducedMotion = useReducedMotion();
    const hoverCapable = useHoverCapable();

    const files = category.files;
    const total = files.length;
    const isVideo = category.kind === 'video';
    const singleVideo = isVideo && total <= 1;
    const segmentDurationMs = isVideo ? videoDurationMs : AUTOPLAY_MS;

    useEffect(() => {
        const node = containerRef.current;
        if (!node) return;
        const observer = new IntersectionObserver(
            ([entry]) => setInView(entry.isIntersecting),
            { threshold: 0.3 }
        );
        observer.observe(node);
        const onVisibility = () => setInView(!document.hidden);
        document.addEventListener('visibilitychange', onVisibility);
        return () => {
            observer.disconnect();
            document.removeEventListener('visibilitychange', onVisibility);
        };
    }, []);

    const goTo = useCallback(
        (next: number) => {
            if (total === 0) return;
            setIndex(((next % total) + total) % total);
            setSegmentKey((k) => k + 1);
        },
        [total]
    );
    const next = useCallback(() => goTo(index + 1), [goTo, index]);
    const prev = useCallback(() => goTo(index - 1), [goTo, index]);

    useEffect(() => {
        if (timerRef.current) clearInterval(timerRef.current);
        if (!playing || !inView || reducedMotion || total <= 1 || isVideo) {
            return;
        }
        timerRef.current = setInterval(() => {
            setIndex((i) => (i + 1) % total);
            setSegmentKey((k) => k + 1);
        }, AUTOPLAY_MS);
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [playing, inView, reducedMotion, total, isVideo, index]);

    const visibleSlides = useMemo(() => {
        if (total === 0) return [];
        const set: { i: number; offset: number; file: string }[] = [];
        for (let offset = -PRELOAD_WINDOW; offset <= PRELOAD_WINDOW; offset++) {
            const i = (((index + offset) % total) + total) % total;
            set.push({ i, offset, file: files[i] });
        }
        return set;
    }, [index, total, files]);

    const reportRatio = useCallback(
        (w: number, h: number) => {
            if (!onRatio || !w || !h) return;
            onRatio(w / h);
        },
        [onRatio]
    );

    if (total === 0) {
        return (
            <div className={`showcase-cell showcase-cell-${size} showcase-empty`}>
                <p>No {category.label.toLowerCase()} assets configured.</p>
            </div>
        );
    }

    const barPlayState = playing && inView && !reducedMotion ? 'running' : 'paused';

    const fillStyle = (active: boolean): CSSProperties =>
        active
            ? {
                width: '100%',
                animationName: 'showcase-fill',
                animationDuration: `${segmentDurationMs}ms`,
                animationTimingFunction: 'linear',
                animationFillMode: 'forwards',
                animationPlayState: barPlayState,
            }
            : { width: '0%' };

    return (
        <div
            ref={containerRef}
            className={`showcase-cell showcase-cell-${size}`}
            role="region"
            aria-roledescription="carousel"
            aria-label={`${category.label} slideshow`}
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === 'ArrowRight') next();
                if (e.key === 'ArrowLeft') prev();
                if (e.key === ' ') {
                    e.preventDefault();
                    setPlaying((p) => !p);
                }
            }}
            onMouseEnter={() => {
                if (!hoverCapable) return;
                if (!isVideo) setPlaying(false);
            }}
            onMouseLeave={() => hoverCapable && setPlaying(true)}
        >
            {total > 1 && (
                <div className="showcase-progress" role="tablist" aria-label={`${category.label} slides`}>
                    {total <= 8 ? (
                        files.map((_, i) => (
                            <button
                                key={i}
                                type="button"
                                className="showcase-progress-seg"
                                role="tab"
                                aria-selected={i === index}
                                aria-label={`Go to slide ${i + 1} of ${total}`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    goTo(i);
                                }}
                            >
                                <span
                                    className="showcase-progress-fill"
                                    key={i === index ? `${segmentKey}-${i}` : i}
                                    style={i < index ? { width: '100%' } : fillStyle(i === index)}
                                />
                            </button>
                        ))
                    ) : (
                        <div className="showcase-progress-seg" aria-hidden="true" style={{ flex: 1 }}>
                            <span
                                className="showcase-progress-fill"
                                style={{ width: `${((index + 1) / total) * 100}%`, transition: 'width 420ms ease' }}
                            />
                        </div>
                    )}
                </div>
            )}

            {total > 1 && (
                <>
                    <button
                        type="button"
                        className="showcase-nav showcase-nav-prev"
                        aria-label="Previous slide"
                        onClick={(e) => {
                            e.stopPropagation();
                            prev();
                        }}
                    >
                        ‹
                    </button>
                    <button
                        type="button"
                        className="showcase-nav showcase-nav-next"
                        aria-label="Next slide"
                        onClick={(e) => {
                            e.stopPropagation();
                            next();
                        }}
                    >
                        ›
                    </button>
                </>
            )}

            <div className="showcase-track">
                {visibleSlides.map(({ offset, file, i }) => {
                    const isActive = offset === 0;
                    // category.basePath may be '' for the merged/virtual
                    // image categories built below — in that case `file`
                    // is already a fully-resolved src, so assetUrl just
                    // returns it unchanged.
                    const src = assetUrl(category, file);
                    // Stable key = file identity, NOT offset, so React
                    // keeps the same DOM node across index changes — this
                    // is what makes the crossfade actually animate instead
                    // of popping (remounting on offset change kills CSS
                    // transitions since there's no "from" state).
                    const key = total <= 2 ? `${category.id}-${file}-${offset}` : `${category.id}-${file}`;
                    const wrapClass = `showcase-media-wrap${isActive ? ' is-active' : ''}`;

                    if (isVideo) {
                        return (
                            <div key={key} className={wrapClass}>
                                <VideoSlide
                                    src={src}
                                    isActive={isActive}
                                    playing={playing}
                                    inView={inView}
                                    singleVideo={singleVideo}
                                    preload={isActive ? 'auto' : 'metadata'}
                                    onEnded={next}
                                    onLoadedMeta={(w, h, durationMs) => {
                                        if (isActive) {
                                            reportRatio(w, h);
                                            if (durationMs && Number.isFinite(durationMs)) {
                                                setVideoDurationMs(durationMs);
                                            }
                                        }
                                    }}
                                />
                            </div>
                        );
                    }

                    return (
                        <div key={key} className={wrapClass}>
                            <img
                                className="showcase-media"
                                src={src}
                                alt=""
                                loading={isActive ? 'eager' : 'lazy'}
                                decoding="async"
                                fetchPriority={isActive ? 'high' : 'low'}
                                onLoad={(e) => {
                                    if (isActive) {
                                        const img = e.currentTarget;
                                        reportRatio(img.naturalWidth, img.naturalHeight);
                                    }
                                }}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

/* ============================================================================
   Main export
   - Left: the video category, taking a natural ~50% share of the row
     (flex: 1 1 50%) instead of a pixel width clamped to its own aspect
     ratio.
   - Right: exactly ONE column, split into exactly TWO cells (50/50
     height), fed from a single shuffled pool of every image category
     combined — a genuinely random mix, not one category per row.
   ============================================================================ */
export default function ProjectShowcase() {
    const featured = CATEGORIES.find((c) => c.kind === 'video') ?? CATEGORIES[0];

    const [mixA, mixB] = useMemo(() => {
        const imageCategories = CATEGORIES.filter((c) => c.kind === 'image');
        const pool = imageCategories.flatMap((cat) =>
            cat.files.map((file) => assetUrl(cat, file))
        );
        const shuffled = [...pool];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        const half = Math.ceil(shuffled.length / 2);
        const toVirtualCategory = (id: string, files: string[]): CategoryConfig => ({
            id,
            label: 'Featured Projects',
            kind: 'image',
            basePath: '',
            files,
        });
        return [
            toVirtualCategory('mixA', shuffled.slice(0, half)),
            toVirtualCategory('mixB', shuffled.slice(half)),
        ];
    }, []);

    return (
        <section className="showcase-root bg-slate-100 mt-10" style={TOKENS}>
            <style>{`
        .showcase-root {
          padding: var(--space-8) var(--space-5);
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          color: var(--ink);
        }

        .showcase-grid {
          max-width: 1180px;
          margin: 0 auto;
          display: flex;
          gap: var(--space-3);
          height: ${ROW_HEIGHT}px;
        }
        .showcase-cell-lg-wrap {
          flex: 1 1 50%;
          min-width: 0;
          height: 100%;
        }
        .showcase-cell-lg-wrap .showcase-cell {
          height: 100%;
        }
        .showcase-cell-rest {
          flex: 1 1 50%;
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
        }
        .showcase-cell-rest .showcase-cell-sm {
          flex: 1 1 0;
          min-height: 0;
        }
        .showcase-cell {
          position: relative;
          border-radius: var(--radius-md);
          overflow: hidden;
          background: var(--navy-950);
          box-shadow: 0 16px 32px -20px rgba(11, 31, 58, 0.35);
        }
        .showcase-empty {
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--slate-400);
          font-size: 13px;
          background: var(--slate-100);
        }
        .showcase-track {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .showcase-media-wrap {
          position: absolute;
          inset: 0;
          opacity: 0;
          transform: scale(1.04);
          transition: opacity 520ms ease, transform 620ms ease;
          z-index: 1;
          pointer-events: none;
        }
        .showcase-media-wrap.is-active {
          opacity: 1;
          transform: scale(1);
          z-index: 2;
          pointer-events: auto;
        }
        .showcase-media {
          position: relative;
          z-index: 1;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
        }
        .showcase-cell:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 2px;
        }

        .showcase-progress {
          position: absolute;
          top: var(--space-3);
          left: var(--space-3);
          right: var(--space-3);
          z-index: 4;
          display: flex;
          gap: 4px;
        }
        .showcase-progress-seg {
          flex: 1;
          height: 3px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.3);
          border: none;
          padding: 0;
          cursor: pointer;
          overflow: hidden;
          position: relative;
        }
        .showcase-progress-fill {
          position: absolute;
          inset: 0;
          width: 0%;
          background: var(--white);
          border-radius: 999px;
          display: block;
        }
        @keyframes showcase-fill {
          from { width: 0%; }
          to { width: 100%; }
        }

        .showcase-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 4;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: none;
          background: rgba(11, 31, 58, 0.45);
          color: var(--white);
          font-size: 18px;
          line-height: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          opacity: 0;
          transition: opacity 160ms ease, background 160ms ease;
        }
        .showcase-nav:hover {
          background: rgba(11, 31, 58, 0.7);
        }
        .showcase-cell:hover .showcase-nav,
        .showcase-cell:focus-within .showcase-nav {
          opacity: 1;
        }
        .showcase-nav-prev { left: var(--space-2); }
        .showcase-nav-next { right: var(--space-2); }

        @media (hover: none) {
          .showcase-nav { opacity: 0.85; }
        }

        .showcase-cta-wrap {
          max-width: 1180px;
          margin: var(--space-6) auto 0;
          display: flex;
          justify-content: center;
        }
        .showcase-cta {
          display: inline-flex;
          align-items: center;
          gap: var(--space-2);
          background: var(--navy-950);
          color: var(--white);
          font-size: 14px;
          font-weight: 400;
          letter-spacing: 0.02em;
          text-decoration: none;
          padding: 14px 28px;
          border-radius: 999px;
          transition: background 180ms ease, transform 180ms ease;
        }
        .showcase-cta:hover {
          background: var(--accent);
          transform: translateY(-1px);
        }

        @media (max-width: 860px) {
          .showcase-grid {
            flex-direction: column;
            height: auto;
          }
          .showcase-cell-lg-wrap {
            flex-basis: auto;
            height: 300px;
          }
          .showcase-cell-rest {
            flex-direction: column;
          }
          .showcase-cell-rest .showcase-cell-sm {
            flex: none;
            height: 220px;
          }
        }
        @media (max-width: 640px) {
          .showcase-title { font-size: 24px; }
        }
      `}</style>
            <div className=" mt-10 bg-slate-100">
                <div className='flex flex-col gap-4 justify-center items-center mx-auto'>
                    <p className="font-medium text-4xl  text-center mx-auto tracking-tight font-sans">Projects</p>
                    <p className="font-normal text-2xl text-center mx-auto tracking-tighter">Explore our extensive archive of completed projects. <br></br> Precision craftsmanship, structural integrity, and architectural excellence.</p>
                </div>
            </div>
            <InfiniteCurvedCarousel
                items={CATEGORIES.filter((c) => c.kind === 'image').flatMap((cat) =>
                    cat.files.map((file) => ({ src: assetUrl(cat, file) }))
                )}
                durationSeconds={650}
                surroundColor="#F5F7FA"
                cropZoom={1.15}
            />
            <div className="showcase-grid">
                <div className="showcase-cell-lg-wrap">
                    <Cell category={featured} size="lg" />
                </div>
                <div className="showcase-cell-rest">
                    <Cell category={mixA} size="sm" />
                    <Cell category={mixB} size="sm" />
                </div>
            </div>

            <div className="showcase-cta-wrap">
                <a href="/projects" className="showcase-cta tracking-tight font-light">
                    View All Projects →
                </a>
            </div>
        </section>
    );
}