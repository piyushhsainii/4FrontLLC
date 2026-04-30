'use client';

import React from 'react';

const testimonials = [
  { quote: "They showed up fast and made everything easy to understand.", name: "James R.", location: "Austin, TX" },
  { quote: "Professional crew and smooth insurance process.", name: "Maria L.", location: "Denver, CO" },
  { quote: "Reliable, honest, and great results.", name: "Tom W.", location: "Phoenix, AZ" },
  { quote: "They showed up fast and made everything easy to understand.", name: "Sarah K.", location: "Dallas, TX" },
  { quote: "Professional crew and smooth insurance process.", name: "David M.", location: "Houston, TX" },
  { quote: "Reliable, honest, and great results.", name: "Lisa P.", location: "Seattle, WA" },
];

const B = {
  arm: 36,   // visible arm length
  r: 14,   // corner radius (match card's rounded-2xl visually)
  w: 3,    // stroke width
  off: 6,    // how far outside the card the bracket extends
};

function TopLeftBracket() {
  // SVG sits at top:-off left:-off, size = arm+off square
  // We draw from right end of top arm → curve → down to bottom of left arm
  const sz = B.arm + B.off;
  return (
    <svg
      width={sz} height={sz}
      viewBox={`0 0 ${sz} ${sz}`}
      className="absolute pointer-events-none"
      style={{ top: -B.off, left: -B.off, zIndex: 10, overflow: 'visible' }}
      aria-hidden
    >
      <path
        d={`M ${sz} ${B.off} L ${B.off + B.r} ${B.off} Q ${B.off} ${B.off} ${B.off} ${B.off + B.r} L ${B.off} ${sz}`}
        fill="none"
        stroke="#1A3A8C"
        strokeWidth={B.w}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BottomRightBracket() {
  // SVG sits at bottom:-off right:-off, size = arm+off square
  // (0,0) of SVG = outer bottom-right corner of the bracket
  // We need: ┘ shape = left arm going right + curve + up arm going up
  //
  // In SVG coords (origin top-left of the SVG element):
  //   bottom-right of card maps to (sz, sz) in the SVG
  //   We draw: start at top of right arm (sz, 0)
  //            go down to the curve point (sz, sz - B.r)
  //            curve to (sz - B.r, sz)
  //            go left to end of bottom arm (0, sz)
  const sz = B.arm + B.off;
  return (
    <svg
      width={sz} height={sz}
      viewBox={`0 0 ${sz} ${sz}`}
      className="absolute pointer-events-none"
      style={{ bottom: -B.off, right: -B.off, zIndex: 10, overflow: 'visible' }}
      aria-hidden
    >
      <path
        d={`M ${sz} 0 L ${sz} ${sz - B.r} Q ${sz} ${sz} ${sz - B.r} ${sz} L 0 ${sz}`}
        fill="none"
        stroke="#3A7D44"
        strokeWidth={B.w}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TestimonialCard({ quote, name, location }: { quote: string; name: string; location: string }) {
  return (
    <div className="relative w-[300px] shrink-0 md:w-[380px]">
      <TopLeftBracket />
      <BottomRightBracket />

      <div className="rounded-2xl border border-black/5 bg-white px-8 py-7 shadow-[0_8px_30px_rgb(0,0,0,0.05)]">
        <div className="mb-5 flex space-x-1 text-primary">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>

        <p className="mb-6 text-base font-medium leading-relaxed text-foreground">
          &quot;{quote}&quot;
        </p>

        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
            {name.charAt(0)}
          </div>
          <div>
            <p className="text-sm font-semibold text-primary">{name}</p>
            <p className="text-xs text-foreground/50">{location}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="relative z-10 overflow-hidden py-24 md:py-32 border-y border-border/50">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: `
            radial-gradient(ellipse 70% 60% at 15% 50%, rgba(26,58,140,0.06) 0%, transparent 70%),
            radial-gradient(ellipse 70% 60% at 85% 50%, rgba(58,125,68,0.05) 0%, transparent 70%),
            var(--color-background, #f8f9fb)
          `,
        }}
      />

      <div className="mx-auto mb-16 max-w-7xl px-6 text-center">
        <span className="mb-4 block text-sm font-bold tracking-widest text-accent uppercase">
          Testimonials
        </span>
        <h2 className="text-3xl font-bold tracking-tight text-primary md:text-5xl">
          What our clients say
        </h2>
      </div>

      <div className="group relative flex w-full overflow-hidden">
        <div className="flex w-max animate-marquee gap-10 px-10 py-8 group-hover:[animation-play-state:paused]">
          {testimonials.map((t, idx) => <TestimonialCard key={idx} {...t} />)}
          {testimonials.map((t, idx) => <TestimonialCard key={`dup-${idx}`} {...t} />)}
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 top-0 w-32 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute bottom-0 right-0 top-0 w-32 bg-gradient-to-l from-background to-transparent" />

      <style jsx global>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </section>
  );
}