"use client";

import { useActionState } from "react";
import BrandArrow from "../components/brand-arrow";
import { submitConsultation, type ConsultationState } from "./actions";
import { useSiteSettings } from "../components/site-settings-provider";

const initialState: ConsultationState = { status: "idle", message: "" };
const field = "mt-2 block h-[54px] w-full rounded-xl border border-[#e2e2e2] bg-white px-4 text-[15px] text-[#352a44] outline-none placeholder:text-[#777] focus:border-[#352a44] focus:ring-1 focus:ring-[#352a44]";
const label = "block text-[14px] font-medium text-foreground";

export default function ConsultationForm({ title, introduction, submitLabel, serviceLabel, services, image, imageEyebrow, imageHeading }: { title: string; introduction: string; submitLabel: string; serviceLabel: string; services: string[]; image: string; imageEyebrow: string; imageHeading: string }) {
  const [state, action, pending] = useActionState(submitConsultation, initialState);
  const labels = useSiteSettings().serviceFormLabels;
  return (
    <section id="consultation-form" aria-labelledby="consultation-form-title" className="px-5 py-20 lg:px-[30px]">
      <div className="mx-auto grid max-w-[1240px] overflow-hidden rounded-[32px] bg-white shadow-[0_24px_80px_#352a4412] lg:grid-cols-[0.8fr_1.2fr]">
        <div style={{ backgroundImage: `url(${JSON.stringify(image)})` }} className="relative flex min-h-[290px] flex-col justify-end overflow-hidden bg-brand bg-cover bg-center p-8 text-white sm:p-12 lg:min-h-full">
          <div className="absolute inset-0 bg-gradient-to-t from-[#20162ddd] via-[#20162d44] to-transparent" aria-hidden="true" />
          <div className="relative">
            <p className="m-0 text-xs font-bold tracking-[0.18em] uppercase">{imageEyebrow}</p>
            <p className="mt-4 max-w-[370px] text-[32px] font-semibold leading-[1.2] tracking-[-0.04em]">{imageHeading}</p>
          </div>
        </div>
        <div className="p-7 sm:p-12 lg:p-16">
          <h2 id="consultation-form-title" className="m-0 text-[32px] font-bold leading-tight tracking-[-0.04em] text-brand sm:text-[42px]">{title}</h2>
          <p className="mt-4 text-[16px] leading-[1.7] text-foreground">{introduction}</p>
          {state.status === "success" ? (
            <div role="status" className="mt-10 rounded-2xl bg-mint p-7 text-[17px] leading-[1.6] text-brand">{state.message}</div>
          ) : (
            <form action={action} className="mt-9 grid gap-5 sm:grid-cols-2">
              <div className="absolute -left-[10000px]" aria-hidden="true"><label>Company<input type="text" name="company" tabIndex={-1} autoComplete="off" /></label></div>
              <label className={label}>{labels.firstName} <span aria-hidden="true">*</span><input className={field} name="firstName" placeholder={labels.firstNamePlaceholder} autoComplete="given-name" maxLength={100} required /></label>
              <label className={label}>{labels.lastName} <span aria-hidden="true">*</span><input className={field} name="lastName" placeholder={labels.lastNamePlaceholder} autoComplete="family-name" maxLength={100} required /></label>
              <label className={label}>{labels.email} <span aria-hidden="true">*</span><input className={field} name="email" type="email" placeholder={labels.emailPlaceholder} autoComplete="email" maxLength={254} required /></label>
              <label className={label}>{labels.phone} <span aria-hidden="true">*</span><input className={field} name="phone" type="tel" placeholder={labels.phonePlaceholder} autoComplete="tel" maxLength={40} required /></label>
              <label className={`${label} sm:col-span-2`}>{serviceLabel} <span aria-hidden="true">*</span><select className={field} name="service" defaultValue="" required><option value="" disabled>Select a service</option>{services.map((service) => <option key={service} value={service}>{service}</option>)}</select></label>
              <label className={`${label} sm:col-span-2`}>{labels.message}<textarea name="message" rows={5} maxLength={3000} placeholder={labels.messagePlaceholder} className={`${field} h-auto min-h-[130px] resize-y py-4`} /></label>
              <div className="sm:col-span-2">
                <button type="submit" disabled={pending} className="group inline-flex min-h-[54px] items-center gap-6 rounded-full bg-brand py-2 pr-2 pl-7 text-[12px] font-bold tracking-[1.4px] text-cream uppercase transition-colors hover:bg-mint hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brand disabled:cursor-wait disabled:opacity-60">
                  <span>{pending ? "Submitting…" : submitLabel}</span><span className="grid size-9 place-items-center rounded-full bg-mint text-brand transition-transform group-hover:scale-110"><BrandArrow /></span>
                </button>
                {state.status === "error" && <p role="alert" className="mt-4 text-[14px] text-red-700">{state.message}</p>}
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
