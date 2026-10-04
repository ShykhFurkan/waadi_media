/**
 * Site-wide configuration and business constants for Waadi Media.
 * All items marked [CONFIRM] can be edited here by the owner.
 */
export const siteConfig = {
  name: "Waadi Media",
  legalName: "Waadi Media",
  tagline: "Built in the valley. Made for your business.",
  domain: "waadimedia.com",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://waadimedia.com",
  foundedYear: 2026,
  
  // Location
  location: {
    city: "Anantnag",
    state: "Jammu & Kashmir",
    country: "India",
    addressString: "Anantnag, Jammu & Kashmir", // TODO: Update when exact street address is provided
    serves: "Clients across India, mainly Jammu & Kashmir",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3317.8970439720943!2d75.21139585007596!3d33.7374783179307!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38e20f9f983cb67d%3A0x91ab9d8edfdc7d2d!2sWaadi%20media!5e0!3m2!1sen!2sin!4v1791025594229!5m2!1sen!2sin",
  },

  // Contact
  contact: {
    phone: "+91 77809 40317",
    tel: "+917780940317",
    whatsappNumber: "917780940317",
    whatsappLink: "https://wa.me/917780940317",
    email: "contact@waadimedia.com",
    // [CONFIRM] Business hours
    businessHours: "Monday to Saturday, 10:00 to 19:00 IST",
    // [CONFIRM] Response time promise
    replyPromise: "We reply within one business day.",
  },

  // Team & Leadership
  founder: {
    name: "Furkan Mushtaq",
    role: "Founder & Developer",
    bio: "Computer science engineer from Anantnag. He builds the websites and software and talks to clients directly.", // [CONFIRM]
  },
  teamModel: "Founder-led, with a small circle of friends and creators who help on projects",

  // Social handles (hide any that are empty)
  socials: {
    instagram: "", // TODO: Add handle when available
    linkedin: "",  // TODO: Add handle when available
    facebook: "",  // TODO: Add handle when available
    youtube: "",   // TODO: Add handle when available
    github: "",    // TODO: Add handle when available
  },

  // Third party configurations
  calLink: process.env.NEXT_PUBLIC_CAL_LINK || "waadimedia/free-call", // [CONFIRM]
  gaId: process.env.NEXT_PUBLIC_GA_ID || "",

  // Business logic & rules
  calculator: {
    // [CONFIRM] 10% saving when 3 or more one-time items are selected
    bundleDiscountRate: 0.10,
    minItemsForDiscount: 3,
  },

  // UI & Design System Flags (Redesign R)
  ui: {
    anchorSections: false,
  },
} as const;

export type SiteConfig = typeof siteConfig;
