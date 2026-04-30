import React from 'react';

const services = [
  {
    title: 'Roof Repair',
    description: 'Stop leaks quickly and prevent further damage before costs escalate.',
    imagePlaceholder: '/roof_repair.jpeg',
  },
  {
    title: 'Roof Replacement',
    description: 'Full roof replacements built for durability and long-term performance.',
    imagePlaceholder: '/roof_replacement.jpeg',
  },
  {
    title: 'New Installation',
    description: 'Clean, professional installations for new builds and renovations.',
    imagePlaceholder: '/roof_installation.jpeg',
  },
  {
    title: 'Storm Response',
    description: 'Fast response for hail, wind, and emergency roofing issues.',
    imagePlaceholder: '/roof_strom.jpeg',
  },
  {
    title: 'Insurance Help',
    description: 'We help simplify and guide the insurance claim process.',
    imagePlaceholder: '/roof_insurance.jpeg',
  },
];
export function Services() {
  return (
    <section id="services" className="relative z-10 bg-background py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 md:mb-24">
          <h2 className="mb-6 max-w-3xl text-balance text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Roofing services built for speed, reliability, and long-term protection.
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, idx) => (
            <div
              key={idx}
              className={`group relative overflow-hidden rounded-3xl border border-black/5 bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] ${idx === 1 || idx === 4 ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
            >
              <div className="relative mb-6 h-60 w-full overflow-hidden rounded-2xl md:h-auto shadow-inner">
                {/* Image Placeholder */}
                <img
                  src={service.imagePlaceholder}
                  alt={service.title}
                  className="h-full w-full object-contain transition-transform duration-700 ease-out group-hover:scale-105 "
                  referrerPolicy="no-referrer"
                />
                {/* Vignette Overlay on Hover */}
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-transparent to-black/30 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>

              <h3 className="mb-2 text-2xl font-semibold tracking-tight text-foreground">{service.title}</h3>
              <p className="text-muted-foreground">{service.description}</p>

              <div className="mt-6 flex h-10 w-10 items-center justify-center rounded-full bg-secondary/50 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <svg
                  className="h-5 w-5 -rotate-45 transition-transform duration-300 group-hover:rotate-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
