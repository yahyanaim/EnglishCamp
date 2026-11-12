# Bundled website fonts

These are the website's existing Nunito, DM Sans, JetBrains Mono and Noto Naskh Arabic families, obtained from the official Google Fonts repository. Their versions match the fonts used in the previous build. Original CSS variables, requested weights, swap behavior and fallback lists are retained through `next/font/local`.

The WOFF2 files include the complete font character coverage and total less than 400 KiB. Bundling avoids a deployment dependency on a Google Fonts CSS URL format that the current Next.js Google loader cannot parse. Each family retains its SIL Open Font License. `manifest.json` records source URLs, versions, variable axes and file hashes; `tests/bundled-fonts.test.cjs` checks the assets, families, English/Arabic glyphs and layout declarations.

To update a font, obtain its original variable TTF and OFL.txt from the source recorded in the manifest, convert it to WOFF2 using FontTools with Brotli, then review the version, axes and visual result before updating its hash. FontTools is a maintainer conversion tool, not a website runtime dependency.
