"use client";

import { memo } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import type { CausalEvent } from "@/types/causal";
import { getProbabilityBg, getImpactBg, getImpactBorderColor } from "@/lib/utils/colors";
import { TrendingUp, TrendingDown, Minus, GitBranch, Zap } from "lucide-react";
import { useGraphStore } from "@/store/graphStore";

interface CausalNodeData {
  event: CausalEvent;
  branchColor: string;
  isRoot: boolean;
  hasFork: boolean;
}

function ImpactIcon({ direction }: { direction: string }) {
  switch (direction) {
    case "bullish":
      return <TrendingUp className="h-3 w-3" />;
    case "bearish":
      return <TrendingDown className="h-3 w-3" />;
    case "mixed":
      return <Zap className="h-3 w-3" />;
    default:
      return <Minus className="h-3 w-3" />;
  }
}

function CausalNodeComponent({ data, id }: NodeProps) {
  const nodeData = data as unknown as CausalNodeData;
  const { event, branchColor, isRoot, hasFork } = nodeData;
  const selectedNodeId = useGraphStore((s) => s.selectedNodeId);
  const selectNode = useGraphStore((s) => s.selectNode);
  const isSelected = selectedNodeId === id;

  const probClass = getProbabilityBg(event.probability);
  const impactClass = getImpactBg(event.financialImpact.direction);
  const borderClass = getImpactBorderColor(event.financialImpact.direction);

  return (
    <div
      className={`
        w-[270px] rounded-lg border-2 bg-card p-3 cursor-pointer
        transition-all duration-200
        ${borderClass}
        ${isSelected ? "ring-2 ring-blue-400 ring-offset-2 ring-offset-background shadow-lg shadow-blue-500/20" : "hover:shadow-md"}
      `}
      style={{ borderLeftColor: branchColor, borderLeftWidth: 4 }}
      onClick={() => selectNode(id)}
    >
      {!isRoot && (
        <Handle
          type="target"
          position={Position.Top}
          className="!bg-muted-foreground !border-background !w-2 !h-2"
        />
      )}

      <div className="flex items-start justify-between gap-2 mb-1.5">
        <h3 className="text-xs font-semibold leading-tight line-clamp-2 flex-1">
          {event.title}
        </h3>
        <div className="flex items-center gap-1 shrink-0">
          {hasFork && (
            <div className="p-0.5 rounded bg-purple-500/20">
              <GitBranch className="h-3 w-3 text-purple-400" />
            </div>
          )}
        </div>
      </div>

      <p className="text-[10px] text-muted-foreground line-clamp-2 mb-2 leading-relaxed">
        {event.description}
      </p>

      <div className="flex items-center gap-1.5 flex-wrap">
        <span
          className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium ${probClass}`}
        >
          {Math.round(event.probability * 100)}%
        </span>

        <span
          className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium ${impactClass}`}
        >
          <ImpactIcon direction={event.financialImpact.direction} />
          {event.financialImpact.direction}
        </span>

        {event.financialImpact.affectedAssets.slice(0, 2).map((asset) => (
          <span
            key={asset}
            className="px-1.5 py-0.5 rounded bg-secondary text-[10px] text-muted-foreground font-mono"
          >
            {asset.length > 8 ? asset.slice(0, 8) : asset}
          </span>
        ))}
        {event.financialImpact.affectedAssets.length > 2 && (
          <span className="text-[10px] text-muted-foreground">
            +{event.financialImpact.affectedAssets.length - 2}
          </span>
        )}
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-muted-foreground !border-background !w-2 !h-2"
      />
    </div>
  );
}

export const CausalNodeMemo = memo(CausalNodeComponent);
