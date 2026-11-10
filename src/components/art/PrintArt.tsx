import { useId, type CSSProperties, type ReactElement } from "react";
import { cn } from "@/lib/cn";
import { QR_DECORATIVE } from "@/components/art/qr-data";
import type { ArtKind } from "@/components/art/types";

/**
 * Brand illustrations that stand in for stock photography: print mock-ups
 * (flyer, newsletter, flex, standee), a social post, a QR card and three
 * audience scenes. Pure SVG - no image files, scales to any container and
 * "covers" it like a background image. Swap any of them for real photos later.
 */

const HEAD: CSSProperties = {
  fontFamily: "var(--font-heading)",
  fontWeight: 800,
};
const BODY: CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontWeight: 600,
};

const BRAND = "#00A651";
const INK = "#262626";

/** White rounded card containing the (decorative) QR code. */
function QrCard({ x, y, size }: { x: number; y: number; size: number }) {
  const pad = size * 0.1;
  const scale = (size - pad * 2) / QR_DECORATIVE.size;
  return (
    <g>
      <rect x={x} y={y} width={size} height={size} rx={size * 0.1} fill="#fff" />
      <path
        d={QR_DECORATIVE.path}
        fill={INK}
        transform={`translate(${x + pad} ${y + pad}) scale(${scale})`}
      />
    </g>
  );
}

type ArtProps = { id: string };

