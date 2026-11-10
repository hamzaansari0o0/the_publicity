import { PrintArt } from "@/components/art/PrintArt";
import type { ArtKind } from "@/components/art/types";
import { cn } from "@/lib/cn";

type ArtStageProps = {
  kind: ArtKind;
  label: string;
  className?: string;
};

/**
 * Presents a portrait illustration uncropped on a blurred copy of itself -
 * used for wide hero images, where a normal "cover" crop would cut it off.
 */
export function ArtStage({ kind, label, className }: ArtStageProps) {
  return (
    <div className={cn("relative isolate overflow-hidden", className)}>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 scale-150 opacity-90 blur-3xl saturate-150"
      >
        <PrintArt kind={kind} />
      </div>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-ink/20" />
      <div className="absolute left-1/2 top-5 aspect-[4/5] h-[calc(100%-2.5rem)] -translate-x-1/2 overflow-hidden rounded-2xl shadow-2xl shadow-black/50 md:top-8 md:h-[calc(100%-4rem)]">
        <PrintArt kind={kind} label={label} />
      </div>
    </div>
  );
}
