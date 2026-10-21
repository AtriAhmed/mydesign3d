"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import BrandArrow from "./brand-arrow";
import { usePageSection } from "./page-sections-provider";

const teamDescription = "Our team operates across 5 countries — Turkey, Tunisia, Qatar, UAE, and Canada — bringing together expertise in architecture, design, and development. Majdi Boujdaria leads from Turkey; Amrou Lessis, Mahdi Bakkar, and Mahdi Boujdaria anchor the team from Tunisia; Hilmi drives operations from Qatar; Mariem Nabhen covers the UAE; and Nesrine brings her expertise from Canada. One team, one standard, no matter where in the world the work happens.";

const accordionItems = [
  {
    title: "Who We Are",
    content: "We’re a multidisciplinary firm based in Wyoming, USA, operating globally across architecture, design, and digital development. One company, one culture, one standard of quality — applied across every discipline we cover.",
  },
  {
    title: "Our Commitment",
    content: "We believe great projects fail at the seams — the gaps between teams, vendors, and disciplines. Our model eliminates those seams. One contract, one point of contact, one team accountable for the whole.",
  },
  {
    title: "Our Approach",
    content: "We start by listening. Every Full Scale Project begins with a deep-dive discovery session — not a sales pitch. We map your goals, your constraints, and your timeline before we propose a single solution. Then we build around what you actually need.",
  },
];

const fadeIn = "motion-safe:opacity-0 motion-safe:data-[revealed=true]:animate-about-fade-in";
const slideIn = "motion-safe:opacity-0 motion-safe:data-[revealed=true]:animate-slide-up-enter";

