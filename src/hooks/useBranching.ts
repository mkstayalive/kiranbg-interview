"use client";

import { useCallback } from "react";
import { useGraphStore } from "@/store/graphStore";
import { createBranchFromEvent } from "@/lib/utils/branching";
import type { CausalEvent } from "@/types/causal";

export function useBranching() {
  const graph = useGraphStore((s) => s.graph);
  const addBranch = useGraphStore((s) => s.addBranch);
  const addEventsAndEdges = useGraphStore((s) => s.addEventsAndEdges);

  const forkFromEvent = useCallback(
    (eventId: string, modifications: Partial<CausalEvent>, branchName?: string) => {
      if (!graph) return;

      const { branch, events, edges } = createBranchFromEvent(
        graph,
        eventId,
        modifications,
        branchName
      );

      addBranch(branch);
      addEventsAndEdges(events, edges);
    },
    [graph, addBranch, addEventsAndEdges]
  );

  return { forkFromEvent };
}
