'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// ── Light theme tokens (matches site palette) ─────────────────
const T = {
    bg: '#F5F7FA',
    bgAlt: '#EEF2FB',
    bgPanel: '#ffffff',
    border: 'rgba(26,58,140,0.10)',
    navy: '#1A3A8C',
    navyMid: '#2252B8',
    green: '#4DB84E',
    greenLight: 'rgba(77,184,78,0.12)',
    greenBorder: 'rgba(77,184,78,0.28)',
    text: '#0F1C3F',
    muted: '#6B7A99',
    mutedLight: '#9BAAC4',
};

// Map display labels → section IDs from the app layout
const SECTION_IDS: Record<string, string> = {
    'Services': 'services',
    'Projects': 'projects',
    'Process': 'process',
    'Testimonials': 'testimonials',
    'Contact': 'contact',
};

function scrollToSection(id: string) {
    const el = document.getElementById(id);
    if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

export function MapFooter() {
    const currentYear = new Date().getFullYear();
    const [mapLoaded, setMapLoaded] = useState(false);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        timerRef.current = setTimeout(() => setMapLoaded(true), 3500);
        return () => { if (timerRef.current) clearTimeout(timerRef.current); };
    }, []);

    const handleMapLoad = () => {
        if (timerRef.current) clearTimeout(timerRef.current);
        setMapLoaded(true);
    };

    return (
        <footer
            className="relative z-10 max-w-[2200px] mx-auto"
            style={{ fontFamily: "'Inter', sans-serif", background: T.bg, color: T.text, borderTop: `1px solid ${T.border}` }}
        >

            {/* ═══ TOP ROW — 30% brand / 70% map ═══════════════════════ */}
            <div style={{ display: 'flex', minHeight: 500 }} className="footer-map-row">

                {/* ── 30% Brand Panel ───────────────────────────────────── */}
                <div
                    className="footer-brand-panel"
                    style={{
                        width: '100%',
                        flexShrink: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        padding: '52px 44px',
                        borderRight: `1px solid ${T.border}`,
                        background: T.bgPanel,
                        position: 'relative',
                        overflow: 'hidden',
                    }}
                >
                    <div style={{
                        position: 'absolute', bottom: -80, left: -80,
                        width: 280, height: 280,
                        background: 'radial-gradient(circle, rgba(77,184,78,0.07) 0%, transparent 70%)',
                        pointerEvents: 'none',
                    }} />
                    <div style={{
                        position: 'absolute', top: -60, right: -60,
                        width: 200, height: 200,
                        background: 'radial-gradient(circle, rgba(26,58,140,0.05) 0%, transparent 70%)',
                        pointerEvents: 'none',
                    }} />

                    {/* Logo */}
                    <div style={{ marginBottom: 28 }}>
                        <Link href="/" style={{ display: 'inline-block', marginBottom: 18, textDecoration: 'none' }}>
                            <Image
                                src="/LLC_LOGO.png"
                                alt="4Front Construction and Logistics Services"
                                width={160}
                                height={80}
                                style={{ objectFit: 'contain', display: 'block' }}
                                priority
                            />
                        </Link>
                        <p style={{ fontSize: 13.5, lineHeight: 1.72, color: T.muted, maxWidth: 280, margin: 0 }}>
                            Reliable roofing, built to protect what matters most. Professional, fully insured, and highly rated.
                        </p>
                    </div>

                    {/* Trust badges */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginBottom: 28 }}>
                        {[
                            'Licensed & Fully Insured',
                            'Insurance Claim Specialists',
                            'Same-Day Inspections Available',
                        ].map((text) => (
                            <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                                <span style={{
                                    width: 20, height: 20, borderRadius: '50%',
                                    background: T.greenLight,
                                    border: `1px solid ${T.greenBorder}`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: 10, color: T.green, fontWeight: 700, flexShrink: 0,
                                }}>✓</span>
                                <span style={{ fontSize: 12.5, color: T.muted, fontWeight: 500 }}>{text}</span>
                            </div>
                        ))}
                    </div>

                    {/* Contact rows */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 32 }}>
                        {([
                            {
                                icon: '📞', label: 'Phone', node: (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                        <a href="tel:+18132945498" style={{ fontSize: 13.5, fontWeight: 600, color: T.navy, textDecoration: 'none' }}>+1 (813) 294-5498</a>
                                        <a href="tel:+15136460333" style={{ fontSize: 13.5, fontWeight: 600, color: T.navy, textDecoration: 'none' }}>+1 (513) 646-0333</a>
                                    </div>
                                )
                            },
                            {
                                icon: '✉️', label: 'Email', node: (
                                    <a href="mailto:operations@fourfrontllc.com" style={{ fontSize: 13, fontWeight: 500, color: T.navy, textDecoration: 'none' }}>operations@fourfrontllc.com</a>
                                )
                            },
                            {
                                icon: '📍', label: 'Service Area', node: (
                                    <span style={{ fontSize: 13, color: T.muted }}>Greater Cincinnati Metro Region &amp; Surrounding Counties</span>
                                )
                            },
                        ] as const).map(({ icon, label, node }) => (
                            <div key={label} style={{ display: 'flex', gap: 11, alignItems: 'flex-start' }}>
                                <span style={{ fontSize: 14, marginTop: 1, flexShrink: 0 }}>{icon}</span>
                                <div>
                                    <div style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: '1.4px', textTransform: 'uppercase', color: T.mutedLight, marginBottom: 2 }}>{label}</div>
                                    {node}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* CTA button — scrolls to #contact */}
                    <button
                        onClick={() => scrollToSection('contact')}
                        className="footer-cta-btn"
                        style={{
                            display: 'inline-flex', alignItems: 'center', gap: 8,
                            background: T.navy, color: '#fff',
                            padding: '12px 22px', borderRadius: 100,
                            fontSize: 13, fontWeight: 700,
                            border: 'none', cursor: 'pointer',
                            alignSelf: 'flex-start',
                            boxShadow: '0 4px 18px rgba(26,58,140,0.22)',
                            transition: 'background 0.2s, transform 0.15s, box-shadow 0.2s',
                        }}
                    >
                        Get Free Inspection →
                    </button>
                </div>

                {/* ── 70% Google Map ─────────────────────────────────────── */}
                <div
                    className="footer-map-panel"
                    style={{ position: 'relative', overflow: 'hidden', background: T.bgAlt, flex: 1, minHeight: 380 }}
                >
                    <div
                        style={{
                            position: 'absolute', inset: 0, zIndex: 10,
                            display: 'flex', flexDirection: 'column',
                            alignItems: 'center', justifyContent: 'center',
                            background: T.bgAlt,
                            gap: 18,
                            opacity: mapLoaded ? 0 : 1,
                            pointerEvents: mapLoaded ? 'none' : 'auto',
                            transition: 'opacity 0.4s ease',
                        }}
                    >
                        <div style={{
                            width: 48, height: 48, borderRadius: '50%',
                            border: `3px solid rgba(26,58,140,0.1)`,
                            borderTop: `3px solid ${T.green}`,
                            animation: 'mapSpin 0.85s linear infinite',
                        }} />
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: 13, fontWeight: 600, color: T.navy, marginBottom: 4 }}>Loading Map</div>
                            <div style={{ fontSize: 11.5, color: T.muted, letterSpacing: '0.3px' }}>Fourfront Construction</div>
                        </div>
                        <div style={{ display: 'flex', gap: 6 }}>
                            {[0, 1, 2].map((i) => (
                                <div key={i} style={{
                                    width: 6, height: 6, borderRadius: '50%', background: T.green,
                                    animation: `mapDot 1.4s ease-in-out ${i * 0.2}s infinite`,
                                }} />
                            ))}
                        </div>
                    </div>

                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 40, zIndex: 2, background: `linear-gradient(to bottom,${T.bgAlt},transparent)`, pointerEvents: 'none' }} />
                    <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 40, zIndex: 2, background: `linear-gradient(to right,${T.bgAlt},transparent)`, pointerEvents: 'none' }} />

                    {mapLoaded && (
                        <div style={{
                            position: 'absolute', top: 16, right: 16, zIndex: 3,
                            display: 'flex', alignItems: 'center', gap: 7,
                            background: 'rgba(255,255,255,0.90)',
                            border: `1px solid ${T.border}`,
                            backdropFilter: 'blur(10px)',
                            borderRadius: 100, padding: '7px 14px',
                            boxShadow: '0 2px 12px rgba(26,58,140,0.1)',
                        }}>
                            <span style={{
                                width: 7, height: 7, borderRadius: '50%', background: T.green,
                                boxShadow: `0 0 7px rgba(77,184,78,0.7)`, display: 'inline-block',
                                animation: 'mapPulse 2s ease-in-out infinite',
                            }} />
                            <span style={{ fontSize: 11.5, fontWeight: 600, color: T.navy, letterSpacing: '0.3px' }}>
                                Fourfront Construction
                            </span>
                        </div>
                    )}

                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3156597.8539350475!2d-85.044954!3d39.41021335!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x65d950ef141cac51%3A0xf2bde9f891a53b93!2sFourfront%20construction!5e0!3m2!1sen!2sin!4v1777669691764!5m2!1sen!2sin"
                        style={{
                            width: '100%', height: '100%', minHeight: 500,
                            border: 0, display: 'block',
                            opacity: mapLoaded ? 1 : 0,
                            transition: 'opacity 0.55s ease',
                        }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Fourfront Construction Location"
                        onLoad={handleMapLoad}
                    />
                </div>
            </div>

            {/* ═══ BOTTOM — Links grid + copyright ═════════════════════ */}
            <div style={{ background: T.bgPanel, borderTop: `1px solid ${T.border}` }}>
                <div className="mx-auto" style={{ maxWidth: 1280, padding: '44px 52px 36px' }}>

                    {/* 4-col links */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: 36, marginBottom: 36 }}>

                        {/* Services */}
                        <div>
                            <h4 style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '1.6px', textTransform: 'uppercase', color: T.navy, marginBottom: 16, marginTop: 0 }}>Services</h4>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 9 }}>
                                {['Roof Repair', 'Roof Replacement', 'New Installation', 'Storm Response', 'Insurance Help'].map((s) => (
                                    <li key={s}>
                                        <button
                                            onClick={() => scrollToSection('services')}
                                            className="footer-link"
                                            style={{ fontSize: 13, color: T.muted, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                                        >
                                            {s}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Company */}
                        <div>
                            <h4 style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '1.6px', textTransform: 'uppercase', color: T.navy, marginBottom: 16, marginTop: 0 }}>Company</h4>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 9 }}>
                                {(['Projects', 'Process', 'Testimonials', 'Contact'] as const).map((label) => (
                                    <li key={label}>
                                        <button
                                            onClick={() => scrollToSection(SECTION_IDS[label])}
                                            className="footer-link"
                                            style={{ fontSize: 13, color: T.muted, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                                        >
                                            {label}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact */}
                        <div>
                            <h4 style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '1.6px', textTransform: 'uppercase', color: T.navy, marginBottom: 16, marginTop: 0 }}>Contact</h4>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 9 }}>
                                <li><a href="tel:+18132945498" className="footer-link" style={{ fontSize: 13, color: T.muted, textDecoration: 'none' }}>+1 (813) 294-5498</a></li>
                                <li><a href="tel:+15136460333" className="footer-link" style={{ fontSize: 13, color: T.muted, textDecoration: 'none' }}>+1 (513) 646-0333</a></li>
                                <li><a href="mailto:operations@fourfrontllc.com" className="footer-link" style={{ fontSize: 13, color: T.muted, textDecoration: 'none' }}>operations@fourfrontllc.com</a></li>
                                <li><span style={{ fontSize: 13, color: T.mutedLight }}>Greater Cincinnati Metro Region</span></li>
                                <li><span style={{ fontSize: 13, color: T.mutedLight }}>&amp; Surrounding Counties</span></li>
                            </ul>
                        </div>

                        {/* Legal */}
                        <div>
                            <h4 style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '1.6px', textTransform: 'uppercase', color: T.navy, marginBottom: 16, marginTop: 0 }}>Legal</h4>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 9 }}>
                                <li><Link href="/privacy" className="footer-link" style={{ fontSize: 13, color: T.muted, textDecoration: 'none' }}>Privacy Policy</Link></li>
                                <li><Link href="/terms" className="footer-link" style={{ fontSize: 13, color: T.muted, textDecoration: 'none' }}>Terms of Service</Link></li>
                            </ul>
                        </div>
                    </div>

                    {/* Copyright bar */}
                    <div style={{
                        borderTop: `1px solid ${T.border}`, paddingTop: 24,
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        flexWrap: 'wrap', gap: 14,
                    }}>
                        <p style={{ fontSize: 12, color: T.mutedLight, margin: 0 }}>
                            &copy; {currentYear} 4Front Construction and Logistics Services. All rights reserved.
                        </p>
                        <div style={{ display: 'flex', gap: 16 }}>
                            <Link href="/privacy" className="footer-link" style={{ fontSize: 12, color: T.mutedLight, textDecoration: 'none' }}>Privacy Policy</Link>
                            <Link href="/terms" className="footer-link" style={{ fontSize: 12, color: T.mutedLight, textDecoration: 'none' }}>Terms of Service</Link>
                        </div>
                        <div style={{
                            display: 'flex', alignItems: 'center', gap: 7,
                            background: T.greenLight, border: `1px solid ${T.greenBorder}`,
                            borderRadius: 100, padding: '5px 13px',
                        }}>
                            <span style={{ fontSize: 10, fontWeight: 700, color: T.green, letterSpacing: '1.2px', textTransform: 'uppercase' }}>
                                Licensed &amp; Insured
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
        @keyframes mapSpin  { to { transform: rotate(360deg); } }
        @keyframes mapPulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(1.45)} }
        @keyframes mapDot   { 0%,80%,100%{transform:scale(0.6);opacity:0.35} 40%{transform:scale(1);opacity:1} }

        .footer-link:hover { color: #1A3A8C !important; }
        .footer-cta-btn:hover { background: #2252B8 !important; transform: translateY(-1px) !important; box-shadow: 0 6px 22px rgba(26,58,140,0.28) !important; }

        @media (min-width: 1024px) {
          .footer-map-row   { flex-direction: row !important; }
          .footer-brand-panel { width: 30% !important; }
          .footer-map-panel { flex: 1; }
        }
        @media (max-width: 1023px) {
          .footer-map-row   { flex-direction: column !important; }
          .footer-brand-panel { width: 100% !important; border-right: none !important; border-bottom: 1px solid rgba(26,58,140,0.10) !important; }
          .footer-map-panel { min-height: 320px !important; }
        }
        @media (max-width: 768px) {
          .footer-map-row > div:first-child { padding: 36px 24px !important; }
          footer > div:last-child > div { padding: 36px 24px 28px !important; }
        }
      `}</style>
        </footer>
    );
}