// app/page.tsx
import projectService from "@/lib/services/project.service";
import PortfolioLanding from "@/components/landing/PortfolioLanding";

export default async function Home() {
  const { data: projects } = await projectService.getPublishedProjects({
    limit: 15,
    sortBy: "order",
    sortOrder: "asc",
  });

  const parallaxItems = projects.map((project) => ({
    title: project.title,
    // link: project.liveUrl || `/projects/${project.slug}`,
    link: `/projects/${project.slug}`,
    thumbnail: project.thumbnail,
  }));

  return <PortfolioLanding projects={parallaxItems} />;
}
