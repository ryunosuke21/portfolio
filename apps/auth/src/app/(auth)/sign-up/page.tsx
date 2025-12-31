import { Suspense } from "react";

import { SignUpForm } from "@/components/auth/sign-up-form";

export default function SignUpPage() {
  return (
    <div className="grid h-dvh w-dvw grid-cols-1 gap-4 p-4 md:grid-cols-2 md:gap-6 md:p-8">
      <div className="grid place-items-center">
        <Suspense fallback={
          <div className="w-full max-w-lg animate-pulse rounded-lg border bg-card p-6">
            <div className="mb-4 h-6 w-32 rounded bg-muted" />
            <div className="mb-6 h-4 w-48 rounded bg-muted" />
            <div className="space-y-4">
              <div className="h-10 w-full rounded bg-muted" />
              <div className="h-10 w-full rounded bg-muted" />
              <div className="h-10 w-full rounded bg-muted" />
            </div>
          </div>
        }>
          <SignUpForm className="w-full max-w-lg" />
        </Suspense>
      </div>
      <div className="rounded-xl bg-primary">
        <h1>Hello</h1>
      </div>
    </div>
  );
}
