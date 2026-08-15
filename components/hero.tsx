import React from 'react';
import { BackgroundPattern } from './interactive-pattern';

export function Hero() {
  return (
    <section className="relative z-10 flex h-[100vh] max-h-[800px] flex-col justify-center px-6 pt-24 text-center mt-20 lg:mt-0">
      <div className="absolute hidden inset-0 z-0 pointer-events-none lg:flex items-center justify-center overflow-hidden">
        <div className="w-full max-w-[2400px] h-full mx-auto flex items-center justify-center overflow-hidden">
          <BackgroundPattern />
        </div>
      </div>
      <div className="mx-auto max-w-4xl z-10">
        <div className="mb-6 flex flex-wrap items-center justify-center gap-3 text-[10px] font-bold uppercase tracking-widest text-primary md:text-xs">
          <span className="rounded-full bg-primary/10 px-3 py-1">Fast Estimates</span>
          <span className="hidden h-1 w-1 rounded-full bg-primary md:block" />
          <span className="rounded-full bg-primary/10 px-3 py-1">Fully Insured</span>
          <span className="hidden h-1 w-1 rounded-full bg-primary md:block" />
          <span className="rounded-full bg-primary/10 px-3 py-1">Roofing Specialists</span>
        </div>

        <h1 className="mb-8 text-balance text-4xl font-semibold  tracking-tighter text-foreground md:text-6xl lg:text-[4.4rem]">
          Reliable roofing, built to protect what matters most.
        </h1>

        <p className="mx-auto w-full mb-10 max-w-[800px] text-balance text-base md:text-lg lg:text-xl">
          4Front Construction and Logistics Services helps homeowners handle
          repairs, replacements, storm damage, and insurance-related roofing
          work with speed, clarity, and craftsmanship.
        </p>

        <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
          <a
            href="#contact"
            className="w-full rounded-full bg-primary border-2 border-primary px-8 py-4 text-base font-normal tracking-tighter text-primary-foreground transition-all shadow-[6px_6px_0px_var(--green)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_var(--green)] active:translate-x-[6px] active:translate-y-[6px] active:shadow-none sm:w-auto"
          >
            Get a free roof Inspection
          </a>
          <a
            href="#projects"
            className="w-full rounded-full border-2 border-accent bg-transparent px-8 py-4 text-base font-normal tracking-tighter text-accent transition-colors hover:bg-accent/10 hover:shadow-lg sm:w-auto"
          >
            View Recent Projects
          </a>
        </div>

        <div className="mt-16 flex flex-col items-center justify-center gap-6 pt-8 sm:flex-row sm:gap-12">
          {/* Trust Badges */}
          {[
            { label: 'Same-Day Inspections Available', strong: true },
            { label: 'Limited inspection slots this week', strong: true },
            { label: 'No obligation. No pressure.', strong: true },
          ].map((badge, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className={`text-sm ${badge.strong ? 'font-medium text-foreground' : 'text-muted-foreground'}`}>
                {badge.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}