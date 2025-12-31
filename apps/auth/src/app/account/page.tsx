import {
  ActivityIcon,
  Eye,
  Grid3x3,
  Settings as SettingsIcon,
  Shield,
  User,
  User2,
} from "lucide-react";
import { redirect } from "next/navigation";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@portfolio/ui/components/avatar";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@portfolio/ui/components/tabs";

import { Activity } from "@/components/account/activity";
import { Applications } from "@/components/account/applications";
import { Privacy } from "@/components/account/privacy";
import { Profile } from "@/components/account/profile";
import { Security } from "@/components/account/security";
import { Settings } from "@/components/account/settings";
import { getSession } from "@/server/auth/server";

export default async function MyAccountPage() {
  const session = await getSession();

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage
                src={session.user.image ?? undefined}
                alt={session.user.name ?? ""}
              />
              <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                <User2 className="size-8" />
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="font-semibold text-3xl tracking-tight">
                My Account
              </h1>
              <p className="text-muted-foreground">
                Manage your identity and security settings
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid h-auto w-full grid-cols-3 gap-2 p-1 lg:grid-cols-6">
            <TabsTrigger value="profile" className="gap-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="gap-2">
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline">Security</span>
            </TabsTrigger>
            <TabsTrigger value="applications" className="gap-2">
              <Grid3x3 className="h-4 w-4" />
              <span className="hidden sm:inline">Applications</span>
            </TabsTrigger>
            <TabsTrigger value="privacy" className="gap-2">
              <Eye className="h-4 w-4" />
              <span className="hidden sm:inline">Privacy</span>
            </TabsTrigger>
            <TabsTrigger value="activity" className="gap-2">
              <ActivityIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Activity</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-2">
              <SettingsIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Settings</span>
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Profile />
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            <Security />
          </TabsContent>

          {/* Applications Tab */}
          <TabsContent value="applications" className="space-y-6">
            <Applications />
          </TabsContent>

          {/* Privacy Tab */}
          <TabsContent value="privacy" className="space-y-6">
            <Privacy />
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity" className="space-y-6">
            <Activity />
          </TabsContent>

          {/* Settings Tab (Danger Zone) */}
          <TabsContent value="settings" className="space-y-6">
            <Settings />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
