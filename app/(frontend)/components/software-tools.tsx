"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

export type SoftwareTool = { name: string; src: string; width: number; height: number };

const defaultTools: SoftwareTool[] = [
  { name: "D5 Render", src: "/images/visualization-tools/D5-Render-logo-300x58.png", width: 300, height: 58 },
  { name: "Lumion", src: "/images/visualization-tools/lumion-300x80.png", width: 300, height: 80 },
  { name: "Chaos V-Ray", src: "/images/visualization-tools/Chaos-V-Ray-300x194.png", width: 300, height: 194 },
  { name: "Autodesk Revit", src: "/images/visualization-tools/revit-300x169.png", width: 300, height: 169 },
  { name: "AutoCAD", src: "/images/visualization-tools/autocad-300x300.png", width: 300, height: 300 },
  { name: "Autodesk 3ds Max", src: "/images/visualization-tools/3dsmax-300x185.png", width: 300, height: 185 },
  { name: "Twinmotion", src: "/images/visualization-tools/twinmotion-1-300x54.png", width: 300, height: 54 },
  { name: "Chaos Vantage", src: "/images/visualization-tools/chaos-vintage-300x225.png", width: 300, height: 225 },
  { name: "Graphisoft Archicad", src: "/images/visualization-tools/archicad-300x149.png", width: 300, height: 149 },
];

export default function SoftwareTools({ tools = defaultTools }: { tools?: readonly SoftwareTool[] }) {
  const reduceMotion = useReducedMotion();

  return (
    <section aria-label="Software we use" className="mb-[14vh] bg-[#efefef] px-[30px] py-[30px]">
      <ul className={`mx-auto grid max-w-[1280px] items-center gap-5 ${tools.length === 1 ? "grid-cols-1 justify-items-center" : `grid-cols-2 sm:grid-cols-3 ${tools.length === 5 ? "lg:grid-cols-5" : tools.length === 7 ? "lg:grid-cols-7" : tools.length === 8 ? "lg:grid-cols-8" : "lg:grid-cols-9"}`}`}>
        {tools.map((tool, index) => (
          <motion.li
            key={tool.name}
            className={`flex items-center justify-center ${tools.length === 1 ? "w-full max-w-[300px]" : ""}`}
            initial={reduceMotion ? false : { opacity: 0, y: 65 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.65, delay: reduceMotion ? 0 : index * 0.06, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={tool.src}
              alt={tool.name}
              width={tool.width}
              height={tool.height}
              sizes={tools.length === 1 ? "300px" : "(min-width: 1024px) 125px, (min-width: 640px) 30vw, 45vw"}
              className="h-auto w-full object-contain"
            />
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
