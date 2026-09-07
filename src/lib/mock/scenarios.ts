import type { CausalGraph, TradingThesis } from "@/types/causal";

// ─── Scenario 1: Strait of Hormuz Opens ───────────────────────────────────────

const hormuzMainBranchId = "branch-hormuz-main";
const hormuzAltBranchId = "branch-hormuz-alt";

export const hormuzScenario: CausalGraph = {
  id: "scenario-hormuz",
  title: "Strait of Hormuz Reopens to Full Traffic",
  mode: "discover",
  rootEventId: "h-evt-1",
  activeBranchId: hormuzMainBranchId,
  branches: {
    [hormuzMainBranchId]: {
      id: hormuzMainBranchId,
      name: "Base Case",
      parentBranchId: null,
      forkPointEventId: null,
      color: "#3b82f6",
    },
    [hormuzAltBranchId]: {
      id: hormuzAltBranchId,
      name: "Iran Retaliates",
      parentBranchId: hormuzMainBranchId,
      forkPointEventId: "h-evt-2",
      color: "#a855f7",
    },
  },
  events: {
    "h-evt-1": {
      id: "h-evt-1",
      title: "Strait of Hormuz Reopens",
      description:
        "Diplomatic breakthrough leads to unrestricted passage through the Strait of Hormuz. All naval blockades lifted, insurance premiums on tanker routes drop sharply.",
      probability: 1.0,
      timeframe: { min: 0, max: 0, unit: "days" },
      category: "geopolitical",
      financialImpact: {
        direction: "mixed",
        magnitude: 5,
        affectedAssets: ["CL (Crude Oil)", "XLE", "SHEL", "BP"],
      },
      reasoning: "Root hypothesis — this is the assumed trigger event.",
      isRoot: true,
      isUserModified: false,
      branchId: hormuzMainBranchId,
    },
    "h-evt-2": {
      id: "h-evt-2",
      title: "Oil Supply Surge",
      description:
        "Iranian and Gulf-state crude exports jump 2-3 mbd as tankers resume normal routes. Supply glut builds within weeks.",
      probability: 0.9,
      timeframe: { min: 1, max: 3, unit: "weeks" },
      category: "supply-chain",
      financialImpact: {
        direction: "bearish",
        magnitude: 4,
        affectedAssets: ["CL (Crude Oil)", "BNO", "USO"],
      },
      reasoning:
        "Historical precedent: every time Hormuz tensions eased, tanker traffic normalized within 2 weeks. Iran has pre-loaded tankers ready to ship.",
      isRoot: false,
      isUserModified: false,
      branchId: hormuzMainBranchId,
    },
    "h-evt-3": {
      id: "h-evt-3",
      title: "Crude Price Drop 15-25%",
      description:
        "Brent crude falls from ~$90 to $68-76 range as supply expectations reprice. Contango steepens.",
      probability: 0.8,
      timeframe: { min: 2, max: 6, unit: "weeks" },
      category: "market",
      financialImpact: {
        direction: "bearish",
        magnitude: 5,
        affectedAssets: ["CL (Crude Oil)", "XLE", "OXY", "CVX", "XOM"],
      },
      reasoning:
        "2-3 mbd surplus on a ~100 mbd market is a significant shock. Similar supply additions in 2014-15 caused 40%+ drops, though market structure differs.",
      isRoot: false,
      isUserModified: false,
      branchId: hormuzMainBranchId,
    },
    "h-evt-4": {
      id: "h-evt-4",
      title: "Shipping Cost Reduction",
      description:
        "Global container and bulk freight rates fall 8-12% as insurance premiums on Middle East routes collapse and vessel re-routing is no longer needed.",
      probability: 0.85,
      timeframe: { min: 1, max: 2, unit: "months" },
      category: "supply-chain",
      financialImpact: {
        direction: "bullish",
        magnitude: 3,
        affectedAssets: ["ZIM", "AMZN", "WMT", "TGT"],
      },
      reasoning:
        "Ships currently diverting around the Cape of Good Hope can resume Suez transit. War-risk insurance premiums on Gulf routes were adding $500K+ per voyage.",
      isRoot: false,
      isUserModified: false,
      branchId: hormuzMainBranchId,
    },
    "h-evt-5": {
      id: "h-evt-5",
      title: "Petrochemical Margin Improvement",
      description:
        "Lower feedstock costs boost margins for ethylene, propylene, and downstream plastics producers by 200-400 bps.",
      probability: 0.75,
      timeframe: { min: 1, max: 3, unit: "months" },
      category: "economic",
      financialImpact: {
        direction: "bullish",
        magnitude: 3,
        affectedAssets: ["LYB", "DOW", "DD", "BASFY"],
      },
      reasoning:
        "Naphtha and ethane feedstock costs are directly tied to crude prices. Historical correlation: 10% crude drop → 150-200 bps margin expansion in chemicals.",
      isRoot: false,
      isUserModified: false,
      branchId: hormuzMainBranchId,
    },
    "h-evt-6": {
      id: "h-evt-6",
      title: "Renewables Investment Slowdown",
      description:
        "Cheap oil undercuts the economic case for accelerated renewable energy transition. Solar/wind project IRRs fall below hurdle rates in some markets.",
      probability: 0.6,
      timeframe: { min: 2, max: 6, unit: "months" },
      category: "market",
      financialImpact: {
        direction: "bearish",
        magnitude: 3,
        affectedAssets: ["ENPH", "SEDG", "FSLR", "TAN", "ICLN"],
      },
      reasoning:
        "Contrarian second-order effect. Low oil prices historically slow renewable deployment. However, policy mandates (IRA) provide a floor — effect is muted vs. pre-2020.",
      isRoot: false,
      isUserModified: false,
      branchId: hormuzMainBranchId,
    },
    "h-evt-7": {
      id: "h-evt-7",
      title: "Consumer Spending Boost",
      description:
        "Lower energy and transport costs act as a de facto tax cut. U.S. consumer discretionary spending rises 1-2% above trend.",
      probability: 0.7,
      timeframe: { min: 2, max: 4, unit: "months" },
      category: "economic",
      financialImpact: {
        direction: "bullish",
        magnitude: 2,
        affectedAssets: ["XLY", "AMZN", "HD", "NKE"],
      },
      reasoning:
        "Gasoline represents ~3% of avg U.S. household spending. A $1/gallon drop is ~$1,400/year savings for a typical household.",
      isRoot: false,
      isUserModified: false,
      branchId: hormuzMainBranchId,
    },
    "h-evt-8": {
      id: "h-evt-8",
      title: "OPEC Emergency Cuts",
      description:
        "OPEC+ convenes emergency meeting and announces 1.5 mbd production cut to stabilize prices. Saudi Arabia signals deeper voluntary cuts.",
      probability: 0.65,
      timeframe: { min: 1, max: 2, unit: "months" },
      category: "geopolitical",
      financialImpact: {
        direction: "bullish",
        magnitude: 3,
        affectedAssets: ["CL (Crude Oil)", "XLE", "ARAMCO"],
      },
      reasoning:
        "OPEC has consistently defended price floors. Saudi fiscal breakeven is ~$80/bbl. History: 2020 OPEC+ cut 9.7 mbd in response to demand crash.",
      isRoot: false,
      isUserModified: false,
      branchId: hormuzMainBranchId,
    },
    // ── Alt branch events (Iran retaliates) ──
    "h-evt-alt-1": {
      id: "h-evt-alt-1",
      title: "Iranian Proxy Attacks on Tankers",
      description:
        "Despite diplomatic opening, IRGC-linked groups launch drone/mine attacks on 2-3 tankers in the Gulf. Markets interpret as bad-faith negotiation.",
      probability: 0.35,
      timeframe: { min: 2, max: 4, unit: "weeks" },
      category: "geopolitical",
      financialImpact: {
        direction: "bullish",
        magnitude: 4,
        affectedAssets: ["CL (Crude Oil)", "GLD", "LMT", "RTX"],
      },
      reasoning:
        "IRGC hardliners have historically acted independently of diplomatic channels. Precedent: 2019 tanker attacks occurred during diplomatic talks.",
      isRoot: false,
      isUserModified: false,
      branchId: hormuzAltBranchId,
    },
    "h-evt-alt-2": {
      id: "h-evt-alt-2",
      title: "Oil Price Spike to $110+",
      description:
        "Supply fears reverse the price drop. War risk premiums on Gulf shipping surge. Crude overshoots to $110-120 range.",
      probability: 0.3,
      timeframe: { min: 3, max: 6, unit: "weeks" },
      category: "market",
      financialImpact: {
        direction: "bullish",
        magnitude: 5,
        affectedAssets: ["CL (Crude Oil)", "XLE", "OXY", "HAL"],
      },
      reasoning:
        "Market would price in full Hormuz closure risk. 2019 Saudi Aramco attack caused 15% single-day spike from a lower base.",
      isRoot: false,
      isUserModified: false,
      branchId: hormuzAltBranchId,
    },
    "h-evt-alt-3": {
      id: "h-evt-alt-3",
      title: "Defense Stocks Rally",
      description:
        "U.S. and allied defense stocks surge as military spending expectations increase. Naval deployments to Gulf intensify.",
      probability: 0.4,
      timeframe: { min: 1, max: 3, unit: "weeks" },
      category: "market",
      financialImpact: {
        direction: "bullish",
        magnitude: 3,
        affectedAssets: ["LMT", "RTX", "NOC", "GD", "ITA"],
      },
      reasoning:
        "Direct correlation between Gulf tensions and defense stock performance. LMT +8% during 2020 Iran tensions.",
      isRoot: false,
      isUserModified: false,
      branchId: hormuzAltBranchId,
    },
  },
  edges: {
    "h-edge-1": {
      id: "h-edge-1",
      source: "h-evt-1",
      target: "h-evt-2",
      confidence: 0.9,
      mechanism: "Direct supply channel reopening",
      timeDelay: "1-3 weeks",
      branchId: hormuzMainBranchId,
    },
    "h-edge-2": {
      id: "h-edge-2",
      source: "h-evt-2",
      target: "h-evt-3",
      confidence: 0.85,
      mechanism: "Supply-demand repricing",
      timeDelay: "1-4 weeks",
      branchId: hormuzMainBranchId,
    },
    "h-edge-3": {
      id: "h-edge-3",
      source: "h-evt-1",
      target: "h-evt-4",
      confidence: 0.8,
      mechanism: "Maritime insurance and routing normalization",
      timeDelay: "2-4 weeks",
      branchId: hormuzMainBranchId,
    },
    "h-edge-4": {
      id: "h-edge-4",
      source: "h-evt-3",
      target: "h-evt-5",
      confidence: 0.75,
      mechanism: "Feedstock cost reduction",
      timeDelay: "2-6 weeks",
      branchId: hormuzMainBranchId,
    },
    "h-edge-5": {
      id: "h-edge-5",
      source: "h-evt-3",
      target: "h-evt-6",
      confidence: 0.55,
      mechanism: "Relative energy economics shift",
      timeDelay: "1-3 months",
      branchId: hormuzMainBranchId,
    },
    "h-edge-6": {
      id: "h-edge-6",
      source: "h-evt-3",
      target: "h-evt-7",
      confidence: 0.65,
      mechanism: "Energy cost → consumer disposable income",
      timeDelay: "1-2 months",
      branchId: hormuzMainBranchId,
    },
    "h-edge-7": {
      id: "h-edge-7",
      source: "h-evt-3",
      target: "h-evt-8",
      confidence: 0.7,
      mechanism: "OPEC price defense mechanism",
      timeDelay: "2-6 weeks",
      branchId: hormuzMainBranchId,
    },
    // ── Alt branch edges ──
    "h-edge-alt-1": {
      id: "h-edge-alt-1",
      source: "h-evt-2",
      target: "h-evt-alt-1",
      confidence: 0.35,
      mechanism: "IRGC hardliner sabotage of diplomatic process",
      timeDelay: "2-4 weeks",
      branchId: hormuzAltBranchId,
    },
    "h-edge-alt-2": {
      id: "h-edge-alt-2",
      source: "h-evt-alt-1",
      target: "h-evt-alt-2",
      confidence: 0.8,
      mechanism: "Supply risk repricing",
      timeDelay: "1-2 weeks",
      branchId: hormuzAltBranchId,
    },
    "h-edge-alt-3": {
      id: "h-edge-alt-3",
      source: "h-evt-alt-1",
      target: "h-evt-alt-3",
      confidence: 0.75,
      mechanism: "Military escalation expectations",
      timeDelay: "1-2 days",
      branchId: hormuzAltBranchId,
    },
  },
};

