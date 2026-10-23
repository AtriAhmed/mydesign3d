"use client";

import { useSiteSettings } from "./site-settings-provider";

export default function FloatingCta({ href }: { href?: string } = {}) {
  const { floatingLabel, consultationUrl } = useSiteSettings();
  return (
    <a
      href={href || consultationUrl}
      className="floating-cta group/floating fixed top-1/2 right-[31px] z-[9999] inline-flex translate-x-1/2 -translate-y-1/2 -rotate-90 items-center gap-3.5 rounded-[50px] border-none bg-brand py-4 pr-4 pl-8 font-sans text-[11px] font-bold leading-[22.4px] tracking-[2px] whitespace-nowrap text-cream uppercase no-underline shadow-[0_4px_24px_rgb(53_42_68_/_20%)] transition-[background-color,color] duration-300 ease-[ease] hover:bg-mint hover:text-brand focus-visible:bg-mint focus-visible:text-brand focus-visible:outline-3 focus-visible:outline-solid focus-visible:outline-brand focus-visible:outline-offset-3 motion-reduce:transition-none"
    >
      <span>{floatingLabel}</span>
      <span className="grid size-[30px] shrink-0 place-items-center rounded-[50%] bg-mint text-brand transition-[background-color,color] duration-300 ease-[ease] group-hover/floating:bg-brand group-hover/floating:text-mint group-focus-visible/floating:bg-brand group-focus-visible/floating:text-mint motion-reduce:transition-none" aria-hidden="true">
        {/* Center the glyph's visible outline rather than its font line box. */}
        <span className="block -translate-y-[2.62px] text-[20px] leading-none tracking-normal">›</span>
      </span>
    </a>
  );
}
