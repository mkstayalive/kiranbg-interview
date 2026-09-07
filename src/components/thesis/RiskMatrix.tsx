"use client";

import type { RiskFactor } from "@/types/causal";
import { getProbabilityBg } from "@/lib/utils/colors";

interface RiskMatrixProps {
  risks: RiskFactor[];
}

export function RiskMatrix({ risks }: RiskMatrixProps) {
  return (
    <div className="space-y-2">
      <h4 className="text-xs font-medium">Risk Factors</h4>
      <div className="space-y-1.5">
        {risks.map((risk, i) => {
          const probClass = getProbabilityBg(risk.probability);
          const severity = risk.probability * risk.impact;
          const severityColor =
            severity > 2.5
              ? "bg-red-500/10 border-red-500/20"
              : severity > 1.5
                ? "bg-amber-500/10 border-amber-500/20"
                : "bg-green-500/10 border-green-500/20";

          return (
            <div
              key={i}
              className={`rounded-md border p-2.5 space-y-1 ${severityColor}`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium">{risk.title}</span>
                <span
                  className={`px-1.5 py-0.5 rounded text-[9px] font-medium ${probClass}`}
                >
                  {Math.round(risk.probability * 100)}% / Impact {risk.impact}
                </span>
              </div>
              <p className="text-[10px] text-muted-foreground leading-relaxed">
                {risk.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
