"use client";

import { useState } from "react";
import {
  Activity,
  BarChart3,
  CheckCircle,
  Clock,
  Download,
  TrendingDown,
  TrendingUp,
  XCircle,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart as RechartsPieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@portfolio/ui/components/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@portfolio/ui/components/tabs";

const performanceData = [
  {
    name: "Jan",
    executions: 4000,
    success: 3800,
    failed: 200,
    avgDuration: 45,
  },
  {
    name: "Feb",
    executions: 3000,
    success: 2850,
    failed: 150,
    avgDuration: 42,
  },
  {
    name: "Mar",
    executions: 5000,
    success: 4900,
    failed: 100,
    avgDuration: 38,
  },
  {
    name: "Apr",
    executions: 2780,
    success: 2650,
    failed: 130,
    avgDuration: 41,
  },
  { name: "May", executions: 1890, success: 1820, failed: 70, avgDuration: 39 },
  { name: "Jun", executions: 2390, success: 2300, failed: 90, avgDuration: 37 },
  { name: "Jul", executions: 3490, success: 3400, failed: 90, avgDuration: 35 },
];

const workflowDistribution = [
  { name: "Product Sync", value: 35, color: "#8b5cf6" },
  { name: "Data Processing", value: 25, color: "#3b82f6" },
  { name: "Notifications", value: 20, color: "#10b981" },
  { name: "Analytics", value: 15, color: "#f59e0b" },
  { name: "Other", value: 5, color: "#ef4444" },
];

const errorAnalysis = [
  { name: "Timeout", count: 45, percentage: 35 },
  { name: "API Error", count: 32, percentage: 25 },
  { name: "Data Validation", count: 28, percentage: 22 },
  { name: "Network", count: 15, percentage: 12 },
  { name: "Other", count: 8, percentage: 6 },
];

const kpiData = [
  {
    title: "Total Executions",
    value: "24,847",
    change: "+12.5%",
    trend: "up",
    icon: Activity,
    description: "This month",
  },
  {
    title: "Success Rate",
    value: "98.7%",
    change: "+0.3%",
    trend: "up",
    icon: CheckCircle,
    description: "Last 30 days",
  },
  {
    title: "Avg Duration",
    value: "38.2s",
    change: "-2.1s",
    trend: "up",
    icon: Clock,
    description: "Per execution",
  },
  {
    title: "Error Rate",
    value: "1.3%",
    change: "-0.2%",
    trend: "up",
    icon: XCircle,
    description: "Last 30 days",
  },
];

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("30d");

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-semibold text-2xl text-foreground">Analytics</h1>
          <p className="mt-1 text-muted-foreground">
            Monitor performance and gain insights into your workflows
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2 bg-transparent">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {kpiData.map((kpi, index) => (
          <Card key={index.toString()} className="border-border">
            <CardContent className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                  <kpi.icon className="h-5 w-5 text-muted-foreground" />
                </div>
                <div
                  className={`flex items-center gap-1 text-sm ${
                    kpi.trend === "up" ? "text-primary" : "text-destructive"
                  }`}
                >
                  {kpi.trend === "up" ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  {kpi.change}
                </div>
              </div>
              <div className="mb-1 font-semibold text-2xl text-foreground">
                {kpi.value}
              </div>
              <div className="text-muted-foreground text-sm">{kpi.title}</div>
              <div className="mt-1 text-muted-foreground/70 text-xs">
                {kpi.description}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="performance" className="space-y-6">
        <TabsList>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="workflows">Workflows</TabsTrigger>
          <TabsTrigger value="errors">Error Analysis</TabsTrigger>
          <TabsTrigger value="usage">Usage Patterns</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Execution Trends */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Execution Trends</CardTitle>
                <CardDescription>Workflow executions over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={performanceData}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        className="stroke-muted"
                      />
                      <XAxis
                        dataKey="name"
                        className="stroke-muted-foreground"
                        fontSize={12}
                      />
                      <YAxis
                        className="stroke-muted-foreground"
                        fontSize={12}
                      />
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
                        dataKey="executions"
                        stroke="hsl(var(--chart-1))"
                        fill="hsl(var(--chart-1))"
                        fillOpacity={0.1}
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Success vs Failed */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Success vs Failed</CardTitle>
                <CardDescription>Execution outcomes comparison</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={performanceData}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        className="stroke-muted"
                      />
                      <XAxis
                        dataKey="name"
                        className="stroke-muted-foreground"
                        fontSize={12}
                      />
                      <YAxis
                        className="stroke-muted-foreground"
                        fontSize={12}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                        }}
                      />
                      <Bar
                        dataKey="success"
                        fill="hsl(var(--chart-2))"
                        name="Success"
                      />
                      <Bar
                        dataKey="failed"
                        fill="hsl(var(--destructive))"
                        name="Failed"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Average Duration */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Average Execution Duration</CardTitle>
              <CardDescription>Performance trends over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      className="stroke-muted"
                    />
                    <XAxis
                      dataKey="name"
                      className="stroke-muted-foreground"
                      fontSize={12}
                    />
                    <YAxis className="stroke-muted-foreground" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="avgDuration"
                      stroke="hsl(var(--chart-3))"
                      strokeWidth={3}
                      dot={{
                        fill: "hsl(var(--chart-3))",
                        strokeWidth: 2,
                        r: 4,
                      }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="workflows" className="space-y-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Workflow Distribution */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Workflow Distribution</CardTitle>
                <CardDescription>
                  Execution breakdown by workflow type
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={workflowDistribution}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {workflowDistribution.map((entry, index) => (
                          <Cell
                            key={`cell-${index.toString()}`}
                            fill={entry.color}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Top Workflows */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Top Performing Workflows</CardTitle>
                <CardDescription>
                  Most executed workflows this month
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {workflowDistribution.map((workflow, index) => (
                    <div
                      key={index.toString()}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="h-3 w-3 rounded-full"
                          style={{ backgroundColor: workflow.color }}
                        />
                        <span className="font-medium text-foreground">
                          {workflow.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground text-sm">
                          {workflow.value}%
                        </span>
                        <Badge
                          variant="secondary"
                          className="bg-muted text-muted-foreground"
                        >
                          {Math.floor(workflow.value * 50)} runs
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="errors" className="space-y-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Error Types */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Error Types</CardTitle>
                <CardDescription>Most common error categories</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {errorAnalysis.map((error, index) => (
                    <div key={index.toString()} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-foreground">
                          {error.name}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground text-sm">
                            {error.count} errors
                          </span>
                          <span className="font-medium text-sm">
                            {error.percentage}%
                          </span>
                        </div>
                      </div>
                      <div className="h-2 w-full rounded-full bg-muted">
                        <div
                          className="h-2 rounded-full bg-destructive"
                          style={{ width: `${error.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Error Trends */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Error Trends</CardTitle>
                <CardDescription>Error rate over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={performanceData}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        className="stroke-muted"
                      />
                      <XAxis
                        dataKey="name"
                        className="stroke-muted-foreground"
                        fontSize={12}
                      />
                      <YAxis
                        className="stroke-muted-foreground"
                        fontSize={12}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="failed"
                        stroke="hsl(var(--destructive))"
                        strokeWidth={3}
                        dot={{
                          fill: "hsl(var(--destructive))",
                          strokeWidth: 2,
                          r: 4,
                        }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="usage" className="space-y-6">
          <div className="py-12 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <BarChart3 className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="mb-2 font-medium text-foreground text-lg">
              Usage Patterns Coming Soon
            </h3>
            <p className="text-muted-foreground">
              Advanced usage analytics and patterns will be available soon.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
