import { Suspense } from "react";

import { ResetPasswordClient } from "./reset-password-client";

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="grid h-dvh w-dvw place-items-center">
          <div className="w-full max-w-lg animate-pulse rounded-lg border bg-card p-6">
            <div className="mb-4 h-6 w-32 rounded bg-muted" />
            <div className="mb-6 h-4 w-48 rounded bg-muted" />
            <div className="space-y-4">
              <div className="h-10 w-full rounded bg-muted" />
              <div className="h-10 w-full rounded bg-muted" />
              <div className="h-10 w-full rounded bg-muted" />
            </div>
          </div>
        </div>
      }
    >
      <ResetPasswordClient />
    </Suspense>
  );
}
