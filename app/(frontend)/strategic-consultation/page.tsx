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
  title: "Strategic Consultation — Business Strategy, Market Positioning & Growth Advisory",
  description: "Expert strategic guidance for businesses that need clarity, direction, and results.",
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("/strategic-consultation", defaultMetadata);
}

export default async function StrategicConsultationPage() {
  const sections = await getPageSections("/strategic-consultation");
  const section = (key: string) => (sections[key] ?? {}) as Record<string, never>;
  return (
    <div className="bg-[#fafaf7]">
      <SiteHeader />
      <main id="main-content" className="pt-[80px] md:pt-[101px]">
        <ServiceHero
          variant="strategic"
          titleId="strategic-consultation-hero-title"
          breadcrumb="Strategic Consultation"
          seoTitle="Strategic Consultation — Business Strategy, Market Positioning & Growth Advisory"
          seoTag="h1"
          seoPlacement="before"
          headlinePrefix="Strategic"
          rotatingWords={["Consultation", ""]}
          description="Expert strategic guidance for businesses that need clarity, direction, and results."
          benefits={["Strategic clarity", "Measurable results"]}
          imageSrc="/images/strategic-consultation-hero.png"
          imageAlt="Conference room overlooking a city at sunset"
          ctaLabel="Book a Consultation"
         {...section("hero")}/>
        <ServiceProcess
          titleId="strategic-consultation-process-title"
          imageSrc="/images/strategic-consultation-process.jpg"
          imageAlt="Open strategy notebook with a pen and planning notes"
          imageHeading="Strategic thinking"
          imageCaption="Structured design solutions built for coordination, accuracy, and execution."
          heading="How we help businesses make better decisions"
          subtitle="Professional consultancy tailored to your challenges and goals"
          description="We work with businesses to assess challenges, identify opportunities, and develop practical strategies that drive real, sustainable growth."
          ctaLabel="Learn about our approach"
         {...section("process")}/>
        <ServiceOffer
          titleId="strategic-consultation-offer-title"
          subtitle="Design and technical solutions tailored to your project needs"
          imageSrc="/images/strategic-consultation-offer.jpg"
          imageAlt="Growth chart and planning diagram arranged on a round table"
          services={[
            { title: "Growth Planning", description: "Identifying growth levers, new market opportunities, and strategic priorities that move the business forward." },
            { title: "Performance Advisory", description: "Ongoing expert support to monitor performance, adapt strategy, and ensure decisions lead to measurable outcomes." },
            { title: "Business Strategy", description: "Defining clear objectives, competitive positioning, and actionable roadmaps aligned with your market reality." },
            { title: "Operations Consulting", description: "Analyzing and optimizing internal processes to improve efficiency, reduce friction, and scale sustainably." },
          ]}
         {...section("offer")}/>
        <ServiceDifferent
          titleId="strategic-consultation-different-title"
          subtitle="A multidisciplinary approach built for precision, speed, and scalability"
          imageSrc="/images/strategic-consultation-different.jpg"
          imageAlt="Modern consultation office with seating around a low table"
          reasons={[
            { title: "Multidisciplinary Expert Team", description: "Cross-Industry Expertise — We bring strategic experience across multiple sectors to provide grounded, relevant guidance." },
            { title: "Fast and Efficient Execution", description: "Practical, Actionable Advice — No abstract frameworks. Our recommendations are built to be implemented and deliver results." },
            { title: "Cost-Effective Collaboration", description: "Tailored to Your Context — Every strategy is developed around your specific business, goals, and constraints." },
          ]}
         {...section("different")}/>
        <ServiceContact
          sectionId="strategic-consultation-contact"
          titleId="strategic-consultation-contact-title"
          title="Let’s discuss your next project"
          introduction="Tell us about your project and our team will get back to you with the right solution for your needs."
          imageSrc="/images/company-setup-contact.jpg"
          imageAlt="Professional working in a modern office lit with purple light"
          services={["Business Strategy", "Operations Consulting", "Growth Planning", "Performance Advisory", "Custom Consultation"]}
          inquiryType="Strategic consultation"
         {...section("contact")}/>
        <ServicePricing
          titleId="strategic-consultation-pricing-title"
          title="Strategic Consultation"
          startingPrice="From $90 / hour"
          description="Strategic advisory across design, technology and operations — one team, every solution."
          columnLabel="Format"
          rows={[
            { service: "Strategy session (90 min)", startingAt: "from $250" },
            { service: "Hourly", startingAt: "from $90/h" },
            { service: "Monthly advisory retainer", startingAt: "from $2,500" },
          ]}
          ctaLabel="Book a free consult"
         {...section("pricing")}/>
      </main>
      <InnerPageFooter />
      <FloatingCta />
    </div>
  );
}
