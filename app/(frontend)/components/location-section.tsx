"use client";

import { useEffect, useRef } from "react";
import BrandArrow from "./brand-arrow";
import aboutSections from "@/content/about-sections.json";
import { usePageSection } from "./page-sections-provider";

const fadeStyles = "motion-safe:opacity-0 motion-safe:data-[revealed=true]:animate-about-fade-in motion-safe:focus-visible:opacity-100 motion-safe:focus-visible:animate-none motion-safe:has-[:focus-visible]:opacity-100 motion-safe:has-[:focus-visible]:animate-none";
const contactStyles = "group/contact inline-flex max-w-full items-center justify-center gap-2.5 rounded-[80px] bg-transparent px-9 py-4 text-[12px] font-bold leading-[1.7] tracking-[1.5px] text-brand uppercase no-underline transition-shadow duration-300 hover:shadow-[0_0_20px_4px_#fffc] focus-visible:shadow-[0_0_20px_4px_#fffc] focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-4 motion-reduce:transition-none";
const contactIconStyles = "grid size-[50px] shrink-0 place-items-center rounded-full border border-black/10 bg-transparent text-[#070807e5] transition-[background-color,border-color,color] duration-300 group-hover/contact:border-mint group-hover/contact:bg-mint group-hover/contact:text-brand group-focus-visible/contact:border-mint group-focus-visible/contact:bg-mint group-focus-visible/contact:text-brand motion-reduce:transition-none";
const contactLabelStyles = "relative pb-[1.2px] after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-right after:scale-x-0 after:bg-current after:content-[''] after:transition-transform after:duration-500 group-hover/contact:after:origin-left group-hover/contact:after:scale-x-100 group-focus-visible/contact:after:origin-left group-focus-visible/contact:after:scale-x-100 motion-reduce:after:transition-none";

type LocationSectionProps = {
  imagePosition?: "left" | "right";
  variant?: "about" | "office";
};

export default function LocationSection({ imagePosition = "left", variant = "about" }: LocationSectionProps) {
  const content = usePageSection("location", aboutSections.location);
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
    section.querySelectorAll("[data-location-reveal]").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={`about-location px-5 min-[64.0625rem]:px-[30px] ${variant === "office" ? "bg-cream py-[7vh]" : "bg-[linear-gradient(180deg,#fff_20%,#f2fff8_100%)]"}`} aria-labelledby="location-heading">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-x-5 gap-y-2.5 md:grid-cols-2">
        <div data-location-reveal="" style={{ animationDuration: "2s", backgroundImage: `url(${JSON.stringify(content.image)})` }} className={`about-location-image min-h-[80vw] rounded-3xl bg-cover bg-center bg-no-repeat md:min-h-[500px] min-[64.0625rem]:min-h-[550px] ${imagePosition === "right" ? "md:order-2" : ""} ${fadeStyles}`} aria-hidden="true" />
        <div className={`flex flex-col items-start gap-2.5 pt-2.5 md:pt-[30px] min-[64.0625rem]:pt-[5vh] ${imagePosition === "right" ? "md:order-1 min-[64.0625rem]:pr-[16%]" : "min-[64.0625rem]:pl-[16%]"}`}>
          <h2 id="location-heading" data-location-reveal="" style={{ animationDelay: "50ms" }} className={`m-0 text-[28px] font-bold leading-[1.1] tracking-[-1.5px] text-brand min-[64.0625rem]:text-[38px] ${fadeStyles}`}>{variant === "office" ? content.officeHeading : <>{content.heading}<br /><em className="italic">{content.headingAccent}</em></>}</h2>
          <div className="w-full py-[7.5px] md:py-2.5 min-[64.0625rem]:py-[25px]" aria-hidden="true"><div className="h-px bg-[#0000001a]" /></div>
          {variant === "about" && <h3 data-location-reveal="" style={{ animationDelay: "100ms" }} className={`m-0 text-[18px] font-bold leading-[1.3] tracking-[-0.2px] text-brand ${fadeStyles}`}>{content.city}</h3>}
          <p data-location-reveal="" style={{ animationDelay: "100ms" }} className={`m-0 mb-2.5 text-[16px] leading-[1.85] min-[64.0625rem]:mb-[25px] ${fadeStyles}`}>{content.address}</p>
          <div data-location-reveal="" style={{ animationDelay: "150ms" }} onFocusCapture={(event) => { event.currentTarget.dataset.revealed = "true"; }} className={`mb-2.5 flex w-full flex-col items-start gap-2.5 md:mb-5 min-[64.0625rem]:mb-[30px] min-[64.0625rem]:flex-row min-[64.0625rem]:flex-wrap min-[64.0625rem]:gap-5 min-[87.5rem]:w-max min-[87.5rem]:flex-nowrap ${fadeStyles}`}>
            <a href={`tel:${content.phone.replace(/[^+\d]/g, "")}`} className={`${contactStyles} pl-0`}>
              <span className={contactIconStyles}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m8 3 3 5-3 2c1.3 3 3 4.7 6 6l2-3 5 3-1 4c-.2.8-1 1.2-1.8 1C9.4 19.4 4.6 14.6 3 5.8c-.2-.8.2-1.6 1-1.8l4-1Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /><path d="M15 3v3m3-1-2 2m5 2h-3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg></span>
              <span className={`${contactLabelStyles} whitespace-nowrap`}>{content.phone}</span>
            </a>
            <a href={`mailto:${content.email}?subject=Hello`} className={contactStyles}>
              <span className={contactIconStyles}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="4" stroke="currentColor" strokeWidth="2" /><path d="m4 6 6 5a3 3 0 0 0 4 0l6-5" stroke="currentColor" strokeWidth="2" /></svg></span>
              <span className={`${contactLabelStyles} break-all`}>{content.email}</span>
            </a>
          </div>
          <a data-location-reveal="" style={{ animationDelay: "200ms", animationDuration: "1.2s" }} onFocus={(event) => { event.currentTarget.dataset.revealed = "true"; }} href={content.mapUrl} target="_blank" rel="noopener noreferrer" className="group/location inline-flex min-h-[52px] items-center justify-center gap-5 rounded-[80px] bg-brand py-2 pr-3.5 pl-9 text-[12px] font-bold leading-[1.1] tracking-[1.5px] text-cream uppercase no-underline shadow-[9px_9px_13px_#00000080] transition-colors duration-300 hover:bg-mint hover:text-brand focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-4 motion-reduce:transition-none motion-safe:opacity-0 motion-safe:data-[revealed=true]:animate-slide-up-enter motion-safe:focus-visible:opacity-100 motion-safe:focus-visible:animate-none">
            <span className="relative after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-current after:transition-transform after:duration-600 after:ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/location:after:origin-left group-hover/location:after:scale-x-100 group-focus-visible/location:after:origin-left group-focus-visible/location:after:scale-x-100 motion-reduce:after:transition-none">{content.ctaLabel}</span>
            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-mint text-brand transition-[scale,background-color,color] duration-300 group-hover/location:scale-120 group-hover/location:bg-brand group-hover/location:text-mint group-focus-visible/location:scale-120 group-focus-visible/location:bg-brand group-focus-visible/location:text-mint motion-reduce:transition-none"><BrandArrow /></span>
          </a>
        </div>
      </div>
    </section>
  );
}
