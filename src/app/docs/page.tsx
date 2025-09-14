"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Code, Download, ExternalLink, Terminal, FileText, Zap, Shield, Users, CheckCircle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Documentation - MCP Directory Setup Guide",
  description: "Complete setup instructions for Model Context Protocol configurations across all major development environments including VS Code, Cursor, Windsurf, Claude Code, and more.",
  keywords: "MCP setup, VS Code MCP, Cursor MCP, Windsurf MCP, Claude Code MCP, Gemini CLI MCP, installation guide, development tools",
};

const stacks = [
  {
    id: "vscode",
    name: "VS Code",
    description: "Microsoft Visual Studio Code",
    icon: "💻",
    popularity: "Most Popular",
    configFile: "settings.json",
    installSteps: [
      "Open VS Code",
      "Go to File > Preferences > Settings (or Ctrl+,)",
      "Click on 'Open Settings (JSON)' in the top right",
      "Add MCP configuration to your settings.json",
      "Restart VS Code"
    ],
    sampleConfig: `{
  "mcp.servers": {
    "github": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "your_token_here"
      }
    },
    "filesystem": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-filesystem", "/path/to/allowed/files"]
    }
  }
}`
  },
  {
    id: "cursor",
    name: "Cursor",
    description: "AI-powered code editor",
    icon: "🎯",
    popularity: "Trending",
    configFile: "cursor_settings.json",
    installSteps: [
      "Open Cursor",
      "Press Ctrl+Shift+P (Cmd+Shift+P on Mac)",
      "Type 'Preferences: Open Settings (JSON)'",
      "Add MCP configuration",
      "Restart Cursor"
    ],
    sampleConfig: `{
  "mcp": {
    "enabled": true,
    "servers": {
      "database-tools": {
        "command": "python",
        "args": ["-m", "database_tools_mcp"],
        "env": {
          "DATABASE_URL": "your_database_url"
        }
      }
    }
  }
}`
  },
  {
    id: "windsurf",
    name: "Windsurf",
    description: "Codeium's AI-native IDE",
    icon: "🏄",
    popularity: "New",
    configFile: "windsurf.config.json",
    installSteps: [
      "Open Windsurf",
      "Navigate to Settings > Extensions",
      "Search for 'MCP Protocol'",
      "Install the MCP extension",
      "Configure in settings"
    ],
    sampleConfig: `{
  "mcp": {
    "protocol_version": "2024-11-05",
    "servers": {
      "slack": {
        "command": "node",
        "args": ["slack-mcp-server.js"],
        "env": {
          "SLACK_BOT_TOKEN": "xoxb-your-token",
          "SLACK_APP_TOKEN": "xapp-your-token"
        }
      }
    }
  }
}`
  },
  {
    id: "claude-code",
    name: "Claude Code",
    description: "Anthropic's coding assistant",
    icon: "🤖",
    popularity: "AI-Powered",
    configFile: "claude.config.json",
    installSteps: [
      "Open Claude Code interface",
      "Go to Settings > Integrations",
      "Enable MCP Protocol support",
      "Add server configurations",
      "Test connection"
    ],
    sampleConfig: `{
  "mcp_servers": {
    "file_manager": {
      "command": "file-manager-mcp",
      "args": ["--workspace", "/your/workspace"],
      "capabilities": ["read", "write", "search"]
    }
  }
}`
  },
  {
    id: "gemini-cli",
    name: "Gemini CLI",
    description: "Google's Gemini command line interface",
    icon: "💎",
    popularity: "CLI Tool",
    configFile: "gemini.yaml",
    installSteps: [
      "Install Gemini CLI: npm install -g @google/gemini-cli",
      "Run: gemini auth login",
      "Create configuration file",
      "Initialize MCP servers",
      "Test with: gemini mcp list"
    ],
    sampleConfig: `mcp:
  servers:
    calendar:
      command: calendar-mcp-server
      args:
        - --provider=google
      env:
        GOOGLE_CALENDAR_API_KEY: your_api_key
    email:
      command: email-assistant-mcp
      env:
        SMTP_HOST: smtp.gmail.com
        SMTP_USER: your_email@gmail.com`
  },
  {
    id: "codex",
    name: "OpenAI Codex",
    description: "OpenAI's code generation model",
    icon: "🧠",
    popularity: "AI Model",
    configFile: "codex_config.json",
    installSteps: [
      "Set up OpenAI API access",
      "Install Codex integration tools",
      "Configure MCP bridge",
      "Set environment variables",
      "Test integration"
    ],
    sampleConfig: `{
  "openai": {
    "api_key": "your_openai_api_key",
    "model": "code-davinci-002"
  },
  "mcp_bridge": {
    "servers": {
      "docker": {
        "command": "docker-mcp-server",
        "env": {
          "DOCKER_HOST": "unix:///var/run/docker.sock"
        }
      }
    }
  }
}`
  },
  {
    id: "jetbrains",
    name: "JetBrains IDEs",
    description: "IntelliJ IDEA, PyCharm, WebStorm, etc.",
    icon: "🚀",
    popularity: "Enterprise",
    configFile: "mcp-plugin.xml",
    installSteps: [
      "Open your JetBrains IDE",
      "Go to File > Settings > Plugins",
      "Search for 'MCP Protocol'",
      "Install and restart IDE",
      "Configure in Tools > MCP Settings"
    ],
    sampleConfig: `<mcp-configuration>
  <servers>
    <server name="aws-cli">
      <command>aws-mcp-helper</command>
      <args>
        <arg>--region</arg>
        <arg>us-west-2</arg>
      </args>
      <env>
        <var name="AWS_ACCESS_KEY_ID" value="your_key" />
        <var name="AWS_SECRET_ACCESS_KEY" value="your_secret" />
      </env>
    </server>
  </servers>
</mcp-configuration>`
  }
];

