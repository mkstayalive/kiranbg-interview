"use client";

import { TrendingUp, TrendingDown, Minus, Zap } from "lucide-react";
import { getImpactBg } from "@/lib/utils/colors";
import type { ImpactDirection } from "@/types/causal";

interface ImpactIndicatorProps {
  direction: ImpactDirection;
  magnitude: number;
  size?: "sm" | "md";
}

function ImpactIcon({ direction, className }: { direction: ImpactDirection; className?: string }) {
  switch (direction) {
    case "bullish":
      return <TrendingUp className={className} />;
    case "bearish":
      return <TrendingDown className={className} />;
    case "mixed":
      return <Zap className={className} />;
    default:
      return <Minus className={className} />;
  }
}

export function ImpactIndicator({ direction, magnitude, size = "sm" }: ImpactIndicatorProps) {
  const colorClass = getImpactBg(direction);
  const sizeClass = size === "sm" ? "text-[10px] px-1.5 py-0.5" : "text-xs px-2 py-1";
  const iconSize = size === "sm" ? "h-3 w-3" : "h-3.5 w-3.5";

  return (
    <span className={`inline-flex items-center gap-1 rounded font-medium ${colorClass} ${sizeClass}`}>
      <ImpactIcon direction={direction} className={iconSize} />
      {direction} ({magnitude}/5)
    </span>
  );
}
