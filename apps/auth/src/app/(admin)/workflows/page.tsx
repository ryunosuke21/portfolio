"use client";

import { useState } from "react";
import {
  CheckCircle,
  Database,
  Filter,
  MoreHorizontal,
  Pause,
  Play,
  Plus,
  Search,
  XCircle,
  Zap,
} from "lucide-react";

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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@portfolio/ui/components/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@portfolio/ui/components/tabs";

import { admin } from "@/hooks/auth";

const workflows = [
  {
    id: 1,
    name: "Product Catalog Sync",
    description: "Synchronizes product data across all platforms",
    status: "active",
    lastRun: "2 minutes ago",
    nextRun: "In 58 minutes",
    runs: 1247,
    successRate: 98.7,
    avgDuration: "45s",
  },
  {
    id: 2,
    name: "Customer Webhook Listener",
    description: "Processes incoming customer events",
    status: "active",
    lastRun: "5 minutes ago",
    nextRun: "Continuous",
    runs: 3421,
    successRate: 99.2,
    avgDuration: "12s",
  },
  {
    id: 3,
    name: "Data Enrichment Pipeline",
    description: "Enriches customer data with external sources",
    status: "paused",
    lastRun: "2 hours ago",
    nextRun: "Paused",
    runs: 892,
    successRate: 94.3,
    avgDuration: "2m 15s",
  },
  {
    id: 4,
    name: "Analytics Refresh",
    description: "Updates analytics dashboards and reports",
    status: "active",
    lastRun: "18 minutes ago",
    nextRun: "In 42 minutes",
    runs: 567,
    successRate: 99.8,
    avgDuration: "1m 8s",
  },
  {
    id: 5,
    name: "Billing Reconciliation",
    description: "Reconciles billing data with payment providers",
    status: "error",
    lastRun: "1 hour ago",
    nextRun: "Retry in 15m",
    runs: 234,
    successRate: 87.2,
    avgDuration: "3m 22s",
  },
];

const recentRuns = [
  {
    id: 6734,
    workflow: "Product Catalog Sync",
    status: "running",
    duration: "45s",
    started: "2 min ago",
  },
  {
    id: 6733,
    workflow: "Customer Webhook Listener",
    status: "success",
    duration: "12s",
    started: "5 min ago",
  },
  {
    id: 6732,
    workflow: "Analytics Refresh",
    status: "success",
    duration: "1m 8s",
    started: "18 min ago",
  },
  {
    id: 6731,
    workflow: "Data Enrichment Pipeline",
    status: "failed",
    duration: "2m 15s",
    started: "2 hrs ago",
  },
  {
    id: 6730,
    workflow: "Billing Reconciliation",
    status: "success",
    duration: "3m 22s",
    started: "1 hr ago",
  },
];

