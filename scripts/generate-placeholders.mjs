// Gera imagens placeholder de origem própria (geradas, sem fotografia licenciada
// de terceiros) para o site do Atlético Mineiro. Uso: node scripts/generate-placeholders.mjs
// Não roda no build/runtime do site — é uma ferramenta de setup do dev.
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const PUBLIC = join(ROOT, "public");

const BLACK = "#0A0A0A";
const SURFACE = "#141414";
const GOLD = "#C9A227";
const WHITE = "#FFFFFF";

/** Estrela de 5 pontas centrada em (cx, cy) com raio externo/interno. */
function starPath(cx, cy, rOuter, rInner) {
  const points = [];
  for (let i = 0; i < 10; i++) {
    const r = i % 2 === 0 ? rOuter : rInner;
    const angle = (Math.PI / 5) * i - Math.PI / 2;
    points.push([cx + r * Math.cos(angle), cy + r * Math.sin(angle)]);
  }
  return `M${points.map((p) => p.join(",")).join(" L")}Z`;
}

/** Listras diagonais pretas/brancas sutis (motivo gráfico do clube). */
function stripes(width, height, opacity) {
  const stripeWidth = 48;
  let out = "";
  for (let x = -height; x < width; x += stripeWidth * 2) {
    out += `<polygon points="${x},${height} ${x + height},0 ${x + stripeWidth + height},0 ${x + stripeWidth},${height}" fill="${WHITE}" opacity="${opacity}" />`;
  }
  return out;
}

function heroSvg({ width, height, eyebrow, title, withStripes = true }) {
  return `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${SURFACE}" />
        <stop offset="1" stop-color="${BLACK}" />
      </linearGradient>
      <linearGradient id="overlay" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${BLACK}" stop-opacity="0.15" />
        <stop offset="1" stop-color="${BLACK}" stop-opacity="0.85" />
      </linearGradient>
      <clipPath id="clip"><rect width="${width}" height="${height}" /></clipPath>
    </defs>
    <rect width="${width}" height="${height}" fill="url(#bg)" />
    <g clip-path="url(#clip)" opacity="0.5">${withStripes ? stripes(width, height, 0.06) : ""}</g>
    <path d="${starPath(width * 0.82, height * 0.32, height * 0.22, height * 0.09)}" fill="${GOLD}" opacity="0.14" />
    <rect width="${width}" height="${height}" fill="url(#overlay)" />
    ${
      title
        ? `<text x="${width * 0.08}" y="${height * 0.9}" font-family="Georgia, 'Times New Roman', serif" font-size="${height * 0.09}" font-weight="700" fill="${WHITE}">${title}</text>`
        : ""
    }
    ${
      eyebrow
        ? `<text x="${width * 0.08}" y="${height * 0.82}" font-family="Arial, sans-serif" font-size="${height * 0.028}" letter-spacing="6" fill="${GOLD}">${eyebrow}</text>`
        : ""
    }
  </svg>`;
}

function tileSvg({ width, height, label, seed = 0 }) {
  const hueShift = (seed * 37) % 20;
  return `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="g${seed}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${SURFACE}" />
        <stop offset="1" stop-color="${BLACK}" />
      </linearGradient>
      <clipPath id="c${seed}"><rect width="${width}" height="${height}" /></clipPath>
    </defs>
    <rect width="${width}" height="${height}" fill="url(#g${seed})" />
    <g clip-path="url(#c${seed})" opacity="0.4" transform="rotate(${hueShift} ${width / 2} ${height / 2})">${stripes(width, height, 0.05)}</g>
    <path d="${starPath(width * 0.5, height * 0.42, height * 0.16, height * 0.065)}" fill="${GOLD}" opacity="0.9" />
    ${
      label
        ? `<text x="${width / 2}" y="${height * 0.78}" text-anchor="middle" font-family="Arial, sans-serif" font-size="${height * 0.07}" font-weight="700" letter-spacing="2" fill="${WHITE}">${label}</text>`
        : ""
    }
  </svg>`;
}

function silhouetteSvg({ size = 480 }) {
  const cx = size / 2;
  return `
  <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${size}" height="${size}" fill="${SURFACE}" />
    <circle cx="${cx}" cy="${size * 0.36}" r="${size * 0.18}" fill="${BLACK}" opacity="0.85" />
    <path d="M ${size * 0.18} ${size} C ${size * 0.18} ${size * 0.68}, ${size * 0.3} ${size * 0.55}, ${cx} ${size * 0.55} C ${size * 0.7} ${size * 0.55}, ${size * 0.82} ${size * 0.68}, ${size * 0.82} ${size} Z" fill="${BLACK}" opacity="0.85" />
    <path d="${starPath(cx, size * 0.86, size * 0.05, size * 0.02)}" fill="${GOLD}" opacity="0.9" />
  </svg>`;
}

