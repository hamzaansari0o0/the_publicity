import { SocialIcons } from "@/components/ui/icons";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/cn";

type SocialLinksProps = {
  className?: string;
  /** Visual size of each round button. */
  size?: "sm" | "md";
};

/** Round social buttons. Links come from `.env` (placeholders "#" until set). */
export function SocialLinks({ className, size = "md" }: SocialLinksProps) {
  return (
    <ul className={cn("flex items-center gap-2.5", className)}>
      {siteConfig.socials.map(({ key, label, href }) => {
        const Icon = SocialIcons[key];
        const external = href.startsWith("http");
        return (
          <li key={key}>
            <a
              href={href}
              aria-label={label}
              {...(external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className={cn(
                "grid place-items-center rounded-full bg-fg/10 text-fg transition-colors hover:bg-brand-gradient hover:text-white",
                size === "sm" ? "size-9" : "size-11",
              )}
            >
              <Icon className={size === "sm" ? "size-4" : "size-[18px]"} />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
