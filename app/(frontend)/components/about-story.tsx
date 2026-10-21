"use client";

import { useEffect, useRef } from "react";
import BrandArrow from "./brand-arrow";
import aboutSections from "@/content/about-sections.json";
import { usePageSection } from "./page-sections-provider";
import { useSiteSettings } from "./site-settings-provider";

const fadeStyles = "motion-safe:opacity-0 motion-safe:data-[revealed=true]:animate-about-fade-in";

export default function AboutStory() {
  const content = usePageSection("story", aboutSections.story);
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
    section.querySelectorAll("[data-story-reveal]").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="about-story bg-[linear-gradient(180deg,#fff_20%,#f2fff8_100%)] px-5 min-[64.0625rem]:px-[30px]" aria-labelledby="story-heading">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-x-5 gap-y-2.5 md:grid-cols-2">
        <div data-story-reveal="" style={{ animationDelay: "100ms" }} className={`about-story-copy flex flex-col gap-2.5 pt-2.5 md:pt-0 min-[64.0625rem]:py-[7vh] ${fadeStyles}`}>
          <p className="m-0 text-[16px] font-medium leading-[1.85] tracking-[2px]">{content.eyebrow}</p>
          <h2 id="story-heading" className="m-0 mb-[15px] text-[28px] font-bold leading-[1.1] tracking-[-1.5px] text-brand min-[64.0625rem]:mb-[25px] min-[64.0625rem]:text-[38px]">{content.heading}</h2>
          <p className="m-0 text-[16px] leading-[1.85]">{content.description}</p>
        </div>
        <div className="about-story-portrait order-first min-w-0 md:order-last min-[64.0625rem]:pl-[16%]">
          <div className="relative flex flex-col md:sticky md:top-[100px] min-[64.0625rem]:static">
            <div data-story-reveal="" style={{ animationDelay: "150ms", backgroundImage: `url(${JSON.stringify(content.image)})` }} className={`about-story-image min-h-[100vw] rounded-3xl bg-white bg-cover bg-top bg-no-repeat md:min-h-[478px] min-[64.0625rem]:min-h-[728px] ${fadeStyles}`} role="img" aria-label="Majdi Boujdaria, MyDesign3D" />
            <div data-story-reveal="" className="relative z-2 -mt-20 h-20 rounded-b-3xl bg-[linear-gradient(180deg,#e9fff400_0%,#f2fff8_95%)] motion-safe:opacity-0 motion-safe:data-[revealed=true]:animate-slide-up-enter md:-mt-[100px] md:h-[100px] min-[64.0625rem]:-mt-[95px] min-[64.0625rem]:h-[95px] before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:backdrop-blur-[10px] before:[mask-image:linear-gradient(transparent,#000_50%)]" aria-hidden="true" />
            <div className="relative z-3 -mt-[30px] flex justify-start md:justify-center">
              <a data-story-reveal="" style={{ animationDelay: "300ms", animationDuration: "1.2s" }} onFocus={(event) => { event.currentTarget.dataset.revealed = "true"; }} href={siteSettings.consultationUrl} className="group/story inline-flex min-h-[52px] max-w-full items-center justify-center gap-3 rounded-[80px] bg-brand py-2 pr-3.5 pl-5 text-[10px] font-bold leading-[1.1] tracking-[1.5px] text-cream uppercase no-underline shadow-[9px_9px_13px_#00000080] transition-colors duration-300 hover:bg-mint hover:text-brand focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-4 motion-reduce:transition-none motion-safe:opacity-0 motion-safe:data-[revealed=true]:animate-slide-up-enter motion-safe:focus-visible:opacity-100 motion-safe:focus-visible:animate-none min-[64.0625rem]:gap-5 min-[64.0625rem]:pl-9 min-[64.0625rem]:text-[12px]">
                <span className="relative after:pointer-events-none after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-current after:transition-transform after:duration-600 after:ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/story:after:origin-left group-hover/story:after:scale-x-100 group-focus-visible/story:after:origin-left group-focus-visible/story:after:scale-x-100 motion-reduce:after:transition-none">{content.ctaLabel}</span>
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-mint text-brand transition-[scale,background-color,color] duration-300 group-hover/story:scale-120 group-hover/story:bg-brand group-hover/story:text-mint group-focus-visible/story:scale-120 group-focus-visible/story:bg-brand group-focus-visible/story:text-mint motion-reduce:transition-none"><BrandArrow /></span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
