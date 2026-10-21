import { getPageSections, getPageMetadata } from "@/lib/cms";
import type { Metadata } from "next";
import SiteHeader from "../components/site-header";
import InnerPageFooter from "../components/inner-page-footer";
import FloatingCta from "../components/floating-cta";
import ServiceHero from "../components/service-hero";
import SoftwareTools from "../components/software-tools";
import ServiceProcess from "../components/service-process";
import ServiceOffer from "../components/service-offer";
import ServiceDifferent from "../components/service-different";
import ServiceContact from "../components/service-contact";
import ServicePricing from "../components/service-pricing";

const defaultMetadata: Metadata = {
  title: "Architectural Design & BIM Services — Technical Solutions",
  description: "Architectural design, BIM, design development, and technical solutions for architecture, construction, and product teams.",
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("/architectural-design-bim", defaultMetadata);
}

export default async function ArchitecturalDesignBimPage() {
  const sections = await getPageSections("/architectural-design-bim");
  const section = (key: string) => (sections[key] ?? {}) as Record<string, never>;
  return (
    <div className="bg-[#fafaf7]">
      <SiteHeader />
      <main id="main-content" className="pt-[6px] min-[1025px]:pt-[131px]">
        <ServiceHero
          variant="architecture"
          titleId="architecture-hero-title"
          breadcrumb="Architectural Design & BIM"
          seoTitle="Architectural Design & BIM Services — Technical Solutions for Architecture, Construction & Product Teams"
          seoTag="h1"
          seoPlacement="after"
          headlinePrefix="BIM"
          rotatingWords={["Families", "Design", "Technical Innovation"]}
          description="We support architecture, construction, and product-focused teams with BIM, design development, and technical solutions built for precision, speed, and long-term efficiency."
          benefits={["Technical accuracy", "Cost-effective delivery"]}
          imageSrc="/images/architecture-bim-hero.png"
          imageAlt="Architectural rendering of a modern house with technical elevation drawings"
         {...section("hero")}/>
        <SoftwareTools  {...section("tools")}/>
        <ServiceProcess
          titleId="architecture-process-title"
          imageSrc="/images/architecture-process.png"
          imageAlt="Architectural concept sketch transforming into a finished interior"
          imageHeading="Technical precision"
          imageCaption="Structured design solutions built for coordination, accuracy, and execution."
          heading="How we turn concepts into buildable solutions"
          subtitle="Design and technical support that improves accuracy, coordination, and delivery"
          description="We help architecture, construction, and product-focused teams develop clear, efficient, and technically sound solutions. From BIM services and BIM families to architectural, interior, and product design, our multidisciplinary team supports every stage with precision and practical expertise."
          ctaLabel="Discuss your project"
         {...section("process")}/>
        <ServiceOffer
          titleId="architecture-offer-title"
          subtitle="Design and technical solutions tailored to your project needs"
          imageSrc="/images/architecture-offer.png"
          imageAlt="Architectural rendering overlaid with technical drawings"
          services={[
            { title: "Architectural Design", description: "Architectural design solutions that combine aesthetics, functionality, and technical feasibility, with interior design integrated when required." },
            { title: "Product Design", description: "Design support for products and components developed with attention to usability, detail, and production logic." },
            { title: "BIM Services", description: "Structured BIM support that improves coordination, documentation, and project efficiency across all stages." },
            { title: "BIM Families", description: "Custom BIM families developed with precision to match your technical, functional, and project standards." },
          ]}
         {...section("offer")}/>
        <ServiceDifferent
          titleId="architecture-different-title"
          subtitle="A multidisciplinary approach built for precision, speed, and scalability"
          imageSrc="/images/architecture-different.jpg"
          imageAlt="Modern office interior with workstations and pendant lights"
          reasons={[
            { title: "Multidisciplinary Expert Team", description: "We bring together specialists in architecture, BIM, interior design, product design, and technical development to support projects from concept to delivery." },
            { title: "Fast and Efficient Execution", description: "Our streamlined workflow helps deliver accurate, high-quality outputs quickly while maintaining technical and design standards." },
            { title: "Cost-Effective Collaboration", description: "We provide scalable support and optimized processes that reduce overhead while maintaining premium results." },
          ]}
         {...section("different")}/>
        <ServiceContact
          sectionId="architecture-contact"
          titleId="architecture-contact-title"
          title="Let’s discuss your next project"
          introduction="Tell us about your project and our team will get back to you with the right solution for your needs."
          imageSrc="/images/architecture-contact.png"
          imageAlt="Architect reviewing plans and material samples at a desk"
          services={["BIM Services", "BIM Families", "Architectural Design", "Interior Design", "Product Design", "Technical Support", "Custom Request"]}
          inquiryType="architectural design and BIM"
         {...section("contact")}/>
        <ServicePricing
          titleId="architecture-pricing-title"
          title="Architectural Design & BIM"
          startingPrice="From $15 / m²"
          description="Architectural design, BIM modeling and documentation, delivered remotely under your brand. Production-only packages available."
          columnLabel="Service"
          rows={[
            { service: "Architectural design", startingAt: "from $15/m²" },
            { service: "BIM modeling", startingAt: "from $1/m²" },
            { service: "Hourly", startingAt: "from $40/h" },
          ]}
          ctaLabel="Request a quote"
         {...section("pricing")}/>
      </main>
      <InnerPageFooter />
      <FloatingCta />
    </div>
  );
}
