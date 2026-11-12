import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArtStage } from "@/components/art/ArtStage";
import { PrintArt } from "@/components/art/PrintArt";
import { PageBanner } from "@/components/layout/PageBanner";
import { JsonLd } from "@/components/seo/JsonLd";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/icons";
import { getService } from "@/data/services";
import {
  formatPostDate,
  getAdjacentPosts,
  getPost,
  posts,
  type PostBlock,
} from "@/data/posts";
import { blogPostingSchema, breadcrumbSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return buildMetadata({
    title: post.metaTitle,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    article: {
      publishedTime: post.date,
      modifiedTime: post.updated,
      section: post.category,
    },
  });
}

function Block({ block }: { block: PostBlock }) {
  switch (block.type) {
    case "h2":
      return (
        <h2 className="mb-4 mt-12 text-[clamp(1.7rem,3vw,2.4rem)] font-extrabold leading-[1.05]">
          {block.text}
        </h2>
      );
    case "ul":
      return (
        <ul className="my-6 space-y-3">
          {block.items.map((item) => (
            <li key={item} className="flex gap-3 text-lg leading-relaxed text-fg/80">
              <span
                aria-hidden="true"
                className="mt-3 size-2 shrink-0 rounded-full bg-brand-gradient"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    default:
      return (
        <p className="my-5 text-lg leading-relaxed text-fg/80">{block.text}</p>
      );
  }
}

export default async function BlogPostPage({
  params,
}: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const { prev, next } = getAdjacentPosts(post.slug);
  const recent = posts.filter((item) => item.slug !== post.slug).slice(0, 3);
  const categories = Array.from(
    posts.reduce(
      (map, item) => map.set(item.category, (map.get(item.category) ?? 0) + 1),
      new Map<string, number>(),
    ),
  );

  const relatedService = getService(post.service);

  return (
    <>
      <PageBanner
        title={post.title}
        size="lg"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: post.category },
        ]}
      >
        <p className="flex flex-wrap items-center gap-x-4 gap-y-2 text-base">
          <time dateTime={post.date}>{formatPostDate(post.date)}</time>
          <span aria-hidden="true" className="text-fg/30">
            •
          </span>
          <span>{post.readTime}</span>
        </p>
      </PageBanner>

      <section className="pb-24 pt-12 md:pb-32 md:pt-16">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_340px] lg:gap-16">
          <article>
            <ArtStage
              kind={post.art}
              label={`${post.title} illustration`}
              className="aspect-[16/10] rounded-[28px] border border-fg/10"
            />

            <div className="mt-10 max-w-[760px]">
              {post.blocks.map((block, index) => (
                <Block key={index} block={block} />
              ))}
            </div>

            {relatedService ? (
              <p className="mt-10 max-w-[760px] text-lg leading-relaxed text-fg/80">
                Want this for your business? Learn more about our{" "}
                <Link
                  href={`/services/${relatedService.slug}`}
                  className="font-semibold text-accent underline underline-offset-4"
                >
                  {relatedService.title}
                </Link>{" "}
                service, or{" "}
                <Link
                  href="/contact"
                  className="font-semibold text-accent underline underline-offset-4"
                >
                  get in touch
                </Link>
                .
              </p>
            ) : null}

            <div className="mt-12 flex flex-wrap items-center gap-3 border-t border-fg/10 pt-8">
              <span className="text-sm text-fg/50">Category:</span>
              <span className="rounded-full bg-fg/10 px-3 py-1 text-sm">
                {post.category}
              </span>
            </div>

            <nav
              aria-label="More articles"
              className="mt-10 grid gap-5 sm:grid-cols-2"
            >
              {[
                { label: "Previous article", target: prev, align: "items-start" },
                {
                  label: "Next article",
                  target: next,
                  align: "items-end text-right",
                },
              ].map(({ label, target, align }) => (
                <Link
                  key={label}
                  href={`/blog/${target.slug}`}
                  className={`group flex flex-col gap-2 rounded-3xl border border-fg/10 bg-surface p-6 transition-colors hover:border-brand/60 ${align}`}
                >
                  <span className="text-sm text-fg/50">{label}</span>
                  <span className="font-heading text-xl font-extrabold uppercase leading-[1.05]">
                    {target.title}
                  </span>
                </Link>
              ))}
            </nav>
          </article>

          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-3xl border border-fg/10 bg-surface p-6">
              <h2 className="text-2xl font-extrabold leading-none">Recent posts</h2>
              <ul className="mt-5 space-y-5">
                {recent.map((item) => (
                  <li key={item.slug}>
                    <Link href={`/blog/${item.slug}`} className="group flex gap-4">
                      <span className="size-20 shrink-0 overflow-hidden rounded-2xl border border-fg/10">
                        <PrintArt kind={item.art} />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-xs text-fg/50">
                          {formatPostDate(item.date)}
                        </span>
                        <span className="mt-1 block font-heading text-base font-bold uppercase leading-tight transition-colors group-hover:text-accent">
                          {item.title}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-fg/10 bg-surface p-6">
              <h2 className="text-2xl font-extrabold leading-none">Categories</h2>
              <ul className="mt-5 divide-y divide-fg/10">
                {categories.map(([name, count]) => (
                  <li
                    key={name}
                    className="flex items-center justify-between py-3 text-fg/80"
                  >
                    <span>{name}</span>
                    <span className="text-sm text-fg/40">
                      ({String(count).padStart(2, "0")})
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl bg-brand-gradient p-6 text-white">
              <h2 className="text-3xl font-extrabold leading-[0.98]">
                Want print that tracks?
              </h2>
              <p className="mt-3 text-white/90">
                Tell us about your business and we&apos;ll plan your next
                campaign together.
              </p>
              <div className="mt-6">
                <ButtonLink href="/contact" variant="light">
                  Get in touch
                </ButtonLink>
              </div>
              <Link
                href="/services"
                className="mt-5 inline-flex items-center gap-2 font-heading text-sm font-bold uppercase underline-offset-4 hover:underline"
              >
                Explore services <ArrowRight className="size-4" />
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <JsonLd data={blogPostingSchema(post)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ])}
      />
    </>
  );
}
