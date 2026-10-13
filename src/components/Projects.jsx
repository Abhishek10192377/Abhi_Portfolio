import { useState } from 'react';
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import novelwebImage from "../assets/novelweb.webp";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import TiltCard from "./TiltCard";

const projects = [
  {
    id: 101,
    title: "NovelWeb",
    description:
      "A full-stack novel reading platform built with the MERN stack. Includes user authentication, novel management, Cloudinary image uploads, email functionality, and a separate admin dashboard for managing content.",
    image: novelwebImage,
    tech: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Cloudinary",
      "Nodemailer",
      "Bootstrap"
    ],
    category: "Full Stack",
    github: "https://github.com/Abhishek10192377/novelwebfrontend",
    live: "https://novelwebfrontend.onrender.com/",
  },

  {
    id: 102,
    title: "Email Management System",
    description:
      "A full-stack email management system for sending, receiving, organizing, and managing emails with a user-friendly interface and backend API integration.",
    // No screenshot yet: drop one in /public (e.g. email-management.webp) and
    // set its path here to replace the placeholder panel.
    image: "",
    tech: [
      "Next.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Material UI",
      "REST API"
    ],
    category: "Full Stack",
    github: "",
    live: "",
  },

];

const categories = ['All', ...new Set(projects.map(p => p.category))];

function ProjectPreview({ project }) {
  const [failed, setFailed] = useState(false);

  if (!project.image || failed) {
    return (
      <div className="relative flex h-full w-full flex-col items-center justify-center gap-2 bg-stark-night px-6 text-center">
        <div aria-hidden="true" className="bg-circuit absolute inset-0 opacity-20" />
        <span className="relative font-display text-lg font-bold uppercase tracking-[0.16em] text-white">
          {project.title}
        </span>
        <span className="hud-label relative">Preview not available</span>
      </div>
    );
  }

  return (
    <img
      src={project.image}
      alt={`Screenshot of ${project.title}`}
      width="1280"
      height="551"
      className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}

function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter(project => project.category === selectedCategory);

  return (
    <section id="projects" className="scroll-mt-16 px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="03"
          label="Build archive"
          title="Projects"
          description="Things I have designed, built and shipped."
        />

        <div className="mb-10 flex flex-wrap gap-2" role="group" aria-label="Filter projects by category">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              aria-pressed={selectedCategory === category}
              className={`rounded-md border px-4 py-2 font-display text-[0.7rem] font-semibold uppercase tracking-[0.16em] transition-colors duration-200 ${selectedCategory === category
                ? 'border-stark-red bg-stark-red/15 text-white'
                : 'border-stark-silver/15 text-stark-muted hover:border-stark-gold/50 hover:text-white'
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {filteredProjects.map((project, index) => (
            <Reveal key={project.title} delay={index * 0.1}>
              <TiltCard className="holo-border hud-panel group flex flex-col">
                <span aria-hidden="true" className="holo-ring" />
                <div className="relative aspect-[16/9] overflow-hidden rounded-t-2xl border-b border-stark-gold/15">
                  <ProjectPreview project={project} />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-stark-void/80 via-transparent to-transparent" />
                  <span className="absolute left-4 top-4 rounded border border-stark-cyan/40 bg-stark-void/80 px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-stark-cyan">
                    {project.category}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-xl font-bold uppercase tracking-wide text-white">
                    {project.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-stark-silver">
                    {project.description}
                  </p>

                  <ul className="mt-5 flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <li key={tech} className="tech-tag">
                        {tech}
                      </li>
                    ))}
                  </ul>

                  <div className="relative z-[3] mt-auto flex flex-wrap items-center gap-3 pt-7">
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-stark btn-stark-primary !px-4 !py-2.5"
                      >
                        <FaExternalLinkAlt aria-hidden="true" />
                        Live Demo
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-stark btn-stark-ghost !px-4 !py-2.5"
                      >
                        <FaGithub aria-hidden="true" className="text-base" />
                        Source Code
                      </a>
                    )}
                    {!project.live && !project.github && (
                      <span className="hud-label">No public links yet</span>
                    )}
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
