"use client";

import { PackageProvider } from "@/contexts/PackageContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <PackageProvider>{children}</PackageProvider>;
}