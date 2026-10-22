"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import BrandArrow from "./brand-arrow";
import teamDefaults from "@/content/team-sections.json";
import { usePageSection } from "./page-sections-provider";
import { useSiteSettings } from "./site-settings-provider";

const buttonLabel = "relative after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-current after:transition-transform after:duration-500 group-hover/contact:after:origin-left group-hover/contact:after:scale-x-100 group-focus-visible/contact:after:origin-left group-focus-visible/contact:after:scale-x-100";

function displayName(fullName: string) {
  const parts = fullName.trim().split(/\s+/);
  return parts.length > 1 ? `${parts[0]} ${parts.at(-1)?.[0]}.` : parts[0];
}

export default function TeamContent() {
  const content = usePageSection("team", teamDefaults.team);
  const siteSettings = useSiteSettings();
  const reduceMotion = useReducedMotion();

  return (
    <>
      <section aria-label="Team members" className="bg-[linear-gradient(180deg,#f2fff8_0%,#faf2ea_20%)] px-5 pt-5 pb-10 md:pt-[30px] md:pb-[60px] min-[64.0625rem]:px-[30px] min-[64.0625rem]:pt-[7vh] min-[64.0625rem]:pb-[14vh]">
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-x-5 gap-y-5 md:grid-cols-3 md:gap-y-[25px]">
          {content.members.map((member, index) => (
            <motion.article
              key={member.name}
              initial={reduceMotion ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.55, delay: reduceMotion ? 0 : (index % 3) * 0.08 }}
              className="relative isolate aspect-square overflow-hidden rounded-3xl bg-cream"
            >
              <Image
                src={member.image}
                alt={displayName(member.name)}
                fill
                sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1360px) 32vw, 410px"
                className="object-cover transition-transform duration-500 hover:-translate-y-1 motion-reduce:transition-none"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 flex min-h-[100px] flex-col items-center justify-end rounded-b-3xl bg-[linear-gradient(180deg,transparent_0%,#faf2ea_95%)] px-5 pt-10 pb-2.5 text-center md:min-h-[100px] md:pt-[60px] min-[64.0625rem]:min-h-[200px] min-[64.0625rem]:px-[30px] min-[64.0625rem]:pt-[100px]">
                <h2 className="m-0 text-[20px] font-medium leading-[1.3] text-brand min-[64.0625rem]:text-[24px]">{displayName(member.name)}</h2>
                <p className="m-0 mt-1 text-[10px] font-medium leading-[1.5] tracking-[3px] text-brand uppercase">{member.role}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section aria-labelledby="team-consultation-title" className="bg-cream px-5 pb-[60px] min-[64.0625rem]:px-[30px]">
        <div className="relative isolate mx-auto flex min-h-[100vw] max-w-[1400px] flex-col justify-end overflow-hidden rounded-3xl bg-cover bg-center bg-no-repeat md:min-h-[60vw] min-[64.0625rem]:min-h-[80vh]" style={{ backgroundImage: `url(${JSON.stringify(content.consultationImage)})` }}>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[370px] bg-[linear-gradient(180deg,#faf2ea00_0%,#faf2ea_100%)]" aria-hidden="true" />
          <div className="relative z-10 px-5 pt-10 pb-20 md:px-[30px] md:pt-[60px] md:pb-20 min-[64.0625rem]:pb-[100px]">
            <motion.h2
              id="team-consultation-title"
              initial={reduceMotion ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="m-0 mb-5 max-w-[680px] text-[clamp(36px,4vw,60px)] font-medium leading-[1.1] tracking-[-1px] text-white drop-shadow-[0_2px_12px_#0008] md:mb-[30px]"
            >
              {content.consultationHeading}
            </motion.h2>
            <div className="flex flex-wrap items-center gap-4 md:gap-5">
              <a href={siteSettings.consultationUrl} className="group/contact inline-flex min-h-[52px] items-center justify-center gap-5 rounded-[80px] bg-brand py-2 pr-3.5 pl-9 text-[12px] font-bold leading-[1.1] tracking-[1.5px] text-cream uppercase no-underline shadow-[9px_9px_13px_#0008] transition-colors duration-300 hover:bg-mint hover:text-brand focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-3">
                <span className={buttonLabel}>{content.consultationLabel}</span>
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-mint text-brand transition-[scale,background-color,color] duration-300 group-hover/contact:scale-120 group-hover/contact:bg-brand group-hover/contact:text-mint group-focus-visible/contact:scale-120 group-focus-visible/contact:bg-brand group-focus-visible/contact:text-mint"><BrandArrow /></span>
              </a>
              <a href={`tel:${content.phone.replace(/[^+\d]/g, "")}`} className="group/contact inline-flex min-h-[52px] items-center justify-center gap-3 rounded-[80px] bg-white/80 py-2 pr-6 pl-3 text-[12px] font-bold leading-[1.1] tracking-[1.5px] whitespace-nowrap text-brand uppercase no-underline transition-shadow duration-300 hover:shadow-[0_10px_20px_4px_#fffc] focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-mint text-brand transition-[scale,background-color,color] duration-300 group-hover/contact:scale-120 group-hover/contact:bg-brand group-hover/contact:text-mint group-focus-visible/contact:scale-120 group-focus-visible/contact:bg-brand group-focus-visible/contact:text-mint"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m8 3 3 5-3 2c1.3 3 3 4.7 6 6l2-3 5 3-1 4c-.2.8-1 1.2-1.8 1C9.4 19.4 4.6 14.6 3 5.8c-.2-.8.2-1.6 1-1.8l4-1Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /></svg></span>
                <span className={buttonLabel}>{content.phone}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
