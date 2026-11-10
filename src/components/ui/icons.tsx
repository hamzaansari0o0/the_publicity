import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

/** Shared attributes: 24px grid, 1.8 stroke, inherits the text colour. */
const BASE: IconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
  focusable: false,
};

export const ArrowRight = (p: IconProps) => (
  <svg {...BASE} {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const ArrowUpRight = (p: IconProps) => (
  <svg {...BASE} {...p}>
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

export const Mail = (p: IconProps) => (
  <svg {...BASE} {...p}>
    <rect x="3" y="5" width="18" height="14" rx="3" />
    <path d="m4 8 8 6 8-6" />
  </svg>
);

export const Phone = (p: IconProps) => (
  <svg {...BASE} {...p}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
  </svg>
);

export const MapPin = (p: IconProps) => (
  <svg {...BASE} {...p}>
    <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export const Clock = (p: IconProps) => (
  <svg {...BASE} {...p}>
    <circle cx="12" cy="12" r="9.5" />
    <path d="M12 6.5V12l3.5 2" />
  </svg>
);

export const Close = (p: IconProps) => (
  <svg {...BASE} {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const Check = (p: IconProps) => (
  <svg {...BASE} {...p}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
);

export const QrIcon = (p: IconProps) => (
  <svg {...BASE} {...p}>
    <rect x="3" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="3" width="7" height="7" rx="1.5" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" />
    <path d="M14 14h3v3h-3zM20 14v.01M14 20h.01M17 20h4M20 17v.01" />
  </svg>
);

export const ChartIcon = (p: IconProps) => (
  <svg {...BASE} {...p}>
    <path d="M4 20V11M10 20V4M16 20v-6M2 20.5h20" />
  </svg>
);

export const FlyerIcon = (p: IconProps) => (
  <svg {...BASE} {...p}>
    <rect x="5" y="3" width="14" height="18" rx="2" />
    <path d="M8 8h8M8 12h8M8 16h4" />
  </svg>
);

export const NewsIcon = (p: IconProps) => (
  <svg {...BASE} {...p}>
    <path d="M4 5h13a1 1 0 0 1 1 1v12a2 2 0 0 0 2 2H6a2 2 0 0 1-2-2V5ZM18 9h2v9a2 2 0 0 1-2 2" />
    <path d="M8 9h6M8 13h6M8 16h3" />
  </svg>
);

export const FlexIcon = (p: IconProps) => (
  <svg {...BASE} {...p}>
    <rect x="3" y="6" width="18" height="10" rx="1.5" />
    <path d="M6 6 4 2.5M18 6l2-3.5M8 21h8M12 16v5" />
  </svg>
);

export const StandeeIcon = (p: IconProps) => (
  <svg {...BASE} {...p}>
    <rect x="7" y="2" width="10" height="16" rx="1.5" />
    <path d="M5 22h14M9.5 18 8.5 22M14.5 18l1 4M10 7h4M10 11h4" />
  </svg>
);

export const Facebook = (p: IconProps) => (
  <svg {...BASE} {...p}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3Z" />
  </svg>
);

export const Instagram = (p: IconProps) => (
  <svg {...BASE} {...p}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <path d="M17.5 6.5v.01" strokeWidth={2.4} />
  </svg>
);

export const LinkedIn = (p: IconProps) => (
  <svg {...BASE} {...p}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6ZM2 9h4v12H2z" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export const WhatsApp = (p: IconProps) => (
  <svg {...BASE} {...p}>
    <path d="M3 21l1.65-4.8A9 9 0 1 1 8 19.4L3 21Z" />
    <path d="M9 10c0 3 2 5 5 5l1.2-1.2a.8.8 0 0 0-.1-1.2l-1.3-.8a.8.8 0 0 0-1 .1l-.4.4c-.9-.4-1.6-1.1-2-2l.4-.4a.8.8 0 0 0 .1-1l-.8-1.3a.8.8 0 0 0-1.2-.1L9 10Z" />
  </svg>
);

export const Coffee = (p: IconProps) => (
  <svg {...BASE} {...p}>
    <path d="M4 9h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V9ZM17 10h1.5a2.5 2.5 0 0 1 0 5H17M8 3v3M12 3v3" />
  </svg>
);

export const Home = (p: IconProps) => (
  <svg {...BASE} {...p}>
    <path d="M3 11 12 3l9 8M5 9.5V21h14V9.5M10 21v-6h4v6" />
  </svg>
);

export const Bag = (p: IconProps) => (
  <svg {...BASE} {...p}>
    <path d="M5 8h14l1 13H4L5 8ZM9 8V6a3 3 0 0 1 6 0v2" />
  </svg>
);

/** The orange 8-ray burst used in the hero headline. */
export function Spark(p: IconProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      {...p}
    >
      {Array.from({ length: 8 }, (_, i) => (
        <rect
          key={i}
          x="44"
          y="2"
          width="12"
          height="36"
          rx="6"
          transform={`rotate(${i * 45} 50 50)`}
        />
      ))}
    </svg>
  );
}

export const SocialIcons = {
  facebook: Facebook,
  instagram: Instagram,
  linkedin: LinkedIn,
  whatsapp: WhatsApp,
} as const;
