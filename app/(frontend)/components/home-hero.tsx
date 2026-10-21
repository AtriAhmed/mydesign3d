"use client";

import BrandArrow from "./brand-arrow";

import { useEffect, useRef, useState } from "react";
import homeSections from "@/content/home-sections.json";
import { usePageSection } from "./page-sections-provider";
import { useSiteSettings } from "./site-settings-provider";

const focusStyles = "focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-mint focus-visible:outline-offset-4";

const disciplines = [
  "animate-hero-rise-in",
  "animate-hero-drop-in",
  "animate-hero-zoom-in",
];

export default function HomeHero() {
  const siteSettings = useSiteSettings();
  const content = usePageSection("hero", homeSections.hero);
  const videoRef = useRef<HTMLVideoElement>(null);
  const manualPlayRef = useRef(false);
  const [paused, setPaused] = useState(true);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    function updateMotion() {
      if (motion.matches) { manualPlayRef.current = false; videoRef.current?.pause(); }
    }
    updateMotion();
    motion.addEventListener("change", updateMotion);
    return () => motion.removeEventListener("change", updateMotion);
  }, []);

  return (
    <section className="home-hero relative z-1 isolate -mt-[82px] mx-3 mb-[100px] md:mx-5 md:mb-[120px]" aria-labelledby="hero-heading">
      <div className="home-hero-scene relative flex min-h-[clamp(600px,85svh,900px)] items-end overflow-hidden rounded-[30px] bg-brand text-white md:min-h-[clamp(600px,80vh,1200px)] md:rounded-[42px]">
        <video
          ref={videoRef}
          className="home-hero-video absolute inset-0 size-full object-cover"
          autoPlay muted loop playsInline preload="metadata"
          aria-hidden="true"
          onPlay={() => {
            if (window.matchMedia("(prefers-reduced-motion: reduce)").matches && !manualPlayRef.current) videoRef.current?.pause();
            else setPaused(false);
          }}
          onPause={() => setPaused(true)}
        >
          <source src={content.videoUrl} type="video/mp4" />
        </video>
        <div className="home-hero-content relative min-h-[23vh] w-full rounded-b-[30px] md:rounded-b-[42px] before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:backdrop-blur-[10px] before:[mask-image:linear-gradient(to_bottom,transparent_0%,#000_30%)] before:bg-[linear-gradient(transparent,#18101f40)]">
          <div className="home-hero-copy relative mx-auto max-w-[1280px] px-5 pt-[30px] pb-[90px] text-center md:px-[30px] md:pt-[15px] md:pb-[85px]">
            <div className="home-hero-disciplines mb-6 grid place-items-center text-[clamp(30px,8vw,54px)] font-normal leading-[1.1] tracking-[-1.5px] perspective-[600px] md:text-[64px] md:tracking-[-3px] min-[64.0625rem]:text-[80px]" aria-hidden="true">
              {content.disciplines.map((discipline, index) => <span className={`[grid-area:1/1] whitespace-nowrap opacity-0 ${disciplines[index % disciplines.length]} motion-reduce:animate-none motion-reduce:first:opacity-100`} key={discipline} style={{ animationDelay: `${index * 3}s` }}>{discipline}</span>)}
            </div>
            <h1 id="hero-heading" className="m-0 mb-2.5 text-[14px] font-medium leading-[1.7] tracking-[1px] md:text-[15px] min-[64.0625rem]:text-[16px] min-[64.0625rem]:tracking-[2px]">{content.heading}</h1>
            <p className="m-0 mt-3.5 text-[14px] font-normal leading-[1.7] md:mt-0 md:text-[16px]">{content.tagline}</p>
          </div>
        </div>
        <button className={`home-hero-playback absolute right-[18px] bottom-[18px] grid size-8 cursor-pointer place-items-center rounded-[50%] border border-[#ffffff60] bg-[#352a4480] p-0 text-white md:right-6 md:bottom-[22px] ${focusStyles}`} type="button" aria-label={paused ? "Play background video" : "Pause background video"} onClick={() => {
          if (videoRef.current?.paused) { manualPlayRef.current = true; void videoRef.current.play().catch(() => setPaused(true)); }
          else videoRef.current?.pause();
        }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            {paused ? <path d="m5 3 8 5-8 5Z" /> : <path d="M4 3h3v10H4zM9 3h3v10H9z" />}
          </svg>
        </button>
      </div>
      <a className={`home-hero-consultation group/hero absolute z-1 -bottom-[35px] left-1/2 inline-flex min-h-[52px] max-w-[calc(100%-16px)] -translate-x-1/2 items-center justify-center gap-3 rounded-[80px] bg-brand py-2 pr-3.5 pl-5 text-center text-[10px] font-bold leading-[1.2] tracking-[1px] whitespace-nowrap text-cream uppercase no-underline shadow-[0_12px_12px_#07080730] transition-[background,color] duration-300 ease-[ease] hover:bg-mint hover:text-brand focus-visible:bg-mint focus-visible:text-brand motion-reduce:transition-none md:max-w-none md:gap-5 md:pl-9 md:text-[12px] md:tracking-[1.5px] ${focusStyles}`} href={siteSettings.consultationUrl}>
        <span className="relative after:pointer-events-none after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-current after:transition-transform after:duration-600 after:ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/hero:after:origin-left group-hover/hero:after:scale-x-100 group-focus-visible/hero:after:origin-left group-focus-visible/hero:after:scale-x-100 motion-reduce:after:transition-none">{content.ctaLabel}</span>
        <span className="home-hero-arrow grid size-9 shrink-0 place-items-center rounded-[50%] bg-mint text-brand transition-[transform,scale,background-color,color] duration-300 ease-[ease] group-hover/hero:scale-120 group-hover/hero:bg-brand group-hover/hero:text-mint group-focus-visible/hero:scale-120 group-focus-visible/hero:bg-brand group-focus-visible/hero:text-mint motion-reduce:transition-none"><BrandArrow /></span>
      </a>
    </section>
  );
}
