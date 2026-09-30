import type { Metadata } from "next";
import Image from "next/image";
import { ArenaStats } from "@/components/sections/arena-stats";
import { ArenaGallery } from "@/components/sections/arena-gallery";
import { arena } from "@/content/arena";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Estádio",
  description:
    "Conheça a Arena MRV, casa do Atlético Mineiro em Belo Horizonte: capacidade, inauguração, galeria de imagens e localização.",
  path: "/estadio",
  image: "/og/estadio.jpg",
});

const sportsActivityLocationJsonLd = {
  "@context": "https://schema.org",
  "@type": "SportsActivityLocation",
  name: arena.name,
  address: {
    "@type": "PostalAddress",
    addressLocality: arena.city,
    addressRegion: arena.state,
    addressCountry: "BR",
  },
  maximumAttendeeCapacity: arena.capacity,
};

export default function EstadioPage() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(sportsActivityLocationJsonLd) }}
      />
      <section className="relative flex min-h-[70vh] items-end overflow-hidden bg-background">
        <Image
          src={arena.heroImage}
          alt={arena.heroImageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(10,10,10,0.15) 0%, rgba(10,10,10,0.85) 100%)",
          }}
        />
        <div className="container-site relative z-10 py-16">
          <p className="text-xs font-medium tracking-[0.3em] text-primary uppercase">
            A casa do Galo
          </p>
          <h1 className="mt-2 font-serif-display text-4xl font-bold text-white lg:text-6xl">
            {arena.name}
          </h1>
          <p className="mt-4 max-w-xl text-lg text-white/80">{arena.description}</p>
        </div>

        {arena.heroImageAttribution && (
          <p className="absolute right-4 bottom-2 z-10 text-xs text-white/60">
            Foto: {arena.heroImageAttribution.photographer} (recortada do original), licença{" "}
            <a
              href={arena.heroImageAttribution.licenseUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-white/40 underline-offset-2 hover:text-white hover:decoration-white"
            >
              {arena.heroImageAttribution.license}
            </a>
            , via{" "}
            <a
              href={arena.heroImageAttribution.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-white/40 underline-offset-2 hover:text-white hover:decoration-white"
            >
              {arena.heroImageAttribution.sourceLabel}
            </a>
          </p>
        )}
      </section>

      <section className="bg-background py-16 md:py-24">
        <div className="container-site">
          <h2 className="sr-only">Números da Arena MRV</h2>
          <ArenaStats stats={arena.stats} />
        </div>
      </section>

      <section className="bg-background py-16 md:py-24">
        <div className="container-site">
          <h2 className="font-display text-2xl font-semibold tracking-wide text-foreground uppercase">
            Galeria
          </h2>
          <div className="mt-6">
            <ArenaGallery images={arena.gallery} />
          </div>
        </div>
      </section>

      <section className="section-light py-16 md:py-24">
        <div className="container-site">
          <h2 className="font-display text-2xl font-semibold tracking-wide text-fg-on-light uppercase">
            Localização
          </h2>
          <p className="mt-4 max-w-xl text-base text-fg-on-light-muted">
            {arena.address}
          </p>
          <a
            href={arena.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-sm font-medium text-fg-on-light underline decoration-primary decoration-2 underline-offset-4 hover:decoration-accent-hover"
          >
            Ver no mapa
          </a>
        </div>
      </section>
    </div>
  );
}
