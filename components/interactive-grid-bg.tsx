'use client';

import React, { useEffect, useRef } from 'react';

interface Point {
  x: number;
  y: number;
  originX: number;
  originY: number;
}

function drawHammer(ctx: CanvasRenderingContext2D, cx: number, cy: number, size: number, alpha: number) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.translate(cx, cy); ctx.rotate(Math.PI / 4);
  ctx.strokeStyle = '#1A3A8C'; ctx.fillStyle = '#1A3A8C';
  ctx.lineWidth = size * 0.09; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const s = size;
  ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, s * 0.75); ctx.stroke();
  ctx.beginPath(); ctx.roundRect(-s * 0.28, -s * 0.28, s * 0.56, s * 0.32, s * 0.07); ctx.fill();
  ctx.strokeStyle = '#ffffff'; ctx.lineWidth = size * 0.055; ctx.globalAlpha = alpha * 0.5;
  ctx.beginPath(); ctx.moveTo(-s * 0.14, -s * 0.02); ctx.lineTo(-s * 0.14, -s * 0.2); ctx.stroke();
  ctx.restore();
}

function drawTrowel(ctx: CanvasRenderingContext2D, cx: number, cy: number, size: number, alpha: number) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.translate(cx, cy); ctx.rotate(-Math.PI / 5);
  ctx.strokeStyle = '#1A3A8C'; ctx.fillStyle = '#1A3A8C';
  ctx.lineWidth = size * 0.07; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const s = size;
  ctx.beginPath();
  ctx.moveTo(0, -s * 0.55);
  ctx.bezierCurveTo(s * 0.35, -s * 0.2, s * 0.35, s * 0.2, 0, s * 0.35);
  ctx.bezierCurveTo(-s * 0.35, s * 0.2, -s * 0.35, -s * 0.2, 0, -s * 0.55);
  ctx.fill();
  ctx.globalAlpha = alpha;
  ctx.beginPath(); ctx.moveTo(0, s * 0.35); ctx.lineTo(0, s * 0.72); ctx.stroke();
  ctx.lineWidth = size * 0.13;
  ctx.beginPath(); ctx.moveTo(0, s * 0.58); ctx.lineTo(0, s * 0.72); ctx.stroke();
  ctx.restore();
}

function drawRoofingNail(ctx: CanvasRenderingContext2D, cx: number, cy: number, size: number, alpha: number) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.translate(cx, cy); ctx.rotate(Math.PI / 8);
  ctx.strokeStyle = '#1A3A8C'; ctx.fillStyle = '#1A3A8C'; ctx.lineCap = 'round';
  const s = size;
  ctx.lineWidth = s * 0.1;
  ctx.beginPath(); ctx.moveTo(0, -s * 0.5); ctx.lineTo(0, s * 0.45); ctx.stroke();
  ctx.lineWidth = s * 0.07;
  ctx.beginPath(); ctx.moveTo(-s * 0.06, s * 0.38); ctx.lineTo(0, s * 0.55); ctx.lineTo(s * 0.06, s * 0.38); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(0, -s * 0.5, s * 0.22, s * 0.09, 0, 0, Math.PI * 2); ctx.fill();
  ctx.restore();
}

function drawShingle(ctx: CanvasRenderingContext2D, cx: number, cy: number, size: number, alpha: number) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.translate(cx, cy); ctx.rotate(Math.PI / 12);
  ctx.strokeStyle = '#1A3A8C'; ctx.fillStyle = 'rgba(26,58,140,0.18)';
  ctx.lineWidth = size * 0.065; ctx.lineJoin = 'round';
  const s = size; const w = s * 0.9, h = s * 0.55;
  ctx.beginPath(); ctx.roundRect(-w / 2, h * 0.15, w, h * 0.55, s * 0.06); ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.roundRect(-w / 2 + s * 0.12, -h * 0.4, w, h * 0.55, s * 0.06); ctx.fill(); ctx.stroke();
  ctx.lineWidth = size * 0.04; ctx.globalAlpha = alpha * 0.5;
  ctx.beginPath();
  ctx.moveTo(-w * 0.12, h * 0.15); ctx.lineTo(-w * 0.12, h * 0.7);
  ctx.moveTo(w * 0.18, h * 0.15); ctx.lineTo(w * 0.18, h * 0.7);
  ctx.stroke();
  ctx.restore();
}

function drawLadder(ctx: CanvasRenderingContext2D, cx: number, cy: number, size: number, alpha: number) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.translate(cx, cy); ctx.rotate(-Math.PI / 14);
  ctx.strokeStyle = '#1A3A8C'; ctx.lineWidth = size * 0.09; ctx.lineCap = 'round';
  const s = size; const halfW = s * 0.3; const h = s * 0.9;
  ctx.beginPath();
  ctx.moveTo(-halfW, -h / 2); ctx.lineTo(-halfW, h / 2);
  ctx.moveTo(halfW, -h / 2); ctx.lineTo(halfW, h / 2);
  ctx.stroke();
  ctx.lineWidth = size * 0.07;
  for (let r = 0; r < 5; r++) {
    const ry = -h / 2 + (h / 4) * r;
    ctx.beginPath(); ctx.moveTo(-halfW, ry); ctx.lineTo(halfW, ry); ctx.stroke();
  }
  ctx.restore();
}

interface ToolDef {
  side: 'left' | 'right';
  yFrac: number;
  xOff: number;
  draw: (ctx: CanvasRenderingContext2D, cx: number, cy: number, size: number, alpha: number) => void;
  size: number;
  alpha: number;
}

