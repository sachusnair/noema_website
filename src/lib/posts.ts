import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

/* Posts are markdown files in content/blog. Writing one is: add a file,
   commit, done. Read at build time only, so nothing here ships to the browser
   and the static export keeps working with no CMS behind it. */

const POSTS_DIR = path.join(process.cwd(), "content", "blog");

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  /** ISO date, used for the machine-readable datetime attribute. */
  iso: string;
  excerpt: string;
};

export type Post = PostMeta & { contentHtml: string };

function readDir(): string[] {
  // The directory is empty until the first post is written, and may not exist
  // at all on a fresh clone, so a missing folder is a normal state.
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs.readdirSync(POSTS_DIR).filter(
    (file) =>
      file.endsWith(".md") &&
      // The folder's own README is documentation, not a post. A leading
      // underscore is the convention for a draft that should not publish.
      file !== "README.md" &&
      !file.startsWith("_") &&
      !file.startsWith("."),
  );
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Europe/London",
  });
}

function parse(file: string) {
  const slug = file.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
  const { data, content } = matter(raw);

  /* An unquoted YAML date — `date: 2026-08-17`, which is what the README tells
     you to write — is parsed by gray-matter into a Date object, not a string.
     Only accepting strings meant the first post published with no date at all,
     silently: no <time> element, nothing in the sitemap's lastModified, and no
     published date in the article metadata. Both shapes are read now, and a
     quoted date still works. */
  const parsedDate =
    data.date instanceof Date
      ? data.date
      : typeof data.date === "string" && data.date
        ? new Date(data.date)
        : null;
  const iso =
    parsedDate && !Number.isNaN(parsedDate.valueOf())
      ? parsedDate.toISOString()
      : "";

  return {
    slug,
    title: typeof data.title === "string" ? data.title : slug,
    date: iso ? formatDate(iso) : "",
    iso,
    excerpt: typeof data.excerpt === "string" ? data.excerpt : "",
    content,
  };
}

/** Newest first. Posts with no valid date sort last rather than throwing. */
export function getAllPosts(): PostMeta[] {
  return readDir()
    .map((file) => {
      const parsed = parse(file);
      return {
        slug: parsed.slug,
        title: parsed.title,
        date: parsed.date,
        iso: parsed.iso,
        excerpt: parsed.excerpt,
      };
    })
    .sort((a, b) => (a.iso < b.iso ? 1 : a.iso > b.iso ? -1 : 0));
}

export function getPostSlugs(): string[] {
  return readDir().map((file) => file.replace(/\.md$/, ""));
}

export async function getPost(slug: string): Promise<Post | null> {
  const file = `${slug}.md`;
  if (!readDir().includes(file)) return null;

  const { content, ...meta } = parse(file);
  const processed = await remark().use(html).process(content);

  return { ...meta, contentHtml: processed.toString() };
}
