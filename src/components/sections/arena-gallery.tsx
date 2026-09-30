import Image from "next/image";
import { RevealGroup, RevealItem } from "@/components/shared/reveal";
import type { ImageAttribution } from "@/types/content";

interface ArenaGalleryProps {
  images: { src: string; alt: string; attribution?: ImageAttribution }[];
}

export function ArenaGallery({ images }: ArenaGalleryProps) {
  return (
    <RevealGroup as="ul" className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
      {images.map((image) => (
        <RevealItem as="li" key={image.src}>
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-border bg-surface">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          {image.attribution && (
            <p className="mt-2 text-[11px] text-muted-foreground">
              Foto: {image.attribution.photographer}
              {image.attribution.license.startsWith("CC") && " (recortada do original)"},
              licença{" "}
              <a
                href={image.attribution.licenseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-primary/60 underline-offset-2 hover:text-foreground hover:decoration-primary"
              >
                {image.attribution.license}
              </a>
              , via{" "}
              <a
                href={image.attribution.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-primary/60 underline-offset-2 hover:text-foreground hover:decoration-primary"
              >
                {image.attribution.sourceLabel}
              </a>
            </p>
          )}
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
