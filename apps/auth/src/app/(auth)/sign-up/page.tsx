import { SignUpForm } from "@/components/auth/sign-up-form";

export default function SignInPage() {
  return (
    <div className="grid h-dvh w-dvw grid-cols-1 gap-4 p-4 md:grid-cols-2 md:gap-6 md:p-8">
      <div className="grid place-items-center">
        <SignUpForm className="w-full max-w-lg" />
      </div>
      <div className="rounded-xl bg-primary">
        <h1>Hello</h1>
      </div>
    </div>
  );
}
