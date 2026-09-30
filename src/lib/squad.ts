import type { Player, PlayerPosition } from "@/types/content";

export const POSITION_ORDER: PlayerPosition[] = ["goleiro", "defesa", "meio", "ataque"];

export const POSITION_LABEL: Record<PlayerPosition, string> = {
  goleiro: "Goleiros",
  defesa: "Defesa",
  meio: "Meio-campo",
  ataque: "Ataque",
};

/** Agrupa jogadores por posição, na ordem goleiro → defesa → meio → ataque. */
export function groupByPosition(
  players: Player[],
): { position: PlayerPosition; label: string; items: Player[] }[] {
  return POSITION_ORDER.map((position) => ({
    position,
    label: POSITION_LABEL[position],
    items: players.filter((player) => player.position === position),
  })).filter((group) => group.items.length > 0);
}
