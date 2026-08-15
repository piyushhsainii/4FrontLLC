'use client';

import React, { useMemo, CSSProperties } from 'react';

/* ============================================================================
   Infinite curved carousel — correct technique this time.

   The curve is NOT a 3D rotation. It's a 2D illusion: two ellipse shapes,
   painted in the surrounding page's background color, sit above the row
   (z-index) and physically clip into the top and bottom of otherwise flat,
   ordinary rectangular cards. Because the ellipse is wider than the
   container and mostly positioned off-screen above/below it, only its
   curved edge is visible — that curved edge is what reads as the row
   "bending." The cards themselves never rotate; they're flat images shifted
   down (translateY) so the top ellipse bites into their top edge correctly.

   This version loops forever (duplicated track + CSS translateX animation)
   instead of the manual scroll-snap the reference used, since the ask was a
   never-ending carousel. Pure CSS, no per-frame JS.
   ============================================================================ */

export interface CarouselItem {
    src: string;
    alt?: string;
}

interface InfiniteCurvedCarouselProps {
    items: CarouselItem[];
    /** seconds for one full loop; lower = faster */
    durationSeconds?: number;
    cardWidth?: number;
    cardHeight?: number;
    /**
     * Must match the actual background color behind this component on the
     * page. The curve illusion only works if the ellipse masks are invisible
     * against their surroundings — if this doesn't match, you'll see two
     * mismatched ellipse shapes instead of a curve.
     */
    surroundColor?: string;
    /**
     * Scales images up slightly inside their frame to crop out thin margins
     * (e.g. baked-in black letterboxing on a handful of source files).
     * 1 = no zoom, off. 1.1–1.2 is usually enough to eat a letterbox band
     * without noticeably over-cropping a clean photo.
     */
    cropZoom?: number;
}

export default function InfiniteCurvedCarousel({
    items,
    durationSeconds = 32,
    cardWidth = 340,
    cardHeight = 340,
    surroundColor = '#ffffff',
    cropZoom = 1,
}: InfiniteCurvedCarouselProps) {
    // Duplicate the list so the marquee can loop from -50% back to 0% with no seam.
    const track = useMemo(() => [...items, ...items], [items]);

    const rootStyle: CSSProperties = {
        ['--card-w' as any]: `${cardWidth}px`,
        ['--card-h' as any]: `${cardHeight}px`,
        ['--duration' as any]: `${durationSeconds}s`,
        ['--surround' as any]: surroundColor,
        ['--crop-zoom' as any]: cropZoom,
    };

    return (
        <div className="curved-carousel" style={rootStyle}>
            <style>{`
        .curved-carousel {
          position: relative;
          width: 100%;
          min-height: calc(var(--card-h) + 200px);
          overflow: hidden;
          background: var(--surround);
        }
        .curved-carousel-viewport {
          position: absolute;
          inset: 0;
          overflow: hidden;
          display: flex;
          align-items: center;
        }
        .curved-carousel-track {
          display: flex;
          align-items: flex-end;
          gap: 16px;
          width: max-content;
          transform: translateY(60px);
          animation: curved-scroll var(--duration) linear infinite;
        }
        .curved-carousel:hover .curved-carousel-track {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .curved-carousel-track {
            animation: none;
          }
        }
        @keyframes curved-scroll {
          from { transform: translateY(60px) translateX(0); }
          to { transform: translateY(60px) translateX(-50%); }
        }
        .curved-card {
          flex: 0 0 auto;
          width: var(--card-w);
          height: var(--card-h);
          background: #dcecdf;
          overflow: hidden;
        }
        .curved-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
          /* nudges out thin black letterbox margins baked into some source
             files — pure CSS can't remove pixels, only crop closer to
             center. Set cropZoom={1} to disable if your assets are clean. */
          transform: scale(var(--crop-zoom));
        }

        /* the actual curve — two wide ellipses in the page's own background
           color, sitting above the cards and biting into their top/bottom */
        .curved-carousel::before,
        .curved-carousel::after {
          content: '';
          position: absolute;
          left: -20%;
          right: -20%;
          height: 40%;
          background-color: var(--surround);
          border-radius: 50%;
          z-index: 5;
          pointer-events: none;
        }
        .curved-carousel::before {
          top: -20%;
        }
        .curved-carousel::after {
          bottom: -20%;
        }
      `}</style>

            <div className="curved-carousel-viewport">
                <div className="curved-carousel-track">
                    {track.map((item, i) => (
                        <div key={`${item.src}-${i}`} className="curved-card">
                            <img src={item.src} alt={item.alt ?? ''} loading="lazy" decoding="async" className='rounded-xl' />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}