'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

const navLinks = [
  { label: 'Services', id: 'services' },
  { label: 'Projects', id: 'projects' },
  { label: 'Process', id: 'process' },
  { label: 'Contact', id: 'contact' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (id: string) => {
    setIsMobileMenuOpen(false);
    // Small delay lets the mobile menu close before scrolling
    setTimeout(() => scrollTo(id), 10);
  };

  return (
    <header
      className={cn(
        'fixed left-0 right-0 top-0 z-50 transition-all duration-300',
        'bg-background/80 py-3 shadow-sm backdrop-blur-md'
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-3 xl:px-0 text-foreground">
        <Link href="/" className="flex flex-col group">
          <img src="/LLC_LOGO.png" className="h-18 w-auto" alt="" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => handleNav(id)}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              {label}
            </button>
          ))}
          <button
            onClick={() => handleNav('contact')}
            className="rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-accent-foreground transition-all hover:bg-accent/90 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
          >
            Call Now
          </button>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="absolute left-0 right-0 top-full bg-background border-b border-border p-6 shadow-xl md:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map(({ label, id }) => (
              <button
                key={id}
                onClick={() => handleNav(id)}
                className="text-left text-lg font-medium hover:text-primary transition-colors"
              >
                {label}
              </button>
            ))}
            <button
              onClick={() => handleNav('contact')}
              className="mt-4 rounded-full bg-accent px-6 py-3 text-center text-sm font-medium text-accent-foreground"
            >
              Call Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
}