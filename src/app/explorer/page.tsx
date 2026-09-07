"use client";

import { TopBar } from "@/components/layout/TopBar";
import { LeftPanel } from "@/components/layout/LeftPanel";
import { RightPanel } from "@/components/layout/RightPanel";
import { CausalGraph } from "@/components/graph/CausalGraph";
import { useGraphStore } from "@/store/graphStore";
import { EmptyState } from "@/components/shared/EmptyState";

export default function ExplorerPage() {
  const graph = useGraphStore((s) => s.graph);

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <TopBar />
      <div className="flex-1 flex overflow-hidden">
        <LeftPanel />
        <main className="flex-1 relative overflow-hidden bg-background">
          {graph ? <CausalGraph /> : <EmptyState />}
        </main>
        {graph && <RightPanel />}
      </div>
    </div>
  );
}
