"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import BrandArrow from "./brand-arrow";
import aboutSections from "@/content/about-sections.json";
import { usePageSection } from "./page-sections-provider";
import { useSiteSettings } from "./site-settings-provider";

const fadeStyles = "motion-safe:opacity-0 motion-safe:data-[revealed=true]:animate-about-fade-in";
function Benefit({ title, description }: { title: string; description: string }) {
  const siteSettings = useSiteSettings();
  return (
    <article className="flex flex-col items-center gap-2.5 text-center min-[64.0625rem]:gap-[5px]">
      <Image className="block h-[34px] w-7 object-contain" src={siteSettings.symbolLogoUrl} alt="" width={28} height={40} />
      <h3 className="m-0 text-[16px] font-medium leading-[1.4] tracking-[-0.2px] text-brand min-[64.0625rem]:mt-[5px] min-[64.0625rem]:text-[20px]">{title}</h3>
      <p className="m-0 w-[90%] text-[16px] leading-[1.85]">{description}</p>
    </article>
  );
}

export default function AboutBenefits() {
  const content = usePageSection("benefits", aboutSections.benefits);
  const siteSettings = useSiteSettings();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const reveal = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).dataset.revealed = "true";
          observer.unobserve(entry.target);
        }
      }
    };
    const observer = new IntersectionObserver(reveal, { threshold: 0.1, rootMargin: "0px 0px -24px 0px" });
    section.querySelectorAll("[data-benefits-reveal]:not([data-benefits-cta])").forEach((element) => observer.observe(element));
    const ctaObserver = new IntersectionObserver(reveal, { threshold: 0.25, rootMargin: "0px 0px -30% 0px" });
    const cta = section.querySelector("[data-benefits-cta]");
    if (cta) ctaObserver.observe(cta);
    return () => { observer.disconnect(); ctaObserver.disconnect(); };
  }, []);

  return (
    <section ref={sectionRef} className="about-benefits relative isolate flex flex-col justify-center px-5 min-[64.0625rem]:min-h-[880px] min-[64.0625rem]:px-[30px]" aria-label="The benefits of working with MyDesign3D">
      <div className="mx-auto grid w-full max-w-[1180px] grid-cols-1 items-center justify-between gap-x-5 gap-y-2.5 md:grid-cols-[minmax(0,1fr)_280px_minmax(0,1fr)] min-[64.0625rem]:grid-cols-[25%_380px_25%] min-[64.0625rem]:items-stretch">
        <div data-benefits-reveal="" className={`relative z-3 flex flex-col justify-between gap-2.5 md:min-h-[300px] md:gap-5 min-[64.0625rem]:min-h-[400px] min-[64.0625rem]:pb-[30px] ${fadeStyles}`}>
          {content.items.slice(0, 2).map((benefit) => <Benefit key={benefit.title} {...benefit} />)}
        </div>
        <div className="about-benefits-image relative order-first mb-5 w-[min(300px,100%)] justify-self-center overflow-visible rounded-[200px] border border-[#0000001a] p-5 md:order-none md:mb-0 md:w-full min-[64.0625rem]:p-10">
          <Image className="block h-auto w-full rounded-[200px]" src={content.image} alt="Business collaboration" width={667} height={1000} sizes="(max-width: 767px) 258px, (max-width: 1024px) 238px, 298px" />
          <div data-benefits-reveal="" data-benefits-cta="" onFocusCapture={(event) => { event.currentTarget.dataset.revealed = "true"; }} className="absolute inset-x-0 bottom-0 z-4 flex h-[200px] items-end justify-center rounded-b-[200px] motion-safe:invisible motion-safe:data-[revealed=true]:visible motion-safe:data-[revealed=true]:animate-benefits-glass-enter motion-safe:has-[:focus-visible]:visible motion-safe:has-[:focus-visible]:animate-none min-[64.0625rem]:h-[260px] before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:backdrop-blur-[10px] before:[mask-image:linear-gradient(transparent_0%,#000_30%)]">
            <a href={siteSettings.consultationUrl} className="group/benefits relative inline-flex min-h-[52px] items-center justify-center gap-3 rounded-[80px] bg-brand py-2 pr-3.5 pl-5 text-[10px] font-bold leading-[1.1] tracking-[1.5px] text-cream no-underline uppercase shadow-[9px_9px_13px_#00000080] transition-colors duration-300 hover:bg-mint hover:text-brand focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-4 motion-reduce:transition-none min-[64.0625rem]:gap-5 min-[64.0625rem]:pl-9 min-[64.0625rem]:text-[12px]">
              <span className="relative after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-current after:transition-transform after:duration-600 after:ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/benefits:after:origin-left group-hover/benefits:after:scale-x-100 group-focus-visible/benefits:after:origin-left group-focus-visible/benefits:after:scale-x-100 motion-reduce:after:transition-none">{content.ctaLabel}</span>
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-mint text-brand transition-[scale,background-color,color] duration-300 group-hover/benefits:scale-120 group-hover/benefits:bg-brand group-hover/benefits:text-mint group-focus-visible/benefits:scale-120 group-focus-visible/benefits:bg-brand group-focus-visible/benefits:text-mint motion-reduce:transition-none"><BrandArrow /></span>
            </a>
          </div>
        </div>
        <div data-benefits-reveal="" className={`relative z-3 flex flex-col justify-between gap-2.5 md:min-h-[300px] md:gap-5 min-[64.0625rem]:min-h-[400px] min-[64.0625rem]:gap-[30px] min-[64.0625rem]:pb-[30px] ${fadeStyles}`}>
          {content.items.slice(2).map((benefit) => <Benefit key={benefit.title} {...benefit} />)}
        </div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-2 hidden h-[60px] bg-[linear-gradient(180deg,#faf2ea00,#faf2ea)] backdrop-blur-[10px] [mask-image:linear-gradient(transparent,#000)] md:block min-[64.0625rem]:h-[24vh]" aria-hidden="true" />
    </section>
  );
}
