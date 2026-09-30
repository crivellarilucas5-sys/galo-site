import type { Club } from "@/types/content";

/**
 * Procedência: docs/smart-memory/agents/research/atletico-mineiro-facts.md
 * (fundação, apelido, cores, cidade, URLs de redes sociais — confirmadas na
 * rodada 2 do research, seção "Canais Oficiais e Redes Sociais", fonte:
 * atletico.com.br footer/menu). Publicadas como `sameAs` no JSON-LD do
 * layout raiz — nenhuma URL é chute (nota técnica da story 1.9).
 */
export const club = {
  name: "Clube Atlético Mineiro",
  nickname: "Galo",
  foundedYear: 1908,
  foundedDate: "1908-03-25",
  city: "Belo Horizonte",
  state: "MG",
  colors: ["Preto", "Branco"],
  social: [
    {
      platform: "instagram",
      label: "Instagram",
      href: "https://www.instagram.com/atletico/",
    },
    {
      platform: "x",
      label: "X (Twitter)",
      href: "https://x.com/atletico",
    },
    {
      platform: "youtube",
      label: "YouTube",
      href: "https://www.youtube.com/@atletico",
    },
    {
      platform: "facebook",
      label: "Facebook",
      href: "https://www.facebook.com/atletico/",
    },
  ],
  disclaimer:
    "Este é um site de torcedor, não oficial. Não possui vínculo institucional com o Clube Atlético Mineiro.",
} satisfies Club;
