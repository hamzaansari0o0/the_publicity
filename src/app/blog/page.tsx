import type { Metadata } from "next";
import { PageBanner } from "@/components/layout/PageBanner";
import { PostCard } from "@/components/sections/PostCard";
import { Reveal } from "@/components/ui/Reveal";
import { posts } from "@/data/posts";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Practical ideas for local brands: how to plan flyer campaigns, choose between flex and standees, use QR codes and make print measurable.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <>
      <PageBanner
        title="Blog"
        crumbs={[{ label: "Home", href: "/" }, { label: "Blog" }]}
      >
        <p>
          Insights, tips and ideas for making your print and digital marketing
          work together.
        </p>
      </PageBanner>

      <section className="pb-24 pt-14 md:pb-32 md:pt-20">
        <div className="container-x grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <Reveal key={post.slug} delay={(index % 3) * 100} className="h-full">
              <PostCard post={post} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
