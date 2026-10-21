"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { PortfolioItem } from "./portfolio-data";

type Filter = "all" | "interior" | "exterior";
const pageSize = 24;

export default function PortfolioGallery({ portfolioItems, labels }: { portfolioItems: PortfolioItem[]; labels: { all: string; interior: string; exterior: string; loadMore: string } }) {
  const filters: { label: string; value: Filter }[] = [
    { label: labels.all, value: "all" },
    { label: labels.interior, value: "interior" },
    { label: labels.exterior, value: "exterior" },
  ];
  const [filter, setFilter] = useState<Filter>("all");
  const [visibleCount, setVisibleCount] = useState(pageSize);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const isOpen = selectedIndex !== null;
  const closeButton = useRef<HTMLButtonElement>(null);
  const lastTrigger = useRef<HTMLButtonElement | null>(null);
  const filteredItems = filter === "all" ? portfolioItems : portfolioItems.filter((item) => item.category === filter);
  const visibleItems = filteredItems.slice(0, visibleCount);
  const selectedItem = selectedIndex === null ? null : visibleItems[selectedIndex];

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setSelectedIndex(null);
      if (event.key === "ArrowRight") setSelectedIndex((index) => index === null ? null : (index + 1) % visibleItems.length);
      if (event.key === "ArrowLeft") setSelectedIndex((index) => index === null ? null : (index - 1 + visibleItems.length) % visibleItems.length);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      lastTrigger.current?.focus();
    };
  }, [isOpen, visibleItems.length]);

  return (
    <section aria-label="Selected projects" className="bg-cream px-5 pt-[60px] pb-[90px]">
      <div className="mx-auto max-w-[1300px]">
        <div aria-label="Filter projects" className="mb-10 flex flex-wrap justify-center gap-3">
          {filters.map(({ label, value }) => (
            <button
              key={value}
              type="button"
              aria-pressed={filter === value}
              onClick={() => { setFilter(value); setVisibleCount(pageSize); setSelectedIndex(null); }}
              className={`cursor-pointer rounded-[30px] border-2 border-brand px-7 py-2.5 text-[14px] font-semibold tracking-[.5px] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brand ${filter === value ? "bg-brand text-cream" : "bg-transparent text-brand hover:bg-brand hover:text-cream"}`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="columns-1 gap-4 min-[601px]:columns-2 min-[901px]:columns-3">
          {visibleItems.map((item, index) => (
            <div key={item.src} className="mb-4 break-inside-avoid overflow-hidden rounded-[20px]">
              <button
                type="button"
                aria-label={`View ${item.alt}`}
                onClick={(event) => { lastTrigger.current = event.currentTarget; setSelectedIndex(index); }}
                className="group/portfolio relative block w-full cursor-pointer overflow-hidden rounded-[20px] border-0 bg-transparent p-0 text-left focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-brand"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                  className="block h-auto w-full transition-transform duration-[400ms] group-hover/portfolio:scale-[1.04] group-focus-visible/portfolio:scale-[1.04] motion-reduce:transition-none"
                />
                <span aria-hidden="true" className="pointer-events-none absolute inset-0 flex items-center justify-center bg-brand/55 text-[14px] font-semibold tracking-[1px] text-cream uppercase opacity-0 transition-opacity duration-300 group-hover/portfolio:opacity-100 group-focus-visible/portfolio:opacity-100 motion-reduce:transition-none">
                  {item.category === "interior" ? labels.interior : labels.exterior}
                </span>
              </button>
            </div>
          ))}
        </div>

        {visibleCount < filteredItems.length && (
          <div className="mt-10 text-center">
            <button type="button" onClick={() => setVisibleCount((count) => count + pageSize)} className="cursor-pointer rounded-[30px] border-0 bg-brand px-12 py-3.5 text-[15px] font-semibold text-cream transition-colors hover:bg-mint hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brand">
              {labels.loadMore}
            </button>
          </div>
        )}
      </div>

      {selectedItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedItem.alt} image viewer`}
          onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedIndex(null); }}
          className="fixed inset-0 z-[100000] flex items-center justify-center bg-black/90 px-14 py-16"
        >
          <button ref={closeButton} type="button" aria-label="Close image viewer" onClick={() => setSelectedIndex(null)} className="absolute top-4 right-5 z-10 grid size-12 cursor-pointer place-items-center border-0 bg-transparent text-[34px] leading-none text-white focus-visible:outline-2 focus-visible:outline-white">×</button>
          <button type="button" aria-label="Previous image" onClick={() => setSelectedIndex((index) => index === null ? null : (index - 1 + visibleItems.length) % visibleItems.length)} className="absolute top-1/2 left-1 z-10 -translate-y-1/2 cursor-pointer border-0 bg-transparent p-3 text-[42px] leading-none text-white focus-visible:outline-2 focus-visible:outline-white sm:left-5">‹</button>
          <div className="relative h-full w-full max-w-[1200px]">
            <Image src={selectedItem.src} alt={selectedItem.alt} fill sizes="90vw" className="rounded-md object-contain" />
          </div>
          <button type="button" aria-label="Next image" onClick={() => setSelectedIndex((index) => index === null ? null : (index + 1) % visibleItems.length)} className="absolute top-1/2 right-1 z-10 -translate-y-1/2 cursor-pointer border-0 bg-transparent p-3 text-[42px] leading-none text-white focus-visible:outline-2 focus-visible:outline-white sm:right-5">›</button>
        </div>
      )}
    </section>
  );
}
