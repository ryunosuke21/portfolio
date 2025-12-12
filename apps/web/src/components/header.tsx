import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@portfolio/ui/components/avatar";

export function Header() {
  return (
    <header className="fixed top-0 right-0 left-0 z-50 border-border/50 border-b bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <div className="font-bold text-2xl text-primary">DEV</div>

        <nav className="hidden items-center gap-8 md:flex">
          <a
            href="#home"
            className="text-foreground transition-colors hover:text-primary"
          >
            Home
          </a>
          <a
            href="#projects"
            className="text-foreground transition-colors hover:text-primary"
          >
            Projects
          </a>
          <a
            href="#about"
            className="text-foreground transition-colors hover:text-primary"
          >
            About
          </a>
          <a
            href="#contact"
            className="text-foreground transition-colors hover:text-primary"
          >
            Contact
          </a>
        </nav>

        <Avatar>
          <AvatarImage src="/developer-avatar.png" />
          <AvatarFallback className="bg-primary text-primary-foreground">
            A
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
