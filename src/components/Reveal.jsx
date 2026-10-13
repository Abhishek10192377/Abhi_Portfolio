import { motion } from "framer-motion";

// Scroll-reveal wrapper. MotionConfig in App.jsx drops the movement for
// users who prefer reduced motion.
function Reveal({ children, delay = 0, y = 28, className = "", as = "div" }) {
  const Tag = motion[as];

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  );
}

export default Reveal;
