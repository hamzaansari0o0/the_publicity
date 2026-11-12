import type { Metadata } from "next";
import { Audience } from "@/components/home/Audience";
import { BlogPreview } from "@/components/home/BlogPreview";
import { CircleRow } from "@/components/home/CircleRow";
import { CtaBand } from "@/components/home/CtaBand";
import { Hero } from "@/components/home/Hero";
import { PhygitalModel } from "@/components/home/PhygitalModel";
import { PromiseBanner } from "@/components/home/PromiseBanner";
import { RealExample } from "@/components/home/RealExample";
import { Samples } from "@/components/home/Samples";
import { ServicesList } from "@/components/home/ServicesList";
import { WhatWeDo } from "@/components/home/WhatWeDo";
import { SharedPackagesSection } from "@/components/sections/SharedPackagesSection";
import { buildMetadata, defaultTitle, homeDescription } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  absoluteTitle: defaultTitle,
  description: homeDescription,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhatWeDo />
      <Samples />
      <PromiseBanner />
      <ServicesList />
      <SharedPackagesSection />
      <Audience />
      <CtaBand />
      <CircleRow />
      <PhygitalModel />
      <RealExample />
      <BlogPreview />
    </>
  );
}
