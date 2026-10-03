export type LocalPageData = {
  slug: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  openingCopy: string;
  uniqueAngle: string;
  introParagraphs: string[];
  whyLocalMatters: { title: string; text: string }[];
  relevantServices: string[];
  featuredCaseStudySlug: string;
  faqs: { q: string; a: string }[];
};

export const locationsData: Record<string, LocalPageData> = {
  'web-design-agency-kashmir': {
    slug: 'web-design-agency-kashmir',
    name: 'Kashmir',
    metaTitle: 'Web Design Agency in Kashmir - Waadi Media',
    metaDescription:
      'A Kashmir-based web design and digital agency for tourism, education, horticulture, retail and startups. Clear prices, fast delivery.',
    h1: 'Web design agency in Kashmir',
    openingCopy:
      "Kashmir's businesses have more to offer than ever, from tourism and horticulture to crafts and education. Waadi Media is a web design and digital agency from Anantnag that helps them get found, trusted and booked online.",
    uniqueAngle: 'Statewide view; industries and seasons; selling beyond the valley; link to all three case studies.',
    introParagraphs: [
      "Operating a business in Jammu & Kashmir comes with unique rhythms: peak travel seasons, apple and saffron harvests, academic admission cycles, and shifting connectivity. Traditional agencies located outside the valley rarely understand how local commerce works, why direct WhatsApp booking is essential, or how winter affects service delivery.",
      "At Waadi Media, we build digital infrastructure specifically tuned for Kashmiri enterprises. From fast, lightweight websites that load effortlessly on mobile networks in Gulmarg or Pahalgam, to e-commerce stores that process UPI payments for dry fruit growers in Pulwama, our work is grounded in real local market dynamics.",
      "We replace bloated agency jargon with open prices, direct access to the developer building your site, and practical turnaround times.",
    ],
    whyLocalMatters: [
      {
        title: 'Built for mobile networks in the valley',
        text: 'Most of your customers browse on Android smartphones across variable 4G networks. We optimize image weight, eliminate heavy scripts, and guarantee sub-2-second load times.',
      },
      {
        title: 'Direct WhatsApp and call integration',
        text: 'In Kashmir, trust is built through real conversation. Every website we build puts one-tap WhatsApp chat and phone calls directly into your visitors hands.',
      },
      {
        title: 'Open pricing with zero hidden retainers',
        text: 'We publish our starting prices clearly. You know the cost before pick up the phone, and every project includes fixed-price milestones in writing.',
      },
      {
        title: 'Understanding regional commerce and seasonality',
        text: 'We understand tourism peaks, horticulture harvest windows, and local festival cycles, helping you time your marketing campaigns when demand is highest.',
      },
    ],
    relevantServices: [
      'website-design-development',
      'ecommerce-websites',
      'seo',
      'brand-identity',
    ],
    featuredCaseStudySlug: 'wonder-delight-tours-travels',
    faqs: [
      {
        q: 'Can you work with businesses outside Srinagar and Anantnag?',
        a: 'Yes. We work with clients across Baramulla, Kupwara, Pulwama, Shopian, Budgam, Ganderbal, and beyond.',
      },
      {
        q: 'Can our website accept payments from clients outside India?',
        a: 'Yes. We configure international card processing and payment gateways alongside domestic UPI and net banking.',
      },
      {
        q: 'Do you help us register domain names and cloud hosting?',
        a: 'Yes. We guide you through domain ownership and set up modern, high-speed cloud hosting so your site remains fast and secure.',
      },
    ],
  },
  'web-design-agency-srinagar': {
    slug: 'web-design-agency-srinagar',
    name: 'Srinagar',
    metaTitle: 'Web Design Agency in Srinagar - Waadi Media',
    metaDescription:
      'Websites, SEO and marketing for Srinagar businesses, from a Kashmiri agency that keeps things simple.',
    h1: 'Web design agency for Srinagar businesses',
    openingCopy:
      'Srinagar is Kashmir’s business hub: hotels, houseboats, retailers, clinics, schools and startups. If you run one, your customers are searching for you on their phones right now.',
    uniqueAngle:
      'City business mix; Google Business Profile and local search in Srinagar; hospitality and retail focus; meeting by call, WhatsApp or in person.',
    introParagraphs: [
      "From Boulevard Road and Lal Chowk to Rajbagh and Karan Nagar, Srinagar represents the commercial heartbeat of the valley. Whether you run a luxury boutique hotel along Dal Lake, an educational consultancy guiding students toward foreign degrees, or a high-end handicraft showroom, competition is fierce.",
      "When a traveller lands at Sheikh ul-Alam International Airport or a student in Srinagar searches for guidance, they turn immediately to Google on their phone. If your business lacks a fast website and an optimized Google Business Profile, your competitors capture that client before you ever know they were looking.",
      "Waadi Media provides Srinagar businesses with clean digital architecture: websites that project instant credibility, local SEO that dominates Srinagar map packs, and advertising campaigns that convert searchers into paying clients.",
    ],
    whyLocalMatters: [
      {
        title: 'Local Google search dominance in Srinagar',
        text: 'We optimize your Google Business Profile and local citations so your hotel, clinic, or showroom shows up prominently when customers search nearby in Srinagar.',
      },
      {
        title: 'Credibility for high-value services',
        text: 'Consultancies, healthcare providers, and hospitality brands require a calm, sophisticated visual identity that inspires trust before a visitor ever dials your number.',
      },
      {
        title: 'Fast execution without corporate overhead',
        text: 'You work directly with the founder and builder. We respond within one business day and turn around typical business websites in two to three weeks.',
      },
      {
        title: 'In-person consultation when needed',
        text: 'Because we are based in Anantnag and work across the valley, we can coordinate in-person meetings in Srinagar or connect seamlessly over Google Meet and WhatsApp.',
      },
    ],
    relevantServices: [
      'website-design-development',
      'seo',
      'digital-advertising',
      'brand-identity',
    ],
    featuredCaseStudySlug: 'kaali-edge',
    faqs: [
      {
        q: 'Can we meet in Srinagar to discuss our project?',
        a: 'Yes. While most initial discussions happen quickly over phone, WhatsApp or Google Meet, we can arrange an in-person meeting in Srinagar for project kickoffs.',
      },
      {
        q: 'How do you help Srinagar hotels and houseboats get direct bookings?',
        a: 'We build direct booking forms and WhatsApp integration that bypass high OTA commission rates, letting travellers inquire and reserve directly with you.',
      },
      {
        q: 'Do you manage social media accounts for Srinagar retailers?',
        a: 'Yes, through our social media and content package, including high-quality reels, posts, and localized ad targeting.',
      },
    ],
  },
  'web-design-agency-anantnag': {
    slug: 'web-design-agency-anantnag',
    name: 'Anantnag',
    metaTitle: 'Web Design Agency in Anantnag - Waadi Media',
    metaDescription:
      'Waadi Media is based in Anantnag. Websites, branding, SEO and ads for local businesses at clear prices.',
    h1: 'Web design agency in Anantnag',
    openingCopy:
      "Waadi Media is based right here in Anantnag. We know the market, the shops, orchards and offices, and we're close enough to meet in person when it helps.",
    uniqueAngle:
      'Home-town story; Anantnag and south Kashmir businesses; horticulture and local retail; embedded map showing the real location.',
    introParagraphs: [
      "Anantnag (Islamabad) is South Kashmir’s trading capital and agricultural center. From bustling markets in KP Road, Reshi Bazar, and Janglat Mandi, to the thriving apple orchards and willow bat manufacturers across the district, Anantnag businesses have immense economic vitality.",
      "Yet, too many local businesses rely solely on foot traffic or word-of-mouth. National and international buyers want South Kashmir's apples, walnuts, trout, and handicrafts, but cannot find a verified website or clear way to place bulk orders.",
      "As an Anantnag-born agency, Waadi Media was founded right here to bridge this exact gap. We help local enterprises establish an authoritative online presence, launch digital catalogues, and capture demand both across Kashmir and across the country.",
    ],
    whyLocalMatters: [
      {
        title: 'Your hometown digital agency',
        text: 'We operate directly from Anantnag. You know who you are dealing with, where we work, and that we stand behind our deliverables with ongoing local support.',
      },
      {
        title: 'Horticulture & wholesale digital catalogues',
        text: 'We design clear digital product showcases for apple growers, cold store operators, and walnut merchants looking to sell directly to distributors across India.',
      },
      {
        title: 'Affordable, transparent entry points',
        text: 'Starting at ₹5,000 for high-converting landing pages and ₹15,000 for complete 5-page business websites, professional web design is now accessible for every local entrepreneur.',
      },
      {
        title: 'Face-to-face trust and accountability',
        text: 'You can meet us locally in Anantnag, review work progress directly, and receive hands-on training to manage your digital assets with confidence.',
      },
    ],
    relevantServices: [
      'website-design-development',
      'ecommerce-websites',
      'seo',
      'automation-ai',
    ],
    featuredCaseStudySlug: 'wonder-delight-tours-travels',
    faqs: [
      {
        q: 'Where are you located in Anantnag?',
        a: 'We are based in Anantnag, Jammu & Kashmir. You can view our registered Google Maps location on our contact page.',
      },
      {
        q: 'Can you build a simple single-page website for my shop?',
        a: 'Yes. Our landing page package starts at ₹5,000 and is ideal for showcasing your store location, product photos, and direct WhatsApp ordering.',
      },
      {
        q: 'Can you train my staff in Anantnag to manage online orders?',
        a: 'Yes. Every e-commerce and website delivery includes full personal handover training.',
      },
    ],
  },
};
