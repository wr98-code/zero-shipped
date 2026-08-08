import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";

/* ------------------------------------------------------------------ *
 * Single source of truth for identity.
 * Change SITE_URL to the final custom domain once DNS is pointed.
 * ------------------------------------------------------------------ */
const SITE_URL = "https://hire.zerobuildlab.dev";
const EMAIL = "zerobuildlab@gmail.com";
const GITHUB = "https://github.com/winduadiprabowo-pixel";
const STUDIO = "https://zerobuildlab.dev";
const OG_IMAGE = `${SITE_URL}/og-image.jpg`;

const SPRINT_1 =
  "https://birdeye.so/data-api/blog/detail/birdeye-data-build-in-public-sprint-1-results";
const SPRINT_2 =
  "https://birdeye.so/data-api/blog/detail/birdeye-data-build-in-public-sprint-2-results";

const PERSON_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Windu Adi Prabowo",
  url: SITE_URL,
  jobTitle: "Full-Stack Developer",
  email: `mailto:${EMAIL}`,
  sameAs: [GITHUB],
  address: { "@type": "PostalAddress", addressCountry: "ID" },
  knowsAbout: [
    "React",
    "TypeScript",
    "Supabase",
    "PostgreSQL",
    "Shopify integration",
    "Progressive Web Apps",
    "Cloudflare Workers",
  ],
  award: [
    "3rd Place, Birdeye Data Build in Public Sprint 1, 2026",
    "Honorable Mention, Birdeye Data Build in Public Sprint 2, 2026",
  ],
};

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Zero Build Lab — Full-Stack Developer Who Ships and Operates" },
      {
        name: "description",
        content:
          "Independent full-stack developer building and operating production web apps solo — auth, payments, webhooks, email deliverability, domains and offline support.",
      },
      { property: "og:title", content: "Zero Build Lab — Ships. Then stays shipped." },
      {
        property: "og:description",
        content:
          "Production web apps and the infrastructure underneath them. Built and operated solo for founders in the UK, EU and US.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Zero Build Lab — Ships. Then stays shipped." },
      {
        name: "twitter:description",
        content:
          "Independent full-stack developer. Auth, payments, webhooks, email, domains — built and operated solo.",
      },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: SITE_URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(PERSON_SCHEMA),
      },
    ],
  }),
});

function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || shown) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "-10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [shown]);

  return (
    <div ref={ref} className={`reveal ${shown ? "reveal-in" : ""} ${className}`}>
      {children}
    </div>
  );
}

const Shell = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <div className={`mx-auto w-full max-w-[1180px] px-6 sm:px-10 ${className}`}>{children}</div>
);

/* verifiable outbound link: ink text, signal underline that thickens */
function Verify({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="underline decoration-signal decoration-1 underline-offset-4 hover:decoration-2"
    >
      {children}
    </a>
  );
}

function BreakRow({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 border-t border-steel/60 py-6">
      <span aria-hidden="true" className="label mt-1 shrink-0 text-fault">
        &#9587;
      </span>
      <div>
        <p className="label mb-2 text-steel">Break</p>
        <p className="prose-body text-steel">{children}</p>
      </div>
    </div>
  );
}

function BuildRow({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 border-t-2 border-signal py-6">
      <span aria-hidden="true" className="label mt-1 shrink-0 text-signal">
        &#9656;
      </span>
      <div>
        <p className="label mb-2 text-signal">Build</p>
        <div className="prose-body text-ink">{children}</div>
      </div>
    </div>
  );
}

