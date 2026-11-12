import { cn } from "@/lib/cn";

const COLS = 9;
const ROWS = 7;
const STEP = 30;

/** Deterministic hash so server and client render identical markup. */
function hash(col: number, row: number) {
  return ((col * 73856093) ^ (row * 19349663)) >>> 0;
}

const TONES = ["#2D3134", "#9B1C24", "#C9971C"] as const;

type Cell = { x: number; y: number; size: number; fill: string; opacity: number };

const CELLS: Cell[] = (() => {
  const cells: Cell[] = [];
  for (let col = 0; col < COLS; col++) {
    for (let row = 0; row < ROWS; row++) {
      const h = hash(col + 3, row + 5) % 100;
      // sparse on the left, dense on the right - the logo's dissolving pixels
      if (h > 20 + col * 9) continue;
      const size = 5 + col * 2.6;
      cells.push({
        x: col * STEP + STEP / 2 - size / 2,
        y: row * STEP + STEP / 2 - size / 2 + (col % 2) * 6,
        size,
        fill: TONES[h % TONES.length],
        opacity: 0.2 + (col / (COLS - 1)) * 0.8,
      });
    }
  }
  return cells;
})();

type PixelTrailProps = {
  className?: string;
  /** Mirror horizontally so the trail fades to the right. */
  flip?: boolean;
};

/** The logo's dissolving-pixel motif, used as a decoration. */
export function PixelTrail({ className, flip = false }: PixelTrailProps) {
  return (
    <svg
      viewBox={`0 0 ${COLS * STEP} ${ROWS * STEP + 12}`}
      aria-hidden="true"
      focusable="false"
      className={cn("pointer-events-none", flip && "-scale-x-100", className)}
    >
      {CELLS.map((cell, index) => (
        <rect
          key={index}
          x={cell.x}
          y={cell.y}
          width={cell.size}
          height={cell.size}
          rx={cell.size * 0.22}
          fill={cell.fill}
          opacity={cell.opacity}
        />
      ))}
    </svg>
  );
}
