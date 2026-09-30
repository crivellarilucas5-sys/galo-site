import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { RevealGroup, RevealItem } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import type { TimelineEvent } from "@/types/content";

interface HistoryPreviewProps {
  events: TimelineEvent[];
}

export function HistoryPreview({ events }: HistoryPreviewProps) {
  return (
    <section className="bg-background py-16 md:py-24 lg:py-32">
      <div className="container-site">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading eyebrow="Tradição centenária" title="Uma história de Galo" />
          <Link
            href="/historia"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            Ver a história completa
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>

        <RevealGroup as="ol" className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {events.map((event) => (
            <RevealItem as="li" key={`${event.year}-${event.title}`}>
              <div className="h-full rounded-lg border border-border bg-surface p-6">
                <p className="font-display text-3xl font-semibold text-primary">
                  {event.year}
                </p>
                <h3 className="mt-2 text-base font-semibold text-foreground">
                  {event.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {event.description}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
