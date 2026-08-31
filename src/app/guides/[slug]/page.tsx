import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { GUIDES_DATA, GuideData } from '@/lib/guides-data';
import { SEO_TOOLS } from '@/lib/seo-data';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { StructuredData } from '@/components/StructuredData';
import { AdBanner } from '@/components/AdBanner';
import {
  Clock,
  Calendar,
  ArrowRight,
  Download,
  CheckCircle2,
  HelpCircle,
  Sparkles,
} from 'lucide-react';

interface GuidePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(GUIDES_DATA).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide: GuideData | undefined = GUIDES_DATA[slug];

  if (!guide) {
    return {
      title: 'Guide Not Found – Downly',
      description: 'The requested guide could not be found.',
    };
  }

  const canonicalUrl = `https://downly.media/guides/${guide.slug}`;

  return {
    title: `${guide.title} | Downly Guide`,
    description: guide.metaDescription,
    keywords: guide.keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${guide.title} | Downly Guide`,
      description: guide.metaDescription,
      url: canonicalUrl,
      siteName: 'Downly',
      type: 'article',
      publishedTime: guide.publishedDate,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${guide.title} | Downly Guide`,
      description: guide.metaDescription,
      creator: '@downly',
    },
  };
}

export default async function GuideArticlePage({ params }: GuidePageProps) {
  const { slug } = await params;
  const guide = GUIDES_DATA[slug];

  if (!guide) {
    notFound();
  }

  const relatedTool = SEO_TOOLS[guide.relatedToolSlug];

  const breadcrumbs = [
    { name: 'Guides', url: '/guides' },
    { name: guide.h1, url: `/guides/${guide.slug}` },
  ];

  return (
    <div className="min-h-screen bg-[#08090d] text-slate-100 flex flex-col bg-grid-pattern selection:bg-cyan-500 selection:text-black">
      {/* Schema.org Structured Data */}
      <StructuredData
        appName={`Downly – ${guide.h1}`}
        appDescription={guide.metaDescription}
        appUrl={`https://downly.media/guides/${guide.slug}`}
        breadcrumbs={breadcrumbs}
        faqItems={guide.faqs}
        article={{
          headline: guide.h1,
          description: guide.metaDescription,
          datePublished: guide.publishedDate,
          url: `https://downly.media/guides/${guide.slug}`,
        }}
        howTo={
          guide.steps && guide.steps.length > 0
            ? {
                name: guide.h1,
                description: guide.summary,
                steps: guide.steps,
              }
            : undefined
        }
      />

      <Header />

      <main className="flex-1">
        <div className="pt-2">
          <Breadcrumbs items={breadcrumbs} />
        </div>

        {/* Article Header */}
        <article className="max-w-4xl mx-auto px-4 pt-6 pb-20">
          <header className="space-y-4 mb-10 pb-8 border-b border-white/10">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-cyan-500/15 text-cyan-400 text-xs font-semibold uppercase">
                {guide.category} Guide
              </span>
              <div className="flex items-center gap-1 text-xs text-slate-400">
                <Clock className="w-3.5 h-3.5" />
                <span>{guide.readTime}</span>
              </div>
              <span className="text-slate-600">•</span>
              <div className="flex items-center gap-1 text-xs text-slate-400">
                <Calendar className="w-3.5 h-3.5" />
                <span>Updated {guide.publishedDate}</span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              {guide.h1}
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              {guide.summary}
            </p>

            {/* Direct Tool Launch Callout */}
            {relatedTool && (
              <div className="p-5 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-slate-900 to-purple-950/40 border border-cyan-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <span>Try the Online {relatedTool.h1}</span>
                  </h3>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Fast, secure, and completely free in your browser.
                  </p>
                </div>
                <Link
                  href={`/${relatedTool.slug}`}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-colors shrink-0"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Launch Tool</span>
                </Link>
              </div>
            )}
          </header>

          {/* Top In-Article Ad Unit */}
          <AdBanner slot="1000000004" label="Advertisement" />

          {/* Body Sections */}
          <div className="space-y-10 text-slate-300 text-sm sm:text-base leading-relaxed">
            {guide.sections.map((section, idx) => (
              <section key={idx} className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {section.heading}
                </h2>
                {section.content.map((para, pIdx) => (
                  <p key={pIdx} className="text-slate-300">
                    {para}
                  </p>
                ))}
                {section.tips && (
                  <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs sm:text-sm space-y-1">
                    {section.tips.map((tip, tIdx) => (
                      <p key={tIdx} className="font-medium">
                        {tip}
                      </p>
                    ))}
                  </div>
                )}
              </section>
            ))}

            {/* Structured Step-by-Step Box */}
            {guide.steps && guide.steps.length > 0 && (
              <section className="p-6 rounded-2xl bg-slate-950/70 border border-white/10 space-y-4">
                <h2 className="text-lg font-bold text-white">
                  Quick Step-by-Step Overview
                </h2>
                <div className="space-y-3">
                  {guide.steps.map((st, sIdx) => (
                    <div key={sIdx} className="flex items-start gap-3 text-xs sm:text-sm">
                      <div className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                        {sIdx + 1}
                      </div>
                      <div>
                        <strong className="text-white block">{st.name}</strong>
                        <span className="text-slate-400">{st.text}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* FAQs */}
            {guide.faqs.length > 0 && (
              <section className="space-y-4 pt-6 border-t border-white/10">
                <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-cyan-400" />
                  <span>Frequently Asked Questions</span>
                </h2>
                <div className="space-y-3">
                  {guide.faqs.map((faq, fIdx) => (
                    <div
                      key={fIdx}
                      className="p-4 rounded-xl bg-slate-950/60 border border-white/10 space-y-1.5"
                    >
                      <h3 className="text-sm font-semibold text-white">
                        {faq.question}
                      </h3>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Bottom Navigation */}
          <footer className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              href="/guides"
              className="text-xs text-slate-400 hover:text-white transition-colors"
            >
              ← Back to all guides
            </Link>

            {relatedTool && (
              <Link
                href={`/${relatedTool.slug}`}
                className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-cyan-300"
              >
                <span>Use {relatedTool.h1}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </footer>
        </article>
      </main>

      <Footer />
    </div>
  );
}
