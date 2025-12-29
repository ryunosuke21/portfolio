"use client";

import { useState } from "react";
import { ExternalLink, Github } from "lucide-react";

import { Badge } from "@portfolio/ui/components/badge";
import { Button } from "@portfolio/ui/components/button";
import { Card, CardContent, CardHeader } from "@portfolio/ui/components/card";

interface ProjectCardProps {
  title: string;
  technologies: string[];
  previewUrl: string;
  siteUrl?: string;
  githubUrl?: string;
}

export function ProjectCard({
  title,
  technologies,
  previewUrl,
  siteUrl,
  githubUrl,
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const visibleTechs = technologies.slice(0, 4);
  const hiddenCount = technologies.length - 4;

  return (
    <Card
      className="overflow-hidden pt-0 transition-all duration-300 hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="relative p-0">
        <div className="relative aspect-video overflow-hidden rounded-t-lg">
          <iframe
            src={previewUrl}
            className="pointer-events-none h-full w-full origin-top-left scale-50 border-0"
            style={{
              width: "200%",
              height: "200%",
            }}
            title={title}
          />
          {isHovered && (siteUrl || githubUrl) && (
            <div className="fade-in absolute inset-0 flex animate-in items-center justify-center gap-3 bg-black/60 duration-200">
              {siteUrl && (
                <Button
                  size="sm"
                  variant="secondary"
                  asChild
                  className="pointer-events-auto"
                >
                  <a href={siteUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Visit Site
                  </a>
                </Button>
              )}
              {githubUrl && (
                <Button
                  size="sm"
                  variant="secondary"
                  asChild
                  className="pointer-events-auto"
                >
                  <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                  </a>
                </Button>
              )}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-5">
        <h3 className="mb-3 font-semibold text-lg">{title}</h3>
        <div className="flex flex-wrap gap-2">
          {visibleTechs.map((tech) => (
            <Badge key={tech} variant="secondary">
              {tech}
            </Badge>
          ))}
          {hiddenCount > 0 && <Badge variant="outline">+{hiddenCount}</Badge>}
        </div>
      </CardContent>
    </Card>
  );
}
