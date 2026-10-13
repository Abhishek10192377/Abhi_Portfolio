import { BsBriefcase } from "react-icons/bs";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

const experiences = [
  {
    title: "Assistant Software Developer",
    company: "Lovely Professional University (LPU)",
    period: "Jul 2025 - Present",
    description:
      "Working on the Student UMS system using Next.js, React.js, TypeScript, and Material UI. Developing reusable UI components, tables, forms, dialogs, and integrating REST APIs.",
    current: true,
  },
  {
    title: "Web Developer Intern",
    company: "Ansh Infotech",
    period: "Jan 2025 - Jun 2025",
    description:
      "Worked on web development using the MERN stack. Assisted with student projects, implemented features, fixed bugs, and gained hands-on experience with React.js, Node.js, Express.js, and MongoDB.",
  },
];

function Experience() {
  return (
    <section id="experience" className="scroll-mt-16 px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="04"
          label="Service record"
          title="Experience"
        />

        <div className="relative max-w-4xl">
          {/* Circuit trace */}
          <div
            aria-hidden="true"
            className="absolute bottom-2 left-[0.6875rem] top-2 w-px overflow-hidden bg-gradient-to-b from-stark-red via-stark-gold/60 to-stark-gold/10"
          >
            <div className="trace-flow h-24 w-full" />
          </div>

          <ol>
          {experiences.map((exp, index) => (
            <Reveal
              as="li"
              key={exp.title}
              delay={index * 0.12}
              className="relative pb-10 pl-12 last:pb-0 sm:pl-16"
            >
              {/* Timeline node */}
              <span
                aria-hidden="true"
                className={`absolute left-0 top-6 grid h-6 w-6 place-items-center rounded-full border-2 bg-stark-void ${
                  exp.current ? "border-stark-red shadow-glow-red" : "border-stark-gold"
                }`}
              >
                <span
                  className={`h-2 w-2 rounded-full ${
                    exp.current ? "bg-stark-red" : "bg-stark-gold"
                  }`}
                />
              </span>
              <span
                aria-hidden="true"
                className="absolute left-6 top-[2.2rem] h-px w-6 bg-stark-gold/50 sm:w-10"
              />

              <div className="hud-panel p-6 transition-colors duration-300 hover:border-stark-gold/40">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  <span className="font-mono text-xs uppercase tracking-[0.18em] text-stark-amber">
                    {exp.period}
                  </span>
                  {exp.current && (
                    <span className="flex items-center gap-2 rounded-full border border-stark-red/50 px-2.5 py-0.5 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-white">
                      <span className="h-1.5 w-1.5 rounded-full bg-stark-red" />
                      Current
                    </span>
                  )}
                </div>

                <h3 className="mt-3 flex items-center gap-3 font-display text-base font-bold uppercase tracking-wide text-white sm:text-lg">
                  <BsBriefcase aria-hidden="true" className="h-5 w-5 shrink-0 text-stark-red" />
                  {exp.title}
                </h3>

                <p className="mt-1 font-semibold text-stark-cyan">
                  {exp.company}
                </p>

                <p className="mt-3 leading-relaxed text-stark-silver">
                  {exp.description}
                </p>
              </div>
            </Reveal>
          ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

export default Experience;
