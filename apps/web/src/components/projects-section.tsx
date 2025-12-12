import { PieChart, ShoppingCart, Smartphone } from "lucide-react";

import { Card, CardContent, CardHeader } from "@portfolio/ui/components/card";

const projects = [
  {
    title: "E-commerce Redesign",
    icon: ShoppingCart,
  },
  {
    title: "Analytics Dashboard",
    icon: PieChart,
  },
  {
    title: "Mobile App Prototype",
    icon: Smartphone,
  },
];

export async function ProjectsSection() {
  return (
    <section id="projects" className="min-h-screen bg-muted/70 px-6 py-20">
      <div className="container mx-auto max-w-6xl">
        <h2 className="mb-12 font-bold text-4xl text-foreground md:text-5xl">
          Projects
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => {
            const Icon = project.icon;
            return (
              <Card
                key={project.title}
                className="cursor-pointer border-2 border-primary/40 bg-card transition-all duration-300 hover:border-primary"
              >
                <CardHeader className="pb-3">
                  <Icon
                    className="mb-4 h-12 w-12 text-primary"
                    strokeWidth={1.5}
                  />
                </CardHeader>
                <CardContent>
                  <h3 className="font-semibold text-2xl text-card-foreground">
                    {project.title}
                  </h3>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
