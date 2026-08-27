export default function SiteLogo({ className = "w-full h-auto", ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 800 250"
      className={className}
      {...props}
    >
      <title>site-logo</title>

      {/* Icon Group */}
      <g transform="translate(60, 50) scale(0.6)">
        {/* Shield Base */}
        <path
          d="M 80 10 L 160 40 L 160 160 C 160 210 80 260 80 260 C 80 260 0 210 0 160 L 0 40 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="14"
          strokeLinejoin="round"
        />

        {/* Abstract inner silhouette */}
        <path
          d="M 25 150 C 25 110 50 90 80 90 C 110 90 135 110 135 150"
          fill="none"
          stroke="currentColor"
          strokeWidth="10"
          strokeLinecap="round"
        />

        {/* Checkmark */}
        <path
          d="M -20 120 L 60 190 L 220 -10"
          fill="none"
          stroke="currentColor"
          strokeWidth="22"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Sparkles */}
        <g fill="currentColor">
          <path d="M 180 -30 L 185 -10 L 205 -5 L 185 0 L 180 20 L 175 0 L 155 -5 L 175 -10 Z" />
          <path d="M 230 10 L 233 20 L 243 23 L 233 26 L 230 36 L 227 26 L 217 23 L 227 20 Z" />
          <path
            d="M 200 -40 L 204 -25 L 219 -21 L 204 -17 L 200 -2 L 196 -17 L 181 -21 L 196 -25 Z"
            transform="scale(0.8) translate(50, -30)"
          />
        </g>
      </g>

      {/* Text Group */}
      <g transform="translate(200, 110)">
        <text
          x="0"
          y="50"
          fontFamily="'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
          fontSize="85"
          fontWeight="600"
          fill="currentColor"
          letterSpacing="10"
        >
          vettKazi
        </text>
      </g>
    </svg>
  );
}