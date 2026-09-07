import { NextResponse } from "next/server";
import { hormuzScenario, aiExportScenario } from "@/lib/mock/scenarios";
import { nanoid } from "nanoid";
import type { CausalGraph } from "@/types/causal";

export async function POST(request: Request) {
  const { hypothesis, mode } = await request.json();

  // Simulate processing delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Mock mode: match against known scenarios or return a default
  const lowerHypothesis = hypothesis.toLowerCase();

  if (
    lowerHypothesis.includes("hormuz") ||
    lowerHypothesis.includes("strait") ||
    lowerHypothesis.includes("oil")
  ) {
    return NextResponse.json(hormuzScenario);
  }

  if (
    lowerHypothesis.includes("ai") ||
    lowerHypothesis.includes("chip") ||
    lowerHypothesis.includes("export") ||
    lowerHypothesis.includes("nvidia")
  ) {
    return NextResponse.json(aiExportScenario);
  }

  // For unrecognized hypotheses, generate a simple placeholder graph
  const graphId = `graph-${nanoid(8)}`;
  const branchId = `branch-${nanoid(8)}`;
  const rootId = `evt-${nanoid(8)}`;
  const childId = `evt-${nanoid(8)}`;
  const edgeId = `edge-${nanoid(8)}`;

  const fallbackGraph: CausalGraph = {
    id: graphId,
    title: hypothesis,
    mode: mode || "discover",
    rootEventId: rootId,
    activeBranchId: branchId,
    branches: {
      [branchId]: {
        id: branchId,
        name: "Base Case",
        parentBranchId: null,
        forkPointEventId: null,
        color: "#3b82f6",
      },
    },
    events: {
      [rootId]: {
        id: rootId,
        title: hypothesis.length > 50 ? hypothesis.slice(0, 47) + "..." : hypothesis,
        description: hypothesis,
        probability: 1.0,
        timeframe: { min: 0, max: 0, unit: "days" },
        category: "geopolitical",
        financialImpact: {
          direction: "mixed",
          magnitude: 3,
          affectedAssets: ["SPY", "QQQ"],
        },
        reasoning: "Root hypothesis — this is the assumed trigger event.",
        isRoot: true,
        isUserModified: false,
        branchId,
      },
      [childId]: {
        id: childId,
        title: "Market Repricing",
        description:
          "Markets rapidly reprice affected sectors as the hypothesis scenario unfolds. Volatility spikes as positioning adjusts.",
        probability: 0.75,
        timeframe: { min: 1, max: 2, unit: "weeks" },
        category: "market",
        financialImpact: {
          direction: "mixed",
          magnitude: 3,
          affectedAssets: ["VIX", "SPY"],
        },
        reasoning:
          "First-order market reaction to a novel scenario. Historical pattern: major geopolitical events cause 2-5% moves within 48 hours.",
        isRoot: false,
        isUserModified: false,
        branchId,
      },
    },
    edges: {
      [edgeId]: {
        id: edgeId,
        source: rootId,
        target: childId,
        confidence: 0.8,
        mechanism: "Direct market impact",
        timeDelay: "1-5 days",
        branchId,
      },
    },
  };

  return NextResponse.json(fallbackGraph);
}
