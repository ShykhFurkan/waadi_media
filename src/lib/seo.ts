import { siteConfig } from '@/config/site';

export function getProfessionalServiceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: siteConfig.name,
    image: `${siteConfig.url}/logo.png`,
    logo: `${siteConfig.url}/logo.png`,
    url: siteConfig.url,
    telephone: '+917780940317',
    email: siteConfig.contact.email,
    priceRange: '₹₹',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Anantnag',
      addressRegion: 'Jammu and Kashmir',
      addressCountry: 'India',
    },
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Jammu and Kashmir' },
      { '@type': 'Country', name: 'India' },
    ],
    founder: {
      '@type': 'Person',
      name: 'Furkan Mushtaq',
    },
    foundingDate: '2026',
  };
}

export function getWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.tagline,
  };
}

export function getServiceSchema(service: {
  name: string;
  slug: string;
  intro: string;
  startingPrice: number;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.intro,
    url: `${siteConfig.url}/services/${service.slug}`,
    provider: {
      '@type': 'ProfessionalService',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    areaServed: {
      '@type': 'Country',
      name: 'India',
    },
    offers: {
      '@type': 'Offer',
      price: service.startingPrice,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
    },
  };
}

export function getFaqPageSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${siteConfig.url}${item.url}`,
    })),
  };
}

export function getCreativeWorkSchema(project: {
  name: string;
  slug: string;
  summary: string;
  sector: string;
  liveUrl: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.name,
    headline: project.name,
    description: project.summary,
    genre: project.sector,
    url: `${siteConfig.url}/work/${project.slug}`,
    sameAs: project.liveUrl,
    creator: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
}

export function getLocalBusinessSchema() {
  return getProfessionalServiceSchema();
}

export function getArticleSchema(post: {
  title: string;
  slug: string;
  description: string;
  date: string;
  updated?: string;
  author: string;
  category: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    image: `${siteConfig.url}/blog/${post.slug}/opengraph-image`,
    datePublished: post.date,
    dateModified: post.updated || post.date,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteConfig.url}/blog/${post.slug}`,
    },
  };
}
