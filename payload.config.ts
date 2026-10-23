import path from "node:path";
import { fileURLToPath } from "node:url";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig, type CollectionConfig, type GlobalConfig } from "payload";
import { revalidateTag } from "next/cache.js";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const isEditor = ({ req }: { req: { user?: unknown } }) => Boolean(req.user);

const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: { useAsTitle: "email", group: "Administration" },
  access: {
    read: isEditor,
    create: async ({ req }) => {
      if (req.user) return true;
      const { totalDocs } = await req.payload.count({ collection: "users", overrideAccess: true });
      return totalDocs === 0;
    },
    update: isEditor,
    delete: isEditor,
  },
  fields: [{ name: "name", type: "text", required: true }],
};

const Media: CollectionConfig = {
  slug: "media",
  admin: { useAsTitle: "alt", group: "Content" },
  access: { read: () => true, create: isEditor, update: isEditor, delete: isEditor },
  upload: { staticDir: path.resolve(dirname, "media"), mimeTypes: ["image/*"] },
  fields: [{ name: "alt", type: "text", required: true }],
};

const ProjectVideos: CollectionConfig = {
  slug: "project-videos",
  admin: { useAsTitle: "title", group: "Content", defaultColumns: ["title", "filename", "updatedAt"] },
  access: { read: () => true, create: isEditor, update: isEditor, delete: isEditor },
  upload: { staticDir: path.resolve(dirname, "media", "project-videos"), mimeTypes: ["video/mp4", "video/webm"] },
  fields: [{ name: "title", type: "text", required: true }],
};

const Pages: CollectionConfig = {
  slug: "pages",
  admin: { useAsTitle: "title", group: "Website", defaultColumns: ["title", "path", "updatedAt"] },
  access: { read: () => true, create: isEditor, update: isEditor, delete: isEditor },
  hooks: {
    afterChange: [({ doc }) => { if (process.env.NEXT_RUNTIME) revalidateTag(`page:${doc.path}`, "max"); return doc; }],
    afterDelete: [({ doc }) => { if (process.env.NEXT_RUNTIME) revalidateTag(`page:${doc.path}`, "max"); return doc; }],
  },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "path", type: "text", required: true, unique: true, admin: { description: "Public URL path, such as /about or /." } },
    { name: "description", type: "textarea" },
    { name: "seoTitle", type: "text", admin: { description: "Browser tab and search result title. Leave blank to use the page title." } },
    { name: "seoDescription", type: "textarea", admin: { description: "Search result description. Leave blank to use the page description." } },
    { name: "sections", type: "json", admin: { description: "Edit each section using the labeled fields below.", components: { Field: "./app/(payload)/components/structured-json-field#StructuredJsonField" } } },
  ],
};

const Posts: CollectionConfig = {
  slug: "posts",
  admin: { useAsTitle: "title", group: "Content", defaultColumns: ["title", "slug", "publishedAt"] },
  access: { read: () => true, create: isEditor, update: isEditor, delete: isEditor },
  hooks: {
    afterChange: [({ doc }) => { if (process.env.NEXT_RUNTIME) revalidateTag("posts", "max"); return doc; }],
    afterDelete: [({ doc }) => { if (process.env.NEXT_RUNTIME) revalidateTag("posts", "max"); return doc; }],
  },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "slug", type: "text", required: true, unique: true },
    { name: "excerpt", type: "textarea" },
    { name: "publishedAt", type: "date" },
    { name: "featuredImage", type: "upload", relationTo: "media" },
    { name: "featuredImageUrl", type: "text", admin: { description: "Existing image path, until you upload a replacement." } },
    { name: "category", type: "text", defaultValue: "Non classé" },
    { name: "blocks", type: "json", admin: { description: "Article paragraphs and headings in display order.", components: { Field: "./app/(payload)/components/structured-json-field#StructuredJsonField" } } },
    { name: "body", type: "richText" },
  ],
};

