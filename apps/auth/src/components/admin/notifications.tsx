"use client";

import { Bell } from "lucide-react";

import { Button } from "@portfolio/ui/components/button";

export function Notifications() {
  return (
    <Button variant="ghost" size="icon" className="relative">
      <Bell className="h-4 w-4" />
      <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500" />
    </Button>
  );
}
