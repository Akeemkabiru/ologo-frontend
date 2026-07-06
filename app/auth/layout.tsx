"use client";

import VantaClouds from "@/components/ui/vantaClouds";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen relative">
      <VantaClouds />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
