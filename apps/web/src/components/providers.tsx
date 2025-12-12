"use client";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { Toaster } from "@portfolio/ui/components/sonner";

import { TRPCReactProvider } from "@/trpc/react";

import { ThemeProvider } from "./theme-provider";

export function Providers({ children }: { children?: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <TRPCReactProvider>
        {children}
        <ReactQueryDevtools />
      </TRPCReactProvider>
      <Toaster richColors />
    </ThemeProvider>
  );
}
