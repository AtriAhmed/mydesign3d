import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import BrandArrow from "../../components/brand-arrow";
import ArticleComments, { type ArticleCommentsContent } from "../../components/article-comments";
import ArticleBookIcon from "../../components/article-book-icon";
import RelatedArticleTitle from "../../components/related-article-title";
import FloatingCta from "../../components/floating-cta";
import SiteFooter from "../../components/site-footer";
import SiteHeader from "../../components/site-header";
import { posts } from "../posts";
import staticArticle from "../static-article.json";
import { getApprovedComments, getBlogPosts, getPageSections, getSiteSettings } from "@/lib/cms";
import articleDefaults from "@/content/article-sections.json";
import { RichText } from "@payloadcms/richtext-lexical/react";

type ArticleBlock = { type: "heading" | "paragraph" | "emphasis"; text: string };

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.href.split("/")[2] }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = (await getBlogPosts()).find((item) => item.href === `/blog/${slug}/`);
  if (!post) return {};
  return {
    title: `${post.title} | MyDesign3D`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      images: post.image ? [post.image] : [],
    },
  };
}

function ShareIcon({ name }: { name: "x" | "whatsapp" | "facebook" | "mail" }) {
  if (name === "mail") {
    return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></svg>;
  }
  if (name === "facebook") {
    return <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M14.2 21v-8.2H17l.42-3.2H14.2V7.55c0-.93.26-1.56 1.61-1.56h1.72V3.13A22.5 22.5 0 0 0 15.02 3c-2.5 0-4.22 1.53-4.22 4.35V9.6H8v3.2h2.8V21h3.4Z" /></svg>;
  }
  if (name === "whatsapp") {
    return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20.4 11.5a8.4 8.4 0 0 1-12.5 7.3L3.5 20l1.2-4.3A8.4 8.4 0 1 1 20.4 11.5Z" /><path d="M8.1 8.3c.2-.3.4-.3.6-.3h.5c.2 0 .4.1.5.4l.8 1.9c.1.2 0 .4-.1.6l-.6.7c.6 1.1 1.6 2 2.8 2.6l.7-.7c.2-.2.4-.2.6-.1l1.8.9c.3.1.4.3.3.5-.1.8-.7 1.4-1.6 1.6-2.3.2-6.4-3.4-6.7-5.9-.1-.8.1-1.6.4-2.2Z" /></svg>;
  }
  return <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.9 3H21l-6.7 7.7L22 21h-6.1l-4.8-6.4L5.6 21H3.5l7.2-8.3L3 3h6.2l4.4 5.8L18.9 3Zm-2.2 16.2h1.2L8.5 4.7H7.2l9.5 14.5Z" /></svg>;
}

export default function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <div className="bg-cream">
      <SiteHeader />
      <Suspense fallback={<main id="main-content" className="flow-root min-h-screen bg-cream" aria-busy="true"><div className="mx-auto mt-[calc(7vh-20px)] max-w-[900px] px-5 text-center text-brand md:px-10">Loading article…</div></main>}>
        <ArticleContent params={params} />
      </Suspense>
      <SiteFooter />
      <FloatingCta />
    </div>
  );
}

