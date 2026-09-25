import React from 'react';

const reasons = [
  {
    title: 'Transparent Pricing',
    description: 'Clear expectations from day one with no hidden fees.',
  },
  {
    title: 'Fast Scheduling',
    description: 'We respect your time and execute projects with speed and efficiency.',
  },
  {
    title: 'Clean Job Sites',
    description: 'Professional crews that leave your property spotless after the work is done.',
  },
  {
    title: 'Clear Communication',
    description: 'Constant updates throughout the entirety of your project lifecycle.',
  },
];

export function WhyChoose() {
  return (
    <section className="relative z-10 bg-primary py-24 text-primary-foreground md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          <div>
            <span className="mb-4 block text-sm font-bold tracking-widest text-accent uppercase">Why 4Front</span>
            <h2 className="mb-6 text-balance text-4xl font-medium leading-tight tracking-tight text-primary-foreground md:text-5xl lg:text-6xl">
              The professional, low-risk contractor choice.
            </h2>
            <p className="text-lg text-primary-foreground/80 md:text-xl">
              We're partners in protecting your home. Every project is handled with precision, transparency, and care.
            </p>
          </div>

          <div className="grid gap-2 sm:grid-cols-2">
            {reasons.map((reason, idx) => (
              <div key={idx} className="group relative rounded-2xl p-6 transition-colors duration-300 hover:bg-white/10 hover:shadow-lg">
                <div className="mb-4 text-sm font-bold text-accent">
                  {String(idx + 1).padStart(2, '0')}
                </div>
                <h3 className="mb-3 text-xl font-semibold tracking-tight text-primary-foreground">{reason.title}</h3>
                <p className="text-primary-foreground/70 text-sm leading-relaxed">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
