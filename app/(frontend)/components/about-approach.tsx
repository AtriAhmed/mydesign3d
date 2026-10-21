"use client";

import { useEffect, useRef } from "react";
import aboutSections from "@/content/about-sections.json";
import { usePageSection } from "./page-sections-provider";

const headingStyles = "m-0 text-center text-[28px] font-bold leading-[1.1] tracking-[-1.5px] text-brand min-[64.0625rem]:text-[38px]";
const fadeStyles = "motion-safe:opacity-0 motion-safe:data-[revealed=true]:animate-about-fade-in";
export default function AboutApproach() {
  const content = usePageSection("approach", aboutSections.approach);
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
    section.querySelectorAll("[data-approach-reveal]").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="about-approach mt-[25px] mb-10 px-5 md:mt-[45px] md:mb-[60px] min-[64.0625rem]:mt-0 min-[64.0625rem]:mb-[14vh] min-[64.0625rem]:px-[30px]" aria-labelledby="approach-heading">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-2.5">
        <h2 id="approach-heading" data-approach-reveal="" className={`${headingStyles} ${fadeStyles}`}>{content.heading}</h2>
        <h2 data-approach-reveal="" style={{ animationDelay: "50ms" }} className={`${headingStyles} mb-5 min-[64.0625rem]:mb-[50px] ${fadeStyles}`}>{content.subtitle}</h2>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {content.items.map((principle, index) => (
            <article key={principle.title} data-approach-reveal="" style={{ transitionDelay: `${index * 160}ms` }} className="about-approach-card flex flex-col gap-2.5 rounded-3xl bg-white px-5 pt-[30px] pb-5 text-center motion-safe:translate-y-[170px] motion-safe:transition-[translate] motion-safe:duration-[900ms] motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:data-[revealed=true]:translate-y-0 md:min-h-[265px] md:pb-[15px] min-[64.0625rem]:min-h-[300px] min-[64.0625rem]:px-10 min-[64.0625rem]:pt-10 min-[64.0625rem]:pb-[25px]">
              <h3 className="m-0 text-[18px] font-bold leading-[1.3] tracking-[-0.2px] text-brand md:mb-2.5 min-[64.0625rem]:mb-10">{principle.title}</h3>
              <p className="m-0 text-[16px] leading-[1.85]">{principle.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
