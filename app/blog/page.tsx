import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { posts, readingTime, formatDate } from "@/data/blog";
import { absoluteUrl, site, socialImage } from "@/lib/site";

export const metadata: Metadata = {
  title: "Journal — Design, Code & Motion",
  description: "Notes on creative development, responsive interfaces, and purposeful motion. Read the journal by Mubbashir Hussain.",
  alternates: { canonical: "/blog" },
  openGraph: { title: "The Journal | Mubbashir Hussain", description: "Thoughts at the intersection of design, code, and motion.", url: "/blog", type: "website", images: [socialImage] },
};

export default function BlogPage() {
  const [featured, ...rest] = posts;
  const schema = { "@context": "https://schema.org", "@type": "Blog", name: "Mubbashir's Journal", url: absoluteUrl("/blog"), author: { "@type": "Person", name: site.name }, blogPost: posts.map(post => ({ "@type": "BlogPosting", headline: post.title, url: absoluteUrl(`/blog/${post.slug}`), datePublished: post.published })) };
  return (
    <main id="main-content" className="journal-page min-h-screen px-5 pb-12 pt-32 sm:px-8 lg:px-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\u003c") }} />
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between border-b border-text/20 pb-5 text-xs uppercase tracking-[0.18em] text-text-muted">
          <span>Field notes / Vol. 01</span><span>Design · Code · Motion</span>
        </div>
        <header className="grid gap-8 py-10 sm:py-16 lg:grid-cols-[1fr_320px] lg:items-end">
          <div><p className="mb-5 text-sm text-text-muted">A place to think out loud.</p><h1 className="journal-title">The journal<span className="text-primary">.</span></h1></div>
          <div className="flex gap-5 items-end"><p className="max-w-xs text-base leading-relaxed text-text-secondary">Ideas, experiments, and small discoveries from the space between design and development.</p><ArrowDownRight size={38} className="shrink-0 text-text-muted" aria-hidden="true" /></div>
        </header>
        <Link href={`/blog/${featured.slug}`} className="journal-feature group grid overflow-hidden rounded-[2rem] border border-text/15 lg:grid-cols-[1.05fr_1fr]" aria-label={`Read ${featured.title}`}>
          <div className="journal-art relative flex min-h-72 items-center justify-center overflow-hidden p-8 sm:min-h-96" aria-hidden="true">
            <div className="journal-orbit orbit-one" /><div className="journal-orbit orbit-two" /><div className="journal-orbit orbit-three" />
            <span className="absolute left-7 top-6 font-mono text-xs uppercase tracking-widest">Ideas in motion</span>
            <span className="relative text-[5rem] sm:text-[8rem] font-semibold tracking-tighter leading-none">move<span className="align-top text-3xl">↗</span></span>
            <span className="absolute right-7 bottom-6 font-mono text-xs">001 — MAKE IT MEAN SOMETHING</span>
          </div>
          <div className="flex flex-col justify-between gap-10 p-7 sm:p-10 lg:p-12">
            <div className="flex items-center justify-between gap-4"><span className="journal-tag">Featured / {featured.category}</span><ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform shrink-0" aria-hidden="true" /></div>
            <div><h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.08] tracking-tight">{featured.title}</h2><p className="mt-5 max-w-md text-text-secondary leading-relaxed">{featured.description}</p></div>
            <div className="flex flex-wrap gap-x-4 gap-y-2 font-mono text-xs text-text-muted"><time dateTime={featured.published}>{formatDate(featured.published)}</time><span>•</span><span>{readingTime(featured)}</span></div>
          </div>
        </Link>
        <section aria-labelledby="latest-title" className="mt-16 sm:mt-24">
          <div className="flex items-baseline justify-between border-b border-text/20 pb-5"><h2 id="latest-title" className="text-2xl font-semibold tracking-tight">More from the notebook</h2><span className="font-mono text-xs text-text-muted">{String(rest.length).padStart(2, "0")} ENTRY</span></div>
          {rest.map(post => <Link key={post.slug} href={`/blog/${post.slug}`} className="journal-row group grid grid-cols-[1fr_auto] gap-6 border-b border-text/20 py-8 sm:grid-cols-[60px_1fr_auto] sm:py-10">
            <span className="hidden sm:block font-mono text-sm text-text-muted">/{post.number}</span>
            <div><span className="text-xs uppercase tracking-widest text-text-muted">{post.category}</span><h3 className="mt-3 max-w-3xl text-2xl sm:text-4xl font-medium tracking-tight">{post.title}</h3><p className="mt-3 max-w-2xl text-text-secondary leading-relaxed">{post.description}</p><p className="mt-5 font-mono text-xs text-text-muted">{formatDate(post.published)} · {readingTime(post)}</p></div>
            <ArrowUpRight size={28} className="mt-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" aria-hidden="true" />
          </Link>)}
        </section>
        <footer className="mt-20 flex flex-col gap-6 border-t border-text/20 pt-6 sm:flex-row sm:items-center sm:justify-between"><p className="text-sm text-text-muted">Curiosity is part of the process.</p><Link href="/#contact" className="inline-flex items-center gap-2 text-sm font-medium">Have something in mind? Let’s talk <ArrowUpRight size={16} aria-hidden="true" /></Link></footer>
      </div>
    </main>
  );
}
