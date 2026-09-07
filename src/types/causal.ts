export type EventCategory =
  | "geopolitical"
  | "economic"
  | "market"
  | "technology"
  | "regulatory"
  | "supply-chain"
  | "social";

export type ImpactDirection = "bullish" | "bearish" | "neutral" | "mixed";

export type TimeUnit = "hours" | "days" | "weeks" | "months" | "quarters" | "years";

export interface FinancialImpact {
  direction: ImpactDirection;
  magnitude: number; // 1-5 scale
  affectedAssets: string[];
}

export interface CausalEvent {
  id: string;
  title: string;
  description: string;
  probability: number; // 0-1
  timeframe: {
    min: number;
    max: number;
    unit: TimeUnit;
  };
  category: EventCategory;
  financialImpact: FinancialImpact;
  reasoning: string;
  isRoot: boolean;
  isUserModified: boolean;
  branchId: string;
}

export interface CausalEdge {
  id: string;
  source: string;
  target: string;
  confidence: number; // 0-1
  mechanism: string;
  timeDelay: string;
  branchId: string;
}

export interface Branch {
  id: string;
  name: string;
  parentBranchId: string | null;
  forkPointEventId: string | null;
  color: string;
}

export type ExplorerMode = "discover" | "validate";

export interface CausalGraph {
  id: string;
  title: string;
  mode: ExplorerMode;
  rootEventId: string;
  targetEventId?: string;
  events: Record<string, CausalEvent>;
  edges: Record<string, CausalEdge>;
  branches: Record<string, Branch>;
  activeBranchId: string;
}

export interface TradeIdea {
  asset: string;
  direction: "long" | "short";
  entryCondition: string;
  stopLoss: string;
  takeProfit: string;
  timeHorizon: string;
  rationale: string;
}

export interface RiskFactor {
  title: string;
  probability: number;
  impact: number; // 1-5
  description: string;
}

export interface TradingThesis {
  title: string;
  summary: string;
  conviction: number; // 1-5
  trades: TradeIdea[];
  risks: RiskFactor[];
  keyAssumptions: string[];
  triggerEvents: string[];
}
