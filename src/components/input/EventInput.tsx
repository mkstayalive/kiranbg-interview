"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Sparkles } from "lucide-react";
import { useChainGeneration } from "@/hooks/useChainGeneration";

export function EventInput() {
  const [hypothesis, setHypothesis] = useState("");
  const { generate, isGenerating } = useChainGeneration();

  const handleGenerate = () => {
    if (!hypothesis.trim()) return;
    generate(hypothesis.trim());
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      handleGenerate();
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
        Hypothesis
      </label>
      <Textarea
        placeholder="What if...?"
        value={hypothesis}
        onChange={(e) => setHypothesis(e.target.value)}
        onKeyDown={handleKeyDown}
        className="min-h-[80px] text-sm resize-none bg-background"
        disabled={isGenerating}
      />
      <Button
        onClick={handleGenerate}
        disabled={!hypothesis.trim() || isGenerating}
        className="w-full"
        size="sm"
      >
        {isGenerating ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Generating Chain...
          </>
        ) : (
          <>
            <Sparkles className="h-4 w-4 mr-2" />
            Generate Causal Chain
          </>
        )}
      </Button>
      <p className="text-[10px] text-muted-foreground">
        Press {typeof navigator !== "undefined" && /Mac/.test(navigator.userAgent) ? "Cmd" : "Ctrl"}+Enter to generate
      </p>
    </div>
  );
}
