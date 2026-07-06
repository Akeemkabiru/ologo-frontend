"use client";

import Sidebar from "@/components/ui/sidebar";
import DashboardHeader from "@/components/ui/dashboardHeader";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-full flex flex-col md:flex-row">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 md:ml-64 flex flex-col">
        {/* Header */}
        <DashboardHeader />

        {/* Page Content */}
        <main className="flex-1 pt-6 md:pt-10 px-3 sm:px-4 md:px-6 lg:px-8 pb-6">
          {children}
        </main>
      </div>
    </div>
  );
}
