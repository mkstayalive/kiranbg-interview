"use client";

import { useGraphStore } from "@/store/graphStore";
import { GitBranch, Eye, EyeOff } from "lucide-react";

export function BranchSelector() {
  const graph = useGraphStore((s) => s.graph);
  const activeBranchId = useGraphStore((s) => s.activeBranchId);
  const visibleBranchIds = useGraphStore((s) => s.visibleBranchIds);
  const switchBranch = useGraphStore((s) => s.switchBranch);
  const toggleBranchVisibility = useGraphStore((s) => s.toggleBranchVisibility);

  if (!graph) return null;

  const branches = Object.values(graph.branches);

  if (branches.length <= 1) return null;

  return (
    <div className="space-y-2">
      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-1">
        <GitBranch className="h-3 w-3" />
        Timelines
      </label>
      <div className="space-y-1">
        {branches.map((branch) => {
          const isActive = activeBranchId === branch.id;
          const isVisible = visibleBranchIds.has(branch.id);

          return (
            <div
              key={branch.id}
              className={`flex items-center gap-2 px-2.5 py-1.5 rounded-md transition-colors ${
                isActive
                  ? "bg-secondary border border-border"
                  : "hover:bg-secondary/50"
              }`}
            >
              <div
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: branch.color }}
              />
              <button
                onClick={() => switchBranch(branch.id)}
                className="flex-1 text-left text-xs font-medium truncate"
              >
                {branch.name}
              </button>
              <button
                onClick={() => toggleBranchVisibility(branch.id)}
                className="p-0.5 rounded hover:bg-secondary"
                title={isVisible ? "Hide branch" : "Show branch"}
              >
                {isVisible ? (
                  <Eye className="h-3 w-3 text-muted-foreground" />
                ) : (
                  <EyeOff className="h-3 w-3 text-muted-foreground/50" />
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
