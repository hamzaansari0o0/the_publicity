"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { Clock, Close, Mail, MapPin, Phone } from "@/components/ui/icons";
import { Logo } from "@/components/ui/Logo";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { mainNav } from "@/data/content";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/cn";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Soft shadow once the page has scrolled (DOM attribute, no re-render).
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const update = () => {
      header.dataset.scrolled = window.scrollY > 24 ? "true" : "false";
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  // Menu open: lock scroll, trap focus, close on Escape, restore focus after.
  useEffect(() => {
    if (!open) return;
    const trigger = openButtonRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        "a[href], button:not([disabled])",
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      trigger?.focus();
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);
  const close = () => setOpen(false);

  return (
    <>
      <header
        ref={headerRef}
        data-scrolled="false"
        className="fixed inset-x-0 top-0 z-40 border-b border-line bg-white/95 backdrop-blur-xl transition-shadow duration-300 data-[scrolled=true]:shadow-lg data-[scrolled=true]:shadow-ink/10"
      >
        <div className="container-x flex h-[72px] items-center justify-between gap-4 md:h-[84px]">
          <Link href="/" aria-label={`${siteConfig.name} - home`}>
            <Logo priority />
          </Link>

          <div className="flex items-center gap-4 md:gap-7">
            <a
              href={siteConfig.phoneHref}
              className="hidden items-center gap-2.5 text-sm font-semibold text-ink transition-colors hover:text-accent md:flex"
            >
              <Phone className="size-[18px] text-accent" />
              {siteConfig.phone}
            </a>
            <a
              href={siteConfig.emailHref}
              className="hidden items-center gap-2.5 text-sm text-ink/80 transition-colors hover:text-accent xl:flex"
            >
              <Mail className="size-[18px] text-accent" />
              {siteConfig.email}
            </a>
            <button
              ref={openButtonRef}
              type="button"
              onClick={() => setOpen(true)}
              aria-haspopup="dialog"
              aria-expanded={open}
              aria-controls="site-menu"
              className="flex items-center gap-3 rounded-xl bg-ink px-4 py-3 font-heading text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-brand-600"
            >
              <span aria-hidden="true" className="flex w-5 flex-col gap-[5px]">
                <span className="h-0.5 w-full bg-white" />
                <span className="h-0.5 w-3/4 bg-white" />
              </span>
              Menu
            </button>
          </div>
        </div>
      </header>

      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={close}
        className={cn(
          "fixed inset-0 z-50 bg-ink/60 backdrop-blur-sm transition-opacity duration-300",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      {/* Slide-in menu */}
      <div
        id="site-menu"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        inert={!open}
        className={cn(
          "fixed right-0 top-0 z-50 flex h-dvh w-full max-w-[460px] flex-col overflow-y-auto border-l border-line bg-page px-7 py-6 shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.7,0,0.2,1)] md:px-10",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between">
          <Link href="/" onClick={close} aria-label={`${siteConfig.name} - home`}>
            <Logo />
          </Link>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={close}
            aria-label="Close menu"
            className="grid size-11 place-items-center rounded-full bg-fg/10 transition-colors hover:bg-brand-gradient hover:text-white"
          >
            <Close className="size-5" />
          </button>
        </div>

        <nav aria-label="Main" className="mt-10">
          <ul className="space-y-1">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={close}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "block font-heading text-4xl font-extrabold uppercase leading-[1.15] transition-colors hover:text-accent",
                    isActive(item.href) ? "text-accent" : "text-fg",
                  )}
                >
                  {item.label}
                </Link>
                {"children" in item ? (
                  <ul className="mb-2 ml-1 mt-1 space-y-1 border-l border-line pl-4">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          onClick={close}
                          aria-current={
                            pathname === child.href ? "page" : undefined
                          }
                          className={cn(
                            "block py-0.5 text-base transition-colors hover:text-accent",
                            pathname === child.href
                              ? "font-semibold text-accent"
                              : "text-muted",
                          )}
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-auto pt-10">
          <p className="font-heading text-xl font-bold">Contact Info</p>
          <ul className="mt-4 space-y-3 text-sm text-fg/80">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-5 shrink-0 text-accent" />
              {siteConfig.address}
            </li>
            <li className="flex items-center gap-3">
              <Phone className="size-5 shrink-0 text-accent" />
              <a href={siteConfig.phoneHref} className="hover:text-accent">
                {siteConfig.phone}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="size-5 shrink-0 text-accent" />
              <a href={siteConfig.emailHref} className="break-all hover:text-accent">
                {siteConfig.email}
              </a>
            </li>
            {siteConfig.hours ? (
              <li className="flex items-center gap-3">
                <Clock className="size-5 shrink-0 text-accent" />
                {siteConfig.hours}
              </li>
            ) : null}
          </ul>

          <div className="mt-7 flex flex-wrap items-center justify-between gap-5">
            <ButtonLink href="/contact" onClick={close}>
              Get Started Today
            </ButtonLink>
            <SocialLinks size="sm" />
          </div>
        </div>
      </div>
    </>
  );
}
