"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Info } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@portfolio/ui/components/alert";
import { Button } from "@portfolio/ui/components/button";
import {
  Field,
  FieldContent,
  FieldError,
} from "@portfolio/ui/components/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@portfolio/ui/components/input-otp";
import { LoadingSwap } from "@portfolio/ui/components/loading-swap";
import { cn } from "@portfolio/ui/lib/utils";

import { twoFactor } from "@/hooks/auth";

const formSchema = z.object({
  code: z.string().min(6, { message: "Code must be 6 digits" }),
});

type FormData = z.infer<typeof formSchema>;

type TwoFactorFormProps = Omit<React.ComponentProps<"form">, "onSubmit">;

const codeSize = 6;

export function TwoFactorForm({ className, ...props }: TwoFactorFormProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(data: FormData) {
    await twoFactor.verifyTotp(
      { code: data.code },
      {
        onError: (ctx) => {
          console.error("Error verifying TOTP", ctx.error);
          form.setError("root", { message: ctx.error.message });
        },
      },
    );
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className={cn(className)}
      {...props}
    >
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
        name="code"
        render={({ field, fieldState }) => (
          <Field className="gap-1">
            <FieldContent className="items-center overflow-hidden">
              <InputOTP maxLength={6} containerClassName="w-fit" {...field}>
                {Array.from({ length: codeSize }).map((_, index) => (
                  <InputOTPGroup key={index.toString()}>
                    <InputOTPSlot
                      index={index}
                      aria-invalid={fieldState.invalid}
                    />
                  </InputOTPGroup>
                ))}
              </InputOTP>
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
          <Check />
          <span>Verify Account</span>
        </LoadingSwap>
      </Button>
    </form>
  );
}
