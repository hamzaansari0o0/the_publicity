import type { Metadata } from "next";
import { Audience } from "@/components/home/Audience";
import { BlogPreview } from "@/components/home/BlogPreview";
import { CircleRow } from "@/components/home/CircleRow";
import { CtaBand } from "@/components/home/CtaBand";
import { Hero } from "@/components/home/Hero";
import { PhygitalModel } from "@/components/home/PhygitalModel";
import { PromiseBanner } from "@/components/home/PromiseBanner";
import { Samples } from "@/components/home/Samples";
import { ServicesList } from "@/components/home/ServicesList";
import { WhatWeDo } from "@/components/home/WhatWeDo";
import { SharedPackagesSection } from "@/components/sections/SharedPackagesSection";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

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
      <BlogPreview />
    </>
  );
}
