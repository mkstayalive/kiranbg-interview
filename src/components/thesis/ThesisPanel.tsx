"use client";

import { useGraphStore } from "@/store/graphStore";
import { useThesis } from "@/hooks/useThesis";
import { Button } from "@/components/ui/button";
import { TradeCard } from "./TradeCard";
import { RiskMatrix } from "./RiskMatrix";
import { Loader2, Sparkles, Star, CheckCircle } from "lucide-react";

function ConvictionStars({ level }: { level: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-3 w-3 ${
            i < level ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"
          }`}
        />
      ))}
    </div>
  );
}

export function ThesisPanel() {
  const graph = useGraphStore((s) => s.graph);
  const thesis = useGraphStore((s) => s.thesis);
  const { generateThesis, isGeneratingThesis } = useThesis();

  if (!graph) {
    return (
      <p className="text-sm text-muted-foreground text-center py-8">
        Generate a causal chain first, then create a trading thesis.
      </p>
    );
  }

  if (!thesis) {
    return (
      <div className="space-y-3">
        <p className="text-xs text-muted-foreground">
          Analyze the causal chain and generate actionable trade ideas with risk
          assessment.
        </p>
        <Button
          onClick={generateThesis}
          disabled={isGeneratingThesis}
          className="w-full"
          size="sm"
        >
          {isGeneratingThesis ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Generating Thesis...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4 mr-2" />
              Generate Trading Thesis
            </>
          )}
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold">{thesis.title}</h3>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-[10px] text-muted-foreground">Conviction:</span>
          <ConvictionStars level={thesis.conviction} />
        </div>
      </div>

      <p className="text-xs text-muted-foreground leading-relaxed">
        {thesis.summary}
      </p>

      <div className="space-y-2">
        <h4 className="text-xs font-medium">Trade Ideas</h4>
        {thesis.trades.map((trade, i) => (
          <TradeCard key={i} trade={trade} />
        ))}
      </div>

      <RiskMatrix risks={thesis.risks} />

      <div className="space-y-1.5">
        <h4 className="text-xs font-medium">Key Assumptions</h4>
        <ul className="space-y-1">
          {thesis.keyAssumptions.map((assumption, i) => (
            <li
              key={i}
              className="flex items-start gap-1.5 text-[11px] text-muted-foreground"
            >
              <CheckCircle className="h-3 w-3 shrink-0 mt-0.5 text-blue-400" />
              {assumption}
            </li>
          ))}
        </ul>
      </div>

      <Button
        onClick={generateThesis}
        disabled={isGeneratingThesis}
        variant="outline"
        size="sm"
        className="w-full"
      >
        {isGeneratingThesis ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Regenerating...
          </>
        ) : (
          "Regenerate Thesis"
        )}
      </Button>
    </div>
  );
}
