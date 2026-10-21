"use client";

import { useEffect, useRef, useState } from "react";
import BrandArrow from "./brand-arrow";
import homeSections from "@/content/home-sections.json";
import { usePageSection } from "./page-sections-provider";

const focusStyles = "focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-brand focus-visible:outline-offset-4";

export default function HomeAbout() {
  const content = usePageSection("about", homeSections.about);
  const sectionRef = useRef<HTMLElement>(null);
  const learnMoreRef = useRef<HTMLAnchorElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const manualPlayRef = useRef(false);
  const [paused, setPaused] = useState(true);

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
    }, { threshold: 0.15, rootMargin: "0px 0px -24px 0px" });
    section.querySelectorAll("[data-about-reveal]").forEach((element) => observer.observe(element));
    if (learnMoreRef.current) observer.observe(learnMoreRef.current);
    return () => observer.disconnect();
  }, []);

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
    <section ref={sectionRef} className="home-about group/about relative isolate mb-[10vh] px-6 md:mb-[14vh] md:px-[30px] before:pointer-events-none before:absolute before:-top-[180px] before:bottom-[-24vh] before:left-1/2 before:-z-1 before:w-[min(1000px,100%)] before:-translate-x-1/2 before:bg-[radial-gradient(ellipse_at_50%_45%,#e9fff4_0%,#e9fff4_35%,#e9fff480_55%,transparent_75%)] before:content-['']" aria-labelledby="about-heading">
      <div className="home-about-inner mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-8 md:grid-cols-[minmax(0,45fr)_minmax(0,55fr)] md:gap-5">
        <div className="home-about-copy flex flex-col items-start gap-5 min-[1025px]:gap-6">
          <h2 data-about-reveal="" style={{ animationDelay: "50ms" }} id="about-heading" className="m-0 text-[30px] leading-[1.2] font-bold tracking-[-1px] text-brand md:text-[34px] motion-safe:opacity-0 motion-safe:data-[revealed=true]:animate-about-fade-in">{content.heading}</h2>
          <p data-about-reveal="" style={{ animationDelay: "100ms" }} className="home-about-expertise m-0 text-lg leading-[1.6] font-medium min-[1025px]:text-xl motion-safe:opacity-0 motion-safe:data-[revealed=true]:animate-about-fade-in">{content.expertise}</p>
          <p data-about-reveal="" style={{ animationDelay: "150ms" }} className="home-about-description m-0 text-base leading-[1.7] font-normal motion-safe:opacity-0 motion-safe:data-[revealed=true]:animate-about-fade-in">
            {content.description}
          </p>
          <a ref={learnMoreRef} onFocus={(event) => { event.currentTarget.dataset.revealed = "true"; }} className={`home-about-link group/link inline-flex min-h-[50px] items-center justify-center gap-5 rounded-[80px] bg-brand py-2 pr-3.5 pl-[25px] text-sm leading-none font-semibold text-cream no-underline transition-colors duration-300 ease-[ease] hover:bg-mint hover:text-brand focus-visible:bg-mint focus-visible:text-brand motion-reduce:transition-none motion-safe:opacity-0 motion-safe:data-[revealed=true]:animate-slide-up-enter motion-safe:focus-visible:opacity-100 motion-safe:focus-visible:animate-none ${focusStyles}`} href={content.ctaUrl}>
            <span className="relative after:pointer-events-none after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-current after:transition-transform after:duration-600 after:ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/link:after:origin-left group-hover/link:after:scale-x-100 group-focus-visible/link:after:origin-left group-focus-visible/link:after:scale-x-100 motion-reduce:after:transition-none">{content.ctaLabel}</span>
            <span className="home-about-arrow grid size-9 shrink-0 place-items-center rounded-[50%] bg-mint text-brand transition-[transform,scale,background-color,color] duration-300 ease-[ease] group-hover/link:scale-120 group-hover/link:bg-brand group-hover/link:text-mint group-focus-visible/link:scale-120 group-focus-visible/link:bg-brand group-focus-visible/link:text-mint motion-reduce:transition-none"><BrandArrow /></span>
          </a>
        </div>
        <div className="home-about-animation relative mx-auto w-full max-w-[500px] px-0 md:mx-0 md:max-w-none md:px-[30px]">
          <video ref={videoRef} className="home-about-video block aspect-video h-auto w-full rounded-[30px] object-cover md:rounded-[42px]" autoPlay loop muted playsInline preload="metadata" aria-hidden="true"
            onPlay={() => {
              if (window.matchMedia("(prefers-reduced-motion: reduce)").matches && !manualPlayRef.current) videoRef.current?.pause();
              else setPaused(false);
            }}
            onPause={() => setPaused(true)}>
            <source src={content.videoUrl} type="video/mp4" />
          </video>
          <button className={`home-about-playback absolute right-4 bottom-4 z-1 grid size-8 cursor-pointer place-items-center rounded-[50%] border border-[#352a4440] bg-[#ffffffb3] p-0 text-brand md:right-[46px] ${focusStyles}`} type="button" aria-label={paused ? "Play logo animation" : "Pause logo animation"} onClick={() => {
            if (videoRef.current?.paused) { manualPlayRef.current = true; void videoRef.current.play().catch(() => setPaused(true)); }
            else videoRef.current?.pause();
          }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              {paused ? <path d="m5 3 8 5-8 5Z" /> : <path d="M4 3h3v10H4zM9 3h3v10H9z" />}
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
