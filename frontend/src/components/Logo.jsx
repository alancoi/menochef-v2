export default function Logo({ size = 100 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="leafGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8FAF9D" stopOpacity="1" />
          <stop offset="100%" stopColor="#6F8F7A" stopOpacity="1" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Círculo externo con gradiente */}
      <circle cx="50" cy="50" r="48" stroke="url(#leafGradient)" strokeWidth="2.5" opacity="0.4" />
      <circle cx="50" cy="50" r="46" stroke="url(#leafGradient)" strokeWidth="1" opacity="0.2" />

      {/* Perfil de mujer */}
      <path
        d="M 32 28 Q 38 20 48 20 Q 55 20 56 28 Q 56 36 52 40"
        stroke="#6F8F7A"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#glow)"
      />

      {/* Hojas decorativas premium */}
      <g filter="url(#glow)">
        {/* Hoja izquierda */}
        <ellipse
          cx="40"
          cy="50"
          rx="6"
          ry="14"
          fill="#8FAF9D"
          opacity="0.8"
          transform="rotate(-35 40 50)"
        />

        {/* Hoja central principal */}
        <ellipse
          cx="50"
          cy="52"
          rx="7"
          ry="18"
          fill="url(#leafGradient)"
          opacity="0.9"
          transform="rotate(0 50 52)"
        />

        {/* Hoja derecha */}
        <ellipse
          cx="62"
          cy="48"
          rx="6"
          ry="15"
          fill="#A8C3B5"
          opacity="0.7"
          transform="rotate(40 62 48)"
        />
      </g>

      {/* Brillo decorativo */}
      <circle cx="55" cy="35" r="2.5" fill="#D4A574" opacity="0.6" />
      <circle cx="45" cy="70" r="1.8" fill="#8FAF9D" opacity="0.4" />
    </svg>
  );
}
