"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import homeSections from "@/content/home-sections.json";
import { usePageSection } from "./page-sections-provider";
import { useSiteSettings } from "./site-settings-provider";

const revealStyles = "motion-safe:opacity-0 motion-safe:data-[revealed=true]:animate-about-fade-in";

const headingStyles = "text-[14px] font-medium leading-[1.7] tracking-[1.5px] text-center md:text-[16px] md:tracking-[2px]";
const portraitStyles = "grid size-[45px] -ml-[22px] place-items-center rounded-[50%] border-2 border-cream object-cover first:ml-0 min-[64.0625rem]:size-[50px] min-[64.0625rem]:-ml-5";

const clients = [
  { file: "linventeur.png", name: "L’Inventeur", width: 482, height: 66 },
  { file: "icones-02.png", name: "Watan Training Education", width: 962, height: 456 },
  { file: "Dimensione-Eco-casa-logo-NEW-2048x693-1.png", name: "Dimensione Ecocasa", width: 2048, height: 693 },
  { file: "el_empiro-trading-logo-noir-01.png", name: "Il Empiro Trading", width: 532, height: 296 },
  { file: "imperial_industrial_logo.png", name: "Imperial Investment Group", width: 533, height: 147 },
  { file: "saltana.png", name: "Saltana Architecture d’intérieur", width: 1662, height: 861 },
  { file: "new_logo_artizone.png", name: "Artizone", width: 522, height: 223 },
  { file: "WhatsApp-Image-2023-04-07-at-02.14.38.jpg", name: "Client company logo", width: 456, height: 153 },
  { file: "logo.png", name: "Client company logo", width: 149, height: 100 },
  { file: "vw-logo-3298-1.png", name: "Volkswagen", width: 791, height: 748 },
  { file: "signature-02.png", name: "Signature", width: 1470, height: 705 },
  { file: "yildirim-1.png", name: "Yildirim", width: 225, height: 135 },
  { file: "business-card-aymen-dentist-08.png", name: "Aymen Dental Practice", width: 369, height: 240 },
];
const ClientLogoCarousel = dynamic(() => import("./client-logo-carousel"), {
  ssr: false,
  loading: () => (
    <div className="home-clients-loading grid h-[196px] grid-cols-2 items-center gap-5 overflow-hidden pb-[46px] md:h-[216px] md:grid-cols-3 min-[64.0625rem]:grid-cols-6" aria-label="Client logos">
      {clients.slice(0, 6).map((client) => <Image className="h-auto max-h-[150px] w-full object-contain nth-[n+3]:hidden md:max-h-[170px] md:nth-[n+3]:block md:nth-[n+4]:hidden min-[64.0625rem]:nth-[n+4]:block" key={client.file} src={`/images/client-${client.file}`} alt={client.name} width={client.width} height={client.height} sizes="(max-width: 767px) 45vw, (max-width: 1024px) 30vw, 200px" />)}
    </div>
  ),
});

export default function HomeClients() {
  const content = usePageSection("clients", { ...homeSections.clients, logos: clients });
  const siteSettings = useSiteSettings();
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
    section.querySelectorAll("[data-clients-reveal]").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="home-clients mb-10 px-6 text-[#383838] md:mb-[7vh] md:px-[30px]" aria-labelledby="clients-heading">
      <div className="home-clients-inner mx-auto max-w-[1280px]">
        <h2 data-clients-reveal="" id="clients-heading" className={`m-0 mb-[25px] md:mb-[43px] ${headingStyles} ${revealStyles}`}>{content.heading}</h2>
        <p data-clients-reveal="" className={`home-clients-description m-0 mb-[30px] md:mb-[66px] ${headingStyles} ${revealStyles}`}>{content.description}</p>
        <ClientLogoCarousel clients={content.logos} />
        <div className="home-clients-stats mx-0 mt-10 grid grid-cols-[minmax(0,1fr)] items-center gap-5 border-t border-[#0000001a] pt-[30px] md:mt-[63px] md:grid-cols-[2fr_1fr_2fr] md:pt-[70px] min-[64.0625rem]:mx-[30px]">
          <div className="home-clients-companies flex items-center justify-center gap-3 md:justify-normal md:gap-2.5 min-[64.0625rem]:gap-[15px]">
            <div className="home-clients-portraits flex shrink-0 items-center" aria-hidden="true">
              {content.portraits.map((file) => <Image className={portraitStyles} key={file} src={file} width={50} height={50} alt="" />)}
              <span className={`${portraitStyles} border-white bg-brand`}><Image src={siteSettings.symbolLogoUrl} alt="" width={18} height={25} /></span>
            </div>
            <p className="m-0 text-[14px] leading-[1.7] min-[64.0625rem]:text-[16px]"><span className="block tracking-[2px]">{content.companyCount}</span>{content.companyCaption}</p>
          </div>
          <Image className="home-clients-brand row-1 justify-self-center object-contain md:row-auto" src={siteSettings.symbolLogoUrl} alt="" width={57} height={80} />
          <a className="home-clients-reviews group/reviews row-2 flex items-center justify-self-center gap-[15px] text-inherit no-underline focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-brand focus-visible:outline-offset-3 md:row-auto md:justify-self-end" href={content.reviewUrl} target="_blank" rel="noopener noreferrer" aria-label={`${content.reviewCount} Google reviews, rated 5 out of 5`}>
            <span className="home-clients-google grid size-[50px] place-items-center rounded-[50%] bg-brand transition-[background] duration-300 ease-[ease] group-hover/reviews:bg-mint motion-reduce:transition-none"><Image src="/images/client-google.svg" alt="Google" width={30} height={30} /></span>
            <span><span className="home-clients-stars mb-1 block text-[16px] leading-none tracking-[3px] text-brand" aria-hidden="true">★★★★★</span><span className="home-clients-review-count block text-[16px] leading-[1.05] tracking-[2px]">{content.reviewCount}<br />{content.reviewCaption}</span></span>
          </a>
        </div>
      </div>
    </section>
  );
}
