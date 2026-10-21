"use client";

import Image from "next/image";
import { AnimatePresence, LayoutGroup, motion, type Variants } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { usePageSection } from "./page-sections-provider";

const clamp = (value: number) => Math.min(1, Math.max(0, value));

const wordVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.065 } },
  exit: { opacity: 0, transition: { when: "afterChildren", staggerChildren: 0.065, duration: 0.01 } },
};

const letterVariants: Variants = {
  hidden: { opacity: 0, rotateY: -90 },
  visible: { opacity: [0, 1, 1], rotateY: 0, transition: { duration: 0.28, times: [0, 0.1, 1], ease: "easeOut" } },
  exit: { opacity: [1, 1, 0], rotateY: 90, transition: { duration: 0.28, times: [0, 0.9, 1], ease: "easeIn" } },
};

function DownArrow({ href, second = false }: { href: string; second?: boolean }) {
  return (
    <a href={href} className={`absolute bottom-[55px] left-1/2 z-2 -translate-x-1/2 text-foreground transition-transform duration-300 hover:translate-y-1 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-4 motion-reduce:transition-none ${second ? "md:bottom-[89px]" : "md:bottom-[67px]"}`} aria-label="Scroll to the next section">
      <svg width="22" height="42" viewBox="0 0 22 42" fill="none" aria-hidden="true"><path d="M11 1v37m0 0-8-8m8 8 8-8" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
    </a>
  );
}

function StoryImage({ src, alt, stage }: { src: string; alt: string; stage: "first" | "second" }) {
  return (
    <div data-story-image={stage} className={`relative mx-auto h-[244px] w-[118px] origin-center transition-[transform,translate,opacity,filter] duration-100 ease-linear md:h-[332px] md:w-[162px] ${stage === "first" ? "lg:opacity-0 lg:blur-[15px]" : "md:opacity-0 md:blur-[15px]"}`}>
      <Image src={src} alt={alt} width={574} height={1024} sizes="(max-width: 767px) 118px, 162px" className="block h-[210px] w-full rounded-full object-cover md:h-[288px]" />
      <div className="pointer-events-none absolute top-[54%] left-1/2 h-[37%] w-[182%] -translate-x-1/2 bg-[linear-gradient(180deg,#FAF2EA00_0%,#FAF2EA_100%)] before:absolute before:inset-0 before:backdrop-blur-[10px] before:[mask-image:linear-gradient(transparent_0%,black_30%)] before:content-['']" aria-hidden="true" />
    </div>
  );
}

