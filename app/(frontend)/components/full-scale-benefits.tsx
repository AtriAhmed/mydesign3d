"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import BrandArrow from "./brand-arrow";
import { usePageSection } from "./page-sections-provider";
import { useSiteSettings } from "./site-settings-provider";

const disciplines = [
  {
    title: "Architecture & Design",
    description: "Architectural plans, BIM modeling, 3D renders, and full spatial design from concept to construction-ready documents.",
    image: "/images/full-scale-architecture.jpg",
  },
  {
    title: "Digital & Web",
    description: "Web applications, UI/UX design, brand identity, and full-stack development — engineered for performance and scale.",
    image: "/images/full-scale-web.jpg",
  },
  {
    title: "Business Setup",
    description: "Company formation, business planning, and strategic consulting — from incorporation to go-to-market readiness.",
    image: "/images/full-scale-business.jpg",
  },
];

const steps = [
  {
    title: "Discover & Scope",
    image: "/images/full-scale-scope.jpg",
    description: "We start with a free consultation to map your vision, define the full scope, and assemble the right team for your specific project. No generic packages, every engagement is custom-built.",
    details: ["Project brief & requirements workshop", "Cross-discipline team assignment", "Timeline and milestone planning"],
  },
  {
    title: "Design & Build",
    image: "/images/full-scale-design-build.jpg",
    description: "Our integrated team works simultaneously across architecture, UX, and development, so nothing waits on a handoff. You get a single, unified output, not disconnected deliverables.",
    details: ["Architecture plans & 3D visualization", "UI/UX design & brand identity", "Web development & application engineering"],
  },
  {
    title: "Launch & Operate",
    image: "/images/full-scale-launch.jpg",
    description: "We don’t hand over files and disappear. We stay through deployment, go-live, and post-launch support making sure everything works in the real world, not just on paper.",
    details: ["Final delivery & deployment", "Final delivery & deployment", "Post-launch monitoring & support"],
  },
];

const fadeIn = "motion-safe:opacity-0 motion-safe:data-[revealed=true]:animate-about-fade-in";

export default function FullScaleBenefits() {
  const siteSettings = useSiteSettings();
  const section = usePageSection("benefits", {
    title: "Everything Your Full-Scale Project Needs — Architecture, Design, Digital & Business",
    subtitle: "One engagement covers all disciplines — no extras, no gaps.",
    disciplines,
    processTitle: "How We Deliver Your Project — Proven Full-Scale Project Management Process",
    processSubtitle: "A proven process, built around your timeline and goals.",
    learnMoreLabel: "Learn more",
    steps,
  });
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
    }, { threshold: 0.12, rootMargin: "0px 0px -20px 0px" });

    section.querySelectorAll("[data-full-scale-reveal]").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="benefits" ref={sectionRef} aria-labelledby="full-scale-benefits-heading" className="bg-cream px-5 pb-20 md:px-[30px] md:pb-[100px]">
      <div className="mx-auto max-w-[1280px]">
        <div className="pt-10 md:pt-[14vh]">
          <h2 id="full-scale-benefits-heading" data-full-scale-reveal="" className={`mx-auto max-w-[1200px] text-center text-[28px] font-bold leading-[1.1] tracking-[-1.5px] text-brand md:text-[38px] ${fadeIn}`}>
            {section.title}
          </h2>
          <p data-full-scale-reveal="" style={{ animationDelay: "50ms" }} className={`mt-2.5 mb-2.5 text-center text-[16px] leading-[1.5] text-brand md:text-[20px] ${fadeIn}`}>
            {section.subtitle}
          </p>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-0">
            {section.disciplines.map((discipline, index) => (
              <article key={discipline.title} className={`flex min-h-[270px] flex-col items-center gap-[5px] border-b border-[#352a4426] text-center last:border-b-0 md:min-h-[368px] md:gap-2.5 md:border-b-0 ${index < section.disciplines.length - 1 ? "md:border-r" : ""}`}>
                <div className="relative h-[120px] w-full md:h-[190px]">
                  <Image src={discipline.image} alt="" fill sizes="(max-width: 767px) 110px, 170px" className="object-contain mix-blend-multiply" />
                </div>
                <div data-full-scale-reveal="" style={{ animationDelay: `${index * 50}ms` }} className={`flex min-h-[149px] w-full flex-col items-center px-5 pb-[5px] md:min-h-[168px] md:px-[30px] ${fadeIn}`}>
                  <h3 className="text-[18px] font-bold leading-[1.4] text-brand">{discipline.title}</h3>
                  <p className="mt-2.5 text-[16px] leading-[1.85] text-foreground">{discipline.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-[30px] md:mt-[14vh]">
          <h2 id="full-scale-process-heading" data-full-scale-reveal="" className={`mx-auto max-w-[1200px] text-center text-[28px] font-bold leading-[1.1] tracking-[-1.5px] text-brand md:text-[38px] ${fadeIn}`}>
            {section.processTitle}
          </h2>
          <p data-full-scale-reveal="" style={{ animationDelay: "50ms" }} className={`mt-2.5 mb-2.5 text-center text-[16px] leading-[1.5] text-brand md:text-[20px] ${fadeIn}`}>
            {section.processSubtitle}
          </p>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {section.steps.map((step, index) => (
              <article key={step.title} data-full-scale-reveal="" style={{ animationDelay: `${index * 50}ms` }} className="flex min-h-[584px] flex-col items-center rounded-3xl bg-white px-5 pt-[30px] pb-[30px] text-center motion-safe:opacity-0 motion-safe:data-[revealed=true]:animate-slide-up-enter md:min-h-[688px] md:px-10 md:pt-[45px] md:pb-10">
                <h3 className="text-[20px] font-medium leading-[1.4] text-brand">{step.title}</h3>
                <Image src={step.image} alt="" width={220} height={220} sizes="220px" className="mt-[15px] block size-[220px] object-cover" />
                <p className="mt-2.5 text-[16px] leading-[1.85] text-foreground">{step.description}</p>
                <ul className="mt-auto flex w-full flex-col gap-[5px] pt-5 text-left text-[14px] leading-[1.6] text-foreground">
                  {step.details.map((detail, detailIndex) => (
                    <li key={`${detail}-${detailIndex}`} className="flex items-start gap-3">
                      <Image src={siteSettings.symbolLogoUrl} alt="" width={14} height={20} className="mt-0.5 h-4 w-3 shrink-0 object-contain" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
                <a href={siteSettings.consultationUrl} className="group/step mt-5 inline-flex min-h-[51px] items-center gap-5 rounded-[80px] bg-brand py-2 pr-3.5 pl-9 text-[12px] font-bold leading-[1.1] tracking-[1.5px] text-cream uppercase no-underline transition-colors duration-300 hover:bg-mint hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-4 motion-reduce:transition-none">
                  <span className="relative after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-current after:transition-transform after:duration-600 group-hover/step:after:origin-left group-hover/step:after:scale-x-100">{section.learnMoreLabel}</span>
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-mint text-brand transition-[scale,background-color,color] duration-300 group-hover/step:scale-120 group-hover/step:bg-brand group-hover/step:text-mint" aria-hidden="true"><BrandArrow /></span>
                </a>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
