# Asset and licensing manifest

## Photography

All six photographs were generated for this fictional portfolio concept using the built-in OpenAI image generation tool on 17 October 2026. They are not stock photographs, copied reference assets, pictures of actual club members/staff, or evidence of a real facility. The site labels them as generated concept imagery. No third-party photo license or model release is represented as having been obtained; replace them with a commissioned, consented shoot for a real gym.

Final assets are local WebP files in `public/images/`, 1536×1024 pixels, encoded at quality 82. Layout uses `next/image` with stable `fill` containers; eager loading is reserved for hero/detail hero images. Static export uses `images.unoptimized` because WebP optimization is performed ahead of time. All image URLs are local, so rendering requires no external image service.

| File                | Subject / use                                                                             | Approx. file size |
| ------------------- | ----------------------------------------------------------------------------------------- | ----------------- |
| `strength.webp`     | Coached kettlebell practice; homepage hero, programme, coach concept                      | 136 KB            |
| `coaching.webp`     | Coach and trainee reviewing a paper training journal; personal training and coaching area | 100 KB            |
| `conditioning.webp` | Mixed small group, step-up and carries; conditioning programme                            | 140 KB            |
| `space.webp`        | Training floor, windows, racks, weights; space essay                                      | 236 KB            |
| `equipment.webp`    | Chalk-dusted hand and weight plate; tools/detail spread                                   | 112 KB            |
| `changing.webp`     | Olive lockers, bench, changing cubicle; everyday facilities                               | 88 KB             |

Generated originals remain in the user's generated-images folder. The final selected/optimized assets are copied into this project. `scripts/prepare-assets.mjs` records the source filenames and regeneration/optimization procedure. That helper is not needed to run or build the website. It can be rerun with the absolute original source directory when available:

```sh
node scripts/prepare-assets.mjs /absolute/path/to/generated_images/session
```

### Final prompt set

**strength.webp**

> Use case: photorealistic-natural. Asset type: landscape website hero photograph, 3:2 ratio. Create an exceptional documentary sports photograph for a fictional independent neighbourhood gym in Pune India. Foreground a South Asian woman in her early 30s with ordinary strong build, wearing muted olive tshirt and black full length leggings, doing a careful kettlebell deadlift on black rubber flooring. Natural athletic posture, two hands on one kettlebell. A South Asian male coach in off-white t-shirt crouches alongside watching her technique with a quiet attentive expression. Fully clothed everyday adults, welcoming realistic gym moment. Gym has warm pale concrete walls, tall gridded windows on right, dark steel squat racks, weight plates, honest utility. Late morning side light, deep soft shadows, muted warm brown and olive palette, subtle 35mm film grain, editorial magazine realism, not glossy commercial fitness advertising. Medium wide eye-level perspective with woman centered slightly to right, gym environment visible. No text, no logos, no watermarks, no montage. Anatomically correct hands, believable equipment.

**coaching.webp**

> Use case: photorealistic-natural. Asset: landscape 3:2 documentary photograph for fictional Pune strength gym. A South Asian female coach wearing a plain charcoal t-shirt sits at a wooden bench next to an everyday South Asian woman around 45 with fuller body wearing rust training tshirt. They are relaxed, talking through a small open paper training notebook and smiling naturally, not posing. Warm pale concrete gym, black steel rack in soft background, gridded window side light, quiet earthy colours, soft shadows, subtle film grain, editorial analogue 35mm texture. Closely framed waist up, candid, believable, no text or logos. All people fictional. Not glossy, not glamour, not stereotypical bodybuilder.

**conditioning.webp**

> Use case: photorealistic-natural. Asset: landscape 3:2 documentary sports photograph for fictional neighbourhood gym in Pune. Three fully clothed South Asian adults around 28 to 50, varied ordinary bodies, training in a small group. Foreground fuller-built man in dark washed olive shirt performs a low step-up onto a sturdy wooden plyometric box, woman in grey shirt doing a farmer carry with kettlebells behind him, woman coach in charcoal t-shirt attentively observing. Anatomically natural correct exercise positions, manageable weights, calm effort, noncompetitive. Pale warm concrete walls, gridded windows, black rubber floor, black steel gym equipment. Warm natural side light, muted earthy palette, subtle 35mm film texture, editorial sports journal photograph, no text no logos no montage no shirtless models.

