'use client';

import React from 'react';
import { motion } from 'motion/react';

const processSteps = [
  {
    title: 'Free Inspection',
    description: 'We come out to correctly assess the damage and provide a detailed report on our findings.',
    image: 'https://picsum.photos/seed/inspect/800/600',
  },
  {
    title: 'Clear Estimate',
    description: 'You receive a complete, itemized estimate outlining scopes, timelines, and costs.',
    image: 'https://picsum.photos/seed/estimate/800/600',
  },
  {
    title: 'Fast Scheduling',
    description: 'Once approved, we coordinate materials and crew availability to get the job done fast.',
    image: 'https://picsum.photos/seed/schedule/800/600',
  },
  {
    title: 'Professional Build',
    description: 'Our certified crews work efficiently to replace or repair your roof, leaving an immaculate site.',
    image: 'https://picsum.photos/seed/build/800/600',
  },
  {
    title: 'Final Walkthrough',
    description: 'We do a complete inspection with you to ensure satisfaction before we call it complete.',
    image: 'https://picsum.photos/seed/walkthru/800/600',
  },
];

export function Process() {
  return (
    <section id="process" className="relative z-10 bg-background py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 md:mb-24 text-center">
          <span className="mb-4 block text-sm font-bold tracking-widest text-accent uppercase">
            Our Process
          </span>
          <h2 className="mb-6 text-balance text-4xl font-bold leading-tight tracking-tight text-primary md:text-5xl lg:text-6xl">
            Simple, clear, and built around you.
          </h2>
        </div>

        <div className="flex flex-col gap-8 md:gap-24">
          {processSteps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className={`sticky top-32 flex flex-col items-center gap-8 rounded-3xl border border-black/5 bg-white p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ${
                idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              }`}
              style={{
                // increase offset slightly for stacking feel
                marginTop: idx > 0 ? `-${idx * 2}rem` : '0',
                transform: `rotate(${idx % 2 === 0 ? '-1deg' : '1deg'})`
              }}
            >
              <div className="flex-1 w-full text-center lg:text-left">
                <span className="mb-4 inline-block text-sm font-bold tracking-widest text-primary uppercase">
                  Step 0{idx + 1}
                </span>
                <h3 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">{step.title}</h3>
                <p className="text-lg text-muted-foreground">{step.description}</p>
              </div>
              
              <div className="flex-1 w-full">
                <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-muted drop-shadow-xl saturate-50 transition-all duration-500 hover:saturate-100 group">
                  <img src={step.image} alt={step.title} className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
                  <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/10 rounded-2xl" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
