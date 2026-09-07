# Design Decisions

This document records the key architectural and UX decisions made in the Causal Chain Explorer, along with the rationale for each.

---

## 1. React Flow over D3.js

**Decision**: Use `@xyflow/react` (React Flow) for graph visualization instead of D3.js.

**Rationale**: React Flow provides first-class React component support for nodes, meaning each node can contain rich interactive UI (badges, chips, buttons) without wrestling with D3's imperative DOM manipulation. For a tool where node content is the primary information surface, this is a significant productivity advantage. D3 would give more visual control but at the cost of rebuilding React's component model inside SVG foreignObjects.

**Trade-off**: Less control over edge rendering and animation compared to raw D3/SVG. Acceptable because edge styling needs are simple (thickness, dash, color).

---

## 2. Zustand over Redux / Context

**Decision**: Use Zustand with immer middleware for state management.

**Rationale**: The app has a single dominant state object (the causal graph) with straightforward update patterns. Zustand's subscription-based model means React Flow nodes only re-render when their specific data changes, not on every store update. Redux would add significant boilerplate (actions, reducers, selectors) for the same result. React Context would cause unnecessary re-renders across the component tree.

**Trade-off**: Less structured than Redux for very large teams. Acceptable for a project of this scale.

---

## 3. Inline Branching over Tab-Based Switching

**Decision**: Display all branches in a single graph canvas with color-coded edges and nodes, rather than separate tabs per branch.

**Rationale**: The core value of branching is comparison. Traders hold multiple scenarios in mind simultaneously, and side-by-side visual comparison in a single canvas supports this mental model. Tab switching forces sequential comparison (look, remember, switch, compare from memory).

**Trade-off**: Graph can get visually cluttered beyond 3-4 branches. Mitigated by branch visibility toggles that let users show/hide specific branches.

---

## 4. Mock-First with Real Architecture

**Decision**: Ship with hand-crafted mock data rather than live LLM responses, while maintaining the full API route architecture.

**Rationale**: Demo quality matters more than live unpredictability for an interview. Mock data ensures every scenario produces a compelling, well-structured causal chain. The API routes and prompt templates are real — switching to live OpenAI calls requires only adding the API key and uncommenting the LLM call.

**Trade-off**: Doesn't demonstrate live LLM integration. Mitigated by including the full prompt engineering code and API route structure.

---

## 5. Top-to-Bottom Graph Layout

**Decision**: Use Dagre with `rankdir: TB` (top-to-bottom) layout.

**Rationale**: Causality flows forward in time, and the universal mental model for time progression is top-to-bottom (timelines, org charts, decision trees). Left-to-right was considered but rejected because node content is wider than it is tall, making TB layout more space-efficient.

**Trade-off**: Very deep chains (10+ layers) require scrolling. Acceptable given typical chains are 3-5 layers deep.

---

## 6. Dark Theme Default

**Decision**: Dark mode only, no light mode toggle.

**Rationale**: Financial terminals (Bloomberg, Refinitiv) universally use dark themes. Traders spend extended hours in front of screens, and dark themes reduce eye strain. A single theme also halves the CSS surface area to maintain.

**Trade-off**: Users who prefer light mode have no option. Acceptable for the target audience.

---

## 7. Thesis as Separate Artifact

**Decision**: Trading thesis is a separate data structure from the causal graph, not embedded in graph nodes.

**Rationale**: A causal graph is analysis (what might happen). A thesis is interpretation (what to do about it). The same graph can support multiple theses — a bull case and a bear case from the same causal chain. Separating them preserves this flexibility and keeps the graph as an objective analytical tool.

**Trade-off**: Thesis doesn't visually link to specific nodes. Mitigated by including `triggerEvents` in the thesis that reference graph event IDs.

---

## 8. Record-Based Data Model

**Decision**: Store events and edges as `Record<string, T>` instead of arrays.

**Rationale**: O(1) lookups by ID are critical for graph operations (find event by ID, check if edge exists, update specific event). Arrays would require `find()` calls throughout the codebase, which are O(n) and less readable. The `branchId` field is denormalized onto each event and edge for fast branch filtering without joins.

**Trade-off**: Slightly more verbose iteration (`Object.values()` instead of direct array methods). Acceptable given the lookup performance benefit.
