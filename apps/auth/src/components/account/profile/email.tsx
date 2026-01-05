"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Check,
  Info,
  MailCheck,
  MoreHorizontal,
  Pencil,
  X,
} from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@portfolio/ui/components/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@portfolio/ui/components/alert-dialog";
import { Badge } from "@portfolio/ui/components/badge";
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
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@portfolio/ui/components/input-group";
import { LoadingSwap } from "@portfolio/ui/components/loading-swap";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@portfolio/ui/components/tooltip";
import { cn } from "@portfolio/ui/lib/utils";

import { changeEmail, sendVerificationEmail } from "@/hooks/auth";
import type { auth } from "@/server/auth";

type PersonalInformationProps = React.ComponentProps<typeof Card> & {
  user: typeof auth.$Infer.Session.user;
};

const formSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
});

type FormData = z.infer<typeof formSchema>;

export function Email({
  className,
  id = "personal-information",
  user,
  ...props
}: PersonalInformationProps) {
  const [success, setSuccess] = React.useState(false);
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: user?.email,
    },
    mode: "onSubmit",
  });

  async function onSubmit(data: FormData) {
    await changeEmail(
      {
        newEmail: data.email,
      },
      {
        onError: (ctx) => {
          console.error(ctx.error);
          form.setError("root", { message: ctx.error.message });
        },
        onSuccess: () => {
          setSuccess(true);
        },
      },
    );
  }

  async function handleVerifyEmail() {
    await sendVerificationEmail(
      {
        email: user.email,
      },
      {
        onRequest: () => {
          toast.loading("Sending verification email...");
        },
        onSuccess: () => {
          toast.dismiss();
          toast.success("Verification email sent");
        },
        onError: (ctx) => {
          toast.error("Error", {
            description: "An error occurred while sending verification email",
            action: {
              label: "View",
              onClick: () => {
                // TODO: Add a modal that shows the error details and contact to support
                console.error("Error sending verification email", ctx.error);
                toast.info("Error has been printed to console.");
              },
            },
          });
        },
      },
    );
  }

  return (
    <Card className={cn("", className)} id={id} {...props}>
      <CardHeader>
        <CardTitle>Email</CardTitle>
        <CardDescription>Update your email address</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {form.formState.errors.root && (
          <Alert variant="destructive">
            <Info />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription className="text-muted-foreground!">
              {form.formState.errors.root.message}
            </AlertDescription>
          </Alert>
        )}
        <AlertDialog open={success} onOpenChange={setSuccess}>
          <AlertDialogContent>
            <AlertDialogHeader className="gap-0 text-center!">
              <div className="mb-4 flex items-center justify-center">
                <MailCheck className="size-10 text-success" />
              </div>
              <AlertDialogTitle>
                Check Your Email to Confirm Change
              </AlertDialogTitle>
              <AlertDialogDescription>
                We've sent a confirmation email to your current address. Please
                follow the instructions in that email to approve this change.
                After you confirm, your new email address will be set.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="justify-center!">
              <AlertDialogCancel>Close</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          id="personal-information"
          className="space-y-4"
        >
          <Controller
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <Field className="gap-1">
                <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                <FieldContent>
                  <InputGroup>
                    <InputGroupInput
                      {...field}
                      aria-invalid={fieldState.invalid}
                      autoComplete="email"
                      placeholder="j.doe@example.com"
                      type="email"
                      id={field.name}
                    />
                    <InputGroupAddon align="inline-end">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          {form.formState.isSubmitSuccessful ? (
                            <Badge variant="outline">
                              <MoreHorizontal className="size-3" />
                              <>Pending email change</>
                            </Badge>
                          ) : user.emailVerified ? (
                            <Badge variant="outline">
                              <Check className="text-success" />
                              <>Verified</>
                            </Badge>
                          ) : (
                            <InputGroupButton
                              className="inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-full border border-destructive px-2 py-0.5 font-medium text-xs transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3"
                              type="button"
                              onClick={handleVerifyEmail}
                            >
                              <X className="text-destructive" />
                              <span>Not verified</span>
                            </InputGroupButton>
                          )}
                        </TooltipTrigger>
                        <TooltipContent>
                          {success ? (
                            <p>Email change is pending confirmation.</p>
                          ) : user.emailVerified ? (
                            <p>Your email address has been verified.</p>
                          ) : (
                            <p>Your email address has not been verified.</p>
                          )}
                        </TooltipContent>
                      </Tooltip>
                    </InputGroupAddon>
                  </InputGroup>
                </FieldContent>
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
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
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                type="button"
                disabled={
                  form.formState.isSubmitting || !form.formState.isDirty
                }
              >
                <LoadingSwap
                  isLoading={form.formState.isSubmitting}
                  className="flex items-center gap-2"
                >
                  <Pencil />
                  <span>Change email</span>
                </LoadingSwap>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Warning</AlertDialogTitle>
                <AlertDialogDescription>
                  Changing your email address will require you to verify your
                  new email address. You will receive a verification email to
                  your new email address.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction asChild>
                  <Button type="submit" form="personal-information">
                    Continue
                  </Button>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardFooter>
      )}
    </Card>
  );
}
