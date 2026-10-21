"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import BrandArrow from "./brand-arrow";
import { useSiteSettings } from "./site-settings-provider";

type Reason = { title: string; description: string };

type ServiceDifferentProps = {
  titleId: string;
  heading?: string;
  subtitle: string;
  reasons: [Reason, Reason, Reason];
  imageSrc: string;
  imageAlt: string;
};

export default function ServiceDifferent({ titleId, heading, subtitle, reasons, imageSrc, imageAlt }: ServiceDifferentProps) {
  const reduceMotion = useReducedMotion();
  const siteSettings = useSiteSettings();
  const defaultHeading = siteSettings.serviceDifferentHeading;
  const lastSpace = defaultHeading.lastIndexOf(" ");

  return (
    <section aria-labelledby={titleId} className="bg-white px-[30px] py-[12vh]">
      <div className="mx-auto max-w-[1280px]">
        <motion.h2
          id={titleId}
          initial={reduceMotion ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="m-0 text-center text-[32px] font-bold leading-[1.1] tracking-[-1.5px] text-brand sm:text-[38px]"
        >
          {heading ?? <>{defaultHeading.slice(0, lastSpace + 1)}<em>{defaultHeading.slice(lastSpace + 1)}</em></>}
        </motion.h2>
        <motion.p
          initial={reduceMotion ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: reduceMotion ? 0 : 0.05 }}
          className="mt-[10px] mb-[10px] text-center text-[16px] font-medium leading-[1.85] tracking-[2px] text-[#070807e5] uppercase lg:h-[80px]"
        >
          {subtitle}
        </motion.p>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-5">
          <div className="flex flex-col gap-[10px] lg:pr-[16.2%] lg:pt-[45px]">
            {reasons.map((reason, index) => (
              <motion.div
                key={reason.title}
                initial={reduceMotion ? false : { opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, delay: reduceMotion ? 0 : 0.1 + index * 0.05 }}
                className={`flex gap-[13px] ${index === 0 ? "lg:min-h-[210px]" : "lg:min-h-[180px]"}`}
              >
                <Image src={siteSettings.symbolLogoUrl} alt="" width={32} height={32} className="h-8 w-8 shrink-0 object-contain" />
                <div>
                  <h3 className="m-0 text-[24px] font-normal leading-[1.3] text-[#070807e5]">{reason.title}</h3>
                  <p className="mt-[15px] mb-0 text-[16px] leading-[1.85] text-[#070807e5]">{reason.description}</p>
                </div>
              </motion.div>
            ))}
            <motion.a
              href={siteSettings.consultationUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={reduceMotion ? false : { opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.65, delay: reduceMotion ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="group/different inline-flex min-h-[45px] w-fit items-center gap-[45px] rounded-[80px] bg-brand px-9 text-[12px] font-bold leading-[1.1] tracking-[1.5px] whitespace-nowrap text-cream uppercase no-underline transition-colors duration-300 hover:bg-mint hover:text-brand focus-visible:bg-mint focus-visible:text-brand focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-4"
            >
              <span className="relative after:pointer-events-none after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-current after:transition-transform after:duration-600 group-hover/different:after:origin-left group-hover/different:after:scale-x-100">{siteSettings.homeFooterButton}</span>
              <span aria-hidden="true" className="grid size-[15px] place-items-center"><BrandArrow /></span>
            </motion.a>
          </div>

          <div className="relative h-[440px] overflow-hidden rounded-[24px] sm:h-[560px] lg:h-[690px]">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              sizes="(min-width: 1024px) 630px, 100vw"
              className="object-cover object-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
