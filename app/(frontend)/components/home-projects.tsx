"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import homeSections from "@/content/home-sections.json";
import { usePageSection } from "./page-sections-provider";

const fadeStyles = "motion-safe:opacity-0 motion-safe:data-[revealed=true]:animate-about-fade-in motion-safe:has-[:focus-visible]:opacity-100 motion-safe:has-[:focus-visible]:animate-none";

const focusStyles = "focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-brand focus-visible:outline-offset-4";
const headingStyles = "m-0 text-[30px] font-bold leading-[1.2] tracking-[-1px] md:text-[32px] md:tracking-[-1.5px] min-[68.8125rem]:text-[40px]";
const serviceListStyles = "m-0 flex list-none flex-col gap-4 p-0 md:gap-[18px]";
const serviceStyles = "flex items-start gap-2.5 text-[16px] font-medium leading-[1.6] tracking-[1px] md:gap-1.5 md:text-[14px] min-[68.8125rem]:gap-2.5 min-[68.8125rem]:text-[16px] min-[68.8125rem]:tracking-[2px]";

function Chevron({ left = false }: { left?: boolean }) {
  return <svg className={`mt-1 shrink-0 text-brand ${left ? "home-projects-chevron-left md:rotate-180" : ""}`} width="14" height="18" viewBox="0 0 14 18" fill="none" aria-hidden="true"><path d="m4 4 6 5-6 5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export default function HomeProjects() {
  const content = usePageSection("projects", homeSections.projects);
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
    }, { threshold: 0.1, rootMargin: "0px 0px -24px 0px" });
    section.querySelectorAll("[data-projects-reveal]").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="home-projects relative mb-[45px] px-6 bg-[radial-gradient(ellipse_at_center,#f2fff8_35%,#fff_60%)] md:mb-[30px] md:px-[30px]" aria-labelledby="projects-heading">
      <div className="home-projects-ring relative mx-auto flex w-[min(1057.222px,100%)] flex-col items-center justify-center gap-6 md:min-h-[850px] md:gap-[normal] md:rounded-[50%] md:border md:border-[#0000001a] min-[68.8125rem]:min-h-[1040px]">
        <div className="home-projects-heading flex w-full flex-col justify-center gap-4 text-center text-brand md:min-h-[180px] md:gap-2.5 min-[68.8125rem]:min-h-[230px]">
          <h2 data-projects-reveal="" id="projects-heading" className={`${headingStyles} ${fadeStyles}`}>{content.heading}</h2>
          <p data-projects-reveal="" style={{ animationDelay: "50ms" }} className={`m-0 text-[18px] font-medium leading-[1.5] md:text-[20px] ${fadeStyles}`}>{content.subtitle}</p>
          <h3 data-projects-reveal="" className={`${headingStyles} ${fadeStyles}`}>{content.titlePrefix} <em className="italic">{content.titleAccent}</em> {content.titleSuffix}</h3>
        </div>
        <div className="home-projects-diagram grid w-full grid-cols-[minmax(0,1fr)] items-center gap-6 md:grid-cols-[minmax(0,1fr)_350px_minmax(0,1fr)] md:gap-3 min-[68.8125rem]:grid-cols-[minmax(0,1fr)_545px_minmax(0,1fr)] min-[68.8125rem]:gap-5">
          <ul data-projects-reveal="" className={`home-projects-services home-projects-services-left ${fadeStyles} ${serviceListStyles} text-left md:text-right`}>
            {content.leftServices.map((label) => <li key={label} className={`${serviceStyles} flex-row-reverse justify-start md:flex-row md:justify-end`}><span className="flex-1 md:flex-initial">{label}</span><Chevron left /></li>)}
          </ul>
          <div className="home-projects-illustration relative row-1 grid aspect-square h-auto w-[min(270px,100%)] place-items-center justify-self-center overflow-hidden rounded-[50%] border border-[#0000001a] md:row-auto md:aspect-auto md:h-[350px] md:w-[350px] md:justify-self-auto min-[68.8125rem]:h-[545px] min-[68.8125rem]:w-[545px] after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-20 after:bg-[linear-gradient(180deg,transparent,#ffffffcc)] after:backdrop-blur-[10px] after:[mask-image:linear-gradient(transparent,#000_50%)] md:after:h-[100px] min-[68.8125rem]:after:h-[180px]">
            <Image data-projects-reveal="" className={`block ${fadeStyles} aspect-square h-auto w-[89%] rounded-[50%] object-cover md:aspect-auto md:size-[300px] min-[68.8125rem]:size-[500px]`} src={content.image} alt={content.imageAlt} width={1000} height={1000} sizes="(max-width: 767px) 240px, (max-width: 1100px) 300px, 500px" />
          </div>
          <ul data-projects-reveal="" onFocusCapture={(event) => { event.currentTarget.dataset.revealed = "true"; }} className={`home-projects-services home-projects-services-right ${fadeStyles} ${serviceListStyles}`}>
            {content.rightServices.map((service) => <li key={service.label} className={serviceStyles}>
              <Chevron />
              <a className={`text-inherit no-underline hover:underline hover:underline-offset-4 ${focusStyles}`} href={`/${service.path}`}>{service.label}</a>
            </li>)}
          </ul>
        </div>
        <div className="home-projects-description w-full text-center md:pt-5 md:px-[30px] min-[68.8125rem]:p-0">
          <h3 className="m-0 mb-1 text-[20px] font-medium leading-[1.5] text-brand">{content.descriptionTitle}</h3>
          <p data-projects-reveal="" className={`${fadeStyles} m-0 text-[15px] font-medium leading-[1.8] tracking-[1px] md:text-[16px] md:tracking-[2px]`}>{content.description}</p>
        </div>
        <div className="home-projects-action grid min-h-[100px] place-items-center md:min-h-[160px] min-[68.8125rem]:min-h-[230px]">
          <a data-projects-reveal="" style={{ animationDelay: "100ms" }} onFocus={(event) => { event.currentTarget.dataset.revealed = "true"; }} href={content.ctaUrl} className={`motion-safe:opacity-0 motion-safe:data-[revealed=true]:animate-slide-up-enter motion-safe:focus-visible:opacity-100 motion-safe:focus-visible:animate-none home-projects-button group/projects-button inline-flex min-h-[52px] items-center justify-center gap-3 rounded-[80px] bg-brand py-2 pr-3.5 pl-5 text-[10px] font-bold leading-[1.2] tracking-[1px] text-cream uppercase no-underline shadow-[9px_9px_13px_#00000080] transition-[background,color] duration-300 ease-[ease] hover:bg-mint hover:text-brand motion-reduce:transition-none md:gap-5 md:pl-9 md:text-[12px] md:tracking-[1.5px] ${focusStyles}`}>
            <span>{content.ctaLabel}</span>
            <span className="home-projects-button-arrow grid size-9 shrink-0 place-items-center rounded-[50%] bg-mint text-brand transition-transform duration-300 ease-[ease] group-hover/projects-button:translate-x-[3px] motion-reduce:transition-none"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m9 5 7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
          </a>
        </div>
      </div>
    </section>
  );
}
