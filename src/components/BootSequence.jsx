import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ArcReactor from "./ArcReactor";
import { profile } from "../data/profile";

const BOOT_KEY = "portfolio-boot-seen";
const STEP_MS = 380;

const lines = [
  "Initializing interface",
  `Loading profile: ${profile.name}`,
  "Mounting modules: skills / projects / experience",
  "All systems online",
];

// Shown once per browser session, and never for reduced-motion users.
function shouldSkip() {
  try {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return true;
    return sessionStorage.getItem(BOOT_KEY) === "1";
  } catch {
    return false;
  }
}

function BootSequence({ onDone }) {
  const [visible, setVisible] = useState(() => !shouldSkip());
  const [step, setStep] = useState(1);

  useEffect(() => {
    if (!visible) {
      onDone();
      return;
    }
    if (step > lines.length) {
      try {
        sessionStorage.setItem(BOOT_KEY, "1");
      } catch {
        // Storage unavailable (private mode); the intro simply replays next visit.
      }
      setVisible(false);
      return;
    }
    const timer = setTimeout(() => setStep((s) => s + 1), STEP_MS);
    return () => clearTimeout(timer);
  }, [visible, step, onDone]);

  const skip = () => setStep(lines.length + 1);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="boot"
          role="status"
          aria-live="polite"
          aria-label="Loading portfolio"
          onClick={skip}
          className="fixed inset-0 z-[100] flex cursor-pointer bg-stark-void flex-col items-center justify-center gap-8 px-6"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ArcReactor className="h-36 w-36 sm:h-44 sm:w-44" />

          <div className="w-full max-w-sm font-mono text-sm">
            <ul className="min-h-[7rem] space-y-1.5">
              {lines.slice(0, step).map((line, i) => (
                <li key={line} className="flex gap-2 text-stark-silver">
                  <span className="text-stark-red">&gt;</span>
                  <span className={i === lines.length - 1 ? "text-stark-cyan" : ""}>
                    {line}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-4 h-1 overflow-hidden rounded-full bg-stark-steel">
              <div
                className="h-full rounded-full bg-gradient-to-r from-stark-red via-stark-gold to-stark-amber transition-[width] duration-300 ease-out"
                style={{ width: `${Math.min(step / lines.length, 1) * 100}%` }}
              />
            </div>
          </div>

          <button
            type="button"
            onClick={skip}
            className="hud-label transition-colors hover:text-white"
          >
            Skip intro
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default BootSequence;
