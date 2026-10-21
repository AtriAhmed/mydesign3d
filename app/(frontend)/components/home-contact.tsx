"use client";

import { useEffect, useRef } from "react";
import BrandArrow from "./brand-arrow";
import homeSections from "@/content/home-sections.json";
import { usePageSection } from "./page-sections-provider";

const buttonStyles = "inline-flex min-h-[52px] items-center justify-center rounded-[80px] font-bold leading-[1.2] no-underline transition-[background,color,box-shadow] duration-300 ease-[ease] focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-brand focus-visible:outline-offset-4 motion-reduce:transition-none";
const iconStyles = "grid size-9 shrink-0 place-items-center rounded-[50%]";

export default function HomeContact() {
  const content = usePageSection("contact", homeSections.contact);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        content.dataset.revealed = "true";
        observer.disconnect();
      }
    }, { threshold: 0.1, rootMargin: "0px 0px -24px 0px" });
    observer.observe(content);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="home-contact relative z-2 mb-10 px-6 text-brand md:mb-[60px] md:px-[30px] min-[64.0625rem]:mb-[14vh]" aria-labelledby="contact-heading">
      <div className="home-contact-panel overflow-visible rounded-3xl border border-[#0000001a]">
        <div className="home-contact-image min-h-[100vw] rounded-3xl bg-cover bg-center bg-no-repeat md:min-h-[60vw] min-[64.0625rem]:min-h-[70vh]" style={{ backgroundImage: `url(${JSON.stringify(content.backgroundImage)})` }} aria-hidden="true" />
        <div ref={contentRef} data-contact-reveal="" style={{ animationDelay: "150ms", animationDuration: "1.5s" }} onFocusCapture={(event) => { event.currentTarget.dataset.revealed = "true"; }} className="home-contact-content motion-safe:opacity-0 motion-safe:data-[revealed=true]:animate-expertise-panel-enter motion-safe:has-[:focus-visible]:opacity-100 motion-safe:has-[:focus-visible]:animate-none relative isolate -mt-[150px] flex flex-col items-center bg-[linear-gradient(180deg,#ffffff00_0%,#fff_40%)] px-5 py-10 text-center md:-mt-[100px] md:pt-[60px] md:pb-[30px] min-[64.0625rem]:-mt-[170px] min-[64.0625rem]:px-[30px] min-[64.0625rem]:pt-[100px] min-[64.0625rem]:pb-[60px] before:pointer-events-none before:absolute before:inset-0 before:-z-1 before:backdrop-blur-[10px] before:[mask-image:linear-gradient(transparent,#000_35%)]">
          <h2 id="contact-heading" className="m-0 mb-5 text-[30px] font-bold leading-[1.15] tracking-[-1px] md:mb-[30px] md:text-[32px] md:leading-[1.2] md:tracking-[-1.5px] min-[64.0625rem]:text-[40px]">{content.heading}</h2>
          <p className="m-0 mb-[30px] max-w-[1280px] text-[18px] font-medium leading-[1.5] min-[64.0625rem]:mb-[45px] min-[64.0625rem]:text-[20px]">{content.description}</p>
          <div className="home-contact-actions flex w-full flex-col items-center justify-center gap-[15px] md:w-auto md:flex-row md:gap-5">
            <a className={`home-contact-phone text-[12px] tracking-[1.5px] gap-2.5 bg-[#fafaf7] py-2 pr-9 pl-3.5 text-brand shadow-[9px_9px_13px_#0000001a] hover:bg-mint hover:shadow-[0_10px_20px_4px_#e9fff4] ${buttonStyles}`} href={`tel:${content.phone.replace(/[^+\d]/g, "")}`}>
              <span className={`home-contact-phone-icon bg-brand text-cream ${iconStyles}`}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m8 3 3 5-3 2c1.3 3 3 4.7 6 6l2-3 5 3-1 4c-.2.8-1 1.2-1.8 1C9.4 19.4 4.6 14.6 3 5.8c-.2-.8.2-1.6 1-1.8l4-1Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /><path d="M15 3v3m3-1-2 2m5 2h-3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg>
              </span>
              <span>{content.phone}</span>
            </a>
            <span className="home-contact-or text-[16px] font-medium tracking-[2px]">or</span>
            <a className={`home-contact-button group/contact w-full max-w-[320px] gap-3 bg-brand py-2 pr-3.5 pl-5 text-[10px] tracking-[1px] text-cream uppercase shadow-[9px_9px_13px_#00000080] hover:bg-mint hover:text-brand md:w-auto md:max-w-none md:gap-5 md:pl-9 md:text-[12px] md:tracking-[1.5px] ${buttonStyles}`} href={content.ctaUrl}>
              <span>{content.ctaLabel}</span>
              <span className={`home-contact-arrow bg-mint text-brand transition-transform duration-300 ease-[ease] group-hover/contact:translate-x-[3px] motion-reduce:transition-none ${iconStyles}`}><BrandArrow /></span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
