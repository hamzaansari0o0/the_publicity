import Link from "next/link";
import { PrintArt } from "@/components/art/PrintArt";
import { ArrowRight } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import { formatPostDate, type Post } from "@/data/posts";

function Meta({ post, onImage = false }: { post: Post; onImage?: boolean }) {
  return (
    <p
      className={cn(
        "flex flex-wrap items-center gap-3 text-sm",
        onImage ? "text-white/80" : "text-fg/70",
      )}
    >
      <time dateTime={post.date}>{formatPostDate(post.date)}</time>
      <span
        className={cn(
          "rounded-full px-3 py-1 text-xs font-medium",
          onImage ? "bg-white/15 text-white" : "bg-brand/10 text-accent",
        )}
      >
        {post.category}
      </span>
    </p>
  );
}

type PostCardProps = {
  post: Post;
  /** Large image-overlay variant used for the first post on the home page. */
  featured?: boolean;
};

export function PostCard({ post, featured = false }: PostCardProps) {
  const href = `/blog/${post.slug}`;

  if (featured) {
    return (
      <article className="group relative isolate flex min-h-[420px] overflow-hidden rounded-[28px] border border-line text-white lg:min-h-full">
        <PrintArt
          kind={post.art}
          align="top"
          className="absolute inset-0 -z-10 transition-transform duration-700 group-hover:scale-105"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-linear-to-t from-ink via-ink/75 to-ink/10"
        />
        <div className="mt-auto p-6 md:p-8">
          <Meta post={post} onImage />
          <h3 className="mt-4 text-[clamp(1.8rem,3vw,2.6rem)] font-extrabold leading-[1]">
            <Link href={href} className="after:absolute after:inset-0">
              {post.title}
            </Link>
          </h3>
        </div>
      </article>
    );
  }

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-line bg-surface transition-shadow duration-300 hover:shadow-xl hover:shadow-ink/10">
      <div className="aspect-[5/4] overflow-hidden">
        <PrintArt
          kind={post.art}
          className="transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <Meta post={post} />
        <h3 className="mt-4 text-[1.55rem] font-extrabold leading-[1.02]">
          <Link href={href} className="after:absolute after:inset-0">
            {post.title}
          </Link>
        </h3>
        <span className="mt-auto inline-flex items-center gap-2 pt-6 font-heading text-sm font-bold uppercase tracking-wide transition-colors group-hover:text-accent">
          View details
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </article>
  );
}
