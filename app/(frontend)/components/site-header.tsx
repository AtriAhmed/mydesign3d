"use client";

import Image from "next/image";
import BrandArrow from "./brand-arrow";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useSiteSettings } from "./site-settings-provider";

const focusStyles = "focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-brand focus-visible:outline-offset-4";

type NavItem = { label: string; href: string; children?: NavItem[] };
const navigation: NavItem[] = [
  { label: "About", href: "/about" },
  {
    label: "Services", href: "/#services",
    children: [
      { label: "Full Scale Project Management — Architecture to Digital Delivery", href: "/full-scale-project" },
      {
        label: "Architecture & Design", href: "/architectural-design-bim",
        children: [
          { label: "3D Visualization & Rendering", href: "/3d-visualization-rendering" },
          { label: "Architectural Design & BIM", href: "/architectural-design-bim" },
        ],
      },
      {
        label: "Digital factory", href: "/web-development-application-engineering",
        children: [
          { label: "Web Development & Application Engineering", href: "/web-development-application-engineering" },
          { label: "UI/UX Design & Brand Identity", href: "/ux-ui-design-brand-identity" },
        ],
      },
      {
        label: "Company Setup", href: "/company-setup",
        children: [
          { label: "Business Planning & Company Formation", href: "/company-setup" },
          { label: "Strategic Consultation", href: "/strategic-consultation" },
        ],
      },
    ],
  },
  {
    label: "Portfolio", href: "/portfolio",
    children: [
      { label: "Architecture & 3D", href: "/portfolio" },
      { label: "Web Development", href: "/portfolio/web-development" },
    ],
  },
  { label: "Our Team — Architects, Designers & Engineers", href: "/our-team" },
  { label: "Contact", href: "/contact-us" },
  { label: "Blog", href: "/blog" },
  { label: "Pricing", href: "/pricing" },
];

function Chevron() {
  return <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true"><path d="m1 1 4 4 4-4" stroke="currentColor" strokeWidth="1.3" /></svg>;
}

function NavigationItem({ item, id, close, depth = 0 }: { item: NavItem; id: string; close: () => void; depth?: number }) {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const linkClass = `site-header-link block flex-1 px-5 text-[14px] font-semibold leading-[1.6] text-inherit no-underline transition-colors duration-200 ease-[ease] hover:text-brand motion-reduce:transition-none ${focusStyles} ${depth > 0 ? "py-3 font-normal" : "py-[15px] min-[64.0625rem]:flex-initial min-[64.0625rem]:px-3 min-[64.0625rem]:leading-none"} ${depth === 0 && item.children ? "pr-1 min-[64.0625rem]:pr-1" : ""}`;
  return (
    <li className="site-header-item relative" data-open={open}
      onMouseEnter={() => { if (window.matchMedia("(min-width: 1025px) and (hover: hover)").matches) setOpen(true); }}
      onMouseLeave={() => { if (window.matchMedia("(min-width: 1025px) and (hover: hover)").matches) setOpen(false); }}
      onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) { event.stopPropagation(); setOpen(false); toggleRef.current?.focus(); }
      }}>
      <div className={`site-header-linkRow flex items-center ${depth > 0 ? "hover:bg-cream" : ""}`}>
        {item.href.startsWith("/") ? (
          <Link className={linkClass} href={item.href} onClick={close}>{item.label}</Link>
        ) : (
          <a className={linkClass} href={item.href} onClick={close}>{item.label}</a>
        )}
        {item.children && <button ref={toggleRef} type="button" className={`site-header-submenuToggle flex min-h-11 w-11 cursor-pointer items-center justify-center self-stretch border-0 bg-transparent p-3 text-inherit min-[64.0625rem]:min-h-0 ${focusStyles} ${depth > 0 ? "min-[64.0625rem]:w-9 min-[64.0625rem]:py-2 min-[64.0625rem]:pr-3.5 min-[64.0625rem]:pl-1 min-[64.0625rem]:[&>svg]:-rotate-90" : "min-[64.0625rem]:w-6 min-[64.0625rem]:py-0 min-[64.0625rem]:pr-2 min-[64.0625rem]:pl-0.5"} ${open ? "max-[64.0625rem]:[&>svg]:rotate-180" : ""}`} aria-label={`${item.label} submenu`} aria-expanded={open} aria-controls={id} onClick={() => setOpen(!open)}><Chevron /></button>}
      </div>
      {item.children && <ul id={id} className={`site-header-submenu static z-1 m-0 w-auto list-none border-0 bg-white py-0 pr-0 pl-[18px] hidden:hidden min-[64.0625rem]:absolute min-[64.0625rem]:w-[290px] min-[64.0625rem]:rounded-xl min-[64.0625rem]:border min-[64.0625rem]:border-[#0000001a] min-[64.0625rem]:px-0 min-[64.0625rem]:py-3 min-[64.0625rem]:shadow-[0_10px_30px_#0708070d] ${depth > 0 ? "min-[64.0625rem]:-top-[13px] min-[64.0625rem]:left-full" : "min-[64.0625rem]:top-full min-[64.0625rem]:left-0"}`} hidden={!open}>
        {item.children.map((child, index) => <NavigationItem key={child.label} item={child} id={`${id}-${index}`} close={close} depth={depth + 1} />)}
      </ul>}
    </li>
  );
}

