"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useGraphStore } from "@/store/graphStore";
import { createBranchFromEvent } from "@/lib/utils/branching";
import type { CausalEvent, ImpactDirection } from "@/types/causal";
import { X, GitBranch, Save } from "lucide-react";

interface NodeEditFormProps {
  event: CausalEvent;
  onClose: () => void;
}

export function NodeEditForm({ event, onClose }: NodeEditFormProps) {
  const [title, setTitle] = useState(event.title);
  const [description, setDescription] = useState(event.description);
  const [probability, setProbability] = useState(
    String(Math.round(event.probability * 100))
  );
  const [direction, setDirection] = useState<ImpactDirection>(
    event.financialImpact.direction
  );
  const [branchName, setBranchName] = useState("");

  const graph = useGraphStore((s) => s.graph);
  const updateEvent = useGraphStore((s) => s.updateEvent);
  const addBranch = useGraphStore((s) => s.addBranch);
  const addEventsAndEdges = useGraphStore((s) => s.addEventsAndEdges);

  const handleSave = () => {
    updateEvent(event.id, {
      title,
      description,
      probability: Number(probability) / 100,
      financialImpact: {
        ...event.financialImpact,
        direction,
      },
      isUserModified: true,
    });
    onClose();
  };

  const handleFork = () => {
    if (!graph) return;

    const modifications: Partial<CausalEvent> = {
      title,
      description,
      probability: Number(probability) / 100,
      financialImpact: {
        ...event.financialImpact,
        direction,
      },
    };

    const { branch, events, edges } = createBranchFromEvent(
      graph,
      event.id,
      modifications,
      branchName || undefined
    );

    addBranch(branch);
    addEventsAndEdges(events, edges);
    onClose();
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">Edit Event</h3>
        <Button variant="ghost" size="sm" onClick={onClose} className="h-7 w-7 p-0">
          <X className="h-3.5 w-3.5" />
        </Button>
      </div>

      <div className="space-y-2">
        <label className="text-xs text-muted-foreground">Title</label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-sm h-8"
        />
      </div>

      <div className="space-y-2">
        <label className="text-xs text-muted-foreground">Description</label>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="text-xs min-h-[60px] resize-none"
        />
      </div>

      <div className="space-y-2">
        <label className="text-xs text-muted-foreground">
          Probability (%)
        </label>
        <Input
          type="number"
          min="0"
          max="100"
          value={probability}
          onChange={(e) => setProbability(e.target.value)}
          className="text-sm h-8 w-24"
        />
      </div>

      <div className="space-y-2">
        <label className="text-xs text-muted-foreground">
          Impact Direction
        </label>
        <div className="grid grid-cols-4 gap-1">
          {(["bullish", "bearish", "neutral", "mixed"] as const).map((d) => (
            <button
              key={d}
              onClick={() => setDirection(d)}
              className={`px-2 py-1 rounded text-[10px] font-medium transition-colors ${
                direction === d
                  ? d === "bullish"
                    ? "bg-green-500/20 text-green-400 border border-green-500/30"
                    : d === "bearish"
                      ? "bg-red-500/20 text-red-400 border border-red-500/30"
                      : d === "mixed"
                        ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                        : "bg-gray-500/20 text-gray-400 border border-gray-500/30"
                  : "bg-secondary text-muted-foreground"
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      <div className="pt-2 space-y-2">
        <Button onClick={handleSave} size="sm" variant="secondary" className="w-full">
          <Save className="h-3.5 w-3.5 mr-1.5" />
          Save Changes
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-card px-2 text-muted-foreground">or</span>
          </div>
        </div>

        <div className="space-y-1.5">
          <Input
            placeholder="Branch name (optional)"
            value={branchName}
            onChange={(e) => setBranchName(e.target.value)}
            className="text-xs h-7"
          />
          <Button onClick={handleFork} size="sm" className="w-full">
            <GitBranch className="h-3.5 w-3.5 mr-1.5" />
            Fork Timeline
          </Button>
        </div>
      </div>
    </div>
  );
}
