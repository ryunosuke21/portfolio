"use client";

import { useState } from "react";
import {
  Calendar,
  Clock,
  Crown,
  Edit,
  Mail,
  MoreHorizontal,
  Search,
  Settings,
  Shield,
  Trash2,
  User,
  UserPlus,
} from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@portfolio/ui/components/avatar";
import { Badge } from "@portfolio/ui/components/badge";
import { Button } from "@portfolio/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@portfolio/ui/components/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@portfolio/ui/components/dropdown-menu";
import { Input } from "@portfolio/ui/components/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@portfolio/ui/components/tabs";

const teamMembers = [
  {
    id: 1,
    name: "Alex Evans",
    email: "alex@company.com",
    role: "Owner",
    status: "online",
    avatar: "/placeholder.svg?height=40&width=40",
    joinDate: "Jan 2023",
    lastActive: "Now",
    permissions: ["admin", "workflows", "analytics", "billing"],
    workflowsCreated: 23,
    isOwner: true,
  },
  {
    id: 2,
    name: "Clara Blackwood",
    email: "clara@company.com",
    role: "Engineer",
    status: "online",
    avatar: "/placeholder.svg?height=40&width=40",
    joinDate: "Mar 2023",
    lastActive: "5 minutes ago",
    permissions: ["workflows", "analytics"],
    workflowsCreated: 18,
    isOwner: false,
  },
  {
    id: 3,
    name: "Michael Whitmore",
    email: "michael@company.com",
    role: "Manager",
    status: "away",
    avatar: "/placeholder.svg?height=40&width=40",
    joinDate: "Feb 2023",
    lastActive: "2 hours ago",
    permissions: ["workflows", "analytics", "team"],
    workflowsCreated: 31,
    isOwner: false,
  },
  {
    id: 4,
    name: "Dennis Brightwood",
    email: "dennis@company.com",
    role: "Engineer",
    status: "offline",
    avatar: "/placeholder.svg?height=40&width=40",
    joinDate: "Apr 2023",
    lastActive: "Yesterday",
    permissions: ["workflows"],
    workflowsCreated: 12,
    isOwner: false,
  },
  {
    id: 5,
    name: "Sarah Chen",
    email: "sarah@company.com",
    role: "Designer",
    status: "online",
    avatar: "/placeholder.svg?height=40&width=40",
    joinDate: "May 2023",
    lastActive: "1 hour ago",
    permissions: ["workflows"],
    workflowsCreated: 7,
    isOwner: false,
  },
];

const invitations = [
  {
    id: 1,
    email: "john@company.com",
    role: "Engineer",
    invitedBy: "Alex Evans",
    invitedDate: "2 days ago",
    status: "pending",
  },
  {
    id: 2,
    email: "lisa@company.com",
    role: "Manager",
    invitedBy: "Michael Whitmore",
    invitedDate: "1 week ago",
    status: "pending",
  },
];

const roles = [
  {
    name: "Owner",
    description: "Full access to all features and billing",
    permissions: ["admin", "workflows", "analytics", "billing", "team"],
    color: "bg-primary/10 text-primary",
  },
  {
    name: "Manager",
    description: "Can manage workflows and team members",
    permissions: ["workflows", "analytics", "team"],
    color: "bg-primary/10 text-primary",
  },
  {
    name: "Engineer",
    description: "Can create and manage workflows",
    permissions: ["workflows", "analytics"],
    color: "bg-primary/10 text-primary",
  },
  {
    name: "Designer",
    description: "Can create workflows and view analytics",
    permissions: ["workflows"],
    color: "bg-muted text-muted-foreground",
  },
];

