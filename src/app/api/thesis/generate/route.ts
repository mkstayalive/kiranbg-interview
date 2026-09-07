import { NextResponse } from "next/server";
import { hormuzThesis, aiExportThesis } from "@/lib/mock/scenarios";

export async function POST(request: Request) {
  const { graphId } = await request.json();

  // Simulate processing delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  if (graphId === "scenario-hormuz") {
    return NextResponse.json(hormuzThesis);
  }

  if (graphId === "scenario-ai-export") {
    return NextResponse.json(aiExportThesis);
  }

  // Fallback generic thesis
  return NextResponse.json({
    title: "Scenario Analysis Thesis",
    summary:
      "Based on the analyzed causal chain, several trading opportunities emerge. Key positioning depends on the probability-weighted path of events.",
    conviction: 3,
    trades: [
      {
        asset: "SPY",
        direction: "short",
        entryCondition: "Confirmation of trigger event",
        stopLoss: "3% above entry",
        takeProfit: "5-8% below entry",
        timeHorizon: "1-3 months",
        rationale:
          "Broad market impact from the scenario warrants a defensive position.",
      },
    ],
    risks: [
      {
        title: "Scenario Does Not Materialize",
        probability: 0.3,
        impact: 5,
        description: "The triggering event may not occur as hypothesized.",
      },
      {
        title: "Market Already Priced In",
        probability: 0.4,
        impact: 3,
        description: "Efficient markets may have already incorporated this scenario.",
      },
    ],
    keyAssumptions: [
      "The trigger event occurs as described",
      "Market reaction follows historical patterns",
      "No offsetting policy response in the short term",
    ],
    triggerEvents: [],
  });
}
