import { useId } from "react";

// Original SVG arc reactor. Purely decorative, animated from index.css.
function ArcReactor({ className = "" }) {
  const id = useId();
  const core = `${id}-core`;
  const halo = `${id}-halo`;
  const metal = `${id}-metal`;

  return (
    <svg
      viewBox="0 0 200 200"
      className={`arc-reactor ${className}`}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id={core}>
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.4" stopColor="#c9f6ff" />
          <stop offset="0.75" stopColor="#5ee6ff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#5ee6ff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={halo}>
          <stop offset="0" stopColor="#5ee6ff" stopOpacity="0.3" />
          <stop offset="0.55" stopColor="#e11d2e" stopOpacity="0.1" />
          <stop offset="1" stopColor="#e11d2e" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={metal} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#e8c261" />
          <stop offset="0.5" stopColor="#b88a2a" />
          <stop offset="1" stopColor="#5f460e" />
        </linearGradient>
      </defs>

      <circle cx="100" cy="100" r="100" fill={`url(#${halo})`} />

      {/* Outer tick ring with red arc highlights */}
      <g className="arc-spin-slow" fill="none">
        <circle cx="100" cy="100" r="96" stroke="#d4a437" strokeOpacity="0.5" strokeWidth="0.75" />
        <circle cx="100" cy="100" r="96" stroke="#e11d2e" strokeWidth="2" strokeDasharray="60 241.6" strokeLinecap="round" />
        <circle cx="100" cy="100" r="90" stroke="#d4a437" strokeOpacity="0.55" strokeWidth="5" strokeDasharray="1 8.425" />
      </g>

      {/* Ten-segment coil ring */}
      <g className="arc-spin-reverse" fill="none">
        <circle cx="100" cy="100" r="66" stroke="#12151c" strokeWidth="18" />
        <circle cx="100" cy="100" r="66" stroke={`url(#${metal})`} strokeWidth="13" strokeOpacity="0.9" strokeDasharray="31.469 10" />
        <circle cx="100" cy="100" r="76" stroke="#5ee6ff" strokeOpacity="0.55" strokeWidth="0.75" />
        <circle cx="100" cy="100" r="56" stroke="#5ee6ff" strokeOpacity="0.7" strokeWidth="1" />
      </g>

      <g className="arc-spin-mid" fill="none">
        <circle cx="100" cy="100" r="44" stroke="#5ee6ff" strokeWidth="1.5" strokeDasharray="46.08 23.035" strokeLinecap="round" />
      </g>

      <circle cx="100" cy="100" r="36" fill="none" stroke="#5ee6ff" strokeOpacity="0.35" strokeWidth="0.75" />
      <circle className="arc-core" cx="100" cy="100" r="32" fill={`url(#${core})`} />
      <circle cx="100" cy="100" r="11" fill="#ffffff" fillOpacity="0.92" />
    </svg>
  );
}

export default ArcReactor;
