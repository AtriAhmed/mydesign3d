import type { Metadata } from "next";
import SiteHeader from "../components/site-header";
import InnerPageFooter from "../components/inner-page-footer";
import FloatingCta from "../components/floating-cta";
import PortfolioGallery from "./portfolio-gallery";
import { getProjects, getPageSections, getPageMetadata } from "@/lib/cms";
import listingDefaults from "@/content/listing-sections.json";

const defaultMetadata: Metadata = {
  title: "Architecture & 3D Portfolio | MyDesign3D",
  description: "Explore MyDesign3D projects in architecture, interior design, and visualization.",
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("/portfolio", defaultMetadata);
}

export default async function PortfolioPage() {
  const portfolioItems = (await getProjects()).filter((project) => (project.category === "exterior" || project.category === "interior") && project.src).map(({ category, src, alt, width, height }) => ({ category: category as "exterior" | "interior", src, alt, width, height }));
  const sections = await getPageSections("/portfolio");
  const intro = { ...listingDefaults.portfolio.intro, ...sections.intro };
  return (
    <div className="bg-cream">
      <SiteHeader />
      <main id="main-content" className="bg-cream">
        <header className="mx-auto max-w-[1300px] px-5 pt-20 text-center md:pt-[100px]">
          <h1 className="m-0 text-[clamp(44px,6vw,80px)] leading-[1.1] tracking-[-2px] text-brand">{intro.title as string}</h1>
          <p className="mx-auto mt-6 mb-0 max-w-[800px] text-[16px] leading-[1.8] text-[#383838] md:text-[18px]">
            {intro.description as string}
          </p>
        </header>
        <PortfolioGallery portfolioItems={portfolioItems} labels={{ all: intro.allLabel as string, interior: intro.interiorLabel as string, exterior: intro.exteriorLabel as string, loadMore: intro.loadMoreLabel as string }} />
      </main>
      <InnerPageFooter />
      <FloatingCta />
    </div>
  );
}
