import Image from "next/image";
import { Star } from "lucide-react";
import { RevealGroup, RevealItem } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";
import type { TimelineEvent } from "@/types/content";

interface TimelineProps {
  events: TimelineEvent[];
}

export function Timeline({ events }: TimelineProps) {
  return (
    <RevealGroup as="ol" className="relative mx-auto max-w-4xl" staggerDelay={0.06}>
      <div
        aria-hidden="true"
        className="absolute inset-y-0 left-4 w-px bg-border lg:left-1/2"
      />

      {events.map((event, index) => {
        const isRight = index % 2 === 1;

        return (
          <RevealItem
            as="li"
            key={`${event.year}-${event.title}`}
            className="relative mb-10 grid grid-cols-[2rem_1fr] gap-x-4 last:mb-0 lg:mb-16 lg:grid-cols-[1fr_2rem_1fr] lg:gap-x-10"
          >
            <span
              aria-hidden="true"
              className={cn(
                "col-start-1 row-start-1 mt-1 flex size-8 items-center justify-center rounded-full border-2",
                "lg:col-start-2",
                event.isHighlight
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-background text-muted-foreground",
              )}
            >
              {event.isHighlight ? (
                <Star className="size-4 fill-current" />
              ) : (
                <span className="size-2 rounded-full bg-current" />
              )}
            </span>

            <div
              className={cn(
                "col-start-2 row-start-1 rounded-lg border p-6",
                event.isHighlight
                  ? "border-primary/60 bg-surface"
                  : "border-border bg-surface",
                isRight ? "lg:col-start-3" : "lg:col-start-1 lg:text-right",
              )}
            >
              <p className="font-display text-2xl font-semibold text-primary lg:text-3xl">
                {event.year}
              </p>
              <h3 className="mt-2 text-lg font-semibold text-foreground">
                {event.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{event.description}</p>
              {event.image ? (
                <div
                  className={cn(
                    "relative mt-4 aspect-[4/3] w-full overflow-hidden rounded-md",
                    !isRight && "lg:ml-auto",
                  )}
                >
                  <Image
                    src={event.image}
                    alt={event.imageAlt ?? event.title}
                    fill
                    sizes="(min-width: 1024px) 40vw, 90vw"
                    className="object-cover"
                  />
                </div>
              ) : null}
            </div>
          </RevealItem>
        );
      })}
    </RevealGroup>
  );
}
