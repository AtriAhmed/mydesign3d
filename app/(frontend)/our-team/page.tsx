import type { Metadata } from "next";
import SiteHeader from "../components/site-header";
import InnerPageFooter from "../components/inner-page-footer";
import FloatingCta from "../components/floating-cta";
import TeamContent from "../components/team-content";
import { PageSectionsProvider } from "../components/page-sections-provider";
import { getPageSections, getPageMetadata } from "@/lib/cms";
import teamDefaults from "@/content/team-sections.json";

const defaultMetadata: Metadata = {
  title: "Our Team — Architects, Designers & Engineers | MyDesign3D",
  description: "Have a project in mind? We'd love to hear from you.",
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("/our-team", defaultMetadata);
}

export default async function OurTeamPage() {
  const sections = await getPageSections("/our-team");
  const intro = { ...teamDefaults.intro, ...sections.intro };
  return (
    <PageSectionsProvider sections={sections}>
    <div className="bg-cream">
      <SiteHeader />
      <main id="main-content" className="flow-root bg-cream">
        <section className="mx-auto mt-[calc(7vh-20px)] mb-[7vh] max-w-[845px] px-5 text-center md:mt-5 md:mb-10 min-[64.0625rem]:mt-[calc(7vh-20px)] min-[64.0625rem]:mb-[7vh]" aria-labelledby="team-page-title">
          <h1 id="team-page-title" className="m-0 text-[16px] font-medium leading-[1.1] tracking-[2px] text-brand motion-safe:animate-about-fade-in">{intro.title as string}</h1>
          <p className="mx-auto mt-2.5 mb-0 max-w-[790px] text-[16px] font-medium leading-[1.7] text-[#383838] motion-safe:animate-about-fade-in">{intro.description as string}</p>
        </section>
        <TeamContent />
      </main>
      <InnerPageFooter />
      <FloatingCta />
    </div>
    </PageSectionsProvider>
  );
}