// ─── Scenario 2: AI Export Restrictions ────────────────────────────────────────

const aiMainBranchId = "branch-ai-main";
const aiAltBranchId = "branch-ai-alt";

export const aiExportScenario: CausalGraph = {
  id: "scenario-ai-export",
  title: "U.S. Expands AI Chip Export Restrictions",
  mode: "discover",
  rootEventId: "ai-evt-1",
  activeBranchId: aiMainBranchId,
  branches: {
    [aiMainBranchId]: {
      id: aiMainBranchId,
      name: "Base Case",
      parentBranchId: null,
      forkPointEventId: null,
      color: "#3b82f6",
    },
    [aiAltBranchId]: {
      id: aiAltBranchId,
      name: "China Retaliates",
      parentBranchId: aiMainBranchId,
      forkPointEventId: "ai-evt-3",
      color: "#14b8a6",
    },
  },
  events: {
    "ai-evt-1": {
      id: "ai-evt-1",
      title: "U.S. Expands AI Chip Export Ban",
      description:
        "Commerce Department broadens entity list and closes loopholes on AI accelerator exports. Covers H100, H200, and derivatives. Extended to 30+ countries including Middle East.",
      probability: 1.0,
      timeframe: { min: 0, max: 0, unit: "days" },
      category: "regulatory",
      financialImpact: {
        direction: "mixed",
        magnitude: 5,
        affectedAssets: ["NVDA", "AMD", "INTC", "AVGO"],
      },
      reasoning: "Root hypothesis — this is the assumed trigger event.",
      isRoot: true,
      isUserModified: false,
      branchId: aiMainBranchId,
    },
    "ai-evt-2": {
      id: "ai-evt-2",
      title: "NVIDIA Revenue Hit (10-15%)",
      description:
        "NVIDIA loses ~$10-15B in annual data center GPU revenue from restricted markets. Stock drops 8-12% on guidance revision.",
      probability: 0.85,
      timeframe: { min: 1, max: 2, unit: "weeks" },
      category: "market",
      financialImpact: {
        direction: "bearish",
        magnitude: 4,
        affectedAssets: ["NVDA", "SMH", "SOXX"],
      },
      reasoning:
        "China + restricted markets were ~25% of NVIDIA data center revenue. Even with partial workarounds, immediate impact is significant. October 2022 controls caused 4% single-day drop.",
      isRoot: false,
      isUserModified: false,
      branchId: aiMainBranchId,
    },
    "ai-evt-3": {
      id: "ai-evt-3",
      title: "Cloud Provider Margin Squeeze",
      description:
        "International cloud regions face GPU scarcity. Azure, AWS, GCP raise prices for AI compute in restricted regions by 30-50%.",
      probability: 0.75,
      timeframe: { min: 1, max: 3, unit: "months" },
      category: "technology",
      financialImpact: {
        direction: "mixed",
        magnitude: 3,
        affectedAssets: ["MSFT", "AMZN", "GOOG", "ORCL"],
      },
      reasoning:
        "Hyperscalers have committed capex plans. GPU scarcity in some regions means either higher prices (margin neutral) or lost workloads (margin negative).",
      isRoot: false,
      isUserModified: false,
      branchId: aiMainBranchId,
    },
    "ai-evt-4": {
      id: "ai-evt-4",
      title: "Open Source AI Acceleration",
      description:
        "International AI labs (Mistral, AI21, etc.) pivot aggressively to open-source models optimized for non-NVIDIA hardware. Model efficiency becomes a competitive advantage.",
      probability: 0.7,
      timeframe: { min: 2, max: 6, unit: "months" },
      category: "technology",
      financialImpact: {
        direction: "bearish",
        magnitude: 2,
        affectedAssets: ["MSFT", "GOOG", "META"],
      },
      reasoning:
        "Necessity drives innovation. Chinese labs already developing training techniques for less capable chips. Open-source community has strong incentives to reduce hardware requirements.",
      isRoot: false,
      isUserModified: false,
      branchId: aiMainBranchId,
    },
    "ai-evt-5": {
      id: "ai-evt-5",
      title: "Data Center Demand Shift to U.S./Allied",
      description:
        "Restricted countries redirect AI workloads to U.S., Japan, and European data centers via API access, boosting demand in allied regions.",
      probability: 0.65,
      timeframe: { min: 2, max: 4, unit: "months" },
      category: "technology",
      financialImpact: {
        direction: "bullish",
        magnitude: 3,
        affectedAssets: ["EQIX", "DLR", "AMT", "CCI"],
      },
      reasoning:
        "Workloads still need to run somewhere. Data sovereignty concerns are secondary to capability access for most commercial users.",
      isRoot: false,
      isUserModified: false,
      branchId: aiMainBranchId,
    },
    "ai-evt-6": {
      id: "ai-evt-6",
      title: "Domestic Chip Fabbing Urgency",
      description:
        "CHIPS Act funding accelerates. Intel, TSMC Arizona, and Samsung Texas get fast-tracked approvals. Domestic semiconductor equipment demand spikes.",
      probability: 0.6,
      timeframe: { min: 3, max: 6, unit: "months" },
      category: "regulatory",
      financialImpact: {
        direction: "bullish",
        magnitude: 3,
        affectedAssets: ["INTC", "AMAT", "LRCX", "KLAC", "ASML"],
      },
      reasoning:
        "Export controls strengthen the political case for onshoring. Bipartisan support for semiconductor independence increases.",
      isRoot: false,
      isUserModified: false,
      branchId: aiMainBranchId,
    },
    "ai-evt-7": {
      id: "ai-evt-7",
      title: "Alternative Compute Architectures Emerge",
      description:
        "Startups like Cerebras, Groq, and Chinese chipmakers gain market share with non-CUDA architectures. Fragmentation of AI compute ecosystem.",
      probability: 0.5,
      timeframe: { min: 6, max: 12, unit: "months" },
      category: "technology",
      financialImpact: {
        direction: "bearish",
        magnitude: 3,
        affectedAssets: ["NVDA", "AMD"],
      },
      reasoning:
        "NVIDIA's CUDA moat is deep but not unbreakable. Export controls create artificial demand for alternatives. However, software ecosystem switching costs are enormous.",
      isRoot: false,
      isUserModified: false,
      branchId: aiMainBranchId,
    },
    "ai-evt-8": {
      id: "ai-evt-8",
      title: "AI Services Price Inflation",
      description:
        "End-user AI API prices increase 20-40% globally as compute scarcity propagates through the value chain. Smaller AI startups face margin pressure.",
      probability: 0.6,
      timeframe: { min: 2, max: 4, unit: "months" },
      category: "economic",
      financialImpact: {
        direction: "bearish",
        magnitude: 2,
        affectedAssets: ["AI", "PLTR", "PATH", "SNOW"],
      },
      reasoning:
        "Higher GPU costs flow through to inference pricing. Companies with proprietary models and scale (OpenAI, Google) are better positioned than API-dependent startups.",
      isRoot: false,
      isUserModified: false,
      branchId: aiMainBranchId,
    },
    "ai-evt-9": {
      id: "ai-evt-9",
      title: "Taiwan Risk Premium Increases",
      description:
        "Markets reprice Taiwan invasion risk as export controls signal U.S. willingness to use tech as geopolitical leverage. TSMC ADR volatility spikes.",
      probability: 0.45,
      timeframe: { min: 1, max: 3, unit: "months" },
      category: "geopolitical",
      financialImpact: {
        direction: "bearish",
        magnitude: 4,
        affectedAssets: ["TSM", "EWT", "INDA"],
      },
      reasoning:
        "Export controls are a form of tech containment. Markets may interpret this as preparation for deeper decoupling, increasing geopolitical risk premium.",
      isRoot: false,
      isUserModified: false,
      branchId: aiMainBranchId,
    },
    // ── Alt branch: China retaliates ──
    "ai-evt-alt-1": {
      id: "ai-evt-alt-1",
      title: "China Bans Rare Earth Exports",
      description:
        "China retaliates by restricting exports of gallium, germanium, and rare earth elements critical for semiconductor manufacturing.",
      probability: 0.4,
      timeframe: { min: 2, max: 6, unit: "weeks" },
      category: "geopolitical",
      financialImpact: {
        direction: "bearish",
        magnitude: 4,
        affectedAssets: ["INTC", "TXN", "AMAT", "MP"],
      },
      reasoning:
        "China controls 60-70% of rare earth processing. Has already restricted gallium/germanium exports in 2023 as a warning shot.",
      isRoot: false,
      isUserModified: false,
      branchId: aiAltBranchId,
    },
    "ai-evt-alt-2": {
      id: "ai-evt-alt-2",
      title: "Global Tech Supply Chain Disruption",
      description:
        "Tit-for-tat restrictions cascade through the semiconductor supply chain. Lead times for chips extend from 12 to 20+ weeks.",
      probability: 0.35,
      timeframe: { min: 1, max: 3, unit: "months" },
      category: "supply-chain",
      financialImpact: {
        direction: "bearish",
        magnitude: 4,
        affectedAssets: ["AAPL", "DELL", "HPQ", "SMH"],
      },
      reasoning:
        "2021 chip shortage showed how quickly supply chain disruptions cascade. Rare earth restrictions would hit semiconductor, EV, and defense industries simultaneously.",
      isRoot: false,
      isUserModified: false,
      branchId: aiAltBranchId,
    },
  },
  edges: {
    "ai-edge-1": {
      id: "ai-edge-1",
      source: "ai-evt-1",
      target: "ai-evt-2",
      confidence: 0.9,
      mechanism: "Direct revenue loss from restricted markets",
      timeDelay: "1-2 weeks",
      branchId: aiMainBranchId,
    },
    "ai-edge-2": {
      id: "ai-edge-2",
      source: "ai-evt-1",
      target: "ai-evt-3",
      confidence: 0.8,
      mechanism: "GPU scarcity in international cloud regions",
      timeDelay: "1-3 months",
      branchId: aiMainBranchId,
    },
    "ai-edge-3": {
      id: "ai-edge-3",
      source: "ai-evt-3",
      target: "ai-evt-4",
      confidence: 0.7,
      mechanism: "Hardware scarcity drives software optimization",
      timeDelay: "1-4 months",
      branchId: aiMainBranchId,
    },
    "ai-edge-4": {
      id: "ai-edge-4",
      source: "ai-evt-3",
      target: "ai-evt-5",
      confidence: 0.65,
      mechanism: "Workload migration to available infrastructure",
      timeDelay: "1-2 months",
      branchId: aiMainBranchId,
    },
    "ai-edge-5": {
      id: "ai-edge-5",
      source: "ai-evt-1",
      target: "ai-evt-6",
      confidence: 0.6,
      mechanism: "Political momentum for domestic manufacturing",
      timeDelay: "2-4 months",
      branchId: aiMainBranchId,
    },
    "ai-edge-6": {
      id: "ai-edge-6",
      source: "ai-evt-4",
      target: "ai-evt-7",
      confidence: 0.5,
      mechanism: "Market demand for non-CUDA alternatives",
      timeDelay: "3-6 months",
      branchId: aiMainBranchId,
    },
    "ai-edge-7": {
      id: "ai-edge-7",
      source: "ai-evt-3",
      target: "ai-evt-8",
      confidence: 0.65,
      mechanism: "Compute cost passthrough to end users",
      timeDelay: "1-2 months",
      branchId: aiMainBranchId,
    },
    "ai-edge-8": {
      id: "ai-edge-8",
      source: "ai-evt-1",
      target: "ai-evt-9",
      confidence: 0.45,
      mechanism: "Geopolitical signal interpretation",
      timeDelay: "1-4 weeks",
      branchId: aiMainBranchId,
    },
    // Alt branch edges
    "ai-edge-alt-1": {
      id: "ai-edge-alt-1",
      source: "ai-evt-3",
      target: "ai-evt-alt-1",
      confidence: 0.4,
      mechanism: "Retaliatory trade policy",
      timeDelay: "2-6 weeks",
      branchId: aiAltBranchId,
    },
    "ai-edge-alt-2": {
      id: "ai-edge-alt-2",
      source: "ai-evt-alt-1",
      target: "ai-evt-alt-2",
      confidence: 0.75,
      mechanism: "Supply chain cascade effects",
      timeDelay: "2-8 weeks",
      branchId: aiAltBranchId,
    },
  },
};

