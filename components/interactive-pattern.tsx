'use client';

import { useEffect, useRef } from 'react';

/**
 * BackgroundPattern
 * ------------------
 * Renders the roof-silhouette dot artwork (the source art already contains
 * both the left and right roof shapes, converging toward the center) on a
 * <canvas>. Particles drift away from the cursor on hover and ease back to
 * their resting position when the cursor moves away.
 *
 * Sizing behaviour:
 * - The artwork is scaled to the container's height, then rendered at a
 *   FIXED pixel width (capped at MAX_WIDTH). It is never stretched to fill
 *   the container's width.
 * - On narrow viewports, the artwork simply overflows and gets clipped by
 *   the parent's `overflow-hidden` — the roofs keep their true proportions
 *   and spacing instead of being squeezed toward the center and colliding
 *   with the headline text.
 *
 * Requires /public/hero-dots.json.
 */

type Point = { x: number; y: number; r: number; o: number };
type DotData = { width: number; height: number; points: Point[] };

type Particle = {
    x: number; // resting x (screen space, set on resize)
    y: number; // resting y
    vx: number; // hover offset velocity
    vy: number;
    r: number;
    o: number;
};

const DOTS_URL = '/hero-dots.json';
const MAX_WIDTH = 2400; // hard cap on rendered artwork width, in CSS px
const REPEL_RADIUS = 90;
const REPEL_STRENGTH = 18;
const FRICTION = 0.86;

export function BackgroundPattern() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const mouseRef = useRef<{ x: number; y: number } | null>(null);
    const dprRef = useRef(1);
    const rawPointsRef = useRef<Point[]>([]);
    const designSizeRef = useRef({ w: 1400, h: 525 });
    const initializedRef = useRef(false);

    useEffect(() => {
        let raf = 0;
        let disposed = false;
        let resizeTimeout: ReturnType<typeof setTimeout> | null = null;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Guard against React Strict Mode's dev-only double effect invocation.
        if (initializedRef.current) return;
        initializedRef.current = true;

        async function init() {
            const res = await fetch(DOTS_URL);
            const data: DotData = await res.json();
            if (disposed) return;
            rawPointsRef.current = data.points;
            designSizeRef.current = { w: data.width, h: data.height };
            buildParticles();
            resize();
            ro.observe(canvas!.parentElement!);
            canvas!.addEventListener('mousemove', onMouseMove);
            canvas!.addEventListener('mouseleave', onMouseLeave);
            raf = requestAnimationFrame(tick);
        }

        function buildParticles() {
            // One particle per source point — the artwork already contains both
            // roof shapes, so there is no mirroring/duplication here.
            particlesRef.current = rawPointsRef.current.map((p) => ({
                x: 0,
                y: 0,
                vx: 0,
                vy: 0,
                r: p.r,
                o: p.o,
            }));
        }

        function resize() {
            const parent = canvas!.parentElement;
            if (!parent) return;
            const rect = parent.getBoundingClientRect();
            const containerHeight = Math.round(rect.height);
            if (containerHeight === 0) return;

            const { w: designW, h: designH } = designSizeRef.current;

            // Scale purely off container height, then cap the resulting width.
            // This keeps the artwork at a consistent, true-to-source size instead
            // of stretching to fill whatever width the container happens to be.
            let scale = containerHeight / designH;
            let renderWidth = designW * scale;
            if (renderWidth > MAX_WIDTH) {
                scale = MAX_WIDTH / designW;
                renderWidth = MAX_WIDTH;
            }
            const renderHeight = designH * scale;

            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            dprRef.current = dpr;
            canvas!.width = Math.round(renderWidth * dpr);
            canvas!.height = Math.round(renderHeight * dpr);
            // Fixed CSS pixel size — intentionally NOT percentage-based, so the
            // canvas box can't be stretched by its flex container. The parent
            // centers it and clips overflow.
            canvas!.style.width = `${renderWidth}px`;
            canvas!.style.height = `${renderHeight}px`;

            const raw = rawPointsRef.current;
            const particles = particlesRef.current;
            for (let i = 0; i < raw.length; i++) {
                particles[i].x = raw[i].x * scale;
                particles[i].y = raw[i].y * scale;
                particles[i].vx = 0;
                particles[i].vy = 0;
            }
        }

        function scheduleResize() {
            if (resizeTimeout) clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(resize, 60);
        }

        const ro = new ResizeObserver(() => scheduleResize());

        function onMouseMove(e: MouseEvent) {
            const rect = canvas!.getBoundingClientRect();
            mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
        }

        function onMouseLeave() {
            mouseRef.current = null;
        }

        function tick() {
            const dpr = dprRef.current;
            const width = canvas!.width / dpr;
            const height = canvas!.height / dpr;
            ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
            ctx!.clearRect(0, 0, width, height);

            const mouse = mouseRef.current;

            for (const p of particlesRef.current) {
                if (mouse) {
                    const px = p.x + p.vx;
                    const py = p.y + p.vy;
                    const dx = px - mouse.x;
                    const dy = py - mouse.y;
                    const dist = Math.sqrt(dx * dx + dy * dy) || 1;
                    if (dist < REPEL_RADIUS) {
                        const force = (1 - dist / REPEL_RADIUS) * REPEL_STRENGTH;
                        p.vx += (dx / dist) * force * 0.05;
                        p.vy += (dy / dist) * force * 0.05;
                    }
                }
                p.vx *= FRICTION;
                p.vy *= FRICTION;

                ctx!.beginPath();
                ctx!.arc(p.x + p.vx, p.y + p.vy, p.r, 0, Math.PI * 2);
                ctx!.fillStyle = `rgba(20, 20, 20, ${p.o})`;
                ctx!.fill();
            }

            raf = requestAnimationFrame(tick);
        }

        init();

        return () => {
            disposed = true;
            initializedRef.current = false;
            if (resizeTimeout) clearTimeout(resizeTimeout);
            cancelAnimationFrame(raf);
            ro.disconnect();
            canvas?.removeEventListener('mousemove', onMouseMove);
            canvas?.removeEventListener('mouseleave', onMouseLeave);
        };
    }, []);

    return <canvas ref={canvasRef} aria-hidden="true" className="block pointer-events-auto" />;
}