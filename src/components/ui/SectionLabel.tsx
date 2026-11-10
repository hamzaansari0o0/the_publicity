import { cn } from "@/lib/cn";

type SectionLabelProps = {
  number: string;
  label: string;
  className?: string;
};

/** The numbered divider that opens each section: `02 ───────── ● WHO WE ARE` */
export function SectionLabel({ number, label, className }: SectionLabelProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-4 font-heading text-sm font-semibold uppercase tracking-wide",
        className,
      )}
    >
      <span className="text-fg/70">{number}</span>
      <span aria-hidden="true" className="h-px flex-1 bg-fg/15" />
      <span className="flex items-center gap-2 font-bold">
        <span aria-hidden="true" className="size-1.5 rounded-full bg-white" />
        {label}
      </span>
    </div>
  );
}