async function ArticleContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const allPosts = await getBlogPosts();
  const articleSections = await getPageSections("/blog/article");
  const siteSettings = await getSiteSettings();
  const articleContact = { ...articleDefaults.contact, ...articleSections.contact };
  const articleRelated = { ...articleDefaults.related, ...articleSections.related };
  const articleComments = { ...articleDefaults.comments, ...articleSections.comments } as ArticleCommentsContent;
  const currentPost = allPosts.find((post) => post.href === `/blog/${slug}/`);
  if (!currentPost) notFound();
  const approvedComments = await getApprovedComments(currentPost.id);

  const article = {
    title: currentPost.title,
    publishedAt: currentPost.publishedAt || staticArticle.publishedAt,
    category: currentPost.category,
    featuredImage: currentPost.image || staticArticle.featuredImage,
    blocks: currentPost.blocks,
  };
  const canonicalUrl = `https://www.mydesign3d.com/blog/${slug}/`;
  const shareUrl = encodeURIComponent(canonicalUrl);
  const shareTitle = encodeURIComponent(article.title);
  const related = allPosts.filter((post) => post.href !== currentPost.href).slice(0, 3);
  const shareLinks = [
    { name: "x" as const, label: "Share on X", href: `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}` },
    { name: "whatsapp" as const, label: "Share on WhatsApp", href: `https://wa.me/?text=${shareTitle}%20${shareUrl}` },
    { name: "facebook" as const, label: "Share on Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}` },
    { name: "mail" as const, label: "Share by email", href: `mailto:?subject=${shareTitle}&body=${shareUrl}` },
  ];

  return (
      <main id="main-content" className="flow-root bg-cream">
        <article>
          <header className="relative mx-auto mt-[calc(7vh-20px)] mb-[7vh] max-w-[900px] px-5 text-center md:px-10">
            <time dateTime={article.publishedAt} className="block text-[10px] font-medium leading-[1.5] tracking-[3px] text-brand uppercase">{currentPost.date}</time>
            <h1 className="mx-auto mt-4 mb-4 max-w-[820px] text-[clamp(36px,4.5vw,60px)] font-normal leading-[1.1] tracking-[-1px] text-[#070807e5]">{article.title}</h1>
            <p className="m-0 text-[10px] font-medium leading-[1.5] tracking-[3px] text-brand uppercase">{article.category}</p>
            <nav aria-label="Share article" className="mt-5 mb-7 flex justify-center gap-2.5">
              {shareLinks.map((link) => <a key={link.name} href={link.href} aria-label={link.label} target={link.name === "mail" ? undefined : "_blank"} rel={link.name === "mail" ? undefined : "noopener noreferrer"} className="grid size-9 place-items-center rounded-full bg-brand text-cream transition-[background-color,color,transform] duration-300 hover:scale-110 hover:bg-mint hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"><span className="size-4"><ShareIcon name={link.name} /></span></a>)}
            </nav>
            <div className="relative h-[300px] overflow-hidden rounded-t-[999px] md:h-[410px]">
              <Image src={article.featuredImage} alt={article.title} fill sizes="(max-width: 900px) calc(100vw - 80px), 820px" priority className="object-cover object-center" />
              <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-[35%] bg-linear-to-t from-cream to-transparent" />
            </div>
          </header>

          <div className="mx-auto max-w-[920px] px-5 pb-20 text-[16px] leading-[1.85] text-[#383838] md:pb-28 md:text-[18px]">
            {currentPost.body ? <RichText data={currentPost.body as Parameters<typeof RichText>[0]["data"]} className="[&_h2]:mt-11 [&_h2]:mb-4 [&_h2]:text-[clamp(1.75rem,3vw,2.5rem)] [&_h2]:font-semibold [&_h2]:text-brand [&_p]:mb-5" /> : (article.blocks as ArticleBlock[]).map((block, index) => {
              if (block.type === "heading") return <h2 key={index} className="mt-11 mb-4 text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-[1.25] tracking-[-0.025em] text-brand">{block.text}</h2>;
              if (block.type === "emphasis") return <p key={index} className="mt-6 font-semibold text-brand">{block.text}</p>;
              return <p key={index} className="mb-5">{block.text}</p>;
            })}
          </div>
        </article>

        <section aria-labelledby="article-contact-title" className="mx-auto mb-[9vh] w-[calc(100%-40px)] max-w-[880px]">
          <div className="flex min-h-[346px] flex-col items-center justify-center rounded-[30px] bg-mint px-6 py-8 text-center text-brand md:px-8">
            <Image src={siteSettings.symbolLogoUrl || "/images/service-icon.png"} alt="" width={56} height={56} className="mb-2 size-14 object-contain" />
            <p className="mx-auto mb-3 max-w-[760px] text-[16px] leading-[1.6] text-brand/80">{String(articleContact.description)}</p>
            <h2 id="article-contact-title" className="mx-auto mb-5 max-w-[700px] text-[clamp(24px,2.5vw,30px)] font-normal leading-[1.2]">{String(articleContact.title)}</h2>
            <a href={siteSettings.consultationUrl || "https://www.mydesign3d.com/book-a-free-consult/"} className="group/article-cta inline-flex min-h-[45px] items-center gap-4 rounded-full bg-brand py-2 pr-2 pl-6 text-[12px] font-bold leading-none tracking-[1.2px] text-cream uppercase no-underline transition-[background-color,color] duration-300 hover:bg-cream hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brand"><span className="relative after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:origin-right after:scale-x-0 after:bg-current after:transition-transform after:duration-500 group-hover/article-cta:after:origin-left group-hover/article-cta:after:scale-x-100">{String(articleContact.button)}</span><span className="grid size-[31px] place-items-center rounded-full bg-mint text-brand transition-transform duration-300 group-hover/article-cta:scale-120"><BrandArrow /></span></a>
          </div>
        </section>

        <ArticleComments content={articleComments} postId={currentPost.id} comments={approvedComments} />

        <section aria-labelledby="related-articles-title" className="mx-auto max-w-[900px] px-5 pb-[14vh] md:px-10">
          <div>
            <h2 id="related-articles-title" className="mb-3 text-center text-[36.15px] font-bold leading-[1.2] tracking-[-0.03em] text-brand">{String(articleRelated.title)}</h2>
            <p className="mb-10 text-center text-[20px] font-medium leading-[1.6] text-[#383838]">{String(articleRelated.subtitle)}</p>
            <div className="grid gap-[30px] md:grid-cols-3">
              {related.map((post) => <Link key={post.href} href={post.href} className="group/related block min-w-0 text-center text-brand no-underline">
                <div className="relative aspect-square overflow-hidden rounded-[24px] bg-cream">
                  {post.image && <Image src={post.image} alt="" fill sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 900px) 33vw, 255px" className="object-cover transition-transform duration-500 group-hover/related:scale-105 motion-reduce:transition-none" />}
                  <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-[60%] bg-linear-to-b from-transparent via-cream/60 to-cream backdrop-blur-[8px] [mask-image:linear-gradient(to_bottom,transparent,black_60%)]" />
                  <span aria-hidden="true" className="absolute inset-x-0 bottom-[14%] mx-auto size-[42px] translate-y-3 text-brand opacity-0 transition-[opacity,transform] duration-300 group-hover/related:translate-y-0 group-hover/related:opacity-100 group-focus-visible/related:translate-y-0 group-focus-visible/related:opacity-100 [@media(hover:none)]:translate-y-0 [@media(hover:none)]:opacity-100"><ArticleBookIcon /></span>
                </div>
                <p className="mt-3 mb-1 px-[15px] text-[10px] font-medium leading-[1.5] tracking-[3px] text-brand/70 uppercase">{post.date}</p>
                <h3 className="mx-auto px-[15px] text-[17px] font-semibold leading-[1.3]"><RelatedArticleTitle title={post.title} /></h3>
              </Link>)}
            </div>
          </div>
        </section>
      </main>
  );
}
