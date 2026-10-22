import { cacheLife, cacheTag } from "next/cache";
import { getPayload } from "payload";
import config from "@payload-config";
import type { Metadata } from "next";

export type SectionValues = Record<string, Record<string, unknown>>;

export async function getPageSections(path: string): Promise<SectionValues> {
  "use cache";
  cacheLife("minutes");
  cacheTag(`page:${path}`);

  const payload = await getPayload({ config });
  const result = await payload.find({ collection: "pages", where: { path: { equals: path } }, limit: 1 });
  const sections = result.docs[0]?.sections;
  return sections && typeof sections === "object" && !Array.isArray(sections)
    ? sections as SectionValues
    : {};
}

export async function getPageMetadata(path: string, fallback: Metadata): Promise<Metadata> {
  "use cache";
  cacheLife("minutes");
  cacheTag(`page:${path}`);
  const payload = await getPayload({ config });
  const result = await payload.find({ collection: "pages", where: { path: { equals: path } }, limit: 1 });
  const page = result.docs[0];
  return {
    ...fallback,
    title: page?.seoTitle || fallback.title,
    description: page?.seoDescription || fallback.description,
  };
}

export async function getSiteSettings() {
  "use cache";
  cacheLife("minutes");
  cacheTag("site-settings");
  const payload = await getPayload({ config });
  return payload.findGlobal({ slug: "site-settings" });
}

export type BlogPost = {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  image?: string;
  href: string;
  publishedAt: string;
  category: string;
  blocks: Array<{ type: "heading" | "paragraph" | "emphasis"; text: string }>;
  body?: unknown;
};

function uploadUrl(upload: unknown, fallback?: string | null) {
  if (upload && typeof upload === "object" && "url" in upload && typeof upload.url === "string") return upload.url;
  return fallback || undefined;
}

function postDate(value: string | null | undefined) {
  if (!value) return "";
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(value));
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  "use cache";
  cacheLife("minutes");
  cacheTag("posts");
  const payload = await getPayload({ config });
  const result = await payload.find({ collection: "posts", sort: "-publishedAt", limit: 100, depth: 1 });
  return result.docs.map((post) => ({
    id: post.id,
    title: post.title,
    date: postDate(post.publishedAt),
    excerpt: post.excerpt || "",
    image: uploadUrl(post.featuredImage, post.featuredImageUrl),
    href: `/blog/${post.slug}/`,
    publishedAt: post.publishedAt || "",
    category: post.category || "Non classé",
    blocks: Array.isArray(post.blocks) ? post.blocks as BlogPost["blocks"] : [],
    body: post.body,
  }));
}

export type ApprovedComment = { id: number; author: string; message: string; createdAt: string };

export async function getApprovedComments(postId: number): Promise<ApprovedComment[]> {
  "use cache";
  cacheLife("minutes");
  cacheTag(`comments:${postId}`);
  const payload = await getPayload({ config });
  const result = await payload.find({
    collection: "comments",
    where: { and: [{ post: { equals: postId } }, { status: { equals: "approved" } }] },
    sort: "createdAt",
    limit: 100,
    depth: 0,
    overrideAccess: true,
  });
  return result.docs.map(({ id, author, message, createdAt }) => ({ id, author, message, createdAt }));
}

export type CmsProject = {
  title: string;
  category: "exterior" | "interior" | "web";
  summary: string;
  src: string;
  videoUrl?: string;
  alt: string;
  width: number;
  height: number;
  website?: string;
  services: string[];
};

export async function getProjects(): Promise<CmsProject[]> {
  "use cache";
  cacheLife("minutes");
  cacheTag("projects");
  const payload = await getPayload({ config });
  const result = await payload.find({ collection: "projects", sort: "sortOrder", limit: 200, depth: 1 });
  return result.docs.map((project) => ({
    title: project.title,
    category: project.category as CmsProject["category"],
    summary: project.summary || "",
    src: uploadUrl(project.image, project.imageUrl) || "",
    videoUrl: uploadUrl(project.video),
    alt: project.imageAlt || project.title,
    width: project.imageWidth || 1024,
    height: project.imageHeight || 576,
    website: project.website || undefined,
    services: project.services?.map((item) => item.label) || [],
  }));
}
