import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const projectsRouter = createTRPCRouter({
  list: publicProcedure.query(async () => {
    const projects = [
      {
        title: "E-Commerce Platform",
        technologies: ["Next.js", "PostgreSQL", "React", "Stripe", "Tailwind"],
        previewUrl: "https://en.wikipedia.org/wiki/E-commerce",
        siteUrl: "https://example.com",
        githubUrl: "https://github.com",
      },
      {
        title: "Task Management App",
        technologies: ["React", "Node.js", "MongoDB", "Express"],
        previewUrl: "https://en.wikipedia.org/wiki/Task_management",
        siteUrl: "https://example.com",
        githubUrl: "https://github.com",
      },
      {
        title: "Analytics Dashboard",
        technologies: ["Next.js", "TypeScript", "Chart.js", "Prisma", "MySQL"],
        previewUrl: "https://en.wikipedia.org/wiki/Analytics",
        siteUrl: "https://example.com",
      },
      {
        title: "Social Media Platform",
        technologies: ["React", "Firebase", "Redux"],
        previewUrl: "https://en.wikipedia.org/wiki/Social_media",
        githubUrl: "https://github.com",
      },
      {
        title: "Weather App",
        technologies: ["Vue.js", "API Integration", "CSS"],
        previewUrl: "https://en.wikipedia.org/wiki/Weather_forecasting",
        siteUrl: "https://example.com",
        githubUrl: "https://github.com",
      },
      {
        title: "Portfolio Generator",
        technologies: ["Next.js", "Tailwind", "MDX"],
        previewUrl: "https://en.wikipedia.org/wiki/Portfolio_website",
        siteUrl: "https://example.com",
      },
    ];

    return projects;
  }),
});
