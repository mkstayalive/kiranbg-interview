"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { EventInput } from "@/components/input/EventInput";
import { ScenarioPresets } from "@/components/input/ScenarioPresets";
import { ModeSelector } from "@/components/input/ModeSelector";
import { BranchSelector } from "@/components/multiverse/BranchSelector";
import { useGraphStore } from "@/store/graphStore";

export function LeftPanel() {
  const graph = useGraphStore((s) => s.graph);

  return (
    <aside className="w-80 border-r border-border bg-card flex flex-col shrink-0">
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          <ModeSelector />
          <EventInput />
          <ScenarioPresets />
          {graph && <BranchSelector />}
        </div>
      </ScrollArea>
    </aside>
  );
}
