"use client";

import { useSiteSettings } from "./site-settings-provider";

type PricingRow = { service: string; startingAt: string };

type ServicePricingProps = {
  titleId: string;
  title: string;
  startingPrice: string;
  description: string;
  columnLabel: string;
  valueColumnLabel?: string;
  rows: PricingRow[];
  ctaLabel: string;
  note?: string | null;
};

export default function ServicePricing({ titleId, title, startingPrice, description, columnLabel, valueColumnLabel = "Starting at", rows, ctaLabel, note = "Indicative starting prices — final quote depends on scope." }: ServicePricingProps) {
  const siteSettings = useSiteSettings();
  return (
    <section aria-labelledby={titleId} className="px-2.5 pt-[30px] pb-[50px]">
      <div className="mx-auto max-w-[920px] rounded-2xl bg-brand px-5 py-11 text-white sm:px-8">
        <h2 id={titleId} className="mb-2 text-[28px] font-bold leading-[1.2]">
          {title}
        </h2>
        <p className="mb-5 text-[23px] font-bold leading-[1.3] text-[#f7d2ff]">{startingPrice}</p>
        <p className="mb-[22px] text-[16px] leading-[1.75] text-[#ede6f2]">
          {description}
        </p>

        <table className="mb-6 w-full border-collapse text-left text-[14px] leading-[1.5] sm:text-[16px]">
          <caption className="sr-only">{title} starting prices</caption>
          <thead className="bg-[#2a2036] text-[#f7d2ff]">
            <tr>
              <th scope="col" className="border border-[#4a3d5c] px-3 py-[11px] font-bold sm:px-[14px]">{columnLabel}</th>
              <th scope="col" className="border border-[#4a3d5c] px-3 py-[11px] font-bold sm:px-[14px]">{valueColumnLabel}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ service, startingAt }) => (
              <tr key={service}>
                <td className="border border-[#4a3d5c] px-3 py-[11px] text-[#ede6f2] sm:px-[14px]">{service}</td>
                <td className="border border-[#4a3d5c] px-3 py-[11px] font-semibold text-white sm:px-[14px]">{startingAt}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {note && <p className="mb-[18px] text-[13px] text-[#b9a9c9]">{note}</p>}
        <div className="mt-1.5 mb-6">
          <h3 className="mb-2.5 text-[13px] font-semibold tracking-[2px] text-[#f7d2ff] uppercase">{siteSettings.pricingProcessTitle}</h3>
          <ol className="list-decimal pl-[18px] text-[15px] leading-[1.8] text-[#ede6f2]">
            {siteSettings.pricingProcessSteps.map((step, index) => <li key={`${index}-${step.label}`}>{step.label}</li>)}
          </ol>
        </div>
        <a href={siteSettings.consultationUrl} className="inline-block rounded-lg bg-[#f7d2ff] px-[30px] py-[14px] text-[16px] font-bold text-brand no-underline transition-colors duration-200 hover:bg-mint focus-visible:outline-2 focus-visible:outline-[#f7d2ff] focus-visible:outline-offset-4 motion-reduce:transition-none">
          {ctaLabel}
        </a>
      </div>
    </section>
  );
}

