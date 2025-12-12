import { MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@portfolio/ui/components/button";

import { DownloadCv } from "@/components/download-cv";

export function HeroSection() {
  return (
    <section
      id="home"
      className="container mx-auto flex min-h-screen items-center px-6 pt-20"
    >
      <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-2">
        {/* Left side - Text content */}
        <div className="text-left">
          <h1 className="mb-0 text-balance font-bold text-6xl text-foreground md:text-7xl lg:text-8xl">
            Mario Pon
          </h1>
          <h2 className="mb-2 text-balance font-bold text-2xl text-muted-foreground md:text-3xl lg:text-4xl">
            Full Stack Developer
          </h2>
          <a
            href="https://www.google.com/maps/place/san+pedro+sula/data=!4m2!3m1!1s0x8f66430b113d5af1:0x323ecf76c17e8f6b?sa=X&ved=1t:155783&ictx=111"
            target="_blank"
            rel="noopener"
          >
            <div className="mb-12 flex flex-row items-center gap-2 text-primary text-xl md:text-2xl">
              <MapPin className="size-6" />
              <p>San Pedro Sula, Honduras</p>
            </div>
          </a>

          <div className="flex items-center gap-4">
            <DownloadCv size="lg" variant="outline">
              Download CV
            </DownloadCv>
            <Button size="lg" asChild>
              <Link href="#projects" scroll={true}>
                View Projects
              </Link>
            </Button>
          </div>
        </div>

        {/* Right side - Image */}
        <div className="flex items-center justify-center lg:justify-end">
          <div className="relative aspect-square w-full max-w-md overflow-hidden rounded-lg">
            <Image
              src="https://picsum.photos/600/600?random=1"
              alt="Mario"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
