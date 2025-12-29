import { ProjectCard } from "@/components/project-card";
import { api } from "@/trpc/server";

export async function ProjectsSection() {
  const projects = await api.projects.list();

  return (
    <section id="projects" className="bg-muted/30 py-24">
      <div className="container mx-auto px-6">
        <h2 className="mb-12 text-center font-bold text-4xl md:text-5xl">
          Projects
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, idx) => (
            <ProjectCard key={idx.toString()} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}
