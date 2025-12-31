"use client";

import { useState } from "react";
import {
  Calendar,
  Copy,
  Database,
  Download,
  Eye,
  Filter,
  Globe,
  Mail,
  MoreHorizontal,
  Plus,
  Search,
  ShoppingCart,
  Star,
  Users,
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@portfolio/ui/components/tabs";

const templates = [
  {
    id: 1,
    name: "E-commerce Order Processing",
    description:
      "Automated workflow for processing new orders, updating inventory, and sending notifications",
    category: "E-commerce",
    icon: ShoppingCart,
    rating: 4.8,
    downloads: 1247,
    tags: ["orders", "inventory", "notifications"],
    author: "Emma's Team",
    featured: true,
  },
  {
    id: 2,
    name: "Customer Onboarding",
    description:
      "Welcome new customers with automated email sequences and account setup",
    category: "CRM",
    icon: Users,
    rating: 4.6,
    downloads: 892,
    tags: ["onboarding", "email", "crm"],
    author: "Sarah Chen",
    featured: false,
  },
  {
    id: 3,
    name: "Data Backup & Sync",
    description:
      "Automatically backup and synchronize data across multiple platforms",
    category: "Data",
    icon: Database,
    rating: 4.9,
    downloads: 2156,
    tags: ["backup", "sync", "data"],
    author: "Michael Torres",
    featured: true,
  },
  {
    id: 4,
    name: "Social Media Publisher",
    description:
      "Schedule and publish content across multiple social media platforms",
    category: "Marketing",
    icon: Globe,
    rating: 4.5,
    downloads: 634,
    tags: ["social", "publishing", "marketing"],
    author: "Emma Wilson",
    featured: false,
  },
  {
    id: 5,
    name: "Email Campaign Automation",
    description:
      "Create and manage automated email marketing campaigns with analytics",
    category: "Marketing",
    icon: Mail,
    rating: 4.7,
    downloads: 1089,
    tags: ["email", "marketing", "automation"],
    author: "David Kim",
    featured: false,
  },
  {
    id: 6,
    name: "Meeting Scheduler",
    description:
      "Automatically schedule meetings and send calendar invites to participants",
    category: "Productivity",
    icon: Calendar,
    rating: 4.4,
    downloads: 567,
    tags: ["meetings", "calendar", "scheduling"],
    author: "Lisa Rodriguez",
    featured: false,
  },
];

const categories = [
  { name: "All", count: templates.length },
  {
    name: "E-commerce",
    count: templates.filter((t) => t.category === "E-commerce").length,
  },
  { name: "CRM", count: templates.filter((t) => t.category === "CRM").length },
  {
    name: "Data",
    count: templates.filter((t) => t.category === "Data").length,
  },
  {
    name: "Marketing",
    count: templates.filter((t) => t.category === "Marketing").length,
  },
  {
    name: "Productivity",
    count: templates.filter((t) => t.category === "Productivity").length,
  },
];

export default function TemplatesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    const matchesCategory =
      selectedCategory === "All" || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredTemplates = templates.filter((t) => t.featured);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-semibold text-2xl text-foreground">Templates</h1>
          <p className="mt-1 text-muted-foreground">
            Discover and use pre-built workflow templates
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2 bg-transparent">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button className="gap-2 bg-primary hover:bg-primary/90">
            <Plus className="h-4 w-4" />
            Create Template
          </Button>
        </div>
      </div>

      {/* Search and Categories */}
      <div className="space-y-4">
        <div className="relative max-w-md">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
          <Input
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category.name}
              variant={
                selectedCategory === category.name ? "default" : "outline"
              }
              size="sm"
              onClick={() => setSelectedCategory(category.name)}
              className={
                selectedCategory === category.name
                  ? "bg-primary hover:bg-primary/90"
                  : ""
              }
            >
              {category.name} ({category.count})
            </Button>
          ))}
        </div>
      </div>

      <Tabs defaultValue="browse" className="space-y-6">
        <TabsList>
          <TabsTrigger value="browse">Browse Templates</TabsTrigger>
          <TabsTrigger value="featured">Featured</TabsTrigger>
          <TabsTrigger value="my-templates">My Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="space-y-6">
          {/* Templates Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredTemplates.map((template) => (
              <Card
                key={template.id}
                className="border-border transition-shadow hover:shadow-md"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <template.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">
                          {template.name}
                        </CardTitle>
                        <div className="mt-1 flex items-center gap-2">
                          <Badge variant="secondary" className="text-xs">
                            {template.category}
                          </Badge>
                          {template.featured && (
                            <Badge
                              variant="secondary"
                              className="bg-muted text-xs text-muted-foreground"
                            >
                              <Star className="mr-1 h-3 w-3" />
                              Featured
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          Preview
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Copy className="mr-2 h-4 w-4" />
                          Use Template
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Star className="mr-2 h-4 w-4" />
                          Add to Favorites
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4 line-clamp-2">
                    {template.description}
                  </CardDescription>

                  <div className="mb-4 flex flex-wrap gap-1">
                    {template.tags.map((tag, index) => (
                      <Badge
                        key={index.toString()}
                        variant="outline"
                        className="text-xs"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="mb-4 flex items-center justify-between text-muted-foreground text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-muted-foreground text-muted-foreground" />
                      <span>{template.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Download className="h-4 w-4" />
                      <span>{template.downloads.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm">
                      by {template.author}
                    </span>
                    <Button
                      size="sm"
                      className="bg-primary hover:bg-primary/90"
                    >
                      <Zap className="mr-1 h-3 w-3" />
                      Use Template
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredTemplates.length === 0 && (
            <div className="py-12 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="mb-2 font-medium text-foreground text-lg">
                No templates found
              </h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="featured" className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredTemplates.map((template) => (
              <Card
                key={template.id}
                className="border-border transition-shadow hover:shadow-md"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <template.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">
                          {template.name}
                        </CardTitle>
                        <div className="mt-1 flex items-center gap-2">
                          <Badge variant="secondary" className="text-xs">
                            {template.category}
                          </Badge>
                          <Badge
                            variant="secondary"
                            className="bg-muted text-xs text-muted-foreground"
                          >
                            <Star className="mr-1 h-3 w-3" />
                            Featured
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">
                    {template.description}
                  </CardDescription>

                  <div className="mb-4 flex items-center justify-between text-muted-foreground text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-muted-foreground text-muted-foreground" />
                      <span>{template.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Download className="h-4 w-4" />
                      <span>{template.downloads.toLocaleString()}</span>
                    </div>
                  </div>

                  <Button className="w-full bg-primary hover:bg-primary/90">
                    <Zap className="mr-2 h-4 w-4" />
                    Use Template
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="my-templates" className="space-y-6">
          <div className="py-12 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <Database className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="mb-2 font-medium text-foreground text-lg">
              No Custom Templates
            </h3>
            <p className="mb-4 text-muted-foreground">
              Create your first custom template to reuse your workflows.
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
