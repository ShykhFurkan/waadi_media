export type Project = {
  slug: string;
  name: string;
  sector: string;
  liveUrl: string;
  summary: string;
  services: string[];
  overview: string;
  challenge: string;
  whatWeDid: string;
  highlights: string[];
  results?: string[]; // Kept undefined per Rule 1 until real verified data exists
  quote?: { quote: string; name: string; business: string; role?: string }; // Kept undefined until provided
  coverImage: string;
  featured: boolean;
  badge?: string;
};

export const projectsData: Project[] = [
  {
    slug: 'wonder-delight-tours-travels',
    name: 'Wonder Delight Tours & Travels',
    sector: 'Tourism',
    liveUrl: 'https://wonderdelighttravels.com/',
    summary:
      'A complete website and custom CMS for a Kashmir tour and travel agency, built quickly with strong SEO and a clean booking-focused design.',
    services: ['Website design and development', 'SEO', 'Custom CMS'],
    overview:
      'Wonder Delight Tours & Travels plans Kashmir trips: tour packages, hotels, private transport and local guides. They needed a website that makes planning a trip feel easy and trustworthy.',
    challenge:
      'Visitors planning a Kashmir trip compare many agencies in minutes. The site had to load fast, explain packages clearly, and make it easy to ask for a quote or book, while letting the team manage their own content.',
    whatWeDid:
      'Handled the project end to end. Designed and built the website, set up on-page SEO, and created a custom CMS so the team can update tours, destinations and content themselves.',
    highlights: [
      'Tour packages, destinations, transport and travel guide pages',
      'A "find your Kashmir getaway" search by destination, budget and month',
      'Customize-trip and get-quote flows',
      'Best-time-to-visit guidance for SEO',
      'A custom CMS for the team',
    ],
    coverImage: '/wonder-delight-mockup.png',
    featured: true,
  },
  {
    slug: 'kaali-edge',
    name: 'Kaali Edge',
    sector: 'Education',
    liveUrl: 'https://www.kaaliedge.com/',
    summary:
      'A trust-first website for an education consultancy that guides Kashmiri students toward careers abroad.',
    services: ['Website design and development', 'Blog setup'],
    overview:
      'Kaali Edge is an educational consultancy in Kashmir helping students and families choose where to study. Choosing a university abroad is a big decision, so trust matters more than anything.',
    challenge:
      'Families need clear, honest information before they ever make a call. The site had to feel calm and credible, explain services and destinations simply, and make a free consultation easy to book.',
    whatWeDid:
      'Designed a calm, premium look with a soft mountain backdrop and elegant serif headlines, structured the service and destination pages, built a blog for search, and added a prominent free-consultation button and WhatsApp chat.',
    highlights: [
      'Clear service and destination pages',
      'Free consultation call-to-action on every page',
      'Blog for search visibility',
      'WhatsApp chat button',
    ],
    coverImage: '/kaali-edge-mockup.png',
    featured: true,
  },
  {
    slug: 'smarthire',
    name: 'SmartHire',
    sector: 'AI software',
    liveUrl: 'https://smarthire-beige.vercel.app/',
    summary:
      'An AI hiring platform that takes candidates and recruiters through four hiring stages in one place, designed to make hiring fairer. Built as an engineering final-year project.',
    services: ['Custom software', 'AI integration', 'Full-stack development'],
    overview:
      'SmartHire brings the whole hiring process into a single application for candidates and recruiters, from first screening to final interview.',
    challenge:
      'Hiring is often slow, scattered across tools and open to bias. The goal was a platform where every candidate goes through the same structured process.',
    whatWeDid:
      'Built the full application: resume screening with AI, a multiple-choice round, a coding interview for technical roles, and a video call interview, all in one workflow.',
    highlights: [
      'Four stages in one platform',
      'AI-assisted resume screening',
      'Coding interview for technical jobs',
      'Built-in video interviews',
      'Designed for unbiased, consistent evaluation',
    ],
    badge: 'Engineering final-year project',
    coverImage: '/smart-hire-mockup.png',
    featured: true,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projectsData.find((p) => p.slug === slug);
}
