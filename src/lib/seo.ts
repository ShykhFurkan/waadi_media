import { Metadata } from 'next';

export const SITE_CONFIG = {
    name: 'Waadi Media',
    tagline: 'Social Media, Website, Mobile App & Software Development Agency in Kashmir',
    domain: 'https://www.waadimedia.com',
    email: 'hello@waadimedia.com',
    phone: '+91-9876543210',
    address: {
        city: 'Srinagar',
        state: 'Jammu & Kashmir',
        country: 'India',
        region: 'IN-JK'
    },
    socials: {
        instagram: 'https://www.instagram.com/waadi_media',
        linkedin: 'https://www.linkedin.com/in/shykh-furkan-1193b4249',
        twitter: 'https://x.com/shykh_furkan'
    }
};

export function generateSeoMetadata({
    title,
    description,
    path = '',
    image = '/logo.png',
    noIndex = false
}: {
    title: string;
    description: string;
    path?: string;
    image?: string;
    noIndex?: boolean;
}): Metadata {
    const url = `${SITE_CONFIG.domain}${path}`;
    const fullTitle = `${title} | Waadi Media Kashmir`;

    return {
        metadataBase: new URL(SITE_CONFIG.domain),
        title: fullTitle,
        description,
        authors: [{ name: 'Waadi Media Team' }],
        creator: 'Waadi Media',
        publisher: 'Waadi Media',
        icons: {
            icon: '/icon.png',
            shortcut: '/favicon.ico',
            apple: '/apple-icon.png',
        },
        alternates: {
            canonical: url,
        },
        openGraph: {
            type: 'website',
            locale: 'en_IN',
            siteName: SITE_CONFIG.name,
            url,
            title: fullTitle,
            description,
            images: [
                {
                    url: image,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: fullTitle,
            description,
            images: [image],
            creator: '@waadi_media',
        },
        robots: {
            index: !noIndex,
            follow: !noIndex,
            googleBot: {
                index: !noIndex,
                follow: !noIndex,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
    };
}

export function generateOrganizationSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'ProfessionalService',
        name: SITE_CONFIG.name,
        url: SITE_CONFIG.domain,
        logo: `${SITE_CONFIG.domain}/logo.png`,
        image: `${SITE_CONFIG.domain}/logo.png`,
        description: 'Waadi Media is a premier Kashmir-based agency offering Website Development, Mobile App & Software Engineering, Social Media Marketing, and Business Automations.',
        address: {
            '@type': 'PostalAddress',
            addressLocality: SITE_CONFIG.address.city,
            addressRegion: SITE_CONFIG.address.state,
            addressCountry: SITE_CONFIG.address.country
        },
        geo: {
            '@type': 'GeoCoordinates',
            latitude: '34.0837',
            longitude: '74.7973'
        },
        areaServed: [
            { '@type': 'Place', name: 'Srinagar, Kashmir' },
            { '@type': 'Place', name: 'Jammu & Kashmir, India' },
            { '@type': 'Country', name: 'India' }
        ],
        sameAs: [
            SITE_CONFIG.socials.instagram,
            SITE_CONFIG.socials.linkedin,
            SITE_CONFIG.socials.twitter
        ],
        contactPoint: {
            '@type': 'ContactPoint',
            telephone: SITE_CONFIG.phone,
            contactType: 'customer service',
            areaServed: 'IN',
            availableLanguage: ['en', 'hi', 'ks']
        },
        knowsAbout: [
            'Website Design and Development',
            'Software and Mobile App Development',
            'SaaS Product Engineering',
            'Social Media Marketing',
            'Business Automations & AI',
            'Digital Marketing and Ads'
        ]
    };
}

export function generateServiceSchema({ name, description, path }: { name: string; description: string; path: string }) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Service',
        serviceType: name,
        provider: {
            '@type': 'LocalBusiness',
            name: SITE_CONFIG.name,
            url: SITE_CONFIG.domain,
        },
        areaServed: {
            '@type': 'Place',
            name: 'Kashmir, Jammu & Kashmir, India',
        },
        name,
        description,
        url: `${SITE_CONFIG.domain}${path}`,
    };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: `${SITE_CONFIG.domain}${item.url}`,
        })),
    };
}

export function generateFaqSchema(faqs: { q: string; a: string }[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.q,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.a,
            },
        })),
    };
}
