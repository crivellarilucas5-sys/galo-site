import { ArrowDown, ArrowUp, Calendar, Home, MapPin, Minus, ShieldCheck, type LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/shared/reveal";
import type {
  MatchOutcome,
  MatchResult,
  NextMatch as NextMatchType,
  UpcomingMatch,
} from "@/types/content";

interface NextMatchProps {
  match: NextMatchType;
  pastResults: MatchResult[];
  upcomingMatches: UpcomingMatch[];
}

/**
 * V/E/D comunicado por forma (ícone) + texto explícito (`sr-only`), nunca só
 * cor — o único acento dourado é o de vitória (borda), empate/derrota usam
 * tons neutros da paleta. Ver
 * docs/smart-memory/agents/ux/elenco-jogos-refresh.md §2.
 */
const RESULT_CONFIG: Record<
  MatchOutcome,
  { label: string; icon: LucideIcon; borderClass: string; iconClass: string; scoreClass: string }
> = {
  vitoria: {
    label: "Vitória",
    icon: ArrowUp,
    borderClass: "border-primary",
    iconClass: "text-fg-on-light",
    scoreClass: "text-fg-on-light",
  },
  empate: {
    label: "Empate",
    icon: Minus,
    borderClass: "border-border-light",
    iconClass: "text-fg-on-light-muted",
    scoreClass: "text-fg-on-light",
  },
  derrota: {
    label: "Derrota",
    icon: ArrowDown,
    borderClass: "border-border-light",
    iconClass: "text-fg-on-light-muted",
    scoreClass: "text-fg-on-light-muted",
  },
};

function formatShortDate(iso: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    timeZone: "America/Sao_Paulo",
  }).format(new Date(iso));
}

function ResultChip({ result }: { result: MatchResult }) {
  const config = RESULT_CONFIG[result.outcome];
  const Icon = config.icon;

  return (
    <li>
      <div
        className={`flex min-w-[96px] flex-col items-center gap-1 rounded-md border bg-white px-3 py-2 text-center ${config.borderClass}`}
      >
        <span className="sr-only">{config.label}</span>
        <Icon aria-hidden="true" className={`size-4 ${config.iconClass}`} />
        <span className={`font-display text-sm font-semibold ${config.scoreClass}`}>{result.score}</span>
        <span className="text-xs text-fg-on-light-muted">
          {result.opponent} · {formatShortDate(result.date)}
        </span>
      </div>
    </li>
  );
}

function UpcomingCard({ match }: { match: UpcomingMatch }) {
  const MandoIcon = match.isHome ? Home : MapPin;

  return (
    <li>
      <div className="flex min-w-[152px] items-center justify-between gap-3 rounded-md border border-border-light bg-white px-3 py-2 text-sm text-fg-on-light">
        <span className="truncate font-medium">{match.opponent}</span>
        <span className="flex shrink-0 items-center gap-1 text-xs text-fg-on-light-muted">
          <MandoIcon aria-hidden="true" className="size-3.5" />
          <span className="sr-only">{match.isHome ? "Em casa" : "Fora de casa"},</span>
          {formatShortDate(match.date)}
        </span>
      </div>
    </li>
  );
}

export function NextMatch({ match, pastResults, upcomingMatches }: NextMatchProps) {
  const date = new Date(match.date);
  const formattedDate = new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "America/Sao_Paulo",
  }).format(date);

  return (
    <section className="section-light py-16 md:py-24">
      <div className="container-site">
        <h2 className="font-display text-2xl font-semibold tracking-wide text-fg-on-light uppercase md:text-3xl">
          Jogos
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-fg-on-light-muted">
          Resultados recentes e próximos jogos abaixo são ilustrativos — exemplo de
          layout, não um calendário real.
        </p>

        {/*
          Ordem de DOM/leitura: Próximo jogo → Últimos resultados → Em
          seguida (é a ordem de prioridade da informação), em todos os
          breakpoints. O posicionamento visual em desktop (próximo jogo à
          direita, ocupando as duas linhas) vem só do `grid-area` via
          `.jogos-grid` (globals.css) — nunca da propriedade `order`, que
          inverteria ordem visual e ordem de tab/leitura (design-direction
          §4.4).
        */}
        <div className="jogos-grid mt-8">
          <div style={{ gridArea: "next" }}>
            <Reveal>
              <Card className="border-primary bg-white shadow-md">
                <CardContent className="flex flex-col gap-6 py-2 md:flex-row md:items-center md:justify-between">
                  <div>
                    <Badge variant="outline" className="border-border-light text-fg-on-light-muted">
                      Próximo jogo · informação ilustrativa
                    </Badge>
                    <p className="mt-3 font-display text-2xl font-semibold text-fg-on-light uppercase">
                      {match.isHome ? "Galo" : match.opponent} × {match.isHome ? match.opponent : "Galo"}
                    </p>
                    <p className="mt-1 text-sm text-fg-on-light-muted">{match.competition}</p>
                  </div>

                  <dl className="grid grid-cols-1 gap-4 text-sm text-fg-on-light-muted sm:grid-cols-3">
                    <dt className="sr-only">Data</dt>
                    <dd className="flex items-center gap-2 capitalize">
                      <Calendar aria-hidden="true" className="size-4 text-primary" />
                      {formattedDate}
                    </dd>

                    <dt className="sr-only">Local</dt>
                    <dd className="flex items-center gap-2">
                      <MapPin aria-hidden="true" className="size-4 text-primary" />
                      {match.venue}
                    </dd>

                    <dt className="sr-only">Mando de campo</dt>
                    <dd className="flex items-center gap-2">
                      <ShieldCheck aria-hidden="true" className="size-4 text-primary" />
                      {match.isHome ? "Mando do Galo" : "Fora de casa"}
                    </dd>
                  </dl>
                </CardContent>
              </Card>
            </Reveal>
          </div>

          <div style={{ gridArea: "results" }}>
            <h3 className="text-xs font-semibold tracking-[0.15em] text-fg-on-light-muted uppercase">
              Últimos resultados
            </h3>
            <Reveal delay={0.1}>
              <ul
                aria-label="Últimos resultados"
                className="mt-3 flex gap-3 overflow-x-auto pb-1 md:flex-col md:overflow-visible"
              >
                {pastResults.map((result) => (
                  <ResultChip key={`${result.opponent}-${result.date}`} result={result} />
                ))}
              </ul>
            </Reveal>
          </div>

          <div style={{ gridArea: "upcoming" }}>
            <h3 className="text-xs font-semibold tracking-[0.15em] text-fg-on-light-muted uppercase">
              Em seguida
            </h3>
            <Reveal delay={0.15}>
              <ul aria-label="Próximos jogos" className="mt-3 flex gap-3 overflow-x-auto pb-1 md:flex-col">
                {upcomingMatches.map((upcoming) => (
                  <UpcomingCard key={`${upcoming.opponent}-${upcoming.date}`} match={upcoming} />
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
