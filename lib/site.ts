// One place for contact details, links and headline numbers.
// Edit values here and every page updates.

export const site = {
  name: "Elite Ayomide",
  // Live address of the site. Set NEXT_PUBLIC_SITE_URL (e.g. https://yourdomain.com)
  // in the hosting settings; on Vercel the production domain is picked up automatically.
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),
  description:
    "Elite Ayomide is a crypto trader and mentor helping traders, investors, and brands grow with strategy, education, and risk-aware execution.",

  email: "eliteayomide1@gmail.com",
  phones: ["+2347042161165", "+2348168130747"],
  whatsapp: "2347042161165",
  telegram: "realeliteayomide",
  telegramChannel: "https://t.me/eliteayomidecryptoupdates",

  // Paste a Cal.com / Calendly link here to send "Book" buttons straight to it.
  bookingUrl: "/contact",

  // Medium username (without @) to show real articles on /blogs. Leave empty to show "coming soon".
  mediumUsername: "",

  academyUrl: "https://eliteayomidesolutions.com/elite-academy/",

  socials: [
    { label: "Youtube", href: "https://www.youtube.com/@EliteAyomide" },
    { label: "Twitter", href: "https://x.com/eliteayomide" },
    { label: "Instagram", href: "https://www.instagram.com/eliteayomide" },
    { label: "TikTok", href: "https://www.tiktok.com/@eliteayomide" },
    { label: "Telegram", href: "https://t.me/eliteayomidecryptoupdates" },
  ],

  stats: {
    tradesCompleted: 938,
    yearsExperience: 6,
    winRate: 70,
    community: 20000,
    brandsPartnered: 15,
  },
} as const;

export const telegramUrl = `https://t.me/${site.telegram}`;
export const whatsappUrl = `https://wa.me/${site.whatsapp}`;
export const mailtoUrl = `mailto:${site.email}`;
export const isExternal = (href: string) => /^(https?:|mailto:|tel:)/.test(href);
