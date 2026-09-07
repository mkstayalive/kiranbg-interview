"use client";

import { useCallback } from "react";
import { useGraphStore } from "@/store/graphStore";
import { getMockThesis } from "@/lib/mock/scenarios";
import type { TradingThesis } from "@/types/causal";

export function useThesis() {
  const graph = useGraphStore((s) => s.graph);
  const setThesis = useGraphStore((s) => s.setThesis);
  const isGeneratingThesis = useGraphStore((s) => s.isGeneratingThesis);
  const setIsGeneratingThesis = useGraphStore((s) => s.setIsGeneratingThesis);

  const generateThesis = useCallback(async () => {
    if (!graph) return;

    setIsGeneratingThesis(true);
    try {
      // Try the mock data first (for known scenarios)
      try {
        const thesis = await getMockThesis(graph.id);
        setThesis(thesis);
        return;
      } catch {
        // Not a known mock scenario, use the API
      }

      const response = await fetch("/api/thesis/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ graphId: graph.id }),
      });

      if (!response.ok) throw new Error("Failed to generate thesis");

      const thesis: TradingThesis = await response.json();
      setThesis(thesis);
    } catch (error) {
      console.error("Thesis generation failed:", error);
    } finally {
      setIsGeneratingThesis(false);
    }
  }, [graph, setThesis, setIsGeneratingThesis]);

  return { generateThesis, isGeneratingThesis };
}
