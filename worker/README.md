# Chat endpoint

The Worker behind the chat widget in the bottom right of the site.

It exists because the site is a static export with no server, and the Anthropic
key must never reach a browser. This is the only server-side code Noema runs.
It takes a transcript, replays it to Claude behind a fixed system prompt, and
streams the reply back as plain text. It stores nothing.

## Deploying it

You need a Cloudflare account and an Anthropic API key. Run these from this
folder. **Type the key in yourself when the second command prompts** — it is
never written to a file here.

```bash
npm install
```

```bash
npx wrangler secret put ANTHROPIC_API_KEY
```

```bash
npx wrangler deploy
```

Wrangler prints a URL like `https://noema-chat.<subdomain>.workers.dev`. Put it
in `integrations.chatEndpoint` in `src/content/site.ts`. **The widget renders
nothing until that value is set**, so the launcher cannot appear before there
is something behind it.

## What it costs

Every answer is a call to Claude Opus 5 at $5 per million input tokens and $25
per million output. A short exchange is a few thousand input tokens and a few
hundred output, so roughly a penny or two per conversation, less once the
system prompt is being served from cache. There is no free tier — this bills to
whoever owns the key. Watch it in the Anthropic console before pointing any
volume at it.

## Keeping the bill sane

The endpoint is public, so it is worth being deliberate about abuse:

- **Origins** are restricted in `wrangler.toml`. A browser on any other site is
  refused. This does not stop `curl`, which sends whatever origin it likes.
- **Per-IP rate limiting** is off until you bind a KV namespace. Turn it on:

```bash
npx wrangler kv namespace create RATE_LIMIT
```

  then uncomment the `[[kv_namespaces]]` block in `wrangler.toml` with the id it
  prints and deploy again. That caps each IP at 20 messages per 15 minutes.
- **Caps** on transcript length (20 turns) and message length (2000 characters)
  are enforced here regardless, so a single request cannot be made enormous.
- `max_tokens` is 1024, which bounds the cost of any one reply.

If the endpoint is ever abused, `wrangler delete` takes it down and the widget
disappears from the site on the next deploy of `chatEndpoint = ""`.

## The system prompt

It lives in `src/index.ts` as `SYSTEM`, and it carries the site's honesty rules
as hard limits: pre-launch, no customers, no case studies, no pricing, no
metrics, connections in build, illustrative figures. It also tells the model it
has no access to the visitor's data and cannot take actions, and to send
anything it cannot answer to `/contact`.

Two things to know before editing it:

- It is deliberately over ~512 tokens, which is Claude Opus 5's minimum
  cacheable prefix. Below that it stops being a cache read and starts costing
  full price on every message.
- Editing it changes what the site claims. Treat it like the copy in
  `site.ts`, not like configuration.

## Local development

```bash
npx wrangler dev
```

That serves on `http://localhost:8787`. Point `NEXT_PUBLIC_CHAT_ENDPOINT` at it
while testing so you are not editing `site.ts` back and forth.