const Comments: CollectionConfig = {
  slug: "comments",
  admin: { useAsTitle: "author", group: "Content", defaultColumns: ["author", "post", "status", "createdAt"] },
  access: { read: isEditor, create: isEditor, update: isEditor, delete: isEditor },
  hooks: {
    afterChange: [({ doc, previousDoc }) => {
      if (process.env.NEXT_RUNTIME) {
        const postId = typeof doc.post === "object" ? doc.post?.id : doc.post;
        const previousPostId = typeof previousDoc?.post === "object" ? previousDoc.post?.id : previousDoc?.post;
        if (postId) revalidateTag(`comments:${postId}`, "max");
        if (previousPostId && previousPostId !== postId) revalidateTag(`comments:${previousPostId}`, "max");
      }
      return doc;
    }],
    afterDelete: [({ doc }) => {
      const postId = typeof doc.post === "object" ? doc.post?.id : doc.post;
      if (process.env.NEXT_RUNTIME && postId) revalidateTag(`comments:${postId}`, "max");
      return doc;
    }],
  },
  fields: [
    { name: "post", type: "relationship", relationTo: "posts", required: true, index: true },
    { name: "status", type: "select", required: true, defaultValue: "pending", options: ["pending", "approved", "rejected"], index: true },
    { name: "author", type: "text", required: true, maxLength: 100 },
    { name: "email", type: "email", required: true, admin: { description: "Private; never shown on the website." } },
    { name: "website", type: "text" },
    { name: "message", type: "textarea", required: true, maxLength: 2000 },
  ],
};

const ConsultationRequests: CollectionConfig = {
  slug: "consultation-requests",
  labels: { singular: "Consultation Request", plural: "Consultation Requests" },
  admin: { useAsTitle: "email", group: "Content", defaultColumns: ["firstName", "lastName", "email", "service", "status", "createdAt"] },
  access: { read: isEditor, create: isEditor, update: isEditor, delete: isEditor },
  fields: [
    { name: "firstName", type: "text", required: true, maxLength: 100 },
    { name: "lastName", type: "text", required: true, maxLength: 100 },
    { name: "email", type: "email", required: true },
    { name: "phone", type: "text", required: true, maxLength: 40 },
    { name: "service", type: "text", required: true, maxLength: 100 },
    { name: "message", type: "textarea", maxLength: 3000 },
    { name: "status", type: "select", required: true, defaultValue: "new", options: ["new", "contacted", "closed"], index: true },
  ],
};

const Projects: CollectionConfig = {
  slug: "projects",
  admin: { useAsTitle: "title", group: "Content", defaultColumns: ["title", "category", "updatedAt"] },
  access: { read: () => true, create: isEditor, update: isEditor, delete: isEditor },
  hooks: {
    afterChange: [({ doc }) => { if (process.env.NEXT_RUNTIME) revalidateTag("projects", "max"); return doc; }],
    afterDelete: [({ doc }) => { if (process.env.NEXT_RUNTIME) revalidateTag("projects", "max"); return doc; }],
  },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "category", type: "select", required: true, options: ["exterior", "interior", "web"] },
    { name: "summary", type: "textarea" },
    { name: "services", type: "array", fields: [{ name: "label", type: "text", required: true }] },
    { name: "image", type: "upload", relationTo: "media" },
    { name: "imageUrl", type: "text", admin: { description: "Existing image path, or an optional poster for a video project." } },
    { name: "imageAlt", type: "text" },
    { name: "imageWidth", type: "number" },
    { name: "imageHeight", type: "number" },
    { name: "video", type: "upload", relationTo: "project-videos", admin: { description: "Optional MP4 or WebM. When set, the portfolio displays this video instead of the image; the image becomes its poster." } },
    { name: "website", type: "text" },
    { name: "sortOrder", type: "number", defaultValue: 0 },
  ],
};

