"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import homeSections from "@/content/home-sections.json";
import { usePageSection } from "./page-sections-provider";
import { useSiteSettings } from "./site-settings-provider";

const revealStyles = "motion-safe:opacity-0 motion-safe:data-[revealed=true]:animate-about-fade-in motion-safe:has-[:focus-visible]:opacity-100 motion-safe:has-[:focus-visible]:animate-none";

export default function HomeWhyUs() {
  const content = usePageSection("whyUs", homeSections.whyUs);
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
    section.querySelectorAll("[data-why-us-reveal]").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="home-why-us mb-10 px-6 md:px-[30px] min-[64.0625rem]:mb-[14vh]" aria-labelledby="why-us-heading">
      <div className="home-why-us-inner relative mx-auto grid max-w-[1280px] grid-cols-[minmax(0,1fr)] gap-9 border-l border-[#0000001a] pl-[25px] md:grid-cols-2 md:gap-[normal] md:border-l-0 md:pl-0 min-[64.0625rem]:min-h-[750px]">
        <div className="home-why-us-logo-track pointer-events-none absolute inset-y-0 left-0 w-5 -translate-x-1/2 md:left-1/2 md:w-[26px] min-[64.0625rem]:w-[57px]" aria-hidden="true">
          <Image data-why-us-reveal="" style={{ animationDelay: "150ms" }} className={`home-why-us-logo ${revealStyles} sticky top-[30px] block h-7 w-5 object-contain md:h-[37px] md:w-[26px] min-[64.0625rem]:h-20 min-[64.0625rem]:w-[57px]`} src={siteSettings.symbolLogoUrl} alt="" width={57} height={80} />
        </div>
        <div className="home-why-us-intro md:border-r md:border-[#0000001a] md:pt-[60px] md:pr-5 min-[64.0625rem]:py-[10vh] min-[64.0625rem]:pr-[16%]">
          <h2 data-why-us-reveal="" style={{ animationDelay: "100ms" }} id="why-us-heading" className={`${revealStyles} m-0 text-[30px] font-bold leading-[1.15] tracking-[-1px] text-brand md:text-[32px] md:leading-[1.05] md:tracking-[-1.5px] min-[64.0625rem]:text-[40px]`}>{content.heading}</h2>
          <ul data-why-us-reveal="" style={{ animationDelay: "100ms" }} onFocusCapture={(event) => { event.currentTarget.dataset.revealed = "true"; }} className={`home-why-us-services ${revealStyles} m-0 mt-5 grid list-none grid-cols-[minmax(0,1fr)] gap-0 p-0 md:mt-[105px] md:gap-2.5 min-[64.0625rem]:mt-[190px] min-[64.0625rem]:grid-cols-2`}>
            {content.services.map((service) => (
              <li key={service.label}>
                <a className="flex min-h-10 items-baseline gap-2 rounded-3xl px-2 py-3 text-[14px] font-medium leading-[1.6] tracking-[1.5px] text-[#383838] no-underline transition-[background] duration-300 ease-[ease] hover:bg-mint focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-brand focus-visible:outline-offset-2 motion-reduce:transition-none md:min-h-[50px] md:p-[15px] md:text-[16px] md:tracking-[2px]" href={`https://www.mydesign3d.com/${service.path}/`}>
                  <span className="text-brand" aria-hidden="true">•</span>{service.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="home-why-us-reasons flex flex-col gap-4 text-[16px] leading-[1.5] text-[#383838] md:py-[60px] md:pl-5 md:leading-[1.8] min-[64.0625rem]:pt-[10vh] min-[64.0625rem]:pb-[calc(10vh+90px)] min-[64.0625rem]:pl-[16%]">
          {content.reasons.map((reason) => (
            <div data-why-us-reveal="" style={{ animationDelay: "50ms" }} className={`home-why-us-reason ${revealStyles}`} key={reason.title}>
              <h3 className="m-0 mb-4 text-[inherit] font-bold leading-[inherit] md:mb-5">{reason.title}</h3>
              <p className="m-0">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
