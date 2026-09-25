'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
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
    image: '/139.jpg',
  },
  {
    title: 'Clear Estimate',
    description:
      'You receive a complete, itemized estimate outlining scopes, timelines, and costs.',
    image: '/27.jpg',
  },
  {
    title: 'Fast Scheduling',
    description:
      'Once approved, we coordinate materials and crew availability to get the job done fast.',
    image: '/143.jpg',
  },
  {
    title: 'Professional Build',
    description:
      'Our certified crews work efficiently to replace or repair your roof, leaving an immaculate site.',
    image: '/141.jpg',
  },
  {
    title: 'Final Walkthrough',
    description:
      'We do a complete inspection with you to ensure satisfaction before we call it complete.',
    image: '/Project2/1.jpg',
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
    offset: ['start 0.92', 'start 0.12'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 125,
    damping: 32,
    restDelta: 0.001,
  });

  const isLast = idx === total - 1;

  // Last card: never dims. Others: fade gently to 0.72 (subtle, not harsh).
  const opacity = useTransform(smoothProgress, [0, 0.22, 1], isLast ? [0.45, 1, 1] : [0.45, 1, 0.82]);
  const scale = useTransform(
    smoothProgress,
    [0, 0.22, 0.8, 1],
    isLast ? [0.97, 1, 1, 1] : [0.97, 1, 1, 0.985]
  );
  const y = useTransform(smoothProgress, [0, 0.22], [24, 0]);

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
      className="sticky overflow-hidden rounded-3xl border border-border bg-white shadow-[0_12px_40px_rgba(15,28,63,0.07)] motion-reduce:!transform-none motion-reduce:!opacity-100"
    >
      <div
        className={`flex flex-col items-center gap-8 p-8 md:p-12 ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
          } lg:flex`}
      >
        {/* Text side */}
        <div className="flex-1 w-full text-center lg:text-left">
          {/* Step badge */}
          <div className="mb-5 flex items-center gap-3 justify-center lg:justify-start">
            <span
              className="flex items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-semibold tracking-widest"
              style={{
                width: 36,
                height: 36,
                flexShrink: 0,
              }}
            >
              {String(idx + 1).padStart(2, '0')}
            </span>
            <span className="text-xs font-semibold tracking-[0.16em] uppercase text-primary">
              Step {String(idx + 1).padStart(2, '0')}
            </span>
          </div>

          <h3
            className="mb-4 text-3xl font-medium tracking-tight leading-tight text-foreground md:text-4xl"
          >
            {step.title}
          </h3>
          <p className="text-lg leading-relaxed text-muted-foreground">
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
                    ? 'var(--green)'
                    : i < idx
                      ? 'var(--navy)'
                      : 'var(--color-border)',
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
            whileHover={{ scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 220, damping: 26 }}
          >
            <Image
              src={step.image}
              alt={step.title}
              fill
              sizes="(min-width: 1024px) 440px, (min-width: 768px) 80vw, 100vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />

            {/* Step label on image */}
            <div
              className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full px-3 py-1.5 backdrop-blur-md"
              style={{
                background: 'rgba(255,255,255,0.92)',
                border: '1px solid var(--color-border)',
              }}
            >
              <span
                className="h-2 w-2 rounded-full"
                style={{ background: 'var(--green)' }}
              />
              <span className="text-xs font-semibold tracking-wider uppercase text-primary">
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
      style={{ background: 'var(--bg)' }}
    >
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
            className="mb-4 block text-xs font-semibold tracking-[0.18em] uppercase text-accent"
          >
            Our Process
          </span>
          <h2
            className="text-4xl font-medium leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl"
          >
            Simple, clear, and{' '}
            <span className="text-primary">built around you.</span>
          </h2>
          <p className="mt-5 text-lg mx-auto max-w-xl text-muted-foreground">
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
