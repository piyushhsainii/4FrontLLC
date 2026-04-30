'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // make the header a bit translucent when scrolled more than 20
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed left-0 right-0 top-0 z-50 bg-white transition-all duration-300',
        isScrolled
          ? 'bg-background/80 py-3 shadow-sm backdrop-blur-md'
          : 'bg-transparent py-5'
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-3 xl:px-0 text-foreground">
        <Link href="/" className="flex flex-col group">
          <img src="/LLC_LOGO.png" className='h-18 w-auto' alt="" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link href="#services" className="text-sm font-medium hover:text-primary transition-colors">Services</Link>
          <Link href="#projects" className="text-sm font-medium hover:text-primary transition-colors">Projects</Link>
          <Link href="#process" className="text-sm font-medium hover:text-primary transition-colors">Process</Link>
          <Link href="#contact" className="text-sm font-medium hover:text-primary transition-colors">Contact</Link>
          <a
            href="#contact"
            className="rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-accent-foreground transition-all hover:bg-accent/90 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
          >
            Call Now
          </a>
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
            <Link href="#services" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium">Services</Link>
            <Link href="#projects" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium">Projects</Link>
            <Link href="#process" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium">Process</Link>
            <Link href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium">Contact</Link>
            <a
              href="#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-4 rounded-full bg-accent px-6 py-3 text-center text-sm font-medium text-accent-foreground"
            >
              Call Now
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
