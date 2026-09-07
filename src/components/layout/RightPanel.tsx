"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { NodeDetail } from "@/components/detail/NodeDetail";
import { ThesisPanel } from "@/components/thesis/ThesisPanel";
import { useGraphStore } from "@/store/graphStore";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function RightPanel() {
  const selectedNodeId = useGraphStore((s) => s.selectedNodeId);
  const graph = useGraphStore((s) => s.graph);

  if (!graph) return null;

  return (
    <aside className="w-96 border-l border-border bg-card flex flex-col shrink-0">
      <Tabs defaultValue="detail" className="flex flex-col h-full">
        <TabsList className="mx-4 mt-3 mb-0">
          <TabsTrigger value="detail">Event Detail</TabsTrigger>
          <TabsTrigger value="thesis">Trading Thesis</TabsTrigger>
        </TabsList>
        <TabsContent value="detail" className="flex-1 overflow-hidden mt-0">
          <ScrollArea className="h-full">
            <div className="p-4">
              {selectedNodeId ? (
                <NodeDetail />
              ) : (
                <p className="text-sm text-muted-foreground text-center py-8">
                  Select a node in the graph to view details
                </p>
              )}
            </div>
          </ScrollArea>
        </TabsContent>
        <TabsContent value="thesis" className="flex-1 overflow-hidden mt-0">
          <ScrollArea className="h-full">
            <div className="p-4">
              <ThesisPanel />
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </aside>
  );
}
