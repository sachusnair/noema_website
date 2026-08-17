/* The page for a single post. Markdown in content/blog, compiled at build
 * time; every route is enumerated by generateStaticParams because
 * `output: "export"` has to know them all in advance.
 *
 * This folder was parked as _slug until the first post existed, because a
 * static export refuses to build a dynamic route that generates nothing. It
 * was switched on when why-i-built-noema.md landed. If content/blog is ever
 * emptied, the build will fail here — park it again rather than deleting it.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { ShareRow } from "@/components/ShareRow";
import { blog, site } from "@/content/site";
import { getPost, getPostSlugs } from "@/lib/posts";

type Params = { params: Promise<{ slug: string }> };

/* Required by output: "export" — every post route has to be known at build. */
export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};

  return {
    title: `${post.title} — ${site.name}`,
    description: post.excerpt,
    alternates: { canonical: `${site.url}/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.iso || undefined,
    },
  };
}

export default async function BlogPost({ params }: Params) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <>
      <Nav />
      <main id="top">
        <div className="shell pt-20 pb-24 lg:pt-28 lg:pb-32">
          <Link
            href="/blog"
            className="type-mono text-ash transition-colors duration-200 hover:text-ember"
          >
            {blog.backLabel}
          </Link>

          <article className="mt-10">
            {/* No measure cap on the header: the client wants the title to run
                the full column. The body below keeps its measure — this is the
                one page on the site that is read rather than scanned. */}
            <header>
              {post.date ? (
                <time dateTime={post.iso} className="type-mono text-ember">
                  {post.date}
                </time>
              ) : null}
              <h1 className="type-display-l mt-5">{post.title}</h1>
            </header>

            {/* Markdown is compiled at build time, from files in this repo.
                Nothing here comes from a visitor or a third party. */}
            <div
              className="prose-noema mt-12 max-w-[68ch]"
              dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            />

            <ShareRow
              url={`${site.url}/blog/${post.slug}`}
              title={post.title}
            />
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
