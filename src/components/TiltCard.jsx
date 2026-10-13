import { useRef } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate, useReducedMotion } from "framer-motion";

const MAX_TILT = 6;
const spring = { stiffness: 220, damping: 22, mass: 0.6 };

// Card that leans toward the pointer and shows a moving highlight.
// Mouse-only: touch and reduced-motion users get a static card.
function TiltCard({ children, className = "" }) {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const rotateX = useSpring(useMotionValue(0), spring);
  const rotateY = useSpring(useMotionValue(0), spring);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(0);
  const glareOpacity = useSpring(useMotionValue(0), spring);
  const glare = useMotionTemplate`radial-gradient(22rem circle at ${glareX}% ${glareY}%, rgba(245, 207, 107, 0.14), transparent 60%)`;

  const handlePointerMove = (e) => {
    if (reduceMotion || e.pointerType !== "mouse") return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rotateX.set((0.5 - py) * 2 * MAX_TILT);
    rotateY.set((px - 0.5) * 2 * MAX_TILT);
    glareX.set(px * 100);
    glareY.set(py * 100);
    glareOpacity.set(1);
  };

  const handlePointerLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    glareOpacity.set(0);
  };

  return (
    <div className="h-full [perspective:1200px]">
      <motion.article
        ref={ref}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        style={{ rotateX, rotateY }}
        className={`relative h-full ${className}`}
      >
        {children}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1] rounded-[inherit]"
          style={{ background: glare, opacity: glareOpacity }}
        />
      </motion.article>
    </div>
  );
}

export default TiltCard;