export default function FullScaleTeam() {
  const section = usePageSection("team", {
    title: "Welcome to MyDesign3D\nwhere complexity isn't an obstacle\nit's our specialty.",
    image: "/images/full-scale-team.jpg",
    imageAlt: "The MyDesign3D team",
    aboutButtonLabel: "Read more about us →",
    aboutButtonUrl: "/about",
    teamButtonLabel: "Meet our team →",
    teamButtonUrl: "/our-team",
    imageTitle: "Meet our team — Globally distributed.",
    teamDescription,
    introduction: "Our team brings together architects, designers, and developers who have worked side by side since 2011. We don’t subcontract your vision to strangers — we own it, together, from the first sketch to the final deployment.",
    accordionItems,
  });
  const sectionRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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
    }, { threshold: 0.1, rootMargin: "0px 0px -20px 0px" });

    section.querySelectorAll("[data-team-reveal]").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} aria-labelledby="full-scale-team-heading" className="bg-[linear-gradient(180deg,#f2fff8_0%,#faf2ea_40%)] px-5 pt-[30px] pb-[30px] lg:px-[30px] lg:pt-[63px] lg:pb-[63px]">
      <div className="mx-auto max-w-[1280px]">
        <h2 id="full-scale-team-heading" data-team-reveal="" className={`mx-auto mb-2.5 max-w-[950px] text-center text-[28px] font-bold leading-[1.1] tracking-[-1.5px] text-brand lg:mb-[90px] lg:text-[38px] ${fadeIn}`}>
          {section.title.split("\n").map((line, index) => <span key={index}>{index > 0 && <br />}{line}</span>)}
        </h2>

        <div className="grid grid-cols-1 gap-2.5 lg:grid-cols-2 lg:gap-5">
          <div className="min-w-0 lg:pr-[100px]">
            <div className="rounded-[45px] bg-white px-5 pt-5 pb-[60px] text-center lg:sticky lg:top-[100px] lg:pb-[70px]">
              <div data-team-reveal="" className={`relative aspect-square overflow-hidden rounded-[24px] ${fadeIn}`}>
                <Image src={section.image} alt={section.imageAlt} fill sizes="(max-width: 1023px) 310px, 490px" className="object-cover" />
                <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-[linear-gradient(180deg,#fff0_0%,#fff_95%)] before:absolute before:inset-0 before:backdrop-blur-[10px] before:[mask-image:linear-gradient(transparent,#000)] before:content-[''] lg:h-[110px]" />
              </div>
              <h3 data-team-reveal="" style={{ animationDelay: "50ms" }} className={`mt-[30px] text-[18px] font-bold leading-[1.45] text-brand lg:mt-[45px] ${slideIn}`}>
                {section.imageTitle}
              </h3>
              <p data-team-reveal="" style={{ animationDelay: "100ms" }} className={`mt-2.5 text-[16px] leading-[1.85] text-foreground ${slideIn}`}>
                {section.teamDescription}
              </p>
            </div>
          </div>

          <div className="min-w-0 pt-2.5 lg:pt-[63px]">
            <p data-team-reveal="" className={`text-[16px] leading-[1.85] text-foreground ${fadeIn}`}>
              {section.introduction}
            </p>

            <div data-team-reveal="" style={{ animationDelay: "50ms" }} className={`mt-10 border-t border-brand ${fadeIn}`}>
              {section.accordionItems.map((item, index) => {
                const isOpen = openIndex === index;
                return (
                  <div key={item.title} className="border-b border-brand">
                    <button type="button" aria-expanded={isOpen} aria-controls={`full-scale-team-panel-${index}`} onClick={() => setOpenIndex(isOpen ? null : index)} className="flex min-h-[59px] w-full cursor-pointer items-center justify-between gap-4 py-4 text-left text-[16px] leading-[1.5] text-foreground focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-[-2px] lg:min-h-[72px]">
                      <span>{item.title}</span>
                      <span aria-hidden="true" className={`grid size-5 shrink-0 place-items-center text-brand transition-transform duration-400 motion-reduce:transition-none ${isOpen ? "-rotate-90" : "rotate-90"}`}><BrandArrow /></span>
                    </button>
                    <div id={`full-scale-team-panel-${index}`} role="region" aria-hidden={!isOpen} className={`grid transition-[grid-template-rows] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                      <div className="min-h-0 overflow-hidden">
                        <p className="pb-5 text-[16px] leading-[1.85] text-foreground">{item.content}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-2.5">
              <a data-team-reveal="" style={{ animationDelay: "100ms" }} href={section.aboutButtonUrl} className={`group/team-about inline-flex min-h-[51px] items-center gap-5 rounded-[80px] bg-brand py-2 pr-3.5 pl-9 text-[12px] font-bold leading-[1.1] tracking-[1.5px] whitespace-nowrap text-cream uppercase no-underline transition-colors duration-300 hover:bg-mint hover:text-brand focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-4 motion-reduce:transition-none ${slideIn}`}>
                <span className="relative after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-current after:transition-transform after:duration-600 group-hover/team-about:after:origin-left group-hover/team-about:after:scale-x-100">{section.aboutButtonLabel}</span>
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-mint text-brand transition-[scale,background-color,color] duration-300 group-hover/team-about:scale-120 group-hover/team-about:bg-brand group-hover/team-about:text-mint" aria-hidden="true"><BrandArrow /></span>
              </a>
              <a data-team-reveal="" style={{ animationDelay: "150ms" }} href={section.teamButtonUrl} className={`group/team-more inline-flex min-h-[51px] items-center gap-5 rounded-[80px] px-5 text-[12px] font-bold leading-[1.1] tracking-[1.5px] whitespace-nowrap text-brand uppercase no-underline focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-4 ${slideIn}`}>
                <span className="relative after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-current after:transition-transform after:duration-600 group-hover/team-more:after:origin-left group-hover/team-more:after:scale-x-100">{section.teamButtonLabel}</span>
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-brand text-mint transition-[scale,background-color,color] duration-300 group-hover/team-more:scale-120 group-hover/team-more:bg-mint group-hover/team-more:text-brand" aria-hidden="true"><BrandArrow /></span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
