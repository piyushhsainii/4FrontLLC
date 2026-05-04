"use client";
import { useEffect, useRef } from "react";

export const BackgroundPattern = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const mouseRef = useRef({ x: -2000, y: -2000 });

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;

        const resize = () => {
            const rect = container.getBoundingClientRect();
            canvas.width = rect.width;
            canvas.height = rect.height;
        };

        window.addEventListener("resize", resize);
        resize();

        const dots: {
            x: number;
            y: number;
            baseR: number;
            phase: number;
            originalX: number;
            originalY: number;
            seed: number;
            centerDistFactor: number;
        }[] = [];

        const spacing = 22;
        const rows = Math.ceil(canvas.height / spacing);
        const cols = Math.ceil(canvas.width / spacing);

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                const x = j * spacing;
                const y = i * spacing;

                const centerX = canvas.width / 2;
                const dx = Math.abs(x - centerX) / (canvas.width / 2);
                const factor = Math.pow(dx, 1.2);
                const probability = 0.15 + factor * 0.7;

                if (Math.random() < probability) {
                    dots.push({
                        x,
                        y,
                        originalX: x,
                        originalY: y,
                        baseR: 0.5 + factor * 3.5,
                        phase: Math.random() * Math.PI * 2,
                        seed: Math.random(),
                        centerDistFactor: factor,
                    });
                }
            }
        }

        const render = (time: number) => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const waveSpeed = 0.0006;
            const waveFrequency = 0.004;

            dots.forEach((dot) => {
                const wavePos =
                    (dot.originalX + dot.originalY * 0.3) * waveFrequency -
                    time * waveSpeed;
                const waveIntensity = Math.pow(Math.sin(wavePos) * 0.5 + 0.5, 6);
                const pulse = Math.sin(time / 2000 + dot.phase) * 0.1 + 0.9;

                const mdx = mouseRef.current.x - dot.x;
                const mdy = mouseRef.current.y - dot.y;
                const mouseDist = Math.sqrt(mdx * mdx + mdy * mdy);

                const interactionRadius = 150;
                let scale = 1;
                let targetX = dot.originalX;
                let targetY = dot.originalY;

                if (mouseDist < interactionRadius) {
                    const force = (interactionRadius - mouseDist) / interactionRadius;
                    scale = 1 + force * 2.5;
                    targetX -= mdx * force * 0.3;
                    targetY -= mdy * force * 0.3;
                }

                dot.x += (targetX - dot.x) * 0.1;
                dot.y += (targetY - dot.y) * 0.1;

                const finalSize = dot.baseR * pulse * scale;
                ctx.beginPath();
                ctx.arc(dot.x, dot.y, finalSize, 0, Math.PI * 2);

                const baseOpacity = 0.03 + dot.centerDistFactor * 0.15;
                const waveBoost = waveIntensity * (0.1 + dot.centerDistFactor * 0.2);
                const hoverBoost = (scale - 1) * 0.2;
                const finalOpacity = baseOpacity + waveBoost + hoverBoost;

                ctx.fillStyle = `rgba(45, 90, 76, ${finalOpacity})`;
                ctx.fill();

                if (
                    (waveIntensity > 0.85 || scale > 2.5) &&
                    dot.centerDistFactor > 0.4
                ) {
                    ctx.beginPath();
                    ctx.arc(dot.x, dot.y, finalSize * 0.35, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(
                        waveIntensity * 0.3,
                        (scale - 1) * 0.15
                    )})`;
                    ctx.fill();
                }
            });

            animationFrameId = requestAnimationFrame(render);
        };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            mouseRef.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            };
        };

        const handleMouseLeave = () => {
            mouseRef.current = { x: -2000, y: -2000 };
        };

        container.addEventListener("mousemove", handleMouseMove);
        container.addEventListener("mouseleave", handleMouseLeave);
        animationFrameId = requestAnimationFrame(render);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener("resize", resize);
            container.removeEventListener("mousemove", handleMouseMove);
            container.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="w-full max-w-[1400px] h-full relative pointer-events-auto cursor-default"
        >
            <canvas ref={canvasRef} className="block w-full h-full" />
        </div>
    );
};