'use client';

import React, { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from 'motion/react';

const processSteps = [
  {
    title: 'Free Inspection',
    description:
      'We come out to correctly assess the damage and provide a detailed report on our findings.',
    image: '/p1.jpeg',
  },
  {
    title: 'Clear Estimate',
    description:
      'You receive a complete, itemized estimate outlining scopes, timelines, and costs.',
    image: '/p2.jpeg',
  },
  {
    title: 'Fast Scheduling',
    description:
      'Once approved, we coordinate materials and crew availability to get the job done fast.',
    image: '/p3.jpeg',
  },
  {
    title: 'Professional Build',
    description:
      'Our certified crews work efficiently to replace or repair your roof, leaving an immaculate site.',
    image: '/p4.jpeg',
  },
  {
    title: 'Final Walkthrough',
    description:
      'We do a complete inspection with you to ensure satisfaction before we call it complete.',
    image: '/p5.jpeg',
  },
];

// ── Individual card — handles its own scroll-based dimming ────────────────────
function ProcessCard({
  step,
  idx,
  total,
}: {
  step: (typeof processSteps)[0];
  idx: number;
  total: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Track how far this card has scrolled past the top of the viewport
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start 0.85', 'start 0.15'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const isLast = idx === total - 1;

  // Last card: never dims. Others: fade gently to 0.72 (subtle, not harsh).
  const opacity = useTransform(
    smoothProgress,
    [0, 0.25, 1.25, 1],
    isLast ? [0, 1, 1, 1] : [0, 1, 1, 0.72]
  );
  const scale = useTransform(
    smoothProgress,
    [0, 0.25, 0.75, 1],
    isLast ? [0.94, 1, 1, 1] : [0.94, 1, 1, 0.98]
  );
  const y = useTransform(smoothProgress, [0, 0.25], [40, 0]);

  // Progressive shadow — deeper as more cards stack on top
  const shadowOpacity = useTransform(
    smoothProgress,
    [0.6, 1],
    [0, 0.22 + idx * 0.04]
  );

  const isEven = idx % 2 === 0;

  return (
    <motion.div
      ref={cardRef}
      style={{
        opacity,
        scale,
        y,
        // Each card sticks progressively lower to create stacking depth
        top: `${5 + idx * 1.4}rem`,

      }}
      className="sticky rounded-3xl bg-white"
    >
      {/* Inset top border — colour accent per card */}
      <div
        className="absolute inset-x-0 top-0 h-[3px] rounded-t-3xl"

      />

      <div
        className={`flex flex-col items-center gap-8 p-8 md:p-12 ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
          } lg:flex`}
      >
        {/* Text side */}
        <div className="flex-1 w-full text-center lg:text-left">
          {/* Step badge */}
          <div className="mb-5 flex items-center gap-3 justify-center lg:justify-start">
            <span
              className="flex items-center justify-center rounded-full text-white text-xs font-bold tracking-widest"
              style={{
                width: 36,
                height: 36,
                background: 'linear-gradient(135deg,#1A3A8C 0%,#2E6BB0 100%)',
                boxShadow: '0 2px 10px rgba(26,58,140,0.3)',
                flexShrink: 0,
              }}
            >
              {String(idx + 1).padStart(2, '0')}
            </span>
            <span className="text-xs font-bold tracking-[2.5px] uppercase"
              style={{ color: '#1A3A8C' }}>
              Step {String(idx + 1).padStart(2, '0')}
            </span>
          </div>

          <h3
            className="mb-4 text-3xl font-bold md:text-4xl"
            style={{ color: '#0F1C3F', letterSpacing: '-0.8px', lineHeight: 1.1 }}
          >
            {step.title}
          </h3>
          <p className="text-lg leading-relaxed" style={{ color: '#6B7A99' }}>
            {step.description}
          </p>

          {/* Progress dots */}
          <div className="mt-8 flex gap-2 justify-center lg:justify-start">
            {processSteps.map((_, i) => (
              <div
                key={i}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === idx ? 22 : 7,
                  height: 7,
                  background: i === idx
                    ? '#4DB84E'
                    : i < idx
                      ? '#1A3A8C'
                      : 'rgba(26,58,140,0.15)',
                }}
              />
            ))}
          </div>
        </div>

        {/* Image side */}
        <div className="flex-1 w-full">
          <motion.div
            className="relative w-full overflow-hidden rounded-2xl bg-muted group"
            style={{ aspectRatio: '4/3' }}
            whileHover={{ scale: 1.015 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <img
              src={step.image}
              alt={step.title}
              className="absolute inset-0 h-full w-full object-cover transition-all duration-700 group-hover:scale-105"
              style={{ filter: 'saturate(0.6)' }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLImageElement).style.filter = 'saturate(1)')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLImageElement).style.filter = 'saturate(0.6)')}
              referrerPolicy="no-referrer"
            />

            {/* Gradient overlay */}
            <div className="pointer-events-none absolute inset-0"
              style={{
                background: 'linear-gradient(to top right, rgba(26,58,140,0.18) 0%, transparent 60%)',
              }}
            />

            {/* Step label on image */}
            <div
              className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full px-3 py-1.5 backdrop-blur-md"
              style={{
                background: 'rgba(255,255,255,0.88)',
                border: '1px solid rgba(26,58,140,0.1)',
                boxShadow: '0 2px 12px rgba(26,58,140,0.12)',
              }}
            >
              <span
                className="h-2 w-2 rounded-full"
                style={{ background: '#4DB84E', boxShadow: '0 0 6px rgba(77,184,78,0.7)' }}
              />
              <span className="text-xs font-bold tracking-wider uppercase"
                style={{ color: '#1A3A8C' }}>
                {step.title}
              </span>
            </div>

            {/* Ring */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/8" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Section ────────────────────────────────────────────────────────────────────
export function Process() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative z-10 py-24 md:py-32"
      style={{ background: '#F5F7FA' }}
    >
      {/* Subtle grid texture */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(rgba(26,58,140,0.055) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="mx-auto max-w-5xl px-6 relative">

        {/* Header */}
        <motion.div
          className="mb-12 md:mb-24 text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span
            className="mb-4 block text-xs font-bold tracking-[3px] uppercase"
            style={{ color: '#4DB84E' }}
          >
            Our Process
          </span>
          <h2
            className="text-4xl font-normal leading-tight md:text-5xl lg:text-6xl"
            style={{ color: '#0F1C3F', letterSpacing: '-1.5px' }}
          >
            Simple, clear, and{' '}
            <span style={{ color: '#1A3A8C' }}>built around you.</span>
          </h2>
          <p className="mt-5 text-lg mx-auto max-w-xl" style={{ color: '#6B7A99' }}>
            Five straightforward steps from first call to final inspection.
          </p>
        </motion.div>

        {/* Stacking cards — extra bottom padding so last card has room to un-stick */}
        <div className="relative flex flex-col gap-5" style={{ paddingBottom: '25vh' }}>
          {processSteps.map((step, idx) => (
            <ProcessCard
              key={idx}
              step={step}
              idx={idx}
              total={processSteps.length}
            />
          ))}
        </div>

      </div>
    </section>
  );
}