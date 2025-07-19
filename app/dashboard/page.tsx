"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

// import AdminDashboard from "@/components/dashboards/AdminDashboard";
import UserDashboard from "@/pages/UserDashboard";
import { useAppStore } from "@/services/state";
import AdminDashboard from "@/pages/AdminDashboard";
import SuperAdminDashboard from "@/pages/SuperAdminDashboard";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const { currentUser } = useAppStore();

  // if (!currentUser) return;

  const router = useRouter();

  useEffect(() => {
    if (!currentUser) return router.push("/");
  }, [currentUser]);

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              {(currentUser?.role === "user" && <UserDashboard />) ||
                (currentUser?.role === "admin" && <AdminDashboard />) ||
                (currentUser?.role === "super-admin" && (
                  <SuperAdminDashboard />
                ))}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
