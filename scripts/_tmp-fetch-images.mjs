// One-off script: baixa fotos de licença livre do Wikimedia Commons e gera
// versões otimizadas para public/images/squad e public/images/news.
// Uso: node fetch-images.mjs
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";

const PUBLIC = "C:\\Users\\crive\\Mentoria Claude\\test\\public\\images";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function download(url, attempt = 1) {
  const res = await fetch(url, {
    headers: { "User-Agent": "galo-site-dev/1.0 (educational fan site build script)" },
  });
  if (res.status === 429 && attempt <= 8) {
    const wait = 15000 * attempt;
    console.log(`429 recebido, aguardando ${wait}ms antes de tentar de novo (tentativa ${attempt})...`);
    await sleep(wait);
    return download(url, attempt + 1);
  }
  if (!res.ok) throw new Error(`Falha ao baixar ${url}: HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await sleep(4000);
  return buf;
}

async function makeSquadPhoto(buf, outPath) {
  await mkdir(dirname(outPath), { recursive: true });
  await sharp(buf)
    .rotate()
    .resize(720, 960, { fit: "cover", position: "top" })
    .jpeg({ quality: 82 })
    .toFile(outPath);
  console.log("squad:", outPath);
}

async function makeNewsPhoto(buf, outPath) {
  await mkdir(dirname(outPath), { recursive: true });
  await sharp(buf)
    .rotate()
    .resize(1200, 800, { fit: "cover", position: "attention" })
    .jpeg({ quality: 82 })
    .toFile(outPath);
  console.log("news:", outPath);
}

const SQUAD_SOURCES = [
  ["leo-duarte", "https://commons.wikimedia.org/wiki/Special:FilePath/L%C3%A9o_Duarte_Basaksehir.jpg"],
  ["lyanco", "https://commons.wikimedia.org/wiki/Special:FilePath/Lyanco_Evangelista_Silveira_Neves_Vojnovi%C4%87_2017.jpg"],
  ["renan-lodi", "https://commons.wikimedia.org/wiki/Special:FilePath/ATL-Madrid-Lokomotiv001-Lodi.jpg"],
  ["angelo-preciado", "https://commons.wikimedia.org/wiki/Special:FilePath/Angelo_Preciado.jpg"],
  ["fred", "https://commons.wikimedia.org/wiki/Special:FilePath/Fred_(footballer)_in_2022.jpg"],
  ["maycon", "https://commons.wikimedia.org/wiki/Special:FilePath/Maycon-Corinthians-Sao-Paulo-jul-2022.jpg"],
  ["gustavo-scarpa", "https://commons.wikimedia.org/wiki/Special:FilePath/Gustavo-Scarpa-Palmeiras-Cuiaba-jul-2022.jpg"],
  ["bernard", "https://commons.wikimedia.org/wiki/Special:FilePath/Bernard_An%C3%ADcio_Caldeira_Duarte_2015.jpg"],
  ["kevin-castano", "https://commons.wikimedia.org/wiki/Special:FilePath/Kevin_Casta%C3%B1o,_Colombia_NT_presidential_send-off,_Jun_2026.jpg"],
  ["igor-gomes", "https://commons.wikimedia.org/wiki/Special:FilePath/S%C3%A9rie_A_-_S%C3%83O_PAULO_0_X_0_JUVENTUDE_-_Igor_Gomes_em_2022.jpg"],
  ["reinier", "https://commons.wikimedia.org/wiki/Special:FilePath/2021-11-06_Fu%C3%9Fball,_M%C3%A4nner,_1._Bundesliga,_RB_Leipzig_-_Borussia_Dortmund_1DX_1739_by_Stepro.jpg"],
  ["alan-franco", "https://commons.wikimedia.org/wiki/Special:FilePath/Alan_Franco_Cote_D%27Ivoire_v_Ecuador_14_June_2026-136.jpg"],
  ["mateo-cassierra", "https://commons.wikimedia.org/wiki/Special:FilePath/Mateo_Casierra_in_2025.jpg"],
  ["alan-minda", "https://commons.wikimedia.org/wiki/Special:FilePath/Alan_Minda_Cote_D%27Ivoire_v_Ecuador_14_June_2026-187.jpg"],
  ["dudu", "https://commons.wikimedia.org/wiki/Special:FilePath/Dudu-Palmeiras-Athletico-jul-2022.jpg"],
];

// Léo Duarte no Başakşehir (foto distinta da usada no elenco) para a notícia 4.
const NEWS_LEO_DUARTE_URL =
  "https://commons.wikimedia.org/wiki/Special:FilePath/L%C3%A9o_Duarte_5_%C4%B0stanbul_Ba%C5%9Fak%C5%9Fehir_FK_20250731_(1).jpg";

async function main() {
  const bufCache = new Map();
  for (const [slug, url] of SQUAD_SOURCES) {
    const outPath = join(PUBLIC, `squad/${slug}.jpg`);
    if (existsSync(outPath) && (slug === "fred" || slug === "renan-lodi")) {
      // Precisamos do buffer em memória pra reaproveitar na notícia — se o
      // arquivo final já existe mas não está no cache desta execução,
      // baixa de novo (rápido, é só 1 imagem).
    }
    if (existsSync(outPath) && slug !== "fred" && slug !== "renan-lodi") {
      console.log("já existe, pulando:", outPath);
      continue;
    }
    const buf = await download(url);
    bufCache.set(slug, buf);
    await makeSquadPhoto(buf, outPath);
  }

  // Notícias: Fred e Renan Lodi reaproveitam a MESMA foto já baixada para o
  // elenco (mesma pessoa, mesma licença/atribuição já verificada) — evita
  // baixar uma segunda foto sem autor confirmado pela pesquisa.
  const fredBuf = bufCache.get("fred") ?? (await download(SQUAD_SOURCES.find((s) => s[0] === "fred")[1]));
  await makeNewsPhoto(fredBuf, join(PUBLIC, "news/fred.jpg"));
  const lodiBuf =
    bufCache.get("renan-lodi") ?? (await download(SQUAD_SOURCES.find((s) => s[0] === "renan-lodi")[1]));
  await makeNewsPhoto(lodiBuf, join(PUBLIC, "news/renan-lodi.jpg"));

  // Léo Duarte na notícia usa uma foto DIFERENTE (Başakşehir, autor Zafer,
  // CC BY 4.0) da usada no elenco (autor FreBulhoes/Leonardo Duarte) — ambas
  // com atribuição completa e verificada na pesquisa.
  if (!existsSync(join(PUBLIC, "news/leo-duarte.jpg"))) {
    const leoDuarteNewsBuf = await download(NEWS_LEO_DUARTE_URL);
    await makeNewsPhoto(leoDuarteNewsBuf, join(PUBLIC, "news/leo-duarte.jpg"));
  } else {
    console.log("já existe, pulando: news/leo-duarte.jpg");
  }

  console.log("done");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
