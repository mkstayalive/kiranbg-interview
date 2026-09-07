"use client";

import { getProbabilityBg } from "@/lib/utils/colors";

interface ProbabilityBadgeProps {
  probability: number;
  size?: "sm" | "md";
}

export function ProbabilityBadge({ probability, size = "sm" }: ProbabilityBadgeProps) {
  const colorClass = getProbabilityBg(probability);
  const sizeClass = size === "sm" ? "text-[10px] px-1.5 py-0.5" : "text-xs px-2 py-1";

  return (
    <span className={`inline-flex items-center rounded font-medium ${colorClass} ${sizeClass}`}>
      {Math.round(probability * 100)}% likely
    </span>
  );
}