export default function FullScaleStory() {
  const section = usePageSection("story", {
    firstImage: "/images/full-scale-smart.jpg",
    firstImageAlt: "A glowing brain inside a lightbulb held in a hand",
    headlinePrefix: "We",
    headlineSuffix: "you.",
    rotatingWords: ["see", "hear"],
    firstHeading: "Most clients come to us frustrated.",
    firstSubheading: "Does this sound familiar?",
    problems: [
      "Juggling 4 or 5 vendors who never actually coordinate with each other.",
      "Weeks lost to handoffs, version confusion, and misaligned deliverables.",
      "Getting beautiful files that no one can implement.",
      "Restarting from scratch every time a new discipline is needed.",
      "Paying for strategy, design, and tech separately — with no one owning the big picture.",
    ],
    secondImage: "/images/full-scale-target.jpg",
    secondImageAlt: "A staircase leading toward a target",
    secondKicker: "The good news?",
    secondHeading: "The Smarter Way to Build — Integrated Architecture, Design & Digital Solutions",
    secondSubheading: "Not step by step — from concept to operation.",
    secondBody: "With our Full Scale Project model, you don’t manage a patchwork of specialists. You get one integrated team that covers every discipline — architecture, design, digital, and business strategy — with a single point of contact, a unified timeline, and total accountability from start to finish.",
  });
  const sectionRef = useRef<HTMLElement>(null);
  const firstWord = section.rotatingWords[0] || "see";
  const secondWord = section.rotatingWords[1] || "hear";
  const [word, setWord] = useState(firstWord);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const firstImage = section.querySelector<HTMLElement>('[data-story-image="first"]');
    const secondImage = section.querySelector<HTMLElement>('[data-story-image="second"]');
    const secondPanel = section.querySelector<HTMLElement>("#slide2");
    const firstKicker = section.querySelector<HTMLElement>('[data-story-reveal="first-kicker"]');
    const firstHeading = section.querySelector<HTMLElement>('[data-story-reveal="first-heading"]');
    const firstSubheading = section.querySelector<HTMLElement>('[data-story-reveal="first-subheading"]');
    const firstBody = section.querySelector<HTMLElement>('[data-story-reveal="first-body"]');
    const secondKicker = section.querySelector<HTMLElement>('[data-story-reveal="second-kicker"]');
    const secondHeading = section.querySelector<HTMLElement>('[data-story-reveal="second-heading"]');
    const secondSubheading = section.querySelector<HTMLElement>('[data-story-reveal="second-subheading"]');
    const secondBody = section.querySelector<HTMLElement>('[data-story-reveal="second-body"]');
    let frame = 0;

    function update() {
      frame = 0;
      if (!section) return;
      const top = section.getBoundingClientRect().top;
      const secondProgress = Math.max(0, -top / window.innerHeight);
      const progress = clamp(secondProgress);
      const imageEntry = reducedMotion.matches || window.innerWidth < 1024
        ? 1
        : clamp(((window.innerHeight - top) / window.innerHeight - 0.08) / 0.17);
      const secondImageEntry = reducedMotion.matches || window.innerWidth < 768 || !secondPanel
        ? 1
        : clamp(((window.innerHeight - secondPanel.getBoundingClientRect().top) / window.innerHeight - 0.08) / 0.17);
      const kickerEntry = reducedMotion.matches || !firstKicker
        ? 1
        : clamp((window.innerHeight - firstKicker.getBoundingClientRect().top) / (window.innerHeight * 0.3));
      const firstHeadingTop = firstHeading?.getBoundingClientRect().top ?? 0;
      const headingEntry = reducedMotion.matches || !firstHeading
        ? 1
        : clamp((window.innerHeight - firstHeadingTop) / (window.innerHeight * 0.4));
      const subheadingEntry = reducedMotion.matches || !firstHeading
        ? 1
        : clamp((window.innerHeight * 0.575 - firstHeadingTop) / (window.innerHeight * 0.08));
      const firstBodyReveal = reducedMotion.matches ? 1 : Math.max(window.innerWidth < 768 ? 0.65 : 0, clamp((secondProgress - 0.78) / 0.27));
      const secondKickerReveal = reducedMotion.matches ? 1 : clamp((secondProgress - 0.38) / 0.3);
      const secondHeadingReveal = reducedMotion.matches ? 1 : clamp((secondProgress - 0.4) / 0.32);
      const secondSubheadingReveal = reducedMotion.matches ? 1 : clamp((secondProgress - 0.77) / 0.1);
      const secondBodyReveal = reducedMotion.matches ? 1 : clamp((secondProgress - 0.92) / 0.1);

      if (firstImage) {
        firstImage.style.transform = `scale(${reducedMotion.matches ? 1 : 1.2 - 0.2 * clamp(progress / 0.5)})`;
        firstImage.style.opacity = String(imageEntry);
        firstImage.style.filter = `blur(${(1 - imageEntry) * 15}px)`;
      }
      if (secondImage) {
        secondImage.style.transform = `scale(${reducedMotion.matches ? 1 : 1.2 - 0.2 * clamp((secondProgress - 0.7) / 0.5)})`;
        secondImage.style.translate = reducedMotion.matches ? "none" : `0 ${window.innerWidth < 768 ? 45 + 25 * clamp(secondProgress / 0.7) : 20 + 30 * clamp((secondProgress - 0.1) / 0.6)}px`;
        secondImage.style.opacity = String(secondImageEntry);
        secondImage.style.filter = `blur(${(1 - secondImageEntry) * 15}px)`;
      }
      if (firstKicker) firstKicker.style.opacity = String(reducedMotion.matches ? 1 : 0.1 + 0.9 * kickerEntry);
      if (firstHeading) {
        firstHeading.style.opacity = String(headingEntry);
        firstHeading.style.filter = `blur(${(1 - headingEntry) * 15}px)`;
        firstHeading.style.transform = `scale(${1 + 0.2 * headingEntry})`;
      }
      if (firstSubheading) firstSubheading.style.opacity = String(subheadingEntry);
      if (firstBody) firstBody.style.opacity = String(firstBodyReveal);
      if (secondKicker) secondKicker.style.opacity = String(secondKickerReveal);
      if (secondHeading) {
        secondHeading.style.opacity = String(secondHeadingReveal);
        secondHeading.style.filter = `blur(${(1 - secondHeadingReveal) * 15}px)`;
        secondHeading.style.transform = `scale(${1 + 0.2 * secondHeadingReveal})`;
      }
      if (secondSubheading) secondSubheading.style.opacity = String(secondSubheadingReveal);
      if (secondBody) secondBody.style.opacity = String(secondBodyReveal);
    }

    function onScroll() {
      if (!frame) frame = requestAnimationFrame(update);
    }
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    reducedMotion.addEventListener("change", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      reducedMotion.removeEventListener("change", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;
    const interval = window.setInterval(() => setWord((current) => current === firstWord ? secondWord : firstWord), 3000);
    return () => window.clearInterval(interval);
  }, [firstWord, secondWord]);

  return (
    <section ref={sectionRef} aria-label="A smarter way to build" className="relative isolate h-[calc(200vh+30px)] overflow-clip bg-[linear-gradient(180deg,#FAF2EA_65%,#FAF2EA00_100%)] px-5 before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(at_top_left,#E9FFF4_0%,transparent_30vw)] md:h-[200vh] md:px-[30px]">
      <div className="relative mx-auto h-full max-w-[1280px]">
        <div className="sticky top-0 z-1 h-screen text-center motion-reduce:static">
          <div className="pt-[35px]">
            <StoryImage src={section.firstImage} alt={section.firstImageAlt} stage="first" />
          </div>
          <div className="mx-auto max-w-[1280px]">
            <p data-story-reveal="first-kicker" className="mb-[20px] text-[30px] font-semibold leading-[1.2] text-brand opacity-10 transition-opacity duration-100 ease-linear motion-reduce:opacity-100" aria-label={`${section.headlinePrefix} ${firstWord} and ${secondWord} ${section.headlineSuffix}`}>
              <span aria-hidden="true">
                <LayoutGroup>
                  <span className="inline-flex items-baseline whitespace-nowrap">
                    <motion.span layout="position" className="mr-[.25em]" transition={{ layout: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } }}>{section.headlinePrefix}</motion.span>
                    <span className="relative inline-grid align-baseline [perspective:400px]">
                      <AnimatePresence mode="wait" initial={false}>
                        <motion.span key={word} className="col-start-1 row-start-1 inline-flex justify-self-center whitespace-nowrap" variants={wordVariants} initial="hidden" animate="visible" exit="exit">
                          {[...word].map((letter, index) => (
                            <motion.span key={`${word}-${index}`} className="inline-block [backface-visibility:hidden] [transform-origin:center]" variants={letterVariants}>{letter}</motion.span>
                          ))}
                        </motion.span>
                      </AnimatePresence>
                    </span>
                    <motion.span layout="position" className="ml-[.25em]" transition={{ layout: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } }}>{section.headlineSuffix}</motion.span>
                  </span>
                </LayoutGroup>
              </span>
            </p>
            <h2 data-story-reveal="first-heading" className="mx-auto mb-[17px] max-w-[1200px] text-[28px] font-bold leading-[1.05] tracking-[-1.5px] text-brand opacity-0 blur-[15px] transition-[opacity,filter,transform] duration-100 ease-linear motion-reduce:opacity-100 motion-reduce:blur-none md:mb-[37px] md:text-[40px] md:leading-[1.2]">{section.firstHeading}</h2>
            <p data-story-reveal="first-subheading" className="mb-[9px] text-[16px] leading-[1.4] text-brand opacity-0 transition-opacity duration-100 ease-linear motion-reduce:opacity-100 md:mb-[30px] md:text-[20px]">{section.firstSubheading}</p>
            <p data-story-reveal="first-body" className="mx-auto max-w-[950px] text-[16px] leading-[1.85] text-foreground transition-opacity duration-100 ease-linear">
              {section.problems.map((problem, index) => <span key={index}>— {problem}{index < section.problems.length - 1 && <br />}</span>)}
            </p>
          </div>
          <DownArrow href="#slide2" />
        </div>

        <div id="slide2" className="relative z-2 mt-[30px] h-screen bg-[linear-gradient(180deg,#FAF2EA00_0%,#FAF2EA_10%)] text-center md:mt-0">
          <div className="pt-[35px]">
            <StoryImage src={section.secondImage} alt={section.secondImageAlt} stage="second" />
          </div>
          <div className="mx-auto mt-[62px] max-w-[1280px] md:mt-[66px]">
            <p data-story-reveal="second-kicker" className="mb-[10px] text-[16px] leading-[1.4] text-brand opacity-0 transition-opacity duration-100 ease-linear motion-reduce:opacity-100 md:mb-[19px] md:text-[20px]">{section.secondKicker}</p>
            <h2 data-story-reveal="second-heading" className="mx-auto mb-[25px] max-w-[1280px] text-[28px] font-bold leading-[1.05] tracking-[-1.5px] text-brand opacity-0 blur-[15px] transition-[opacity,filter,transform] duration-100 ease-linear motion-reduce:opacity-100 motion-reduce:blur-none md:mb-[37px] md:text-[40px] md:leading-[1.1]">{section.secondHeading}</h2>
            <p data-story-reveal="second-subheading" className="mb-[20px] text-[16px] leading-[1.4] text-brand opacity-0 transition-opacity duration-100 ease-linear motion-reduce:opacity-100 md:mb-[41px] md:text-[20px]">{section.secondSubheading}</p>
            <p data-story-reveal="second-body" className="mx-auto max-w-[950px] text-[16px] leading-[1.85] text-foreground opacity-0 transition-opacity duration-100 ease-linear motion-reduce:opacity-100">{section.secondBody}</p>
          </div>
          <DownArrow href="#benefits" second />
        </div>
      </div>
    </section>
  );
}
