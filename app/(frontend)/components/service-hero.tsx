"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import BrandArrow from "./brand-arrow";
import { useSiteSettings } from "./site-settings-provider";

type ServiceHeroProps = {
  titleId: string;
  breadcrumb: string;
  seoTitle: string;
  seoTag: "h1" | "h2";
  seoPlacement: "before" | "after";
  headlinePrefix: string;
  rotatingWords: readonly string[];
  description: string;
  benefits: readonly [string, string];
  imageSrc?: string;
  imageAlt?: string;
  ctaLabel?: string;
  variant: "visualization" | "architecture" | "web" | "ux" | "company" | "strategic";
};

export default function ServiceHero({
  titleId,
  breadcrumb,
  seoTitle,
  seoTag,
  seoPlacement,
  headlinePrefix,
  rotatingWords,
  description,
  benefits,
  imageSrc,
  imageAlt,
  ctaLabel = "Let’s discuss your project",
  variant,
}: ServiceHeroProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const siteSettings = useSiteSettings();
  const reduceMotion = useReducedMotion();
  const isArchitecture = variant === "architecture";
  const isCompactHero = isArchitecture;
  const isTallHero = variant === "company" || variant === "strategic";
  const SeoHeading = seoTag;

  useEffect(() => {
    if (rotatingWords.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const interval = window.setInterval(() => {
      setWordIndex((index) => (index + 1) % rotatingWords.length);
    }, 1800);
    return () => window.clearInterval(interval);
  }, [rotatingWords.length]);

  const seoHeading = (
    <SeoHeading
      id={titleId}
      className={`${seoPlacement === "before" ? "mb-[10px] max-w-[640px]" : "m-0 w-full"} text-[16px] font-medium leading-[1.1] tracking-[2px] text-brand motion-safe:animate-about-fade-in`}
    >
      {seoTitle}
    </SeoHeading>
  );

  return (
    <section aria-labelledby={titleId} className="overflow-hidden bg-cream px-5 py-5 md:px-[30px] md:py-[30px]">
      <div className={`relative mx-auto flex max-w-[1280px] flex-col ${isTallHero ? "md:min-h-[clamp(30vh,35vw,700px)]" : isCompactHero ? "md:min-h-[526px]" : "md:min-h-[592px]"}`}>
        <div className={`relative h-[312px] overflow-hidden ${isArchitecture ? "rounded-[24px]" : "rounded-[25px]"} md:absolute md:inset-y-0 md:right-0 md:h-auto md:w-[66%]`}>
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={imageAlt ?? ""}
              fill
              priority
              sizes="(max-width: 767px) 100vw, 66vw"
              className={`object-cover ${isArchitecture || isTallHero ? "object-right-top" : "object-center"}`}
            />
          ) : (
            <div aria-hidden="true" className="absolute inset-0 overflow-hidden bg-[linear-gradient(135deg,#e9fff4_0%,#f7d2ff_60%,#e4d1f0_100%)]">
              <div className="absolute top-[13%] right-[10%] w-[76%] rotate-[-5deg] rounded-[26px] border border-white/80 bg-white/90 p-3 shadow-[0_25px_70px_#352a4433] sm:p-5 md:w-[70%]">
                <div className="mb-4 flex items-center gap-2 border-b border-brand/10 pb-3"><span className="size-2.5 rounded-full bg-[#ff8ba7]" /><span className="size-2.5 rounded-full bg-[#f9d277]" /><span className="size-2.5 rounded-full bg-[#80d9bc]" /><span className="ml-auto h-2 w-1/4 rounded-full bg-brand/10" /></div>
                <div className="grid grid-cols-[1fr_1.3fr] gap-3">
                  <div className="space-y-3"><div className="aspect-[4/3] rounded-2xl bg-brand p-3"><div className="h-2 w-2/3 rounded-full bg-mint/80" /><div className="mt-3 h-1.5 w-full rounded-full bg-white/30" /><div className="mt-2 h-1.5 w-4/5 rounded-full bg-white/30" /></div><div className="h-4 w-4/5 rounded-full bg-brand/10" /><div className="h-4 w-3/5 rounded-full bg-brand/10" /></div>
                  <div className="space-y-3"><div className="aspect-[4/3] rounded-2xl bg-[#f7d2ff] p-3"><div className="h-2 w-2/3 rounded-full bg-brand/60" /><div className="mt-3 grid grid-cols-3 gap-2"><span className="aspect-square rounded-lg bg-white/70" /><span className="aspect-square rounded-lg bg-[#e9fff4]" /><span className="aspect-square rounded-lg bg-brand/70" /></div></div><div className="h-4 w-4/5 rounded-full bg-brand/10" /><div className="h-4 w-2/3 rounded-full bg-brand/10" /></div>
                </div>
              </div>
              <div className="absolute right-[3%] bottom-[8%] flex gap-2 rounded-full border border-white/80 bg-white/90 p-3 shadow-[0_15px_40px_#352a4426]"><span className="size-6 rounded-full bg-brand" /><span className="size-6 rounded-full bg-[#f7d2ff]" /><span className="size-6 rounded-full bg-mint" /><span className="size-6 rounded-full bg-[#ff8ba7]" /></div>
            </div>
          )}
        </div>

        <div className={`relative z-10 flex flex-col items-start bg-cream py-5 [&>*]:relative [&>*]:z-10 md:w-1/2 md:bg-transparent md:bg-[linear-gradient(90deg,#FAF2EA_0%,#352A4400_100%)] md:py-[30px] md:before:pointer-events-none md:before:absolute md:before:inset-0 md:before:z-0 md:before:backdrop-blur-[10px] md:before:[mask-image:linear-gradient(to_left,transparent_0%,black_30%)] md:before:content-[''] ${isTallHero ? "md:min-h-[clamp(30vh,35vw,700px)]" : isCompactHero ? "md:min-h-[526px]" : "md:min-h-[592px]"}`}>
          <nav aria-label="Breadcrumb" className={isArchitecture ? "mb-[25px] max-w-full min-h-[46px] text-[16px] leading-[1.85] text-[#6b7280]" : "mb-10 max-w-full text-[15px] leading-[1.6] text-[#7f8390] md:text-[14px]"}>
            <Link href="/" className="hover:text-brand hover:underline focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-brand">Home</Link>
            <span aria-hidden="true"> › </span>
            <span aria-current="page">{breadcrumb}</span>
          </nav>

          {seoPlacement === "before" && seoHeading}

          <div aria-hidden="true" className={`mb-[10px] flex flex-wrap items-baseline gap-x-[0.23em] text-[34px] font-normal leading-[1.1] tracking-[-0.045em] text-brand md:text-[60px] ${isCompactHero ? "min-h-[37px] md:min-h-[66px]" : "min-h-[75px] md:min-h-[132px]"}`}>
            <span>{headlinePrefix}</span>
            {rotatingWords[wordIndex] && <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={rotatingWords[wordIndex]}
                className="inline-flex whitespace-nowrap [perspective:600px]"
                initial={reduceMotion ? false : "hidden"}
                animate="visible"
                exit="exit"
                variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.025 } }, exit: { transition: { staggerChildren: 0.025 } } }}
              >
                {[...rotatingWords[wordIndex]].map((letter, index) => (
                  <motion.span
                    key={`${index}-${letter}`}
                    className="inline-block origin-center [backface-visibility:hidden]"
                    variants={{
                      hidden: { opacity: 0, rotateY: -90, scale: variant === "visualization" ? 1 : 0.8, y: variant === "visualization" ? 8 : 0 },
                      visible: { opacity: 1, rotateY: 0, scale: 1, y: 0, transition: { duration: isArchitecture ? 0.24 : 0.22 } },
                      exit: { opacity: 0, rotateY: 90, scale: variant === "visualization" ? 1 : 0.8, y: variant === "visualization" ? -8 : 0, transition: { duration: isArchitecture ? 0.24 : 0.22 } },
                    }}
                  >
                    {letter === " " ? "\u00a0" : letter}
                  </motion.span>
                ))}
              </motion.span>
            </AnimatePresence>}
          </div>

          <motion.p
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className={isArchitecture ? "mb-[10px] w-[90%] text-[16px] leading-[1.85] text-brand" : `mb-10 max-w-[576px] text-[16px] leading-[1.85] text-brand md:w-[90%] ${variant === "visualization" ? "font-bold" : "font-normal"}`}
          >
            {description}
          </motion.p>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            aria-hidden="true"
            className={isArchitecture ? "mb-[10px] h-[30px] w-[90%] border-t border-brand/40" : "mb-[10px] h-px w-full max-w-[576px] bg-brand/45"}
          />

          <div className={isArchitecture ? "mb-[29px] flex w-full flex-col gap-[10px] pb-[5px] text-[15px] font-medium leading-[1.5] tracking-[2px] text-brand md:mb-[31.5px] md:w-[90%] md:flex-row md:gap-[79px] md:pb-[10px] md:pl-[30px]" : "mb-[32px] grid w-full max-w-[468px] grid-cols-2 text-[15px] font-medium leading-[1.65] tracking-[2px] text-brand sm:text-[16px] [&>*]:pl-[30px]"}>
            {benefits.map((benefit, index) => (
              <motion.span
                key={benefit}
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.15 + index * 0.05 }}
                className={isArchitecture ? "max-w-[125px] md:max-w-[155px]" : "max-w-[185px]"}
              >
                {benefit}
              </motion.span>
            ))}
          </div>

          <motion.a
            href={siteSettings.consultationUrl}
            initial={reduceMotion ? false : { opacity: 0, y: 45 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="group/service-hero mb-[10px] inline-flex min-h-[45px] items-center gap-5 rounded-[80px] bg-[#f7d2ff] px-9 text-[12px] font-bold leading-[1.1] tracking-[1.5px] text-brand uppercase no-underline transition-shadow duration-300 hover:shadow-[0_0_10px_rgb(0_0_0_/_50%)] focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-4"
          >
            <span className="relative after:pointer-events-none after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-current after:transition-transform after:duration-600 group-hover/service-hero:after:origin-left group-hover/service-hero:after:scale-x-100 group-focus-visible/service-hero:after:origin-left group-focus-visible/service-hero:after:scale-x-100">{ctaLabel}</span>
            <span className="grid size-[18px] shrink-0 place-items-center" aria-hidden="true"><BrandArrow /></span>
          </motion.a>

          {seoPlacement === "after" && seoHeading}
        </div>
      </div>
    </section>
  );
}
