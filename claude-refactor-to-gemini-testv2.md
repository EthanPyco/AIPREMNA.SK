# Refactor log — feature/claude-implementation → gemini-testv2-inspired

Date: 2026-05-28

## Why this exists

The first Claude implementation (12 commits on `feature/claude-implementation`, tests green) shipped a Vue Flow + dagre auto-layout tree on the homepage. It was technically working but visually broken: ~90 nodes overlapped, leaf labels rendered as raw slugs, and the SK/EN toggle did nothing visible (homepage hardcoded `'sk'`; `@nuxtjs/i18n` installed but never registered). Branch `origin/gemini-testv2` looked much better — this file records the decisions taken to bring the Claude branch in line.

## Decisions

1. **Roadmap layout: hand-laid roadmap.sh-style grid.** Replaced Vue Flow tree with a vertical-scroll page of three tier sections (Foundation / Use cases / Tools), cards arranged in deliberate columns with SVG connector lines between tier headers. Loses pan/zoom but matches the user's stated roadmap.sh/frontend reference. **Overrides** `dizajn_stranky/homepage/homepage.md` (which calls for pan/zoom) — falls back to gemini-style responsive scroll cards if too brittle to maintain.

2. **i18n: full UI translation via `@nuxtjs/i18n`.** Every Slovak UI string moved to `i18n/locales/sk.json` + `en.json`, rendered via `$t()`. Locale persists via i18n's browser-language detection + localStorage. **Overrides** `FINAL.md` §1 + §8 (which mandate Slovak-only UI).

3. **`impact_effort_map` moved off the tree.** Removed the 4th tier from the homepage roadmap (it was an earlier scope override). Content now renders on its own page at `/mapa-dopadu` with a header nav link. **Doc-aligned** — `FINAL.md` §3, `design.md` §2, `homepage.md` all specify 3 tiers.

## What is NOT changed

- `FINAL.md`, `dizajn_stranky/**`, `ai_docs/**` — left untouched. This file is the override record; the design docs remain the original intent.
- `docs/plan.md` (original implementation plan) — kept as historical reference.
- Learning card / search / bookmarks / progress / cheatsheet features — behavior unchanged, only their UI strings are now i18n-keyed.
