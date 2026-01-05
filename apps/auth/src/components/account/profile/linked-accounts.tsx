"use client";

import type React from "react";
import { GitHubDark, Google } from "@ridemountainpig/svgl-react";
import { Link2, Link2Off } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

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
import { Button } from "@portfolio/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@portfolio/ui/components/card";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@portfolio/ui/components/item";
import { cn } from "@portfolio/ui/lib/utils";

import { linkSocial, unlinkAccount } from "@/hooks/auth";

type LinkedAccountsProps = React.ComponentProps<typeof Card> & {
  accounts?: {
    id: string;
    provider: string;
    email?: string | null;
  }[];
};

export function LinkedAccounts({
  className,
  id = "linked-accounts",
  accounts,
  ...props
}: LinkedAccountsProps) {
  const router = useRouter();
  const googleAccount = accounts?.find((account) =>
    account.provider.toLowerCase().includes("google"),
  );
  const githubAccount = accounts?.find((account) =>
    account.provider.toLowerCase().includes("github"),
  );

  async function handleUnlinkAccount(providerId: string) {
    await unlinkAccount(
      {
        providerId,
      },
      {
        onRequest: () => {
          toast.loading("Unlinking account...");
        },
        onSuccess: () => {
          toast.dismiss();
          toast.success("Account disconnected successfully");
          router.refresh();
        },
        onError: (ctx) => {
          toast.dismiss();
          toast.error(
            <p className="font-bold">Failed to disconnect account</p>,
            {
              description: ctx.error.message,
              action: {
                label: "View",
                onClick: () => {
                  // TODO: Add a modal that shows the error details and contact to support
                  console.error("Error unlinking account", ctx.error);
                  toast.info("Error has been printed to console.");
                },
              },
            },
          );
        },
      },
    );
  }

  async function handleLinkAccount(provider: string) {
    await linkSocial(
      {
        provider,
        additionalData: {
          source: "profile",
        },
      },
      {
        onRequest: () => {
          toast.loading("Linking account...");
        },
        onSuccess: () => {
          toast.dismiss();
          toast.success("Account linked successfully");
          router.refresh();
        },
        onError: (ctx) => {
          toast.dismiss();
          toast.error(<p className="font-bold">Failed to link account</p>, {
            description: ctx.error.message,
            action: {
              label: "View",
              onClick: () => {
                // TODO: Add a modal that shows the error details and contact to support
                console.error("Error linking account", ctx.error);
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
        <CardTitle>Linked Accounts</CardTitle>
        <CardDescription>
          Connect your account with third-party providers
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Item variant="outline">
          <ItemMedia variant="icon" className="bg-black/80">
            <Google className="size-6" />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Google</ItemTitle>
            <ItemDescription>
              {googleAccount?.email ?? "Not linked"}
            </ItemDescription>
          </ItemContent>
          <ItemActions>
            {googleAccount ? (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Link2Off />
                    <span>Disconnect</span>
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will disconnect your Google account from your
                      account. This action is irreversible and you will need to
                      connect it again.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction asChild>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() =>
                          handleUnlinkAccount(googleAccount.provider)
                        }
                      >
                        Disconnect
                      </Button>
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleLinkAccount("google")}
              >
                <Link2 />
                <span>Connect</span>
              </Button>
            )}
          </ItemActions>
        </Item>
        <Item variant="outline">
          <ItemMedia variant="icon" className="bg-black/80">
            <GitHubDark className="size-6" />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>GitHub</ItemTitle>
            <ItemDescription>
              {githubAccount?.email ?? "Not linked"}
            </ItemDescription>
          </ItemContent>
          <ItemActions>
            {githubAccount ? (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Link2Off />
                    <span>Disconnect</span>
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will disconnect your GitHub account from your
                      account. This action is irreversible and you will need to
                      connect it again.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction asChild>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() =>
                          handleUnlinkAccount(githubAccount.provider)
                        }
                      >
                        Disconnect
                      </Button>
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleLinkAccount("github")}
              >
                <Link2 />
                <span>Connect</span>
              </Button>
            )}
          </ItemActions>
        </Item>
      </CardContent>
    </Card>
  );
}
