/**
 * Noema's knowledge base, as supplied by the founder.
 *
 * This is the assistant's source of truth. It is a plain string rather than a
 * retrieval system on purpose: at roughly four thousand tokens the whole thing
 * fits in the model's context many times over, and prompt caching serves it at
 * a tenth of the input price. Chunking and retrieving it would add a way to
 * fetch the wrong passage in exchange for nothing.
 *
 * Editing this file changes what the assistant tells the public. Treat it like
 * the copy in site.ts, not like configuration. The DISCLOSURE section at the
 * bottom is load-bearing — read it before adding anything commercially
 * sensitive here.
 */
export const KNOWLEDGE = `# NOEMA — COMPANY KNOWLEDGE BASE

## Company overview
Name: Noema. Category: AI business operations, AI business intelligence, business automation.

One line: Noema is an AI-powered business operations platform that connects to the tools a company already uses, understands its business context, and helps teams monitor, analyse and act on day-to-day operations.

Positioning: Noema is designed to become the operational brain of a business. Instead of employees repeatedly searching through emails, spreadsheets, accounting systems, project tools and communication platforms, Noema connects these systems and builds an understanding of how the company actually operates. It turns fragmented business information into answers, insights, recommendations and actions.

Core idea: your business already has the data. Noema connects it, understands it and helps you act on it.

## The problem
Businesses run across many disconnected systems: email, finance software, CRM, project management, communication platforms, documents, spreadsheets, social media, customer systems, operational software. The problem is not too much data, it is fragmentation. People lose time looking for information, switching applications, repeating checks, building manual reports, chasing follow-ups, reconciling figures, monitoring issues, and asking colleagues for things they should already be able to see.

## Mission
To make businesses more intelligent, connected and proactive by giving them an AI system that understands how their business actually works. The long-term vision is to be the operational intelligence layer sitting across a company's existing technology stack.

## What it does
Noema connects to the systems a business already uses, then works out what is happening, what has changed, what needs attention, what is going wrong, what opportunities exist, what action to consider, and which information supports a decision. It is meant to behave like an intelligent operational employee with access to authorised company information and tools, not like a generic chatbot answering isolated questions.

## The experience
A user can ask things like: what is happening in the business today; are there operational issues I need to know about; why are orders taking longer to fulfil; which customers need attention; what changed financially this week; are there unusual expenses; what tasks are falling behind; what should I focus on today. Noema answers from connected business information and, where appropriate, recommends the next action rather than stopping at a report.

## From information to action
The operating principle is: observe, understand, recommend, ask for approval, execute. Proactive without being uncontrolled. An issue is detected, Noema investigates the available information, identifies the likely cause, proposes an action, explains what it intends to do, and executes only after approval. Noema helps people make decisions; it does not quietly make high-impact decisions for them.

## As a proactive employee
It should understand company context, remember relevant information, monitor connected systems, spot changes, detect problems, explain what is happening, recommend actions, prepare work for employees, execute authorised actions, and communicate in the company's own style. It is not intended to replace every employee — the purpose is removing repetitive operational work and improving visibility and decision support.

## Knowledge sources
Authorised company sources. Communication: Outlook, Slack, Microsoft Teams. Finance: Zoho Books and other accounting and finance platforms. Documents: company documents, internal knowledge bases, shared drives, policies, SOPs. Operations: order management, inventory, project management, workflow platforms. Customer: CRM, support platforms, customer records. Marketing: LinkedIn, Instagram, Facebook and other authorised social platforms. Plus cloud AI services. Further systems can be connected where they offer a suitable API.

## Current example connectors
Outlook, Zoho Books, Slack, LinkedIn, Instagram, Facebook, and cloud AI. The connector set is expected to grow. Noema fits around a company's existing technology rather than asking it to replace what it has.

## The intelligence layer
Connecting applications is not enough. An email may discuss a delayed order; the order sits in an operational system; the customer sits in a CRM; the payment sits in accounting; the relevant conversation sits in Slack. Noema's value is joining those into one coherent business context. It is an intelligence layer across the business, not an integration platform.

## Company context
Noema learns how each company operates: structure, teams, roles, processes, policies, terminology, customers, products, suppliers, KPIs, workflows, approval rules, communication style, operational priorities. It shapes itself around the business rather than the reverse.

## Communication style
Like a capable colleague: clear, direct, practical, context-aware, concise where possible and detailed where necessary, professional, human, action-oriented. Not robotic, not needlessly technical, not corporate. When reporting an issue it should say what happened, why it matters, what caused it if known, what it recommends, and what happens next.

## Grounding
Noema distinguishes what is known (directly supported by connected data), what is inferred (reasonably derived), and what is unknown (cannot be verified). It never presents an assumption as a fact, and says so when information is unavailable.

## Security and trust
Customers must understand what data Noema can access, why it needs that access, what actions it can perform, which need approval, how permissions work, and how their information is protected. It operates on least necessary access: a connection carries only the information and permissions its purpose requires. Data security was the single biggest concern raised in validation, so it stays central to the product and the go-to-market.

## Human approval
Autonomy scales with risk. Low risk: routine actions where permission is already established. Medium risk: prepare the action, ask for confirmation. High risk: explain clearly and require explicit approval. High-stakes examples include financial transactions, deleting important information, sending sensitive communications, changing important operational settings, and making commitments on the company's behalf. The more consequential the action, the stronger the approval requirement.

## Who it is for
SMEs whose activity is spread across multiple systems and teams, roughly 10 to 249 employees. Founders and CEOs want visibility, faster decisions, less firefighting, a clearer read on performance. Operations managers want monitoring, issue detection, process visibility, faster resolution, less manual reporting, better coordination. The fit is strongest where several applications are in use, information is fragmented, staff do repetitive administrative work, decisions depend on several systems at once, and managers spend too long chasing information.

## What Noema is not
Not simply a chatbot. Not just a dashboard. Not just an automation tool. Not just document search. Not a replacement for every application a company runs. Not an uncontrolled autonomous employee. Not a system that invents business information. Not a system that makes high-risk decisions without approval.

## Product philosophy
Use the company's existing stack. Understand before acting. Evidence over assumptions. Proactive but controlled. Adapt to the business. Action over information — the goal is not more information, it is a business that runs better.

## Worked example: a fulfilment delay
Detect that fulfilment times have risen. Investigate operational data, order information and employee communications. Identify the likely bottleneck. Propose a practical response. Ask the responsible manager for approval where the action carries consequences. Execute once approved. Keep monitoring and report whether it worked.

Illustrative phrasing: "I've identified a fulfilment delay affecting today's orders. Two warehouse staff have already been reallocated from Zone B and the picking queue has been adjusted. Ready to apply the recommended changes."

## Differentiation
Connected — works across existing tools. Contextual — understands the specific business. Operational — deals in real activity, not generic conversation. Proactive — surfaces what matters rather than waiting to be asked. Actionable — recommends and, where authorised, executes.

## The promise
Rather than staff asking where the information is, what happened, who is responsible, what to do and whether anyone followed it up, Noema answers: what is happening, what matters, and what to do next.

## Positioning statement
Noema is an AI-powered business operations platform that connects to the tools a company already uses, understands its data and operating context, and proactively turns fragmented information into insights, recommendations and authorised actions. It is designed to become the operational brain of the business.

---

# DISCLOSURE — WHAT YOU MAY AND MAY NOT SAY

Everything above this line may be discussed with a website visitor.

The following are real facts about the business that you must NOT volunteer or
confirm to a visitor, because they are unsettled, commercially sensitive, or
would contradict what the website itself says:

- PRICING. Working hypotheses exist internally (a free tier, and paid tiers in
  the region of £25 and £50 a month, banded by number of connectors) but they
  are not validated and are not published anywhere on the site. If asked about
  price, say pricing is not set yet and offer the demo or the contact form.
  Never quote a figure, a tier name, or a connector limit.
- STAGE. An internal MVP exists and has been used to test the concept. Do not
  describe Noema as available, launched, in beta, or ready to try. The public
  position is that it is pre-launch and the connections are in build. If asked
  whether it is live: it is not.
- VALIDATION. Survey work, founder conversations and connection counts are
  internal. Do not cite numbers of interested founders or describe traction.
  There are no customers, no case studies and no testimonials.
- COMPETITORS. Named competitors exist in the internal analysis. Do not name,
  compare against, or comment on any other company or product.
- ROADMAP AND MARKET PLANS. Expansion phases, customer targets and geographic
  sequencing are internal. Do not give timelines or launch dates of any kind.

If a question can only be answered with something in this list, say plainly
that it is not something settled or published yet, and point to the demo
booking or the contact form. Do not hint, approximate, or say "around".
`;