export default function WorkflowsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-semibold text-2xl text-foreground">Workflows</h1>
          <p className="mt-1 text-muted-foreground">
            Manage and monitor your automation workflows
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2 bg-transparent">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button className="gap-2 bg-primary hover:bg-primary/90">
            <Plus className="h-4 w-4" />
            New Workflow
          </Button>
        </div>
      </div>

      {/* Search and Stats */}
      <div className="flex items-center gap-4">
        <div className="relative max-w-md flex-1">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
          <Input
            placeholder="Search workflows..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex items-center gap-6 text-muted-foreground text-sm">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-primary" />
            <span>4 Active</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-muted-foreground" />
            <span>1 Paused</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-destructive" />
            <span>1 Error</span>
          </div>
        </div>
      </div>

      <Tabs defaultValue="workflows" className="space-y-6">
        <TabsList>
          <TabsTrigger value="workflows">All Workflows</TabsTrigger>
          <TabsTrigger value="runs">Recent Runs</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="workflows" className="space-y-6">
          {/* Workflows Grid */}
          <div className="grid gap-6">
            {workflows.map((workflow) => (
              <Card key={workflow.id} className="border-border">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="mb-2 flex items-center gap-3">
                        <h3 className="font-semibold text-foreground">
                          {workflow.name}
                        </h3>
                        <Badge
                          variant="secondary"
                          className={
                            workflow.status === "active"
                              ? "bg-primary/10 text-primary"
                              : workflow.status === "paused"
                                ? "bg-muted text-muted-foreground"
                                : "bg-destructive/10 text-destructive"
                          }
                        >
                          {workflow.status === "active" && (
                            <CheckCircle className="mr-1 h-3 w-3" />
                          )}
                          {workflow.status === "paused" && (
                            <Pause className="mr-1 h-3 w-3" />
                          )}
                          {workflow.status === "error" && (
                            <XCircle className="mr-1 h-3 w-3" />
                          )}
                          {workflow.status.charAt(0).toUpperCase() +
                            workflow.status.slice(1)}
                        </Badge>
                      </div>
                      <p className="mb-4 text-muted-foreground text-sm">
                        {workflow.description}
                      </p>

                      <div className="grid grid-cols-2 gap-4 text-sm md:grid-cols-4">
                        <div>
                          <span className="text-muted-foreground">
                            Last Run
                          </span>
                          <div className="font-medium">{workflow.lastRun}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">
                            Next Run
                          </span>
                          <div className="font-medium">{workflow.nextRun}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">
                            Success Rate
                          </span>
                          <div className="font-medium">
                            {workflow.successRate}%
                          </div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">
                            Avg Duration
                          </span>
                          <div className="font-medium">
                            {workflow.avgDuration}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {workflow.status === "active" && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="gap-2 bg-transparent"
                        >
                          <Pause className="h-3 w-3" />
                          Pause
                        </Button>
                      )}
                      {workflow.status === "paused" && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="gap-2 bg-transparent"
                        >
                          <Play className="h-3 w-3" />
                          Resume
                        </Button>
                      )}
                      {workflow.status === "error" && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="gap-2 bg-transparent"
                        >
                          <Zap className="h-3 w-3" />
                          Retry
                        </Button>
                      )}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="sm" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Edit Workflow</DropdownMenuItem>
                          <DropdownMenuItem>View Logs</DropdownMenuItem>
                          <DropdownMenuItem>Duplicate</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="runs" className="space-y-6">
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Recent Workflow Runs</CardTitle>
              <CardDescription>
                Monitor the latest workflow executions
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted">
                    <TableHead>Run ID</TableHead>
                    <TableHead>Workflow</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Started</TableHead>
                    <TableHead className="w-12" />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentRuns.map((run) => (
                    <TableRow key={run.id} className="hover:bg-muted">
                      <TableCell className="font-mono">{run.id}</TableCell>
                      <TableCell className="font-medium">
                        {run.workflow}
                      </TableCell>
                      <TableCell>
                        {run.status === "running" && (
                          <Badge
                            variant="secondary"
                            className="bg-primary/10 text-primary"
                          >
                            <div className="mr-2 h-2 w-2 animate-pulse rounded-full bg-primary" />
                            Running
                          </Badge>
                        )}
                        {run.status === "success" && (
                          <Badge
                            variant="secondary"
                            className="bg-primary/10 text-primary"
                          >
                            <CheckCircle className="mr-1 h-3 w-3" />
                            Success
                          </Badge>
                        )}
                        {run.status === "failed" && (
                          <Badge
                            variant="secondary"
                            className="bg-destructive/10 text-destructive"
                          >
                            <XCircle className="mr-1 h-3 w-3" />
                            Failed
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>{run.duration}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {run.started}
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
                            <DropdownMenuItem>View Logs</DropdownMenuItem>
                            <DropdownMenuItem>Re-run</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <div className="py-12 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <Database className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="mb-2 font-medium text-foreground text-lg">
              No Templates Yet
            </h3>
            <p className="mb-4 text-muted-foreground">
              Create reusable workflow templates to speed up your automation.
            </p>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" />
              Create Template
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
