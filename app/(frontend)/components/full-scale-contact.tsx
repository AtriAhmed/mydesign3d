"use client";

import Image from "next/image";
import { useEffect, useRef, type FormEvent } from "react";
import BrandArrow from "./brand-arrow";
import { usePageSection } from "./page-sections-provider";
import { useSiteSettings } from "./site-settings-provider";

const steps = [
  {
    title: "Free Consultation",
    description: "We review your request and schedule a free 30-min discovery call to understand your project scope.",
  },
  {
    title: "Proposal & Scoping",
    description: "We send a tailored proposal with timeline, team composition, and full cost breakdown. No surprises.",
  },
  {
    title: "Project Kickoff",
    description: "Once aligned, your dedicated team is assembled and the project officially begins.",
  },
  {
    title: "Delivery & Beyond",
    description: "We deliver, deploy, and stay with you through go-live and post-launch support.",
  },
];

const inputClasses = "mt-1.5 block h-[52px] w-full rounded-[12px] border border-[#e2e2e2] bg-white px-5 text-[14px] text-foreground outline-none placeholder:text-[#7c7c7c] focus:border-brand focus:ring-1 focus:ring-brand";
const pillClasses = "group/contact-pill inline-flex min-h-[80px] items-center gap-2.5 rounded-full bg-white/80 px-[35px] text-[12px] font-bold tracking-[1.5px] whitespace-nowrap text-brand uppercase no-underline shadow-[0_10px_24px_#352a4414] backdrop-blur-[10px] transition-shadow duration-300 hover:shadow-[0_0_20px_4px_#fffc] focus-visible:shadow-[0_0_20px_4px_#fffc] focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2 motion-reduce:transition-none max-[767px]:min-h-[70px] max-[767px]:px-[35px]";
const pillIconClasses = "grid size-[50px] shrink-0 place-items-center rounded-full bg-mint text-[#070807e5] transition-[scale,background-color,color] duration-300 group-hover/contact-pill:scale-120 group-hover/contact-pill:bg-brand group-hover/contact-pill:text-mint group-focus-visible/contact-pill:scale-120 group-focus-visible/contact-pill:bg-brand group-focus-visible/contact-pill:text-mint motion-reduce:transition-none max-[767px]:size-10";
const pillLabelClasses = "relative after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-current after:content-[''] after:transition-transform after:duration-600 after:ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/contact-pill:after:origin-left group-hover/contact-pill:after:scale-x-100 group-focus-visible/contact-pill:after:origin-left group-focus-visible/contact-pill:after:scale-x-100 motion-reduce:after:transition-none";
const fadeIn = "motion-safe:opacity-0 motion-safe:data-[revealed=true]:animate-about-fade-in";
const slideIn = "motion-safe:opacity-0 motion-safe:data-[revealed=true]:animate-slide-up-enter";

function PhoneIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m8 3 3 5-3 2c1.3 3 3 4.7 6 6l2-3 5 3-1 4c-.2.8-1 1.2-1.8 1C9.4 19.4 4.6 14.6 3 5.8c-.2-.8.2-1.6 1-1.8l4-1Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /><path d="M15 3v3m3-1-2 2m5 2h-3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg>;
}

function MailIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="4" stroke="currentColor" strokeWidth="2" /><path d="m4 6 6 5a3 3 0 0 0 4 0l6-5" stroke="currentColor" strokeWidth="2" /></svg>;
}

