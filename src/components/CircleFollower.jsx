import { useEffect, useRef } from 'react';

// Soft light that trails the pointer. Desktop only, never intercepts events.
const CursorLight = () => {
  const lightRef = useRef(null);

  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!finePointer.matches || reducedMotion.matches) return;

    const light = lightRef.current;
    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 3 };
    const target = { ...pos };
    let rafId = 0;

    const animate = () => {
      pos.x += (target.x - pos.x) * 0.12;
      pos.y += (target.y - pos.y) * 0.12;
      light.style.transform = `translate3d(${pos.x - 260}px, ${pos.y - 260}px, 0)`;

      const settled = Math.abs(target.x - pos.x) < 0.5 && Math.abs(target.y - pos.y) < 0.5;
      rafId = settled ? 0 : requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      target.x = e.clientX;
      target.y = e.clientY;
      light.style.opacity = '1';
      if (!rafId) rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={lightRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-0 h-[520px] w-[520px] rounded-full opacity-0 mix-blend-screen transition-opacity duration-700 will-change-transform"
      style={{
        background:
          'radial-gradient(circle, rgba(225, 29, 46, 0.11) 0%, rgba(212, 164, 55, 0.05) 38%, transparent 68%)',
      }}
    />
  );
};

export default CursorLight;
