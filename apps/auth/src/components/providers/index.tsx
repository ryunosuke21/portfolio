import type React from "react";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "next-themes";

import { Toaster } from "@portfolio/ui/components/sonner";

import { TRPCReactProvider } from "@/trpc/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TRPCReactProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
        <Analytics />
        <Toaster />
      </ThemeProvider>
    </TRPCReactProvider>
  );
}
