"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

type Underline = { left: number; top: number; width: number };

export default function RelatedArticleTitle({ title }: { title: string }) {
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [lines, setLines] = useState<Underline[]>([]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const text = textRef.current;
    if (!wrapper || !text) return;

    let cancelled = false;
    const measure = () => {
      if (cancelled) return;
      const range = document.createRange();
      range.selectNodeContents(text);
      const bounds = wrapper.getBoundingClientRect();
      const next = Array.from(range.getClientRects())
        .filter((rect) => rect.width > 1 && rect.height > 0)
        .map((rect) => ({
          left: rect.left - bounds.left,
          top: rect.bottom - bounds.top + 1,
          width: rect.width,
        }));
      setLines((previous) =>
        previous.length === next.length && previous.every((line, index) =>
          Math.abs(line.left - next[index].left) < 0.5 &&
          Math.abs(line.top - next[index].top) < 0.5 &&
          Math.abs(line.width - next[index].width) < 0.5,
        ) ? previous : next,
      );
    };

    const frame = requestAnimationFrame(measure);
    const observer = new ResizeObserver(measure);
    observer.observe(wrapper);
    window.addEventListener("resize", measure);
    document.fonts.ready.then(measure);

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [title]);

  return (
    <span ref={wrapperRef} className="related-article-title">
      <span ref={textRef}>{title}</span>
      <span aria-hidden="true" className="pointer-events-none absolute inset-0">
        {lines.map((line, index) => (
          <span
            key={index}
            className="related-article-title-line"
            style={{
              left: line.left,
              top: line.top,
              width: line.width,
              "--line-delay": `${index * 0.1}s`,
            } as CSSProperties}
          />
        ))}
      </span>
    </span>
  );
}
