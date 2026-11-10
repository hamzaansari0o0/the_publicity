import type { ReactNode } from "react";
import {
  FlexIcon,
  FlyerIcon,
  NewsIcon,
  QrIcon,
  StandeeIcon,
  WhatsApp,
} from "@/components/ui/icons";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

const items: { label: string; icon: ReactNode }[] = [
  { label: "Flyers", icon: <FlyerIcon className="size-10" /> },
  { label: "Newsletters", icon: <NewsIcon className="size-10" /> },
  { label: "Flex banners", icon: <FlexIcon className="size-10" /> },
  { label: "Standees", icon: <StandeeIcon className="size-10" /> },
  { label: "QR codes", icon: <QrIcon className="size-10" /> },
  { label: "WhatsApp", icon: <WhatsApp className="size-10" /> },
];

/** The template's row of logo circles - here, every channel we cover. */
export function CircleRow() {
  return (
    <section className="pb-4 pt-20 md:pt-28">
      <div className="container-x">
        <SectionLabel number="06" label="Everything under one roof" />
        <Reveal>
          <ul className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:flex lg:gap-0">
            {items.map((item) => (
              <li
                key={item.label}
                className="group flex aspect-square flex-col items-center justify-center gap-3 rounded-full border border-fg/10 text-fg/60 transition-colors duration-300 hover:border-brand/60 hover:bg-brand/10 hover:text-fg lg:-ml-2 lg:flex-1 lg:first:ml-0"
              >
                <span className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:text-accent">
                  {item.icon}
                </span>
                <span className="font-heading text-sm font-bold uppercase tracking-wide">
                  {item.label}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
