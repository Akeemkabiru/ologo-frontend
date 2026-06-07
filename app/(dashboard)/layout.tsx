"use client";

import Sidebar from "@/components/ui/sidebar";
import DashboardHeader from "@/components/ui/dashboardHeader";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <body className="min-h-full flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 ml-64 flex flex-col">
        {/* Header */}
        <DashboardHeader />

        {/* Page Content */}
        <main className="flex-1 pt-10 px-4 md:px-6 lg:px-8 pb-6">
          {children}
        </main>
      </div>
    </body>
  );
}
