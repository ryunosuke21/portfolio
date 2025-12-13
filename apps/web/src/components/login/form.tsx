"use client";

import type React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

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

import { GithubLogin } from "./github";

type LoginFormProps = React.ComponentProps<typeof Card>;

const formSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
  remember: z.boolean().optional(),
});

type FormData = z.infer<typeof formSchema>;

export function LoginCard({ className, ...props }: LoginFormProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
    mode: "onSubmit",
  });

  async function onSubmit(data: FormData) {
    console.log(data);
  }

  return (
    <Card className={cn("w-full max-w-lg", className)} {...props}>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Welcome back</CardTitle>
        <CardDescription>
          Enter your email and password to access your account.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
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
                    {...field}
                  />
                </FieldContent>
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name="remember"
            render={({ field }) => (
              <div className="mt-2 flex w-full flex-row items-center justify-between">
                <Field className="flex flex-1 flex-row items-center gap-2">
                  <FieldContent>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      id="remember"
                    />
                  </FieldContent>
                  <FieldLabel htmlFor="remember">Remember me</FieldLabel>
                </Field>
                <Link
                  href="/forgot-password"
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
        <div className="flex items-center justify-between">
          <Separator className="flex-1" />
          <span>or</span>
          <Separator className="flex-1" />
        </div>
        <GithubLogin className="w-full" />
        <div className="text-center text-sm">
          <p className="text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              href="/sign-up"
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
