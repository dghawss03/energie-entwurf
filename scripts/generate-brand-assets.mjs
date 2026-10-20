// Original vector artwork for Entwurf Energie. No external images, fonts or marks.
import { writeFileSync } from "node:fs";

const wrap = (body, width = 1600, height = 900) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><title>Entwurf Energie – eigene Demoillustration</title>${body}</svg>`;
const symbol = `<rect width="104" height="104" rx="28" fill="#88cc27"/><path d="M28 27h48v12H42v10h28v12H42v16H28z" fill="#0a1f44"/><path d="m65 48-12 19h12l-6 19 24-29H70l7-9z" fill="#0a1f44"/>`;
for (const [variant, color] of [
  ["dark", "#0a1f44"],
  ["light", "#ffffff"],
]) {
  const logo = wrap(
    `<g transform="translate(5 17)">${symbol}</g><text x="135" y="85" fill="${color}" font-family="Arial,Helvetica,sans-serif" font-weight="700" font-size="50" letter-spacing="-1.8">Entwurf Energie</text>`,
    540,
    138,
  );
  writeFileSync(`src/assets/energie-entwurf-logo-${variant}.svg`, logo);
}
writeFileSync("src/assets/energie-entwurf-icon.svg", wrap(symbol, 104, 104));
writeFileSync(
  "public/social-card.svg",
  wrap(
    `<rect width="1200" height="630" fill="#0a1f44"/><circle cx="1150" cy="70" r="340" fill="#88cc27" opacity=".13"/><g transform="translate(80 100) scale(1.05)">${symbol}</g><text x="80" y="325" font-family="Arial,sans-serif" font-size="76" font-weight="700" fill="white">Entwurf Energie</text><text x="84" y="390" font-family="Arial,sans-serif" font-size="28" fill="#dceac9">Energievergleiche. Digitale Kundenverwaltung.</text><text x="84" y="535" font-family="Arial,sans-serif" font-size="23" fill="#88cc27">Website-Entwurf von dghWeb</text><text x="84" y="575" font-family="Arial,sans-serif" font-size="20" fill="#dceac9">In Entwicklung · nicht final</text>`,
    1200,
    630,
  ),
);

const house = `<path d="m865 450 200-160 200 160v290H865z" fill="#fff" stroke="#0a1f44" stroke-width="7"/><path d="m830 460 235-190 235 190" fill="none" stroke="#0a1f44" stroke-width="18" stroke-linecap="round"/><rect x="1010" y="560" width="100" height="180" rx="8" fill="#0a1f44"/><g fill="#d9ecbd" stroke="#0a1f44" stroke-width="6"><rect x="907" y="495" width="60" height="80" rx="8"/><rect x="1160" y="495" width="60" height="80" rx="8"/></g>`;
const panel = `<g transform="translate(765 550)"><path d="M0 0h280l55 160H-55z" fill="#0a1f44"/><g stroke="#a6c5cf" stroke-width="3"><path d="M-20 50h320M-40 105h360M70 0 45 160M140 0v160M210 0l25 160"/></g><path d="M50 160v75m170-75v75" stroke="#0a1f44" stroke-width="14"/></g>`;
const turbine = `<g stroke="#0a1f44" stroke-linecap="round" fill="none"><path d="M1250 380v360" stroke-width="15"/><path d="m1250 380-20-180m20 180 155 90m-155-90-150 100" stroke-width="20"/></g><circle cx="1250" cy="380" r="22" fill="#88cc27"/>`;
const buildings = `<g stroke="#0a1f44" stroke-width="7"><rect x="800" y="315" width="210" height="425" rx="16" fill="#d9ecbd"/><rect x="1030" y="400" width="265" height="340" rx="16" fill="#fff"/></g><g fill="#0a1f44">${[0, 1, 2, 3].map((row) => [0, 1, 2].map((col) => `<rect x="${835 + col * 52}" y="${360 + row * 80}" width="26" height="42" rx="5"/>`).join("")).join("")}</g><path d="M1080 465h160m-160 65h160m-160 65h160" stroke="#88cc27" stroke-width="19" stroke-linecap="round"/>`;
const document = `<g transform="translate(845 225) rotate(6 210 260)"><rect width="420" height="510" rx="28" fill="white" stroke="#0a1f44" stroke-width="7"/><rect x="45" y="50" width="65" height="65" rx="15" fill="#88cc27"/><path d="M145 73h210M145 105h145M50 165h300M50 215h240" stroke="#b9cbd3" stroke-width="17" stroke-linecap="round"/><g fill="#88cc27"><rect x="60" y="345" width="65" height="100" rx="8"/><rect x="150" y="300" width="65" height="145" rx="8"/><rect x="240" y="260" width="65" height="185" rx="8"/></g></g>`;
const battery = `<g transform="translate(925 315)"><rect x="75" y="-32" width="110" height="40" rx="10" fill="#0a1f44"/><rect width="260" height="400" rx="35" fill="white" stroke="#0a1f44" stroke-width="9"/><rect x="30" y="140" width="200" height="230" rx="18" fill="#88cc27"/><path d="m155 65-65 125h65l-45 140 115-190h-75l45-75z" fill="#0a1f44"/></g>`;
const car = `<g transform="translate(730 490)"><path d="m0 120 75-115h270l110 115 60 25v95H0z" fill="white" stroke="#0a1f44" stroke-width="9"/><path d="m110 40-45 80h310l-60-80z" fill="#d9ecbd"/><circle cx="110" cy="235" r="50" fill="#0a1f44"/><circle cx="395" cy="235" r="50" fill="#0a1f44"/><path d="M540 90v-190h80v190m-20-140h65v120" fill="none" stroke="#88cc27" stroke-width="22" stroke-linejoin="round"/></g>`;
const scenes = {
  "hero-bg": house + turbine,
  "comparison-hero": document,
  "final-cta-bg": house + panel,
  "page-strom": house + turbine,
  "page-gas": house + battery,
  "page-solar": house + panel,
  "page-service": document,
  "page-strom-gas": buildings + turbine,
  "page-wissen": document,
  "solution-autostrom": car,
  "solution-solar": panel + turbine,
  "solution-waermestrom": house + battery,
};
for (const [name, scene] of Object.entries(scenes)) {
  const body = `<defs><linearGradient id="bg" x2="1" y2="1"><stop stop-color="#f5f9ee"/><stop offset="1" stop-color="#d7e8e6"/></linearGradient></defs><rect width="1600" height="900" fill="url(#bg)"/><circle cx="1200" cy="220" r="260" fill="#88cc27" opacity=".16"/><circle cx="700" cy="650" r="360" fill="white" opacity=".5"/><path d="M0 770Q350 660 750 760t850-50v190H0z" fill="#c5d9b1"/>${scene}<path d="M0 825Q700 770 1600 815v85H0z" fill="#0a1f44" opacity=".09"/>`;
  writeFileSync(`src/assets/${name}.svg`, wrap(body));
}

// Original Lottie JSON, loaded by the existing animation player.
const value = (k) => ({ a: 0, k });
const animated = (values) => ({
  a: 1,
  k: values.map((s, i) => ({
    t: i * 40,
    s,
    e: values[(i + 1) % values.length],
    i: { x: [0.65], y: [1] },
    o: { x: [0.35], y: [0] },
  })),
});
const layers = [0, 1, 2].map((i) => ({
  ddd: 0,
  ind: i + 1,
  ty: 4,
  nm: `Energy bar ${i + 1}`,
  sr: 1,
  ks: {
    o: value(100),
    r: value(0),
    p: value([180 + 120 * i, 300, 0]),
    a: value([0, 0, 0]),
    s: animated([
      [100, 80 + i * 30, 100],
      [100, 150 - i * 25, 100],
      [100, 80 + i * 30, 100],
      [100, 80 + i * 30, 100],
    ]),
  },
  shapes: [
    { ty: "rc", d: 1, s: value([68, 130]), p: value([0, -65]), r: value(16), nm: "Bar" },
    {
      ty: "fl",
      c: value(i === 1 ? [0.53, 0.8, 0.15, 1] : [0.84, 0.92, 0.74, 1]),
      o: value(100),
      r: 1,
    },
  ],
  ip: 0,
  op: 120,
  st: 0,
  bm: 0,
}));
writeFileSync(
  "src/assets/energy-flow.json",
  JSON.stringify({
    v: "5.7.4",
    fr: 30,
    ip: 0,
    op: 120,
    w: 600,
    h: 420,
    nm: "Entwurf Energie – Energiefluss",
    ddd: 0,
    assets: [],
    layers,
    markers: [],
  }),
);
