import type { Metadata } from "next";
import FloatingCta from "../components/floating-cta";
import InnerPageFooter from "../components/inner-page-footer";
import SiteHeader from "../components/site-header";
import { getPageSections, getPageMetadata } from "@/lib/cms";
import pricingDefaults from "@/content/pricing-sections.json";

const defaultMetadata: Metadata = {
  title: "Pricing | MyDesign3D",
  description: "Indicative starting rates for architecture, design, web development, and business services from MyDesign3D.",
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("/pricing", defaultMetadata);
}

export default async function PricingPage() {
  const sections = await getPageSections("/pricing");
  const section = <T extends object>(key: string, defaults: T): T => ({ ...defaults, ...sections[key] }) as T;
  const intro = section("intro", pricingDefaults.intro);
  const architecture = section("architecture", pricingDefaults.architecture);
  const technology = section("technology", pricingDefaults.technology);
  const process = section("process", pricingDefaults.process);
  const quote = section("quote", pricingDefaults.quote);
  return (
    <div className="bg-cream">
      <SiteHeader />
      <main id="main-content" className="flow-root bg-cream">
        <div className="mx-auto mt-[calc(7vh-20px)] max-w-[845px] px-[30px] text-center">
          <h1 className="text-[16px] font-medium leading-[1.1] tracking-[2px] text-brand motion-safe:animate-about-fade-in">{intro.title}</h1>
        </div>

        <div className="px-6 pt-[135px] pb-20 text-brand">
          <div className="mx-auto max-w-[1080px]">
            <header className="mb-12 text-center">
              <p className="mb-[18px] inline-block rounded-[20px] bg-[#f7d2ff] px-[14px] py-[5px] text-[12px] leading-[1.5] tracking-[0.14em] uppercase">{intro.eyebrow}</p>
              <h2 className="mb-[14px] text-[clamp(40px,7vw,80px)] font-extrabold leading-[1.15]">
                {intro.headingLineOne}<br />{intro.headingLineTwo}
              </h2>
              <p className="mx-auto max-w-[640px] text-[16px] leading-[1.6] text-[#5a4f63]">
                {intro.description}
              </p>
            </header>

            <section aria-labelledby="architecture-pricing-title" className="mb-9">
              <h3 id="architecture-pricing-title" className="mb-[14px] text-[12px] font-bold tracking-[0.12em] text-[#9a7fb0] uppercase">{architecture.heading}</h3>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {architecture.services.map((service) => (
                  <article key={service.title} className={`rounded-xl bg-white p-6 ${service.featured ? "border-2 border-[#f7d2ff]" : "border border-[#e3d8ec]"}`}>
                    <h4 className="mb-1 text-[28px] font-bold leading-[1.3]">{service.title}</h4>
                    <p className="my-2 text-[26px] font-extrabold leading-[1.3]">From {service.price} <span className="text-[14px] font-normal text-[#9a8aa5]">{service.unit}</span></p>
                    <p className="text-[16px] leading-[1.55] text-[#6a5f73]">{service.description}</p>
                    {service.detail && <p className="mt-2 text-[12px] leading-[1.7] text-[#9a8aa5] [&_strong]:font-bold [&_strong]:text-brand">{service.detail}</p>}
                  </article>
                ))}
              </div>
            </section>

            <section aria-labelledby="technology-pricing-title" className="mb-10">
              <h3 id="technology-pricing-title" className="mb-[14px] text-[12px] font-bold tracking-[0.12em] text-[#9a7fb0] uppercase">{technology.heading}</h3>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {technology.services.map((service) => (
                  <article key={service.title} className="rounded-[10px] border border-[#e3d8ec] bg-white p-[18px]">
                    <h4 className="mb-1 text-[20px] font-bold leading-[1.4]">{service.title}</h4>
                    <p className="text-[15px] font-bold text-[#9a7fb0]">{technology.quoteLabel}</p>
                    <p className="mt-1.5 text-[16px] leading-[1.5] text-[#6a5f73]">{service.description}</p>
                  </article>
                ))}
              </div>
            </section>

            <section aria-labelledby="pricing-process-title" className="mb-10 border-t border-[#e3d8ec] pt-9">
              <h3 id="pricing-process-title" className="mb-[26px] text-center text-[56px] font-bold leading-[1.15]">{process.heading}</h3>
              <ol className="grid gap-[14px] sm:grid-cols-2 lg:grid-cols-4">
                {process.steps.map((step, index) => (
                  <li key={step} className="text-center">
                    <span className="text-[22px] font-extrabold text-[#9a7fb0]">{index + 1}</span>
                    <p className="mt-1.5 text-[16px] leading-[1.5] text-[#6a5f73]">{step}</p>
                  </li>
                ))}
              </ol>
            </section>

            <section aria-labelledby="pricing-quote-title" className="rounded-xl bg-brand p-8 text-center sm:p-10">
              <h3 id="pricing-quote-title" className="mb-2 text-[56px] font-bold leading-[1.15] text-white">{quote.heading}</h3>
              <p className="mb-5 text-[16px] leading-[1.6] text-[#d8c8e3]">{quote.description}</p>
              <a href={quote.ctaUrl} className="inline-block rounded-lg bg-[#f7d2ff] px-8 py-[13px] text-[15px] font-bold text-brand no-underline transition-colors duration-200 hover:bg-mint focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f7d2ff] motion-reduce:transition-none">{quote.ctaLabel}</a>
            </section>
            <p className="mt-6 text-center text-[16px] text-[#9a8aa5]">{quote.note}</p>
          </div>
        </div>
      </main>
      <InnerPageFooter />
      <FloatingCta />
    </div>
  );
}
