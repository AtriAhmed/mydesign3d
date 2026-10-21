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
  title: "3D Visualization & Architectural Rendering Services",
  description: "3D visualization and architectural rendering services from MyDesign3D.",
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("/3d-visualization-rendering", defaultMetadata);
}

export default async function VisualizationRenderingPage() {
  const sections = await getPageSections("/3d-visualization-rendering");
  const section = (key: string) => (sections[key] ?? {}) as Record<string, never>;
  return (
    <div className="bg-cream">
      <SiteHeader />
      <main id="main-content" className="-mt-[104px] bg-[#fafaf7]">
        <section aria-labelledby="visualization-title" className="flex min-h-[225px] items-end justify-center bg-[#fbfaf7] px-5 pb-[38px] md:min-h-[305px] md:px-10 md:pb-[40px]">
          <h1 id="visualization-title" className="m-0 text-center text-[16px] font-medium leading-[1.1] tracking-[2px] text-brand">
            3D Visualization &amp; Architectural Rendering Services
          </h1>
        </section>
        <ServiceHero
          variant="visualization"
          titleId="visualization-hero-title"
          breadcrumb="3D Visualization & Rendering"
          seoTitle="3D Visualization & Rendering Services — Photorealistic Renders, Animation & VR Walkthroughs"
          seoTag="h2"
          seoPlacement="before"
          headlinePrefix="Visualization for"
          rotatingWords={["Architecture", "Real Estate", "Product Designer"]}
          description="We create photorealistic renders, animations, 360° panoramas, and VR walkthroughs that help you present, validate, and sell your ideas with clarity and impact."
          benefits={["High-end visual solutions", "Cost-effective delivery"]}
          imageSrc="/images/visualization-hospital.jpg"
          imageAlt="Photorealistic rendering of a modern hospital at sunset"
         {...section("hero")}/>
        <SoftwareTools  {...section("tools")}/>
        <ServiceProcess
          titleId="visualization-process-title"
          imageSrc="/images/visualization-interior-stairs.jpg"
          imageAlt="Photorealistic rendering of a contemporary interior staircase"
          imageHeading="Photorealistic results"
          imageCaption="High-end visuals designed to communicate ideas with clarity and impact."
          heading="How we bring ideas to life"
          subtitle="Visualization that supports decisions, presentations, and sales"
          description="We help architects, developers, designers, and product-focused businesses turn concepts into clear, compelling visual assets. From photorealistic renders to immersive virtual walkthroughs, our team delivers visuals that improve communication, accelerate approvals, and strengthen project presentations."
          ctaLabel="Learn more"
         {...section("process")}/>
        <ServiceOffer
          titleId="visualization-offer-title"
          subtitle="Advanced visualization services tailored to your project needs"
          imageSrc="/images/visualization-service.png"
          imageAlt="Photorealistic rendering of a contemporary villa interior"
          services={[
            { title: "3D Rendering", description: "Photorealistic still images that present your project with clarity, realism, and visual impact." },
            { title: "VR Walkthroughs", description: "Virtual experiences that allow users to move through spaces and engage with projects before execution." },
            { title: "3D Animation", description: "Dynamic visual storytelling that helps clients and stakeholders better understand spaces, products, and concepts." },
            { title: "360° Panorama", description: "Interactive panoramic views that offer a more immersive way to explore and present your designs." },
          ]}
         {...section("offer")}/>
        <ServiceDifferent
          titleId="visualization-different-title"
          subtitle="A multidisciplinary approach built for quality, speed, and flexibility"
          imageSrc="/images/visualization-different.jpg"
          imageAlt="Contemporary design studio with workstations and pendant lights"
          reasons={[
            { title: "Multidisciplinary Expert Team", description: "We bring together specialists in architecture, BIM, interior design, product design, 3D visualization, animation, and immersive experiences to support projects from concept to delivery." },
            { title: "Fast and Efficient Execution", description: "Our streamlined workflow allows us to deliver high-quality outputs quickly, helping clients move faster without compromising visual or technical standards." },
            { title: "Cost-Effective Collaboration", description: "We provide scalable support and optimized production processes that reduce overhead while maintaining premium results." },
          ]}
         {...section("different")}/>
        <ServiceContact
          sectionId="visualization-contact"
          titleId="visualization-contact-title"
          title="Let’s discuss your next project"
          introduction="Tell us about your project and our team will get back to you with the right visualization solution."
          imageSrc="/images/visualization-contact.png"
          imageAlt="Design team reviewing architectural plans together"
          services={["3D Rendering", "3D Animation", "360° Panorama", "VR Walkthroughs", "Interior Visualization", "Product Visualization", "Custom Request"]}
          inquiryType="3D visualization"
         {...section("contact")}/>
        <ServicePricing
          titleId="visualization-pricing-title"
          title="3D Visualization & Rendering"
          startingPrice="From $199 / image"
          description="Photorealistic renders and walkthroughs for architecture and real estate. Per-image cost drops with volume (same model reused)."
          columnLabel="Deliverable"
          rows={[
            { service: "Interior render", startingAt: "from $199/image" },
            { service: "Exterior render", startingAt: "from $349/image" },
            { service: "Walkthrough animation (60s)", startingAt: "from $2,000" },
          ]}
          ctaLabel="Request a quote"
         {...section("pricing")}/>
      </main>
      <InnerPageFooter />
      <FloatingCta />
    </div>
  );
}
