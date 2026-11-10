import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { posts, getPost, readingTime, formatDate } from "@/data/blog";
import { absoluteUrl, site, socialImage } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export const generateStaticParams = () => posts.map(post => ({ slug: post.slug }));
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) notFound();
  return {
    title: post.title, description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { title: post.title, description: post.description, url: `/blog/${post.slug}`, type: "article", publishedTime: post.published, authors: [site.name], images: [socialImage] },
    twitter: { card: "summary_large_image", title: post.title, description: post.description, images: [socialImage.url] },
  };
}
export default async function ArticlePage({ params }: Props) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  const related = posts.find(item => item.slug !== post.slug);
  const schema = { "@context": "https://schema.org", "@type": "BlogPosting", headline: post.title, description: post.description, datePublished: post.published,
    author: { "@type": "Person", name: site.name, url: site.url }, mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`), image: absoluteUrl("/opengraph-image"), inLanguage: "en" };
  return (
    <main id="main-content" className="journal-page min-h-screen px-5 pb-16 pt-32 sm:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\u003c") }} />
      <article className="mx-auto max-w-3xl">
        <Link href="/blog" className="inline-flex min-h-11 items-center gap-2 text-sm text-text-muted hover:text-text"><ArrowLeft size={16} aria-hidden="true" />Back to the journal</Link>
        <header className="border-b border-text/20 pb-10 pt-8"><span className="journal-tag">{post.category}</span><h1 className="mt-7 text-4xl sm:text-6xl font-semibold tracking-tighter leading-[1.08]">{post.title}</h1><p className="mt-7 text-xl leading-relaxed text-text-secondary">{post.description}</p><div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 font-mono text-xs text-text-muted"><span>By {site.name}</span><time dateTime={post.published}>{formatDate(post.published)}</time><span>{readingTime(post)}</span></div></header>
        <nav aria-label="On this page" className="my-10 rounded-2xl border border-text/15 p-6"><p className="mb-3 text-xs uppercase tracking-widest text-text-muted">In this entry</p><ol className="space-y-2 text-sm">{post.sections.map((section, i) => <li key={section.heading}><a className="inline-flex min-h-8 items-center hover:underline" href={`#section-${i + 1}`}>{String(i + 1).padStart(2, "0")} / {section.heading}</a></li>)}</ol></nav>
        <div className="journal-prose">{post.sections.map((section, i) => <section key={section.heading} aria-labelledby={`section-${i + 1}`}><h2 id={`section-${i + 1}`}>{section.heading}</h2>{section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</section>)}</div>
        {related && <aside className="mt-16 border-t border-text/20 pt-8"><p className="text-xs uppercase tracking-widest text-text-muted">Keep exploring</p><Link href={`/blog/${related.slug}`} className="mt-4 flex items-start justify-between gap-6 text-2xl font-medium tracking-tight">{related.title}<ArrowUpRight className="shrink-0" aria-hidden="true" /></Link></aside>}
      </article>
    </main>
  );
}
