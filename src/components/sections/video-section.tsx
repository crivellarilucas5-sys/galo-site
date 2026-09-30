"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { useState } from "react";
import { RevealGroup, RevealItem } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import type { VideoItem } from "@/types/content";

interface VideoSectionProps {
  videos: VideoItem[];
}

export function VideoSection({ videos }: VideoSectionProps) {
  return (
    <section className="bg-background py-16 md:py-24 lg:py-32">
      <div className="container-site">
        <SectionHeading
          eyebrow="Direto da zona mista"
          title="Entrevistas"
          description="Coletivas e entrevistas em vídeo de canais oficiais, com foco nos clássicos contra o Cruzeiro."
        />
        <RevealGroup as="ul" className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {videos.map((video) => (
            <RevealItem as="li" key={video.slug}>
              <VideoCard video={video} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

function VideoCard({ video }: { video: VideoItem }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-surface">
      <div className="relative aspect-video w-full bg-black">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group absolute inset-0 h-full w-full cursor-pointer"
            aria-label={`Assistir: ${video.title}`}
          >
            <Image
              src={`https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`}
              alt=""
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
              unoptimized
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-black/30 transition-colors group-hover:bg-black/40"
            />
            <span
              aria-hidden="true"
              className="absolute top-1/2 left-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform group-hover:scale-110"
            >
              <Play className="ml-1 size-7 fill-current" />
            </span>
          </button>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-display text-base font-semibold text-foreground uppercase">
          {video.title}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">{video.description}</p>
        <p className="mt-2 text-xs text-muted-foreground">
          {video.channel} ·{" "}
          <time dateTime={video.date}>
            {new Intl.DateTimeFormat("pt-BR", {
              day: "2-digit",
              month: "long",
              year: "numeric",
              timeZone: "UTC",
            }).format(new Date(video.date))}
          </time>
        </p>
      </div>
    </div>
  );
}
