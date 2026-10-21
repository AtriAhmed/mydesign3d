import { getPageSections, getPageMetadata } from "@/lib/cms";
import type { Metadata } from "next";
import SiteHeader from "../components/site-header";
import LocationSection from "../components/location-section";
import ServiceContact from "../components/service-contact";
import InnerPageFooter from "../components/inner-page-footer";
import FloatingCta from "../components/floating-cta";
import { PageSectionsProvider } from "../components/page-sections-provider";
import contactDefaults from "@/content/contact-sections.json";

const defaultMetadata: Metadata = {
  title: "Contact MyDesign3D — Let’s Build Something Together",
  description: "Have a project in mind? We'd love to hear from you.",
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("/contact-us", defaultMetadata);
}

const services = [
  "Architectural Design",
  "3D Visualization & Rendering",
  "Interior Design",
  "Web Development & Applications",
  "UI/UX & Brand Identity",
  "Business Plan & Company Setup",
  "Full-Scale Project",
];

export default async function ContactUsPage() {
  const sections = await getPageSections("/contact-us");
  const section = (key: string) => (sections[key] ?? {}) as Record<string, never>;
  const intro = { ...contactDefaults.intro, ...sections.intro };
  return (
    <PageSectionsProvider sections={sections}>
    <div className="bg-cream">
      <SiteHeader />
      <main id="main-content" className="flow-root">
        <section aria-labelledby="contact-page-title" className="mx-auto mt-[calc(7vh-20px)] mb-[7vh] max-w-[845px] px-5 text-center md:mt-5 md:mb-10 min-[64.0625rem]:mt-[calc(7vh-20px)] min-[64.0625rem]:mb-[7vh]">
          <h1 id="contact-page-title" className="m-0 text-[16px] font-medium leading-[1.1] tracking-[2px] text-brand motion-safe:animate-about-fade-in">{intro.title as string}</h1>
          <p className="mx-auto mt-2.5 mb-0 max-w-[790px] text-[16px] font-medium leading-[1.7] text-[#383838] motion-safe:animate-about-fade-in">{intro.description as string}</p>
        </section>
        <LocationSection variant="office" imagePosition="right" />
        <ServiceContact
          sectionId="contact-form"
          titleId="contact-form-title"
          title="Get in Touch"
          introduction="Tell us about your project, timeline, and goals. We will get back to you to discuss the best way to support your needs."
          imageSrc="/images/contact-teams.jpg"
          imageAlt="MyDesign3D team portrait"
          imageHeading="24/7"
          imageCaption="dedicated support"
          services={services}
          inquiryType="Contact"
          serviceLabel="What services are you interested in?"
          submitLabel="Submit"
          fullWidthContactFields
         {...section("contact")}/>
      </main>
      <InnerPageFooter />
      <FloatingCta />
    </div>
    </PageSectionsProvider>
  );
}
