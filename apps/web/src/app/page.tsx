import { ContactSection } from "@/components/contact-section";
import { ExperienceSection } from "@/components/experience-section";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Navbar } from "@/components/navbar";
import { ProjectsSection } from "@/components/projects-section";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <ProjectsSection />
      <ExperienceSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
