'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Services', id: 'services' },
  { label: 'Our Team', id: 'our-team' },
  { label: 'Projects', id: 'projects' },
  { label: 'Process', id: 'process' },
  { label: 'Contact', id: 'contact' },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const current = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (current) setActive(current.target.id);
    }, { rootMargin: '-80px 0px -55% 0px', threshold: [0, 0.1, 0.5] });
    navLinks.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-16 border-b border-border bg-white/90 backdrop-blur-[12px]">
      <div className="mx-auto flex h-full max-w-[1200px] items-center justify-between px-6">
        <Link href="/" aria-label="FourFront home" className="flex h-11 items-center rounded-sm">
          <Image src="/LLC_LOGO.png" alt="FourFront" width={120} height={52} priority className="h-12 w-auto object-contain" />
        </Link>
        <nav aria-label="Main navigation" className="hidden items-center gap-3 md:flex">
          {navLinks.map(({ label, id }) => (
            <Link key={id} href={`/#${id}`} aria-current={active === id ? 'location' : undefined} className="flex min-h-11 items-center rounded-md px-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary hover:text-primary focus-visible:bg-secondary aria-[current=location]:text-primary">{label}</Link>
          ))}
          <Link href="/#contact" className="ml-2 flex min-h-11 items-center rounded-full bg-accent px-6 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/90">Call Now</Link>
        </nav>
        <button type="button" className="flex size-11 items-center justify-center rounded-md md:hidden" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen((value) => !value)}>
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>
      {open && (
        <nav id="mobile-navigation" aria-label="Mobile navigation" className="border-b border-border bg-white/95 px-6 py-3 shadow-sm md:hidden">
          {navLinks.map(({ label, id }) => <Link key={id} href={`/#${id}`} onClick={() => setOpen(false)} aria-current={active === id ? 'location' : undefined} className="flex min-h-11 items-center rounded-md px-3 text-sm font-medium text-foreground hover:bg-secondary focus-visible:bg-secondary">{label}</Link>)}
          <Link href="/#contact" onClick={() => setOpen(false)} className="mt-2 flex min-h-11 items-center justify-center rounded-full bg-accent px-6 text-sm font-medium text-accent-foreground">Call Now</Link>
        </nav>
      )}
    </header>
  );
}
