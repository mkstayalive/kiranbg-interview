import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type {
  CausalGraph,
  CausalEvent,
  Branch,
  TradingThesis,
  ExplorerMode,
} from "@/types/causal";

interface GraphState {
  graph: CausalGraph | null;
  selectedNodeId: string | null;
  selectedEdgeId: string | null;
  activeBranchId: string | null;
  visibleBranchIds: Set<string>;
  thesis: TradingThesis | null;
  isGenerating: boolean;
  isGeneratingThesis: boolean;
  mode: ExplorerMode;
}

interface GraphActions {
  setGraph: (graph: CausalGraph) => void;
  clearGraph: () => void;
  selectNode: (nodeId: string | null) => void;
  selectEdge: (edgeId: string | null) => void;
  updateEvent: (eventId: string, updates: Partial<CausalEvent>) => void;
  addBranch: (branch: Branch) => void;
  switchBranch: (branchId: string) => void;
  toggleBranchVisibility: (branchId: string) => void;
  setThesis: (thesis: TradingThesis | null) => void;
  setMode: (mode: ExplorerMode) => void;
  setIsGenerating: (v: boolean) => void;
  setIsGeneratingThesis: (v: boolean) => void;
  addEventsAndEdges: (
    events: CausalGraph["events"],
    edges: CausalGraph["edges"]
  ) => void;
}

export const useGraphStore = create<GraphState & GraphActions>()(
  immer((set) => ({
    // State
    graph: null,
    selectedNodeId: null,
    selectedEdgeId: null,
    activeBranchId: null,
    visibleBranchIds: new Set<string>(),
    thesis: null,
    isGenerating: false,
    isGeneratingThesis: false,
    mode: "discover",

    // Actions
    setGraph: (graph) =>
      set((state) => {
        state.graph = graph;
        state.activeBranchId = graph.activeBranchId;
        state.visibleBranchIds = new Set(Object.keys(graph.branches));
        state.selectedNodeId = null;
        state.selectedEdgeId = null;
        state.thesis = null;
      }),

    clearGraph: () =>
      set((state) => {
        state.graph = null;
        state.selectedNodeId = null;
        state.selectedEdgeId = null;
        state.activeBranchId = null;
        state.visibleBranchIds = new Set();
        state.thesis = null;
      }),

    selectNode: (nodeId) =>
      set((state) => {
        state.selectedNodeId = nodeId;
        state.selectedEdgeId = null;
      }),

    selectEdge: (edgeId) =>
      set((state) => {
        state.selectedEdgeId = edgeId;
        state.selectedNodeId = null;
      }),

    updateEvent: (eventId, updates) =>
      set((state) => {
        if (state.graph && state.graph.events[eventId]) {
          Object.assign(state.graph.events[eventId], updates);
        }
      }),

    addBranch: (branch) =>
      set((state) => {
        if (state.graph) {
          state.graph.branches[branch.id] = branch;
          state.visibleBranchIds.add(branch.id);
        }
      }),

    switchBranch: (branchId) =>
      set((state) => {
        if (state.graph && state.graph.branches[branchId]) {
          state.activeBranchId = branchId;
          state.graph.activeBranchId = branchId;
        }
      }),

    toggleBranchVisibility: (branchId) =>
      set((state) => {
        if (state.visibleBranchIds.has(branchId)) {
          // Don't allow hiding all branches
          if (state.visibleBranchIds.size > 1) {
            state.visibleBranchIds.delete(branchId);
          }
        } else {
          state.visibleBranchIds.add(branchId);
        }
      }),

    setThesis: (thesis) =>
      set((state) => {
        state.thesis = thesis;
      }),

    setMode: (mode) =>
      set((state) => {
        state.mode = mode;
      }),

    setIsGenerating: (v) =>
      set((state) => {
        state.isGenerating = v;
      }),

    setIsGeneratingThesis: (v) =>
      set((state) => {
        state.isGeneratingThesis = v;
      }),

    addEventsAndEdges: (events, edges) =>
      set((state) => {
        if (state.graph) {
          Object.assign(state.graph.events, events);
          Object.assign(state.graph.edges, edges);
        }
      }),
  }))
);
