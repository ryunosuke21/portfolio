"use client";

import { MapPin } from "lucide-react";

import { Button } from "@portfolio/ui/components/button";

export function Hero() {
  const scrollToProjects = () => {
    const element = document.getElementById("projects");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('https://picsum.photos/1080/1080')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.4)",
        }}
      />
      <div className="container relative z-10 mx-auto px-24 text-left text-white">
        <h1 className="mb-4 text-balance font-bold text-6xl md:text-7xl lg:text-8xl">
          Mario Pon
        </h1>
        <p className="mb-3 text-2xl text-gray-200 md:text-3xl">
          Senior Fullstack Dev
        </p>
        <div className="mb-12 flex items-center justify-start gap-2 text-gray-300">
          <MapPin className="h-4 w-4" />
          <span className="text-lg">San Pedro Sula, Honduras</span>
        </div>
        <div className="flex flex-col justify-start gap-4 sm:flex-row">
          <Button size="lg" onClick={scrollToProjects}>
            My Projects
          </Button>
          <Button size="lg" variant="secondary">
            Download CV
          </Button>
        </div>
      </div>
    </section>
  );
}
