import type { CausalGraph } from "@/types/causal";

export function buildThesisPrompt(graph: CausalGraph): string {
  const events = Object.values(graph.events);
  const eventSummaries = events
    .map(
      (e) =>
        `- ${e.title} (${Math.round(e.probability * 100)}% prob, ${e.financialImpact.direction}, assets: ${e.financialImpact.affectedAssets.join(", ")})`
    )
    .join("\n");

  return `You are a senior trading strategist. Based on the following causal chain analysis, generate a trading thesis.

Scenario: ${graph.title}

Events in the causal chain:
${eventSummaries}

Generate a trading thesis with:
1. title: Short thesis name
2. summary: 2-3 sentence overview
3. conviction: 1-5 scale
4. trades: 2-4 specific trade ideas, each with:
   - asset, direction (long/short), entry condition, stop loss, take profit, time horizon, rationale
5. risks: 2-4 risk factors with probability and impact scores
6. keyAssumptions: 3-5 key assumptions the thesis relies on
7. triggerEvents: IDs of the most important events to monitor

Return as JSON matching the TradingThesis schema.`;
}
