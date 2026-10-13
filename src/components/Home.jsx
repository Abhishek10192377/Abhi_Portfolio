import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Buttons from "./Buttons";
import ArcReactor from "./ArcReactor";
import { profile } from "../data/profile";

const skills = [
  "Software Developer",
  "React.js Developer",
  "Next.js Developer",
  "Frontend Developer",
  "Full Stack Developer",
];

const socials = [
  { icon: FaGithub, link: profile.github, label: "GitHub" },
  { icon: FaLinkedin, link: profile.linkedin, label: "LinkedIn" },
  { icon: FaInstagram, link: profile.instagram, label: "Instagram" },
  { icon: FaEnvelope, link: `mailto:${profile.email}`, label: "Email" },
  { icon: FaPhone, link: `tel:${profile.phone}`, label: "Phone" },
];

const hudReadouts = [
  {
    label: "Current role",
    value: profile.role,
    position: "-left-4 top-[3%] lg:-left-10",
    delay: 0.9,
  },
  {
    label: "Core stack",
    value: "Next.js / React / TypeScript",
    position: "-right-4 bottom-[14%] lg:-right-8",
    delay: 1.1,
  },
  {
    label: "Writing code since",
    value: "2022",
    position: "-left-2 bottom-[1%]",
    delay: 1.3,
  },
];

const particles = [
  { left: "12%", top: "70%", color: "#f5cf6b", delay: "0s" },
  { left: "28%", top: "88%", color: "#5ee6ff", delay: "2.5s" },
  { left: "64%", top: "92%", color: "#e11d2e", delay: "1.2s" },
  { left: "82%", top: "74%", color: "#f5cf6b", delay: "4s" },
  { left: "90%", top: "50%", color: "#5ee6ff", delay: "6s" },
  { left: "6%", top: "44%", color: "#e11d2e", delay: "5s" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

function Home({ ready = true }) {
  const reduceMotion = useReducedMotion();
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!ready || reduceMotion) return;

    const currentSkill = skills[index];
    const typed = !isDeleting && text === currentSkill;
    const cleared = isDeleting && text === "";
    const delay = typed ? 1600 : isDeleting ? 45 : 95; // Faster when deleting

    const timeout = setTimeout(() => {
      if (typed) {
        setIsDeleting(true);
      } else if (cleared) {
        setIsDeleting(false);
        setIndex((prevIndex) => (prevIndex + 1) % skills.length); // Go to next word
      } else {
        setText(currentSkill.slice(0, text.length + (isDeleting ? -1 : 1)));
      }
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, index, ready, reduceMotion]);

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center px-5 pb-16 pt-28 sm:px-8"
    >
      <motion.div
        className="mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]"
        variants={container}
        initial="hidden"
        animate={ready ? "show" : "hidden"}
      >
        {/* Left Column - Text Content */}
        <div className="space-y-7 text-center lg:text-left">
          <motion.p variants={item} className="hud-label flex items-center justify-center gap-3 lg:justify-start">
            <span className="status-dot h-1.5 w-1.5 rounded-full bg-stark-cyan" />
            Hello, I&apos;m
          </motion.p>

          <motion.h1
            variants={item}
            className="text-metal font-display text-4xl font-black uppercase leading-[1.05] tracking-wide sm:text-6xl xl:text-7xl"
          >
            {profile.name}
          </motion.h1>

          <motion.p
            variants={item}
            className="flex h-9 items-center justify-center font-display text-lg font-semibold uppercase tracking-[0.14em] text-stark-amber sm:text-2xl lg:justify-start"
          >
            <span className="mr-3 text-stark-red" aria-hidden="true">&gt;</span>
            {/* Screen readers get the stable title instead of every keystroke */}
            <span className="sr-only">{skills[0]}</span>
            <span aria-hidden="true">
              {reduceMotion ? skills[0] : text}
              <span className="animate-blink ml-0.5 text-stark-cyan">_</span>
            </span>
          </motion.p>

          <motion.p
            variants={item}
            className="mx-auto max-w-xl text-lg leading-relaxed text-stark-silver lg:mx-0"
          >
            Crafting digital experiences with modern web technologies.
            Specializing in full stack web development. Currently an{" "}
            <span className="text-white">{profile.role}</span> at Lovely
            Professional University, building the Student UMS with Next.js,
            React.js, TypeScript and Material UI.
          </motion.p>

          <motion.div variants={item} className="flex justify-center lg:justify-start">
            <Buttons />
          </motion.div>

          {/* Social Links */}
          <motion.ul variants={item} className="flex justify-center gap-3 lg:justify-start">
            {socials.map(({ icon: Icon, link, label }) => (
              <li key={label}>
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className="grid h-11 w-11 place-items-center rounded-md border border-stark-silver/15 bg-stark-charcoal/60 text-lg text-stark-silver transition duration-300 hover:-translate-y-1 hover:border-stark-gold/70 hover:text-stark-amber hover:shadow-glow-gold"
                >
                  <Icon aria-hidden="true" />
                </a>
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Right Column - Arc reactor and helmet HUD */}
        <motion.div
          variants={{
            hidden: { opacity: 0, scale: 0.86 },
            show: { opacity: 1, scale: 1, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } },
          }}
          className="relative mx-auto aspect-square w-full max-w-[19rem] sm:max-w-[26rem] lg:max-w-[30rem]"
        >
          <div
            aria-hidden="true"
            className="bg-circuit absolute -inset-6 opacity-40 [mask-image:radial-gradient(circle,#000_30%,transparent_68%)]"
          />
          <ArcReactor className="absolute inset-0 h-full w-full" />

          <div className="helmet-float absolute inset-[24%]">
            <img
              src="/assets/images/iron-man-helmet.png"
              alt="Iron Man helmet illustration"
              width="480"
              height="480"
              className="h-full w-full object-contain drop-shadow-[0_0_28px_rgba(225,29,46,0.55)]"
            />
            <div aria-hidden="true" className="helmet-sheen absolute inset-0" />
          </div>

          {particles.map((p) => (
            <span
              key={`${p.left}-${p.top}`}
              aria-hidden="true"
              className="hud-particle hidden sm:block"
              style={{
                left: p.left,
                top: p.top,
                background: p.color,
                boxShadow: `0 0 8px ${p.color}`,
                animationDelay: p.delay,
              }}
            />
          ))}

          {/* Floating readouts: real profile data, hidden on small screens */}
          {hudReadouts.map((readout) => (
            <motion.div
              key={readout.label}
              variants={{
                hidden: { opacity: 0, y: 12 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5, delay: readout.delay } },
              }}
              className={`hud-panel absolute hidden max-w-[13rem] px-4 py-3 sm:block ${readout.position}`}
            >
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-stark-cyan">
                {readout.label}
              </p>
              <p className="mt-1 text-sm font-semibold leading-snug text-white">
                {readout.value}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Home;
