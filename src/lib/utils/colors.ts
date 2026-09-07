import type { ImpactDirection } from "@/types/causal";

/**
 * Returns a Tailwind-compatible color class based on probability value.
 * Red (0-20%) → Orange (20-40%) → Yellow (40-60%) → Green (60-80%) → Blue (80-100%)
 */
export function getProbabilityColor(probability: number): string {
  if (probability <= 0.2) return "#ef4444"; // red-500
  if (probability <= 0.4) return "#f97316"; // orange-500
  if (probability <= 0.6) return "#eab308"; // yellow-500
  if (probability <= 0.8) return "#22c55e"; // green-500
  return "#3b82f6"; // blue-500
}

export function getProbabilityBg(probability: number): string {
  if (probability <= 0.2) return "bg-red-500/20 text-red-400";
  if (probability <= 0.4) return "bg-orange-500/20 text-orange-400";
  if (probability <= 0.6) return "bg-yellow-500/20 text-yellow-400";
  if (probability <= 0.8) return "bg-green-500/20 text-green-400";
  return "bg-blue-500/20 text-blue-400";
}

export function getImpactColor(direction: ImpactDirection): string {
  switch (direction) {
    case "bullish":
      return "#22c55e";
    case "bearish":
      return "#ef4444";
    case "mixed":
      return "#f59e0b";
    case "neutral":
      return "#6b7280";
  }
}

export function getImpactBg(direction: ImpactDirection): string {
  switch (direction) {
    case "bullish":
      return "bg-green-500/20 text-green-400";
    case "bearish":
      return "bg-red-500/20 text-red-400";
    case "mixed":
      return "bg-amber-500/20 text-amber-400";
    case "neutral":
      return "bg-gray-500/20 text-gray-400";
  }
}

export function getImpactBorderColor(direction: ImpactDirection): string {
  switch (direction) {
    case "bullish":
      return "border-green-500/40";
    case "bearish":
      return "border-red-500/40";
    case "mixed":
      return "border-amber-500/40";
    case "neutral":
      return "border-gray-500/40";
  }
}

/** Branch color palette. Main branch is always blue. */
const BRANCH_COLORS = [
  "#3b82f6", // blue
  "#a855f7", // purple
  "#14b8a6", // teal
  "#f97316", // orange
  "#ec4899", // pink
  "#84cc16", // lime
];

export function getBranchColor(index: number): string {
  return BRANCH_COLORS[index % BRANCH_COLORS.length];
}

export function getEdgeStyle(confidence: number) {
  if (confidence > 0.8) {
    return { strokeWidth: 3, strokeDasharray: undefined };
  }
  if (confidence >= 0.5) {
    return { strokeWidth: 2, strokeDasharray: undefined };
  }
  return { strokeWidth: 1.5, strokeDasharray: "6 3" };
}
