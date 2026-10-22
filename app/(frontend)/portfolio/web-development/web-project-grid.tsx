import Image from "next/image";

export type WebProject = {
  title: string;
  summary: string;
  image?: string;
  videoUrl?: string;
  imageAlt: string;
  services: string[];
  href?: string;
};

export default function WebProjectGrid({ projects }: { projects: WebProject[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <article
          key={project.title}
          className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-brand/15 bg-white shadow-[0_18px_45px_#352a4414] transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-[7px] hover:border-brand/50 hover:shadow-[0_22px_50px_#352a4426] focus-within:border-brand/50 focus-within:shadow-[0_22px_50px_#352a4426] motion-reduce:transform-none motion-reduce:transition-none"
        >
          <div className="relative h-[230px] overflow-hidden bg-[#f0eaf3]">
            {project.videoUrl ? (
              <video
                src={project.videoUrl}
                poster={project.image || undefined}
                aria-label={`${project.title} project video`}
                controls
                playsInline
                preload={project.image ? "none" : "metadata"}
                className="absolute inset-0 size-full object-cover"
              >Your browser does not support video playback.</video>
            ) : project.image ? (
              <Image
                src={project.image}
                alt={project.imageAlt}
                fill
                sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                className="object-cover transition-transform duration-300 group-hover:scale-[1.035] group-focus-within:scale-[1.035] motion-reduce:transition-none"
              />
            ) : null}
            {project.href && !project.videoUrl && (
              <span aria-hidden="true" className="absolute top-3.5 right-3.5 grid size-[38px] place-items-center rounded-full bg-mint text-brand shadow-[0_3px_12px_#352a4433] transition-transform duration-300 group-hover:rotate-45 group-focus-within:rotate-45 motion-reduce:transition-none">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="size-[21px]"><path d="M5 19 19 5M8 5h11v11" /></svg>
              </span>
            )}
          </div>
          <div className="flex flex-1 flex-col p-6">
            <h2 className="m-0 text-[27px] font-semibold leading-[1.2] tracking-[-.035em] text-brand">{project.title}</h2>
            <p className="mt-3 mb-5 line-clamp-3 min-h-[76px] text-[15px] leading-[1.7] text-[#5a4f63]">{project.summary}</p>
            <p className="mt-auto text-[13px] font-bold leading-[1.6] text-brand">{project.services.join(" · ")}</p>
            {project.href && project.videoUrl && <a href={project.href} target="_blank" rel="noopener noreferrer" className="mt-4 w-fit text-[13px] font-semibold text-brand underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-brand">Visit project <span aria-hidden="true">↗</span></a>}
          </div>
          {project.href && !project.videoUrl && (
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} project (opens in a new tab)`}
              className="absolute inset-0 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-brand"
            />
          )}
        </article>
      ))}
    </div>
  );
}
