import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Star, MessageCircle, Users, TrendingUp, Award, ExternalLink, Heart, Share2 } from "lucide-react";

const communityStats = [
  { label: "Active Members", value: "12,847", icon: Users },
  { label: "MCPs Shared", value: "1,234", icon: Share2 },
  { label: "Reviews Posted", value: "5,678", icon: Star },
  { label: "Questions Answered", value: "3,456", icon: MessageCircle }
];

const topContributors = [
  {
    name: "Alex Chen",
    username: "@alexchen",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
    contributions: 47,
    badge: "Top Contributor",
    speciality: "Database MCPs"
  },
  {
    name: "Sarah Johnson",
    username: "@sarahj",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    contributions: 38,
    badge: "MCP Expert",
    speciality: "Development Tools"
  },
  {
    name: "Mike Rodriguez",
    username: "@mikerod",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike",
    contributions: 31,
    badge: "Community Helper",
    speciality: "Cloud Integration"
  }
];

const recentDiscussions = [
  {
    title: "Best practices for GitHub MCP configuration",
    author: "DevMaster",
    replies: 23,
    likes: 45,
    category: "Development",
    timeAgo: "2 hours ago",
    isHot: true
  },
  {
    title: "Troubleshooting Slack MCP connection issues",
    author: "TeamLead",
    replies: 12,
    likes: 28,
    category: "Communication",
    timeAgo: "4 hours ago",
    isHot: false
  },
  {
    title: "New Database MCP with MongoDB support",
    author: "DataEngineer",
    replies: 18,
    likes: 67,
    category: "Database",
    timeAgo: "6 hours ago",
    isHot: true
  },
  {
    title: "VS Code MCP extension not loading",
    author: "CodeNewbie",
    replies: 8,
    likes: 15,
    category: "Support",
    timeAgo: "8 hours ago",
    isHot: false
  }
];

const featuredMCPs = [
  {
    name: "AI Code Review Assistant",
    author: "CodeQuality Team",
    rating: 4.9,
    downloads: "8.2k",
    description: "Automated code review with AI-powered suggestions and best practice recommendations.",
    isNew: true
  },
  {
    name: "Multi-Cloud Deployment",
    author: "CloudOps",
    rating: 4.7,
    downloads: "5.4k",
    description: "Deploy applications across AWS, Azure, and GCP with unified commands.",
    isNew: false
  },
  {
    name: "Smart Documentation Generator",
    author: "DocBot",
    rating: 4.8,
    downloads: "6.7k",
    description: "Generate comprehensive documentation from your codebase automatically.",
    isNew: true
  }
];

export default function CommunityPage() {
  return (
    <div className="container px-4 py-8 mx-auto max-w-7xl">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">MCP Community</h1>
        <p className="text-xl text-muted-foreground mb-6 max-w-3xl mx-auto">
          Join thousands of developers sharing knowledge, contributing MCPs, and building the future of AI-powered development tools
        </p>
        <div className="flex justify-center gap-4">
          <Button size="lg">
            <Users className="h-4 w-4 mr-2" />
            Join Community
          </Button>
          <Button variant="outline" size="lg">
            <ExternalLink className="h-4 w-4 mr-2" />
            Discord Server
          </Button>
        </div>
      </div>

      {/* Community Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-12">
        {communityStats.map((stat) => (
          <Card key={stat.label} className="text-center">
            <CardContent className="pt-6">
              <stat.icon className="h-8 w-8 mx-auto mb-3 text-primary" />
              <div className="text-2xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Recent Discussions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                Recent Discussions
              </CardTitle>
              <CardDescription>
                Latest conversations from the community
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentDiscussions.map((discussion, index) => (
                  <div key={index}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium hover:text-primary cursor-pointer">
                            {discussion.title}
                          </h3>
                          {discussion.isHot && (
                            <Badge variant="destructive" className="text-xs">
                              <TrendingUp className="h-3 w-3 mr-1" />
                              Hot
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>by {discussion.author}</span>
                          <Badge variant="outline" className="text-xs">
                            {discussion.category}
                          </Badge>
                          <span>{discussion.timeAgo}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MessageCircle className="h-4 w-4" />
                          {discussion.replies}
                        </div>
                        <div className="flex items-center gap-1">
                          <Heart className="h-4 w-4" />
                          {discussion.likes}
                        </div>
                      </div>
                    </div>
                    {index < recentDiscussions.length - 1 && <Separator className="mt-4" />}
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-6">
                View All Discussions
              </Button>
            </CardContent>
          </Card>

          {/* Featured Community MCPs */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Community Featured MCPs
              </CardTitle>
              <CardDescription>
                Outstanding MCPs created and shared by community members
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {featuredMCPs.map((mcp, index) => (
                  <div key={index} className="flex items-start justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium">{mcp.name}</h3>
                        {mcp.isNew && (
                          <Badge variant="secondary" className="text-xs">New</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{mcp.description}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>by {mcp.author}</span>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          {mcp.rating}
                        </div>
                        <span>{mcp.downloads} downloads</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View MCP
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Top Contributors */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Top Contributors
              </CardTitle>
              <CardDescription>
                Community members making a difference
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topContributors.map((contributor, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={contributor.avatar} />
                      <AvatarFallback>{contributor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-sm">{contributor.name}</p>
                        <Badge variant="outline" className="text-xs">{contributor.badge}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{contributor.username}</p>
                      <p className="text-xs text-muted-foreground">{contributor.speciality}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{contributor.contributions}</p>
                      <p className="text-xs text-muted-foreground">contributions</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Community Guidelines */}
          <Card>
            <CardHeader>
              <CardTitle>Community Guidelines</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p>• Be respectful and constructive in discussions</p>
              <p>• Share knowledge and help others learn</p>
              <p>• Test MCPs thoroughly before sharing</p>
              <p>• Provide clear documentation and examples</p>
              <p>• Report issues and bugs responsibly</p>
              <Button variant="outline" size="sm" className="w-full mt-4">
                Read Full Guidelines
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <MessageCircle className="h-4 w-4 mr-2" />
                Start Discussion
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Share2 className="h-4 w-4 mr-2" />
                Submit MCP
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Star className="h-4 w-4 mr-2" />
                Write Review
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <ExternalLink className="h-4 w-4 mr-2" />
                Join Discord
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}