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
  title: "Web Development & Application Engineering — Custom Websites, Web Apps & AI Integration",
  description: "Scalable websites, business platforms, and web applications with API connectivity and AI integration.",
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("/web-development-application-engineering", defaultMetadata);
}

export default async function WebDevelopmentApplicationEngineeringPage() {
  const sections = await getPageSections("/web-development-application-engineering");
  const section = (key: string) => (sections[key] ?? {}) as Record<string, never>;
  return (
    <div className="bg-[#fafaf7]">
      <SiteHeader />
      <main id="main-content" className="pt-[80px] md:pt-[131px]">
        <ServiceHero
          variant="web"
          titleId="web-development-hero-title"
          breadcrumb="Web Development & Application Engineering"
          seoTitle="Web Development & Application Engineering — Custom Websites, Web Apps & AI Integration"
          seoTag="h1"
          seoPlacement="before"
          headlinePrefix="Full-Stack"
          rotatingWords={["Web Development", "Web Applications"]}
          description="We build scalable websites, business platforms, and intelligent web applications powered by modern technologies, cloud infrastructure, API connectivity, and AI integration."
          benefits={["Scalable architecture", "Intelligent integration"]}
          imageSrc="/images/web-development-hero.png"
          imageAlt="Developers working on web applications at a row of monitors"
         {...section("hero")}/>
        <SoftwareTools
          tools={[
            { name: "Angular", src: "/images/web-tools/angular_logo_icon_169598-300x150.png", width: 300, height: 150 },
            { name: "Node.js", src: "/images/web-tools/nodejs_logo_icon_168945-300x150.png", width: 300, height: 150 },
            { name: "Amazon Web Services", src: "/images/web-tools/Amazon_Web_Services-Logo.wine_-300x200.png", width: 300, height: 200 },
            { name: "React", src: "/images/web-tools/reactjs_logo_icon_170805-300x150.png", width: 300, height: 150 },
            { name: "MongoDB", src: "/images/web-tools/MongoDB_Logo.svg-300x81.png", width: 300, height: 81 },
            { name: "PostgreSQL", src: "/images/web-tools/PostgreSQL-Logo-300x188.png", width: 300, height: 188 },
            { name: "Docker", src: "/images/web-tools/Docker_Logo-300x68.png", width: 300, height: 68 },
            { name: "Python", src: "/images/web-tools/Python-Logo-300x188.png", width: 300, height: 188 },
          ]}
         {...section("tools")}/>
        <ServiceProcess
          titleId="web-development-process-title"
          imageSrc="/images/web-process.png"
          imageAlt="Developers working together on web applications at a shared desk"
          imageHeading="Built for performance"
          imageCaption="Scalable digital solutions designed for speed, reliability, and long-term growth."
          heading="How we build digital solutions that perform"
          subtitle="Full-stack expertise for modern business needs"
          description="We help startups, businesses, and growing companies turn ideas into reliable digital products. From websites and custom web applications to cloud-ready platforms, ERP connectivity, secure payments, and AI-powered features, our team combines technical expertise with practical execution to build solutions that support real business growth."
          ctaLabel="Discuss your project"
         {...section("process")}/>
        <ServiceOffer
          titleId="web-development-offer-title"
          subtitle="Web development services tailored to your business goals"
          imageSrc="/images/web-offer.png"
          imageAlt="Business analytics dashboard displayed on a desktop computer"
          services={[
            { title: "AI, LLM & API Integration", description: "Connected solutions powered by third-party APIs, intelligent automation, language models, and advanced digital workflows." },
            { title: "ERP, Sage & Payment Integration", description: "Business system integration including Sage connectivity, secure payment gateways, and workflow automation." },
            { title: "Custom Websites", description: "Professional, responsive websites designed to strengthen your online presence and support your business objectives." },
            { title: "Web Applications & Business Platforms", description: "Custom digital platforms, portals, dashboards, and business tools built to streamline operations and support growth." },
          ]}
         {...section("offer")}/>
        <ServiceDifferent
          titleId="web-development-different-title"
          subtitle="A multidisciplinary approach built for precision, speed, and scalability"
          imageSrc="/images/web-different.png"
          imageAlt="Web development team working together in a modern office"
          reasons={[
            { title: "Full-Stack Expertise", description: "We bring together frontend, backend, database, cloud, integration, and AI capabilities to deliver complete digital solutions." },
            { title: "Scalable and Efficient Delivery", description: "Our workflow is built to deliver reliable, high-performance solutions with speed, structure, and long-term scalability." },
            { title: "Business-Oriented Collaboration", description: "We adapt to your goals, timelines, and technical requirements with a practical approach focused on real business value." },
          ]}
         {...section("different")}/>
        <ServiceContact
          sectionId="web-development-contact"
          titleId="web-development-contact-title"
          title="Let’s discuss your next digital project"
          introduction="Tell us about your business needs and our team will help you define the right web solution for your goals."
          imageSrc="/images/web-contact.png"
          imageAlt="Web development team discussing a project around a desktop computer"
          imageHeading="Tailored Digital Solutions"
          imageCaption="Flexible collaboration adapted to your business goals, timeline, and technical needs."
          services={["Custom Website", "Web Application", "Business Platform", "Frontend & Backend Development", "AI, LLM & API Integration", "ERP & Sage Integration", "Secure Payment Integration", "SEO & Performance Optimization", "Maintenance & Support", "Custom Request"]}
          inquiryType="web development"
          locations={[
            { name: "New York, NY", address: "65 West 58th Street, Suite 512\nNew York, NY 10019", phone: "(422) 820 820", phoneHref: "tel:422820820" },
            { name: "Washington, DC", address: "4800 Riverbend Avenue NW, Suite 410\nWashington, DC 20016", phone: "(202) 555-0148", phoneHref: "tel:2025550148" },
            { name: "Northern Virginia", address: "1620 Oakridge Parkway, Suite 530\nVienna, VA 22182", phone: "(703) 555-0192", phoneHref: "tel:7035550192" },
          ]}
         {...section("contact")}/>
        <ServicePricing
          titleId="web-development-pricing-title"
          title="Web Development & App Engineering"
          startingPrice="From $50 / hour"
          description="Full-stack web apps and software engineering, built by vetted remote engineers in your timezone."
          columnLabel="Region"
          valueColumnLabel="Rate"
          rows={[
            { service: "USA / Switzerland", startingAt: "from $70/h" },
            { service: "UK / Germany / Canada", startingAt: "from $60/h" },
            { service: "Rest of Europe", startingAt: "from $50/h" },
          ]}
          ctaLabel="Book a free scoping call"
          note={null}
         {...section("pricing")}/>
      </main>
      <InnerPageFooter />
      <FloatingCta />
    </div>
  );
}
