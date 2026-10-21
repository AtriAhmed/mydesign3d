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
  title: "UI/UX Design & Brand Identity — User Experience, Visual Identity & Design Systems",
  description: "UI/UX design, brand identity, and graphic design for intuitive digital products and cohesive visual experiences.",
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("/ux-ui-design-brand-identity", defaultMetadata);
}

export default async function UxUiDesignBrandIdentityPage() {
  const sections = await getPageSections("/ux-ui-design-brand-identity");
  const section = (key: string) => (sections[key] ?? {}) as Record<string, never>;
  return (
    <div className="bg-[#fafaf7]">
      <SiteHeader />
      <main id="main-content" className="pt-[80px] md:pt-[291px]">
        <ServiceHero
          variant="ux"
          titleId="ux-ui-hero-title"
          breadcrumb="UI/UX Design & Brand Identity"
          seoTitle="UI/UX Design & Brand Identity — User Experience, Visual Identity & Design Systems"
          seoTag="h1"
          seoPlacement="before"
          headlinePrefix=""
          rotatingWords={["UI/UX Design", "Brand Identity", "Graphic Design"]}
          description="We create intuitive digital experiences and distinctive visual identities that help businesses connect with their audiences. From user research and interface design to brand systems and graphics, our team turns complex ideas into clear, consistent designs."
          benefits={["Strategic design", "Reliable performance"]}
         {...section("hero")}/>
        <SoftwareTools
          tools={[
            { name: "Figma", src: "/images/ux-tools/Figma-Logo-300x169.png", width: 300, height: 169 },
            { name: "Adobe XD", src: "/images/ux-tools/xd@logotyp.us_-300x293.png", width: 300, height: 293 },
            { name: "Framer", src: "/images/ux-tools/framer_logo_icon_169150-300x150.png", width: 300, height: 150 },
            { name: "Webflow", src: "/images/ux-tools/webflow@logotyp.us_-300x214.png", width: 300, height: 214 },
            { name: "Adobe Illustrator", src: "/images/ux-tools/Illustrator-Logo-300x187.png", width: 300, height: 187 },
            { name: "Adobe Photoshop", src: "/images/ux-tools/Photoshop-logo-300x169.png", width: 300, height: 169 },
            { name: "Adobe InDesign", src: "/images/ux-tools/Adobe-InDesign-Logo-300x188.png", width: 300, height: 188 },
          ]}
         {...section("tools")}/>
        <ServiceProcess
          titleId="ux-ui-process-title"
          imageHeading="Designed with purpose"
          imageCaption="Creative systems built for clarity, consistency, and meaningful user experiences."
          heading="How we create design systems and brand experiences that connect"
          subtitle="Strategic design for clarity, consistency, and user experience"
          description="We help businesses and growing brands create clear, engaging, and visually consistent digital experiences. From UI/UX design and brand identity to graphic design systems and communication assets, our team combines strategic thinking with creative execution to build design solutions that strengthen perception, improve usability, and support long-term brand growth."
          ctaLabel="Discuss your project"
         {...section("process")}/>
        <ServiceOffer
          titleId="ux-ui-offer-title"
          subtitle="Design services tailored to your brand, users, and business goals"
          imageSrc="/images/ux-offer.png"
          imageAlt="Brand and interface designs displayed on a desktop monitor in a design studio"
          services={[
            { title: "Graphic Design", description: "Creative visual assets developed for communication, promotion, presentation, and consistent brand expression across touchpoints." },
            { title: "Design Systems & Marketing Assets", description: "Structured design systems and branded materials that support consistency, efficiency, and long-term visual impact." },
            { title: "UI/UX Design", description: "User-centered interfaces designed to improve usability, clarity, and digital experience across web and mobile products." },
            { title: "Brand Identity", description: "Visual identities built to express your brand clearly through logo systems, typography, color palettes, and cohesive design language." },
          ]}
         {...section("offer")}/>
        <ServiceDifferent
          titleId="ux-ui-different-title"
          subtitle="Design expertise built for clarity, consistency, and creative impact"
          imageSrc="/images/expertise-web.jpg"
          imageAlt="Interface design concept with connected screens and visual elements"
          reasons={[
            { title: "Strategic Design Thinking", description: "We combine creative direction, user understanding, and brand strategy to design solutions with purpose and impact." },
            { title: "Visual Consistency Across Touchpoints", description: "We create cohesive visual systems that strengthen recognition, improve communication, and support long-term brand value." },
            { title: "User-Centered Creative Execution", description: "Our approach balances aesthetics and usability to deliver experiences that are both visually refined and effective." },
          ]}
         {...section("different")}/>
        <ServiceContact
          sectionId="ux-ui-contact"
          titleId="ux-ui-contact-title"
          title="Let’s discuss your next creative project"
          introduction="Tell us about your brand, design, or user experience needs and our team will help you shape the right creative solution."
          imageSrc="/images/web-contact.png"
          imageAlt="Team reviewing a digital interface together"
          imageHeading="Tailored Creative Solutions"
          imageCaption="Flexible collaboration adapted to your brand goals, audience, and design needs."
          services={["UI/UX Design", "Brand Identity", "Graphic Design", "Design Systems", "Marketing Assets", "Presentation Design", "Custom Request"]}
          inquiryType="UI/UX design"
         {...section("contact")}/>
        <ServicePricing
          titleId="ux-ui-pricing-title"
          title="UI/UX Design & Brand Identity"
          startingPrice="From $50 / hour"
          description="Interfaces, design systems and visual identity that convert — at nearshore rates, typically 40% below US/EU studios."
          columnLabel="Package"
          rows={[
            { service: "UI/UX design (project)", startingAt: "from $6,000" },
            { service: "Brand identity package", startingAt: "from $2,500" },
            { service: "Hourly", startingAt: "from $50/h" },
          ]}
          ctaLabel="Request a quote"
         {...section("pricing")}/>
      </main>
      <InnerPageFooter />
      <FloatingCta />
    </div>
  );
}
