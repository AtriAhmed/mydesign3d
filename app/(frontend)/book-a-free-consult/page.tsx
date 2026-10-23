import type { Metadata } from "next";
import { getPageMetadata, getPageSections } from "@/lib/cms";
import defaults from "@/content/consultation-sections.json";
import SiteHeader from "../components/site-header";
import InnerPageFooter from "../components/inner-page-footer";
import FloatingCta from "../components/floating-cta";
import ConsultationForm from "./consultation-form";

const path = "/book-a-free-consult";
const metadata: Metadata = {
  title: "Book a Free Consultation | MyDesign3D",
  description: "Tell us about your project and our team will get back to you within 24 hours.",
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata(path, metadata);
}

export default async function BookAFreeConsultPage() {
  const sections = await getPageSections(path);
  const intro = { ...defaults.intro, ...sections.intro };
  const form = { ...defaults.form, ...sections.form };
  const location = { ...defaults.location, ...sections.location };
  const faq = { ...defaults.faq, ...sections.faq };
  return (
    <div className="bg-cream">
      <SiteHeader />
      <main id="main-content">
        <section aria-labelledby="consultation-title" className="mx-auto max-w-[980px] px-5 pt-[150px] pb-9 text-center sm:pt-[190px]">
          <p className="mb-5 text-[12px] font-semibold tracking-[0.2em] text-brand uppercase">{intro.eyebrow}</p>
          <h1 id="consultation-title" className="m-0 text-[clamp(42px,6vw,76px)] font-bold leading-[1.07] tracking-[-0.05em] text-brand">{intro.title}</h1>
          <p className="mx-auto mt-7 max-w-[700px] text-[17px] leading-[1.8] text-foreground">{intro.description}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a className="rounded-full border border-brand/20 px-5 py-3 text-[14px] font-semibold text-brand transition-colors hover:bg-mint" href={`tel:${String(intro.phone).replace(/[^+\d]/g, "")}`}>{intro.phone}</a>
            <a className="rounded-full border border-brand/20 px-5 py-3 text-[14px] font-semibold text-brand transition-colors hover:bg-mint" href={`mailto:${intro.email}`}>{intro.email}</a>
          </div>
        </section>

        <ConsultationForm title={String(form.title)} introduction={String(form.introduction)} submitLabel={String(form.submitLabel)} serviceLabel={String(form.serviceLabel)} services={Array.isArray(form.services) ? form.services.map(String) : defaults.form.services} image={String(form.image)} imageEyebrow={String(form.imageEyebrow)} imageHeading={String(form.imageHeading)} />

        <section aria-labelledby="consultation-location-title" className="px-5 py-20 text-center">
          <div className="mx-auto max-w-[980px] rounded-[32px] bg-mint px-6 py-16 sm:px-14">
            <h2 id="consultation-location-title" className="m-0 text-[32px] font-bold leading-tight tracking-[-0.04em] text-brand sm:text-[48px]">{location.title}</h2>
            <p className="mt-6 text-[18px] font-semibold text-brand">{location.city}</p>
            <p className="mt-2 text-[16px] text-foreground">{location.address}</p>
          </div>
        </section>

        <section aria-labelledby="consultation-faq-title" className="mx-auto max-w-[1050px] px-5 pt-5 pb-24">
          <div className="mb-10 text-center">
            <h2 id="consultation-faq-title" className="m-0 text-[clamp(34px,4vw,56px)] font-bold leading-tight tracking-[-0.04em] text-brand">{faq.title}</h2>
            <p className="mt-4 text-[16px] leading-relaxed text-foreground">{faq.description}</p>
          </div>
          <div className="space-y-3">
            {Array.isArray(faq.items) && faq.items.map((item: { question: string; answer: string }) => (
              <details key={item.question} className="group rounded-[20px] bg-white px-6 py-5 open:shadow-[0_12px_40px_#352a4410] sm:px-8">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-[18px] font-semibold text-brand [&::-webkit-details-marker]:hidden">
                  {item.question}<span aria-hidden="true" className="grid size-9 shrink-0 place-items-center rounded-full bg-mint text-brand transition-transform group-open:rotate-90">→</span>
                </summary>
                <p className="mt-4 max-w-[850px] text-[15px] leading-[1.8] text-foreground">{item.answer}</p>
              </details>
            ))}
          </div>
          <div className="mt-9 text-center"><a href="/contact-us" className="inline-flex rounded-full bg-brand px-8 py-4 text-[12px] font-bold tracking-[0.13em] text-cream uppercase transition-colors hover:bg-mint hover:text-brand">{faq.ctaLabel}</a></div>
        </section>
      </main>
      <InnerPageFooter />
      <FloatingCta href="#consultation-form" />
    </div>
  );
}
