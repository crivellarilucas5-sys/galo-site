import type { Metadata } from "next";

export interface BuildMetadataOptions {
  /** Título da página (sem o sufixo do site — o template do layout raiz cuida disso). */
  title: string;
  /** 50–160 caracteres, conforme AC3 da story 1.9. */
  description: string;
  /** Caminho absoluto da rota, ex.: "/historia". */
  path: string;
  /** Imagem OG relativa a `public/`, ex.: "/og/estadio.jpg". Default: OG genérico do site. */
  image?: string;
}

/**
 * Helper central de metadata por rota — nunca usar `<Head>` manual.
 * `metadataBase` (definido em src/app/layout.tsx) resolve `path`/`image`
 * para URLs absolutas em `alternates.canonical` e `openGraph`.
 */
export function buildMetadata({
  title,
  description,
  path,
  image = "/og/default.jpg",
}: BuildMetadataOptions): Metadata {
  // og:title/twitter:title não herdam o `title.template` do layout raiz
  // (isso só afeta a tag <title>) — replicamos o sufixo aqui manualmente.
  const fullTitle = `${title} | Galo — Atlético Mineiro`;

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: "Galo — Atlético Mineiro",
      locale: "pt_BR",
      type: "website",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
  };
}
