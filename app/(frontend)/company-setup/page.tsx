import { getPageSections, getPageMetadata } from "@/lib/cms";
import type { Metadata } from "next";
import SiteHeader from "../components/site-header";
import InnerPageFooter from "../components/inner-page-footer";
import FloatingCta from "../components/floating-cta";
import ServiceHero from "../components/service-hero";
import ServiceProcess from "../components/service-process";
import ServiceOffer from "../components/service-offer";
import ServiceDifferent from "../components/service-different";
import ServiceContact from "../components/service-contact";
import ServicePricing from "../components/service-pricing";

const defaultMetadata: Metadata = {
  title: "Business Planning & Company Formation — Business Plans, Company Setup & Launch Strategy",
  description: "Investor-ready business plans and company formation support for entrepreneurs, startups, and established businesses.",
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("/company-setup", defaultMetadata);
}

export default async function CompanySetupPage() {
  const sections = await getPageSections("/company-setup");
  const section = (key: string) => (sections[key] ?? {}) as Record<string, never>;
  return (
    <div className="bg-[#fafaf7]">
      <SiteHeader />
      <main id="main-content" className="pt-[80px] md:pt-[101px]">
        <ServiceHero
          variant="company"
          titleId="company-setup-hero-title"
          breadcrumb="Business Planning & Company Formation"
          seoTitle="Business Planning & Company Formation — Business Plans, Company Setup & Launch Strategy"
          seoTag="h1"
          seoPlacement="before"
          headlinePrefix="Business Planning"
          rotatingWords={["Company Formation", ""]}
          description="We help entrepreneurs, startups, and established businesses build structured, investor-ready plans and navigate the company formation process with clarity and confidence."
          benefits={["Investor-Ready Plans", "End-to-End Support"]}
          imageSrc="/images/company-setup-hero.jpg"
          imageAlt="Business growth chart and launch strategy displayed in a meeting room"
         {...section("hero")}/>
        <ServiceProcess
          titleId="company-setup-process-title"
          imageSrc="/images/company-setup-process.png"
          imageAlt="Translucent cube illustrating structured planning and precision"
          imageHeading="Technical precision"
          imageCaption="Structured design solutions built for coordination, accuracy, and execution."
          heading="How we turn your vision into a viable business"
          subtitle="Strategic support that accelerates launch, growth, and investment readiness"
          description="We work with founders, entrepreneurs, and growing companies to develop clear business plans, define market positioning, and structure the legal and operational framework for a successful launch. From financial projections to company registration, our team handles the complexity so you can focus on execution."
          ctaLabel="Discuss your project"
         {...section("process")}/>
        <ServiceOffer
          titleId="company-setup-offer-title"
          subtitle="Strategic and operational solutions for your business launch"
          imageSrc="/images/company-setup-offer.jpg"
          imageAlt="Business consultant speaking through a headset beside a laptop"
          services={[
            { title: "Financial Projections", description: "Detailed revenue models, cost structures, and cash flow forecasts built to meet investor and banking standards." },
            { title: "Company Formation", description: "Full support for legal structure selection, registration, and administrative setup — tailored to your country and business type." },
            { title: "Business Plan Development", description: "Professionally structured plans that present your vision, define your market, and outline a clear financial and operational strategy." },
            { title: "Market Analysis", description: "In-depth research on your industry, competitors, and target audience to support confident positioning and strategic decision-making." },
          ]}
         {...section("offer")}/>
        <ServiceDifferent
          titleId="company-setup-different-title"
          subtitle="A strategic approach built for clarity, credibility, and growth"
          imageSrc="/images/company-setup-different.jpg"
          imageAlt="Business team meeting around a conference table"
          reasons={[
            { title: "Multidisciplinary Expertise", description: "We combine business strategy, financial modeling, legal structuring, and branding expertise under one roof." },
            { title: "Tailored for Your Context", description: "Every plan is built around your specific market, goals, and stage — not adapted from a generic template." },
            { title: "End-to-End Support", description: "From the first strategy session to final document delivery and company registration, we manage the full process." },
          ]}
         {...section("different")}/>
        <ServiceContact
          sectionId="company-setup-contact"
          titleId="company-setup-contact-title"
          title="Let’s discuss your next project"
          introduction="Tell us about your business or project and our team will get back to you with the right solution."
          imageSrc="/images/company-setup-contact.jpg"
          imageAlt="Professional working in a modern office lit with purple light"
          services={["Business Plan Development", "Market Analysis & Research", "Financial Projections", "Company Formation", "Full Business Setup Package", "Custom Request"]}
          inquiryType="Company setup"
         {...section("contact")}/>
        <ServicePricing
          titleId="company-setup-pricing-title"
          title="Business Planning & Company Formation"
          startingPrice="From $1,200"
          description="Investor-ready business plans, company formation and go-to-market strategy for ventures expanding internationally."
          columnLabel="Service"
          rows={[
            { service: "Business plan", startingAt: "from $1,200" },
            { service: "Company formation", startingAt: "from $900" },
            { service: "Strategy session", startingAt: "from $150" },
          ]}
          ctaLabel="Book a free consult"
         {...section("pricing")}/>
      </main>
      <InnerPageFooter />
      <FloatingCta />
    </div>
  );
}
