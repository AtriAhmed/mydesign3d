import type { Metadata } from "next";
import Image from "next/image";
import SiteHeader from "../components/site-header";
import InnerPageFooter from "../components/inner-page-footer";
import FloatingCta from "../components/floating-cta";
import { getBlogPosts, getPageSections, getPageMetadata } from "@/lib/cms";
import listingDefaults from "@/content/listing-sections.json";

const defaultMetadata: Metadata = {
  title: "Blog | MyDesign3D",
  description: "Have a project in mind? We'd love to hear from you.",
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("/blog", defaultMetadata);
}



export default async function BlogPage() {
  const posts = await getBlogPosts();
  const sections = await getPageSections("/blog");
  const intro = { ...listingDefaults.blog.intro, ...sections.intro };
  return (
    <div className="bg-cream">
      <SiteHeader />
      <main id="main-content" className="flow-root bg-cream">
        <header className="mx-auto mt-[calc(7vh-20px)] mb-[7vh] max-w-[845px] px-5 text-center md:mt-5 md:mb-10 min-[64.0625rem]:mt-[calc(7vh-20px)] min-[64.0625rem]:mb-[7vh]">
          <h1 className="m-0 text-[16px] font-medium leading-[1.1] tracking-[2px] text-brand motion-safe:animate-about-fade-in">{intro.title as string}</h1>
          <p className="mx-auto mt-2.5 mb-0 max-w-[790px] text-[16px] font-medium leading-[1.7] text-[#383838] motion-safe:animate-about-fade-in">{intro.description as string}</p>
        </header>
        <section aria-label="Blog articles" className="px-5 pb-[14vh] min-[64.0625rem]:px-[30px]">
          <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-x-[30px] gap-y-[35px] md:grid-cols-2 min-[64.0625rem]:grid-cols-3">
            {posts.map((post) => (
              <article key={post.href} className="min-w-0">
                {post.image && <a href={post.href} aria-label={post.title} className="group/blog-image relative mb-5 block aspect-[2/1] overflow-hidden md:aspect-[100/66]">
                  <Image src={post.image} alt="" fill sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1024px) 48vw, 410px" className="object-cover transition-transform duration-500 group-hover/blog-image:scale-105 motion-reduce:transition-none" />
                </a>}
                <div>
                  <h2 className="mb-2.5 text-[26px] font-semibold leading-[1.3] text-brand md:text-[28px]"><a href={post.href} className="text-inherit no-underline transition-colors hover:text-brand/70 focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-3">{post.title}</a></h2>
                  <p className="mb-2.5 text-[12px] leading-[1.5] text-[#777]">{post.date}<span aria-hidden="true" className="mx-2.5">·</span>No Comments</p>
                  <p className="mb-4 text-[14px] leading-[1.7] text-[#383838]">{post.excerpt}</p>
                  <a href={post.href} aria-label={`Read more about ${post.title}`} className="group/blog-more inline-flex items-center gap-1 text-[13px] font-bold text-brand no-underline focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-3"><span className="relative after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:origin-right after:scale-x-0 after:bg-current after:transition-transform after:duration-500 group-hover/blog-more:after:origin-left group-hover/blog-more:after:scale-x-100">Read More</span><span aria-hidden="true">»</span></a>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <InnerPageFooter />
      <FloatingCta />
    </div>
  );
}
