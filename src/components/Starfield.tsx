import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  r: number;
  base: number;
  phase: number;
  speed: number;
}

/** Nền trường sao 2D nhẹ trên canvas, đặt cố định sau toàn bộ nội dung. */
export default function Starfield({ density = 0.00014 }: { density?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const context = el.getContext('2d');
    if (!context) return;

    // Alias kiểu non-null để dùng an toàn trong các closure.
    const cv: HTMLCanvasElement = el;
    const g: CanvasRenderingContext2D = context;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let stars: Star[] = [];
    let raf = 0;
    let w = 0;
    let h = 0;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      cv.width = w * dpr;
      cv.height = h * dpr;
      cv.style.width = w + 'px';
      cv.style.height = h + 'px';
      g.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.round(w * h * density);
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.2 + 0.3,
        base: Math.random() * 0.4 + 0.15,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.6 + 0.2,
      }));
    };

    const draw = (t: number) => {
      g.clearRect(0, 0, w, h);
      for (const s of stars) {
        const tw = reduce
          ? s.base
          : s.base + 0.5 * (0.5 + 0.5 * Math.sin(t * 0.001 * s.speed + s.phase));
        const a = Math.max(0, Math.min(1, tw));
        g.beginPath();
        g.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        g.fillStyle = s.r > 1.1 ? `rgba(244, 221, 168, ${a})` : `rgba(220, 226, 240, ${a})`;
        g.fill();
      }
      if (!reduce) raf = requestAnimationFrame(draw);
    };

    resize();
    if (reduce) draw(0);
    else raf = requestAnimationFrame(draw);

    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [density]);

  return <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 -z-10" />;
}
