import { profile } from "../data/profile";

function Footer() {
  return (
    <footer className="border-t border-stark-gold/15 px-5 py-8 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 text-sm text-stark-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          &copy; {new Date().getFullYear()} {profile.name}. Built with React
          and Tailwind CSS.
        </p>
        <p className="sm:text-right">
          Fan-inspired theme, not affiliated with Marvel. Helmet icon by{" "}
          <a
            href="https://icons8.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-stark-silver underline underline-offset-4 hover:text-stark-amber"
          >
            Icons8
          </a>
          .
        </p>
      </div>
    </footer>
  );
}

export default Footer;
