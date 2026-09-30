import type { Metadata } from "next";
import { AlertTriangle } from "lucide-react";
import { SquadGrid } from "@/components/sections/squad-grid";
import { squad, squadReferenceDate } from "@/content/squad";
import { groupByPosition } from "@/lib/squad";
import { buildMetadata } from "@/lib/seo";

const playersWithPhotoCredit = squad.filter((player) => player.photoAttribution);

export const metadata: Metadata = buildMetadata({
  title: "Elenco",
  description: `Elenco profissional do Atlético Mineiro, organizado por posição (referência: ${squadReferenceDate}).`,
  path: "/elenco",
});

export default function ElencoPage() {
  const groups = groupByPosition(squad);

  return (
    <div className="bg-background py-16 md:py-24 lg:py-32">
      <div className="container-site">
        <div className="max-w-2xl">
          <p className="text-xs font-medium tracking-[0.2em] text-primary uppercase">
            O time do Galo
          </p>
          <h1 className="mt-2 font-display text-4xl font-semibold tracking-wide text-foreground uppercase lg:text-5xl">
            Elenco
          </h1>
        </div>

        <div
          role="note"
          className="mt-6 flex max-w-2xl items-start gap-3 rounded-lg border border-primary/40 bg-primary/10 p-4 text-sm text-foreground"
        >
          <AlertTriangle aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-primary" />
          <p>
            Elenco real, levantado em {squadReferenceDate}. Elencos de futebol mudam a
            cada janela de transferência — nomes, números e posições podem estar
            desatualizados conforme reforços cheguem ou saídas ocorram. {playersWithPhotoCredit.length}{" "}
            de {squad.length} jogadores têm foto individual com licença livre (créditos
            no rodapé desta página); os demais mostram a silhueta genérica por decisão
            de direito de imagem.
          </p>
        </div>

        <div className="mt-12 flex flex-col gap-12">
          {groups.map((group) => (
            <section key={group.position}>
              <h2 className="font-display text-2xl font-semibold tracking-wide text-foreground uppercase">
                {group.label}
              </h2>
              <div className="mt-6">
                <SquadGrid players={group.items} />
              </div>
            </section>
          ))}
        </div>

        {playersWithPhotoCredit.length > 0 && (
          <section className="mt-16 border-t border-border pt-8">
            <h2 className="font-display text-lg font-semibold tracking-wide text-foreground uppercase">
              Créditos das fotos
            </h2>
            <p className="mt-2 max-w-2xl text-xs text-muted-foreground">
              Fotos individuais (fase anterior ao Atlético Mineiro), licenciadas via
              Wikimedia Commons:
            </p>
            <ul className="mt-4 grid grid-cols-1 gap-2 text-xs text-muted-foreground md:grid-cols-2">
              {playersWithPhotoCredit.map((player) => {
                const credit = player.photoAttribution!;
                return (
                  <li key={player.name}>
                    <span className="text-foreground">{player.name}</span>: foto de{" "}
                    {credit.photographer}
                    {credit.license.startsWith("CC") && " (recortada do original)"}, licença{" "}
                    <a
                      href={credit.licenseUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-primary/60 underline-offset-2 hover:text-foreground hover:decoration-primary"
                    >
                      {credit.license}
                    </a>
                    , via{" "}
                    <a
                      href={credit.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-primary/60 underline-offset-2 hover:text-foreground hover:decoration-primary"
                    >
                      {credit.sourceLabel}
                    </a>
                    .
                  </li>
                );
              })}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}
