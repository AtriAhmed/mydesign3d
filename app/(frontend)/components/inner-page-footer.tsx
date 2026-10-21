"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import BrandArrow from "./brand-arrow";
import HoverDetails from "./hover-details";
import { useSiteSettings } from "./site-settings-provider";

const fade = "motion-safe:opacity-0 motion-safe:data-[revealed=true]:animate-about-fade-in";
const rise = "motion-safe:opacity-0 motion-safe:data-[revealed=true]:animate-slide-up-enter";

const serviceGroups = [
  { label: "Architecture & Design", items: [
    { label: "3D Visualization & Rendering", path: "3d-visualization-rendering" },
    { label: "Architectural Design & BIM", path: "architectural-design-bim" },
  ] },
  { label: "Digital factory", items: [
    { label: "Web Development & Application Engineering", path: "web-development-application-engineering" },
    { label: "UI/UX Design & Brand Identity", path: "ux-ui-design-brand-identity" },
  ] },
  { label: "Company Setup", items: [
    { label: "Business Planning & Company Formation", path: "company-setup" },
    { label: "Strategic Consultation", path: "strategic-consultation" },
  ] },
];

const quickLinks = [
  { label: "Portfolio", path: "portfolio" },
  { label: "Our Team — Architects, Designers & Engineers", path: "our-team" },
  { label: "Contact", path: "contact-us" },
  { label: "Blog", path: "blog" },
  { label: "Pricing", path: "pricing" },
];

function FacebookIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M14 22v-9h3l.5-4H14V6.5c0-1 .3-1.5 1.7-1.5H18V1.4A27 27 0 0 0 14.7 1C11.4 1 9 3 9 6.5V9H6v4h3v9h5Z" /></svg>;
}

function InstagramIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="2" /><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg>;
}

function XIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3l-5-7.6L5.3 22H2.2l7.3-8.5L1.8 2h6.5l4.5 6.9L18.9 2Zm-1.1 18h1.7L7.3 3.9H5.5L17.8 20Z" /></svg>;
}