// ─── Mock Thesis Data ──────────────────────────────────────────────────────────

export const hormuzThesis: TradingThesis = {
  title: "Hormuz Reopening: Short Oil, Long Consumers",
  summary:
    "A diplomatic reopening of the Strait of Hormuz would trigger a supply-driven crude price collapse. Short energy, long consumer discretionary and petrochemicals. Hedge with defense/gold in case of retaliation.",
  conviction: 4,
  trades: [
    {
      asset: "CL (Crude Oil Futures)",
      direction: "short",
      entryCondition: "Confirmed diplomatic agreement + first tanker transit",
      stopLoss: "$95 (above pre-event highs)",
      takeProfit: "$68-72 range",
      timeHorizon: "2-6 weeks",
      rationale:
        "2-3 mbd supply addition to a balanced market should drive 15-25% price correction.",
    },
    {
      asset: "LYB (LyondellBasell)",
      direction: "long",
      entryCondition: "Crude below $80",
      stopLoss: "10% below entry",
      takeProfit: "15-20% above entry",
      timeHorizon: "1-3 months",
      rationale:
        "Petrochemical margins expand 200-400 bps on lower feedstock costs. LYB has highest naphtha exposure.",
    },
    {
      asset: "XLY (Consumer Discretionary ETF)",
      direction: "long",
      entryCondition: "Gasoline prices at pump drop >$0.50/gallon",
      stopLoss: "5% below entry",
      takeProfit: "8-12% above entry",
      timeHorizon: "2-4 months",
      rationale: "Lower energy costs = consumer spending boost, especially for lower-income households.",
    },
    {
      asset: "TAN (Solar ETF)",
      direction: "short",
      entryCondition: "Crude below $75 sustained for 2 weeks",
      stopLoss: "8% above entry",
      takeProfit: "15% below entry",
      timeHorizon: "3-6 months",
      rationale: "Contrarian play: cheap oil undercuts renewables investment case at the margin.",
    },
  ],
  risks: [
    {
      title: "Iranian Retaliation",
      probability: 0.35,
      impact: 5,
      description: "IRGC proxy attacks on tankers could reverse the entire thesis.",
    },
    {
      title: "OPEC Production Cuts",
      probability: 0.65,
      impact: 3,
      description: "Saudi-led cuts could limit downside in crude prices.",
    },
    {
      title: "Diplomatic Breakdown",
      probability: 0.25,
      impact: 4,
      description: "Agreement could collapse before full implementation.",
    },
  ],
  keyAssumptions: [
    "Diplomatic agreement is credible and enforceable",
    "Iran has pre-loaded tanker capacity ready to ship",
    "OPEC response is delayed by 4-6 weeks (historical pattern)",
    "No simultaneous geopolitical shocks elsewhere",
  ],
  triggerEvents: ["h-evt-1", "h-evt-2", "h-evt-3"],
};

