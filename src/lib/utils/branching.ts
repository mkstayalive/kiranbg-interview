import { nanoid } from "nanoid";
import type { CausalGraph, CausalEvent, CausalEdge, Branch } from "@/types/causal";
import { getBranchColor } from "./colors";

/**
 * Creates a new branch by forking from a given event.
 * Deep-clones all downstream events and edges, remapping IDs to the new branch.
 */
export function createBranchFromEvent(
  graph: CausalGraph,
  forkPointEventId: string,
  modifiedEvent: Partial<CausalEvent>,
  branchName?: string
): {
  branch: Branch;
  events: Record<string, CausalEvent>;
  edges: Record<string, CausalEdge>;
} {
  const branchIndex = Object.keys(graph.branches).length;
  const branchId = `branch-${nanoid(8)}`;

  const branch: Branch = {
    id: branchId,
    name: branchName ?? `Branch ${branchIndex + 1}`,
    parentBranchId: graph.activeBranchId,
    forkPointEventId,
    color: getBranchColor(branchIndex),
  };

  // Find all downstream events from the fork point
  const downstreamEventIds = findDownstreamEvents(graph, forkPointEventId);

  // Create ID mapping: old ID → new ID
  const idMap = new Map<string, string>();
  idMap.set(forkPointEventId, `evt-${nanoid(8)}`);
  for (const eventId of downstreamEventIds) {
    idMap.set(eventId, `evt-${nanoid(8)}`);
  }

  // Clone the fork point event with modifications
  const forkPointEvent = graph.events[forkPointEventId];
  const newForkPointId = idMap.get(forkPointEventId)!;
  const events: Record<string, CausalEvent> = {
    [newForkPointId]: {
      ...structuredClone(forkPointEvent),
      ...modifiedEvent,
      id: newForkPointId,
      branchId,
      isUserModified: true,
    },
  };

  // Clone downstream events
  for (const eventId of downstreamEventIds) {
    const newId = idMap.get(eventId)!;
    events[newId] = {
      ...structuredClone(graph.events[eventId]),
      id: newId,
      branchId,
    };
  }

  // Clone and remap edges
  const edges: Record<string, CausalEdge> = {};

  // Add edge from the original parent to the new fork point
  const parentEdges = Object.values(graph.edges).filter(
    (e) => e.target === forkPointEventId
  );
  for (const parentEdge of parentEdges) {
    const newEdgeId = `edge-${nanoid(8)}`;
    edges[newEdgeId] = {
      ...structuredClone(parentEdge),
      id: newEdgeId,
      target: newForkPointId,
      branchId,
    };
  }

  // Clone downstream edges with remapped IDs
  for (const edge of Object.values(graph.edges)) {
    const sourceInDownstream =
      idMap.has(edge.source) && edge.source !== forkPointEventId;
    const forkSourceEdge =
      edge.source === forkPointEventId &&
      downstreamEventIds.has(edge.target);

    if (sourceInDownstream || forkSourceEdge) {
      const newEdgeId = `edge-${nanoid(8)}`;
      edges[newEdgeId] = {
        ...structuredClone(edge),
        id: newEdgeId,
        source: idMap.get(edge.source) ?? edge.source,
        target: idMap.get(edge.target) ?? edge.target,
        branchId,
      };
    }
  }

  return { branch, events, edges };
}

/**
 * BFS to find all events downstream of a given event.
 */
function findDownstreamEvents(
  graph: CausalGraph,
  startEventId: string
): Set<string> {
  const visited = new Set<string>();
  const queue: string[] = [];

  // Find direct children
  for (const edge of Object.values(graph.edges)) {
    if (edge.source === startEventId) {
      queue.push(edge.target);
    }
  }

  while (queue.length > 0) {
    const eventId = queue.shift()!;
    if (visited.has(eventId)) continue;
    visited.add(eventId);

    for (const edge of Object.values(graph.edges)) {
      if (edge.source === eventId && !visited.has(edge.target)) {
        queue.push(edge.target);
      }
    }
  }

  return visited;
}
