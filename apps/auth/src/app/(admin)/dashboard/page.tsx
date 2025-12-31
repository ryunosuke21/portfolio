"use client";

import { useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Bell,
  CheckCircle,
  ChevronDown,
  Clock,
  Database,
  Eye,
  Filter,
  Home,
  MoreHorizontal,
  Plus,
  RefreshCw,
  Search,
  Settings,
  TrendingDown,
  TrendingUp,
  Users,
  Workflow,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@portfolio/ui/components/dropdown-menu";
import { Input } from "@portfolio/ui/components/input";
import { Progress } from "@portfolio/ui/components/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@portfolio/ui/components/table";
import { Tabs, TabsList, TabsTrigger } from "@portfolio/ui/components/tabs";

// Sample data
const metricsData = [
  {
    label: "Total Workflows",
    value: "237",
    change: "+12%",
    trend: "up",
    icon: Workflow,
  },
  {
    label: "Success Rate",
    value: "98.7%",
    change: "+0.3%",
    trend: "up",
    icon: CheckCircle,
  },
  {
    label: "Avg Response",
    value: "38s",
    change: "-2.1s",
    trend: "up",
    icon: Clock,
  },
  {
    label: "Active Users",
    value: "1,423",
    change: "+8.2%",
    trend: "up",
    icon: Users,
  },
];

const workflowData = [
  {
    id: 6734,
    name: "Product Catalog Sync",
    started: "22 Jun 2025, 10:48",
    duration: "45.2s",
    status: "running",
    error: null,
  },
  {
    id: 6733,
    name: "Customer Webhook Listener",
    started: "22 Jun 2025, 10:12",
    duration: "30s",
    status: "success",
    error: null,
  },
  {
    id: 6732,
    name: "Data Enrichment Pipeline",
    started: "22 Jun 2025, 09:45",
    duration: "2m 15s",
    status: "success",
    error: null,
  },
  {
    id: 6731,
    name: "Analytics Refresh",
    started: "22 Jun 2025, 09:30",
    duration: "1m 8s",
    status: "success",
    error: null,
  },
  {
    id: 6730,
    name: "Billing Reconciliation",
    started: "22 Jun 2025, 09:15",
    duration: "3m 22s",
    status: "success",
    error: null,
  },
  {
    id: 6729,
    name: "Inventory Level Sync",
    started: "22 Jun 2025, 08:58",
    duration: "45s",
    status: "failed",
    error: "HTTP Error 404: Not Found",
  },
  {
    id: 6728,
    name: "KYC Data Update",
    started: "22 Jun 2025, 08:45",
    duration: "1m 12s",
    status: "success",
    error: null,
  },
  {
    id: 6727,
    name: "Monthly Log Archiver",
    started: "22 Jun 2025, 08:30",
    duration: "4m 33s",
    status: "success",
    error: null,
  },
];

const chartData = [
  { name: "Jan", sales: 4000, views: 2400, workflows: 240 },
  { name: "Feb", sales: 3000, views: 1398, workflows: 221 },
  { name: "Mar", sales: 2000, views: 9800, workflows: 229 },
  { name: "Apr", sales: 2780, views: 3908, workflows: 200 },
  { name: "May", sales: 1890, views: 4800, workflows: 218 },
  { name: "Jun", sales: 2390, views: 3800, workflows: 250 },
  { name: "Jul", sales: 3490, views: 4300, workflows: 210 },
];

const teamMembers = [
  {
    name: "Clara Blackwood",
    role: "Engineer",
    status: "online",
    avatar: "/placeholder.svg?height=32&width=32",
    availability: "On-call",
  },
  {
    name: "Michael Whitmore",
    role: "Owner",
    status: "online",
    avatar: "/placeholder.svg?height=32&width=32",
    availability: "Available",
  },
  {
    name: "Dennis Brightwood",
    role: "Engineer",
    status: "away",
    avatar: "/placeholder.svg?height=32&width=32",
    availability: "Available in 2hrs",
  },
  {
    name: "Sarah Chen",
    role: "Designer",
    status: "online",
    avatar: "/placeholder.svg?height=32&width=32",
    availability: "In meeting",
  },
];

const recentActivity = [
  {
    workflow: "Product Catalog Sync",
    time: "2 minutes ago",
    status: "success",
    duration: "45s",
  },
  {
    workflow: "Customer Webhook",
    time: "5 minutes ago",
    status: "success",
    duration: "30s",
  },
  {
    workflow: "Data Enrichment",
    time: "12 minutes ago",
    status: "success",
    duration: "2m 15s",
  },
  {
    workflow: "Analytics Refresh",
    time: "18 minutes ago",
    status: "success",
    duration: "1m 8s",
  },
  {
    workflow: "Inventory Sync",
    time: "32 minutes ago",
    status: "failed",
    duration: "45s",
  },
];

export default function Dashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("Last 30 days");

  return (
    <div className="min-h-screen bg-background">
      <div className="mb-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="font-semibold text-2xl text-foreground">
              Dashboard Overview
            </h1>
            <p className="mt-1 text-muted-foreground">
              Monitor your workflows and system performance
            </p>
          </div>
          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2 bg-transparent">
                  {selectedPeriod} <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={() => setSelectedPeriod("Last 7 days")}
                >
                  Last 7 days
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setSelectedPeriod("Last 30 days")}
                >
                  Last 30 days
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setSelectedPeriod("Last 90 days")}
                >
                  Last 90 days
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" />
              New Workflow
            </Button>
          </div>
        </div>

        {/* Quick Action Cards */}
        <div className="mb-8 grid grid-cols-3 gap-4">
          <Card className="cursor-pointer border-border p-6 transition-shadow hover:shadow-md">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
                <Plus className="h-6 w-6 text-muted-foreground" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">New workflow</h3>
                <p className="text-muted-foreground text-sm">Create a new automation</p>
              </div>
            </div>
          </Card>

          <Card className="cursor-pointer border-border p-6 transition-shadow hover:shadow-md">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-destructive/10">
                <AlertTriangle className="h-6 w-6 text-destructive" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">View breaches</h3>
                <p className="text-muted-foreground text-sm">Check failed workflows</p>
              </div>
            </div>
          </Card>

          <Card className="cursor-pointer border-border p-6 transition-shadow hover:shadow-md">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <RefreshCw className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">
                  Re-run last failed
                </h3>
                <p className="text-muted-foreground text-sm">Retry failed executions</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Metrics Overview */}
      <div className="mb-8 grid grid-cols-4 gap-6">
        {metricsData.map((metric, index) => (
          <Card key={index.toString()} className="border-border">
            <CardContent className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                  <metric.icon className="h-5 w-5 text-muted-foreground" />
                </div>
                <div
                  className={`flex items-center gap-1 text-sm ${metric.trend === "up" ? "text-primary" : "text-destructive"}`}
                >
                  {metric.trend === "up" ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  {metric.change}
                </div>
              </div>
              <div className="mb-1 font-semibold text-2xl text-foreground">
                {metric.value}
              </div>
              <div className="text-muted-foreground text-sm">{metric.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="col-span-2 space-y-8">
          {/* Charts Section */}
          <Card className="border-border">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="font-semibold text-lg">
                    Performance Analytics
                  </CardTitle>
                  <CardDescription>
                    Workflow execution trends and system metrics
                  </CardDescription>
                </div>
                <Tabs defaultValue="workflows" className="w-auto">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="workflows">Workflows</TabsTrigger>
                    <TabsTrigger value="sales">Sales</TabsTrigger>
                    <TabsTrigger value="views">Views</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="name" className="stroke-muted-foreground" fontSize={12} />
                    <YAxis className="stroke-muted-foreground" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="workflows"
                      stroke="hsl(var(--chart-1))"
                      fill="hsl(var(--chart-1))"
                      fillOpacity={0.1}
                      strokeWidth={2}
                    />
                    <Area
                      type="monotone"
                      dataKey="sales"
                      stroke="hsl(var(--chart-2))"
                      fill="hsl(var(--chart-2))"
                      fillOpacity={0.1}
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Workflow Status Table */}
          <Card className="border-border">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="font-semibold text-lg">
                    Recent Workflow Runs
                  </CardTitle>
                  <CardDescription>
                    Monitor your workflow executions and performance
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    <Eye className="mr-2 h-4 w-4" />
                    View All
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted">
                    <TableHead className="font-medium text-foreground">
                      Run ID
                    </TableHead>
                    <TableHead className="font-medium text-foreground">
                      Workflow
                    </TableHead>
                    <TableHead className="font-medium text-foreground">
                      Started
                    </TableHead>
                    <TableHead className="font-medium text-foreground">
                      Duration
                    </TableHead>
                    <TableHead className="font-medium text-foreground">
                      Status
                    </TableHead>
                    <TableHead className="font-medium text-foreground">
                      Error
                    </TableHead>
                    <TableHead className="w-12 font-medium text-foreground" />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {workflowData.map((workflow) => (
                    <TableRow key={workflow.id} className="hover:bg-muted">
                      <TableCell className="font-mono text-sm">
                        {workflow.id}
                      </TableCell>
                      <TableCell className="font-medium">
                        {workflow.name}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {workflow.started}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {workflow.duration}
                      </TableCell>
                      <TableCell>
                        {workflow.status === "running" && (
                          <Badge
                            variant="secondary"
                            className="bg-primary/10 text-primary"
                          >
                            <div className="mr-2 h-2 w-2 animate-pulse rounded-full bg-primary" />
                            Running
                          </Badge>
                        )}
                        {workflow.status === "success" && (
                          <Badge
                            variant="secondary"
                            className="bg-primary/10 text-primary"
                          >
                            <CheckCircle className="mr-1 h-3 w-3" />
                            Success
                          </Badge>
                        )}
                        {workflow.status === "failed" && (
                          <Badge
                            variant="secondary"
                            className="bg-destructive/10 text-destructive"
                          >
                            <XCircle className="mr-1 h-3 w-3" />
                            Failed
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="max-w-48 truncate text-muted-foreground">
                        {workflow.error || "None"}
                      </TableCell>
                      <TableCell>
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
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Re-run</DropdownMenuItem>
                            <DropdownMenuItem>View Logs</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              Cancel
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Account Balance */}
          <Card className="border-border">
            <CardHeader className="pb-4">
              <CardTitle className="font-semibold text-lg">
                Account Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4 font-semibold text-3xl text-foreground">
                $1,423.25
              </div>
              <div className="mb-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground text-sm">Monthly Credits</span>
                  <span className="font-medium text-sm">$500.00</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground text-sm">
                    Usage This Month
                  </span>
                  <span className="font-medium text-sm">$76.75</span>
                </div>
                <Progress value={15} className="h-2" />
              </div>
              <div className="flex gap-2">
                <Button size="sm" className="flex-1">
                  Add Credit
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 bg-transparent"
                >
                  Transfer
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="border-border">
            <CardHeader className="pb-4">
              <CardTitle className="font-semibold text-lg">
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-0">
                {recentActivity.map((activity, index) => (
                  <div
                    key={index.toString()}
                    className="flex items-center gap-3 border-border border-b p-4 last:border-b-0 hover:bg-muted"
                  >
                    <div
                      className={`h-2 w-2 rounded-full ${activity.status === "success" ? "bg-primary" : "bg-destructive"}`}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="truncate font-medium text-foreground text-sm">
                        {activity.workflow}
                      </div>
                      <div className="text-muted-foreground text-xs">
                        {activity.time} • {activity.duration}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Team Status */}
          <Card className="border-border">
            <CardHeader className="pb-4">
              <CardTitle className="font-semibold text-lg">
                Team Status
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-0">
                {teamMembers.map((member, index) => (
                  <div
                    key={index.toString()}
                    className="flex items-center gap-3 border-border border-b p-4 last:border-b-0 hover:bg-muted"
                  >
                    <div className="relative">
                      <Avatar className="h-8 w-8">
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
                        className={`absolute -right-0.5 -bottom-0.5 h-3 w-3 rounded-full border-2 border-background ${
                          member.status === "online"
                            ? "bg-primary"
                            : "bg-muted-foreground"
                        }`}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-foreground text-sm">
                        {member.name}
                      </div>
                      <div className="text-muted-foreground text-xs">
                        {member.role} • {member.availability}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
