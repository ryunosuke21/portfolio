"use client";

import type React from "react";
import { toast } from "sonner";

import { Button } from "@portfolio/ui/components/button";

type DownloadCvProps = Omit<React.ComponentProps<typeof Button>, "onClick">;

const downloadPromise = () => {
  // TODO: Download CV from upload thing
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("CV downloaded");
    }, 1000);
  });
};

export function DownloadCv({
  className,
  size = "lg",
  variant = "outline",
  children,
  ...props
}: DownloadCvProps) {
  function handleDownload() {
    toast.promise(downloadPromise(), {
      loading: "Loading CV...",
      success: "CV downloaded started",
      error: "Failed to download CV",
    });
  }
  return (
    <Button
      size={size}
      variant={variant}
      className={className}
      onClick={handleDownload}
      {...props}
    >
      {children}
    </Button>
  );
}
