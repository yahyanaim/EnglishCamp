"use client";
import { SpeechFeedback } from "@/components/ui/SpeechFeedback";
import { PlacementOffer } from "@/components/placement/PlacementOffer";
import { LevelCelebration } from "@/components/session/LevelCelebration";
import { useCallback, useState } from "react";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import { MobileBottomNav } from "./MobileBottomNav";
import { SessionProvider } from "@/components/session/SessionProvider";
import { LearningRail } from "./LearningRail";
import { WeeklyProgressSync } from "@/components/session/WeeklyProgressSync";
import {usePathname} from 'next/navigation';
import {InvitationBoundary,InvitationContent,isEntryPage} from '@/components/session/InvitationBoundary';

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const closeMobileSidebar = useCallback(() => setMobileSidebarOpen(false), []);
  const pathname=usePathname(),entry=isEntryPage(pathname);
  // Admin sessions and pages do not mount learner storage/synchronization providers.
  if(pathname.startsWith('/admin/'))return <main className="camp-entry">{children}</main>;

  return (
    <SessionProvider><InvitationBoundary>{entry?<main className="camp-entry">{children}</main>:<><WeeklyProgressSync/><div className="camp-workspace">
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
          <InvitationContent><PlacementOffer/>{children}</InvitationContent>
        </main>
      </div>
      <LearningRail />
      </div>
      <MobileBottomNav />
      <SpeechFeedback />
      <LevelCelebration />
    </div></>}</InvitationBoundary></SessionProvider>
  );
}
