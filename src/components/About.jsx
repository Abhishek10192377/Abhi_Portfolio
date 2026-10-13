import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { profile } from "../data/profile";

const traits = [
  { title: "Full Stack Web Developer", detail: "Building across the MERN stack and Next.js" },
  { title: "React Enthusiast", detail: "Crafting sleek & user-friendly UIs" },
  { title: "Problem Solver", detail: "Turning ideas into working products" },
  { title: "Continuous Learner", detail: "Always exploring new tech" },
  { title: "Team Player", detail: "Love collaborating & mentoring" },
];

const profileRows = [
  { label: "Designation", value: profile.role },
  { label: "Organisation", value: profile.company },
  { label: "Focus", value: "Full stack web development" },
  { label: "Daily stack", value: "Next.js, React.js, TypeScript, Material UI" },
  { label: "Backend", value: "Node.js, Express.js, MongoDB" },
  { label: "Coding since", value: "2022" },
];

function About() {
  return (
    <section id="about" className="scroll-mt-16 px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="01" label="Profile" title="About Me" />

        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <Reveal>
            <p className="text-xl leading-relaxed text-white">
              Hi! I&apos;m a full stack developer with a passion for building web
              applications. I have experience working with modern technologies
              like React, Node.js, and various databases.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-stark-silver">
              Right now I work as an {profile.role} at {profile.company}, on the
              Student UMS system, developing reusable UI components, tables,
              forms and dialogs and integrating REST APIs. Before that I
              interned as a web developer at Ansh Infotech, working with the
              MERN stack.
            </p>
            <p className="mt-6 border-l-2 border-stark-gold/70 pl-4 font-mono text-sm uppercase tracking-wider text-stark-amber">
              Turning coffee into clean code since 2022
            </p>

            <ul className="mt-9 grid gap-3 sm:grid-cols-2">
              {traits.map((trait) => (
                <li
                  key={trait.title}
                  className="rounded-lg border border-stark-silver/10 bg-stark-charcoal/50 px-4 py-3 transition-colors duration-300 hover:border-stark-red/50"
                >
                  <p className="font-display text-xs font-bold uppercase tracking-[0.14em] text-white">
                    {trait.title}
                  </p>
                  <p className="mt-1 text-stark-muted">{trait.detail}</p>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="hud-panel overflow-hidden">
              <div className="flex items-center justify-between border-b border-stark-gold/15 px-6 py-4">
                <p className="hud-label text-stark-cyan">Technical profile</p>
                <span className="font-mono text-xs text-stark-muted">
                  ID / {profile.initials}-01
                </span>
              </div>
              <dl className="divide-y divide-stark-silver/10 px-6">
                {profileRows.map((row) => (
                  <div
                    key={row.label}
                    className="grid grid-cols-[7.5rem_1fr] gap-4 py-3.5 sm:grid-cols-[9rem_1fr]"
                  >
                    <dt className="font-mono text-xs uppercase tracking-wider text-stark-muted">
                      {row.label}
                    </dt>
                    <dd className="font-semibold text-white">{row.value}</dd>
                  </div>
                ))}
              </dl>
              <div className="border-t border-stark-gold/15 px-6 py-4">
                <a
                  href={`mailto:${profile.email}`}
                  className="break-all font-mono text-sm text-stark-amber underline-offset-4 hover:underline"
                >
                  {profile.email}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default About;
