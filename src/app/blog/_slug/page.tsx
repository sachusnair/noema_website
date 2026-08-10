/* PARKED ROUTE — rename this folder from _slug to [slug] to switch it on.
 *
 * Next ignores folders beginning with an underscore, so this file is complete
 * but not routed. It is parked because `output: "export"` refuses to build a
 * dynamic route whose generateStaticParams returns nothing, and there are no
 * posts yet.
 *
 * The moment content/blog holds its first .md file:
 *
 *     git mv "src/app/blog/_slug" "src/app/blog/[slug]"
 *
 * and post pages build. Nothing else needs changing: the index page, sitemap
 * and styles already handle posts.
 */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
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
            <header className="max-w-[62ch]">
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
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
