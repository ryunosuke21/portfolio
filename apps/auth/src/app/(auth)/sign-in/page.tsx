import { Suspense } from "react";

import { SignInForm } from "@/components/auth/sign-in-form";

export default function SignInPage() {
  return (
    <div className="grid h-dvh w-dvw place-items-center">
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
        <SignInForm />
      </Suspense>
    </div>
  );
}
