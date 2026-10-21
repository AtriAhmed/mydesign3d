"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";
import { motion, useReducedMotion } from "motion/react";
import BrandArrow from "./brand-arrow";
import { useSiteSettings } from "./site-settings-provider";

const inputClasses = "mt-[5px] block h-[52px] w-full rounded-[12px] border border-[#e2e2e2] bg-white px-5 text-[14px] leading-[22px] text-foreground outline-none placeholder:text-[#7c7c7c] focus:border-brand focus:ring-1 focus:ring-brand";
const labelClasses = "block text-[14px] leading-[22px] text-foreground";

type ServiceLocation = {
  name: string;
  address: string;
  phone: string;
  phoneHref: string;
};

type ServiceContactProps = {
  sectionId: string;
  titleId: string;
  title: string;
  introduction: string;
  imageSrc: string;
  imageAlt: string;
  services: string[];
  inquiryType: string;
  imageHeading?: string;
  imageCaption?: string;
  locations?: ServiceLocation[];
  serviceLabel?: string;
  submitLabel?: string;
  fullWidthContactFields?: boolean;
};

export default function ServiceContact({ sectionId, titleId, title, introduction, imageSrc, imageAlt, services, inquiryType, imageHeading = "24/7", imageCaption = "Fast & reliable delivery", locations, serviceLabel = "What service do you need?", submitLabel = "Send Request", fullWidthContactFields = false }: ServiceContactProps) {
  const reduceMotion = useReducedMotion();
  const siteSettings = useSiteSettings();
  const form = siteSettings.serviceFormLabels;
  const [emailAppOpened, setEmailAppOpened] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    const firstName = String(values.get("firstName") ?? "").trim();
    const lastName = String(values.get("lastName") ?? "").trim();
    const email = String(values.get("email") ?? "").trim();
    const phone = String(values.get("phone") ?? "").trim();
    const service = String(values.get("service") ?? "");
    const message = String(values.get("message") ?? "").trim();
    const subject = encodeURIComponent(`${inquiryType} inquiry — ${firstName} ${lastName}`);
    const body = encodeURIComponent(`Name: ${firstName} ${lastName}\nEmail: ${email}\nPhone: ${phone}\nService: ${service}\n\nProject details:\n${message || "Not provided"}`);

    setEmailAppOpened(true);
    window.location.href = `mailto:${siteSettings.email}?subject=${subject}&body=${body}`;
  }

  return (
    <section id={sectionId} aria-labelledby={titleId} className="bg-white px-5 py-[8vh] lg:px-[30px]">
      <div className="mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-2 lg:gap-5">
        <div className="relative min-h-[480px] lg:min-h-[720px]">
          <div className="sticky top-[80px] h-[480px] overflow-hidden rounded-[24px] lg:h-[720px]">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              sizes="(min-width: 1024px) 630px, 100vw"
              className="object-cover object-center"
            />
            <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[220px] bg-[linear-gradient(180deg,#ffffff00_0%,#0708070d_100%)] before:absolute before:inset-0 before:backdrop-blur-[18px] before:[mask-image:linear-gradient(transparent,#000)]" />
            <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-2.5 pb-10 text-center text-white">
              <span className="text-[18px] font-bold leading-[1.85]">{imageHeading}</span>
              <span className="text-[16px] leading-[1.5] tracking-[2px] uppercase">{imageCaption}</span>
            </div>
          </div>
        </div>

        <div className="min-w-0 py-[27px] lg:pl-[16.2%]">
          <motion.h2
            id={titleId}
            initial={reduceMotion ? false : { opacity: 0, y: 55 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="m-0 mb-5 text-center text-[32px] font-bold leading-[1.1] tracking-[-1.5px] text-brand sm:text-[38px]"
          >
            {title}
          </motion.h2>
          <motion.p
            initial={reduceMotion ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: reduceMotion ? 0 : 0.05 }}
            className="mt-[10px] text-center text-[16px] font-bold leading-[1.85] text-foreground"
          >
            {introduction}
          </motion.p>

          <form onSubmit={handleSubmit} aria-label={`Request a ${inquiryType} project`} className="mt-[10px] grid grid-cols-1 gap-x-5 gap-y-5 pt-[35px] sm:grid-cols-2">
            <label className={labelClasses}>
              {form.firstName}
              <input name="firstName" type="text" autoComplete="given-name" placeholder={form.firstNamePlaceholder} required className={inputClasses} />
            </label>
            <label className={labelClasses}>
              {form.lastName}
              <input name="lastName" type="text" autoComplete="family-name" placeholder={form.lastNamePlaceholder} required className={inputClasses} />
            </label>
            <label className={`${labelClasses} ${fullWidthContactFields ? "sm:col-span-2" : ""}`}>
              {form.email}
              <input name="email" type="email" autoComplete="email" placeholder={form.emailPlaceholder} required className={inputClasses} />
            </label>
            <label className={`${labelClasses} ${fullWidthContactFields ? "sm:col-span-2" : ""}`}>
              {form.phone}
              <input name="phone" type="tel" autoComplete="tel" placeholder={form.phonePlaceholder} required className={inputClasses} />
            </label>
            <label className={`${labelClasses} sm:col-span-2`}>
              {serviceLabel}
              <span className="relative block">
                <select name="service" required defaultValue={services[0]} className={`${inputClasses} cursor-pointer appearance-none pr-10`}>
                  {services.map((service) => <option key={service} value={service}>{service}</option>)}
                </select>
                <svg className="pointer-events-none absolute top-1/2 right-5 size-3 -translate-y-1/2" viewBox="0 0 12 8" aria-hidden="true"><path fill="currentColor" d="M0 1h12L6 7z" /></svg>
              </span>
            </label>
            <label className={`${labelClasses} sm:col-span-2`}>
              {form.message}
              <textarea name="message" rows={4} placeholder={form.messagePlaceholder} className="mt-[5px] block min-h-[118px] w-full resize-y rounded-[12px] border border-[#e2e2e2] bg-white px-5 py-[14px] text-[14px] leading-[22px] text-foreground outline-none placeholder:text-[#7c7c7c] focus:border-brand focus:ring-1 focus:ring-brand" />
            </label>
            <div className="flex flex-col items-center gap-2 sm:col-span-2">
              <button type="submit" className="group/contact-submit inline-flex min-h-[51px] w-[293px] max-w-full items-center justify-between rounded-[80px] bg-brand py-[7px] pr-[14px] pl-9 text-[12px] font-bold leading-[1.1] tracking-[1.5px] text-cream uppercase shadow-[9px_9px_13px_#00000080] transition-colors duration-300 hover:bg-mint hover:text-brand focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-4 motion-reduce:transition-none">
                <span className="relative after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-current after:transition-transform after:duration-600 group-hover/contact-submit:after:origin-left group-hover/contact-submit:after:scale-x-100 group-focus-visible/contact-submit:after:origin-left group-focus-visible/contact-submit:after:scale-x-100">{submitLabel}</span>
                <span aria-hidden="true" className="grid size-9 shrink-0 place-items-center rounded-full bg-mint text-brand transition-[scale,background-color,color] duration-300 group-hover/contact-submit:scale-120 group-hover/contact-submit:bg-brand group-hover/contact-submit:text-mint group-focus-visible/contact-submit:scale-120 group-focus-visible/contact-submit:bg-brand group-focus-visible/contact-submit:text-mint motion-reduce:transition-none"><BrandArrow /></span>
              </button>
              {emailAppOpened && <p role="status" className="text-center text-[13px] leading-relaxed text-foreground">{form.successMessage}</p>}
            </div>
          </form>
        </div>
      </div>
      {locations && (
        <div className="mx-auto mt-[72px] grid max-w-[1280px] gap-10 md:grid-cols-3 md:gap-5">
          {locations.map((location, index) => (
            <motion.div
              key={location.name}
              initial={reduceMotion ? false : { opacity: 0, y: 70 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: reduceMotion ? 0 : index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center text-center"
            >
              <h3 className="m-0 text-[18px] font-bold leading-[1.5] text-brand">{location.name}</h3>
              <p className="mt-5 min-h-[72px] max-w-[320px] whitespace-pre-line text-[16px] leading-[1.7] text-foreground">{location.address}</p>
              <a href={location.phoneHref} className="group/location mt-5 inline-flex items-center gap-3 text-[12px] font-bold tracking-[1.5px] text-brand no-underline">
                <span aria-hidden="true" className="grid size-11 place-items-center rounded-full bg-[#fafaf7] transition-transform duration-300 group-hover/location:scale-110">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="m8 3 3 5-3 2c1.3 3 3 4.7 6 6l2-3 5 3-1 4c-.2.8-1 1.2-1.8 1C9.4 19.4 4.6 14.6 3 5.8c-.2-.8.2-1.6 1-1.8l4-1Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /><path d="M15 3v3m3-1-2 2m5 2h-3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg>
                </span>
                <span className="relative after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-current after:transition-transform after:duration-500 group-hover/location:after:origin-left group-hover/location:after:scale-x-100">{location.phone}</span>
              </a>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
