import {
  FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaJsSquare,
  FaGit, FaGithub, FaServer, FaMicrosoft, FaDatabase
} from "react-icons/fa";
import {
  SiMongodb, SiTailwindcss, SiBootstrap,
  SiExpress, SiTypescript, SiNextdotjs, SiDotnet, SiMui
} from "react-icons/si";
import { IoIosColorPalette } from "react-icons/io";
import { TbApi } from "react-icons/tb";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

const skillGroups = [
  {
    category: "Frontend",
    code: "FE",
    skills: [
      { name: "React Js", icon: FaReact, color: "#61dafb" },
      { name: "Next Js", icon: SiNextdotjs, color: "#ffffff" },
      { name: "TypeScript", icon: SiTypescript, color: "#4f9cf0" },
      { name: "JavaScript", icon: FaJsSquare, color: "#f7df1e" },
      { name: "HTML", icon: FaHtml5, color: "#f16529" },
      { name: "CSS", icon: FaCss3Alt, color: "#4aa8f0" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#38bdf8" },
      { name: "Material UI", icon: SiMui, color: "#3d9bff" },
      { name: "Bootstrap", icon: SiBootstrap, color: "#a078f0" },
    ],
  },
  {
    category: "Backend",
    code: "BE",
    skills: [
      { name: "Node.js", icon: FaNodeJs, color: "#7cc35a" },
      { name: "Express.js", icon: SiExpress, color: "#c9ced8" },
      { name: "REST APIs", icon: TbApi, color: "#5ee6ff" },
      { name: "C#", icon: SiDotnet, color: "#9b7bf0" },
    ],
  },
  {
    category: "Database",
    code: "DB",
    skills: [
      { name: "MongoDB", icon: SiMongodb, color: "#4db33d" },
      { name: "SSMS", icon: FaDatabase, color: "#f0605a" },
    ],
  },
  {
    category: "Tools & Other",
    code: "OPS",
    skills: [
      { name: "Git", icon: FaGit, color: "#f1502f" },
      { name: "GitHub", icon: FaGithub, color: "#ffffff" },
      { name: "TFS", icon: FaMicrosoft, color: "#4f9cf0" },
      { name: "Server Deployment", icon: FaServer, color: "#c9ced8" },
      { name: "Color Theory", icon: IoIosColorPalette, color: "#f06fa8" },
    ],
  },
];

function Skills() {
  return (
    <section id="skills" className="scroll-mt-16 px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="02"
          label="Technology HUD"
          title="Skills"
          description="The tools I build with, grouped by where they sit in the stack."
        />

        <div className="grid gap-6 lg:grid-cols-2">
          {skillGroups.map((group, groupIndex) => (
            <Reveal
              key={group.category}
              delay={groupIndex * 0.08}
              className={groupIndex === 0 ? "lg:col-span-2" : ""}
            >
              <div className="hud-panel h-full p-6 sm:p-7">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="font-display text-sm font-bold uppercase tracking-[0.2em] text-white">
                    {group.category}
                  </h3>
                  <span className="font-mono text-xs text-stark-muted">
                    {group.code} / {String(group.skills.length).padStart(2, "0")}
                  </span>
                </div>

                <ul
                  className={`grid grid-cols-2 gap-3 sm:grid-cols-3 ${
                    groupIndex === 0 ? "lg:grid-cols-5" : ""
                  }`}
                >
                  {group.skills.map((skill) => (
                    <li
                      key={skill.name}
                      className="group flex items-center gap-3 rounded-lg border border-stark-silver/10 bg-stark-void/50 px-3.5 py-3 transition duration-300 hover:-translate-y-0.5 hover:border-stark-gold/60 hover:shadow-glow-gold"
                    >
                      <skill.icon
                        aria-hidden="true"
                        className="h-7 w-7 shrink-0 transition-transform duration-300 group-hover:scale-110"
                        style={{ color: skill.color }}
                      />
                      <span className="font-semibold leading-tight text-stark-silver transition-colors group-hover:text-white">
                        {skill.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
