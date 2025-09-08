import React, { useEffect, useRef } from "react";

export default function Stardust({
  intensity = 60,
  color = "255, 200, 255",
}: {
  intensity?: number;
  color?: string;
}) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let w = 0;
    let h = 0;
    const particles: {
      x: number;
      y: number;
      r: number;
      vx: number;
      vy: number;
      a: number;
    }[] = [];

    const resize = () => {
      w = canvas.width = canvas.clientWidth * devicePixelRatio;
      h = canvas.height = canvas.clientHeight * devicePixelRatio;
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    };

    const spawn = (n = intensity) => {
      particles.length = 0;
      for (let i = 0; i < n; i++) {
        particles.push({
          x: Math.random() * canvas.clientWidth,
          y: Math.random() * canvas.clientHeight,
          r: Math.random() * 2 + 0.5,
          vx: (Math.random() - 0.5) * 0.4,
          vy: -Math.random() * 0.3 - 0.05,
          a: Math.random() * 0.8 + 0.2,
        });
      }
    };

    let raf = 0;
    const loop = () => {
      ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -10) p.y = canvas.clientHeight + 10;
        if (p.x < -10) p.x = canvas.clientWidth + 10;
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 8);
        g.addColorStop(0, `rgba(${color},${p.a})`);
        g.addColorStop(1, `rgba(${color},0)`);
        ctx.fillStyle = g as unknown as string;
        ctx.fillRect(p.x - p.r * 8, p.y - p.r * 8, p.r * 16, p.r * 16);
      });
      raf = requestAnimationFrame(loop);
    };

    resize();
    spawn();
    raf = requestAnimationFrame(loop);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [intensity, color]);

  return (
    <canvas
      ref={ref}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-80"
    />
  );
}
