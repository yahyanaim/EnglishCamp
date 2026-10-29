"use client";
import { useCallback, useState } from "react";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import { MobileBottomNav } from "./MobileBottomNav";

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const closeMobileSidebar = useCallback(() => setMobileSidebarOpen(false), []);

  return (
    <div className="flex min-h-screen">
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      <Sidebar
        open={mobileSidebarOpen}
        onClose={closeMobileSidebar}
      />

      <div className="flex-1 lg:ml-64 flex flex-col min-w-0">
        <TopBar onMenuClick={() => setMobileSidebarOpen(true)} menuOpen={mobileSidebarOpen} />
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 pb-[calc(5rem+env(safe-area-inset-bottom,0px))] lg:pb-8">
          {children}
        </main>
      </div>

      <MobileBottomNav />
    </div>
  );
}
