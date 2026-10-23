import fs from "node:fs";
import path from "node:path";
import { getPayload } from "payload";
import config from "../payload.config.ts";
import { posts } from "../app/(frontend)/blog/posts.ts";
import { portfolioItems } from "../app/(frontend)/portfolio/portfolio-data.ts";

const payload = await getPayload({ config });

function addMissing(current, defaults) {
  if (!current || typeof current !== "object" || Array.isArray(current)) return defaults;
  return Object.fromEntries(Object.entries(defaults).map(([key, value]) => [key,
    key in current && value && typeof value === "object" && !Array.isArray(value)
      ? addMissing(current[key], value)
      : key in current ? current[key] : value,
  ]).concat(Object.entries(current).filter(([key]) => !(key in defaults))));
}
const root = path.resolve("app/(frontend)");
const servicePages = JSON.parse(fs.readFileSync("content/service-pages.json", "utf8"));
const article = JSON.parse(fs.readFileSync("app/(frontend)/blog/static-article.json", "utf8"));
const homeSections = JSON.parse(fs.readFileSync("content/home-sections.json", "utf8"));
const aboutSections = JSON.parse(fs.readFileSync("content/about-sections.json", "utf8"));
const teamSections = JSON.parse(fs.readFileSync("content/team-sections.json", "utf8"));
const pricingSections = JSON.parse(fs.readFileSync("content/pricing-sections.json", "utf8"));
const contactSections = JSON.parse(fs.readFileSync("content/contact-sections.json", "utf8"));
const consultationSections = JSON.parse(fs.readFileSync("content/consultation-sections.json", "utf8"));
const listingSections = JSON.parse(fs.readFileSync("content/listing-sections.json", "utf8"));
const navigation = JSON.parse(fs.readFileSync("content/navigation.json", "utf8"));
const fullScaleSections = JSON.parse(fs.readFileSync("content/full-scale-sections.json", "utf8"));
const articleSections = JSON.parse(fs.readFileSync("content/article-sections.json", "utf8"));
const webProjects = JSON.parse(fs.readFileSync("content/web-projects.json", "utf8"));
const seo = JSON.parse(fs.readFileSync("content/seo.json", "utf8"));

const settings = await payload.findGlobal({ slug: "site-settings" });
const globalDefaults = {
  consultationUrl: "/book-a-free-consult/",
  headerLogoUrl: "/images/logo.png",
  symbolLogoUrl: "/images/service-icon.png",
  footerContactHeading: "Get in touch",
  footerLinksHeading: "Quick links",
  allServicesLabel: "All services",
  termsLabel: "Terms",
  privacyLabel: "Privacy",
  pricingProcessTitle: "How we work",
  serviceOfferHeading: "What We Offer",
  serviceDifferentHeading: "Why we're different",
  serviceProcessUrl: "/about",
  serviceFormLabels: {
    firstName: "Your name", lastName: "Last name", email: "Email", phone: "Phone number", message: "Message",
    firstNamePlaceholder: "John", lastNamePlaceholder: "Smith", emailPlaceholder: "your@mail.com", phonePlaceholder: "+01 200 40 3032",
    messagePlaceholder: "Briefly share what you’d like to discuss (optional)...",
    successMessage: "Your email app should open with the request ready to send.",
  },
  pricingProcessSteps: [
    { label: "Free discovery call — we scope your need" },
    { label: "Tailored proposal — one team, every service" },
    { label: "Production by our team (design / development)" },
    { label: "End-to-end delivery & support" },
  ],
};
const globalUpdates = Object.fromEntries(Object.entries(globalDefaults).filter(([key]) => settings[key] == null));
if (!Array.isArray(settings.navigation) || !settings.navigation.length) globalUpdates.navigation = navigation;
if (Object.keys(globalUpdates).length) await payload.updateGlobal({ slug: "site-settings", data: globalUpdates });

for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
  if (!entry.isDirectory() || !fs.existsSync(path.join(root, entry.name, "page.tsx"))) continue;
  const route = `/${entry.name}`;
  const existing = await payload.find({ collection: "pages", where: { path: { equals: route } }, limit: 1 });
  if (existing.totalDocs) continue;
  const service = servicePages.find((item) => item.path === route);
  await payload.create({ collection: "pages", data: { title: service?.title ?? entry.name.replaceAll("-", " ").replace(/\b\w/g, (letter) => letter.toUpperCase()), path: route, sections: service?.sections ?? {} } });
}

// Refresh the original UI/UX images in pages seeded before the WordPress media was available.
// A custom image selected in Payload takes precedence over these defaults.
const uiUxRoute = "/ux-ui-design-brand-identity";
const uiUxPage = await payload.find({ collection: "pages", where: { path: { equals: uiUxRoute } }, limit: 1 });
if (uiUxPage.totalDocs) {
  const defaults = servicePages.find((item) => item.path === uiUxRoute).sections;
  const oldImages = {
    offer: "/images/ux-offer.png",
    different: "/images/expertise-web.jpg",
    contact: "/images/web-contact.png",
  };
  const oldAlts = {
    different: "Interface design concept with connected screens and visual elements",
    contact: "Team reviewing a digital interface together",
  };
  const sections = uiUxPage.docs[0].sections || {};
  const updatedSections = { ...sections };
  for (const key of ["hero", "process", "offer", "different", "contact"]) {
    const current = sections[key] || {};
    const imageIsDefault = !current.imageSrc || current.imageSrc === oldImages[key] || current.imageSrc === defaults[key].imageSrc;
    if (!imageIsDefault) continue;
    updatedSections[key] = {
      ...current,
      imageSrc: defaults[key].imageSrc,
      imageAlt: !current.imageAlt || current.imageAlt === oldAlts[key] ? defaults[key].imageAlt : current.imageAlt,
    };
  }
  if (JSON.stringify(updatedSections) !== JSON.stringify(sections)) {
    await payload.update({ collection: "pages", id: uiUxPage.docs[0].id, data: { sections: updatedSections } });
  }
}

