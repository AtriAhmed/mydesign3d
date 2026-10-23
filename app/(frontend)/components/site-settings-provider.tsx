"use client";

import { createContext, useContext, type ReactNode } from "react";

export type PublicSiteSettings = {
  siteName: string;
  consultationLabel: string;
  floatingLabel: string;
  consultationUrl: string;
  headerLogoUrl: string;
  symbolLogoUrl: string;
  email: string;
  phone: string;
  homePhone: string;
  address: string;
  footerDescription: string;
  footerContactHeading: string;
  footerLinksHeading: string;
  allServicesLabel: string;
  termsLabel: string;
  privacyLabel: string;
  homeFooterIntro: string;
  navigation: Array<{ label: string; href: string; children?: Array<{ label: string; href: string; children?: Array<{ label: string; href: string }> }> }>;
  homeFooterButton: string;
  innerFooterButton: string;
  pricingProcessTitle: string;
  serviceOfferHeading: string;
  serviceDifferentHeading: string;
  serviceProcessUrl: string;
  serviceFormLabels: {
    firstName: string; lastName: string; email: string; phone: string; message: string;
    firstNamePlaceholder: string; lastNamePlaceholder: string; emailPlaceholder: string; phonePlaceholder: string; messagePlaceholder: string;
    successMessage: string;
  };
  pricingProcessSteps: Array<{ label: string }>;
  facebookUrl: string;
  instagramUrl: string;
  xUrl: string;
  linkedinUrl: string;
  copyrightText: string;
  termsUrl: string;
  privacyUrl: string;
};

const defaults: PublicSiteSettings = {
  siteName: "MyDesign3D",
  consultationLabel: "Consultation",
  floatingLabel: "Book a Free Consultation",
  consultationUrl: "/book-a-free-consult/",
  headerLogoUrl: "/images/logo.png",
  symbolLogoUrl: "/images/service-icon.png",
  email: "hello@mydesign3d.com",
  phone: "+1 448 3333 996",
  homePhone: "+1 (669) 333-3661",
  address: "ST 62959, Sheridan- WY 82801",
  footerDescription: "Architectural Design . Web Services",
  footerContactHeading: "Get in touch",
  footerLinksHeading: "Quick links",
  allServicesLabel: "All services",
  termsLabel: "Terms",
  privacyLabel: "Privacy",
  homeFooterIntro: "A multidisciplinary group of architects, designers, and developers — delivering integrated solutions for businesses that want to build, grow, and scale.\nBased in Wyoming, USA. Operating globally.",
  navigation: [],
  homeFooterButton: "Book a Consultation",
  innerFooterButton: "Book a free consult",
  pricingProcessTitle: "How we work",
  serviceOfferHeading: "What We Offer",
  serviceDifferentHeading: "Why we're different",
  serviceProcessUrl: "/about",
  serviceFormLabels: {
    firstName: "Your name", lastName: "Last name", email: "Email", phone: "Phone number", message: "Message",
    firstNamePlaceholder: "John", lastNamePlaceholder: "Smith", emailPlaceholder: "your@mail.com", phonePlaceholder: "+01 200 40 3032",
    messagePlaceholder: "Briefly share what you’d like to discuss (optional)...",
    successMessage: "Your email app should open with the request ready to send.",
  },
  pricingProcessSteps: [
    { label: "Free discovery call — we scope your need" },
    { label: "Tailored proposal — one team, every service" },
    { label: "Production by our team (design / development)" },
    { label: "End-to-end delivery & support" },
  ],
  facebookUrl: "https://www.facebook.com/share/1DKXbqPYYx/",
  instagramUrl: "https://www.instagram.com/mydesign3d/",
  xUrl: "https://x.com/",
  linkedinUrl: "https://www.linkedin.com/company/107013829/",
  copyrightText: "2026 © MyDesign3d. All rights reserved",
  termsUrl: "https://www.mydesign3d.com/terms/",
  privacyUrl: "https://www.mydesign3d.com/privacy-policy/",
};

const SettingsContext = createContext(defaults);

export function SiteSettingsProvider({ children, settings }: { children: ReactNode; settings: Partial<PublicSiteSettings> }) {
  const definedSettings = Object.fromEntries(Object.entries(settings).filter(([, value]) => value !== undefined));
  return <SettingsContext.Provider value={{ ...defaults, ...definedSettings, serviceFormLabels: { ...defaults.serviceFormLabels, ...settings.serviceFormLabels } }}>{children}</SettingsContext.Provider>;
}

export function useSiteSettings() {
  return useContext(SettingsContext);
}
