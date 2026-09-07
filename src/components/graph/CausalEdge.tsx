"use client";

import { memo } from "react";
import {
  BaseEdge,
  getBezierPath,
  type EdgeProps,
  EdgeLabelRenderer,
} from "@xyflow/react";
import type { CausalEdge as CausalEdgeType } from "@/types/causal";

interface CausalEdgeData {
  edge: CausalEdgeType;
  branchColor: string;
}

function CausalEdgeComponent({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  style,
  animated,
}: EdgeProps) {
  const edgeData = data as unknown as CausalEdgeData;
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        style={style}
        className={animated ? "react-flow__edge-animated" : ""}
      />
      {edgeData?.edge && (
        <EdgeLabelRenderer>
          <div
            className="absolute bg-card/90 backdrop-blur-sm px-1.5 py-0.5 rounded border border-border text-[9px] text-muted-foreground pointer-events-none"
            style={{
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            }}
          >
            {edgeData.edge.timeDelay}
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
}

export const CausalEdgeMemo = memo(CausalEdgeComponent);
