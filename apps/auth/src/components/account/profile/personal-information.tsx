"use client";

import type React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@portfolio/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@portfolio/ui/components/card";
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@portfolio/ui/components/field";
import { Input } from "@portfolio/ui/components/input";
import { LoadingSwap } from "@portfolio/ui/components/loading-swap";
import { PhoneInput } from "@portfolio/ui/components/phone-input";
import { cn } from "@portfolio/ui/lib/utils";

import { updateUser } from "@/hooks/auth";
import type { auth } from "@/server/auth";

type PersonalInformationProps = React.ComponentProps<typeof Card> & {
  user: typeof auth.$Infer.Session.user;
};

const formSchema = z.object({
  firstName: z.string().min(1, { error: "First name is required" }),
  lastName: z.string().min(1, { error: "Last name is required" }),
  phoneNumber: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export function PersonalInformation({
  className,
  id = "personal-information",
  user,
  ...props
}: PersonalInformationProps) {
  const router = useRouter();
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: user?.name?.split(" ")[0],
      lastName: user?.name?.split(" ")[1],
      phoneNumber: user?.phoneNumber ?? undefined,
    },
    mode: "onSubmit",
  });

  async function onSubmit(data: FormData) {
    await updateUser(
      {
        name: `${data.firstName} ${data.lastName}`,
        phoneNumber: data.phoneNumber ?? undefined,
      },
      {
        onError: (ctx) => {
          console.error(ctx.error);
          form.setError("root", { message: ctx.error.message });
        },
        onSuccess: () => {
          toast.success("Personal information updated successfully");
          router.refresh();
        },
      },
    );
  }

  return (
    <Card className={cn("", className)} id={id} {...props}>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>
          Update your account details and profile information
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          id="personal-information"
          className="space-y-4"
        >
          <div className="grid gap-6 sm:grid-cols-2">
            <Controller
              control={form.control}
              name="firstName"
              render={({ field, fieldState }) => (
                <Field className="gap-1">
                  <FieldLabel htmlFor={field.name}>First Name</FieldLabel>
                  <FieldContent>
                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      autoComplete="given-name"
                      placeholder="John"
                      id={field.name}
                    />
                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </FieldContent>
                </Field>
              )}
            />
            <Controller
              control={form.control}
              name="lastName"
              render={({ field, fieldState }) => (
                <Field className="gap-1">
                  <FieldLabel htmlFor={field.name}>Last Name</FieldLabel>
                  <FieldContent>
                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      autoComplete="family-name"
                      placeholder="Doe"
                    />
                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </FieldContent>
                </Field>
              )}
            />
          </div>
          <Controller
            control={form.control}
            name="phoneNumber"
            render={({ field, fieldState }) => (
              <Field className="gap-1">
                <FieldLabel htmlFor={field.name}>Phone Number</FieldLabel>
                <FieldContent>
                  <PhoneInput
                    {...field}
                    aria-invalid={fieldState.invalid}
                    id={field.name}
                  />
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </FieldContent>
              </Field>
            )}
          />
        </form>
      </CardContent>
      {form.formState.isDirty && (
        <CardFooter className="justify-end gap-6">
          <Button
            variant="secondary"
            type="button"
            onClick={() => form.reset()}
          >
            <X />
            <span>Cancel</span>
          </Button>
          <Button
            type="submit"
            form="personal-information"
            disabled={form.formState.isSubmitting || !form.formState.isDirty}
          >
            <LoadingSwap
              isLoading={form.formState.isSubmitting}
              className="flex items-center gap-2"
            >
              <Check />
              <span>Save Changes</span>
            </LoadingSwap>
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
