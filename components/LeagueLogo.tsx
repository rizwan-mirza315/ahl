export default function LeagueLogo({ size = 44 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={Math.round(size * 1.18)}
      viewBox="0 0 88 104"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="AHL Logo"
    >
      {/* Shield outline */}
      <path
        d="M44 2 L84 14 L84 52 C84 76 64 96 44 102 C24 96 4 76 4 52 L4 14 Z"
        fill="#c8102e"
        stroke="#ffffff"
        strokeWidth="2"
      />
      {/* Inner shield highlight */}
      <path
        d="M44 10 L78 20 L78 52 C78 72 62 90 44 95 C26 90 10 72 10 52 L10 20 Z"
        fill="#a50d26"
      />
      {/* AHL text */}
      <text
        x="44"
        y="66"
        textAnchor="middle"
        fill="#ffffff"
        fontSize="30"
        fontWeight="900"
        fontFamily="Arial, Helvetica, sans-serif"
        letterSpacing="-1"
      >
        AHL
      </text>
      {/* Puck accent at bottom of shield */}
      <ellipse cx="44" cy="88" rx="10" ry="4" fill="#ffffff" opacity="0.15" />
    </svg>
  );
}