const quickStartGuide = [
  {
    step: 1,
    title: "Choose Your Stack",
    description: "Select your preferred development environment from the tabs above"
  },
  {
    step: 2,
    title: "Install Dependencies",
    description: "Follow the installation steps for your chosen stack"
  },
  {
    step: 3,
    title: "Configure MCPs",
    description: "Add the MCP servers you want to use to your configuration file"
  },
  {
    step: 4,
    title: "Test Connection",
    description: "Restart your environment and verify the MCPs are working"
  }
];

export default function DocsPage() {
  return (
    <div className="container px-4 py-8 mx-auto max-w-6xl">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Setup Documentation</h1>
        <p className="text-xl text-muted-foreground mb-6 max-w-3xl mx-auto">
          Complete installation guide for Model Context Protocol configurations across all major development environments
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Badge variant="secondary" className="text-sm">
            <CheckCircle className="h-4 w-4 mr-1" />
            7 Supported Stacks
          </Badge>
          <Badge variant="secondary" className="text-sm">
            <Zap className="h-4 w-4 mr-1" />
            One-Click Install
          </Badge>
          <Badge variant="secondary" className="text-sm">
            <Shield className="h-4 w-4 mr-1" />
            Verified Configs
          </Badge>
        </div>
      </div>

      {/* Quick Start Guide */}
      <Card className="mb-12">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Quick Start Guide
          </CardTitle>
          <CardDescription>
            Get up and running with MCPs in 4 simple steps
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-6">
            {quickStartGuide.map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-3 text-sm font-bold">
                  {item.step}
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Stack-Specific Instructions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            Stack-Specific Setup Instructions
          </CardTitle>
          <CardDescription>
            Choose your development environment and follow the tailored setup guide
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="vscode" className="w-full">
            <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7 mb-8">
              {stacks.map((stack) => (
                <TabsTrigger key={stack.id} value={stack.id} className="text-xs">
                  <span className="mr-1">{stack.icon}</span>
                  {stack.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {stacks.map((stack) => (
              <TabsContent key={stack.id} value={stack.id} className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold flex items-center gap-2">
                      <span className="text-2xl">{stack.icon}</span>
                      {stack.name}
                    </h3>
                    <p className="text-muted-foreground">{stack.description}</p>
                  </div>
                  <Badge variant="outline">{stack.popularity}</Badge>
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                  {/* Installation Steps */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Terminal className="h-5 w-5" />
                        Installation Steps
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ol className="space-y-3">
                        {stack.installSteps.map((step, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-medium mt-0.5">
                              {index + 1}
                            </div>
                            <span className="text-sm">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </CardContent>
                  </Card>

                  {/* Sample Configuration */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        Sample Configuration
                      </CardTitle>
                      <CardDescription>
                        Add this to your {stack.configFile}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
                        <code>{stack.sampleConfig}</code>
                      </pre>
                      <Button variant="outline" size="sm" className="mt-3" onClick={() => {
                        navigator.clipboard.writeText(stack.sampleConfig);
                      }}>
                        <Download className="h-4 w-4 mr-2" />
                        Copy Config
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                {/* Additional Resources */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Additional Resources</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-3">
                      <Button variant="outline" size="sm" asChild>
                        <a href={`/docs/${stack.id}/troubleshooting`}>
                          Troubleshooting Guide
                        </a>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <a href={`/docs/${stack.id}/examples`}>
                          Example Configurations
                        </a>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <a href={`/community?stack=${stack.id}`}>
                          <Users className="h-4 w-4 mr-2" />
                          Community Support
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {/* General Information */}
      <div className="grid md:grid-cols-2 gap-6 mt-12">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security Best Practices
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p>• Never commit API keys or tokens to version control</p>
            <p>• Use environment variables for sensitive configuration</p>
            <p>• Regularly rotate access tokens and credentials</p>
            <p>• Only install MCPs from verified sources</p>
            <p>• Review MCP permissions before installation</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ExternalLink className="h-5 w-5" />
              Need Help?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start" asChild>
              <a href="/community">
                <Users className="h-4 w-4 mr-2" />
                Join Community Forum
              </a>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <a href="https://github.com/mcp-directory/issues" target="_blank">
                <ExternalLink className="h-4 w-4 mr-2" />
                Report Issues on GitHub
              </a>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <a href="/docs/faq">
                <FileText className="h-4 w-4 mr-2" />
                Frequently Asked Questions
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}