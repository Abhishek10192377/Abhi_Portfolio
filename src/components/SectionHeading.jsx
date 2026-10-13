import Reveal from "./Reveal";

function SectionHeading({ index, label, title, description }) {
  return (
    <Reveal className="mb-12 max-w-2xl">
      <p className="hud-label flex items-center gap-3">
        <span className="text-stark-red">{index}</span>
        <span className="h-px w-10 bg-gradient-to-r from-stark-red to-stark-gold" />
        {label}
      </p>
      <h2 className="mt-4 font-display text-3xl font-bold uppercase tracking-wide text-white sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-lg text-stark-muted">{description}</p>
      )}
    </Reveal>
  );
}

export default SectionHeading;
