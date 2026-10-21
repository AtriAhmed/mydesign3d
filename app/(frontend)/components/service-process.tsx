"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import BrandArrow from "./brand-arrow";
import { useSiteSettings } from "./site-settings-provider";

type ServiceProcessProps = {
  titleId: string;
  imageSrc?: string;
  imageAlt?: string;
  imageHeading: string;
  imageCaption: string;
  heading: string;
  subtitle: string;
  description: string;
  ctaLabel: string;
};

export default function ServiceProcess({
  titleId,
  imageSrc,
  imageAlt,
  imageHeading,
  imageCaption,
  heading,
  subtitle,
  description,
  ctaLabel,
}: ServiceProcessProps) {
  const reduceMotion = useReducedMotion();
  const siteSettings = useSiteSettings();
  const fadeIn = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.6, delay: reduceMotion ? 0 : delay },
  });

  return (
    <section aria-labelledby={titleId} className="mb-[14vh] bg-[#fafaf7] px-[30px]">
      <div className="mx-auto grid max-w-[1280px] items-start gap-5 lg:grid-cols-2">
        <div className="relative h-[380px] w-full overflow-hidden rounded-[24px] sm:h-[470px] lg:w-[84%]">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={imageAlt ?? ""}
              fill
              sizes="(min-width: 1024px) 528px, (min-width: 640px) 80vw, 100vw"
              className="object-cover object-center"
            />
          ) : (
            <div aria-hidden="true" className="absolute inset-0 overflow-hidden bg-[linear-gradient(145deg,#352a44_0%,#695077_62%,#b38cae_100%)]">
              <div className="absolute -top-20 -right-16 size-72 rounded-full bg-[#f7d2ff]/30 blur-3xl" />
              <div className="absolute top-[15%] left-[9%] w-[76%] rotate-[-7deg] rounded-[22px] border border-white/20 bg-[#fafaf7] p-4 shadow-[0_30px_70px_#180e2466] sm:p-6">
                <div className="mb-5 flex items-center gap-2 border-b border-brand/10 pb-4"><span className="size-2.5 rounded-full bg-[#ff8ba7]" /><span className="size-2.5 rounded-full bg-[#f9d277]" /><span className="size-2.5 rounded-full bg-[#80d9bc]" /><span className="ml-auto h-2 w-1/3 rounded-full bg-brand/10" /></div>
                <div className="grid grid-cols-[1fr_1.2fr] gap-4"><div className="aspect-[3/4] rounded-[14px] bg-[#e9fff4] p-4"><span className="block h-2 w-3/4 rounded-full bg-brand/60" /><span className="mt-4 block h-1.5 w-full rounded-full bg-brand/20" /><span className="mt-2 block h-1.5 w-4/5 rounded-full bg-brand/20" /><span className="mt-6 block h-8 w-3/4 rounded-full bg-brand" /></div><div className="space-y-3"><div className="aspect-[4/3] rounded-[14px] bg-[#f7d2ff] p-4"><span className="block h-2 w-2/3 rounded-full bg-brand/60" /><span className="mt-5 block h-1.5 w-full rounded-full bg-brand/20" /><span className="mt-2 block h-1.5 w-3/4 rounded-full bg-brand/20" /></div><span className="block h-3 w-4/5 rounded-full bg-brand/10" /><span className="block h-3 w-3/5 rounded-full bg-brand/10" /></div></div>
              </div>
              <div className="absolute right-[8%] bottom-[15%] flex gap-2 rounded-full border border-white/50 bg-white/90 p-3 shadow-[0_20px_45px_#180e244d]"><span className="size-5 rounded-full bg-brand" /><span className="size-5 rounded-full bg-[#f7d2ff]" /><span className="size-5 rounded-full bg-[#e9fff4]" /><span className="size-5 rounded-full bg-[#ff8ba7]" /></div>
            </div>
          )}
          <div className="absolute inset-x-0 bottom-0 flex h-[220px] flex-col justify-end gap-[10px] rounded-b-[24px] pb-5 text-center">
            <div className="pointer-events-none absolute inset-0 rounded-b-[24px] bg-[linear-gradient(to_bottom,transparent_0%,transparent_60%,white_100%)] backdrop-blur-[10px] [mask-image:linear-gradient(to_bottom,transparent_0%,black_50%)]" aria-hidden="true" />
            <h3 className={`relative m-0 text-[20px] font-medium leading-[28px] tracking-[-0.2px] ${imageSrc ? "text-[#fafaf7]" : "text-brand"}`}>{imageHeading}</h3>
            <div className="relative flex h-[21px] items-center" aria-hidden="true"><span className="h-px w-full bg-brand/40" /></div>
            <p className="relative m-0 text-[16px] font-medium leading-[24px] tracking-[2px] text-brand uppercase">
              {imageCaption}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-start gap-[10px] pt-3 lg:pr-16 lg:pt-[45px]">
          <motion.h2 {...fadeIn(0)} id={titleId} className="m-0 text-[32px] font-bold leading-[1.1] tracking-[-1.5px] text-brand sm:text-[38px]">
            {heading}
          </motion.h2>
          <motion.p {...fadeIn(0.05)} className="m-0 min-h-[89px] text-[16px] font-medium leading-[1.85] tracking-[2px] text-[#070807e5] uppercase">
            {subtitle}
          </motion.p>
          <motion.p {...fadeIn(0.1)} className="mb-4 text-[16px] font-normal leading-[1.85] text-[#070807e5]">
            {description}
          </motion.p>
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, delay: reduceMotion ? 0 : 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="mt-0"
          >
            <Link href={siteSettings.serviceProcessUrl} className="group/process inline-flex min-h-[51px] items-center gap-6 rounded-[80px] bg-brand py-2 pr-3.5 pl-9 text-[12px] font-bold leading-[1.1] tracking-[1.5px] text-cream uppercase no-underline transition-colors duration-300 hover:bg-mint hover:text-brand focus-visible:bg-mint focus-visible:text-brand focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-4">
              <span className="relative after:pointer-events-none after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-current after:transition-transform after:duration-600 group-hover/process:after:origin-left group-hover/process:after:scale-x-100 group-focus-visible/process:after:origin-left group-focus-visible/process:after:scale-x-100">{ctaLabel}</span>
              <span className="grid size-[31px] shrink-0 place-items-center rounded-full bg-[#f7d2ff] text-brand transition-[transform,background-color,color] duration-300 group-hover/process:scale-120 group-hover/process:bg-brand group-hover/process:text-mint group-focus-visible/process:scale-120 group-focus-visible/process:bg-brand group-focus-visible/process:text-mint"><BrandArrow /></span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