export const aiExportThesis: TradingThesis = {
  title: "AI Export Controls: Long Domestic, Short International",
  summary:
    "Expanded export controls create a two-speed AI economy. Domestic infrastructure and chip equipment benefit; international cloud and AI startups face headwinds. Pair trade: long AMAT/LRCX, short international-exposed NVDA.",
  conviction: 3,
  trades: [
    {
      asset: "AMAT (Applied Materials)",
      direction: "long",
      entryCondition: "CHIPS Act funding acceleration announcement",
      stopLoss: "8% below entry",
      takeProfit: "20% above entry",
      timeHorizon: "3-6 months",
      rationale: "Domestic fab construction accelerates. Equipment demand is bottleneck.",
    },
    {
      asset: "EQIX (Equinix)",
      direction: "long",
      entryCondition: "Evidence of workload migration to U.S. data centers",
      stopLoss: "7% below entry",
      takeProfit: "12-15% above entry",
      timeHorizon: "3-6 months",
      rationale: "AI workloads migrate to U.S./allied DCs. Equinix has highest interconnection revenue.",
    },
    {
      asset: "NVDA (NVIDIA)",
      direction: "short",
      entryCondition: "Guidance revision acknowledging revenue impact",
      stopLoss: "10% above entry",
      takeProfit: "15-20% below entry",
      timeHorizon: "1-3 months",
      rationale: "Market underpricing 10-15% data center revenue loss from restricted markets.",
    },
  ],
  risks: [
    {
      title: "NVIDIA Workaround Chips",
      probability: 0.5,
      impact: 3,
      description: "NVIDIA could develop compliant chips that partially restore restricted market revenue.",
    },
    {
      title: "Rare Earth Retaliation",
      probability: 0.4,
      impact: 5,
      description: "Chinese rare earth export bans would hurt domestic chip makers too.",
    },
    {
      title: "Political Reversal",
      probability: 0.2,
      impact: 4,
      description: "Administration change or lobbying could weaken restrictions.",
    },
  ],
  keyAssumptions: [
    "Export controls are strictly enforced with limited waivers",
    "Hyperscaler capex plans adjust within 1-2 quarters",
    "Open-source model efficiency gains are real but take 6+ months to materialize",
    "CHIPS Act funding timelines accelerate by 3-6 months",
  ],
  triggerEvents: ["ai-evt-1", "ai-evt-2", "ai-evt-6"],
};