function ScoreTable({ rows }: { rows: [string, string][] }) {
  return (
    <table className="mt-8 w-full border-collapse">
      <caption className="sr-only">Scores awarded by Birdeye Data, out of 10 per pillar</caption>
      <tbody>
        {rows.map(([metric, score]) => {
          const perfect = score === "10.0";
          return (
            <tr key={metric} className="border-t border-steel/50">
              <th scope="row" className="label py-3 text-left font-normal text-steel">
                {metric}
              </th>
              <td
                className={`py-3 text-right font-mono text-[15px] tabular-nums ${
                  perfect ? "font-medium text-signal" : "text-ink"
                }`}
              >
                {score}
                {perfect ? <span className="sr-only"> — perfect score</span> : null}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function SprintPanel({
  eyebrow,
  heading,
  rows,
  quote,
  attribution,
}: {
  eyebrow: string;
  heading: string;
  rows: [string, string][];
  quote: string;
  attribution: string;
}) {
  return (
    <div className="border-[1.5px] border-ink bg-panel p-6 sm:p-10">
      <p className="label rail text-steel">{eyebrow}</p>
      <p className="display rail mt-3 text-[clamp(1.5rem,4vw,2.6rem)] text-ink">{heading}</p>
      <ScoreTable rows={rows} />
      <p className="mt-8 max-w-[46ch] font-display text-[clamp(1.15rem,2.4vw,1.6rem)] leading-snug font-extrabold text-ink">
        {quote}
      </p>
      <p className="label mt-4 text-steel">{attribution}</p>
    </div>
  );
}

function Work({
  num,
  title,
  breakText,
  build,
  detail,
  metrics,
  stack,
}: {
  num: string;
  title: string;
  breakText: string;
  build: ReactNode;
  detail?: ReactNode;
  metrics?: string;
  stack: string;
}) {
  return (
    <Reveal className="border-t-2 border-ink pt-8">
      <article className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <div className="order-2 md:order-1">
          <BreakRow>{breakText}</BreakRow>
          <BuildRow>{build}</BuildRow>
          {detail ? (
            <p className="prose-body border-t border-steel/60 pt-6 text-ink">{detail}</p>
          ) : null}
        </div>
        <div className="order-1 md:order-2">
          <p className="label rail text-steel">{num}</p>
          <h3 className="display rail mt-2 text-[clamp(2rem,6vw,3.75rem)] text-ink">{title}</h3>
          {metrics ? <p className="label rail mt-5 text-signal">{metrics}</p> : null}
          <p className="label rail mt-4 text-steel">{stack}</p>
        </div>
      </article>
    </Reveal>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-ground text-ink">
      <a
        href="#work"
        className="label sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:border-[1.5px] focus:border-ink focus:bg-panel focus:px-4 focus:py-2 focus:text-ink"
      >
        Skip to work
      </a>

      <header className="pt-8">
        <Shell>
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-4 pb-4">
            <p className="label text-ink">Zero Build Lab</p>
            <nav aria-label="Primary">
              <ul className="flex flex-wrap items-baseline justify-end gap-x-5 gap-y-2">
                {[
                  ["Work", "#work"],
                  ["Approach", "#approach"],
                  ["Contact", "#contact"],
                ].map(([l, h]) => (
                  <li key={h}>
                    <a href={h} className="label text-ink hover:text-signal">
                      {l}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href={STUDIO}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="label text-steel hover:text-signal"
                  >
                    Studio <span aria-hidden="true">&#8599;</span>
                    <span className="sr-only">(opens the studio site in a new tab)</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="h-[2px] w-full bg-ink" />
        </Shell>
      </header>

      <main>
        {/* HERO */}
        <section className="pt-16 pb-24 sm:pt-24">
          <Shell>
            <h1 className="display rail text-[clamp(3rem,13vw,9rem)] text-ink">
              Ships. Then
              <br />
              stays shipped.
            </h1>
            <div className="mt-12 grid gap-10 md:grid-cols-2">
              <div>
                <p className="prose-body text-ink">
                  Production web apps and the infrastructure underneath them — auth, payments,
                  webhooks, email, domains. Built and operated solo.
                </p>
              </div>
              <p className="label rail self-end text-signal">
                6+ Live products · 200+ Paying users · Zero marketing spend
              </p>
            </div>
            <div className="mt-10 grid md:grid-cols-2">
              <p className="prose-body border-[1.5px] border-ink bg-panel p-6 text-ink">
                A UK children&apos;s play brand hired me for a 30-day build. I delivered it in nine
                days, rated 5.0, and I still run the infrastructure it depends on.
              </p>
            </div>
          </Shell>
        </section>

        {/* RECOGNITION — two independent evaluations */}
        <section aria-labelledby="recognition" className="pb-24">
          <Shell>
            <p className="label rail text-steel">Third-party evaluation</p>
            <h2
              id="recognition"
              className="display rail mt-2 mb-10 text-[clamp(2.2rem,7vw,4.5rem)] text-ink"
            >
              Judged twice.
              <br />
              Scored publicly.
            </h2>

            <p className="prose-body mb-10 text-ink">
              Birdeye Data ran an open build-in-public sprint series, scored by their team across
              four pillars. ZeroSniper placed in both.
            </p>

            <div className="grid gap-8 lg:grid-cols-2">
              <SprintPanel
                eyebrow="Sprint 1 · April 2026 · 46 submissions"
                heading="3rd Place — 31.8 / 40"
                rows={[
                  ["Technical depth", "8.5"],
                  ["Product utility", "8.5"],
                  ["Presentation", "10.0"],
                  ["Community", "4.8"],
                ]}
                quote="ZeroSniper is the most polished full-stack build in the sprint."
                attribution="Birdeye Data · Sprint 1 results"
              />
              <SprintPanel
                eyebrow="Sprint 2 · Honorable mention"
                heading="4th — 30.6 / 40"
                rows={[
                  ["Technical depth", "10.0"],
                  ["Product utility", "10.0"],
                  ["Presentation", "8.5"],
                  ["Community", "2.1"],
                ]}
                quote="A masterclass in leveraging the Birdeye Data API, with an elite 10.0/10 in Technical Depth."
                attribution="Birdeye Data · Sprint 2 results"
              />
            </div>

            <p className="label-lg rail mt-8 text-ink">
              Verify → <Verify href={SPRINT_1}>Sprint 1</Verify>
              <span className="mx-2 text-steel">·</span>
              <Verify href={SPRINT_2}>Sprint 2</Verify>
            </p>
          </Shell>
        </section>

        {/* WORK */}
        <section id="work" aria-labelledby="work-h" className="pb-24">
          <Shell>
            <p className="label rail text-steel">Section 01</p>
            <h2 id="work-h" className="display rail mt-2 mb-14 text-[clamp(2.5rem,8vw,5.5rem)]">
              Selected work
            </h2>

            <div className="flex flex-col gap-16">
              <Work
                num="01"
                title="Order to access"
                breakText="A customer pays for a physical product and receives nothing, because no link exists between the shop and the app."
                build={
                  <span>
                    Five steps: order placed → webhook fires → matched to the buyer → access granted
                    → unlocked in the app.
                  </span>
                }
                detail={
                  <>
                    Idempotent by design. Survives retries, duplicate webhooks, refunds, and buyers
                    who order before they have an account. Postgres row-level security, role
                    separation for admin and licensed-brand partners, and branded transactional
                    email with DKIM and SPF. Delivered pixel-accurate from Figma, working alongside
                    the client&apos;s existing design team.
                  </>
                }
                metrics="30-day scope in 9 days · Rated 5.0 · Still operated"
                stack="React 18 · TypeScript · Supabase · Postgres · Shopify · PWA · Cloudflare · Resend"
              />
              <Work
                num="02"
                title="Zerø Sniper"
                breakText="Traders acting on information that is already stale."
                build={
                  <span>
                    Real-time Solana token intelligence at the edge, with an automated rug-risk
                    engine and a transparent per-deduction breakdown, plus four independent AI agents
                    and fifteen-pattern candlestick recognition. Custom SVG charts, zero charting
                    libraries. Sub-50ms edge inference.
                  </span>
                }
                metrics="224 Commits in one sprint · 50+ Paying users · $19 Lifetime"
                stack="Cloudflare Workers · Workers AI (Llama 3 8B) · SSE · Birdeye · Helius · Jupiter · PWA"
              />
              <Work
                num="03"
                title="Zerø Order Book"
                breakText="Order flow fragmented across exchanges, arriving too late to act on."
                build={
                  <span>
                    Simultaneous WebSocket feeds from three exchanges aggregated at sub-100ms through
                    a Singapore edge proxy. Custom render pipeline holding 60fps on low-end mobile.
                  </span>
                }
                metrics="80+ Users · $9"
                stack="TypeScript · Cloudflare Workers · WebSocket · Lightweight Charts · Web Workers"
              />
              <Work
                num="04"
                title="Zerø Watch Monitor"
                breakText="Large wallet movements noticed only after the move."
                build={
                  <span>
                    Whale analytics across five chains, fully client-side, with browser push alerts
                    and anti-spam cooldown.
                  </span>
                }
                metrics="70+ Users · $9"
                stack="Etherscan V2 · Solana RPC · Zustand · TanStack Query"
              />
            </div>

            <p className="label rail mt-14 text-steel">
              Also shipped — Dapur OS · Zerø Clip · Core Meridian
            </p>
            <p className="label-lg rail mt-3 text-ink">
              <Verify href={STUDIO}>The full studio →</Verify>
            </p>
          </Shell>
        </section>

        {/* APPROACH */}
        <section id="approach" aria-labelledby="approach-h" className="pb-24">
          <Shell>
            <p className="label rail text-steel">Section 02</p>
            <h2 id="approach-h" className="display rail mt-2 mb-12 text-[clamp(2.5rem,8vw,5.5rem)]">
              Approach
            </h2>
            <ol className="flex flex-col">
              {[
                "Tell me what is broken. I will tell you what I actually think is going on, before any money changes hands. That first answer is free, and it is usually the most useful part.",
                "Scope agreed in writing before anything is paid. No surprises in either direction.",
                "I ship it, then I keep it alive. Ongoing support is part of the arrangement, not an afterthought.",
              ].map((text, i) => (
                <li
                  key={i}
                  className="grid gap-4 border-t-2 border-ink py-8 md:grid-cols-[minmax(0,1fr)_auto] md:gap-14"
                >
                  <p className="prose-body order-2 text-ink md:order-1">{text}</p>
                  <span className="order-1 font-mono text-[clamp(2.5rem,7vw,4.5rem)] leading-none tracking-tight text-signal md:order-2">
                    0{i + 1}
                  </span>
                </li>
              ))}
            </ol>
          </Shell>
        </section>

        {/* STACK */}
        <section aria-labelledby="stack-h" className="pb-24">
          <Shell>
            <p className="label rail text-steel">Section 03</p>
            <h2 id="stack-h" className="display rail mt-2 mb-10 text-[clamp(2.5rem,8vw,5.5rem)]">
              Stack
            </h2>
            <div className="rail border-t-2 border-ink pt-8">
              {[
                "TypeScript · React 18 · Vite · Tailwind",
                "Supabase · Postgres · RLS · Node.js · Express",
                "Shopify · Webhooks · Resend · DKIM · SPF · DMARC",
                "Cloudflare Pages · Workers · KV · Edge Proxy",
                "WebSocket · SSE · Web Workers · WebAssembly · PWA",
              ].map((line) => (
                <p key={line} className="label-lg py-2 text-ink">
                  {line}
                </p>
              ))}
            </div>
          </Shell>
        </section>

        {/* CONTACT */}
        <section id="contact" aria-labelledby="contact-h" className="pb-24">
          <Shell>
            <h2 id="contact-h" className="display rail text-[clamp(2.5rem,9vw,6.5rem)]">
              Describe what is broken.
            </h2>
            <div className="mt-10 grid gap-8 md:grid-cols-2">
              <p className="prose-body text-ink">
                I will reply with what I think is actually happening.
              </p>
              <p className="label-lg rail self-end text-ink">
                <Verify href={`mailto:${EMAIL}`}>{EMAIL}</Verify>
                <span className="mx-3 text-steel">·</span>
                <Verify href={GITHUB}>GitHub</Verify>
              </p>
            </div>
          </Shell>
        </section>
      </main>

      <footer className="border-t-2 border-ink py-8">
        <Shell>
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-4">
            <p className="label text-ink">Zero Build Lab</p>
            <p className="label text-steel">Indonesia · All timezones</p>
          </div>
        </Shell>
      </footer>
    </div>
  );
}
