"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { usePackage } from "@/contexts/PackageContext";
import { X, Package, Download, Settings, Plus, Trash2, Copy, ExternalLink, Save } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export default function PackagesPage() {
  const {
    currentPackage,
    savedPackages,
    removeMCPFromPackage,
    updatePackageInfo,
    savePackage,
    loadPackage,
    deletePackage,
    clearCurrentPackage,
    generateInstallScript
  } = usePackage();
  
  const { toast } = useToast();
  const [packageName, setPackageName] = useState(currentPackage.name);
  const [packageDescription, setPackageDescription] = useState(currentPackage.description);
  const [showInstallScript, setShowInstallScript] = useState(false);
  const [installScript, setInstallScript] = useState("");

  const handleUpdatePackageInfo = () => {
    updatePackageInfo(packageName, packageDescription);
    toast({
      title: "Package updated",
      description: "Package information has been updated.",
    });
  };

  const handleSavePackage = () => {
    if (currentPackage.mcps.length === 0) {
      toast({
        title: "Cannot save empty package",
        description: "Add some MCPs to your package before saving.",
        variant: "destructive",
      });
      return;
    }
    
    savePackage();
    toast({
      title: "Package saved",
      description: `${currentPackage.name} has been saved to your library.`,
    });
  };

  const handleLoadPackage = (packageId: string) => {
    loadPackage(packageId);
    const pkg = savedPackages.find(p => p.id === packageId);
    if (pkg) {
      setPackageName(pkg.name);
      setPackageDescription(pkg.description);
      toast({
        title: "Package loaded",
        description: `${pkg.name} has been loaded.`,
      });
    }
  };

  const handleDeletePackage = (packageId: string) => {
    const pkg = savedPackages.find(p => p.id === packageId);
    deletePackage(packageId);
    toast({
      title: "Package deleted",
      description: `${pkg?.name} has been deleted.`,
    });
  };

  const handleGenerateScript = () => {
    const script = generateInstallScript();
    setInstallScript(script);
    setShowInstallScript(true);
  };

  const handleCopyScript = () => {
    navigator.clipboard.writeText(installScript);
    toast({
      title: "Script copied",
      description: "Installation script copied to clipboard.",
    });
  };

  const totalSize = currentPackage.mcps.reduce((acc, mcp) => {
    const size = parseFloat(mcp.size?.replace(' MB', '') || '0');
    return acc + size;
  }, 0);

  const estimatedInstallTime = Math.max(1, Math.ceil(currentPackage.mcps.length * 0.5));

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Package Builder - Left Side */}
        <div className="lg:col-span-2">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">Package Builder</h1>
            <p className="text-muted-foreground">
              Create custom MCP bundles for one-click installation
            </p>
          </div>

          {/* Current Package */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Current Package
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Package Name</label>
                  <Input 
                    value={packageName}
                    onChange={(e) => setPackageName(e.target.value)}
                    onBlur={handleUpdatePackageInfo}
                    placeholder="Enter package name..."
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Description</label>
                  <Textarea 
                    value={packageDescription}
                    onChange={(e) => setPackageDescription(e.target.value)}
                    onBlur={handleUpdatePackageInfo}
                    placeholder="Describe your package..."
                    rows={3}
                  />
                </div>
              </div>

              <Separator />

              {/* MCPs in Package */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium">MCPs in Package ({currentPackage.mcps.length})</h3>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <a href="/browse">
                        <Plus className="h-4 w-4 mr-2" />
                        Add MCPs
                      </a>
                    </Button>
                    {currentPackage.mcps.length > 0 && (
                      <Button variant="outline" size="sm" onClick={() => {
                        clearCurrentPackage();
                        setPackageName("My MCP Package");
                        setPackageDescription("Custom MCP bundle");
                        toast({
                          title: "Package cleared",
                          description: "All MCPs have been removed from the current package.",
                        });
                      }}>
                        Clear All
                      </Button>
                    )}
                  </div>
                </div>

                {currentPackage.mcps.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No MCPs added yet</p>
                    <p className="text-sm">Browse MCPs to start building your package</p>
                    <Button className="mt-4" asChild>
                      <a href="/browse">Browse MCPs</a>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {currentPackage.mcps.map((mcp) => (
                      <div key={mcp.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div>
                            <p className="font-medium">{mcp.name}</p>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Badge variant="outline" className="text-xs">{mcp.category}</Badge>
                              <span>{mcp.size}</span>
                              <span>by {mcp.author}</span>
                            </div>
                          </div>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-destructive hover:text-destructive"
                          onClick={() => {
                            removeMCPFromPackage(mcp.id);
                            toast({
                              title: "MCP removed",
                              description: `${mcp.name} has been removed from your package.`,
                            });
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Separator />

              {/* Package Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  className="flex-1" 
                  onClick={handleGenerateScript}
                  disabled={currentPackage.mcps.length === 0}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Generate Install Script
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={handleSavePackage}
                  disabled={currentPackage.mcps.length === 0}
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Package
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Saved Packages - Right Side */}
        <div>
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-2">Saved Packages</h2>
            <p className="text-sm text-muted-foreground">
              Your previously created MCP packages
            </p>
          </div>

          <div className="space-y-4">
            {savedPackages.map((pkg) => (
              <Card key={pkg.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">{pkg.name}</CardTitle>
                  <CardDescription className="text-sm">
                    {pkg.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                    <span>{pkg.mcps.length} MCPs</span>
                    <span>{pkg.mcps.reduce((acc, mcp) => acc + parseFloat(mcp.size?.replace(' MB', '') || '0'), 0).toFixed(1)} MB</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      Modified {new Date(pkg.lastModified).toLocaleDateString()}
                    </span>
                    <div className="flex gap-1">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleLoadPackage(pkg.id)}
                      >
                        Load
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={() => handleDeletePackage(pkg.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {savedPackages.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Package className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No saved packages yet</p>
              </div>
            )}
          </div>

          {/* Package Summary */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-base">Package Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Total MCPs:</span>
                <span className="font-medium">{currentPackage.mcps.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Size:</span>
                <span className="font-medium">{totalSize.toFixed(1)} MB</span>
              </div>
              <div className="flex justify-between">
                <span>Install Time:</span>
                <span className="font-medium">~{estimatedInstallTime} minutes</span>
              </div>
              <Separator className="my-3" />
              <div className="flex justify-between font-medium">
                <span>Ready to Install:</span>
                <span className={currentPackage.mcps.length > 0 ? "text-green-600" : "text-muted-foreground"}>
                  {currentPackage.mcps.length > 0 ? "Yes" : "No"}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Install Script Dialog */}
      <Dialog open={showInstallScript} onOpenChange={setShowInstallScript}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Installation Script</DialogTitle>
            <DialogDescription>
              Copy and run this script to install all MCPs in your package
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">
                Package: {currentPackage.name} ({currentPackage.mcps.length} MCPs)
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleCopyScript}>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Script
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <a href="/docs/installation" target="_blank">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Installation Guide
                  </a>
                </Button>
              </div>
            </div>
            <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto whitespace-pre-wrap">
              {installScript}
            </pre>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}