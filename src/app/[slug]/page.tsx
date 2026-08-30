import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { SEO_TOOLS, SeoToolData } from '@/lib/seo-data';
import { ToolLandingView } from '@/components/ToolLandingView';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(SEO_TOOLS).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool: SeoToolData | undefined = SEO_TOOLS[slug];

  if (!tool) {
    return {
      title: 'Page Not Found – Downly',
      description: 'The requested downloader page could not be found.',
    };
  }

  const canonicalUrl = `https://downly.media/${tool.slug}`;

  return {
    title: `${tool.title} | Downly`,
    description: tool.metaDescription,
    keywords: tool.keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${tool.title} | Downly`,
      description: tool.metaDescription,
      url: canonicalUrl,
      siteName: 'Downly',
      type: 'website',
      images: [
        {
          url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
          width: 1200,
          height: 630,
          alt: tool.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${tool.title} | Downly`,
      description: tool.metaDescription,
      creator: '@downly',
    },
  };
}

export default async function ToolPage({ params }: PageProps) {
  const { slug } = await params;
  const tool = SEO_TOOLS[slug];

  if (!tool) {
    notFound();
  }

  return <ToolLandingView tool={tool} />;
}
