"use client";

import { Activity } from "lucide-react";

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-8">
      <div className="rounded-full bg-secondary p-4 mb-4">
        <Activity className="h-8 w-8 text-muted-foreground" />
      </div>
      <h2 className="text-lg font-semibold mb-2">No Causal Chain Yet</h2>
      <p className="text-sm text-muted-foreground max-w-md">
        Type a &quot;What if...?&quot; hypothesis in the left panel or select a preset
        scenario to generate a causal chain visualization.
      </p>
    </div>
  );
}
