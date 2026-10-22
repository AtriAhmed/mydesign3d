import type { Metadata } from "next";
import Link from "next/link";
import FloatingCta from "../../components/floating-cta";
import InnerPageFooter from "../../components/inner-page-footer";
import SiteHeader from "../../components/site-header";
import { getProjects, getPageSections, getPageMetadata } from "@/lib/cms";
import listingDefaults from "@/content/listing-sections.json";
import WebProjectGrid, { type WebProject } from "./web-project-grid";

const defaultMetadata: Metadata = {
  title: "Web Development Projects | MyDesign3D",
  description: "Explore web development and application engineering projects from MyDesign3D.",
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("/portfolio/web-development", defaultMetadata);
}

function BrowserPreview() {
  return (
    <div aria-hidden="true" className="relative mx-auto w-full max-w-[560px] rotate-[-3deg] rounded-[22px] border border-brand/10 bg-white p-3 shadow-[0_30px_80px_#352a4426] sm:p-4">
      <div className="overflow-hidden rounded-[12px] border border-brand/10">
        <div className="flex h-9 items-center gap-2 border-b border-brand/10 bg-[#f8f6f7] px-4">
          <span className="size-2 rounded-full bg-[#f7b9b9]" /><span className="size-2 rounded-full bg-[#f7dda6]" /><span className="size-2 rounded-full bg-[#a9dec3]" />
          <span className="mx-auto h-3 w-1/3 rounded-full bg-brand/10" />
        </div>
        <div className="grid min-h-[250px] grid-cols-[1fr_1.1fr] items-center gap-5 bg-[#f7f4f8] p-5 sm:min-h-[315px] sm:gap-8 sm:p-9">
          <div className="space-y-4">
            <span className="block h-2 w-16 rounded-full bg-[#bfa6d1]" />
            <span className="block h-6 w-full rounded-md bg-brand" />
            <span className="block h-6 w-4/5 rounded-md bg-brand" />
            <span className="block h-2 w-full rounded-full bg-brand/15" />
            <span className="block h-2 w-4/5 rounded-full bg-brand/15" />
            <span className="block h-8 w-28 rounded-full bg-brand" />
          </div>
          <div className="grid aspect-[1.1] place-items-center rounded-[18px] bg-[radial-gradient(circle_at_70%_30%,#e9fff4_0%,#d8c4e5_55%,#8c709f_100%)]">
            <span className="size-20 rounded-[28px] border-[10px] border-white/70 bg-white/35 shadow-[0_15px_35px_#352a4433] sm:size-28" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function WebDevelopmentPortfolioPage() {
  const sections = await getPageSections("/portfolio/web-development");
  const intro = { ...listingDefaults.webPortfolio.intro, ...sections.intro };
  const webProjects: WebProject[] = (await getProjects()).filter((project) => project.category === "web" && (project.src || project.videoUrl)).map((project) => ({
    title: project.title,
    summary: project.summary,
    image: project.src,
    videoUrl: project.videoUrl,
    imageAlt: project.alt,
    services: project.services,
    href: project.website,
  }));
  return (
    <div className="bg-cream">
      <SiteHeader />
      <main id="main-content" className="bg-cream">
        <header className="mx-auto max-w-[1300px] px-5 pt-20 text-center md:pt-[100px]">
          <p className="mb-5 text-[12px] font-bold tracking-[.18em] text-brand/65 uppercase">{intro.eyebrow as string}</p>
          <h1 className="m-0 text-[clamp(44px,6vw,80px)] leading-[1.1] tracking-[-2px] text-brand">{intro.title as string}</h1>
          <p className="mx-auto mt-6 mb-0 max-w-[800px] text-[16px] leading-[1.8] text-[#383838] md:text-[18px]">
            {intro.description as string}
          </p>
        </header>
        <section aria-label="Web development projects" className="mx-auto max-w-[1300px] px-5 pt-[60px] pb-[100px]">
          {webProjects.length > 0 ? (
            <WebProjectGrid projects={webProjects} />
          ) : (
            <div className="grid items-center gap-12 overflow-hidden rounded-[32px] border border-brand/10 bg-[#f4eff6] p-7 sm:p-12 lg:grid-cols-2 lg:gap-16 lg:p-16">
              <div>
                <p className="mb-5 text-[12px] font-bold tracking-[.18em] text-brand/60 uppercase">{intro.emptyEyebrow as string}</p>
                <h2 className="mb-6 max-w-[550px] text-[clamp(34px,4vw,56px)] font-semibold leading-[1.12] text-brand">{intro.emptyTitle as string}</h2>
                <p className="max-w-[540px] text-[16px] leading-[1.75] text-[#5a4f63]">{intro.emptyDescription as string}</p>
                <Link href="/contact-us" className="mt-8 inline-flex min-h-12 items-center rounded-full bg-brand px-6 text-[14px] font-semibold text-cream no-underline transition-colors hover:bg-[#554568] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand motion-reduce:transition-none">{intro.emptyCta as string} <span aria-hidden="true" className="ml-3">↗</span></Link>
              </div>
              <BrowserPreview />
            </div>
          )}
        </section>
      </main>
      <InnerPageFooter />
      <FloatingCta />
    </div>
  );
}
