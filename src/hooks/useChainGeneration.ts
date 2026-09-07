"use client";

import { useCallback } from "react";
import { useGraphStore } from "@/store/graphStore";
import { getMockScenario } from "@/lib/mock/scenarios";
import type { CausalGraph } from "@/types/causal";

export function useChainGeneration() {
  const setGraph = useGraphStore((s) => s.setGraph);
  const isGenerating = useGraphStore((s) => s.isGenerating);
  const setIsGenerating = useGraphStore((s) => s.setIsGenerating);
  const mode = useGraphStore((s) => s.mode);

  const generate = useCallback(
    async (hypothesis: string) => {
      setIsGenerating(true);
      try {
        const response = await fetch("/api/chain/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ hypothesis, mode }),
        });

        if (!response.ok) throw new Error("Failed to generate chain");

        const graph: CausalGraph = await response.json();
        setGraph(graph);
      } catch (error) {
        console.error("Chain generation failed:", error);
      } finally {
        setIsGenerating(false);
      }
    },
    [setGraph, setIsGenerating, mode]
  );

  const loadScenario = useCallback(
    async (scenarioId: string) => {
      setIsGenerating(true);
      try {
        const graph = await getMockScenario(scenarioId);
        setGraph(graph);
      } catch (error) {
        console.error("Failed to load scenario:", error);
      } finally {
        setIsGenerating(false);
      }
    },
    [setGraph, setIsGenerating]
  );

  return { generate, loadScenario, isGenerating };
}
