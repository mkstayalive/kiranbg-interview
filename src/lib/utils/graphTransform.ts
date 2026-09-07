import type { Node, Edge } from "@xyflow/react";
import type { CausalGraph } from "@/types/causal";
import { getEdgeStyle } from "./colors";

export function graphToReactFlowNodes(
  graph: CausalGraph,
  visibleBranchIds: Set<string>
): Node[] {
  const events = Object.values(graph.events);

  // Collect all node IDs that are relevant to visible branches
  const visibleEventIds = new Set<string>();

  for (const event of events) {
    if (visibleBranchIds.has(event.branchId)) {
      visibleEventIds.add(event.id);
    }
  }

  // Also include events that are sources of visible branch edges
  // (parent branch events that connect to the fork point)
  for (const edge of Object.values(graph.edges)) {
    if (visibleBranchIds.has(edge.branchId)) {
      visibleEventIds.add(edge.source);
      visibleEventIds.add(edge.target);
    }
  }

  return events
    .filter((event) => visibleEventIds.has(event.id))
    .map((event) => ({
      id: event.id,
      type: "causalNode",
      position: { x: 0, y: 0 }, // Will be set by Dagre
      data: {
        event,
        branchColor: graph.branches[event.branchId]?.color ?? "#3b82f6",
        isRoot: event.isRoot,
        hasFork: Object.values(graph.branches).some(
          (b) => b.forkPointEventId === event.id
        ),
      },
    }));
}

export function graphToReactFlowEdges(
  graph: CausalGraph,
  visibleBranchIds: Set<string>
): Edge[] {
  const edges = Object.values(graph.edges);

  return edges
    .filter((edge) => visibleBranchIds.has(edge.branchId))
    .map((edge) => {
      const style = getEdgeStyle(edge.confidence);
      const branchColor = graph.branches[edge.branchId]?.color ?? "#3b82f6";
      return {
        id: edge.id,
        source: edge.source,
        target: edge.target,
        type: "causalEdge",
        data: {
          edge,
          branchColor,
        },
        style: {
          stroke: branchColor,
          strokeWidth: style.strokeWidth,
          strokeDasharray: style.strokeDasharray,
        },
        animated: edge.confidence < 0.5,
      };
    });
}
