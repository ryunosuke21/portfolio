import { Github, Linkedin, Mail, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-border border-t bg-card py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="text-center md:text-left">
            <p className="mb-2 font-bold text-2xl">Mario Pon</p>
            <p className="text-muted-foreground">Senior Fullstack Developer</p>
          </div>
          <div className="flex gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a
              href="mailto:mario.pon@example.com"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
        <div className="mt-8 border-border border-t pt-8 text-center text-muted-foreground text-sm">
          <p>© {new Date().getFullYear()} Mario Pon. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
