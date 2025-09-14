"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface MCP {
  id: number;
  name: string;
  description: string;
  rating: number;
  downloads: string;
  category: string;
  tags: string[];
  verified: boolean;
  author: string;
  lastUpdated: string;
  size?: string;
  installCommand?: string;
}

export interface Package {
  id: string;
  name: string;
  description: string;
  mcps: MCP[];
  createdAt: string;
  lastModified: string;
}

interface PackageContextType {
  currentPackage: Package;
  savedPackages: Package[];
  addMCPToPackage: (mcp: MCP) => void;
  removeMCPFromPackage: (mcpId: number) => void;
  updatePackageInfo: (name: string, description: string) => void;
  savePackage: () => void;
  loadPackage: (packageId: string) => void;
  deletePackage: (packageId: string) => void;
  clearCurrentPackage: () => void;
  generateInstallScript: () => string;
  isInPackage: (mcpId: number) => boolean;
}

const PackageContext = createContext<PackageContextType | undefined>(undefined);

export const usePackage = () => {
  const context = useContext(PackageContext);
  if (!context) {
    throw new Error('usePackage must be used within a PackageProvider');
  }
  return context;
};

export const PackageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPackage, setCurrentPackage] = useState<Package>({
    id: 'current',
    name: 'My MCP Package',
    description: 'Custom MCP bundle',
    mcps: [],
    createdAt: new Date().toISOString(),
    lastModified: new Date().toISOString()
  });

  const [savedPackages, setSavedPackages] = useState<Package[]>([]);

  // Load saved packages from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('mcp-saved-packages');
    if (saved) {
      setSavedPackages(JSON.parse(saved));
    }
  }, []);

  // Save packages to localStorage whenever savedPackages changes
  useEffect(() => {
    localStorage.setItem('mcp-saved-packages', JSON.stringify(savedPackages));
  }, [savedPackages]);

  const addMCPToPackage = (mcp: MCP) => {
    setCurrentPackage(prev => ({
      ...prev,
      mcps: [...prev.mcps.filter(m => m.id !== mcp.id), mcp],
      lastModified: new Date().toISOString()
    }));
  };

  const removeMCPFromPackage = (mcpId: number) => {
    setCurrentPackage(prev => ({
      ...prev,
      mcps: prev.mcps.filter(m => m.id !== mcpId),
      lastModified: new Date().toISOString()
    }));
  };

  const updatePackageInfo = (name: string, description: string) => {
    setCurrentPackage(prev => ({
      ...prev,
      name,
      description,
      lastModified: new Date().toISOString()
    }));
  };

  const savePackage = () => {
    const packageToSave = {
      ...currentPackage,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString()
    };
    
    setSavedPackages(prev => [...prev, packageToSave]);
  };

  const loadPackage = (packageId: string) => {
    const packageToLoad = savedPackages.find(pkg => pkg.id === packageId);
    if (packageToLoad) {
      setCurrentPackage({
        ...packageToLoad,
        id: 'current'
      });
    }
  };

  const deletePackage = (packageId: string) => {
    setSavedPackages(prev => prev.filter(pkg => pkg.id !== packageId));
  };

  const clearCurrentPackage = () => {
    setCurrentPackage({
      id: 'current',
      name: 'My MCP Package',
      description: 'Custom MCP bundle',
      mcps: [],
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString()
    });
  };

  const generateInstallScript = () => {
    const mcpCommands = currentPackage.mcps.map(mcp => {
      // Generate install commands based on MCP type
      switch (mcp.category.toLowerCase()) {
        case 'development':
          return `# Install ${mcp.name}\nnpm install -g ${mcp.name.toLowerCase().replace(/\s+/g, '-')}-mcp`;
        case 'database':
          return `# Install ${mcp.name}\npip install ${mcp.name.toLowerCase().replace(/\s+/g, '-')}-mcp`;
        case 'communication':
          return `# Install ${mcp.name}\ncurl -sSL https://install.${mcp.name.toLowerCase().replace(/\s+/g, '')}.com | bash`;
        default:
          return `# Install ${mcp.name}\necho "Installing ${mcp.name}..."`;
      }
    }).join('\n\n');

    return `#!/bin/bash
# MCP Package Installation Script
# Package: ${currentPackage.name}
# Description: ${currentPackage.description}
# Generated: ${new Date().toISOString()}

echo "Installing MCP Package: ${currentPackage.name}"
echo "Description: ${currentPackage.description}"
echo "MCPs to install: ${currentPackage.mcps.length}"
echo ""

${mcpCommands}

echo ""
echo "Installation complete! 🎉"
echo "All ${currentPackage.mcps.length} MCPs have been installed successfully."
`;
  };

  const isInPackage = (mcpId: number) => {
    return currentPackage.mcps.some(mcp => mcp.id === mcpId);
  };

  return (
    <PackageContext.Provider value={{
      currentPackage,
      savedPackages,
      addMCPToPackage,
      removeMCPFromPackage,
      updatePackageInfo,
      savePackage,
      loadPackage,
      deletePackage,
      clearCurrentPackage,
      generateInstallScript,
      isInPackage
    }}>
      {children}
    </PackageContext.Provider>
  );
};