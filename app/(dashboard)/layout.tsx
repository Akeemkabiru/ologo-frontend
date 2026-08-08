"use client";

import Sidebar from "@/components/ui/sidebar";
import DashboardHeader from "@/components/ui/dashboardHeader";
import { MobileNavProvider } from "@/components/ui/MobileNav";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <MobileNavProvider>
      <div className="min-h-full flex flex-col md:flex-row">
        {/* Sidebar - desktop only */}
        <Sidebar />

        {/* Main Content Area */}
        <div className="flex-1 min-w-0 md:ml-64 flex flex-col">
          {/* Header - desktop only */}
          <DashboardHeader />

          {/* Page Content */}
          <main className="flex-1 pb-8 md:pt-10 md:px-6 lg:px-8 md:pb-6">
            {children}
          </main>
        </div>
      </div>
    </MobileNavProvider>
  );
}
