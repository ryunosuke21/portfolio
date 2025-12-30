"use client";

import type React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Info, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@portfolio/ui/components/alert";
import { Button } from "@portfolio/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@portfolio/ui/components/card";
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

import { signIn } from "@/hooks/auth";

import { GithubLogin } from "./github";

type LoginFormProps = React.ComponentProps<typeof Card>;

const formSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(8, { error: "Password must be at least 8 characters long" }),
  rememberMe: z.boolean().optional(),
});

type FormData = z.infer<typeof formSchema>;

export function SignInForm({ className, ...props }: LoginFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    mode: "onSubmit",
  });

  async function onSubmit(data: FormData) {
    await signIn.email(
      {
        ...data,
        callbackURL: "/dashboard",
      },
      {
        onError: (ctx) => {
          if (ctx.error.status === 401) {
            form.setError("email", { message: "Invalid email or password" });
            form.setError("password", { message: "Invalid email or password" });
          } else {
            console.error(ctx.error);
            form.setError("root", {
              message: "An error occurred while signing in",
            });
          }
        },
        onSuccess: (ctx) => {
          if (ctx.data.twoFactorRedirect) {
            const verifyHref = `/verify${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;
            router.push(verifyHref);
          }
        },
      },
    );
  }

  return (
    <Card className={cn("w-full max-w-lg", className)} {...props}>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Welcome back</CardTitle>
        <CardDescription>
          Enter your credentials to access your account.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
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
          id="sign-in"
          className="space-y-2"
        >
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
            name="rememberMe"
            render={({ field }) => (
              <div className="mt-2 flex w-full flex-row items-center justify-between">
                <Field className="flex flex-1 flex-row items-center gap-2">
                  <FieldContent>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      id="rememberMe"
                    />
                  </FieldContent>
                  <FieldLabel htmlFor="rememberMe">Remember me</FieldLabel>
                </Field>
                <Link
                  href={`/forgot-password${searchParams.toString() ? `?${searchParams.toString()}` : ""}`}
                  className="text-primary text-sm underline visited:text-primary/80 hover:no-underline"
                >
                  Forgot password?
                </Link>
              </div>
            )}
          />
          <Button type="submit" className="mt-4 w-full">
            <LoadingSwap
              isLoading={form.formState.isSubmitting}
              className="flex items-center gap-2"
            >
              <Mail />
              <span>Continue with email</span>
            </LoadingSwap>
          </Button>
        </form>
        <div className="text-center text-sm">
          <p className="text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              href={`/sign-up${searchParams.toString() ? `?${searchParams.toString()}` : ""}`}
              className="text-primary text-sm underline visited:text-primary/80 hover:no-underline"
            >
              Register now.
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
