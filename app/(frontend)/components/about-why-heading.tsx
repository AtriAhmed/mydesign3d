"use client";

import { useEffect, useRef } from "react";
import aboutSections from "@/content/about-sections.json";
import { usePageSection } from "./page-sections-provider";

const fadeStyles = "motion-safe:opacity-0 motion-safe:data-[revealed=true]:animate-about-fade-in";

export default function AboutWhyHeading() {
  const content = usePageSection("whyHeading", aboutSections.whyHeading);
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
    section.querySelectorAll("[data-why-heading-reveal]").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="about-why-heading mb-2.5 px-5 text-center text-brand md:mb-0 min-[64.0625rem]:px-[30px]" aria-labelledby="why-choose-heading">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-2.5">
        <h2 id="why-choose-heading" data-why-heading-reveal="" className={`m-0 text-[28px] font-bold leading-[1.1] tracking-[-1.5px] min-[64.0625rem]:text-[38px] ${fadeStyles}`}>{content.heading}</h2>
        <h3 data-why-heading-reveal="" style={{ animationDelay: "50ms" }} className={`m-0 mb-5 text-[16px] font-medium leading-[1.4] tracking-[-0.2px] md:mb-[30px] min-[64.0625rem]:mb-[60px] min-[64.0625rem]:text-[20px] ${fadeStyles}`}>{content.subtitle}</h3>
      </div>
    </section>
  );
}
