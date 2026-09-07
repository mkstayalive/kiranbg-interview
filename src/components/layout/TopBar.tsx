"use client";

import { Activity, GitBranch } from "lucide-react";

export function TopBar() {
  return (
    <header className="h-12 border-b border-border flex items-center justify-between px-4 bg-card shrink-0">
      <div className="flex items-center gap-2">
        <Activity className="h-5 w-5 text-blue-400" />
        <h1 className="text-sm font-semibold tracking-tight">
          Causal Chain Explorer
        </h1>
      </div>
      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <GitBranch className="h-3.5 w-3.5" />
          <span>Multiverse Mode</span>
        </div>
      </div>
    </header>
  );
}
