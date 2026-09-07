"use client";

import { useCallback, useEffect, useMemo } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  BackgroundVariant,
  type NodeTypes,
  type EdgeTypes,
  type Node,
  type Edge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useGraphStore } from "@/store/graphStore";
import { graphToReactFlowNodes, graphToReactFlowEdges } from "@/lib/utils/graphTransform";
import { getLayoutedElements } from "@/lib/utils/graphLayout";
import { CausalNodeMemo } from "./CausalNode";
import { CausalEdgeMemo } from "./CausalEdge";

const nodeTypes: NodeTypes = {
  causalNode: CausalNodeMemo as unknown as NodeTypes["causalNode"],
};

const edgeTypes: EdgeTypes = {
  causalEdge: CausalEdgeMemo as unknown as EdgeTypes["causalEdge"],
};

export function CausalGraph() {
  const graph = useGraphStore((s) => s.graph);
  const visibleBranchIds = useGraphStore((s) => s.visibleBranchIds);
  const selectNode = useGraphStore((s) => s.selectNode);

  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  // Convert graph state to React Flow elements whenever graph or visible branches change
  const layoutKey = useMemo(() => {
    if (!graph) return "";
    const eventKeys = Object.keys(graph.events).sort().join(",");
    const edgeKeys = Object.keys(graph.edges).sort().join(",");
    const branchKeys = Array.from(visibleBranchIds).sort().join(",");
    return `${eventKeys}|${edgeKeys}|${branchKeys}`;
  }, [graph, visibleBranchIds]);

  useEffect(() => {
    if (!graph) return;

    const rfNodes = graphToReactFlowNodes(graph, visibleBranchIds);
    const rfEdges = graphToReactFlowEdges(graph, visibleBranchIds);
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      rfNodes,
      rfEdges,
      "TB"
    );

    setNodes(layoutedNodes);
    setEdges(layoutedEdges);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layoutKey]);

  const onPaneClick = useCallback(() => {
    selectNode(null);
  }, [selectNode]);

  if (!graph) return null;

  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onPaneClick={onPaneClick}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        fitViewOptions={{ padding: 0.2, maxZoom: 1.2 }}
        minZoom={0.2}
        maxZoom={2}
        proOptions={{ hideAttribution: true }}
        className="bg-background"
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={20}
          size={1}
          color="rgba(255,255,255,0.05)"
        />
        <Controls
          className="!bg-card !border-border !shadow-lg [&>button]:!bg-card [&>button]:!border-border [&>button]:!text-foreground [&>button:hover]:!bg-secondary"
          showInteractive={false}
        />
      </ReactFlow>
    </div>
  );
}