export default function SiteHeader() {
  const siteSettings = useSiteSettings();
  const menuItems = siteSettings.navigation.length ? siteSettings.navigation : navigation;
  const [menuOpen, setMenuOpen] = useState(false);
  const [reset, setReset] = useState(0);
  const headerRef = useRef<HTMLDivElement>(null);
  const menuToggleRef = useRef<HTMLButtonElement>(null);
  function closeMenu() { setMenuOpen(false); setReset((value) => value + 1); }
  useEffect(() => {
    const nav = headerRef.current?.querySelector<HTMLElement>("#primary-navigation");
    if (!nav) return;
    const desktop = window.matchMedia("(min-width: 1025px)");
    function updateInteractivity() {
      if (nav) nav.inert = !desktop.matches && !menuOpen;
    }
    updateInteractivity();
    desktop.addEventListener("change", updateInteractivity);
    return () => desktop.removeEventListener("change", updateInteractivity);
  }, [menuOpen]);
  useEffect(() => {
    const header = headerRef.current?.querySelector<HTMLElement>(".site-header-header");
    const menu = header?.querySelector<HTMLElement>(".site-header-menu");
    if (!header || !menu) return;
    const desktop = window.matchMedia("(min-width: 1025px)");
    function updateSpacing() {
      if (!header || !menu) return;
      const items = Array.from(menu.children);
      const rowTops: number[] = [];
      for (const item of items) {
        const top = item.getBoundingClientRect().top;
        if (!rowTops.some((rowTop) => Math.abs(rowTop - top) <= 1)) rowTops.push(top);
      }
      const rows = desktop.matches ? rowTops.length : 1;
      header.dataset.wrapped = String(rows > 1);
      header.dataset.rows = String(rows);
    }
    const observer = new ResizeObserver(updateSpacing);
    observer.observe(menu);
    desktop.addEventListener("change", updateSpacing);
    updateSpacing();
    return () => {
      observer.disconnect();
      desktop.removeEventListener("change", updateSpacing);
    };
  }, [reset]);
  useEffect(() => {
    function dismiss(event: PointerEvent) {
      if (!headerRef.current?.contains(event.target as Node)) { setMenuOpen(false); setReset((value) => value + 1); }
    }
    const breakpoint = window.matchMedia("(min-width: 1025px)");
    function resize() { setMenuOpen(false); setReset((value) => value + 1); }
    document.addEventListener("pointerdown", dismiss);
    breakpoint.addEventListener("change", resize);
    return () => { document.removeEventListener("pointerdown", dismiss); breakpoint.removeEventListener("change", resize); };
  }, []);
  return (
    <div className="site-header-wrapper sticky top-0 z-100 mb-1 p-5 md:px-[30px]" ref={headerRef} onKeyDown={(event) => {
      if (event.key === "Escape") { closeMenu(); menuToggleRef.current?.focus(); }
    }}>
      <a className={`site-header-skipLink absolute -top-[100px] left-[50px] rounded-lg bg-white px-4 py-2.5 focus:top-0 focus:z-2 ${focusStyles}`} href="#main-content">Skip to content</a>
      <header className="site-header-header relative flex min-h-[60px] items-center justify-between gap-2.5 rounded-[60px] bg-white pl-0 pr-[5px] data-[rows=2]:pl-5 data-[rows=2]:pr-5 data-[rows=3]:pl-9 data-[rows=3]:pr-9 md:gap-5 min-[64.0625rem]:justify-normal">
        <Link href="/" className="site-header-logo flex flex-[0_0_145px] items-center md:basis-[197px] [&_img]:block [&_img]:h-auto [&_img]:w-full" aria-label={`${siteSettings.siteName} home`}>
          <Image src={siteSettings.headerLogoUrl} alt={siteSettings.siteName} width={2254} height={656} sizes="(max-width: 767px) 145px, 197px" preload />
        </Link>
        <nav id="primary-navigation" aria-label="Main navigation" className="site-header-navigation absolute top-[calc(100%+10px)] -left-5 invisible pointer-events-none -translate-y-2 opacity-0 [clip-path:inset(0_0_100%_0)] transition-[clip-path,opacity,translate,visibility] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none max-h-[calc(100dvh-110px)] w-[calc(100%+40px)] min-w-0 flex-1 overflow-y-auto border-y border-[#0000001a] bg-white px-5 py-3 data-[open=true]:visible data-[open=true]:pointer-events-auto data-[open=true]:translate-y-0 data-[open=true]:opacity-100 data-[open=true]:[clip-path:inset(0)] md:-left-[30px] md:w-[calc(100%+60px)] md:px-[30px] md:py-4 min-[64.0625rem]:visible min-[64.0625rem]:pointer-events-auto min-[64.0625rem]:translate-y-0 min-[64.0625rem]:opacity-100 min-[64.0625rem]:[clip-path:none] min-[64.0625rem]:transition-none min-[64.0625rem]:static min-[64.0625rem]:top-auto min-[64.0625rem]:left-auto min-[64.0625rem]:block min-[64.0625rem]:max-h-none min-[64.0625rem]:w-auto min-[64.0625rem]:overflow-visible min-[64.0625rem]:border-0 min-[64.0625rem]:bg-transparent min-[64.0625rem]:p-0" data-open={menuOpen}>
          <ul className="site-header-menu m-0 block list-none p-0 min-[64.0625rem]:flex min-[64.0625rem]:flex-wrap min-[64.0625rem]:items-center min-[64.0625rem]:justify-center" key={reset}>
            {menuItems.map((item, index) => <NavigationItem key={item.label} item={item} id={`nav-submenu-${index}`} close={closeMenu} />)}
          </ul>
        </nav>
        <button ref={menuToggleRef} className={`site-header-menuToggle ml-auto flex size-11 cursor-pointer items-center justify-center border-0 bg-transparent p-2.5 text-inherit min-[64.0625rem]:hidden min-[64.0625rem]:size-auto min-[64.0625rem]:p-0 ${focusStyles}`} type="button" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} aria-controls="primary-navigation" onClick={() => { if (menuOpen) closeMenu(); else setMenuOpen(true); }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            {menuOpen ? <path d="m5 5 14 14M5 19 19 5" stroke="currentColor" strokeWidth="1.5" /> : <path d="M3 7h18M3 12h18M3 17h18" stroke="currentColor" strokeWidth="1.5" />}
          </svg>
        </button>
        <a className={`site-header-consultation group/header hidden min-h-[50px] flex-[0_0_auto] items-center justify-center gap-5 rounded-[80px] bg-brand py-2 pr-3.5 pl-[25px] text-[12px] font-bold leading-[1.1] tracking-[1.5px] text-cream uppercase no-underline transition-[background,color] duration-300 ease-[ease] hover:bg-mint hover:text-foreground motion-reduce:transition-none md:flex ${focusStyles}`} href={siteSettings.consultationUrl}>
          <span className="relative after:pointer-events-none after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-current after:transition-transform after:duration-600 after:ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/header:after:origin-left group-hover/header:after:scale-x-100 group-focus-visible/header:after:origin-left group-focus-visible/header:after:scale-x-100 motion-reduce:after:transition-none">{siteSettings.consultationLabel}</span>
          <span className="site-header-consultationArrow grid size-9 shrink-0 place-items-center rounded-[50%] bg-mint text-brand transition-[transform,scale,background-color,color] duration-300 ease-[ease] group-hover/header:scale-120 group-hover/header:bg-brand group-hover/header:text-mint group-focus-visible/header:scale-120 group-focus-visible/header:bg-brand group-focus-visible/header:text-mint motion-reduce:transition-none"><BrandArrow /></span>
        </a>
      </header>
    </div>
  );
}
