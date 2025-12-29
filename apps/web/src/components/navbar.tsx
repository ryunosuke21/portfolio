import Link from "next/link";

import { UserMenu } from "@/components/user-menu";

export function Navbar() {
  return (
    <nav className="fixed top-0 right-0 left-0 z-50 border-border border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="font-semibold text-xl tracking-tight">
              MP
            </Link>
            <div className="hidden items-center gap-6 md:flex">
              <Link
                href="#projects"
                className="text-muted-foreground text-sm transition-colors hover:text-foreground"
              >
                Projects
              </Link>
              <Link
                href="#experience"
                className="text-muted-foreground text-sm transition-colors hover:text-foreground"
              >
                Experience
              </Link>
              <Link
                href="/about"
                className="text-muted-foreground text-sm transition-colors hover:text-foreground"
              >
                About
              </Link>
              <Link
                href="#contact"
                className="text-muted-foreground text-sm transition-colors hover:text-foreground"
              >
                Contact
              </Link>
            </div>
          </div>
          <UserMenu />
        </div>
      </div>
    </nav>
  );
}
