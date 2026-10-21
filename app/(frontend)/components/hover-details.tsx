"use client";

import { useRef, type ComponentProps } from "react";

export default function HoverDetails({ children, ...props }: ComponentProps<"details">) {
  const lastPointerType = useRef<string | null>(null);

  return (
    <details
      {...props}
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse" && window.matchMedia("(hover: hover)").matches) {
          event.currentTarget.open = true;
        }
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse" && window.matchMedia("(hover: hover)").matches) {
          event.currentTarget.open = false;
        }
      }}
      onPointerDownCapture={(event) => { lastPointerType.current = event.pointerType; }}
      onClickCapture={(event) => {
        const summary = (event.target as Element).closest("summary");
        if (summary === event.currentTarget.firstElementChild && event.detail > 0 && lastPointerType.current === "mouse" && window.matchMedia("(hover: hover)").matches) {
          event.preventDefault();
        }
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) event.currentTarget.open = false;
      }}
    >
      {children}
    </details>
  );
}
