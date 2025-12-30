"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Info, Send } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@portfolio/ui/components/alert";
import { Button } from "@portfolio/ui/components/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@portfolio/ui/components/dialog";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@portfolio/ui/components/empty";
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@portfolio/ui/components/field";
import { Input } from "@portfolio/ui/components/input";
import { LoadingSwap } from "@portfolio/ui/components/loading-swap";
import { cn } from "@portfolio/ui/lib/utils";

import { requestPasswordReset } from "@/hooks/auth";

const formSchema = z.object({
  email: z.email(),
});

type FormData = z.infer<typeof formSchema>;

type ForgotPasswordFormProps = Omit<React.ComponentProps<"form">, "onSubmit">;

export function ForgotPasswordForm({
  className,
  ...props
}: ForgotPasswordFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [success, setSuccess] = React.useState(false);
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
    mode: "onSubmit",
  });

  async function onSubmit(data: FormData) {
    await requestPasswordReset(
      { email: data.email },
      {
        onError: (ctx) => {
          console.error("Error requesting password reset", ctx.error);
          form.setError("root", { message: ctx.error.message });
        },
        onSuccess: () => {
          toast.success("Password reset email sent");
          setSuccess(true);
        },
      },
    );
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      id="forgot-password-form"
      className={cn("space-y-2", className)}
      {...props}
    >
      <Dialog open={success} onOpenChange={setSuccess}>
        <DialogContent>
          <DialogTitle className="sr-only">Success!</DialogTitle>
          <Empty>
            <EmptyHeader>
              <EmptyMedia
                variant="icon"
                className="border-green-500 bg-transparent text-green-500"
              >
                <Check />
              </EmptyMedia>
              <EmptyTitle>Email sent!</EmptyTitle>
              <EmptyDescription>
                We have sent you an email to reset your password.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <DialogClose asChild>
                <Button asChild className="w-full">
                  <Link
                    href={`/sign-in${searchParams.toString() ? `?${searchParams.toString()}` : ""}`}
                    onClick={(e) => {
                      e.preventDefault();
                      router.back();
                      const signInHref = `/sign-in${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;
                      setTimeout(() => router.push(signInHref), 0);
                    }}
                  >
                    Back to sign in
                  </Link>
                </Button>
              </DialogClose>
            </EmptyContent>
          </Empty>
        </DialogContent>
      </Dialog>
      {form.formState.errors.root && (
        <Alert variant="destructive">
          <Info />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription className="text-muted-foreground!">
            {form.formState.errors.root.message}
          </AlertDescription>
        </Alert>
      )}
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
      <Button type="submit" className="mt-4 w-full">
        <LoadingSwap
          isLoading={form.formState.isSubmitting}
          className="flex items-center gap-2"
        >
          <Send />
          <span>Reset password</span>
        </LoadingSwap>
      </Button>
    </form>
  );
}
