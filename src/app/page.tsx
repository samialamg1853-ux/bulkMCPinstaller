"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Download, Zap, Shield, Users, ArrowRight, CheckCircle, TrendingUp } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MCP Directory - Setup Multiple MCPs in Minutes, Not Hours",
  description: "The ultimate directory for Model Context Protocol configurations. Discover, bundle, and deploy verified MCPs with one-click installation. Streamline your AI workflow setup across VS Code, Cursor, Windsurf, and more.",
  keywords: "MCP, Model Context Protocol, AI tools, automation, package manager, one-click install, AI workflow, development tools, productivity, VS Code, Cursor, Windsurf",
  openGraph: {
    title: "MCP Directory - Setup Multiple MCPs in Minutes",
    description: "Discover, bundle, and deploy Model Context Protocol configurations with one-click installation",
    type: "website",
    url: "https://mcp-directory.com",
  },
};

export default function Page() {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="container px-4 py-16 mx-auto text-center">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <Badge variant="secondary" className="text-sm">
              <TrendingUp className="h-4 w-4 mr-1" />
              Trusted by 12,000+ developers
            </Badge>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Setup Multiple MCPs in{" "}
            <span className="text-primary">Minutes</span>, Not Hours
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Discover, bundle, and deploy Model Context Protocol configurations with our one-click installation process. 
            Join thousands of AI enthusiasts building better workflows across VS Code, Cursor, Windsurf, and more.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8" asChild>
              <Link href="/browse">
                Explore MCPs
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8" asChild>
              <Link href="/docs">
                View Documentation
              </Link>
            </Button>
          </div>
          <div className="flex justify-center items-center gap-6 mt-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>1,200+ verified MCPs</span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>7 supported stacks</span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Free forever</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container px-4 py-16 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose MCP Directory?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            The most comprehensive platform for Model Context Protocol management
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Zap className="h-12 w-12 mx-auto mb-4 text-primary" />
              <CardTitle>One-Click Installation</CardTitle>
              <CardDescription>
                Deploy multiple MCPs instantly with our automated setup process. No manual configuration required.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" size="sm" asChild>
                <Link href="/packages">Try Package Builder</Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Shield className="h-12 w-12 mx-auto mb-4 text-primary" />
              <CardTitle>Verified & Secure</CardTitle>
              <CardDescription>
                All MCPs are reviewed and verified by our community for safety, quality, and compatibility.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" size="sm" asChild>
                <Link href="/community">Join Community</Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Users className="h-12 w-12 mx-auto mb-4 text-primary" />
              <CardTitle>Multi-Stack Support</CardTitle>
              <CardDescription>
                Works with VS Code, Cursor, Windsurf, Claude Code, Gemini CLI, JetBrains, and more.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" size="sm" asChild>
                <Link href="/docs">Setup Guide</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Popular MCPs Preview */}
      <section className="container px-4 py-16 mx-auto bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Most Popular MCPs</h2>
            <p className="text-muted-foreground">
              Discover the top-rated Model Context Protocol configurations
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Sample MCP Cards */}
            {[
              {
                name: "GitHub Integration",
                description: "Connect repositories, manage issues, and automate workflows with natural language commands",
                rating: 4.8,
                downloads: "12.5k",
                category: "Development",
                verified: true,
                isPopular: true
              },
              {
                name: "Database Tools",
                description: "Query and manage databases with natural language. Supports PostgreSQL, MySQL, and MongoDB",
                rating: 4.9,
                downloads: "15.1k",
                category: "Database",
                verified: true,
                isPopular: true
              },
              {
                name: "Slack Connector",
                description: "Integrate with Slack for team communication, notifications, and channel management",
                rating: 4.6,
                downloads: "8.2k",
                category: "Communication",
                verified: true,
                isPopular: false
              },
              {
                name: "AWS CLI Helper",
                description: "Simplified AWS operations with natural language commands for EC2, S3, Lambda, and more",
                rating: 4.6,
                downloads: "13.7k",
                category: "Cloud",
                verified: true,
                isPopular: true
              },
              {
                name: "Docker Manager",
                description: "Manage Docker containers, images, and compose files with natural language",
                rating: 4.8,
                downloads: "11.2k",
                category: "Development",
                verified: true,
                isPopular: false
              },
              {
                name: "VS Code Extension Manager",
                description: "Manage VS Code extensions, settings, and workspaces through natural language",
                rating: 4.7,
                downloads: "8.4k",
                category: "Development",
                verified: true,
                isPopular: false
              }
            ].map((mcp, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        {mcp.name}
                        {mcp.verified && <Shield className="h-4 w-4 text-green-500" />}
                        {mcp.isPopular && <Badge variant="secondary" className="text-xs">Popular</Badge>}
                      </CardTitle>
                      <Badge variant="outline" className="mt-1">{mcp.category}</Badge>
                    </div>
                  </div>
                  <CardDescription className="mt-2">
                    {mcp.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        {mcp.rating}
                      </div>
                      <div className="flex items-center gap-1">
                        <Download className="h-4 w-4" />
                        {mcp.downloads}
                      </div>
                    </div>
                    <Button size="sm" asChild>
                      <Link href="/browse">Add to Package</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button variant="outline" size="lg" asChild>
              <Link href="/browse">
                View All 1,200+ MCPs
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Supported Stacks Section */}
      <section className="container px-4 py-16 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Works With Your Favorite Tools</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            MCP Directory supports all major development environments and AI coding assistants
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6 max-w-5xl mx-auto">
          {[
            { name: "VS Code", icon: "💻" },
            { name: "Cursor", icon: "🎯" },
            { name: "Windsurf", icon: "🏄" },
            { name: "Claude Code", icon: "🤖" },
            { name: "Gemini CLI", icon: "💎" },
            { name: "JetBrains", icon: "🚀" },
            { name: "OpenAI Codex", icon: "🧠" }
          ].map((stack, index) => (
            <div key={index} className="text-center p-4 rounded-lg border hover:shadow-md transition-shadow">
              <div className="text-3xl mb-2">{stack.icon}</div>
              <div className="text-sm font-medium">{stack.name}</div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Button variant="outline" asChild>
            <Link href="/docs">
              View Setup Instructions
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container px-4 py-16 mx-auto text-center bg-muted/50">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Ready to Streamline Your AI Workflow?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of developers already using MCP Directory to build better AI-powered applications.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8" asChild>
              <Link href="/packages">
                Start Building Your Package
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8" asChild>
              <Link href="/community">
                Join Community
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}