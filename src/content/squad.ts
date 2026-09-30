import type { ImageAttribution, Player } from "@/types/content";

/**
 * ELENCO REAL — plantel profissional masculino do Atlético Mineiro.
 *
 * Fonte: docs/smart-memory/agents/research/elenco-atual-2026.md
 * (atletico.com.br/futebol/masculino/elenco/, consultado em {@link squadReferenceDate}).
 *
 * Elencos de futebol mudam a cada janela de transferência — esta lista
 * reflete o plantel na data de referência abaixo e pode ficar desatualizada
 * conforme novos reforços cheguem ou saídas ocorram. `PlayerPosition` só
 * distingue goleiro/defesa/meio/ataque (ver src/types/content.ts); laterais
 * e zagueiros entram como "defesa", volantes e meias entram como "meio",
 * seguindo o mesmo agrupamento já usado em groupByPosition (src/lib/squad.ts).
 *
 * `photo`: 14 dos 32 jogadores têm foto individual com licença livre
 * confirmada no Wikimedia Commons — ver
 * docs/smart-memory/agents/research/fotos-elenco-wikimedia.md. Todas são de
 * uma fase anterior ao Atlético (clube/seleção anterior), não há foto livre
 * do jogador já vestindo a camisa do Galo — a UI (squad-grid.tsx) trata isso
 * como "foto de perfil do jogador", sem afirmar que é uma foto no Atlético.
 * Reinier não tem foto — a única encontrada no Commons mostrava outros
 * jogadores em destaque e foi revogada (ver research). Os outros 18 seguem
 * sem `photo` — a UI renderiza a silhueta genérica em
 * `public/images/squad/placeholder-silhueta.png` (decisão de direito de
 * imagem, confirmada com o usuário, para quem não tem foto livre).
 * `photoAttribution` é exibido agregado no rodapé de /elenco (exigência da
 * licença CC/atribuição).
 */
export const squadReferenceDate = "30 de setembro de 2026";

const leoDuarteAttribution: ImageAttribution = {
  photographer: "Leonardo Duarte (usuário FreBulhoes)",
  license: "CC BY-SA 4.0",
  licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
  sourceLabel: "Wikimedia Commons",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:L%C3%A9o_Duarte_Basaksehir.jpg",
};

const lyancoAttribution: ImageAttribution = {
  photographer: "Agência de Notícias ANDES (Micaela Ayala V.)",
  license: "CC BY-SA 2.0",
  licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/",
  sourceLabel: "Wikimedia Commons",
  sourceUrl:
    "https://commons.wikimedia.org/wiki/File:Lyanco_Evangelista_Silveira_Neves_Vojnovi%C4%87_2017.jpg",
};

const renanLodiAttribution: ImageAttribution = {
  photographer: "Anna Nessie",
  license: "CC BY-SA 3.0",
  licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
  sourceLabel: "Wikimedia Commons",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:ATL-Madrid-Lokomotiv001-Lodi.jpg",
};

const angeloPreciadoAttribution: ImageAttribution = {
  photographer: "Hossein Zohrevand",
  license: "CC BY 4.0",
  licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
  sourceLabel: "Wikimedia Commons",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:Angelo_Preciado.jpg",
};

const fredAttribution: ImageAttribution = {
  photographer: "Ardfern",
  license: "CC BY-SA 4.0",
  licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
  sourceLabel: "Wikimedia Commons",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:Fred_(footballer)_in_2022.jpg",
};

const mayconAttribution: ImageAttribution = {
  photographer: "SOCCER DIGITAL (Fabio Giannelli), via Flickr",
  license: "Public Domain Mark",
  licenseUrl: "https://creativecommons.org/publicdomain/mark/1.0/",
  sourceLabel: "Wikimedia Commons",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:Maycon-Corinthians-Sao-Paulo-jul-2022.jpg",
};

const gustavoScarpaAttribution: ImageAttribution = {
  photographer: "SOCCER DIGITAL",
  license: "Public Domain Mark / CC0",
  licenseUrl: "https://creativecommons.org/publicdomain/mark/1.0/",
  sourceLabel: "Wikimedia Commons",
  sourceUrl:
    "https://commons.wikimedia.org/wiki/File:Gustavo-Scarpa-Palmeiras-Cuiaba-jul-2022.jpg",
};

const bernardAttribution: ImageAttribution = {
  photographer: "Богдан Заяц (Bohdan Zayats), via football.ua",
  license: "CC BY-SA 3.0",
  licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
  sourceLabel: "Wikimedia Commons",
  sourceUrl:
    "https://commons.wikimedia.org/wiki/File:Bernard_An%C3%ADcio_Caldeira_Duarte_2015.jpg",
};

const kevinCastanoAttribution: ImageAttribution = {
  photographer: "Presidência da Colômbia (Ovidio González S.)",
  license: "Public Domain Mark",
  licenseUrl: "https://creativecommons.org/publicdomain/mark/1.0/",
  sourceLabel: "Wikimedia Commons",
  sourceUrl:
    "https://commons.wikimedia.org/wiki/File:Kevin_Casta%C3%B1o,_Colombia_NT_presidential_send-off,_Jun_2026.jpg",
};

const igorGomesAttribution: ImageAttribution = {
  photographer: "SOCCER DIGITAL, via Flickr",
  license: "Public Domain Mark",
  licenseUrl: "https://creativecommons.org/publicdomain/mark/1.0/",
  sourceLabel: "Wikimedia Commons",
  sourceUrl:
    "https://commons.wikimedia.org/wiki/File:S%C3%A9rie_A_-_S%C3%83O_PAULO_0_X_0_JUVENTUDE_-_Igor_Gomes_em_2022.jpg",
};