const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  admin: { group: "Website" },
  access: { read: () => true, update: isEditor },
  hooks: { afterChange: [({ doc }) => { if (process.env.NEXT_RUNTIME) revalidateTag("site-settings", "max"); return doc; }] },
  fields: [
    { name: "siteName", type: "text", defaultValue: "MyDesign3D" },
    { name: "consultationLabel", type: "text", defaultValue: "Consultation" },
    { name: "floatingLabel", type: "text", defaultValue: "Book a Free Consultation" },
    { name: "consultationUrl", type: "text", defaultValue: "/book-a-free-consult/" },
    { name: "headerLogoUrl", type: "text", defaultValue: "/images/logo.png" },
    { name: "symbolLogoUrl", type: "text", defaultValue: "/images/service-icon.png" },
    { name: "email", label: "Contact email address", type: "email", defaultValue: "hello@mydesign3d.com", admin: { description: "Shown in contact links and used as the recipient for service inquiries." } },
    { name: "phone", label: "Contact phone number", type: "text", defaultValue: "+1 448 3333 996", admin: { description: "Shown in the inner-page footer and contact sections." } },
    { name: "homePhone", label: "Home footer phone number", type: "text", defaultValue: "+1 (669) 333-3661", admin: { description: "Shown in the homepage footer." } },
    { name: "address", type: "text", defaultValue: "ST 62959, Sheridan- WY 82801" },
    { name: "footerDescription", type: "textarea", defaultValue: "Architectural Design . Web Services" },
    { name: "footerContactHeading", type: "text", defaultValue: "Get in touch" },
    { name: "footerLinksHeading", type: "text", defaultValue: "Quick links" },
    { name: "allServicesLabel", type: "text", defaultValue: "All services" },
    { name: "termsLabel", type: "text", defaultValue: "Terms" },
    { name: "privacyLabel", type: "text", defaultValue: "Privacy" },
    { name: "homeFooterIntro", type: "textarea", defaultValue: "A multidisciplinary group of architects, designers, and developers — delivering integrated solutions for businesses that want to build, grow, and scale.\nBased in Wyoming, USA. Operating globally." },
    { name: "navigation", type: "json", admin: { description: "Menu items as label, href, and optional children arrays. The same links appear in the footer.", components: { Field: "./app/(payload)/components/structured-json-field#StructuredJsonField" } } },
    { name: "homeFooterButton", type: "text", defaultValue: "Book a Consultation" },
    { name: "innerFooterButton", type: "text", defaultValue: "Book a free consult" },
    { name: "pricingProcessTitle", type: "text", defaultValue: "How we work" },
    { name: "serviceOfferHeading", type: "text", defaultValue: "What We Offer" },
    { name: "serviceDifferentHeading", type: "text", defaultValue: "Why we're different" },
    { name: "serviceProcessUrl", type: "text", defaultValue: "/about" },
    { name: "serviceFormLabels", label: "Service inquiry form wording", type: "json", defaultValue: {
      firstName: "Your name", lastName: "Last name", email: "Email", phone: "Phone number", message: "Message",
      firstNamePlaceholder: "John", lastNamePlaceholder: "Smith", emailPlaceholder: "your@mail.com", phonePlaceholder: "+01 200 40 3032",
      messagePlaceholder: "Briefly share what you’d like to discuss (optional)...",
      successMessage: "Your email app should open with the request ready to send.",
    }, admin: { description: "Text shown beside or inside the service inquiry form fields. Email and phone here are labels and examples, not contact details.", components: { Field: "./app/(payload)/components/structured-json-field#StructuredJsonField" } } },
    { name: "pricingProcessSteps", type: "array", defaultValue: [
      { label: "Free discovery call — we scope your need" },
      { label: "Tailored proposal — one team, every service" },
      { label: "Production by our team (design / development)" },
      { label: "End-to-end delivery & support" },
    ], fields: [{ name: "label", type: "text", required: true }] },
    { name: "facebookUrl", type: "text", defaultValue: "https://www.facebook.com/share/1DKXbqPYYx/" },
    { name: "instagramUrl", type: "text", defaultValue: "https://www.instagram.com/mydesign3d/" },
    { name: "xUrl", type: "text", defaultValue: "https://x.com/" },
    { name: "linkedinUrl", type: "text", defaultValue: "https://www.linkedin.com/company/107013829/" },
    { name: "copyrightText", type: "text", defaultValue: "2026 © MyDesign3d. All rights reserved" },
    { name: "termsUrl", type: "text", defaultValue: "https://www.mydesign3d.com/terms/" },
    { name: "privacyUrl", type: "text", defaultValue: "https://www.mydesign3d.com/privacy-policy/" },
  ],
};

export default buildConfig({
  admin: {
    user: Users.slug,
    theme: "all",
    meta: { titleSuffix: " · MyDesign3D" },
    components: {
      graphics: { Logo: "./app/(payload)/components/admin-logo#AdminLogo" },
      beforeDashboard: ["./app/(payload)/components/admin-welcome#AdminWelcome"],
    },
  },
  collections: [Users, Media, ProjectVideos, Pages, Posts, Comments, ConsultationRequests, Projects],
  globals: [SiteSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "development-only-secret-change-before-deploy",
  db: postgresAdapter({ pool: { connectionString: process.env.DATABASE_URL || "" } }),
  typescript: { outputFile: path.resolve(dirname, "payload-types.ts") },
});
