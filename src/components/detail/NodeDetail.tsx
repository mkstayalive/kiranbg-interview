"use client";

import { useState } from "react";
import { useGraphStore } from "@/store/graphStore";
import { ProbabilityBadge } from "@/components/shared/ProbabilityBadge";
import { ImpactIndicator } from "@/components/shared/ImpactIndicator";
import { AssetChips } from "./AssetChips";
import { NodeEditForm } from "./NodeEditForm";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Pencil, X, GitBranch, MessageSquare } from "lucide-react";

export function NodeDetail() {
  const [isEditing, setIsEditing] = useState(false);
  const selectedNodeId = useGraphStore((s) => s.selectedNodeId);
  const graph = useGraphStore((s) => s.graph);

  if (!selectedNodeId || !graph) return null;

  const event = graph.events[selectedNodeId];
  if (!event) return null;

  const branch = graph.branches[event.branchId];
  const incomingEdges = Object.values(graph.edges).filter(
    (e) => e.target === selectedNodeId
  );
  const outgoingEdges = Object.values(graph.edges).filter(
    (e) => e.source === selectedNodeId
  );

  if (isEditing) {
    return <NodeEditForm event={event} onClose={() => setIsEditing(false)} />;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1">
          <h3 className="text-sm font-semibold">{event.title}</h3>
          {branch && (
            <div className="flex items-center gap-1 mt-1">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: branch.color }}
              />
              <span className="text-[10px] text-muted-foreground">
                {branch.name}
              </span>
            </div>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsEditing(true)}
          className="h-7 w-7 p-0"
        >
          <Pencil className="h-3.5 w-3.5" />
        </Button>
      </div>

      <p className="text-xs text-muted-foreground leading-relaxed">
        {event.description}
      </p>

      <div className="flex flex-wrap gap-2">
        <ProbabilityBadge probability={event.probability} size="md" />
        <ImpactIndicator
          direction={event.financialImpact.direction}
          magnitude={event.financialImpact.magnitude}
          size="md"
        />
        <Badge variant="outline" className="text-[10px]">
          {event.category}
        </Badge>
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          <span>
            {event.timeframe.min === event.timeframe.max
              ? `${event.timeframe.min} ${event.timeframe.unit}`
              : `${event.timeframe.min}-${event.timeframe.max} ${event.timeframe.unit}`}
          </span>
        </div>
      </div>

      <div className="space-y-1.5">
        <h4 className="text-xs font-medium flex items-center gap-1">
          <span>Affected Assets</span>
        </h4>
        <AssetChips
          assets={event.financialImpact.affectedAssets}
          direction={event.financialImpact.direction}
        />
      </div>

      <div className="space-y-1.5">
        <h4 className="text-xs font-medium flex items-center gap-1">
          <MessageSquare className="h-3 w-3" />
          Reasoning
        </h4>
        <p className="text-xs text-muted-foreground leading-relaxed bg-secondary/50 rounded-md p-2.5">
          {event.reasoning}
        </p>
      </div>

      {incomingEdges.length > 0 && (
        <div className="space-y-1.5">
          <h4 className="text-xs font-medium">Caused By</h4>
          {incomingEdges.map((edge) => {
            const sourceEvent = graph.events[edge.source];
            return (
              <div
                key={edge.id}
                className="text-xs bg-secondary/50 rounded-md p-2 space-y-1"
              >
                <p className="font-medium">{sourceEvent?.title ?? "Unknown"}</p>
                <p className="text-muted-foreground">{edge.mechanism}</p>
                <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                  <span>Confidence: {Math.round(edge.confidence * 100)}%</span>
                  <span>Delay: {edge.timeDelay}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {outgoingEdges.length > 0 && (
        <div className="space-y-1.5">
          <h4 className="text-xs font-medium flex items-center gap-1">
            <GitBranch className="h-3 w-3" />
            Leads To
          </h4>
          {outgoingEdges.map((edge) => {
            const targetEvent = graph.events[edge.target];
            return (
              <div
                key={edge.id}
                className="text-xs bg-secondary/50 rounded-md p-2 space-y-1 cursor-pointer hover:bg-secondary transition-colors"
                onClick={() =>
                  useGraphStore.getState().selectNode(edge.target)
                }
              >
                <p className="font-medium">{targetEvent?.title ?? "Unknown"}</p>
                <p className="text-muted-foreground">{edge.mechanism}</p>
                <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                  <span>Confidence: {Math.round(edge.confidence * 100)}%</span>
                  <span>Delay: {edge.timeDelay}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
