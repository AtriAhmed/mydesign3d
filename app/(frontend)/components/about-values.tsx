"use client";

import { useEffect, useRef } from "react";
import aboutSections from "@/content/about-sections.json";
import { usePageSection } from "./page-sections-provider";

const fadeStyles = "motion-safe:opacity-0 motion-safe:data-[revealed=true]:animate-about-fade-in";
export default function AboutValues() {
  const content = usePageSection("values", aboutSections.values);
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
    section.querySelectorAll("[data-values-reveal]").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="about-values mb-[25px] bg-cream px-5 md:mb-[60px] min-[64.0625rem]:mb-[14vh] min-[64.0625rem]:px-[30px]" aria-labelledby="values-heading">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-x-5 gap-y-2.5 md:grid-cols-2">
        <div className="about-values-image-track min-w-0 min-[64.0625rem]:pr-[16%]">
          <div data-values-reveal="" style={{ backgroundImage: `url(${JSON.stringify(content.image)})` }} className={`about-values-image grid min-h-[80vw] place-items-center rounded-3xl bg-white bg-cover bg-center bg-no-repeat p-[30px] md:sticky md:top-[100px] md:min-h-[500px] min-[64.0625rem]:min-h-[700px] ${fadeStyles}`}>
            <span className="text-center text-[16px] font-medium leading-none tracking-[2px] text-white">{content.imageWord}</span>
          </div>
        </div>
        <div className="about-values-copy flex flex-col gap-2.5 pt-2.5 md:pt-[30px] min-[64.0625rem]:pt-[8vh]">
          {content.items.map((value, index) => (
            <div key={value.title} className="flex flex-col gap-2.5">
              <h2 id={index === 0 ? "values-heading" : undefined} data-values-reveal="" style={{ animationDelay: `${index * 100}ms` }} className={`m-0 text-[28px] font-bold leading-[1.1] tracking-[-1.5px] text-brand md:mb-[5px] min-[64.0625rem]:mb-[30px] min-[64.0625rem]:text-[38px] ${fadeStyles}`}>{value.title}</h2>
              <p data-values-reveal="" style={{ animationDelay: `${index * 100 + 50}ms` }} className={`m-0 text-[16px] leading-[1.85] ${fadeStyles}`}>{value.description}</p>
              <div className="-mt-4 py-[15px] md:mt-0 md:pt-[5px] md:pb-[19px] min-[64.0625rem]:my-[3vh] min-[64.0625rem]:pt-[15px] min-[64.0625rem]:pb-[29px]" aria-hidden="true"><div className="h-px bg-[#0000001a]" /></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
