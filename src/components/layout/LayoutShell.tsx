"use client";
import { SpeechFeedback } from "@/components/ui/SpeechFeedback";
import { LevelCelebration } from "@/components/session/LevelCelebration";
import { useCallback, useState } from "react";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import { MobileBottomNav } from "./MobileBottomNav";
import { SessionProvider } from "@/components/session/SessionProvider";
import { LearningRail } from "./LearningRail";

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const closeMobileSidebar = useCallback(() => setMobileSidebarOpen(false), []);

  return (
    <SessionProvider><div className="camp-workspace">
      <div className="camp-frame">
      <div className="camp-navigation hidden lg:block">
        <Sidebar />
      </div>

      <Sidebar
        open={mobileSidebarOpen}
        onClose={closeMobileSidebar}
      />

      <div className="camp-centre flex min-w-0 flex-col">
        <TopBar onMenuClick={() => setMobileSidebarOpen(true)} menuOpen={mobileSidebarOpen} />
        <main className="app-canvas camp-content flex-1">
          {children}
        </main>
      </div>
      <LearningRail />
      </div>
      <MobileBottomNav />
      <SpeechFeedback />
      <LevelCelebration />
    </div></SessionProvider>
  );
}
