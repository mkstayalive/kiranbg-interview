"use client";

import { useGraphStore } from "@/store/graphStore";
import { Search, ShieldCheck } from "lucide-react";

export function ModeSelector() {
  const mode = useGraphStore((s) => s.mode);
  const setMode = useGraphStore((s) => s.setMode);

  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
        Mode
      </label>
      <div className="grid grid-cols-2 gap-1.5">
        <button
          onClick={() => setMode("discover")}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-xs font-medium transition-colors ${
            mode === "discover"
              ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
              : "bg-secondary text-muted-foreground hover:text-foreground"
          }`}
        >
          <Search className="h-3.5 w-3.5" />
          Discover
        </button>
        <button
          onClick={() => setMode("validate")}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-xs font-medium transition-colors ${
            mode === "validate"
              ? "bg-green-500/20 text-green-400 border border-green-500/30"
              : "bg-secondary text-muted-foreground hover:text-foreground"
          }`}
        >
          <ShieldCheck className="h-3.5 w-3.5" />
          Validate
        </button>
      </div>
    </div>
  );
}