function Flyer({ id }: ArtProps) {
  return (
    <>
      <defs>
        <linearGradient id={`${id}bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#19C46A" />
          <stop offset="1" stopColor="#006B35" />
        </linearGradient>
      </defs>
      <rect width="400" height="500" fill={`url(#${id}bg)`} />
      <circle cx="350" cy="60" r="150" fill="#fff" opacity=".1" />
      <circle cx="30" cy="480" r="130" fill={INK} opacity=".16" />
      <text x="34" y="80" style={HEAD} fontSize="20" letterSpacing="4" fill="#fff" opacity=".9">
        BEAN &amp; BREW
      </text>
      <text x="30" y="190" style={HEAD} fontSize="106" fill="#fff" textLength="250" lengthAdjust="spacingAndGlyphs">
        FREE
      </text>
      <text x="30" y="284" style={HEAD} fontSize="106" fill="#fff" textLength="340" lengthAdjust="spacingAndGlyphs">
        COFFEE
      </text>
      <text x="34" y="324" style={BODY} fontSize="18" fill="#fff" opacity=".92">
        On your first visit - scan to claim
      </text>
      <rect x="34" y="356" width="176" height="46" rx="23" fill={INK} />
      <text x="122" y="385" style={HEAD} fontSize="16" letterSpacing="1.5" fill="#fff" textAnchor="middle">
        ORDER ON WHATSAPP
      </text>
      <QrCard x={262} y={334} size={108} />
      <text x="316" y="462" style={BODY} fontSize="13" letterSpacing="2" fill="#fff" textAnchor="middle" opacity=".9">
        SCAN ME
      </text>
    </>
  );
}

function Newsletter({ id }: ArtProps) {
  return (
    <>
      <defs>
        <linearGradient id={`${id}bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1F2224" />
          <stop offset="1" stopColor="#0A8A4B" />
        </linearGradient>
        <linearGradient id={`${id}ph`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#5BD99A" />
          <stop offset="1" stopColor="#008744" />
        </linearGradient>
        <filter id={`${id}sh`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="14" stdDeviation="14" floodColor="#000" floodOpacity=".45" />
        </filter>
      </defs>
      <rect width="400" height="500" fill={`url(#${id}bg)`} />
      <circle cx="60" cy="440" r="140" fill="#fff" opacity=".06" />
      <g transform="rotate(-5 200 250)" filter={`url(#${id}sh)`}>
        <rect x="68" y="46" width="264" height="408" rx="10" fill="#fff" />
        <text x="88" y="92" style={HEAD} fontSize="32" fill={INK} textLength="224" lengthAdjust="spacingAndGlyphs">
          THE LOCAL TIMES
        </text>
        <rect x="88" y="102" width="224" height="3" fill={INK} />
        <text x="88" y="120" style={BODY} fontSize="9" fill="#667" textLength="224" lengthAdjust="spacing">
          ISSUE 01 - NEW LISTINGS - LOCAL NEWS
        </text>
        <rect x="88" y="134" width="224" height="112" rx="6" fill={`url(#${id}ph)`} />
        <circle cx="262" cy="172" r="22" fill="#fff" opacity=".4" />
        <path d="M88 246 150 188l50 40 42-30 70 48Z" fill={INK} opacity=".28" />
        <rect x="88" y="266" width="132" height="8" rx="4" fill={INK} opacity=".9" />
        <rect x="88" y="284" width="104" height="6" rx="3" fill={INK} opacity=".25" />
        <rect x="88" y="298" width="116" height="6" rx="3" fill={INK} opacity=".25" />
        <rect x="88" y="312" width="96" height="6" rx="3" fill={INK} opacity=".25" />
        <rect x="216" y="284" width="96" height="6" rx="3" fill={INK} opacity=".25" />
        <rect x="216" y="298" width="80" height="6" rx="3" fill={INK} opacity=".25" />
        <rect x="216" y="312" width="96" height="6" rx="3" fill={INK} opacity=".25" />
        <rect x="88" y="338" width="224" height="1.5" fill={INK} opacity=".15" />
        <rect x="88" y="356" width="120" height="6" rx="3" fill={INK} opacity=".25" />
        <rect x="88" y="370" width="104" height="6" rx="3" fill={INK} opacity=".25" />
        <rect x="88" y="384" width="112" height="6" rx="3" fill={INK} opacity=".25" />
        <QrCard x={238} y={352} size={74} />
        <text x="275" y="438" style={BODY} fontSize="8" letterSpacing="1.5" fill="#667" textAnchor="middle">
          SCAN TO READ MORE
        </text>
      </g>
    </>
  );
}

function Flex({ id }: ArtProps) {
  return (
    <>
      <defs>
        <linearGradient id={`${id}bg`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#262626" />
          <stop offset="1" stopColor="#0A7A43" />
        </linearGradient>
        <linearGradient id={`${id}bn`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#19C46A" />
          <stop offset="1" stopColor="#008744" />
        </linearGradient>
      </defs>
      <rect width="400" height="500" fill={`url(#${id}bg)`} />
      <ellipse cx="200" cy="448" rx="180" ry="26" fill="#000" opacity=".35" />
      <path d="M72 150 40 60M328 150 360 60" stroke="#fff" strokeOpacity=".4" strokeWidth="3" fill="none" />
      <rect x="52" y="140" width="296" height="214" rx="10" fill={`url(#${id}bn)`} />
      {[
        [68, 156],
        [332, 156],
        [68, 338],
        [332, 338],
      ].map(([cx, cy]) => (
        <g key={`${cx}-${cy}`}>
          <circle cx={cx} cy={cy} r="7" fill="#fff" opacity=".9" />
          <circle cx={cx} cy={cy} r="3" fill={INK} opacity=".6" />
        </g>
      ))}
      <text x="200" y="244" style={HEAD} fontSize="80" fill="#fff" textAnchor="middle" textLength="236" lengthAdjust="spacingAndGlyphs">
        MEGA SALE
      </text>
      <text x="200" y="274" style={BODY} fontSize="14" letterSpacing="5" fill="#fff" textAnchor="middle" opacity=".92">
        THIS WEEKEND ONLY
      </text>
      <rect x="76" y="296" width="166" height="38" rx="19" fill={INK} />
      <text x="159" y="321" style={HEAD} fontSize="15" letterSpacing="1.5" fill="#fff" textAnchor="middle">
        SCAN FOR OFFERS
      </text>
      <QrCard x={260} y={282} size={62} />
    </>
  );
}

function Standee({ id }: ArtProps) {
  return (
    <>
      <defs>
        <radialGradient id={`${id}bg`} cx=".5" cy=".35" r=".85">
          <stop offset="0" stopColor="#1F7A4A" />
          <stop offset="1" stopColor="#1B1E20" />
        </radialGradient>
        <linearGradient id={`${id}ph`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#008744" />
          <stop offset="1" stopColor="#2D3134" />
        </linearGradient>
      </defs>
      <rect width="400" height="500" fill={`url(#${id}bg)`} />
      <ellipse cx="200" cy="452" rx="150" ry="20" fill="#000" opacity=".4" />
      <rect x="116" y="40" width="168" height="372" rx="10" fill="#fff" />
      <path d="M116 50a10 10 0 0 1 10-10h148a10 10 0 0 1 10 10v84H116Z" fill={BRAND} />
      <text x="200" y="88" style={HEAD} fontSize="38" fill="#fff" textAnchor="middle" textLength="110" lengthAdjust="spacingAndGlyphs">
        NEW
      </text>
      <text x="200" y="122" style={HEAD} fontSize="30" fill="#fff" textAnchor="middle" textLength="132" lengthAdjust="spacingAndGlyphs">
        ARRIVALS
      </text>
      <rect x="132" y="150" width="136" height="104" rx="6" fill={`url(#${id}ph)`} />
      <circle cx="236" cy="180" r="14" fill="#fff" opacity=".4" />
      <path d="M132 254 178 204l34 28 24-16 32 38Z" fill={INK} opacity=".25" />
      <rect x="132" y="268" width="92" height="7" rx="3.5" fill={INK} opacity=".85" />
      <rect x="132" y="284" width="136" height="5" rx="2.5" fill={INK} opacity=".22" />
      <QrCard x={156} y={306} size={88} />
      <path d="M92 412h216l-16 26H108Z" fill="#1B1E20" />
      <path d="M92 412h216" stroke="#fff" strokeOpacity=".25" strokeWidth="2" />
    </>
  );
}

function Social({ id }: ArtProps) {
  return (
    <>
      <defs>
        <linearGradient id={`${id}bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#006B35" />
          <stop offset=".55" stopColor="#00A651" />
          <stop offset="1" stopColor="#7ED9A8" />
        </linearGradient>
        <linearGradient id={`${id}ph`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2D3134" />
          <stop offset="1" stopColor="#008744" />
        </linearGradient>
        <filter id={`${id}sh`} x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="10" stdDeviation="10" floodColor="#000" floodOpacity=".35" />
        </filter>
      </defs>
      <rect width="400" height="500" fill={`url(#${id}bg)`} />
      <circle cx="330" cy="70" r="120" fill="#fff" opacity=".1" />
      <rect x="104" y="40" width="192" height="410" rx="32" fill="#05080D" stroke="#fff" strokeOpacity=".28" strokeWidth="3" filter={`url(#${id}sh)`} />
      <rect x="172" y="54" width="56" height="8" rx="4" fill="#1A232C" />
      <circle cx="134" cy="96" r="13" fill={BRAND} />
      <rect x="156" y="88" width="76" height="7" rx="3.5" fill="#fff" opacity=".85" />
      <rect x="156" y="101" width="48" height="5" rx="2.5" fill="#fff" opacity=".3" />
      <rect x="120" y="124" width="160" height="152" rx="12" fill={`url(#${id}ph)`} />
      <QrCard x={186} y={172} size={76} />
      <path d="M140 304c-4-7-14-3-10 5l10 9 10-9c4-8-6-12-10-5Z" fill={BRAND} />
      <circle cx="176" cy="308" r="8" fill="none" stroke="#fff" strokeWidth="2.5" opacity=".85" />
      <path d="M204 302l14 7-14 7Z" fill="#fff" opacity=".85" />
      {[0, 1, 2].map((i) => (
        <rect key={i} x={120 + i * 56} y="338" width="48" height="48" rx="8" fill={["#00A651", "#008744", "#2D3134"][i]} opacity=".85" />
      ))}
      <g filter={`url(#${id}sh)`}>
        <rect x="236" y="224" width="136" height="46" rx="23" fill="#fff" />
        <circle cx="262" cy="247" r="12" fill="#00A651" />
        <path d="M257 247l4 4 7-8" stroke="#fff" strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <text x="282" y="253" style={BODY} fontSize="15" fill={INK}>
          New lead!
        </text>
      </g>
    </>
  );
}

function Qr({ id }: ArtProps) {
  const card = 232;
  const pad = 22;
  const scale = (card - pad * 2) / QR_DECORATIVE.size;
  return (
    <>
      <defs>
        <linearGradient id={`${id}bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#262626" />
          <stop offset="1" stopColor="#0B6B3A" />
        </linearGradient>
        <filter id={`${id}glow`} x="-20%" y="-300%" width="140%" height="700%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>
      <rect width="400" height="500" fill={`url(#${id}bg)`} />
      <circle cx="70" cy="90" r="130" fill={BRAND} opacity=".18" />
      <rect x="84" y="112" width={card} height={card} rx="26" fill="#fff" />
      <path
        d={QR_DECORATIVE.path}
        fill={INK}
        transform={`translate(${84 + pad} ${112 + pad}) scale(${scale})`}
      />
      {[
        "M58 150V120a34 34 0 0 1 34-34h30",
        "M342 150V120a34 34 0 0 0-34-34h-30",
        "M58 308v30a34 34 0 0 0 34 34h30",
        "M342 308v30a34 34 0 0 1-34 34h-30",
      ].map((d) => (
        <path key={d} d={d} stroke={BRAND} strokeWidth="8" strokeLinecap="round" fill="none" />
      ))}
      <rect x="64" y="226" width="272" height="4" rx="2" fill={BRAND} filter={`url(#${id}glow)`} />
      <rect x="64" y="226" width="272" height="3" rx="1.5" fill={BRAND} />
      <text x="200" y="430" style={HEAD} fontSize="40" fill="#fff" textAnchor="middle" textLength="168" lengthAdjust="spacingAndGlyphs">
        SCAN ME
      </text>
      <text x="200" y="458" style={BODY} fontSize="14" fill="#fff" textAnchor="middle" opacity=".7">
        Every print. Every scan counted.
      </text>
    </>
  );
}

function Cafe({ id }: ArtProps) {
  return (
    <>
      <defs>
        <linearGradient id={`${id}bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#19C46A" />
          <stop offset="1" stopColor="#006B35" />
        </linearGradient>
      </defs>
      <rect width="400" height="500" fill={`url(#${id}bg)`} />
      <circle cx="330" cy="90" r="140" fill="#fff" opacity=".1" />
      <circle cx="50" cy="450" r="120" fill={INK} opacity=".14" />
      {/* illustration sits in the upper part so card captions stay clear */}
      <g transform="translate(0 -62)">
        <ellipse cx="196" cy="398" rx="150" ry="22" fill="#fff" opacity=".92" />
        <path d="M104 214h184v82a92 92 0 0 1-184 0Z" fill="#fff" />
        <path d="M288 236h18a40 40 0 0 1 0 80h-26" stroke="#fff" strokeWidth="18" fill="none" strokeLinecap="round" />
        <ellipse cx="196" cy="214" rx="92" ry="17" fill="#5A2A1A" />
        <ellipse cx="196" cy="212" rx="74" ry="11" fill="#7C4129" />
        <g stroke="#fff" strokeOpacity=".75" strokeWidth="9" strokeLinecap="round" fill="none">
          <path d="M156 176c-16-22 14-38 0-62" />
          <path d="M198 168c-16-22 14-38 0-62" />
          <path d="M240 176c-16-22 14-38 0-62" />
        </g>
      </g>
    </>
  );
}

function HomeArt({ id }: ArtProps) {
  return (
    <>
      <defs>
        <linearGradient id={`${id}bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2D3134" />
          <stop offset="1" stopColor="#0A8A4B" />
        </linearGradient>
      </defs>
      <rect width="400" height="500" fill={`url(#${id}bg)`} />
      <circle cx="320" cy="80" r="130" fill="#fff" opacity=".1" />
      {/* illustration sits in the upper part so card captions stay clear */}
      <g transform="translate(0 -64)">
        <ellipse cx="200" cy="410" rx="170" ry="20" fill={INK} opacity=".25" />
        <rect x="104" y="232" width="192" height="168" fill="#fff" />
        <path d="M84 238 200 128l116 110Z" fill={BRAND} />
        <rect x="176" y="296" width="48" height="104" rx="4" fill={INK} opacity=".85" />
        <rect x="124" y="268" width="36" height="36" rx="4" fill="#CDEBD9" />
        <rect x="240" y="268" width="36" height="36" rx="4" fill="#CDEBD9" />
        <rect x="64" y="332" width="6" height="80" fill="#fff" />
        <rect x="30" y="326" width="96" height="48" rx="6" fill="#fff" />
        <text x="78" y="348" style={HEAD} fontSize="14" fill={BRAND} textAnchor="middle" letterSpacing="1">
          FOR
        </text>
        <text x="78" y="366" style={HEAD} fontSize="18" fill={INK} textAnchor="middle" letterSpacing="1">
          SALE
        </text>
      </g>
    </>
  );
}

function Bag({ id }: ArtProps) {
  return (
    <>
      <defs>
        <linearGradient id={`${id}bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#00A651" />
          <stop offset="1" stopColor="#262626" />
        </linearGradient>
      </defs>
      <rect width="400" height="500" fill={`url(#${id}bg)`} />
      <circle cx="70" cy="90" r="130" fill="#fff" opacity=".1" />
      {/* illustration sits in the upper part so card captions stay clear */}
      <g transform="translate(0 -64)">
        <ellipse cx="200" cy="418" rx="150" ry="20" fill={INK} opacity=".3" />
        <path d="M150 196v-30a50 50 0 0 1 100 0v30" stroke="#fff" strokeWidth="14" fill="none" strokeLinecap="round" />
        <path d="M104 190h192l22 222H82Z" fill="#fff" />
        <text x="200" y="320" style={HEAD} fontSize="76" fill={BRAND} textAnchor="middle" textLength="168" lengthAdjust="spacingAndGlyphs">
          SALE
        </text>
        <rect x="150" y="338" width="100" height="28" rx="14" fill={INK} />
        <text x="200" y="358" style={BODY} fontSize="13" letterSpacing="2" fill="#fff" textAnchor="middle">
          SHOP NOW
        </text>
      </g>
      <g fill="#fff">
        <path d="m336 120 6 14 14 6-14 6-6 14-6-14-14-6 14-6Z" />
        <path d="m64 250 4 9 9 4-9 4-4 9-4-9-9-4 9-4Z" opacity=".8" />
      </g>
    </>
  );
}

const ARTS: Record<ArtKind, (props: ArtProps) => ReactElement> = {
  flyer: Flyer,
  newsletter: Newsletter,
  flex: Flex,
  standee: Standee,
  social: Social,
  qr: Qr,
  cafe: Cafe,
  home: HomeArt,
  bag: Bag,
};

type PrintArtProps = {
  kind: ArtKind;
  className?: string;
  /** Provide when the art carries meaning; otherwise it is hidden from assistive tech. */
  label?: string;
  /** Which part is kept when the container is wider than the 4:5 artwork. */
  align?: "center" | "top";
};

export function PrintArt({ kind, className, label, align = "center" }: PrintArtProps) {
  const id = `art${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const Art = ARTS[kind];

  return (
    <svg
      viewBox="0 0 400 500"
      preserveAspectRatio={align === "top" ? "xMidYMin slice" : "xMidYMid slice"}
      className={cn("block h-full w-full", className)}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
    >
      <Art id={id} />
    </svg>
  );
}
