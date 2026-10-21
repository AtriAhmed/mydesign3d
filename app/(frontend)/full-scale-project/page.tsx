import { getPageSections, getPageMetadata } from "@/lib/cms";
import type { Metadata } from "next";
import SiteHeader from "../components/site-header";
import FullScaleHero from "../components/full-scale-hero";
import FullScaleStory from "../components/full-scale-story";
import FullScaleBenefits from "../components/full-scale-benefits";
import FullScaleTeam from "../components/full-scale-team";
import FullScaleContact from "../components/full-scale-contact";
import FullScaleFaq from "../components/full-scale-faq";
import ServicePricing from "../components/service-pricing";
import InnerPageFooter from "../components/inner-page-footer";
import FloatingCta from "../components/floating-cta";
import { PageSectionsProvider } from "../components/page-sections-provider";

const defaultMetadata: Metadata = {
  title: "Full Scale Project Management — Architecture to Digital Delivery",
  description: "Architecture, design, digital, and business strategy delivered by one team, from concept to completion.",
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("/full-scale-project", defaultMetadata);
}

export default async function FullScaleProjectPage() {
  const sections = await getPageSections("/full-scale-project");
  const section = (key: string) => (sections[key] ?? {}) as Record<string, never>;
  return (
    <div className="bg-cream">
      <SiteHeader />
      <main id="main-content">
        <PageSectionsProvider sections={sections}>
        <FullScaleHero />
        <FullScaleStory />
        <FullScaleBenefits />
        <FullScaleTeam />
        <FullScaleContact />
        <FullScaleFaq />
        </PageSectionsProvider>
        <ServicePricing
          titleId="full-scale-pricing-heading"
          title="Full-Scale Project Management"
          startingPrice="From $3,000 / month"
          description="End-to-end delivery from concept to operation — architecture, development and infrastructure under a single accountable team."
          columnLabel="Model"
          rows={[
            { service: "Project management retainer", startingAt: "from $3,000/mo" },
            { service: "Or, % of project value", startingAt: "8–12%" },
          ]}
          ctaLabel="Book a free consult"
         {...section("pricing")}/>
      </main>
      <InnerPageFooter />
      <FloatingCta />
    </div>
  );
}