**space.webp**

> Use case: photorealistic-natural. Asset: landscape 3:2 architectural documentary photograph for fictional small independent strength club in Pune India. Wide inviting empty training floor with black rubber tiles, warm chalk concrete walls, high gridded steel windows spilling late morning light. Two dark steel squat racks along right, neatly stored black plates, simple dumbbell rack on left, a wooden bench with water bottle and folded towel. Small muted olive painted wall detail. Honest functional premium neighbourhood training space, modest size, no luxurious hotel, no neon, no text, no branding, no people. Analogue 35mm photo, muted warm colours, deep soft shadows, natural texture, sophisticated magazine aesthetic.

**equipment.webp**

> Use case: photorealistic-natural. Asset: landscape 3:2 close detail documentary gym photograph, fictional Pune strength club. A close photograph of a chalk-dusted hand sliding a dark cast iron weight plate onto a horizontal barbell sleeve on a steel squat rack. Anatomically correct one hand, realistic plate and sleeve. Black and dark grey metal, warm window sidelight, muted warm olive and concrete background softly out of focus, subtle analogue 35mm grain, true material texture, quiet editorial sports journal aesthetic. No logos, no readable text, no watermark, no dramatic chalk clouds, no shirtless bodies.

**changing.webp**

> Use case: photorealistic-natural. Asset: landscape 3:2 interior documentary photograph for fictional neighbourhood Pune strength gym. A modest thoughtfully designed changing room: pale warm concrete walls, bank of matte muted olive lockers at left, a simple oak bench with a folded off-white towel and black gym bag, a frosted window admitting gentle morning light, glimpsed private changing cubicle at far right. No people, no pool, no spa, no hotel luxury. Clean believable functional facilities in a small gym. Warm restrained colour palette and soft deep shadows, editorial analogue 35mm photograph, subtle grain, no text no logos no watermark.

### Production shot list

Commission the same six subjects in the real facility: guided starting movement, a training-plan conversation, varied people doing scalable conditioning, wide unobstructed floor, hands/equipment detail, and changing facilities. Keep warm natural side light, concrete/olive/ink palette, documentary expressions, and consistent crops. Secure consent and releases. Photograph actual staff separately if making named portrait profiles.

## Updated photographic presentation

The moving edition uses a consistent monochrome print grade and a small procedural grain overlay in `app/experience.css`. It does not replace or destructively edit the colour WebP source files. `public/images/print-grain.svg` is an original 160×160 SVG noise tile made for this interface. Day/night filter values and the visual rationale are documented in MOTION-DIRECTION.md. Generated-image disclosures remain in place; the treatment is an art-direction choice, not a claim of photographic authenticity.

## Typography

Two font families, three loaded weights; approximately 56 KB total before transfer compression.

- **Barlow Condensed 700** — designed by Jeremy Tribby; distributed by Fontsource under the SIL Open Font License 1.1. Source: https://fontsource.org/fonts/barlow-condensed . Local font: `public/fonts/barlow-condensed-latin-700-normal.woff2`; license: `public/fonts/OFL-Barlow-Condensed.txt`.
- **DM Sans 400 and 600** — distributed by Fontsource under the SIL Open Font License 1.1. Source: https://fontsource.org/fonts/dm-sans . Local fonts: `public/fonts/dm-sans-latin-{400,600}-normal.woff2`; license: `public/fonts/OFL-DM-Sans.txt`.
- Utility monospace uses the visitor's system font; no third font family is downloaded.

`next/font/local` serves the fonts from the build; no Google Fonts request occurs at runtime.

## Original graphics

The VAJRA wordmark is an original typographic treatment. The slash, arrows, rules, plus signs, session numbers, progress bars, and round “one session at a time” annotation are native SVG/CSS/HTML treatments made for this project. No reference-site graphics were used.

- `public/icon.svg`: original F/slash favicon.
- `public/social.png`: original 1200×630 social sharing fallback, generated from the SVG source embedded in `scripts/prepare-assets.mjs`.
- No video, external embed, map image, icon library, stock testimonial, or copied review asset is used.

The moving edition additionally uses GSAP 3.15.0 under its standard license and Lenis 1.3.27 under MIT. These are local code dependencies, not third-party visual assets. See MOTION-DIRECTION.md.
