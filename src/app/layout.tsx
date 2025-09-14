import { TempoInit } from "@/components/tempo-init";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MCP Directory - Setup Multiple MCPs in Minutes, Not Hours",
  description: "Discover, bundle, and deploy Model Context Protocol configurations with one-click installation. Browse verified MCPs, create custom packages, and streamline your AI workflow setup.",
  keywords: "MCP, Model Context Protocol, AI tools, automation, package manager, one-click install, AI workflow, development tools, productivity",
  authors: [{ name: "MCP Directory Team" }],
  creator: "MCP Directory",
  publisher: "MCP Directory",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mcp-directory.com",
    title: "MCP Directory - Setup Multiple MCPs in Minutes",
    description: "The ultimate directory for Model Context Protocol configurations. Discover, bundle, and deploy MCPs with ease.",
    siteName: "MCP Directory",
  },
  twitter: {
    card: "summary_large_image",
    title: "MCP Directory - Setup Multiple MCPs in Minutes",
    description: "Discover, bundle, and deploy Model Context Protocol configurations with one-click installation.",
    creator: "@mcpdirectory",
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "MCP Directory",
              "description": "Discover, bundle, and deploy Model Context Protocol configurations with one-click installation",
              "url": "https://mcp-directory.com",
              "applicationCategory": "DeveloperApplication",
              "operatingSystem": "Any",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "author": {
                "@type": "Organization",
                "name": "MCP Directory Team"
              }
            })
          }}
        />
      </head>
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen bg-background">
            <nav className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
              <div className="container flex h-14 items-center">
                <div className="mr-4 hidden md:flex">
                  <a className="mr-6 flex items-center space-x-2" href="/">
                    <span className="hidden font-bold sm:inline-block">MCP Directory</span>
                  </a>
                  <nav className="flex items-center space-x-6 text-sm font-medium">
                    <a href="/browse" className="transition-colors hover:text-foreground/80 text-foreground/60">Browse</a>
                    <a href="/packages" className="transition-colors hover:text-foreground/80 text-foreground/60">Packages</a>
                    <a href="/docs" className="transition-colors hover:text-foreground/80 text-foreground/60">Docs</a>
                    <a href="/community" className="transition-colors hover:text-foreground/80 text-foreground/60">Community</a>
                  </nav>
                </div>
                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                  <div className="w-full flex-1 md:w-auto md:flex-none">
                  </div>
                  <nav className="flex items-center">
                    <ThemeSwitcher />
                  </nav>
                </div>
              </div>
            </nav>
            {children}
          </div>
          <Toaster />
        </Providers>
        <TempoInit />
      </body>
    </html>
  );
}