function ogSvg({ width, height, title, subtitle }) {
  return `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${SURFACE}" />
        <stop offset="1" stop-color="${BLACK}" />
      </linearGradient>
      <clipPath id="clip"><rect width="${width}" height="${height}" /></clipPath>
    </defs>
    <rect width="${width}" height="${height}" fill="url(#bg)" />
    <g clip-path="url(#clip)" opacity="0.5">${stripes(width, height, 0.07)}</g>
    <path d="${starPath(width * 0.86, height * 0.28, height * 0.3, height * 0.12)}" fill="${GOLD}" opacity="0.16" />
    <text x="${width * 0.07}" y="${height * 0.56}" font-family="Georgia, 'Times New Roman', serif" font-size="${height * 0.14}" font-weight="700" fill="${WHITE}">${title}</text>
    <text x="${width * 0.07}" y="${height * 0.7}" font-family="Arial, sans-serif" font-size="${height * 0.05}" fill="${GOLD}" letter-spacing="2">${subtitle}</text>
  </svg>`;
}

async function render(svg, outPath, { format = "jpeg" } = {}) {
  await mkdir(dirname(outPath), { recursive: true });
  const pipeline = sharp(Buffer.from(svg));
  if (format === "jpeg") {
    await pipeline.jpeg({ quality: 82 }).toFile(outPath);
  } else {
    await pipeline.png().toFile(outPath);
  }
  console.log("gerado:", outPath);
}

async function main() {
  // Sem eyebrow/título queimados na imagem: o `<h1>`/eyebrow reais do Hero
  // (`hero.tsx`) e da `/estadio` são sobrepostos exatamente na mesma região
  // inferior-esquerda da imagem — texto embutido duplicaria o heading real e
  // colidiria visualmente com ele (QA H2). O fundo fica só com o motivo
  // gráfico (listras + estrela + gradiente escuro para legibilidade do <h1>).
  await render(
    heroSvg({ width: 1920, height: 1080 }),
    join(PUBLIC, "images/hero/hero-torcida.jpg"),
  );

  await render(
    heroSvg({ width: 1920, height: 1080 }),
    join(PUBLIC, "images/arena/arena-hero.jpg"),
  );

  // Sem rótulo de texto queimado (QA N4, mesmo tratamento de H1/H2): a
  // galeria não tem legenda por tile no site, e um rótulo fixo tipo
  // "ARQUIBANCADA" não é substituível/traduzível e diverge do `alt=""`
  // (decorativo) escolhido em src/content/arena.ts (QA N3). O tile fica só
  // com o motivo gráfico do clube, variado por `seed`.
  const ARENA_GALLERY_COUNT = 6;
  for (let i = 0; i < ARENA_GALLERY_COUNT; i++) {
    await render(
      tileSvg({ width: 1200, height: 800, seed: i + 1 }),
      join(PUBLIC, `images/arena/galeria-${i + 1}.jpg`),
    );
  }

  // Sem rótulo de texto queimado: cada notícia tem título/`imageAlt` próprios
  // em src/content/news.ts, e texto fixo na imagem inevitavelmente destoa da
  // ordem/edição editorial (QA H1). O tile fica só com o motivo gráfico do
  // clube (listras + estrela), variado por `seed` para não repetir idêntico.
  const NEWS_TILE_COUNT = 6;
  for (let i = 0; i < NEWS_TILE_COUNT; i++) {
    await render(
      tileSvg({ width: 1200, height: 800, seed: i + 10 }),
      join(PUBLIC, `images/news/noticia-${i + 1}.jpg`),
    );
  }

  // Sem rótulo de ano queimado (QA N4): o ano já é o elemento tipográfico
  // mais destacado no card da timeline (`timeline.tsx`, `text-2xl`/`text-3xl`
  // dourado) — duplicá-lo dentro do JPG é texto-imagem evitável (WCAG 1.4.5)
  // e diverge do `alt=""` (decorativo) escolhido em src/content/timeline.ts
  // (QA N3).
  const timelineFiles = [
    "fundacao-1908",
    "brasileiro-1971",
    "libertadores-2013",
    "brasileiro-2021",
    "arena-mrv-2023",
  ];
  for (let i = 0; i < timelineFiles.length; i++) {
    await render(
      tileSvg({ width: 800, height: 600, seed: i + 20 }),
      join(PUBLIC, `images/historia/${timelineFiles[i]}.jpg`),
    );
  }

  await render(silhouetteSvg({ size: 480 }), join(PUBLIC, "images/squad/placeholder-silhueta.png"), {
    format: "png",
  });

  await render(
    ogSvg({
      width: 1200,
      height: 630,
      title: "Atlético Mineiro — Galo",
      subtitle: "SITE DE TORCEDOR · NÃO OFICIAL",
    }),
    join(PUBLIC, "og/default.jpg"),
  );

  await render(
    ogSvg({
      width: 1200,
      height: 630,
      title: "Arena MRV",
      subtitle: "A CASA DO GALO · SITE DE TORCEDOR",
    }),
    join(PUBLIC, "og/estadio.jpg"),
  );

  // Ícone próprio (estrela dourada sobre fundo preto) — não reproduz o escudo oficial.
  const iconSvg = (size) => `
  <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${size}" height="${size}" rx="${size * 0.18}" fill="${BLACK}" />
    <path d="${starPath(size / 2, size / 2, size * 0.32, size * 0.13)}" fill="${GOLD}" />
  </svg>`;
  await render(iconSvg(512), join(ROOT, "src/app/icon.png"), { format: "png" });
  await render(iconSvg(180), join(ROOT, "src/app/apple-icon.png"), { format: "png" });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