const TOOL_DEFS: ToolDef[] = [
  { side: 'left', yFrac: 0.18, xOff: 60, draw: drawHammer, size: 42, alpha: 0.18 },
  { side: 'left', yFrac: 0.46, xOff: 30, draw: drawShingle, size: 54, alpha: 0.14 },
  { side: 'left', yFrac: 0.72, xOff: 70, draw: drawRoofingNail, size: 36, alpha: 0.16 },
  { side: 'right', yFrac: 0.25, xOff: 55, draw: drawTrowel, size: 44, alpha: 0.16 },
  { side: 'right', yFrac: 0.55, xOff: 28, draw: drawLadder, size: 50, alpha: 0.14 },
  { side: 'right', yFrac: 0.82, xOff: 65, draw: drawShingle, size: 38, alpha: 0.13 },
];

// Seeded pseudo-random so jitter is stable across frames
function mulberry32(seed: number) {
  return function () {
    seed |= 0; seed = seed + 0x6D2B79F5 | 0;
    let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

export function InteractiveGridBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let points: Point[] = [];

    // ── Tunables ──────────────────────────────────────────────
    const MAX_CONTENT_W = 1600; // must match your layout max-width
    const spacing = 34;
    const jitter = 10;   // px of random offset applied to each dot's origin
    const baseRadius = 1.6;
    const maxRadius = 5.0;
    const interactionRadius = 140;
    const pushForce = 36;
    const FADE_INTO_CONTENT = 180;  // px: how far inside content edge dots fade to 0
    // ──────────────────────────────────────────────────────────

    const rand = mulberry32(0xDEADBEEF);

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      const rect = parent.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;

      initPoints();
    };

    const initPoints = () => {
      // Reset the rng so jitter is identical on every resize
      const rng = mulberry32(0xDEADBEEF);
      points = [];

      const contentW = Math.min(canvas.width, MAX_CONTENT_W);
      const contentLeft = (canvas.width - contentW) / 2;
      const contentRight = contentLeft + contentW;

      const cols = Math.ceil(canvas.width / spacing) + 1;
      const rows = Math.ceil(canvas.height / spacing) + 1;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const gx = i * spacing;
          const gy = j * spacing;

          // Apply jitter to origin — gives organic, non-grid look
          const ox = gx + (rng() - 0.5) * jitter * 2;
          const oy = gy + (rng() - 0.5) * jitter * 2;

          // Pre-cull: skip dots that are fully inside the content area
          // (beyond the fade zone). This is the max-width enforcement.
          const distFromLeft = ox - contentLeft;
          const distFromRight = contentRight - ox;
          const insideDepth = Math.min(distFromLeft, distFromRight);

          if (insideDepth > FADE_INTO_CONTENT) continue;

          points.push({ x: ox, y: oy, originX: ox, originY: oy });
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };
    const handleMouseLeave = () => { mouseRef.current.x = -9999; mouseRef.current.y = -9999; };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const contentW = Math.min(canvas.width, MAX_CONTENT_W);
      const contentLeft = (canvas.width - contentW) / 2;
      const contentRight = contentLeft + contentW;

      points.forEach((p) => {
        // insideDepth: px the dot is inside the content area (negative = in gutter)
        const distFromLeft = p.originX - contentLeft;
        const distFromRight = contentRight - p.originX;
        const insideDepth = Math.min(distFromLeft, distFromRight);

        let weight: number;
        if (insideDepth <= 0) {
          // In the gutter — fully visible
          weight = 1;
        } else if (insideDepth >= FADE_INTO_CONTENT) {
          // Deep inside content — should have been culled in initPoints
          weight = 0;
        } else {
          // Fade zone: smoothstep 1→0
          const t = insideDepth / FADE_INTO_CONTENT;
          weight = 1 - t * t * (3 - 2 * t);
        }

        if (weight <= 0.01) return;

        const baseAlpha = weight * 0.60;
        const dotRadius = baseRadius + weight * (maxRadius - baseRadius);

        // Mouse push
        const dx = mouseRef.current.x - p.originX;
        const dy = mouseRef.current.y - p.originY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let targetX = p.originX, targetY = p.originY;
        let iRadius = dotRadius, iAlpha = baseAlpha;

        if (dist < interactionRadius) {
          const force = (interactionRadius - dist) / interactionRadius;
          const angle = Math.atan2(dy, dx);
          targetX = p.originX - Math.cos(angle) * force * pushForce;
          targetY = p.originY - Math.sin(angle) * force * pushForce;
          iRadius = dotRadius + force * 2.5;
          iAlpha = Math.min(0.85, baseAlpha + force * 0.35);
        }

        p.x += (targetX - p.x) * 0.12;
        p.y += (targetY - p.y) * 0.12;

        ctx.globalAlpha = iAlpha;
        ctx.fillStyle = '#1A3A8C';
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.4, iRadius), 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1;

      // Tool icons — only when gutters exist (viewport > MAX_CONTENT_W)
      if (contentLeft > 20) {
        TOOL_DEFS.forEach((tool) => {
          const cy = canvas.height * tool.yFrac;
          const cx = tool.side === 'left'
            ? Math.max(tool.size * 0.6, contentLeft - tool.xOff)
            : Math.min(canvas.width - tool.size * 0.6, contentRight + tool.xOff);
          tool.draw(ctx, cx, cy, tool.size, tool.alpha);
        });
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 w-full h-full z-0 hidden lg:block" style={{ background: 'transparent' }}
    />
  );
}