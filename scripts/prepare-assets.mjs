import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { resolve } from "node:path";

// Run with an absolute source folder argument if regenerating these concept assets.
const source = process.argv[2];
if (!source)
  throw new Error(
    "Pass the generated image source directory. See docs/ASSETS.md.",
  );
const assets = {
  strength: "exec-48ad56e7-116f-4106-a7f9-dfaec98b7335.png",
  coaching: "exec-b1fefd6b-5f76-49ae-91dd-2a7b15bcf8f1.png",
  conditioning: "exec-19eef2f0-0d16-4e2e-8da2-2aad7b9f79f5.png",
  space: "exec-a2c74a2c-f28e-4ae1-ae1c-da00173f6242.png",
  equipment: "exec-72a166a8-68db-4c16-bc13-b9777a4b87fb.png",
  changing: "exec-1e1ebc6a-2933-4d43-9e5b-6743050d63be.png",
};
await mkdir("public/images", { recursive: true });
for (const [name, file] of Object.entries(assets)) {
  await sharp(resolve(source, file))
    .resize({ width: 1536, withoutEnlargement: true })
    .webp({ quality: 82, effort: 6 })
    .toFile(`public/images/${name}.webp`);
}
const social = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#f1eee6"/><path stroke="#191b18" d="M60 130h1080M60 550h1080"/><text x="60" y="98" fill="#191b18" font-family="Arial,sans-serif" font-size="52" font-weight="bold">FORM<tspan fill="#d84b32"> /</tspan></text><text x="1140" y="91" text-anchor="end" fill="#62635b" font-family="monospace" font-size="15">STRENGTH CLUB / PUNE</text><text x="55" y="295" fill="#191b18" font-family="Arial,sans-serif" font-size="102" font-weight="bold" letter-spacing="-5">PROGRESS IS</text><text x="55" y="416" fill="#191b18" font-family="Arial,sans-serif" font-size="102" font-weight="bold" letter-spacing="-5">A PRACTICE<tspan fill="#d84b32">.</tspan></text><text x="60" y="591" fill="#62635b" font-family="monospace" font-size="14">A FICTIONAL NEIGHBOURHOOD STRENGTH CLUB / PORTFOLIO CONCEPT</text><rect x="1060" y="456" width="13" height="32" fill="#747766"/><rect x="1082" y="440" width="13" height="48" fill="#747766"/><rect x="1104" y="424" width="13" height="64" fill="#747766"/><rect x="1126" y="408" width="13" height="80" fill="#d84b32"/></svg>`;
await sharp(Buffer.from(social)).png().toFile("public/social.png");
console.log("Prepared six local WebP photographs and social artwork.");
