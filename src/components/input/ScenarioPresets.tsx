"use client";

import { scenarioPresets } from "@/lib/mock/scenarios";
import { useChainGeneration } from "@/hooks/useChainGeneration";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";

export function ScenarioPresets() {
  const { loadScenario, isGenerating } = useChainGeneration();

  return (
    <div className="space-y-2">
      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
        Preset Scenarios
      </label>
      <div className="space-y-1.5">
        {scenarioPresets.map((preset) => (
          <button
            key={preset.id}
            onClick={() => loadScenario(preset.id)}
            disabled={isGenerating}
            className="w-full text-left p-2.5 rounded-md bg-secondary/50 hover:bg-secondary transition-colors border border-transparent hover:border-border disabled:opacity-50"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium truncate">{preset.title}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5 line-clamp-1">
                  {preset.description}
                </p>
              </div>
              <Badge
                variant="outline"
                className="shrink-0 text-[9px] px-1.5 py-0"
              >
                {preset.category}
              </Badge>
            </div>
            {isGenerating && (
              <Loader2 className="h-3 w-3 animate-spin mt-1 text-muted-foreground" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
