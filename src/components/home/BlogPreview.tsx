import { PostCard } from "@/components/sections/PostCard";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitText } from "@/components/ui/SplitText";
import { posts } from "@/data/posts";

export function BlogPreview() {
  const [featured, ...rest] = posts.slice(0, 3);

  return (
    <section className="relative py-24 md:py-32">
      <div className="container-x">
        <SectionLabel number="08" label="Latest insights" />

        <div className="mt-14 flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <SplitText
            text="Insights, tips & print-to-digital ideas"
            className="max-w-[760px] text-[clamp(2rem,4.4vw,3.9rem)] font-extrabold leading-[1.02]"
          />
          <ButtonLink href="/blog" className="shrink-0">
            View all blog
          </ButtonLink>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-[1.35fr_1fr_1fr]">
          <Reveal className="h-full">
            <PostCard post={featured} featured />
          </Reveal>
          {rest.map((post, index) => (
            <Reveal key={post.slug} delay={(index + 1) * 120} className="h-full">
              <PostCard post={post} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
