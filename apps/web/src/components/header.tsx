import Image from "next/image";
import Link from "next/link";

import { UserMenu } from "@/components/user-menu";

export function Header() {
  return (
    <header className="fixed top-0 right-0 left-0 z-50 border-border/50 border-b bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <div className="font-bold text-2xl text-primary">
          <Link href="/">
            <Image
              src="/logo.svg"
              alt="logo"
              width={60}
              height={33}
              className="hover:opacity-80"
            />
          </Link>
        </div>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="#home"
            className="text-foreground transition-colors hover:text-primary"
          >
            Home
          </Link>
          <Link
            href="#projects"
            className="text-foreground transition-colors hover:text-primary"
          >
            Projects
          </Link>
          <Link
            href="#about"
            className="text-foreground transition-colors hover:text-primary"
          >
            About
          </Link>
          <Link
            href="#experience"
            className="text-foreground transition-colors hover:text-primary"
          >
            Experience
          </Link>
          <Link
            href="#contact"
            className="text-foreground transition-colors hover:text-primary"
          >
            Contact
          </Link>
        </nav>

        <UserMenu />
      </div>
    </header>
  );
}
