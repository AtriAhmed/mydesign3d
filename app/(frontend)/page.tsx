import SiteHeader from "./components/site-header";
import HomeHero from "./components/home-hero";
import HomeAbout from "./components/home-about";
import HomeExpertise from "./components/home-expertise";
import HomeProjects from "./components/home-projects";
import HomeWhyUs from "./components/home-why-us";
import HomeClients from "./components/home-clients";
import HomeContact from "./components/home-contact";
import SiteFooter from "./components/site-footer";
import FloatingCta from "./components/floating-cta";
import { PageSectionsProvider } from "./components/page-sections-provider";
import { getPageSections, getPageMetadata } from "@/lib/cms";

export async function generateMetadata() {
  return getPageMetadata("/", {
    title: "MyDesign3D — Architecture, 3D Visualization & Web Solutions",
    description: "Architecture, design, and digital solutions from MyDesign3D.",
  });
}

export default async function Home() {
  const sections = await getPageSections("/");
  return (
    <PageSectionsProvider sections={sections}>
      <SiteHeader />
      <main id="main-content"><HomeHero /><HomeAbout /><HomeExpertise /><HomeProjects /><HomeWhyUs /><HomeClients /><HomeContact /></main>
      <SiteFooter />
      <FloatingCta />
    </PageSectionsProvider>
  );
}
