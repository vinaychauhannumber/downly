import React from 'react';

interface FaqItem {
  question: string;
  answer: string;
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface HowToStep {
  name: string;
  text: string;
}

interface StructuredDataProps {
  type?: 'website' | 'webapplication' | 'faq' | 'article' | 'howto';
  faqItems?: FaqItem[];
  breadcrumbs?: BreadcrumbItem[];
  article?: {
    headline: string;
    description: string;
    datePublished: string;
    url: string;
  };
  howTo?: {
    name: string;
    description: string;
    steps: HowToStep[];
  };
  appName?: string;
  appDescription?: string;
  appUrl?: string;
}

export function StructuredData({
  faqItems,
  breadcrumbs,
  article,
  howTo,
  appName = 'Downly',
  appDescription = 'Free online media processor and video downloader for public Instagram Reels and YouTube videos.',
  appUrl = 'https://downly.media',
}: StructuredDataProps) {
  const schemas: object[] = [];

  // WebApplication Schema
  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: appName,
    url: appUrl,
    description: appDescription,
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  });

  // BreadcrumbList Schema
  if (breadcrumbs && breadcrumbs.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((item, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: item.name,
        item: item.url,
      })),
    });
  }

  // FAQPage Schema
  if (faqItems && faqItems.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqItems.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    });
  }

  // HowTo Schema
  if (howTo && howTo.steps && howTo.steps.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: howTo.name,
      description: howTo.description,
      step: howTo.steps.map((step, idx) => ({
        '@type': 'HowToStep',
        position: idx + 1,
        name: step.name,
        text: step.text,
      })),
    });
  }

  // Article Schema
  if (article) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: article.headline,
      description: article.description,
      datePublished: article.datePublished,
      dateModified: article.datePublished,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': article.url,
      },
      author: {
        '@type': 'Organization',
        name: 'Downly Media Editorial',
        url: 'https://downly.media',
      },
      publisher: {
        '@type': 'Organization',
        name: 'Downly',
        url: 'https://downly.media',
        logo: {
          '@type': 'ImageObject',
          url: 'https://downly.media/favicon.svg',
        },
      },
    });
  }

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