export default function TeamPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMembers = teamMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-primary";
      case "away":
        return "bg-muted-foreground";
      case "offline":
        return "bg-muted-foreground";
      default:
        return "bg-muted-foreground";
    }
  };

  const getRoleColor = (role: string) => {
    const roleConfig = roles.find((r) => r.name === role);
    return roleConfig?.color || "bg-muted text-muted-foreground";
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-semibold text-2xl text-foreground">Team</h1>
          <p className="mt-1 text-muted-foreground">
            Manage your team members and their permissions
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2 bg-transparent">
            <Settings className="h-4 w-4" />
            Settings
          </Button>
          <Button className="gap-2 bg-primary hover:bg-primary/90">
            <UserPlus className="h-4 w-4" />
            Invite Member
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
        <Input
          placeholder="Search team members..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      <Tabs defaultValue="members" className="space-y-6">
        <TabsList>
          <TabsTrigger value="members">Team Members</TabsTrigger>
          <TabsTrigger value="invitations">Invitations</TabsTrigger>
          <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
        </TabsList>

        <TabsContent value="members" className="space-y-6">
          {/* Team Stats */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
            <Card className="border-border">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-2xl text-foreground">
                      {teamMembers.length}
                    </div>
                    <div className="text-muted-foreground text-sm">Total Members</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-2xl text-foreground">
                      {teamMembers.filter((m) => m.status === "online").length}
                    </div>
                    <div className="text-muted-foreground text-sm">Online Now</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Crown className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-2xl text-foreground">
                      {
                        teamMembers.filter(
                          (m) => m.role === "Owner" || m.role === "Manager",
                        ).length
                      }
                    </div>
                    <div className="text-muted-foreground text-sm">Admins</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                    <UserPlus className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <div className="font-semibold text-2xl text-foreground">
                      {invitations.length}
                    </div>
                    <div className="text-muted-foreground text-sm">Pending Invites</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Team Members List */}
          <div className="grid gap-4">
            {filteredMembers.map((member) => (
              <Card key={member.id} className="border-border">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <Avatar className="h-12 w-12">
                          <AvatarImage
                            src={member.avatar || "/placeholder.svg"}
                          />
                          <AvatarFallback>
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div
                          className={`absolute -right-1 -bottom-1 h-4 w-4 rounded-full border-2 border-background ${getStatusColor(member.status)}`}
                        />
                      </div>

                      <div className="flex-1">
                        <div className="mb-1 flex items-center gap-2">
                          <h3 className="font-semibold text-foreground">
                            {member.name}
                          </h3>
                          {member.isOwner && (
                            <Crown className="h-4 w-4 text-primary" />
                          )}
                          <Badge
                            variant="secondary"
                            className={getRoleColor(member.role)}
                          >
                            {member.role}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-muted-foreground text-sm">
                          <div className="flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {member.email}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            Joined {member.joinDate}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {member.lastActive}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="font-medium text-foreground text-sm">
                          {member.workflowsCreated} workflows
                        </div>
                        <div className="text-muted-foreground/70 text-xs">created</div>
                      </div>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <User className="mr-2 h-4 w-4" />
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Mail className="mr-2 h-4 w-4" />
                            Send Message
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Role
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {!member.isOwner && (
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Remove Member
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="invitations" className="space-y-6">
          {invitations.length > 0 ? (
            <div className="grid gap-4">
              {invitations.map((invitation) => (
                <Card key={invitation.id} className="border-border">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                          <Mail className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">
                            {invitation.email}
                          </h3>
                          <div className="flex items-center gap-4 text-muted-foreground text-sm">
                            <span>Role: {invitation.role}</span>
                            <span>Invited by {invitation.invitedBy}</span>
                            <span>{invitation.invitedDate}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Badge
                          variant="secondary"
                          className="bg-muted text-muted-foreground"
                        >
                          Pending
                        </Badge>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Mail className="mr-2 h-4 w-4" />
                              Resend Invitation
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Cancel Invitation
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <UserPlus className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="mb-2 font-medium text-foreground text-lg">
                No Pending Invitations
              </h3>
              <p className="mb-4 text-muted-foreground">
                All team invitations have been accepted or expired.
              </p>
              <Button className="bg-primary hover:bg-primary/90">
                <UserPlus className="mr-2 h-4 w-4" />
                Invite New Member
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="roles" className="space-y-6">
          <div className="grid gap-6">
            {roles.map((role, index) => (
              <Card key={index.toString()} className="border-border">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Badge variant="secondary" className={role.color}>
                          {role.name}
                        </Badge>
                      </CardTitle>
                      <CardDescription className="mt-2">
                        {role.description}
                      </CardDescription>
                    </div>
                    <div className="text-muted-foreground text-sm">
                      {teamMembers.filter((m) => m.role === role.name).length}{" "}
                      members
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <h4 className="font-medium text-foreground">Permissions:</h4>
                    <div className="flex flex-wrap gap-2">
                      {role.permissions.map((permission, permIndex) => (
                        <Badge
                          key={permIndex.toString()}
                          variant="outline"
                          className="text-xs"
                        >
                          <Shield className="mr-1 h-3 w-3" />
                          {permission}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
