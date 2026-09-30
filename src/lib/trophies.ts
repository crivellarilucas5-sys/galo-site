import type { Trophy, TrophyTier } from "@/types/content";

export const TIER_ORDER: TrophyTier[] = ["internacional", "nacional", "estadual"];

export const TIER_LABEL: Record<TrophyTier, string> = {
  internacional: "Internacionais",
  nacional: "Nacionais",
  estadual: "Estaduais",
};

/** Total de conquistas de uma competição — `count` é a fonte de verdade. */
function trophyCount(trophy: Trophy): number {
  return trophy.count;
}

/** Soma o total de conquistas em todo o dataset. */
export function totalTrophies(trophies: Trophy[]): number {
  return trophies.reduce((sum, trophy) => sum + trophyCount(trophy), 0);
}

/** Soma o total de conquistas por tier (internacional/nacional/estadual). */
export function totalByTier(trophies: Trophy[]): Record<TrophyTier, number> {
  return trophies.reduce(
    (totals, trophy) => {
      totals[trophy.tier] += trophyCount(trophy);
      return totals;
    },
    { internacional: 0, nacional: 0, estadual: 0 } as Record<TrophyTier, number>,
  );
}

/** Agrupa as competições por tier, preservando apenas tiers com conquistas. */
export function groupByTier(trophies: Trophy[]): { tier: TrophyTier; items: Trophy[] }[] {
  return TIER_ORDER.map((tier) => ({
    tier,
    items: trophies.filter((trophy) => trophy.tier === tier),
  })).filter((group) => group.items.length > 0);
}
