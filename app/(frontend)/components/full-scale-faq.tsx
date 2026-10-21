"use client";

import { useEffect, useRef, useState } from "react";
import BrandArrow from "./brand-arrow";
import { usePageSection } from "./page-sections-provider";

const questions = [
  {
    question: "Q1: What exactly is a Full Scale Project?",
    answer: "It’s our all-in-one engagement model where a single MyDesign3D team handles architecture, design, development, and business strategy under one contract, one timeline, and one point of contact. You stop coordinating vendors; we handle everything.",
  },
  {
    question: "Q2: How long does a Full Scale Project typically take?",
    answer: "It depends on scope. A digital + branding project typically runs 6–12 weeks. A full architecture + digital engagement can range from 3 to 12 months. We define the exact timeline during the discovery phase before any commitment.",
  },
  {
    question: "Q3: Do I need to use all disciplines, or can I pick specific ones?",
    answer: "You can. The Full Scale model is our flagship offering, but we also work on individual discipline projects. If you only need a web platform or only architectural design, we can scope that separately.",
  },
  {
    question: "Q4: What types of clients do you work with?",
    answer: "We work with startups, real estate developers, enterprises, and entrepreneurs across industries — from retail and hospitality to tech and professional services. If your project requires multiple disciplines, we’re built for it.",
  },
  {
    question: "Q5: How is pricing structured?",
    answer: "We provide fixed-price proposals based on scope — no hourly billing surprises. Every proposal includes a full breakdown by discipline, milestone, and deliverable. Consultation is always free.",
  },
];

const fadeIn = "motion-safe:opacity-0 motion-safe:data-[revealed=true]:animate-about-fade-in";

export default function FullScaleFaq() {
  const section = usePageSection("faq", { title: "Frequently\nAsked Questions", button: "Read our FAQ’s", buttonUrl: "https://www.mydesign3d.com/faq/", questions });
  const sectionRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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
    }, { threshold: 0.1, rootMargin: "0px 0px -20px 0px" });
    section.querySelectorAll("[data-faq-reveal]").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} aria-labelledby="full-scale-faq-heading" className="px-5 pb-10 lg:px-[30px] lg:pb-[14vh]">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-2.5 lg:grid-cols-2 lg:gap-5">
        <div className="flex flex-col items-start justify-between gap-2.5">
          <h2 id="full-scale-faq-heading" data-faq-reveal="" className={`text-[28px] font-bold leading-[1.1] tracking-[-1.5px] text-brand lg:text-[38px] ${fadeIn}`}>{section.title.split("\n").map((line, index) => <span key={index}>{index > 0 && <br />}{line}</span>)}</h2>
          <a data-faq-reveal="" style={{ animationDelay: "50ms" }} href={section.buttonUrl} className={`group/faq inline-flex min-h-[49px] items-center gap-5 rounded-full bg-brand py-2 pr-3.5 pl-9 text-[12px] font-bold leading-[1.1] tracking-[1.5px] whitespace-nowrap text-cream uppercase no-underline transition-colors duration-300 hover:bg-mint hover:text-brand focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-4 motion-reduce:transition-none lg:min-h-[51px] ${fadeIn}`}>
            <span className="relative after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-current after:content-[''] after:transition-transform after:duration-600 after:ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/faq:after:origin-left group-hover/faq:after:scale-x-100 group-focus-visible/faq:after:origin-left group-focus-visible/faq:after:scale-x-100 motion-reduce:after:transition-none">{section.button}</span>
            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-mint text-brand transition-[scale,background-color,color] duration-300 group-hover/faq:scale-120 group-hover/faq:bg-brand group-hover/faq:text-mint group-focus-visible/faq:scale-120 group-focus-visible/faq:bg-brand group-focus-visible/faq:text-mint motion-reduce:transition-none"><BrandArrow /></span>
          </a>
        </div>

        <div data-faq-reveal="" style={{ animationDelay: "50ms" }} className={fadeIn}>
          {section.questions.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={item.question} className="border-b border-brand">
                <button type="button" aria-expanded={isOpen} aria-controls={`full-scale-faq-panel-${index}`} onClick={() => setOpenIndex(isOpen ? null : index)} className="flex min-h-[73px] w-full cursor-pointer items-center justify-between gap-4 py-[17px] text-left text-[16px] leading-[1.5] text-foreground focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-[-2px] max-lg:min-h-[59px]">
                  <span>{item.question}</span>
                  <span aria-hidden="true" className={`grid size-5 shrink-0 place-items-center text-brand transition-transform duration-400 motion-reduce:transition-none ${isOpen ? "-rotate-90" : "rotate-90"}`}><BrandArrow /></span>
                </button>
                <div id={`full-scale-faq-panel-${index}`} role="region" aria-hidden={!isOpen} className={`grid transition-[grid-template-rows] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <div className="min-h-0 overflow-hidden"><p className="pb-5 text-[16px] leading-[1.85] text-foreground">{item.answer}</p></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
