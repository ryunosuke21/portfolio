import { AnimatedBackground } from "@/components/animated-background";
import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { ProjectsSection } from "@/components/projects-section";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background">
      <AnimatedBackground />
      <div className="relative z-10">
        <Header />
        <main>
          <HeroSection />
          <ProjectsSection />
        </main>
      </div>
    </div>
  );
}
