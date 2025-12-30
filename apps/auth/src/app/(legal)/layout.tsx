import type React from "react";

import { Header } from "@/components/header";

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header />
      <div className="pt-12">{children}</div>
    </div>
  );
}
