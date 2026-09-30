import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { RevealGroup, RevealItem } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import type { NewsItem } from "@/types/content";

interface NewsGridProps {
  news: NewsItem[];
}

export function NewsGrid({ news }: NewsGridProps) {
  return (
    <section className="bg-background py-16 md:py-24 lg:py-32">
      <div className="container-site">
        <SectionHeading eyebrow="Fique por dentro" title="Últimas do Galo" />

        <RevealGroup as="ul" className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {news.map((item) => (
            <RevealItem as="li" key={item.slug}>
              <Card className="h-full overflow-hidden border-border bg-surface p-0">
                <div className="relative aspect-[3/2] w-full">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <CardContent className="flex flex-1 flex-col gap-3 py-5">
                  <Badge variant="outline" className="w-fit border-border text-muted-foreground">
                    {item.category}
                  </Badge>
                  <h3 className="font-display text-lg font-semibold text-foreground uppercase">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{item.excerpt}</p>
                  {item.quote && (
                    <blockquote className="border-l-2 border-primary pl-3 text-sm text-foreground italic">
                      “{item.quote.text}”
                      <footer className="mt-1 text-xs text-muted-foreground not-italic">
                        — {item.quote.attribution}
                      </footer>
                    </blockquote>
                  )}
                  <time
                    dateTime={item.date}
                    className="mt-auto text-xs text-muted-foreground"
                  >
                    {new Intl.DateTimeFormat("pt-BR", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                      // `item.date` é date-only (ex.: "2026-03-25"), então
                      // `new Date(...)` interpreta como meia-noite UTC. Usar
                      // "UTC" aqui (e não "America/Sao_Paulo") evita recuar
                      // 1 dia por causa do offset negativo. Não é o mesmo
                      // caso de next-match.tsx, que tem hora real.
                      timeZone: "UTC",
                    }).format(new Date(item.date))}
                  </time>
                  {item.imageAttribution && (
                    <p className="text-[11px] text-muted-foreground">
                      Foto: {item.imageAttribution.photographer}
                      {item.imageAttribution.license.startsWith("CC") &&
                        " (recortada do original)"}
                      , licença{" "}
                      <a
                        href={item.imageAttribution.licenseUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline decoration-primary/60 underline-offset-2 hover:text-foreground hover:decoration-primary"
                      >
                        {item.imageAttribution.license}
                      </a>
                      , via{" "}
                      <a
                        href={item.imageAttribution.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline decoration-primary/60 underline-offset-2 hover:text-foreground hover:decoration-primary"
                      >
                        {item.imageAttribution.sourceLabel}
                      </a>
                    </p>
                  )}
                </CardContent>
              </Card>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
