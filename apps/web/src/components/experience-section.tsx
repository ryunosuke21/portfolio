import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@portfolio/ui/components/tabs";

import { TechItem } from "@/components/tech-item";
import { TimelineItem } from "@/components/timeline-item";

export function ExperienceSection() {
  return (
    <section id="experience" className="bg-background py-24">
      <div className="container mx-auto px-6">
        <h2 className="mb-12 text-center font-bold text-4xl md:text-5xl">
          Experience
        </h2>
        <Tabs defaultValue="tech-stack" className="mx-auto w-full max-w-4xl">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="tech-stack">Tech Stack</TabsTrigger>
            <TabsTrigger value="work">Work Experience</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
          </TabsList>
          <TabsContent value="tech-stack" className="mt-8">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <TechItem
                name="React & Next.js"
                description="Building modern web applications with React ecosystem and Next.js framework for optimal performance."
              />
              <TechItem
                name="TypeScript"
                description="Type-safe development with TypeScript for scalable and maintainable codebases."
              />
              <TechItem
                name="Node.js"
                description="Server-side JavaScript development with Node.js and Express for robust APIs."
              />
              <TechItem
                name="PostgreSQL"
                description="Relational database design and optimization with PostgreSQL."
              />
              <TechItem
                name="Docker & AWS"
                description="Containerization and cloud deployment with Docker and AWS services."
              />
              <TechItem
                name="Tailwind CSS"
                description="Utility-first CSS framework for rapid UI development."
              />
            </div>
          </TabsContent>
          <TabsContent value="work" className="mt-8">
            <div className="space-y-4">
              <TimelineItem
                title="Senior Fullstack Developer"
                organization="Tech Solutions Inc."
                period="2021 - Present"
                description="Leading development of enterprise web applications using Next.js, React, and Node.js. Mentoring junior developers and architecting scalable solutions."
              />
              <TimelineItem
                title="Fullstack Developer"
                organization="Digital Agency Co."
                period="2019 - 2021"
                description="Developed custom web applications for various clients using modern JavaScript frameworks and cloud technologies."
              />
              <TimelineItem
                title="Frontend Developer"
                organization="StartUp Labs"
                period="2017 - 2019"
                description="Built responsive user interfaces and implemented complex frontend features using React and Vue.js."
              />
            </div>
          </TabsContent>
          <TabsContent value="education" className="mt-8">
            <div className="space-y-4">
              <TimelineItem
                title="Bachelor of Computer Science"
                organization="National University of Honduras"
                period="2013 - 2017"
                description="Graduated with honors. Focused on software engineering, algorithms, and web development."
              />
              <TimelineItem
                title="Full Stack Web Development"
                organization="Online Bootcamp"
                period="2016"
                description="Intensive program covering modern web development technologies and best practices."
              />
              <TimelineItem
                title="AWS Certified Developer"
                organization="Amazon Web Services"
                period="2020"
                description="Achieved AWS certification demonstrating proficiency in cloud development."
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
