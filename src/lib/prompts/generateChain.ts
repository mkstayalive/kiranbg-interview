export function buildChainPrompt(hypothesis: string, mode: string): string {
  return `You are a financial analyst specializing in causal chain analysis.

Given the following hypothesis, generate a detailed causal chain of events with financial market implications.

Hypothesis: "${hypothesis}"
Mode: ${mode === "validate" ? "Validate this hypothesis — look for both supporting and contradicting evidence chains." : "Discover all downstream effects — explore the full tree of consequences."}

For each event in the chain, provide:
- title: short event name
- description: 2-3 sentence explanation
- probability: 0.0-1.0 (probability of occurring given parent event occurs)
- timeframe: {min, max, unit} — when this would happen after the trigger
- category: one of geopolitical, economic, market, technology, regulatory, supply-chain, social
- financialImpact: {direction: bullish|bearish|neutral|mixed, magnitude: 1-5, affectedAssets: ticker symbols}
- reasoning: why you believe this would happen

For each causal link, provide:
- confidence: 0.0-1.0
- mechanism: how cause leads to effect
- timeDelay: human-readable delay string

Generate 6-10 events with 5-9 causal links forming a directed acyclic graph.
Return as JSON matching the CausalGraph schema.`;
}
