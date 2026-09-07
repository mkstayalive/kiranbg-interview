"use client";

import type { TradeIdea } from "@/types/causal";
import { TrendingUp, TrendingDown } from "lucide-react";

interface TradeCardProps {
  trade: TradeIdea;
}

export function TradeCard({ trade }: TradeCardProps) {
  const isLong = trade.direction === "long";

  return (
    <div
      className={`rounded-lg border p-3 space-y-2 ${
        isLong
          ? "border-green-500/30 bg-green-500/5"
          : "border-red-500/30 bg-red-500/5"
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono font-semibold">{trade.asset}</span>
        <span
          className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium ${
            isLong
              ? "bg-green-500/20 text-green-400"
              : "bg-red-500/20 text-red-400"
          }`}
        >
          {isLong ? (
            <TrendingUp className="h-3 w-3" />
          ) : (
            <TrendingDown className="h-3 w-3" />
          )}
          {trade.direction.toUpperCase()}
        </span>
      </div>

      <p className="text-[11px] text-muted-foreground leading-relaxed">
        {trade.rationale}
      </p>

      <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-[10px]">
        <div>
          <span className="text-muted-foreground">Entry: </span>
          <span className="text-foreground">{trade.entryCondition}</span>
        </div>
        <div>
          <span className="text-muted-foreground">Horizon: </span>
          <span className="text-foreground">{trade.timeHorizon}</span>
        </div>
        <div>
          <span className="text-muted-foreground">Stop: </span>
          <span className="text-red-400">{trade.stopLoss}</span>
        </div>
        <div>
          <span className="text-muted-foreground">Target: </span>
          <span className="text-green-400">{trade.takeProfit}</span>
        </div>
      </div>
    </div>
  );
}
