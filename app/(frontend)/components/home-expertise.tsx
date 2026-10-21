"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import homeSections from "@/content/home-sections.json";
import { usePageSection } from "./page-sections-provider";
import { useSiteSettings } from "./site-settings-provider";

export default function HomeExpertise() {
  const content = usePageSection("expertise", homeSections.expertise);
  const siteSettings = useSiteSettings();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).dataset.revealed = "true";
          observer.unobserve(entry.target);
        }
      }
    }, { threshold: 0.1, rootMargin: "0px 0px -24px 0px" });
    section.querySelectorAll("[data-expertise-reveal]").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="services" className="home-expertise relative z-1 mb-10 scroll-mt-5 px-5 md:mb-[60px] md:px-[30px] min-[64.0625rem]:mb-[14vh]" aria-labelledby="expertise-heading">
      <div className="home-expertise-panel mx-auto max-w-[1340px] overflow-visible rounded-3xl bg-brand px-5 py-10 md:py-[60px] min-[64.0625rem]:px-[60px] min-[64.0625rem]:py-[7vh]">
        <h2 data-expertise-reveal="" id="expertise-heading" className="m-0 mb-6 text-center text-[30px] font-semibold leading-[1.2] tracking-[-1px] text-cream md:mb-2.5 md:text-[40px] motion-safe:opacity-0 motion-safe:data-[revealed=true]:animate-about-fade-in">{content.headingPrefix} <em className="italic">{content.headingAccent}</em></h2>
        <div className="home-expertise-grid grid grid-cols-[minmax(0,1fr)] gap-6 md:grid-cols-4 md:gap-3 min-[64.0625rem]:gap-5">
          {content.items.map((category) => (
            <article className="home-expertise-card min-w-0 overflow-visible rounded-3xl border border-[#0000001a]" key={category.name} aria-label={category.name}>
              <div className="home-expertise-image relative overflow-hidden rounded-t-3xl min-h-[100vw] md:min-h-[60vw] min-[64.0625rem]:min-h-[37vh]">
                {category.image && <Image className="object-cover" src={category.image} alt="" fill sizes="(max-width: 767px) 100vw, 240px" />}
              </div>
              <div data-expertise-reveal="" style={{ animationDelay: "300ms" }} onFocusCapture={(event) => { event.currentTarget.dataset.revealed = "true"; }} className="home-expertise-details relative z-1 isolate -mt-[140px] flex min-h-[220px] items-center justify-center rounded-b-3xl px-5 pt-[60px] pb-10 md:-mt-[90px] md:min-h-[290px] md:px-2.5 md:pb-[30px] min-[64.0625rem]:-mt-40 min-[64.0625rem]:px-[30px] min-[64.0625rem]:pt-[100px] min-[64.0625rem]:pb-0 before:pointer-events-none before:absolute before:inset-0 before:-z-1 before:rounded-[inherit] before:bg-[linear-gradient(180deg,#ffffff00_25%,#fff_40%)] before:backdrop-blur-[10px] before:[mask-image:linear-gradient(transparent,#000_30%)] motion-safe:opacity-0 motion-safe:data-[revealed=true]:animate-expertise-panel-enter motion-safe:has-[:focus-visible]:opacity-100 motion-safe:has-[:focus-visible]:animate-none">
                <ul className="m-0 w-full list-none p-0">
                  {category.services.map((service) => (
                    <li key={service.path}>
                      <a className="group/expertise flex items-center gap-2 text-[15px] font-semibold leading-[1.8] text-brand no-underline focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-brand focus-visible:outline-offset-4 md:gap-1 md:text-[13px] md:leading-[1.6] min-[64.0625rem]:gap-2 min-[64.0625rem]:text-[15px] min-[64.0625rem]:leading-[1.8]" href={["full-scale-project", "3d-visualization-rendering", "architectural-design-bim", "web-development-application-engineering", "ux-ui-design-brand-identity", "company-setup", "strategic-consultation"].includes(service.path) ? `/${service.path}` : `https://www.mydesign3d.com/${service.path}/`}>
                        <Image className="home-expertise-icon h-auto w-[35px] flex-[0_0_35px] md:w-6 md:basis-6 min-[64.0625rem]:w-[35px] min-[64.0625rem]:basis-[35px]" src={siteSettings.symbolLogoUrl} width={35} height={49} alt="" />
                        <span className="group-hover/expertise:underline group-hover/expertise:underline-offset-4">{service.label}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
