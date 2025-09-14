import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Community - MCP Directory",
  description: "Join the MCP Directory community. Share your experiences, get help, contribute to the ecosystem, and discover the best Model Context Protocol configurations.",
  keywords: "MCP community, Model Context Protocol community, MCP forum, MCP support, MCP contributions, AI tools community",
};

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}