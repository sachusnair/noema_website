import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";
import { blog, site } from "@/content/site";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: `Blog — ${site.name}`,
  description: blog.sub,
  alternates: { canonical: `${site.url}/blog` },
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <PageShell eyebrow={blog.eyebrow} title={blog.h1} sub={blog.sub}>
      {posts.length === 0 ? (
        <Reveal>
          {/* Says the true thing rather than implying the list is loading. */}
          {/* Full width like the header above it. The rule is the visible part:
              capped, it stopped a third of the way across and read as a broken
              divider rather than a deliberate one. */}
          <p className="mt-16 border-t border-ash/30 pt-6 text-step-2 text-ash">
            {blog.empty}
          </p>
        </Reveal>
      ) : (
        <ul className="mt-16 flex flex-col lg:mt-20">
          {posts.map((post, index) => (
            <li key={post.slug}>
              <Reveal index={index}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col gap-2 border-t border-ash/30 py-8 transition-colors duration-200 hover:border-ember"
                >
                  {post.date ? (
                    <time dateTime={post.iso} className="type-mono text-ash">
                      {post.date}
                    </time>
                  ) : null}
                  <h2 className="type-display-s max-w-[24ch] transition-colors duration-200 group-hover:text-ember">
                    {post.title}
                  </h2>
                  {post.excerpt ? (
                    <p className="max-w-[62ch] text-step-2 text-bone/80">
                      {post.excerpt}
                    </p>
                  ) : null}
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      )}
    </PageShell>
  );
}
