'use client';

import React from 'react';

export function CallToAction() {
  return (
    <section id="contact" className="relative z-10 bg-primary py-24 md:py-32 overflow-hidden text-primary-foreground">
      {/* Background Graphic */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border-[60px] border-primary-foreground/20" />
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] rounded-full border-[60px] border-primary-foreground/10" />
      </div>

      <div className="mx-auto max-w-7xl px-6 relative z-10 grid gap-16 lg:grid-cols-2 lg:gap-24 items-center">
        <div>
          <h2 className="mb-6 text-balance text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
            Get Your Free Roof Inspection Today
          </h2>
          <p className="mb-10 text-lg text-primary-foreground/80 md:text-xl max-w-lg">
            Don&apos;t wait until small issues become expensive problems. Secure your property with a professional assessment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="tel:+1234567890"
              className="inline-block rounded-full bg-accent px-8 py-4 text-center text-base font-bold text-accent-foreground shadow-lg transition-transform hover:-translate-y-1 hover:shadow-xl"
            >
              Call Now
            </a>
          </div>
        </div>

        {/* Lead Form */}
        <div className="rounded-3xl bg-card p-8 md:p-10 shadow-2xl text-card-foreground">
          <h3 className="mb-2 text-2xl font-bold">Schedule Free Inspection</h3>
          <p className="mb-8 text-sm text-muted-foreground">No obligation. No pressure.</p>
          
          <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-sm font-medium">Full Name</label>
              <input type="text" id="name" className="rounded-lg border border-border bg-background px-4 py-3 outline-none focus:border-primary focus:ring-1 focus:ring-primary" placeholder="Jane Doe" required />
            </div>
            
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="phone" className="text-sm font-medium">Phone Number</label>
                <input type="tel" id="phone" className="rounded-lg border border-border bg-background px-4 py-3 outline-none focus:border-primary focus:ring-1 focus:ring-primary" placeholder="(555) 000-0000" required />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="address" className="text-sm font-medium">Property Address</label>
                <input type="text" id="address" className="rounded-lg border border-border bg-background px-4 py-3 outline-none focus:border-primary focus:ring-1 focus:ring-primary" placeholder="123 Main St" required />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="issue" className="text-sm font-medium">Description of Issue</label>
              <textarea id="issue" rows={3} className="rounded-lg border border-border bg-background px-4 py-3 outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none" placeholder="Noticed a leak after the storm..." required />
            </div>

            <button type="submit" className="mt-2 rounded-lg bg-primary px-6 py-4 text-center text-base font-bold text-primary-foreground transition-transform hover:bg-primary/90 active:scale-[0.98]">
              Request Inspection
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
