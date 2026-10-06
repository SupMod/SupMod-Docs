# SupMod documentation

Source of [supmod.github.io/SupMod-Docs](https://supmod.github.io/SupMod-Docs/), the documentation of the [SupMod](https://www.spigotmc.org/resources/supmod.108806/) Minecraft plugin, in English and French. Built with [VitePress](https://vitepress.dev).

*La documentation existe en anglais (racine) et en français (dossier `fr/`). Chaque page anglaise a sa page française au même chemin.*

## Edit a page

Pages are Markdown files:

| Folder | Content |
|---|---|
| `index.md`, `fr/index.md` | home pages |
| `guide/`, `fr/guide/` | getting started |
| `features/`, `fr/features/` | one page per feature |
| `reference/`, `fr/reference/` | commands, permissions, placeholders, files, database |
| `changelog.md`, `fr/changelog.md` | changelog |
| `.vitepress/` | configuration, sidebar, theme (colours, home menu) |
| `public/` | logo, favicon, redirection of the old `docs-page.html` |

Every page has a link "Improve this page on GitHub" at the bottom.

Rules that keep the build working:

- Write `<player>` only inside backticks: `` `/report <player>` ``. Outside code, VitePress reads it as an HTML tag and the build fails.
- Internal links start with `/` without `.md`: `[Reports](/features/reports)`, `[Signalements](/fr/features/reports)`.
- Keep the `{#anchor}` at the end of the headings: links from other pages use them, in both languages.

## Update for a new version of the plugin

The pages **Commands**, **Permissions** and **Configuration files** are generated from the plugin.

1. Copy the files of the plugin (`src/main/resources/`) into `data/`: `plugin.yml`, `config.yml`, `punishments.yml`, `display.yml`, `rewards.yml`, `announcements.yml`, `zones.yml`, `holograms.yml`, `emojis.yml`, `auto_rules.txt` (replace `'${project.version}'` by the version in `plugin.yml`).
2. Add the new commands to `data/commands.yml` and the French texts of the new permissions to `data/permissions-text.yml`.
3. Generate and check:

```bash
pip install pyyaml
python3 scripts/generate.py
python3 scripts/check.py
```

4. Update the version in `.vitepress/config.mts` (`VERSION`) and the changelog pages.

`scripts/check.py` finds raw tags, dead links, missing anchors and pages that exist in only one language.

## Preview

```bash
npm install
npm run docs:dev        # http://localhost:5173/SupMod-Docs/
npm run docs:build      # production build in .vitepress/dist
```

## Publication

`.github/workflows/deploy.yml` builds the site on every push and pull request, and publishes it on GitHub Pages from `master`.

One-time setting on GitHub: **Settings › Pages › Build and deployment › Source: GitHub Actions**.
