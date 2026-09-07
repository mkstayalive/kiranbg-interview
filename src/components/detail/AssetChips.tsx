"use client";

import type { ImpactDirection } from "@/types/causal";
import { getImpactBg } from "@/lib/utils/colors";

interface AssetChipsProps {
  assets: string[];
  direction: ImpactDirection;
}

export function AssetChips({ assets, direction }: AssetChipsProps) {
  const colorClass = getImpactBg(direction);

  return (
    <div className="flex flex-wrap gap-1.5">
      {assets.map((asset) => (
        <span
          key={asset}
          className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-medium ${colorClass}`}
        >
          {asset}
        </span>
      ))}
    </div>
  );
}
