"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import HoverDetails from "./hover-details";
import { useSiteSettings } from "./site-settings-provider";

const fadeStyles = "motion-safe:opacity-0 motion-safe:data-[revealed=true]:animate-about-fade-in motion-safe:focus-visible:opacity-100 motion-safe:focus-visible:animate-none motion-safe:has-[:focus-visible]:opacity-100 motion-safe:has-[:focus-visible]:animate-none";
const slideStyles = "motion-safe:opacity-0 motion-safe:data-[revealed=true]:animate-slide-up-enter motion-safe:focus-visible:opacity-100 motion-safe:focus-visible:animate-none";

const buttonStyles = "inline-flex min-h-[54px] items-center justify-center rounded-[80px] text-[12px] font-medium leading-[1.2] tracking-[1px] no-underline transition-[background,color,box-shadow] duration-300 ease-[ease] motion-reduce:transition-none md:text-[14px] md:tracking-[1.5px]";
const iconStyles = "grid size-9 shrink-0 place-items-center rounded-[50%]";
const legalStyles = "font-normal leading-[1.7]";

const services = [
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
const links = [
  { label: "Portfolio", path: "portfolio" },
  { label: "Our Team — Architects, Designers & Engineers", path: "our-team" },
  { label: "Contact", path: "contact-us" },
  { label: "Blog", path: "blog" },
  { label: "Pricing", path: "pricing" },
];

function Caret({ className }: { className?: string }) {
  return <svg width="8" height="6" viewBox="0 0 8 6" aria-hidden="true" className={className}><path d="m0 1 4 4 4-4Z" fill="currentColor" /></svg>;
}

export default function SiteFooter() {
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
    footer.querySelectorAll("[data-footer-reveal]").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <footer ref={footerRef} onFocusCapture={(event) => {
      const reveal = (event.target as HTMLElement).closest<HTMLElement>("[data-footer-reveal]");
      if (reveal) reveal.dataset.revealed = "true";
    }} className="site-footer relative isolate overflow-clip px-5 pt-20 text-[#383838] md:px-[30px] md:pt-[60px] min-[64.0625rem]:pt-[14vh] [&_a]:no-underline [&_a:focus-visible]:outline-2 [&_a:focus-visible]:outline-solid [&_a:focus-visible]:outline-brand [&_a:focus-visible]:outline-offset-4 [&_summary:focus-visible]:outline-2 [&_summary:focus-visible]:outline-solid [&_summary:focus-visible]:outline-brand [&_summary:focus-visible]:outline-offset-4 before:pointer-events-none before:absolute before:-z-1 before:top-[180px] before:left-[55%] before:h-[900px] before:w-[600px] before:-translate-x-1/2 before:rounded-[50%] before:bg-[radial-gradient(ellipse_at_center,#e9fff4_0%,#e9fff4_32%,#e9fff480_50%,transparent_70%)] md:before:-top-40 md:before:w-[850px] min-[64.0625rem]:before:size-[1100px]" aria-label="Site footer">
      <div className="site-footer-inner mx-auto max-w-[1280px]">
        <Link data-footer-reveal="" className={`site-footer-logo ${fadeStyles} mx-auto mb-5 block w-fit md:mx-0 md:mb-[30px] md:inline-block md:w-auto min-[64.0625rem]:mb-[55px] [&_img]:block`} href="/" aria-label={`${siteSettings.siteName} home`}><Image src={siteSettings.symbolLogoUrl} alt="" width={28} height={40} /></Link>
        <div className="site-footer-main grid grid-cols-[minmax(0,1fr)] gap-[25px] pb-[30px] md:grid-cols-[minmax(0,55fr)_minmax(0,45fr)] md:gap-5 md:pb-10 min-[64.0625rem]:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] min-[64.0625rem]:pb-[55px]">
          <div className="site-footer-intro text-center md:text-left min-[64.0625rem]:pr-[12%]">
            <h2 data-footer-reveal="" className={`${fadeStyles} m-0 mb-[25px] text-[16px] font-medium leading-[1.7] tracking-[2px] md:mb-10 min-[64.0625rem]:mb-[60px]`}>{siteSettings.siteName}</h2>
            <p data-footer-reveal="" style={{ animationDelay: "100ms" }} className={`${fadeStyles} m-0 mb-[30px] text-[13px] leading-[1.6] md:mb-10 md:max-w-[400px] min-[64.0625rem]:mb-[55px] min-[64.0625rem]:max-w-[520px]`}>{siteSettings.homeFooterIntro.split("\n").map((line, index) => <span key={index}>{index > 0 && <br />}{line}</span>)}</p>
            <div className="site-footer-actions flex flex-wrap items-center justify-center gap-5 md:justify-normal min-[64.0625rem]:gap-[25px]">
              <a data-footer-reveal="" style={{ animationDelay: "150ms", animationDuration: "1.2s" }} className={`${slideStyles} site-footer-consultation group/footer gap-5 bg-brand py-2 pr-3.5 pl-9 text-cream shadow-[9px_9px_13px_#00000080] hover:bg-mint hover:text-brand ${buttonStyles}`} href={siteSettings.consultationUrl}>
                <span>{siteSettings.homeFooterButton}</span>
                <span className={`site-footer-arrow bg-mint text-brand transition-transform duration-300 ease-[ease] group-hover/footer:translate-x-[3px] motion-reduce:transition-none ${iconStyles}`}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m9 5 7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
              </a>
              <a data-footer-reveal="" style={{ animationDelay: "250ms", animationDuration: "1.2s" }} className={`${slideStyles} site-footer-phone gap-2.5 bg-[#fafaf7] py-2 pr-9 pl-3.5 text-brand shadow-[9px_9px_13px_#0000001a] hover:bg-mint hover:text-brand hover:shadow-[0_10px_20px_4px_#e9fff4] ${buttonStyles}`} href={`tel:${siteSettings.homePhone.replace(/[^+\d]/g, "")}`}>
                <span className={`site-footer-phone-icon bg-brand text-cream ${iconStyles}`}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m8 3 3 5-3 2c1.3 3 3 4.7 6 6l2-3 5 3-1 4c-.2.8-1 1.2-1.8 1C9.4 19.4 4.6 14.6 3 5.8c-.2-.8.2-1.6 1-1.8l4-1Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /><path d="M15 3v3m3-1-2 2m5 2h-3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg></span>
                <span>{siteSettings.homePhone}</span>
              </a>
            </div>
          </div>
          <div data-footer-reveal="" style={{ animationDelay: "100ms" }} className={`${fadeStyles} site-footer-info md:pt-[30px] min-[64.0625rem]:pt-[50px]`}>
            <address className="site-footer-contact mb-[30px] flex flex-col items-center gap-5 text-[13px] leading-5 not-italic text-brand md:mb-[2vh] md:items-stretch [&_p]:m-0 [&_p]:flex [&_p]:items-center [&_p]:gap-2.5 [&_a]:flex [&_a]:items-center [&_a]:gap-2.5 [&_a]:text-inherit [&_a:hover]:text-[#352a4499] md:[&_p]:gap-[15px] md:[&_a]:gap-[15px] [&_svg]:shrink-0 [&_svg]:text-[#172922]">
              <p><svg width="20" height="24" viewBox="0 0 20 24" aria-hidden="true"><path d="M10 1a8 8 0 0 0-8 8c0 6 8 14 8 14s8-8 8-14a8 8 0 0 0-8-8Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" fill="currentColor" /></svg><span>{siteSettings.address}</span></p>
              <a href={`mailto:${siteSettings.email}?subject=Hello`}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="4" stroke="currentColor" strokeWidth="2" /><path d="m4 6 6 5a3 3 0 0 0 4 0l6-5" stroke="currentColor" strokeWidth="2" /></svg><span>{siteSettings.email}</span></a>
            </address>
            <nav className="site-footer-navigation text-center text-[14px] font-medium leading-6 text-brand md:max-w-[200px] md:text-left [&_ul]:m-0 [&_ul]:list-none [&_ul]:p-0 [&>ul>li]:mb-2.5 [&>ul>li>a]:flex [&>ul>li>a]:items-center [&>ul>li>a]:justify-center [&>ul>li>a]:gap-1.5 [&>ul>li>a]:py-[5px] md:[&>ul>li>a]:justify-normal [&_a]:text-inherit [&_a:hover]:text-[#352a4499] [&_summary:hover]:text-[#352a4499] [&_summary]:flex [&_summary]:cursor-pointer [&_summary]:list-none [&_summary]:items-center [&_summary]:gap-2 [&_summary::-webkit-details-marker]:hidden [&_summary_svg]:shrink-0 [&_summary_svg]:transition-transform [&_summary_svg]:duration-200 [&_summary_svg]:ease-[ease] [&_details[open]>summary_svg]:rotate-180 motion-reduce:[&_summary_svg]:transition-none" aria-label="Footer navigation">
              <ul>
                <li><Link href={footerLinks.find((item) => item.href === "/about")?.href || "/about"}>{footerLinks.find((item) => item.href === "/about")?.label || "About"}</Link></li>
                <li>
                  <HoverDetails className="site-footer-services group/services relative w-fit min-[64.0625rem]:pr-3 [&>summary]:justify-center [&>summary]:gap-2 [&>summary]:py-[5px] md:[&>summary]:justify-normal">
                    <summary>Services <Caret className="relative top-[2px]" /></summary>
                    <ul className="site-footer-submenu static z-3 w-[min(300px,calc(100vw-40px))] rounded-2xl border border-[#0000001a] bg-white p-3! text-left text-[13px] leading-[1.5] shadow-[0_8px_24px_#0000001a] motion-safe:group-open/services:animate-footer-menu-in motion-reduce:animate-none md:absolute md:top-full md:left-0 md:w-[min(300px,calc(45vw-30px))] min-[64.0625rem]:top-0 min-[64.0625rem]:left-full min-[64.0625rem]:w-[220px] min-[80rem]:w-[300px] [&_a]:flex [&_a]:rounded-lg [&_a]:p-2 [&_summary]:rounded-lg [&_summary]:p-2 [&_a:hover]:bg-mint [&_summary:hover]:bg-mint [&_details_ul]:pl-3!">
                      <li><Link href="/#services">{siteSettings.allServicesLabel}</Link></li>
                      {serviceMenu?.children?.filter((item) => !item.children?.length).map((item) => <li key={item.href}><Link href={item.href}>{item.label}</Link></li>)}
                      {(serviceMenu?.children?.filter((item) => item.children?.length).map((item) => ({ label: item.label, items: item.children?.map((child) => ({ label: child.label, path: child.href })) || [] })) || services).map((group) => <li key={group.label}>
                        <HoverDetails>
                          <summary>{group.label} <Caret /></summary>
                          <ul>{group.items.map((item) => <li key={item.path}><a href={item.path.startsWith("/") ? item.path : `/${item.path}`}>{item.label}</a></li>)}</ul>
                        </HoverDetails>
                      </li>)}
                    </ul>
                  </HoverDetails>
                </li>
                {footerLinks.length ? footerLinks.filter((item) => item.href !== "/about").map((item) => <li key={item.href}><a href={item.href}>{item.label}</a></li>) : links.map((link) => <li key={link.path}><a href={`/${link.path}`}>{link.label}</a></li>)}
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <div className="site-footer-bottom relative rounded-t-3xl bg-brand px-[15px] py-5 text-cream md:px-5 min-[64.0625rem]:p-[30px] [&_a]:text-inherit [&_a:hover]:text-mint [&_a:focus-visible]:outline-mint">
        <div data-footer-reveal="" className={`${fadeStyles} site-footer-bottom-inner mx-auto grid max-w-[1280px] grid-cols-[minmax(0,1fr)] items-center gap-[15px] text-center md:grid-cols-3 md:gap-5 md:text-left`}>
          <Link className={`site-footer-copyright row-3 text-[12px] tracking-[1px] md:row-auto min-[64.0625rem]:text-[14px] min-[64.0625rem]:tracking-[2px] ${legalStyles}`} href="/">{siteSettings.copyrightText}</Link>
          <nav className="site-footer-social row-1 flex justify-center gap-[5px] md:row-auto [&_a]:grid [&_a]:size-8 [&_a]:place-items-center [&_a]:rounded-[50%] [&_a]:text-mint! [&_a]:transition-[transform,background] [&_a]:duration-200 [&_a]:ease-[ease] [&_a:hover]:bg-[#0000001a] [&_a:hover]:scale-110 motion-reduce:[&_a]:transition-none" aria-label="Social media">
            <a href={siteSettings.linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM2 8h4v14H2V8Zm7 0h4v2c1-1.5 2.3-2.3 4-2.3 4 0 5 2.6 5 6.3v8h-4v-7c0-2-.2-3.7-2.4-3.7-2.5 0-2.6 2-2.6 3.7v7H9V8Z" /></svg></a>
            <a href={siteSettings.facebookUrl} target="_blank" rel="noopener noreferrer" aria-label="Facebook"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M14 22v-9h3l.5-4H14V6.5c0-1 .3-1.5 1.7-1.5H18V1.4A27 27 0 0 0 14.7 1C11.4 1 9 3 9 6.5V9H6v4h3v9h5Z" /></svg></a>
            <a href={siteSettings.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="2" /><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg></a>
          </nav>
          <nav className={`site-footer-legal row-2 flex items-center justify-center gap-5 text-[14px] tracking-[2px] md:row-auto md:justify-end md:text-[12px] md:tracking-[1px] min-[64.0625rem]:justify-normal min-[64.0625rem]:text-[14px] min-[64.0625rem]:tracking-[2px] [&>span]:text-[#ffffff33] ${legalStyles}`} aria-label="Legal"><a href={siteSettings.termsUrl}>{siteSettings.termsLabel}</a><span aria-hidden="true">·</span><a href={siteSettings.privacyUrl}>{siteSettings.privacyLabel}</a></nav>
        </div>
      </div>
    </footer>
  );
}
