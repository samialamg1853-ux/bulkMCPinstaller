"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usePackage } from "@/contexts/PackageContext";
import { mcpsData } from "@/data/mcps";
import { Star, Download, Shield, Search, Filter, Grid, List, Check, Plus } from "lucide-react";
import { useState, useMemo } from "react";
import { useToast } from "@/components/ui/use-toast";

export default function BrowsePage() {
  const { addMCPToPackage, isInPackage, currentPackage } = usePackage();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("popular");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredAndSortedMCPs = useMemo(() => {
    let filtered = mcpsData.filter(mcp => {
      const matchesSearch = mcp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           mcp.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           mcp.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
                           mcp.author.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === "all" || 
                             mcp.category.toLowerCase() === selectedCategory.toLowerCase();
      
      return matchesSearch && matchesCategory;
    });

    // Sort MCPs
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating;
        case "recent":
          return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
        case "name":
          return a.name.localeCompare(b.name);
        case "popular":
        default:
          return parseFloat(b.downloads.replace('k', '')) - parseFloat(a.downloads.replace('k', ''));
      }
    });

    return filtered;
  }, [searchQuery, selectedCategory, sortBy]);

  const handleAddToPackage = (mcp: any) => {
    if (isInPackage(mcp.id)) {
      toast({
        title: "Already in package",
        description: `${mcp.name} is already in your current package.`,
        variant: "default",
      });
      return;
    }

    addMCPToPackage(mcp);
    toast({
      title: "Added to package",
      description: `${mcp.name} has been added to your package.`,
      variant: "default",
    });
  };

  const categories = ["all", ...Array.from(new Set(mcpsData.map(mcp => mcp.category.toLowerCase())))];

  return (
    <div className="container px-4 py-8 mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Browse MCPs</h1>
        <p className="text-muted-foreground">
          Discover and add Model Context Protocol configurations to your package
        </p>
        {currentPackage.mcps.length > 0 && (
          <div className="mt-4 p-4 bg-muted/50 rounded-lg">
            <p className="text-sm">
              <strong>{currentPackage.mcps.length} MCPs</strong> in your current package: {currentPackage.name}
            </p>
          </div>
        )}
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search MCPs, tags, or authors..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category === "all" ? "All Categories" : category.charAt(0).toUpperCase() + category.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="recent">Recently Updated</SelectItem>
              <SelectItem value="name">Name A-Z</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          
          <div className="flex border rounded-md">
            <Button 
              variant={viewMode === "grid" ? "default" : "ghost"} 
              size="icon" 
              className="rounded-r-none"
              onClick={() => setViewMode("grid")}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button 
              variant={viewMode === "list" ? "default" : "ghost"} 
              size="icon" 
              className="rounded-l-none border-l"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-sm text-muted-foreground">
          Showing {filteredAndSortedMCPs.length} of {mcpsData.length} MCPs
        </p>
      </div>

      {/* MCP Grid/List */}
      <div className={viewMode === "grid" ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
        {filteredAndSortedMCPs.map((mcp) => (
          <Card key={mcp.id} className={`hover:shadow-lg transition-all duration-200 hover:-translate-y-1 ${viewMode === "list" ? "flex" : ""}`}>
            <CardHeader className={viewMode === "list" ? "flex-1" : ""}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg flex items-center gap-2 mb-1">
                    {mcp.name}
                    {mcp.verified && <Shield className="h-4 w-4 text-green-500" />}
                  </CardTitle>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary">{mcp.category}</Badge>
                    <span className="text-xs text-muted-foreground">by {mcp.author}</span>
                  </div>
                </div>
              </div>
              <CardDescription className="text-sm leading-relaxed">
                {mcp.description}
              </CardDescription>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-1 mt-2">
                {mcp.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardHeader>
            
            <CardContent className={viewMode === "list" ? "flex flex-col justify-between min-w-[200px]" : ""}>
              <div className="flex items-center justify-between mb-4">
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
                <span className="text-xs text-muted-foreground">
                  Updated {mcp.lastUpdated}
                </span>
              </div>
              
              <div className="flex gap-2">
                <Button 
                  className="flex-1" 
                  onClick={() => handleAddToPackage(mcp)}
                  disabled={isInPackage(mcp.id)}
                >
                  {isInPackage(mcp.id) ? (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      In Package
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4 mr-2" />
                      Add to Package
                    </>
                  )}
                </Button>
                <Button variant="outline" size="icon">
                  <Star className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredAndSortedMCPs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">No MCPs found matching your criteria.</p>
          <Button variant="outline" onClick={() => {
            setSearchQuery("");
            setSelectedCategory("all");
          }}>
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
}