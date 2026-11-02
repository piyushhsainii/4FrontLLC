const googleReviewsUrl = 'https://www.google.com/maps/place/Fourfront+construction/@39.410213,-85.044954,7z/data=!4m18!1m9!3m8!1s0x65d950ef141cac51:0xf2bde9f891a53b93!2sFourfront+construction!8m2!3d39.4102134!4d-85.044954!9m1!1b1!16s%2Fg%2F11z5_gbz8j!3m7!1s0x65d950ef141cac51:0xf2bde9f891a53b93!8m2!3d39.4102134!4d-85.044954!9m1!1b1!16s%2Fg%2F11z5_gbz8j?hl=en';

// Short excerpts verified against the Google Maps listing on November 3, 2026.
// Google shows relative review ages, so preserve the capture context below.
const testimonials = [
  { name: 'Myles', quote: 'The team was very responsive and kind.', age: '3 months ago' },
  { name: 'Corbin Davis', quote: 'Flawless experience working with them!', age: '5 months ago' },
  { name: 'Jessica Gunsaulies', quote: 'They did a tear off and reroof and cleaned up the mess.', age: '4 months ago' },
];

export default function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-background px-4 py-20" aria-labelledby="reviews-heading">
      <div className="pointer-events-none absolute inset-0 opacity-40" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(26,58,140,0.05) 1px, transparent 0)', backgroundSize: '32px 32px' }} />
      <div className="relative mx-auto max-w-5xl text-center">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-primary/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-primary">
          <span className="size-1.5 rounded-full bg-accent" />
          Google Reviews
        </div>
        <h2 id="reviews-heading" className="mb-4 text-[clamp(28px,4vw,42px)] font-semibold leading-tight tracking-tight text-foreground">
          Trusted by homeowners<br /><span className="text-primary">across the region</span>
        </h2>
        <p className="mx-auto max-w-md text-[15px] leading-relaxed text-muted-foreground">
          See what homeowners are saying about their experience with FourFront.
        </p>
        <div className="mt-7 inline-flex items-center gap-3 rounded-2xl border border-border bg-white px-5 py-3 shadow-sm">
          <span className="text-sm tracking-[0.12em] text-accent" aria-hidden="true">★★★★★</span>
          <span className="text-sm font-semibold text-foreground">4.9</span>
          <span className="h-4 w-px bg-border" />
          <span className="text-[13px] text-muted-foreground">17 Google reviews</span>
        </div>
        <div className="mt-10 grid gap-4 text-left md:grid-cols-3">
          {testimonials.map((review) => (
            <figure key={review.name} className="flex flex-col rounded-2xl border border-border bg-white p-6 shadow-sm">
              <span className="text-sm tracking-[0.12em] text-accent" aria-label="5 out of 5 stars">★★★★★</span>
              <blockquote className="mt-4 flex-1 text-base leading-relaxed text-foreground">“{review.quote}”</blockquote>
              <figcaption className="mt-6 border-t border-border pt-4">
                <span className="block text-sm font-semibold text-foreground">{review.name}</span>
                <span className="mt-1 block text-xs text-muted-foreground">Google showed {review.age} on Nov 3, 2026</span>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-8">
          <a href={googleReviewsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-5 py-3 text-sm font-medium text-primary shadow-sm transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-md">
            Read all current reviews on Google <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
