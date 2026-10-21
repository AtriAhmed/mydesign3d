"use client";

import BrandArrow from "./brand-arrow";
import { usePageSection } from "./page-sections-provider";
import { useSiteSettings } from "./site-settings-provider";

const defaults = {
  eyebrow: "Full Scale Project Management — Architecture to Digital Delivery",
  strapline: "One Team. Every Discipline. Zero Handoffs.",
  title: "Full-Scale Project Management — One Team, From Concept to Completion",
  description: "Architecture, design, digital, and business strategy — all under one roof. You bring the vision, we handle everything else from day one to go-live.",
  button: "Start Your Project →",
  backgroundImage: "/images/reunion.jpg",
};

export default function FullScaleHero() {
  const section = usePageSection("hero", defaults);
  const siteSettings = useSiteSettings();
  return (
    <section
      aria-labelledby="full-scale-title"
      className="relative isolate flex min-h-[663px] flex-col overflow-hidden bg-cream bg-cover bg-center max-[64rem]:-mt-16 min-[64.0625rem]:min-h-screen"
      style={{ backgroundImage: `url(${section.backgroundImage})` }}
    >
      <div className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(124deg,#FAF2EA_40%,#E9FFF400_60%)]" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(190deg,transparent_40%,#FAF2EA_80%)] min-[64.0625rem]:bg-[linear-gradient(180deg,transparent_65%,#FAF2EA_98%)]" aria-hidden="true" />

      <div className="relative z-1 mx-auto w-full max-w-[1280px] px-5 pt-[120px] min-[64.0625rem]:px-0 min-[64.0625rem]:pt-[25vh]">
        <div className="w-3/4 text-center min-[64.0625rem]:w-[500px]">
          <h1 className="mb-[15px] text-[16px] font-medium leading-[1.1] tracking-[2px] text-brand motion-safe:animate-about-fade-in min-[64.0625rem]:mb-[25px]">
            {section.eyebrow}
          </h1>
          <div className="mb-[10px] flex items-center justify-center gap-5 text-[16px] leading-[37px] text-foreground min-[64.0625rem]:leading-[44px]">
            <span className="relative top-[2px] hidden h-px min-w-0 flex-1 bg-foreground motion-safe:animate-slide-up-enter min-[64.0625rem]:block" aria-hidden="true" />
            <p className="motion-safe:animate-about-fade-in [animation-delay:50ms]">{section.strapline}</p>
            <span className="relative top-[2px] hidden h-px min-w-0 flex-1 bg-foreground motion-safe:animate-slide-up-enter min-[64.0625rem]:block" aria-hidden="true" />
          </div>
          <h2 id="full-scale-title" className="mb-[15px] text-[28px] font-bold leading-[1.1] tracking-[-1.5px] text-brand motion-safe:animate-about-fade-in [animation-delay:200ms] min-[64.0625rem]:mb-[10px] min-[64.0625rem]:text-[38px]">
            {section.title}
          </h2>
          <p className="text-[16px] leading-[1.85] text-foreground motion-safe:animate-about-fade-in [animation-delay:300ms]">
            {section.description}
          </p>
        </div>
      </div>

      <div className="relative z-1 mt-[25px] flex-1 pb-[30px] min-[64.0625rem]:mt-[40px] min-[64.0625rem]:pb-0 before:pointer-events-none before:absolute before:inset-0 before:-z-1 before:backdrop-blur-[10px] before:[mask-image:linear-gradient(transparent,#000_50%)]">
        <div className="mx-auto w-full max-w-[1280px] px-5 pt-[15px] min-[64.0625rem]:px-0">
          <div className="min-[64.0625rem]:flex min-[64.0625rem]:w-[500px] min-[64.0625rem]:justify-center">
            <a
              href={siteSettings.consultationUrl}
              className="group/full-scale inline-flex min-h-[51px] items-center justify-center gap-5 rounded-[80px] bg-brand py-2 pr-3.5 pl-9 text-[12px] font-bold leading-[1.1] tracking-[1.5px] whitespace-nowrap text-cream uppercase no-underline transition-colors duration-300 hover:bg-mint hover:text-brand focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-4 motion-reduce:transition-none motion-safe:animate-slide-up-enter [animation-delay:300ms]"
            >
              <span className="relative after:pointer-events-none after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-current after:transition-transform after:duration-600 after:ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/full-scale:after:origin-left group-hover/full-scale:after:scale-x-100 group-focus-visible/full-scale:after:origin-left group-focus-visible/full-scale:after:scale-x-100 motion-reduce:after:transition-none">{section.button}</span>
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-mint text-brand transition-[scale,background-color,color] duration-300 group-hover/full-scale:scale-120 group-hover/full-scale:bg-brand group-hover/full-scale:text-mint group-focus-visible/full-scale:scale-120 group-focus-visible/full-scale:bg-brand group-focus-visible/full-scale:text-mint motion-reduce:transition-none" aria-hidden="true"><BrandArrow /></span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
