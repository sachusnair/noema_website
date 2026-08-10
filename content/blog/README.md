# Blog posts

One markdown file per post. The filename is the URL: `first-week.md` becomes
`/blog/first-week`.

Front matter at the top, then the body in normal markdown:

```markdown
---
title: What the first week of an overnight run looks like
date: 2026-08-14
excerpt: One sentence shown on the blog index and in search results.
---

Body starts here. Headings, lists, links, quotes and code all work.
```

`title` and `date` are required. `excerpt` is optional but worth writing, as it
is what appears under the title on the index and in the page description.

Posts sort newest first by `date`.

This README is not published, and neither is any file whose name starts with an
underscore. Rename a post to `_draft-name.md` to take it off the site without
deleting it.

## Switching post pages on

The route that renders an individual post is parked at `src/app/blog/_slug`.
Next ignores folders starting with an underscore, so it is currently inactive.

This is deliberate: the site is a static export, and a static export refuses to
build a dynamic route that has no pages to generate. With no posts written, the
route would break the build.

When you add the first post, activate it once:

```bash
git mv "src/app/blog/_slug" "src/app/blog/[slug]"
```

Until then the blog index renders on its own and says nothing is published yet.
