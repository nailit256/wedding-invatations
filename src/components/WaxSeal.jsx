export default function WaxSeal({ size = 80 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Outer wax circle */}
      <circle cx="50" cy="50" r="46" fill="#8b1a2f" stroke="var(--color-gold)" strokeWidth="2" />

      {/* Inner decorative ring */}
      <circle cx="50" cy="50" r="40" fill="none" stroke="var(--color-gold)" strokeWidth="0.8" opacity="0.6" />
      <circle cx="50" cy="50" r="36" fill="none" stroke="var(--color-gold)" strokeWidth="0.5" opacity="0.4" />

      {/* Star/burst points around seal */}
      {Array.from({ length: 16 }, (_, i) => {
        const angle = (i * 360) / 16
        const rad = (angle * Math.PI) / 180
        const x1 = 50 + 40 * Math.cos(rad)
        const y1 = 50 + 40 * Math.sin(rad)
        const x2 = 50 + 44 * Math.cos(rad)
        const y2 = 50 + 44 * Math.sin(rad)
        return (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="var(--color-gold)" strokeWidth="1.2" opacity="0.7" />
        )
      })}

      {/* Crescent moon */}
      <path
        d="M50 22 A18 18 0 1 1 32 50 A12 12 0 1 0 50 22 Z"
        fill="var(--color-gold)"
        opacity="0.9"
      />

      {/* M & F monogram */}
      <text
        x="50"
        y="76"
        textAnchor="middle"
        fontFamily="Cormorant Garamond, serif"
        fontSize="13"
        fontWeight="600"
        fill="var(--color-gold)"
        letterSpacing="3"
      >
        M &amp; F
      </text>
    </svg>
  )
}
