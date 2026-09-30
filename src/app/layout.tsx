import type { Metadata } from "next";
import { Inter, Oswald, Playfair_Display } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { club } from "@/content/club";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  display: "swap",
  weight: ["500", "600", "700"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["700"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://atletico-mineiro-site.example.com";

const siteTitle = "Galo — Atlético Mineiro | Site de torcedor";
const siteDescription =
  "Site de torcedor não oficial do Clube Atlético Mineiro: história, títulos, Arena MRV e elenco do Galo.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s | Galo — Atlético Mineiro",
  },
  description: siteDescription,
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: "/",
    siteName: "Galo — Atlético Mineiro",
    locale: "pt_BR",
    type: "website",
    images: [{ url: "/og/default.jpg", width: 1200, height: 630, alt: siteTitle }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/og/default.jpg"],
  },
};

/**
 * QA N6: o nó `SportsTeam` **não** deve ter `url` própria apontando para
 * este domínio — `url` + `sameAs` juntos afirmam, para máquina, que este
 * site É a entidade oficial do clube, contradizendo o disclaimer humano
 * ("site de torcedor, não oficial") presente em todas as rotas. O clube
 * real (`SportsTeam`) só é referenciado — via `sameAs` — pelos canais
 * oficiais dele, sem `url`. Quem assume `url` = este domínio é o `WebSite`
 * que descreve o próprio fansite, com `about` apontando para o clube.
 */
const sportsTeamJsonLd = {
  "@type": "SportsTeam",
  name: club.name,
  alternateName: club.nickname,
  foundingDate: club.foundedDate,
  sport: "Football",
  location: {
    "@type": "Place",
    address: {
      "@type": "PostalAddress",
      addressLocality: club.city,
      addressRegion: club.state,
      addressCountry: "BR",
    },
  },
  sameAs: club.social.map((social) => social.href),
};

const webSiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteTitle,
  url: siteUrl,
  description: siteDescription,
  isFamilyFriendly: true,
  about: sportsTeamJsonLd,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${oswald.variable} ${playfair.variable}`}
    >
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }}
        />
        <a href="#conteudo" className="skip-link">
          Pular para o conteúdo
        </a>
        <SiteHeader />
        <main id="conteudo">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
