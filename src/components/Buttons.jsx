import { FaFolderOpen, FaFileAlt, FaPaperPlane } from "react-icons/fa"; // Import Icons
import { profile } from "../data/profile";

export default function Buttons() {
  return (
    <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center">
      {/* View Projects Button */}
      <a href="#projects" className="btn-stark btn-stark-primary">
        <FaFolderOpen aria-hidden="true" className="text-base" />
        View Projects
      </a>

      {/* Resume Button */}
      <a
        href={profile.resume}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-stark btn-stark-gold"
      >
        <FaFileAlt aria-hidden="true" className="text-base" />
        Download Resume
      </a>

      {/* Contact Button */}
      <a href="#contact" className="btn-stark btn-stark-ghost">
        <FaPaperPlane aria-hidden="true" className="text-base" />
        Contact Me
      </a>
    </div>
  );
}
