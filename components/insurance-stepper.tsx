'use client';

import React from 'react';
import { motion } from 'motion/react';

const steps = [
  { title: 'Free Inspection', description: 'Comprehensive evaluation.' },
  { title: 'Damage Documentation', description: 'Detailed photo reports.' },
  { title: 'Claim Guidance', description: 'Navigating the paperwork.' },
  { title: 'Project Scheduling', description: 'Aligning with your timeline.' },
  { title: 'Professional Completion', description: 'A roof built to last.' },
];

const containerVariant = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariant = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 24 } },
};

export function InsuranceStepper() {
  return (
    <section className="relative z-10 bg-card py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-16 md:mb-24 text-center">
          <h2 className="mb-6 text-balance text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl">
            Insurance Claim Help
          </h2>
          <p className="text-lg text-muted-foreground md:text-xl">
            We help simplify and guide the insurance claim process from start to finish.
          </p>
        </div>

        <motion.div
          className="relative max-w-3xl mx-auto"
          variants={containerVariant}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Vertical Track connecting steps */}
          <div className="absolute left-8 lg:left-1/2 top-4 bottom-4 w-0.5 bg-border -translate-x-1/2" />

          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              variants={itemVariant}
              className={`group relative flex items-center justify-between mb-12 last:mb-0 ${
                idx % 2 === 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'
              }`}
            >
              <div className="hidden lg:block w-5/12" />
              
              <div className="absolute left-8 lg:left-1/2 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md ring-4 ring-background transition-all duration-300 group-hover:scale-125 group-hover:shadow-[0_0_20px_var(--green)] group-hover:bg-accent z-10">
                <span className="font-semibold">{idx + 1}</span>
              </div>

              <div className="w-full lg:w-5/12 pl-20 lg:pl-0 cursor-pointer">
                <motion.div 
                  whileHover={{ scale: 1.03, rotate: idx % 2 === 0 ? 1 : -1 }}
                  whileTap={{ scale: 0.98 }}
                  className="rounded-2xl border border-border bg-background p-6 shadow-sm transition-all duration-300 group-hover:border-accent group-hover:shadow-xl"
                >
                  <h3 className="mb-2 text-xl font-bold text-foreground transition-colors group-hover:text-primary">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
