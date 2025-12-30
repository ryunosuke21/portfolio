"use client";

import type React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@portfolio/ui/components/button";
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@portfolio/ui/components/field";
import { LoadingSwap } from "@portfolio/ui/components/loading-swap";
import { PasswordInput } from "@portfolio/ui/components/password-input";
import { cn } from "@portfolio/ui/lib/utils";

import { resetPassword } from "@/hooks/auth";

const formSchema = z
  .object({
    password: z
      .string()
      .min(8, { error: "Password must be at least 8 characters long" }),
    confirmPassword: z
      .string()
      .min(8, { error: "Password must be at least 8 characters long" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword", "password"],
    message: "Passwords do not match",
  });

type FormData = z.infer<typeof formSchema>;

type ResetPasswordFormProps = Omit<React.ComponentProps<"form">, "onSubmit">;

export function ResetPasswordForm({
  className,
  ...props
}: ResetPasswordFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    mode: "onSubmit",
  });

  async function onSubmit(data: FormData) {
    await resetPassword(
      {
        newPassword: data.password,
        token: token ?? "",
      },
      {
        onError: (ctx) => {
          console.error("Error resetting password", ctx.error);
          form.setError("root", { message: ctx.error.message });
        },
        onSuccess: () => {
          toast.success("Password reset successfully");
          router.push("/sign-in");
        },
      },
    );
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      id="reset-password-form"
      className={cn("space-y-2", className)}
      {...props}
    >
      <Controller
        control={form.control}
        name="password"
        render={({ field, fieldState }) => (
          <Field className="gap-1">
            {" "}
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <FieldContent>
              <PasswordInput
                id="password"
                autoComplete="new-password"
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
        name="confirmPassword"
        render={({ field, fieldState }) => (
          <Field className="gap-1">
            <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
            <FieldContent>
              <PasswordInput
                id="confirmPassword"
                autoComplete="new-password"
                placeholder="Type your password again"
                aria-invalid={fieldState.invalid}
                {...field}
              />
            </FieldContent>
            {fieldState.error && <FieldError errors={[fieldState.error]} />}
          </Field>
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
        >
          <Check />
          <span>Reset password</span>
        </LoadingSwap>
      </Button>
    </form>
  );
}
