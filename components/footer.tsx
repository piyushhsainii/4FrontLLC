import React from 'react';
import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background text-foreground border-t border-border relative z-10">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link href="/" className="flex flex-col group mb-6 inline-block">
              <span className="text-2xl font-bold tracking-tight">4Front</span>
              <span className="text-xs font-semibold tracking-wider uppercase text-muted-foreground group-hover:text-primary transition-colors">
                Construction & Logistics Services
              </span>
            </Link>
            <p className="max-w-md text-muted-foreground">
              Reliable roofing, built to protect what matters most. Professional, fully insured, and highly rated.
            </p>
          </div>

          <div>
            <h4 className="mb-6 font-bold tracking-tight">Contact Info</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li>
                <a href="tel:+1234567890" className="hover:text-primary transition-colors">+1 (234) 567-890</a>
              </li>
              <li>
                <a href="mailto:info@4frontcls.com" className="hover:text-primary transition-colors">info@4frontcls.com</a>
              </li>
              <li>
                <p>Service Area: Greater Metro Region & Surrounding Counties</p>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6 font-bold tracking-tight">Services</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="#services" className="hover:text-primary transition-colors">Roof Repair</Link></li>
              <li><Link href="#services" className="hover:text-primary transition-colors">Roof Replacement</Link></li>
              <li><Link href="#services" className="hover:text-primary transition-colors">New Installation</Link></li>
              <li><Link href="#services" className="hover:text-primary transition-colors">Storm Response</Link></li>
              <li><Link href="#services" className="hover:text-primary transition-colors">Insurance Help</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-border pt-8 text-sm text-muted-foreground flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>&copy; {currentYear} 4Front Construction and Logistics Services. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