const home = await payload.find({ collection: "pages", where: { path: { equals: "/" } }, limit: 1 });
if (!home.totalDocs) await payload.create({ collection: "pages", data: { title: "Home", path: "/", sections: homeSections } });
else {
  const merged = addMissing(home.docs[0].sections || {}, homeSections);
  if (JSON.stringify(merged) !== JSON.stringify(home.docs[0].sections)) await payload.update({ collection: "pages", id: home.docs[0].id, data: { sections: merged } });
}

const about = await payload.find({ collection: "pages", where: { path: { equals: "/about" } }, limit: 1 });
if (about.totalDocs) {
  const merged = addMissing(about.docs[0].sections || {}, aboutSections);
  if (JSON.stringify(merged) !== JSON.stringify(about.docs[0].sections)) await payload.update({ collection: "pages", id: about.docs[0].id, data: { sections: merged } });
}

for (const [route, defaults] of [["/our-team", teamSections], ["/pricing", pricingSections], ["/contact-us", contactSections], ["/book-a-free-consult", consultationSections], ["/blog", listingSections.blog], ["/blog/article", articleSections], ["/portfolio", listingSections.portfolio], ["/portfolio/web-development", listingSections.webPortfolio], ["/full-scale-project", fullScaleSections]]) {
  const found = await payload.find({ collection: "pages", where: { path: { equals: route } }, limit: 1 });
  if (!found.totalDocs) {
    await payload.create({ collection: "pages", data: { title: route === "/portfolio/web-development" ? "Web Development Portfolio" : route.slice(1), path: route, sections: defaults } });
    continue;
  }
  const current = found.docs[0].sections || {};
  const merged = addMissing(current, defaults);
  if (route === "/blog/article" && merged.comments?.unavailableNote === "Comment posting will be available when the blog is connected to the CMS.") {
    delete merged.comments.unavailableNote;
  }
  if (JSON.stringify(merged) !== JSON.stringify(current)) await payload.update({ collection: "pages", id: found.docs[0].id, data: { sections: merged } });
}

for (const [route, defaults] of Object.entries(seo)) {
  const found = await payload.find({ collection: "pages", where: { path: { equals: route } }, limit: 1 });
  if (!found.totalDocs) continue;
  const page = found.docs[0];
  const data = {};
  if (!page.seoTitle) data.seoTitle = defaults.title;
  if (!page.seoDescription) data.seoDescription = defaults.description;
  if (!page.description) data.description = defaults.description;
  if (Object.keys(data).length) await payload.update({ collection: "pages", id: page.id, data });
}

for (const post of posts) {
  const slug = post.href.split("/")[2];
  const existing = await payload.find({ collection: "posts", where: { slug: { equals: slug } }, limit: 1 });
  if (existing.totalDocs) continue;
  await payload.create({ collection: "posts", data: { title: post.title, slug, excerpt: post.excerpt, publishedAt: new Date(post.date).toISOString(), featuredImageUrl: post.image, category: article.category, blocks: article.blocks } });
}

for (let index = 0; index < portfolioItems.length; index++) {
  const item = portfolioItems[index];
  const existing = await payload.find({ collection: "projects", where: { imageUrl: { equals: item.src } }, limit: 1 });
  if (existing.totalDocs) continue;
  await payload.create({ collection: "projects", data: { title: item.alt, category: item.category, imageUrl: item.src, imageAlt: item.alt, imageWidth: item.width, imageHeight: item.height, sortOrder: index } });
}

for (let index = 0; index < webProjects.length; index++) {
  const item = webProjects[index];
  const existing = await payload.find({ collection: "projects", where: { website: { equals: item.website } }, limit: 1 });
  if (existing.totalDocs) continue;
  const sameTitle = await payload.find({ collection: "projects", where: { and: [{ title: { equals: item.title } }, { category: { equals: "web" } }] }, limit: 1 });
  if (sameTitle.totalDocs) {
    const project = sameTitle.docs[0];
    const updates = {};
    if (!project.website) updates.website = item.website;
    if (!project.summary) updates.summary = item.summary;
    if (!project.image && !project.imageUrl) updates.imageUrl = item.imageUrl;
    if (!project.imageAlt) updates.imageAlt = `${item.title} project preview`;
    if (!project.services?.length) updates.services = item.services.map((label) => ({ label }));
    if (Object.keys(updates).length) await payload.update({ collection: "projects", id: project.id, data: updates });
    continue;
  }
  await payload.create({ collection: "projects", data: {
    title: item.title,
    category: "web",
    summary: item.summary,
    services: item.services.map((label) => ({ label })),
    website: item.website,
    imageUrl: item.imageUrl,
    imageAlt: `${item.title} project preview`,
    sortOrder: index,
  } });
}

console.log("Seeded page, article, and portfolio content in PostgreSQL.");
process.exit(0);
