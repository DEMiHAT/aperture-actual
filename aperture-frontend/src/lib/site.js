// Single source of truth for brand, contact, and social links.
// Edit values here — components import from this file rather than hardcoding.

export const site = {
  name: 'Aperture Technologies',
  shortName: 'Aperture',
  domain: 'aperturewebs.co.in',
  tagline: 'Engineering Intelligent Digital Experiences',

  email: {
    general: 'hello@aperturewebs.co.in',
    projects: 'contact@aperturewebs.co.in',
  },

  phone: {
    display: '+91 9003472654 / +91 8610213489',
    whatsapp: 'https://wa.me/919003472654',
    primary: {
      display: '+91 9003472654',
      whatsapp: 'https://wa.me/919003472654',
    },
    secondary: {
      display: '+91 8610213489',
      whatsapp: 'https://wa.me/918610213489',
    },
  },

  location: 'Chennai, Tamil Nadu, India',
  url: 'https://aperturewebs.co.in',
  foundedYear: 2025,

  social: {
    github: 'https://github.com/aperturewebs',
    linkedin: 'https://www.linkedin.com/company/aperturewebs',
  },

  // Booking link for "Schedule a call" CTAs. Replace with your real Calendly URL.
  scheduling: process.env.NEXT_PUBLIC_CALENDLY_URL || '',

  // GA4 Measurement ID (G-XXXXXXXXXX). Set NEXT_PUBLIC_GA_ID to enable analytics.
  analyticsId: process.env.NEXT_PUBLIC_GA_ID || '',
};
