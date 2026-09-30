import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { RevealGroup, RevealItem } from "@/components/shared/reveal";
import type { Trophy } from "@/types/content";

interface TrophyGridProps {
  trophies: Trophy[];
}

export function TrophyGrid({ trophies }: TrophyGridProps) {
  return (
    <RevealGroup as="ul" className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
      {trophies.map((trophy) => (
        <RevealItem as="li" key={trophy.competition}>
          <Card className="h-full border-border bg-surface">
            <CardContent className="flex h-full flex-col gap-3 py-2">
              <Star aria-hidden="true" className="size-6 fill-primary text-primary" />
              <p className="font-display text-3xl font-semibold text-foreground">
                {trophy.count}×
              </p>
              <h3 className="text-base font-semibold text-foreground">
                {trophy.competition}
              </h3>

              {trophy.years.length > 0 ? (
                <ul className="mt-1 flex flex-wrap gap-x-2 gap-y-1 text-sm text-muted-foreground">
                  {trophy.years.map((year) => (
                    <li key={year}>{year}</li>
                  ))}
                </ul>
              ) : null}

              {trophy.periodLabel ? (
                <p className="text-sm text-muted-foreground">
                  Período: {trophy.periodLabel}
                </p>
              ) : null}

              {trophy.note ? (
                <p className="mt-auto text-xs text-muted-foreground">{trophy.note}</p>
              ) : null}
            </CardContent>
          </Card>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
