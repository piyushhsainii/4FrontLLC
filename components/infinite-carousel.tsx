'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

export interface CarouselItem { src: string; alt: string }

export default function InfiniteCurvedCarousel({ items, durationSeconds = 60 }: { items: CarouselItem[]; durationSeconds?: number }) {
  const [paused, setPaused] = useState(false);
  const photos = items.slice(0, 16);

  useEffect(() => {
    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  return (
    <div className="project-marquee" tabIndex={0} role="region" aria-label="Exterior project photos; scroll horizontally to browse" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocusCapture={() => setPaused(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false); }}>
      <div className={`project-marquee-track ${paused ? 'is-paused' : ''}`} style={{ animationDuration: `${durationSeconds}s` }}>
        {[...photos, ...photos].map((item, index) => (
          <div className="project-marquee-card" key={`${item.src}-${index}`} aria-hidden={index >= photos.length}>
            <Image src={item.src} alt={index < photos.length ? item.alt : ''} fill sizes="(max-width: 640px) 240px, 320px" priority={index < 3} placeholder="blur" blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMCIgaGVpZ2h0PSI4Ij48cmVjdCB3aWR0aD0iMTAiIGhlaWdodD0iOCIgZmlsbD0iI2VlZjJmYiIvPjwvc3ZnPg==" className="object-cover" />
          </div>
        ))}
      </div>
      <style jsx>{`
        .project-marquee { overflow-x: auto; overflow-y: hidden; padding: 8px 0; scrollbar-width: none; scroll-snap-type: x proximity; mask-image: linear-gradient(to right, transparent, #000 8%, #000 92%, transparent); }
        .project-marquee::-webkit-scrollbar { display: none; }
        .project-marquee-track { display: flex; width: max-content; gap: 16px; padding-left: max(24px, calc((100vw - 1200px) / 2 + 24px)); animation: project-marquee-move linear infinite; }
        .project-marquee-track.is-paused { animation-play-state: paused; }
        .project-marquee-card { position: relative; flex: 0 0 320px; aspect-ratio: 4 / 3; overflow: hidden; border-radius: 12px; background: #eef2fb; scroll-snap-align: start; }
        @keyframes project-marquee-move { to { transform: translate3d(calc(-50% - 8px), 0, 0); } }
        @media (max-width: 640px) { .project-marquee-card { flex-basis: 240px; } }
        @media (prefers-reduced-motion: reduce) { .project-marquee-track { animation: none; } .project-marquee-card:nth-child(n + ${photos.length + 1}) { display: none; } }
      `}</style>
    </div>
  );
}
