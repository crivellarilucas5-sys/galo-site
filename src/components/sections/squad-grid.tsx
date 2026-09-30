import Image from "next/image";
import { Hand, RefreshCw, Shield, Target, type LucideIcon } from "lucide-react";
import { RevealGroup, RevealItem } from "@/components/shared/reveal";
import type { Player, PlayerPosition } from "@/types/content";

interface SquadGridProps {
  players: Player[];
}

const PLACEHOLDER_PHOTO = "/images/squad/placeholder-silhueta.png";

/** Ícone de posição — reforça a categorização mesmo sem decorar a cor de
 * fundo por posição (docs/smart-memory/agents/ux/elenco-jogos-refresh.md §1). */
const POSITION_ICON: Record<PlayerPosition, LucideIcon> = {
  goleiro: Hand,
  defesa: Shield,
  meio: RefreshCw,
  ataque: Target,
};

/**
 * Fundo do bloco de imagem por posição — só variações de preto/cinza da
 * própria paleta oficial (nunca cores novas "de posição"), conforme a
 * tabela de docs/smart-memory/agents/ux/elenco-jogos-refresh.md §1. O acento
 * dourado só aparece no número de meio-campo: é elemento gráfico ≥24px, uso
 * permitido pela regra 1 de design-direction.md (não é texto de corpo).
 */
const POSITION_BLOCK_CLASS: Record<PlayerPosition, string> = {
  goleiro: "squad-card-block--goleiro bg-surface text-foreground",
  defesa: "bg-background text-foreground",
  meio: "bg-surface text-primary",
  ataque: "bg-background text-foreground border-b-[3px] border-primary",
};

export function SquadGrid({ players }: SquadGridProps) {
  return (
    <RevealGroup
      as="ul"
      className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4"
      staggerDelay={0.04}
    >
      {players.map((player, index) => {
        const Icon = POSITION_ICON[player.position];
        const hasRealPhoto = Boolean(player.photo);
        return (
          <RevealItem as="li" key={`${player.name}-${player.number ?? index}`}>
            <div className="flex aspect-[3/4] flex-col overflow-hidden rounded-lg border border-border">
              <div
                className={`relative min-h-0 flex-1 ${hasRealPhoto ? "bg-surface" : POSITION_BLOCK_CLASS[player.position]}`}
              >
                {hasRealPhoto ? (
                  // Foto real e individual do jogador (licença livre, fase
                  // anterior ao Atlético — ver photoAttribution em
                  // src/content/squad.ts): ocupa o bloco inteiro
                  // (object-cover), com `alt` nomeando o jogador (AC3 da
                  // story 1.8: só afirma identidade quando a imagem
                  // realmente mostra o jogador).
                  <>
                    <Image
                      src={player.photo!}
                      alt={`${player.name}, ${positionLabel(player.position)}`}
                      fill
                      sizes="(min-width: 1024px) 15vw, (min-width: 768px) 20vw, 30vw"
                      className="object-cover"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-black/70 to-transparent"
                    />
                  </>
                ) : null}
                {player.number !== undefined && (
                  <span
                    aria-hidden="true"
                    className={`absolute top-1 left-2 z-10 font-display leading-none font-bold text-[clamp(2.5rem,8vw,3.5rem)] ${
                      hasRealPhoto ? "text-white opacity-95 drop-shadow-md" : "opacity-90"
                    }`}
                  >
                    {player.number}
                  </span>
                )}
                {!hasRealPhoto && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative h-[58%] w-[58%]">
                      <Image
                        src={PLACEHOLDER_PHOTO}
                        // AC3 da story 1.8 (mantido): `alt` descreve a
                        // imagem entregue, nunca a intenção do dado ao lado.
                        // A silhueta genérica é idêntica para todos os
                        // jogadores e não carrega informação alguma que
                        // nome/número/posição (texto real, abaixo) já não
                        // carreguem — é decorativa (`alt=""`).
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 15vw, (min-width: 768px) 20vw, 30vw"
                        className="object-contain"
                      />
                    </div>
                  </div>
                )}
              </div>
              <div className="bg-surface p-3">
                <p className="truncate font-display text-lg font-semibold tracking-wide text-foreground uppercase md:text-xl">
                  {player.name}
                </p>
                <p className="mt-1 flex items-center gap-1.5 text-xs tracking-wide text-muted-foreground uppercase">
                  <Icon aria-hidden="true" className="size-4 shrink-0" />
                  <span>
                    {player.number ? `#${player.number} · ` : ""}
                    {positionLabel(player.position)}
                  </span>
                </p>
              </div>
            </div>
          </RevealItem>
        );
      })}
    </RevealGroup>
  );
}

function positionLabel(position: Player["position"]) {
  switch (position) {
    case "goleiro":
      return "Goleiro";
    case "defesa":
      return "Defesa";
    case "meio":
      return "Meio-campo";
    case "ataque":
      return "Ataque";
  }
}
