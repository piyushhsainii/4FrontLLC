import React from 'react';

const services = [
  {
    title: 'Roof Repair',
    description: 'Stop leaks quickly and prevent further damage before costs escalate.',
    imagePlaceholder: '/roof_repair.jpeg',
    label: '01 — Repairs',
  },
  {
    title: 'Roof Replacement',
    description: 'Full replacements built for durability and long-term performance.',
    imagePlaceholder: '/roof_replacement.jpeg',
    label: '02 — Replacement',
  },
  {
    title: 'New Installation',
    description: 'Professional installs for new builds and renovations.',
    imagePlaceholder: '/roof_installation.jpeg',
    label: '03 — Installation',
  },
  {
    title: 'Storm Response',
    description: 'Fast response for hail, wind, and emergency roofing issues.',
    imagePlaceholder: '/roof_strom.jpeg',
    label: '04 — Emergency',
  },
  {
    title: 'Insurance Help',
    description: 'We simplify and guide the insurance claim process.',
    imagePlaceholder: '/roof_insurance.jpeg',
    label: '05 — Claims',
  },
];

const gridClasses = [
  'col-span-12 md:[grid-column:1/6] md:[grid-row:1/3]',
  'col-span-12 md:[grid-column:6/10] md:[grid-row:1/2]',
  'col-span-12 md:[grid-column:10/13] md:[grid-row:1/2]',
  'col-span-12 md:[grid-column:6/10] md:[grid-row:2/3]',
  'col-span-12 md:[grid-column:10/13] md:[grid-row:2/3]',
];

export function Services() {
  return (
    <section id="services" className="bg-background px-6 py-20 md:px-10">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-12 flex flex-col lg:flex-wrap lg:items-start text-start justify-center lg:justify-between  gap-8">
          <h2 className="font-display text-center lg:text-start text-4xl font-extrabold  ">
            Fast roofing.
            <span className="text-primary"> Done right.</span>
          </h2>
          <p className="text-pretty mx-auto lg:mx-0 text-center lg:text-start text-xl leading-relaxed text-muted-foreground">
            Five specialist services — from emergency repairs to full new installs.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-12 md:[grid-auto-rows:240px] gap-3">
          {services.map((service, idx) => (
            <div
              key={idx}
              className={`group relative overflow-hidden rounded-2xl border border-border cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-md min-h-[240px] ${gridClasses[idx]}`}
            >
              {/* Image fills the card */}
              <div className="absolute inset-0">
                <img
                  src={service.imagePlaceholder}
                  alt={service.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Strong bottom-up vignette for text legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,22,55,0.88)] via-[rgba(0,22,55,0.3)] to-transparent" />

              {/* Subtle top fade so arrow stays readable too */}
              <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,22,55,0.25)] via-transparent to-transparent" />

              {/* Arrow */}
              <div className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm ring-1 ring-white/10 transition-all duration-300 group-hover:rotate-45 group-hover:bg-primary">
                <svg className="h-3.5 w-3.5 stroke-white" fill="none" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>

              {/* Text */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="mb-1 text-[0.62rem] font-medium uppercase tracking-[0.12em] text-white/55">{service.label}</p>
                <h3 className="font-display text-lg font-bold leading-tight text-white drop-shadow-sm">{service.title}</h3>
                <p className="mt-0 max-h-0 overflow-hidden text-xs leading-relaxed text-white/70 opacity-0 transition-all duration-300 group-hover:mt-1.5 group-hover:max-h-14 group-hover:opacity-100">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>

    </section>
  );
}