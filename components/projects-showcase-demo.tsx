'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import InfiniteCurvedCarousel from './infinite-carousel';

const base = '/recent-september-2026/';
const carouselPhotos = [
  ['23.jpg', 'Completed siding on a two-story home'],
  ['20.jpg', 'Finished siding beside a raised deck'],
  ['21.jpg', 'Porch and exterior siding project'],
  ['22.jpg', 'Residential siding and roof exterior'],
  ['24.jpg', 'Siding installation in progress'],
  ['25.jpg', 'Garage trim and exterior work'],
  ['26.jpg', 'Siding installation with house wrap'],
  ['27.jpg', 'Siding installation near the roofline'],
  ['28.jpg', 'Finished exterior beside a pool'],
  ['1.jpg', 'Home exterior with siding and windows'],
  ['2.jpg', 'Side elevation of a completed home'],
  ['3.jpg', 'Finished siding and gutter detail'],
].map(([file, alt]) => ({ src: `${base}${file}`, alt }));
const upperPhotos = ['20.jpg', '21.jpg', '22.jpg', '24.jpg'].map((file) => `${base}${file}`);
const lowerPhotos = ['25.jpg', '26.jpg', '27.jpg', '28.jpg'].map((file) => `${base}${file}`);
const blurDataURL = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMCIgaGVpZ2h0PSI4Ij48cmVjdCB3aWR0aD0iMTAiIGhlaWdodD0iOCIgZmlsbD0iI2VlZjJmYiIvPjwvc3ZnPg==';

function PhotoTile({ photos, label }: { photos: string[]; label: string }) {
  const [index, setIndex] = useState(0);
  const current = photos[index];
  const change = (direction: number) => setIndex((value) => (value + direction + photos.length) % photos.length);

  return (
    <div className="group relative h-full min-h-0 overflow-hidden rounded-xl bg-secondary" aria-label={`${label} photo gallery`}>
      <Image key={current} src={current} alt={`${label}, photo ${index + 1} of ${photos.length}`} fill sizes="(max-width: 767px) 100vw, 50vw" placeholder="blur" blurDataURL={blurDataURL} className="object-cover" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/45 to-transparent" />
      <div className="absolute inset-x-4 bottom-3 flex gap-1" aria-hidden="true">
        {photos.map((photo, position) => <span key={photo} className={`h-[3px] flex-1 rounded-full ${position === index ? 'bg-white' : 'bg-white/40'}`} />)}
      </div>
      <span className="sr-only" aria-live="polite">Photo {index + 1} of {photos.length}</span>
      <button type="button" onClick={() => change(-1)} aria-label="Previous photo" className="absolute left-3 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-foreground opacity-0 shadow-sm transition-opacity group-hover:opacity-100 group-focus-within:opacity-100 max-md:opacity-100 focus-visible:opacity-100"><ChevronLeft className="size-5" /></button>
      <button type="button" onClick={() => change(1)} aria-label="Next photo" className="absolute right-3 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-foreground opacity-0 shadow-sm transition-opacity group-hover:opacity-100 group-focus-within:opacity-100 max-md:opacity-100 focus-visible:opacity-100"><ChevronRight className="size-5" /></button>
    </div>
  );
}

export default function ProjectShowcase() {
  return (
    <section className="bg-background py-16 md:py-20" aria-labelledby="projects-heading">
      <div className="mx-auto mb-8 max-w-[1200px] px-6 text-center">
        <h2 id="projects-heading" className="text-4xl font-medium tracking-tight text-foreground">Projects</h2>
        <p className="mx-auto mt-4 max-w-3xl text-lg leading-relaxed text-muted-foreground">Recent siding and exterior projects, with roofing, gutters, windows, and doors handled with care.</p>
      </div>

      <InfiniteCurvedCarousel items={carouselPhotos} durationSeconds={70} />

      <div className="mx-auto mt-10 max-w-[1200px] px-6">
        <div className="grid h-[560px] grid-cols-2 grid-rows-2 gap-4 max-md:h-auto max-md:grid-cols-1 max-md:grid-rows-none">
          <div className="relative row-span-2 overflow-hidden rounded-xl bg-secondary max-md:row-span-1 max-md:aspect-[4/3]">
            <Image src={`${base}23.jpg`} alt="Completed FourFront siding project" fill sizes="(max-width: 767px) 100vw, 50vw" placeholder="blur" blurDataURL={blurDataURL} className="object-cover" />
          </div>
          <div className="max-md:aspect-[4/3]"><PhotoTile photos={upperPhotos} label="Exterior project" /></div>
          <div className="max-md:aspect-[4/3]"><PhotoTile photos={lowerPhotos} label="Siding installation" /></div>
        </div>
        <p className="mt-4 inline-flex rounded-full border border-border bg-white px-4 py-2 text-[13px] font-medium text-foreground">Recent Project · September 2026</p>
        <div className="mt-8 text-center">
          <a href="/projects" className="inline-flex items-center rounded-full bg-[#0B1F3A] px-7 py-3.5 text-sm font-medium text-white transition-[background,transform] hover:-translate-y-0.5 hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">View All Projects →</a>
        </div>
      </div>
    </section>
  );
}