const alanFrancoAttribution: ImageAttribution = {
  photographer: "Bryan Berlin (usuário Berlination) — projeto WikiPortraits",
  license: "CC BY-SA 4.0",
  licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
  sourceLabel: "Wikimedia Commons",
  sourceUrl:
    "https://commons.wikimedia.org/wiki/File:Alan_Franco_Cote_D%27Ivoire_v_Ecuador_14_June_2026-136.jpg",
};

const mateoCassierraAttribution: ImageAttribution = {
  photographer: "Вячеслав Евдокимов (Vyacheslav Evdokimov) — foto oficial FC Zenit",
  license: "CC BY-SA 3.0",
  licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
  sourceLabel: "Wikimedia Commons",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:Mateo_Casierra_in_2025.jpg",
};

const alanMindaAttribution: ImageAttribution = {
  photographer: "Bryan Berlin (usuário Berlination) — projeto WikiPortraits",
  license: "CC BY-SA 4.0",
  licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
  sourceLabel: "Wikimedia Commons",
  sourceUrl:
    "https://commons.wikimedia.org/wiki/File:Alan_Minda_Cote_D%27Ivoire_v_Ecuador_14_June_2026-187.jpg",
};

const duduAttribution: ImageAttribution = {
  photographer: "SOCCER DIGITAL (Fabio Giannelli), via Flickr",
  license: "Public Domain Mark",
  licenseUrl: "https://creativecommons.org/publicdomain/mark/1.0/",
  sourceLabel: "Wikimedia Commons",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:Dudu-Palmeiras-Athletico-jul-2022.jpg",
};

export const squad = [
  // Goleiros
  { name: "Gabriel Delfim", position: "goleiro", number: 1 },
  { name: "Everson", position: "goleiro", number: 22 },
  { name: "Robert", position: "goleiro", number: 31 },
  { name: "Pedro Cobra", position: "goleiro", number: 46 },

  // Zagueiros
  {
    name: "Léo Duarte",
    position: "defesa",
    number: 3,
    photo: "/images/squad/leo-duarte.jpg",
    photoAttribution: leoDuarteAttribution,
  },
  { name: "Ruan Tressoldi", position: "defesa", number: 4 },
  {
    name: "Lyanco",
    position: "defesa",
    number: 13,
    photo: "/images/squad/lyanco.jpg",
    photoAttribution: lyancoAttribution,
  },
  { name: "Vitor Hugo", position: "defesa", number: 14 },
  { name: "Vitão", position: "defesa", number: 40 },

  // Laterais
  { name: "Natanael", position: "defesa", number: 2 },
  {
    name: "Renan Lodi",
    position: "defesa",
    number: 6,
    photo: "/images/squad/renan-lodi.jpg",
    photoAttribution: renanLodiAttribution,
  },
  {
    name: "Angelo Preciado",
    position: "defesa",
    number: 23,
    photo: "/images/squad/angelo-preciado.jpg",
    photoAttribution: angeloPreciadoAttribution,
  },
  { name: "Pascini", position: "defesa", number: 36 },

  // Meio-campistas (volantes + meias)
  { name: "Alexsander", position: "meio", number: 5 },
  {
    name: "Fred",
    position: "meio",
    number: 7,
    photo: "/images/squad/fred.jpg",
    photoAttribution: fredAttribution,
  },
  {
    name: "Maycon",
    position: "meio",
    number: 8,
    photo: "/images/squad/maycon.jpg",
    photoAttribution: mayconAttribution,
  },
  {
    name: "Gustavo Scarpa",
    position: "meio",
    number: 10,
    photo: "/images/squad/gustavo-scarpa.jpg",
    photoAttribution: gustavoScarpaAttribution,
  },
  {
    name: "Bernard",
    position: "meio",
    number: 11,
    photo: "/images/squad/bernard.jpg",
    photoAttribution: bernardAttribution,
  },
  {
    name: "Kevin Castaño",
    position: "meio",
    number: 15,
    photo: "/images/squad/kevin-castano.jpg",
    photoAttribution: kevinCastanoAttribution,
  },
  {
    name: "Igor Gomes",
    position: "meio",
    number: 17,
    photo: "/images/squad/igor-gomes.jpg",
    photoAttribution: igorGomesAttribution,
  },
  { name: "Reinier", position: "meio", number: 19 },
  {
    name: "Alan Franco",
    position: "meio",
    number: 21,
    photo: "/images/squad/alan-franco.jpg",
    photoAttribution: alanFrancoAttribution,
  },
  { name: "Tomás Perez", position: "meio", number: 25 },
  { name: "Victor Hugo", position: "meio", number: 30 },
  { name: "Índio", position: "meio", number: 38 },
  { name: "Mamady Cissé", position: "meio", number: 39 },

  // Atacantes
  {
    name: "Mateo Cassierra",
    position: "ataque",
    number: 9,
    photo: "/images/squad/mateo-cassierra.jpg",
    photoAttribution: mateoCassierraAttribution,
  },
  { name: "Thiago Borbas", position: "ataque", number: 18 },
  {
    name: "Alan Minda",
    position: "ataque",
    number: 27,
    photo: "/images/squad/alan-minda.jpg",
    photoAttribution: alanMindaAttribution,
  },
  { name: "Tomás Cuello", position: "ataque", number: 28 },
  { name: "Cauã Soares", position: "ataque", number: 29 },
  {
    name: "Dudu",
    position: "ataque",
    number: 92,
    photo: "/images/squad/dudu.jpg",
    photoAttribution: duduAttribution,
  },
] satisfies Player[];