export default function InnerPageFooter() {
  const siteSettings = useSiteSettings();
  const serviceMenu = siteSettings.navigation.find((item) => item.href === "/#services");
  const footerLinks = siteSettings.navigation.filter((item) => item.href !== "/#services");
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).dataset.revealed = "true";
          observer.unobserve(entry.target);
        }
      }
    }, { threshold: 0.1, rootMargin: "0px 0px -24px 0px" });
    footer.querySelectorAll("[data-inner-footer-reveal]").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <footer ref={footerRef} onFocusCapture={(event) => {
      const reveal = (event.target as HTMLElement).closest<HTMLElement>("[data-inner-footer-reveal]");
      if (reveal) reveal.dataset.revealed = "true";
    }} className="px-5 pb-5 text-cream min-[64.0625rem]:px-[30px] min-[64.0625rem]:pb-[30px] [&_a:focus-visible]:outline-2 [&_a:focus-visible]:outline-mint [&_a:focus-visible]:outline-offset-4 [&_summary:focus-visible]:outline-2 [&_summary:focus-visible]:outline-mint [&_summary:focus-visible]:outline-offset-4" aria-label="Site footer">
      <div className="rounded-3xl bg-brand">
        <div className="relative mx-auto mt-5 mb-2.5 flex h-[46px] w-[131px] justify-center md:mt-0 md:h-[145px] md:w-[202px] min-[64.0625rem]:h-[190px] min-[64.0625rem]:w-[251px]">
          <Image src={siteSettings.symbolLogoUrl} alt="" width={191} height={270} className="mt-10 h-auto w-[71px] self-start md:w-[142px] min-[64.0625rem]:mt-[55px] min-[64.0625rem]:w-[191px]" />
        </div>

        <div className="relative mx-auto flex w-full max-w-[630px] flex-col items-center px-5 pt-[55px] text-center md:pt-[55px] min-[64.0625rem]:pt-[80px]">
          <p data-inner-footer-reveal="" className={`${fade} m-0 text-[16px] font-medium leading-[1.7] tracking-[2px]`}>{siteSettings.siteName.toUpperCase()}</p>
          <div className="mt-[25px] h-px w-full bg-white/20 md:mt-[30px]" aria-hidden="true" />
          <p data-inner-footer-reveal="" style={{ animationDelay: "50ms" }} className={`${fade} m-0 mt-[30px] text-[16px] leading-[1.7] tracking-[2px] md:whitespace-nowrap`}>{siteSettings.footerDescription}</p>
          <div className="mt-[30px] h-px w-2/3 bg-white/20" aria-hidden="true" />
        </div>

        <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-x-5 gap-y-10 px-5 pt-10 pb-[30px] md:grid-cols-2 md:gap-x-[4%] md:pt-[30px] md:pb-5 min-[64.0625rem]:grid-cols-[minmax(0,1fr)_minmax(0,1.333fr)_minmax(0,1fr)] min-[64.0625rem]:gap-x-5 min-[64.0625rem]:px-[30px] min-[64.0625rem]:pt-[50px] min-[64.0625rem]:pb-[30px]">
          <div data-inner-footer-reveal="" className={`${rise} order-2 md:order-2 min-[64.0625rem]:order-1`}>
            <h2 className="m-0 mb-5 text-[16px] font-medium leading-8 tracking-[2px]">{siteSettings.footerContactHeading}</h2>
            <address className="flex flex-col gap-3.5 text-[13px] leading-6 not-italic text-cream/85">
              <a href={`tel:${siteSettings.phone.replace(/[^+\d]/g, "")}`} className="flex items-center gap-2.5 text-inherit no-underline transition-colors hover:text-mint"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m8 3 3 5-3 2c1.3 3 3 4.7 6 6l2-3 5 3-1 4c-.2.8-1 1.2-1.8 1C9.4 19.4 4.6 14.6 3 5.8c-.2-.8.2-1.6 1-1.8l4-1Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /><path d="M15 3v3m3-1-2 2m5 2h-3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg><span>{siteSettings.phone}</span></a>
              <p className="m-0 flex items-center gap-2.5"><svg width="20" height="24" viewBox="0 0 20 24" fill="none" aria-hidden="true"><path d="M10 22s8-8 8-13A8 8 0 0 0 2 9c0 5 8 13 8 13Z" stroke="currentColor" strokeWidth="2" /><circle cx="10" cy="9" r="2.5" stroke="currentColor" strokeWidth="2" /></svg><span>{siteSettings.address}</span></p>
            </address>
          </div>

          <div className="order-1 flex flex-col items-center gap-10 md:col-span-2 md:order-1 md:gap-[30px] min-[64.0625rem]:col-span-1 min-[64.0625rem]:order-2">
            <a data-inner-footer-reveal="" style={{ animationDelay: "50ms", animationDuration: "1.2s" }} href={siteSettings.consultationUrl} className={`${rise} group/inner-footer inline-flex min-h-[54px] max-w-full items-center gap-5 rounded-[80px] bg-mint py-2 pr-3.5 pl-9 text-[12px] font-medium leading-[1.2] tracking-[1.5px] text-brand no-underline shadow-[9px_9px_13px_#00000080] transition-colors duration-300 hover:bg-cream focus-visible:bg-cream motion-reduce:transition-none`}>
              <span className="relative whitespace-nowrap after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-current after:transition-transform after:duration-600 after:ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/inner-footer:after:origin-left group-hover/inner-footer:after:scale-x-100 group-focus-visible/inner-footer:after:origin-left group-focus-visible/inner-footer:after:scale-x-100">{siteSettings.innerFooterButton}</span>
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-brand text-mint transition-transform duration-300 group-hover/inner-footer:scale-120 group-focus-visible/inner-footer:scale-120 motion-reduce:transition-none"><BrandArrow /></span>
            </a>
            <nav data-inner-footer-reveal="" style={{ animationDelay: "100ms" }} className={`${fade} flex items-center gap-2.5 text-cream/80`} aria-label="Social media">
              <a href={siteSettings.facebookUrl} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="grid size-7 place-items-center rounded-full text-inherit transition-transform hover:scale-110 hover:text-mint"><FacebookIcon /></a>
              <a href={siteSettings.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="grid size-7 place-items-center rounded-full text-inherit transition-transform hover:scale-110 hover:text-mint"><InstagramIcon /></a>
              <a href={siteSettings.xUrl} target="_blank" rel="noopener noreferrer" aria-label="X" className="grid size-7 place-items-center rounded-full text-inherit transition-transform hover:scale-110 hover:text-mint"><XIcon /></a>
            </nav>
          </div>

          <nav data-inner-footer-reveal="" style={{ animationDelay: "100ms", animationDuration: "1.2s" }} className={`${rise} order-3 text-[14px] leading-[1.6] md:order-3`} aria-label="Footer navigation">
            <h2 className="m-0 mb-5 text-[16px] font-medium leading-8 tracking-[2px]">{siteSettings.footerLinksHeading}</h2>
            <ul className="m-0 flex max-w-[140px] list-none flex-col gap-[5px] p-0 [&_a]:text-inherit [&_a]:no-underline md:max-w-[160px] min-[64.0625rem]:max-w-[200px]">
              <li><Link href={footerLinks.find((item) => item.href === "/about")?.href || "/about"} className="hover:text-mint">{footerLinks.find((item) => item.href === "/about")?.label || "About"}</Link></li>
              <li>
                <HoverDetails className="group/services relative w-fit min-[64.0625rem]:pr-3 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex w-fit cursor-pointer list-none items-center gap-1.5 hover:text-mint">Services <svg width="8" height="6" viewBox="0 0 8 6" aria-hidden="true" className="relative top-[2px] transition-transform group-open/services:rotate-180"><path d="m0 1 4 4 4-4Z" fill="currentColor" /></svg></summary>
                  <ul className="mt-2 flex w-[min(300px,calc(100vw-120px))] list-none flex-col gap-1 rounded-xl bg-white p-3 text-brand shadow-lg motion-safe:group-open/services:animate-footer-menu-in motion-reduce:animate-none min-[64.0625rem]:absolute min-[64.0625rem]:top-0 min-[64.0625rem]:left-full min-[64.0625rem]:z-10 min-[64.0625rem]:mt-0 min-[64.0625rem]:w-[220px] min-[80rem]:w-[300px]">
                    <li><Link href="/#services" className="hover:text-brand/70">{siteSettings.allServicesLabel}</Link></li>
                    {serviceMenu?.children?.filter((item) => !item.children?.length).map((item) => <li key={item.href}><Link href={item.href} className="hover:text-brand/70">{item.label}</Link></li>)}
                    {(serviceMenu?.children?.filter((item) => item.children?.length).map((item) => ({ label: item.label, items: item.children?.map((child) => ({ label: child.label, path: child.href })) || [] })) || serviceGroups).map((group) => <li key={group.label}>
                      <HoverDetails className="group/subservice">
                        <summary className="flex cursor-pointer list-none items-center gap-1.5 hover:text-brand/65">{group.label}<svg width="8" height="6" viewBox="0 0 8 6" aria-hidden="true" className="transition-transform group-open/subservice:rotate-180"><path d="m0 1 4 4 4-4Z" fill="currentColor" /></svg></summary>
                        <ul className="mt-1 list-none space-y-1 pl-3">{group.items.map((item) => <li key={item.path}><a href={item.path.startsWith("/") ? item.path : `/${item.path}`} className="hover:text-brand/70">{item.label}</a></li>)}</ul>
                      </HoverDetails>
                    </li>)}
                  </ul>
                </HoverDetails>
              </li>
              {footerLinks.length ? footerLinks.filter((item) => item.href !== "/about").map((item) => <li key={item.href}><a href={item.href} className="hover:text-mint">{item.label}</a></li>) : quickLinks.map((link) => <li key={link.path}><a href={`/${link.path}`} className="hover:text-mint">{link.label}</a></li>)}
            </ul>
          </nav>
        </div>

        <div className="mx-auto max-w-[1280px] px-5 min-[64.0625rem]:px-0"><div className="h-px bg-white/20" /></div>
        <div data-inner-footer-reveal="" className={`${fade} mx-auto grid max-w-[1280px] grid-cols-1 gap-5 px-5 pt-5 pb-5 text-[12px] leading-[1.7] tracking-[2px] md:grid-cols-[minmax(0,1fr)_auto] min-[64.0625rem]:grid-cols-[minmax(0,1fr)_minmax(0,1.333fr)_minmax(0,1fr)] min-[64.0625rem]:gap-x-5 min-[64.0625rem]:px-[30px]`}>
          <span className="row-2 md:row-1 md:col-1">{siteSettings.copyrightText}</span>
          <nav className="row-1 flex gap-5 md:col-2 md:justify-self-end min-[64.0625rem]:col-3 min-[64.0625rem]:justify-self-start" aria-label="Legal"><a href={siteSettings.termsUrl} className="text-inherit no-underline hover:text-mint">{siteSettings.termsLabel}</a><span className="text-white/25" aria-hidden="true">·</span><a href={siteSettings.privacyUrl} className="text-inherit no-underline hover:text-mint">{siteSettings.privacyLabel}</a></nav>
        </div>
      </div>
    </footer>
  );
}
