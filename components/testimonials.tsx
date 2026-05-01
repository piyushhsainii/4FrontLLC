"use client";

import { useState, useRef, useEffect } from "react";

const testimonials = [
  {
    id: 1,
    name: "Hayden T.",
    initials: "HT",
    rating: 5,
    date: "a week ago",
    title: "Phenomenal work, no matter the challenge",
    body: "Had some issues come up that were completely my fault and Chris did a phenomenal job working with me and getting the job done regardless! Had roof work done, drywall replaced, painting, etc.",
    tag: "Roofing & Drywall",
  },
  {
    id: 2,
    name: "Ciara Denman",
    initials: "CD",
    rating: 5,
    date: "a week ago",
    title: "Outstanding communication, start to finish",
    body: "10/10 recommend! Chris, Tommy and Evan worked endlessly for two weeks bringing my house back to life! Answering questions, explaining different things, asking my opinion — the communication was outstanding! I felt informed the entire time.",
    tag: "Full Home Restoration",
  },

];

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path
        d="M7 1L8.545 5.09H13L9.59 7.61L10.91 12L7 9.31L3.09 12L4.41 7.61L1 5.09H5.455L7 1Z"
        fill={filled ? "#45932C" : "rgba(26,58,140,0.15)"}
        stroke={filled ? "#45932C" : "rgba(26,58,140,0.15)"}
        strokeWidth="0.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function QuoteIcon() {
  return (
    <svg width="32" height="24" viewBox="0 0 32 24" fill="none" aria-hidden="true">
      <path
        d="M0 24V14.4C0 10.56 0.96 7.36 2.88 4.8C4.88 2.24 7.68 0.64 11.28 0L12.72 2.4C10.24 3.04 8.32 4.24 6.96 6C5.68 7.76 5.04 9.68 5.04 11.76H9.6V24H0ZM19.2 24V14.4C19.2 10.56 20.16 7.36 22.08 4.8C24.08 2.24 26.88 0.64 30.48 0L31.92 2.4C29.44 3.04 27.52 4.24 26.16 6C24.88 7.76 24.24 9.68 24.24 11.76H28.8V24H19.2Z"
        fill="currentColor"
      />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: (typeof testimonials)[0];
  index: number;
}) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), index * 90);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [index]);

  return (
    <div
      ref={ref}
      className="relative flex flex-col bg-white rounded-2xl p-7"
      style={{
        boxShadow: "0 1px 3px rgba(26,58,140,0.07), 0 8px 32px rgba(26,58,140,0.09)",
        border: "1px solid rgba(26,58,140,0.08)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      {/* Quote icon */}
      <div style={{ color: "var(--navy)", opacity: 0.08 }} className="mb-4">
        <QuoteIcon />
      </div>

      {/* Stars */}
      <div className="flex gap-0.5 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <StarIcon key={i} filled={i < testimonial.rating} />
        ))}
      </div>

      {/* Title */}
      <h3
        className="text-[15px] font-semibold leading-snug mb-2"
        style={{ color: "var(--text)", letterSpacing: "-0.01em" }}
      >
        {testimonial.title}
      </h3>

      {/* Body */}
      <p className="text-[14px] leading-relaxed flex-1" style={{ color: "var(--muted)" }}>
        {testimonial.body}
      </p>

      {/* Tag */}
      <div className="mt-5 mb-4">
        <span
          className="inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full"
          style={{ background: "rgba(69,147,44,0.09)", color: "var(--green)" }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--green)" }} />
          {testimonial.tag}
        </span>
      </div>

      {/* Divider */}
      <div className="w-full h-px mb-4" style={{ background: "rgba(26,58,140,0.07)" }} />

      {/* Author row */}
      <div className="flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-[12px] font-semibold flex-shrink-0"
          style={{
            background: "linear-gradient(135deg, var(--navy-mid), var(--steel))",
            color: "#fff",
          }}
        >
          {testimonial.initials}
        </div>
        <div>
          <div className="text-[13px] font-semibold" style={{ color: "var(--text)" }}>
            {testimonial.name}
          </div>
          <div className="text-[12px]" style={{ color: "var(--muted)" }}>
            {testimonial.date}
          </div>
        </div>
        <div className="ml-auto opacity-60">
          <GoogleIcon />
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section
      className="relative py-20 px-4 overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      {/* Background dot grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(26,58,140,0.05) 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full"
        style={{
          background: "radial-gradient(ellipse, rgba(26,58,140,0.07) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="relative max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <div
            className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase px-3.5 py-1.5 rounded-full mb-5"
            style={{ background: "rgba(26,58,140,0.07)", color: "var(--navy)", letterSpacing: "0.12em" }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--green)" }} />
            Google Reviews
          </div>

          <h2
            className="text-[clamp(28px,4vw,42px)] font-bold leading-tight tracking-tight mb-4"
            style={{ color: "var(--text)" }}
          >
            Trusted by homeowners
            <br />
            <span style={{ color: "var(--navy-mid)" }}>across the region</span>
          </h2>

          <p className="text-[15px] max-w-md mx-auto leading-relaxed" style={{ color: "var(--muted)" }}>
            Real words from real clients — every project, every detail, handled with care.
          </p>

          {/* Aggregate rating pill */}
          <div
            className="inline-flex items-center gap-3 mt-7 px-5 py-3 rounded-2xl"
            style={{
              background: "white",
              boxShadow: "0 1px 3px rgba(26,58,140,0.08), 0 4px 16px rgba(26,58,140,0.07)",
              border: "1px solid rgba(26,58,140,0.07)",
            }}
          >
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon key={i} filled />
              ))}
            </div>
            <span className="text-[14px] font-semibold" style={{ color: "var(--text)" }}>5.0</span>
            <div className="w-px h-4" style={{ background: "rgba(26,58,140,0.12)" }} />
            <span className="text-[13px]" style={{ color: "var(--muted)" }}>Based on 40+ reviews</span>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.id} testimonial={t} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}