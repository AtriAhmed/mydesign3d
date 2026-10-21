"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import BrandArrow from "./brand-arrow";
import { useSiteSettings } from "./site-settings-provider";

type ServiceItem = { title: string; description: string };

type ServiceOfferProps = {
  titleId: string;
  subtitle: string;
  services: [ServiceItem, ServiceItem, ServiceItem, ServiceItem];
  imageSrc: string;
  imageAlt: string;
  ctaLabel?: string;
};

function Service({ title, description }: ServiceItem) {
  const siteSettings = useSiteSettings();
  return (
    <div className="flex flex-col items-center gap-[5px] text-center">
      <Image src={siteSettings.symbolLogoUrl} alt="" width={26} height={37} className="h-[30px] w-auto object-contain" />
      <h3 className="m-0 text-[20px] font-medium leading-[28px] tracking-[-0.2px] text-brand">{title}</h3>
      <p className="m-0 max-w-[261px] text-[16px] leading-[1.85] text-[#070807e5]">{description}</p>
    </div>
  );
}

export default function ServiceOffer({ titleId, subtitle, services, imageSrc, imageAlt, ctaLabel = "Book a Consultation" }: ServiceOfferProps) {
  const reduceMotion = useReducedMotion();
  const siteSettings = useSiteSettings();

  return (
    <section aria-labelledby={titleId} className="mb-[14vh] bg-[#fafaf7] px-[30px]">
      <div className="mx-auto max-w-[1280px] px-0 lg:px-[30px]">
        <motion.h2
          id={titleId}
          initial={reduceMotion ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="m-0 text-center text-[32px] font-bold leading-[1.1] tracking-[-1.5px] text-brand sm:text-[38px]"
        >
          {siteSettings.serviceOfferHeading}
        </motion.h2>
        <motion.p
          initial={reduceMotion ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: reduceMotion ? 0 : 0.05 }}
          className="mt-[10px] mb-[10px] text-center text-[16px] font-medium leading-[24px] tracking-[2px] text-[#070807e5] uppercase lg:h-[84px]"
        >
          {subtitle}
        </motion.p>

        <div className="relative flex flex-col items-center gap-10 lg:h-[880px] lg:justify-center lg:gap-0">
          <div className="pointer-events-none absolute top-1/2 left-1/2 hidden h-px w-[780px] -translate-x-1/2 bg-brand/10 lg:block" aria-hidden="true" />

          <div className="relative grid w-full items-start gap-8 lg:w-[1000px] lg:grid-cols-[290px_380px_290px] lg:gap-5">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="order-2 flex flex-col items-center gap-8 lg:order-1 lg:h-[529px] lg:gap-[10px]"
            >
              <div className="lg:ml-[30px]"><Service {...services[0]} /></div>
              <div className="lg:mr-[30px]"><Service {...services[1]} /></div>
            </motion.div>

            <div className="relative order-1 mx-auto aspect-[380/520] w-[min(380px,100%)] overflow-hidden rounded-[200px] border border-brand/10 bg-transparent p-10 lg:order-2">
              <div className="relative mx-auto aspect-[300/447] w-full overflow-hidden rounded-[200px]">
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  sizes="(min-width: 1024px) 300px, 80vw"
                  className="object-cover"
                />
              </div>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[200px] bg-[linear-gradient(to_bottom,transparent_0%,#faf2ea_100%)] backdrop-blur-[15px] [mask-image:linear-gradient(to_bottom,transparent_0%,black_45%)]" aria-hidden="true" />
              <motion.a
                href={siteSettings.consultationUrl}
                initial={reduceMotion ? false : { opacity: 0, y: 70 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: reduceMotion ? 0 : 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="group/offer absolute bottom-[50px] left-1/2 inline-flex min-h-[51px] -translate-x-1/2 items-center gap-5 whitespace-nowrap rounded-[80px] bg-brand py-2 pr-3.5 pl-9 text-[12px] font-bold leading-[1.1] tracking-[1.5px] text-cream uppercase no-underline shadow-[0_10px_20px_#352a4440] transition-colors duration-300 hover:bg-mint hover:text-brand focus-visible:bg-mint focus-visible:text-brand focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-4"
              >
                <span className="relative after:pointer-events-none after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-current after:transition-transform after:duration-600 group-hover/offer:after:origin-left group-hover/offer:after:scale-x-100">{ctaLabel}</span>
                <span className="grid size-[31px] shrink-0 place-items-center rounded-full bg-[#f7d2ff] text-brand transition-[transform,background-color,color] duration-300 group-hover/offer:scale-120 group-hover/offer:bg-brand group-hover/offer:text-mint"><BrandArrow /></span>
              </motion.a>
            </div>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="order-3 flex flex-col items-center gap-8 lg:h-[529px] lg:gap-[30px]"
            >
              <Service {...services[2]} />
              <div className="lg:ml-[30px]"><Service {...services[3]} /></div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
