import type { Metadata } from "next";
import SiteHeader from "../components/site-header";
import InnerPageFooter from "../components/inner-page-footer";
import FloatingCta from "../components/floating-cta";
import AboutStory from "../components/about-story";
import AboutValues from "../components/about-values";
import AboutWhyHeading from "../components/about-why-heading";
import AboutBenefits from "../components/about-benefits";
import AboutApproach from "../components/about-approach";
import LocationSection from "../components/location-section";
import { PageSectionsProvider } from "../components/page-sections-provider";
import { getPageSections, getPageMetadata } from "@/lib/cms";
import aboutSections from "@/content/about-sections.json";

const defaultMetadata: Metadata = {
  title: "About MyDesign3D — A Studio Built on Craft and Precision",
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("/about", defaultMetadata);
}

export default async function AboutPage() {
  const sections = await getPageSections("/about");
  return (
    <PageSectionsProvider sections={sections}>
    <div className="bg-cream">
      <SiteHeader />
      <main id="main-content" className="flow-root bg-cream">
        <section className="about-heading mt-[calc(7vh-20px)] mb-[7vh] px-[30px]" aria-labelledby="about-heading">
          <div className="mx-auto max-w-[845px]">
            <h1 id="about-heading" className="m-0 text-center text-[16px] font-medium leading-[1.1] tracking-[2px] text-brand motion-safe:animate-about-fade-in">
              {(sections.intro?.title as string) || aboutSections.intro.title}
            </h1>
          </div>
        </section>
        <div className="pointer-events-none relative z-0 -mt-[7vh] min-h-[14vh] bg-[linear-gradient(180deg,#faf2ea00_0%,#fff_100%)]" aria-hidden="true" />
        <AboutStory />
        <div className="pointer-events-none relative z-0 min-h-[18vh] bg-[linear-gradient(180deg,#f2fff8_0%,#faf2ea_100%)]" aria-hidden="true" />
        <AboutValues />
        <AboutWhyHeading />
        <AboutBenefits />
        <AboutApproach />
        <div className="pointer-events-none h-10 bg-[linear-gradient(180deg,#faf2ea00_0%,#fff_100%)] md:h-[60px] min-[64.0625rem]:h-[14vh]" aria-hidden="true" />
        <LocationSection />
        <div className="pointer-events-none h-10 bg-[linear-gradient(180deg,#f2fff8_0%,#faf2ea_100%)] md:h-[60px] min-[64.0625rem]:h-[14vh]" aria-hidden="true" />
      </main>
      <InnerPageFooter />
      <FloatingCta />
    </div>
    </PageSectionsProvider>
  );
}
