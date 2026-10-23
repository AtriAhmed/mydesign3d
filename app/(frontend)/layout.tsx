import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { getSiteSettings } from "@/lib/cms";
import { consultationUrl } from "@/lib/consultation-url";
import { SiteSettingsProvider, type PublicSiteSettings } from "./components/site-settings-provider";
import ThemeToggle from "./components/theme-toggle";

const jakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://www.mydesign3d.com"),
  title: "MyDesign3D — Architecture, 3D Visualization & Web Solutions",
  description: "Architecture, design, and digital solutions from MyDesign3D.",
  openGraph: {
    type: "website",
    siteName: "MyDesign3D",
    images: [{
      url: "/og-image.jpg",
      width: 1200,
      height: 630,
      alt: "MyDesign3D homepage featuring architecture and digital design",
    }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.jpg"],
  },
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const cms = await getSiteSettings();
  return (
    <html
      lang="en"
      className={`${jakartaSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col"><SiteSettingsProvider settings={{
        siteName: cms.siteName || "MyDesign3D",
        consultationLabel: cms.consultationLabel || "Consultation",
        floatingLabel: cms.floatingLabel || "Book a Free Consultation",
        consultationUrl: consultationUrl(cms.consultationUrl),
        headerLogoUrl: cms.headerLogoUrl || "/images/logo.png",
        symbolLogoUrl: cms.symbolLogoUrl || "/images/service-icon.png",
        email: cms.email || "hello@mydesign3d.com",
        phone: cms.phone || "+1 448 3333 996",
        homePhone: cms.homePhone || "+1 (669) 333-3661",
        address: cms.address || "ST 62959, Sheridan- WY 82801",
        footerDescription: cms.footerDescription || "Architectural Design . Web Services",
        footerContactHeading: cms.footerContactHeading || "Get in touch",
        footerLinksHeading: cms.footerLinksHeading || "Quick links",
        allServicesLabel: cms.allServicesLabel || "All services",
        termsLabel: cms.termsLabel || "Terms",
        privacyLabel: cms.privacyLabel || "Privacy",
        homeFooterIntro: cms.homeFooterIntro || "",
        navigation: Array.isArray(cms.navigation) ? cms.navigation as Array<{ label: string; href: string; children?: Array<{ label: string; href: string; children?: Array<{ label: string; href: string }> }> }> : [],
        homeFooterButton: cms.homeFooterButton || "Book a Consultation",
        innerFooterButton: cms.innerFooterButton || "Book a free consult",
        pricingProcessTitle: cms.pricingProcessTitle || "How we work",
        serviceOfferHeading: cms.serviceOfferHeading || "What We Offer",
        serviceDifferentHeading: cms.serviceDifferentHeading || "Why we're different",
        serviceProcessUrl: cms.serviceProcessUrl || "/about",
        serviceFormLabels: cms.serviceFormLabels && typeof cms.serviceFormLabels === "object" && !Array.isArray(cms.serviceFormLabels) ? cms.serviceFormLabels as PublicSiteSettings["serviceFormLabels"] : undefined,
        pricingProcessSteps: cms.pricingProcessSteps?.length ? cms.pricingProcessSteps.map((step) => ({ label: step.label })) : undefined,
        facebookUrl: cms.facebookUrl || "https://www.facebook.com/share/1DKXbqPYYx/",
        instagramUrl: cms.instagramUrl || "https://www.instagram.com/mydesign3d/",
        xUrl: cms.xUrl || "https://x.com/",
        linkedinUrl: cms.linkedinUrl || "https://www.linkedin.com/company/107013829/",
        copyrightText: cms.copyrightText || "2026 © MyDesign3d. All rights reserved",
        termsUrl: cms.termsUrl || "https://www.mydesign3d.com/terms/",
        privacyUrl: cms.privacyUrl || "https://www.mydesign3d.com/privacy-policy/",
      }}>{children}<ThemeToggle /></SiteSettingsProvider></body>
    </html>
  );
}