// ─── Mock API Client ───────────────────────────────────────────────────────────

export async function getMockScenario(
  scenarioId: string
): Promise<CausalGraph> {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  if (scenarioId === "scenario-hormuz") return structuredClone(hormuzScenario);
  if (scenarioId === "scenario-ai-export") return structuredClone(aiExportScenario);
  throw new Error(`Unknown scenario: ${scenarioId}`);
}

export async function getMockThesis(
  scenarioId: string
): Promise<TradingThesis> {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  if (scenarioId === "scenario-hormuz") return structuredClone(hormuzThesis);
  if (scenarioId === "scenario-ai-export") return structuredClone(aiExportThesis);
  throw new Error(`Unknown scenario: ${scenarioId}`);
}

// Preset scenario metadata for the UI
export const scenarioPresets = [
  {
    id: "scenario-hormuz",
    title: "Strait of Hormuz Reopens",
    description: "Diplomatic breakthrough leads to unrestricted passage",
    category: "Geopolitical" as const,
    hypothesis: "What if the Strait of Hormuz reopens to full traffic?",
  },
  {
    id: "scenario-ai-export",
    title: "AI Chip Export Ban Expands",
    description: "U.S. broadens AI accelerator export restrictions",
    category: "Regulatory" as const,
    hypothesis: "What if the U.S. expands AI chip export restrictions to 30+ countries?",
  },
  {
    id: "custom-tariff",
    title: "Global Tariff War Escalates",
    description: "Major economies impose retaliatory tariffs",
    category: "Economic" as const,
    hypothesis: "What if the U.S. imposes 25% tariffs on all Chinese imports and China retaliates?",
  },
  {
    id: "custom-pandemic",
    title: "New Pandemic Emerges",
    description: "Novel pathogen triggers global health emergency",
    category: "Social" as const,
    hypothesis: "What if a new highly transmissible respiratory virus emerges in Southeast Asia?",
  },
];