export default function FullScaleContact() {
  const siteSettings = useSiteSettings();
  const section = usePageSection("contact", {
    title: "Ready to take the first step?",
    description: "Every great project starts with a conversation. Tell us what you’re building — we’ll tell you how we can make it happen.",
    image: "/images/full-scale-startup.jpg",
    formTitle: "Book a session",
    submitLabel: "Send your request →",
    expectHeading: "What to expect?",
    formLabels: { firstName: "Your name", lastName: "Last name", email: "Email", phone: "Phone number", service: "What services are you interested in?", message: "Message" },
    formPlaceholders: { firstName: "John", lastName: "Smith", email: "your@mail.com", phone: "+01 200 40 3032", message: "Briefly share what you’d like to discuss (optional)..." },
    serviceOptions: ["— Full Scale Project (all disciplines)", "— Architecture & 3D Design", "— Web & Digital", "— Business Setup & Strategy", "— Not sure yet — I need guidance"],
    steps,
  });
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
    }, { threshold: 0.1, rootMargin: "0px 0px -20px 0px" });
    section.querySelectorAll("[data-contact-reveal]").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    const firstName = String(values.get("firstName") ?? "").trim();
    const lastName = String(values.get("lastName") ?? "").trim();
    const email = String(values.get("email") ?? "").trim();
    const phone = String(values.get("phone") ?? "").trim();
    const service = String(values.get("service") ?? "");
    const message = String(values.get("message") ?? "").trim();
    const subject = encodeURIComponent(`Full Scale Project inquiry — ${firstName} ${lastName}`);
    const body = encodeURIComponent(`Name: ${firstName} ${lastName}\nEmail: ${email}\nPhone: ${phone}\nService: ${service}\n\nProject details:\n${message || "Not provided"}`);
    window.location.href = `mailto:${siteSettings.email}?subject=${subject}&body=${body}`;
  }

  return (
    <section ref={sectionRef} id="full-scale-contact" aria-labelledby="full-scale-contact-heading" className="px-5 pb-10 lg:px-[30px] lg:pb-[14vh]">
      <div className="mx-auto max-w-[1340px] overflow-hidden rounded-3xl bg-white px-5 pb-2.5 lg:px-[30px] lg:pb-[50px]">
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr]">
          <div className="min-w-0 pt-[25px] lg:pr-[25px] lg:pt-[60px]">
            <h2 id="full-scale-contact-heading" data-contact-reveal="" className={`text-[28px] font-bold leading-[1.1] tracking-[-1.5px] text-brand lg:text-[38px] ${fadeIn}`}>{section.title}</h2>
            <p data-contact-reveal="" style={{ animationDelay: "50ms" }} className={`mt-2.5 text-[16px] leading-[1.85] text-foreground ${fadeIn}`}>{section.description}</p>

            <div className="relative mt-[30px] h-[350px] overflow-hidden rounded-3xl bg-cover bg-center lg:mt-[45px] lg:h-[680px]" style={{ backgroundImage: `url(${section.image})` }}>
              <div className="absolute inset-x-0 bottom-0 h-[230px] bg-[linear-gradient(180deg,transparent_0%,white_95%)] before:absolute before:inset-0 before:backdrop-blur-[18px] before:[mask-image:linear-gradient(transparent,#000)] before:content-[''] lg:h-[220px]" aria-hidden="true" />
              <div data-contact-reveal="" style={{ animationDuration: "1s" }} className={`absolute inset-x-0 bottom-0 z-10 flex flex-col items-center justify-end gap-2.5 px-5 pb-[70px] lg:flex-row lg:justify-center lg:gap-5 lg:px-[30px] lg:pb-[45px] ${slideIn}`}>
                <a href={`tel:${siteSettings.phone.replace(/[^+\d]/g, "")}`} className={pillClasses}><span className={pillIconClasses}><PhoneIcon /></span><span className={pillLabelClasses}>{siteSettings.phone}</span></a>
                <a href={`mailto:${siteSettings.email}?subject=Hello`} className={pillClasses}><span className={pillIconClasses}><MailIcon /></span><span className={pillLabelClasses}>{siteSettings.email}</span></a>
              </div>
            </div>
          </div>

          <div className="relative z-10 min-w-0 pt-0 lg:pl-[25px] lg:pt-[75px]">
            <div data-contact-reveal="" className={`mx-auto -mt-[30px] h-[28px] w-[20px] lg:mt-0 lg:h-[85px] lg:w-[60px] ${fadeIn}`}><Image src={siteSettings.symbolLogoUrl} alt="" width={60} height={85} className="h-full w-full object-contain" /></div>
            <h3 data-contact-reveal="" style={{ animationDelay: "50ms" }} className={`mt-2.5 text-center text-[18px] font-bold leading-[1.4] text-brand ${fadeIn}`}>{section.formTitle}</h3>
            <form data-contact-reveal="" style={{ animationDelay: "100ms" }} onSubmit={handleSubmit} className={`mt-5 grid grid-cols-1 gap-x-5 gap-y-5 text-[14px] leading-[1.5] text-foreground sm:grid-cols-2 lg:mt-[45px] ${fadeIn}`}>
              <label className="block">{section.formLabels.firstName}<input name="firstName" type="text" autoComplete="given-name" placeholder={section.formPlaceholders.firstName} required className={inputClasses} /></label>
              <label className="block">{section.formLabels.lastName}<input name="lastName" type="text" autoComplete="family-name" placeholder={section.formPlaceholders.lastName} required className={inputClasses} /></label>
              <label className="block sm:col-span-2">{section.formLabels.email}<input name="email" type="email" autoComplete="email" placeholder={section.formPlaceholders.email} required className={inputClasses} /></label>
              <label className="block sm:col-span-2">{section.formLabels.phone}<input name="phone" type="tel" autoComplete="tel" placeholder={section.formPlaceholders.phone} required className={inputClasses} /></label>
              <label className="block sm:col-span-2">{section.formLabels.service}<span className="relative block"><select name="service" required defaultValue={section.serviceOptions[0]} className={`${inputClasses} cursor-pointer appearance-none pr-10`}>
                {section.serviceOptions.map((option) => <option key={option}>{option}</option>)}
              </select><svg className="pointer-events-none absolute top-1/2 right-5 size-3 -translate-y-1/2" viewBox="0 0 12 8" aria-hidden="true"><path fill="currentColor" d="M0 1h12L6 7z" /></svg></span></label>
              <label className="block sm:col-span-2">{section.formLabels.message}<textarea name="message" rows={4} placeholder={section.formPlaceholders.message} className="mt-1.5 block min-h-[118px] w-full resize-y rounded-[12px] border border-[#e2e2e2] bg-white px-5 py-3.5 text-[14px] text-foreground outline-none placeholder:text-[#7c7c7c] focus:border-brand focus:ring-1 focus:ring-brand" /></label>
              <button type="submit" className="group/contact-submit inline-flex min-h-[51px] w-fit items-center gap-5 rounded-full bg-brand py-2 pr-3.5 pl-9 text-[12px] font-bold tracking-[1.5px] whitespace-nowrap text-cream uppercase shadow-[9px_9px_13px_#00000080] transition-colors duration-300 hover:bg-mint hover:text-brand focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-4 motion-reduce:transition-none sm:col-span-2">
                <span className="relative after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-current after:transition-transform after:duration-600 group-hover/contact-submit:after:origin-left group-hover/contact-submit:after:scale-x-100">{section.submitLabel}</span>
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-mint text-brand transition-[scale,background-color,color] duration-300 group-hover/contact-submit:scale-120 group-hover/contact-submit:bg-brand group-hover/contact-submit:text-mint"><BrandArrow /></span>
              </button>
            </form>
          </div>
        </div>

        <div className="mt-[50px] grid grid-cols-1 gap-5 lg:mt-5 lg:grid-cols-[96px_1fr]">
          <h3 className="text-center text-[16px] font-semibold tracking-[2px] text-foreground lg:flex lg:items-center lg:justify-center lg:[writing-mode:vertical-rl] lg:rotate-180">{section.expectHeading}</h3>
          <ol className="relative grid grid-cols-1 gap-[30px] pb-[10px] text-center lg:grid-cols-4 lg:gap-5 lg:pt-[40px]">
            <span aria-hidden="true" className="absolute top-[65px] right-[10%] left-[10%] hidden h-px bg-[#e2e2e2] lg:block" />
            {section.steps.map((step, index) => (
              <li key={step.title} data-contact-reveal="" style={{ animationDelay: `${index * 50}ms` }} className={`relative flex flex-col items-center ${slideIn}`}>
                <span className="relative z-10 grid size-[50px] place-items-center rounded-full border border-[#e2e2e2] bg-white text-[16px] text-foreground">{index + 1}</span>
                <h4 className="mt-4 text-[16px] font-medium tracking-[2px] text-foreground">{step.title}</h4>
                <p className="mt-3.5 text-[16px] leading-[1.85] text-foreground">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
