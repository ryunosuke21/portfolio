"use client";

import type React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Info, Mail } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@portfolio/ui/components/alert";
import { Button } from "@portfolio/ui/components/button";
import { Checkbox } from "@portfolio/ui/components/checkbox";
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@portfolio/ui/components/field";
import { Input } from "@portfolio/ui/components/input";
import { LoadingSwap } from "@portfolio/ui/components/loading-swap";
import { PasswordInput } from "@portfolio/ui/components/password-input";
import { Separator } from "@portfolio/ui/components/separator";
import { cn } from "@portfolio/ui/lib/utils";

import { oauth2, signUp } from "@/hooks/auth";

import { GithubLogin } from "./github";

type LoginFormProps = React.ComponentProps<"section">;

const formSchema = z.object({
  email: z.email(),
  firstName: z.string().min(1, { error: "First name is required" }),
  lastName: z.string().min(1, { error: "Last name is required" }),
  password: z
    .string()
    .min(8, { error: "Password must be at least 8 characters long" }),
  terms: z.boolean().optional(),
});

type FormData = z.infer<typeof formSchema>;

export function SignUpForm({ className, ...props }: LoginFormProps) {
  const searchParams = useSearchParams();
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      terms: false,
    },
    mode: "onSubmit",
  });

  async function onSubmit(data: FormData) {
    if (!data.terms) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast.error(
        "We can't create an account without you agreeing to the terms and conditions.",
      );
      return;
    }
    await signUp.email(
      {
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        password: data.password,
        callbackURL: "/dashboard",
      },
      {
        onError: (ctx) => {
          if (ctx.error.status === 422) {
            form.setError("email", { message: "Email already in use" });
          } else {
            console.error(ctx.error);
            form.setError("root", {
              message: "An error occurred while signing in",
            });
          }
        },
        onSuccess: async () => {
          toast.success("Account created successfully");
          await oauth2.continue({ created: true });
        },
      },
    );
  }

  return (
    <section id="sign-up" className={cn("space-y-8", className)} {...props}>
      <div className="text-center">
        <h1 className="font-bold text-2xl">Get started now</h1>
        <p className="text-muted-foreground">
          Create an account to get started.
        </p>
      </div>
      {form.formState.errors.root && (
        <Alert variant="destructive">
          <Info className="size-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription className="text-muted-foreground!">
            {form.formState.errors.root.message}
          </AlertDescription>
        </Alert>
      )}
      <GithubLogin className="w-full" />
      <div className="flex items-center justify-between">
        <Separator className="flex-1" />
        <span>or</span>
        <Separator className="flex-1" />
      </div>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        id="sign-up-form"
        className="space-y-2"
      >
        <div className="grid grid-cols-2 gap-2">
          <Controller
            control={form.control}
            name="firstName"
            render={({ field, fieldState }) => (
              <Field className="gap-1">
                <FieldLabel htmlFor="firstName">First Name</FieldLabel>
                <FieldContent>
                  <Input
                    id="firstName"
                    placeholder="John"
                    type="text"
                    aria-invalid={fieldState.invalid}
                    autoComplete="given-name"
                    {...field}
                  />
                </FieldContent>
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name="lastName"
            render={({ field, fieldState }) => (
              <Field className="gap-1">
                <FieldLabel htmlFor="lastName">Last Name</FieldLabel>
                <FieldContent>
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    type="text"
                    aria-invalid={fieldState.invalid}
                    autoComplete="family-name"
                    {...field}
                  />
                </FieldContent>
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </div>

        <Controller
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <Field className="gap-1">
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <FieldContent>
                <Input
                  id="email"
                  placeholder="j.doe@example.com"
                  type="email"
                  aria-invalid={fieldState.invalid}
                  autoComplete="email"
                  {...field}
                />
              </FieldContent>
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="password"
          render={({ field, fieldState }) => (
            <Field className="gap-1">
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <FieldContent>
                <PasswordInput
                  id="password"
                  autoComplete="current-password"
                  placeholder="At least 8 characters"
                  aria-invalid={fieldState.invalid}
                  {...field}
                />
              </FieldContent>
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="terms"
          render={({ field }) => (
            <div className="mt-2 flex w-full flex-row items-center justify-between">
              <Field className="flex flex-1 flex-row items-center gap-2">
                <FieldContent>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    id="terms"
                  />
                </FieldContent>
                <FieldLabel htmlFor="terms">
                  <p>
                    I agree to the{" "}
                    <Link
                      href={`/terms${searchParams.toString() ? `?${searchParams.toString()}` : ""}`}
                      className="text-primary underline visited:text-primary/80 hover:no-underline"
                    >
                      Terms & Conditions
                    </Link>
                  </p>
                </FieldLabel>
              </Field>
            </div>
          )}
        />
        <Button
          type="submit"
          className="mt-4 w-full"
          disabled={form.formState.isSubmitting}
        >
          <LoadingSwap
            isLoading={form.formState.isSubmitting}
            className="flex items-center gap-2"
            loadingText="Creating account"
          >
            <Mail />
            <span>Continue with email</span>
          </LoadingSwap>
        </Button>
      </form>
      <div className="text-center text-sm">
        <p className="text-muted-foreground">
          Already have an account?{" "}
          <Link
            href={`/sign-in${searchParams.toString() ? `?${searchParams.toString()}` : ""}`}
            className="text-primary text-sm underline visited:text-primary/80 hover:no-underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </section>
  );
}
