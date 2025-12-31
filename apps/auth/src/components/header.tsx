import Link from "next/link";

import { Button } from "@portfolio/ui/components/button";

import { APP_NAME } from "@/constants";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-semibold text-xl">{APP_NAME}</span>
        </Link>
        <nav className="flex items-center gap-4">
          <Button asChild>
            <Link href="/account">Get Started</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
