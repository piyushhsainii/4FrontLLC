import Image from 'next/image';

const processSteps = [
  { title: 'Free Inspection', description: 'We inspect your siding and exterior, identify areas of concern, and explain what we find.', image: '/recent-september-2026/24.jpg' },
  { title: 'Clear Estimate', description: 'You receive a complete, itemized estimate outlining scopes, timelines, and costs.', image: '/recent-september-2026/26.jpg' },
  { title: 'Fast Scheduling', description: 'Once approved, we coordinate materials and crew availability to get the job done fast.', image: '/recent-september-2026/25.jpg' },
  { title: 'Professional Build', description: 'Our crews carry out the siding, gutter, window, door, or roofing work with attention to detail and a clean site.', image: '/recent-september-2026/27.jpg' },
  { title: 'Final Walkthrough', description: 'We do a complete inspection with you to ensure satisfaction before we call it complete.', image: '/recent-september-2026/23.jpg' },
];

export function Process() {
  return (
    <section id="process" className="bg-background py-24 md:py-32">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="mb-12 text-center md:mb-20">
          <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.18em] text-accent">Our Process</span>
          <h2 className="text-4xl font-medium leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">Simple, clear, and <span className="text-primary">built around you.</span></h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">Five straightforward steps from first call to final inspection.</p>
        </div>
        <div className="space-y-5 pb-[20vh] max-md:pb-0">
          {processSteps.map((step, index) => (
            <article key={step.title} className="process-card relative rounded-3xl border border-border bg-white shadow-sm md:sticky" style={{ top: `calc(var(--header-h) + 16px + ${index * 12}px)` }}>
              <div className={`grid items-center gap-8 p-8 md:grid-cols-2 md:gap-12 md:p-12 ${index % 2 ? 'md:[&>div:first-child]:order-2' : ''}`}>
                <div className="min-w-0">
                  <span className="sr-only">Step {index + 1} of {processSteps.length}</span>
                  <div aria-hidden="true" className="mb-5 flex size-9 items-center justify-center rounded-full bg-primary text-xs font-semibold tracking-widest text-white">{String(index + 1).padStart(2, '0')}</div>
                  <h3 className="mb-4 text-3xl font-medium leading-tight tracking-tight text-foreground md:text-4xl">{step.title}</h3>
                  <p className="max-w-[46ch] text-[17px] leading-[1.6] text-[#475569] md:text-lg">{step.description}</p>
                  <div aria-hidden="true" className="mt-8 flex items-center gap-3">
                    <span className="text-xs font-semibold text-primary">{index + 1} / {processSteps.length}</span>
                    <div className="flex flex-1 gap-1.5">{processSteps.map((_, position) => <span key={position} className={`h-1.5 flex-1 rounded-full ${position < index ? 'bg-primary' : position === index ? 'bg-accent' : 'bg-[#cbd5e1]'}`} />)}</div>
                  </div>
                </div>
                <div className="relative aspect-[4/3] min-w-0 overflow-hidden rounded-xl bg-secondary">
                  <Image src={step.image} alt={`${step.title} project photo`} fill sizes="(max-width: 767px) 100vw, 50vw" className="object-cover" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
