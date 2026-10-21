"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay, Keyboard, Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperInstance } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/a11y";

const focusStyles = "focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-brand focus-visible:outline-offset-3";
const navigationStyles = "absolute z-2 top-[74px] border-0 bg-[#ffffffcc] p-1 text-[18px] leading-none text-brand opacity-0 cursor-pointer transition-opacity duration-200 ease-[ease] group-hover/clients:opacity-100 group-focus-within/clients:opacity-100 motion-reduce:transition-none";

export type ClientLogo = { file: string; name: string; width: number; height: number };

export default function ClientLogoCarousel({ clients }: { clients: ClientLogo[] }) {
  const [swiper, setSwiper] = useState<SwiperInstance | null>(null);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(motion.matches);
    update();
    motion.addEventListener("change", update);
    return () => motion.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!swiper || swiper.destroyed) return;
    if (paused || reducedMotion) {
      swiper.autoplay.stop();
      return;
    }
    if (!swiper.autoplay.running) swiper.autoplay.start();
  }, [swiper, paused, reducedMotion]);

  return (
    <div className="home-clients-carousel group/clients relative" role="region" aria-roledescription="carousel" aria-label="Client logos">
      <button className={`home-clients-pause absolute z-1 -top-[30px] left-0 size-px overflow-hidden p-0 [clip-path:inset(50%)] whitespace-nowrap focus-visible:h-auto focus-visible:w-auto focus-visible:[clip-path:none] focus-visible:px-3 focus-visible:py-1.5 focus-visible:border-0 focus-visible:rounded-[20px] focus-visible:bg-brand focus-visible:text-white ${focusStyles}`} onClick={() => setPaused((value) => !value)}>{paused ? "Play logo carousel" : "Pause logo carousel"}</button>
      <Swiper
        className="home-clients-swiper pb-[46px]! [&_.swiper-wrapper]:h-[150px]! [&_.swiper-wrapper]:items-center md:[&_.swiper-wrapper]:h-[170px]! motion-reduce:[&_.swiper-wrapper]:transition-none! [&_.swiper-pagination]:flex! [&_.swiper-pagination]:justify-center [&_.swiper-pagination]:flex-wrap [&_.swiper-pagination]:gap-0 [&_.swiper-pagination]:bottom-2! [&_.swiper-pagination-bullet-active_span]:bg-black!"
        modules={[A11y, Autoplay, Keyboard, Navigation, Pagination]}
        onSwiper={setSwiper}
        slidesPerView={2}
        breakpoints={{ 768: { slidesPerView: 3 }, 1025: { slidesPerView: 6 } }}
        spaceBetween={20}
        speed={reducedMotion ? 0 : 500}
        loop
        autoplay={{ delay: 5000, pauseOnMouseEnter: true, disableOnInteraction: false }}
        keyboard={{ enabled: true, onlyInViewport: true }}
        navigation={{ prevEl: ".home-clients-prev", nextEl: ".home-clients-next", addIcons: false }}
        pagination={{
          clickable: true,
          renderBullet: (index, className) => `<button type="button" class="${className} grid! place-items-center w-[18px]! h-6! m-0! p-0 border-0 rounded-none! bg-transparent! opacity-100! cursor-pointer focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-brand focus-visible:outline-offset-3" aria-label="Go to logo ${index + 1}"><span class="size-1.5 rounded-[50%] bg-[#ccc]"></span></button>`,
        }}
        a11y={{ prevSlideMessage: "Previous client logo", nextSlideMessage: "Next client logo", paginationBulletMessage: "Go to logo {{index}}" }}
        >
        {clients.map((client) => (
          <SwiperSlide className="home-clients-slide min-w-0 h-auto!" key={client.file}>
            <Image className="block h-auto max-h-[150px] w-full object-contain md:max-h-[170px]" src={client.file.startsWith("/") || client.file.startsWith("https://") ? client.file : `/images/client-${client.file}`} alt={client.name} width={client.width} height={client.height} sizes="(max-width: 767px) 45vw, (max-width: 1024px) 30vw, 200px" />
          </SwiperSlide>
        ))}
        <button slot="container-end" className={`home-clients-prev left-0 ${navigationStyles} ${focusStyles}`} aria-label="Previous client logo">‹</button>
        <button slot="container-end" className={`home-clients-next right-0 ${navigationStyles} ${focusStyles}`} aria-label="Next client logo">›</button>
      </Swiper>
    </div>
  );
}
