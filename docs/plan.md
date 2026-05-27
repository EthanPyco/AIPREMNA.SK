# AIPREMNA.SK — Implementation Plan

## Context

The repo at `/Users/ondrej.brendza/Desktop/AIPREMNA.SK` contains a finished **content layer** (74+ Markdown files across `initial_info/`, `jednotlive_usecases/`, `jednotlive_tools/`), detailed authoring standards in `ai_docs/`, and a comprehensive design specification across `dizajn_stranky/`. The **frontend layer is zero**: no `package.json`, no Nuxt/Vite config, no source code.

`FINAL.md` is the implementation brief. The job is to scaffold a Nuxt SSG app, build the interactive 3-tier roadmap (Vue Flow tree → Learning Card modal → progress tracking → search → bookmarks → last-used → cheatsheet) **as vertical slices**, each fully working end-to-end and covered by automated tests, since the user will not manually verify. The end state is a working app running locally via `nuxi dev` and a production build that boots via `nuxi generate` + a static server, ready for future Vercel deployment.

## Decisions Already Locked (no further discussion needed)

| Area | Decision | Rationale |
|---|---|---|
| Framework | **Nuxt 4 (SSG via `nuxi generate`)** | File-based routing maps cleanly to the 3-tier folder hierarchy; `@nuxt/content` parses Markdown + extracts front-matter and headings natively; SSG output is a static drop for Vercel; Vue Flow has stable Vue 3 support; rejected plain Vue (forces hand-rolled routing + SSG + content pipeline) and VitePress (doc-shaped, hostile to modal-driven UX with persistent state). |
| Language | **TypeScript** | Nuxt 4 default; catches parser bugs at compile time |
| Package manager | **pnpm** | Fast, disk-efficient, Vercel-supported |
| CSS | **Tailwind via `@nuxtjs/tailwindcss`** with design tokens (`#8175fb`, `#3d72e5`, `#7dbcf9`, `#f8f2f2`, `#140c0b`, fonts Krona One + Ubuntu) | Verbatim from `dizajn_stranky/design.md` |
| Markdown | **`@nuxt/content` v3** | Parses MD → typed JSON; query API; built-in section indexing |
| Tree graph | **`@vue-flow/core` + `dagre` auto-layout** | FINAL.md mandates Vue Flow; dagre handles 3-tier positioning without hand-tuned coordinates |
| Modal | Headless UI dialog (`@headlessui/vue`) | Focus trapping + Esc handling out of the box |
| Search | **`flexsearch`** indexed over all guide bodies + titles | Debounced 250 ms (matches `dizajn_stranky/search`) |
| State / storage | **`useLocalStorage` from `@vueuse/core`** | Reactive localStorage; keys namespaced as `aipremna:bookmarks`, `aipremna:progress`, `aipremna:lastused`, `aipremna:locale` |
| Icons | **Lucide via `@nuxt/icon`** | Design doc: "thin-line icons (Lucide/Phosphor)" |
| Confetti | `canvas-confetti` | Lightweight; fires on 100% mastery |
| i18n | **`@nuxtjs/i18n`** with `sk` (default) + `en` locales | SK/EN header toggle confirmed by user; route prefix `/en/*`; EN fallback to SK when missing |
| Vertical slices | 10 slices, each independently runnable | Confirmed by user |
| Testing | **Playwright e2e** (per slice golden path) + **Vitest unit** (parsers, storage, slug logic) | Confirmed by user; no manual testing |
| MCP config | **Project-level `.mcp.json`** with env-var refs for credentials | Confirmed by user |
| Auxiliary folders | `impact_effort_map/` → **in scope** (rendered as Foundation-tier node); `ai_generovana_roadmapa/`, `vyuzitie_ai/` → **out of scope** | Confirmed by user |
| Bilingual rendering | Tools: `chatgpt.md` (EN) + `chatgpt_sk.md` (SK). Usecases: e.g. `pisanie_emailu.md` (SK) + `writing_email.md` (EN). Mapping table built at content-build time. EN fallback to SK if missing. | Confirmed by user |

## Critical Files to Read Before Implementation

The implementing agent must internalize:

1. `/Users/ondrej.brendza/Desktop/AIPREMNA.SK/FINAL.md` — feature brief
2. `/Users/ondrej.brendza/Desktop/AIPREMNA.SK/ai_docs/*.md` — content standards (esp. `naming_conventions.md`, `usecase_guide_standard.md`, `tool_guide_standard.md`)
3. `/Users/ondrej.brendza/Desktop/AIPREMNA.SK/dizajn_stranky/design.md` + every subfolder `*.md` — visual + behavioral spec
4. Sample content for parser ground truth:
   - `/Users/ondrej.brendza/Desktop/AIPREMNA.SK/jednotlive_usecases/administrativa/pisanie_emailu/pisanie_emailu.md`
   - `/Users/ondrej.brendza/Desktop/AIPREMNA.SK/jednotlive_tools/chatboti/chatgpt/chatgpt_sk.md`
   - `/Users/ondrej.brendza/Desktop/AIPREMNA.SK/initial_info/glosar_pojmov.md`

## Section Heading Parser (verified against real content)

The progress checklist appears in two forms:

- **Usecase guides**: `## ✅ Ako zistíte, že ste návod správne pochopili`
- **Tool guides**: `## ✅ Ako zistiť, že ste nástroj ovládli`

Parser strategy: match heading regex `/^##\s*✅\s+/` to locate the mastery section regardless of exact suffix. Inside that section, every bullet `* ...` becomes a checklist item with a stable hash-based ID for localStorage keys.

Other anchors (for rendering, not progress):

- `^##\s*🔄\s+` — step-by-step workflow (special render: `[A] ➔ [B]` chip flow)
- `^##\s*✍️\s+` — prompts section (render each blockquote `> "..."` as a prompt window with copy button)
- `^##\s*⚠️\s+` — human-in-the-loop checklist (render as warning callout)
- `^##\s*🚀\s+` — optional extension (render as de-emphasized section)

EN equivalents in EN guides follow the same emoji prefixes per `ai_docs/usecase_guide_standard.md`, so the same regex works on both languages.

## Target File Structure

```
/AIPREMNA.SK
├── CLAUDE.md                          ← from /init (slice 0)
├── .mcp.json                          ← slice 0
├── .env.example                       ← slice 0 (lists GITHUB_TOKEN, VERCEL_TOKEN)
├── package.json
├── nuxt.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── playwright.config.ts
├── vitest.config.ts
├── content.config.ts                  ← @nuxt/content v3 collections + label maps
├── app/
│   ├── app.vue                        ← root with header + <NuxtPage/> + modal portal
│   ├── components/
│   │   ├── header/
│   │   │   ├── AppHeader.vue
│   │   │   ├── HeaderSearch.vue       ← slice 5
│   │   │   ├── LocaleToggle.vue       ← slice 9
│   │   │   └── HeaderNav.vue
│   │   ├── tree/
│   │   │   ├── RoadmapTree.vue        ← slice 2 (Vue Flow)
│   │   │   ├── CategoryNode.vue
│   │   │   └── LeafNode.vue
│   │   ├── card/
│   │   │   ├── LearningCard.vue       ← slice 3 (modal shell)
│   │   │   ├── CardSection.vue
│   │   │   ├── PromptWindow.vue       ← copy-to-clipboard + bookmark
│   │   │   ├── ChecklistSection.vue   ← slice 4
│   │   │   └── ProgressRing.vue       ← slice 4
│   │   ├── search/
│   │   │   └── SearchResults.vue      ← slice 5
│   │   ├── bookmarks/
│   │   │   └── BookmarksPanel.vue     ← slice 6
│   │   ├── lastused/
│   │   │   └── LastUsedList.vue       ← slice 7
│   │   └── cheatsheet/
│   │       ├── CheatsheetGrid.vue     ← slice 8
│   │       └── GlossaryList.vue       ← slice 8
│   ├── composables/
│   │   ├── useGuideRegistry.ts        ← single source for guide lookup
│   │   ├── useProgress.ts             ← slice 4
│   │   ├── useBookmarks.ts            ← slice 6
│   │   ├── useLastUsed.ts             ← slice 7 (10s rule)
│   │   ├── useSearch.ts               ← slice 5 (FlexSearch wrapper)
│   │   └── useCardRoute.ts            ← URL ?card=... sync
│   ├── pages/
│   │   ├── index.vue                  ← tree
│   │   ├── tahak.vue                  ← cheatsheet (slice 8)
│   │   ├── ulozene.vue                ← bookmarks (slice 6)
│   │   └── naposledy.vue              ← last used (slice 7)
│   └── i18n/
│       ├── sk.json                    ← slice 9
│       └── en.json                    ← slice 9
├── content/                           ← @nuxt/content reads from here
│   └── (symlinks or content.config.ts sources pointing to initial_info/, jednotlive_usecases/, jednotlive_tools/, impact_effort_map/)
├── shared/
│   ├── parser/
│   │   ├── extractChecklist.ts        ← Vitest covered
│   │   ├── extractSections.ts         ← Vitest covered
│   │   └── slugify.ts                 ← Vitest covered
│   ├── tree/
│   │   └── buildGraph.ts              ← auto-derive nodes + edges from content; Vitest covered
│   └── i18n/
│       └── guideLocalePairing.ts      ← maps pisanie_emailu.md ↔ writing_email.md; Vitest covered
├── tests/
│   ├── unit/                          ← Vitest
│   └── e2e/                           ← Playwright; one spec per slice
└── public/
    └── fonts/                         ← Krona One, Ubuntu (self-hosted, no Google Font runtime call)
```

## MCP Configuration

`.mcp.json` (project root, committed). **Scope reduced**: only `context7` and `playwright` for now — `github` and `vercel` deferred (user decision, will fix later when deployment work begins).

```jsonc
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp"]
    },
    "playwright": {
      "command": "npx",
      "args": ["-y", "@playwright/mcp@latest"]
    }
  }
}
```

**Note**: "Nuxt docs" and "Tailwind docs" are not separate MCPs — Context7 fetches docs for any library on request (`use context7` in prompts).

No env vars required for v1 MCP set. When github/vercel MCPs are re-added later, `.env.example` will document their tokens.

## Pre-flight (before any code)

1. `git checkout -b feature/claude-implementation` from `main`
2. Copy this plan file into the repo at `docs/plan.md` (the plan currently lives outside the repo at `~/.claude/plans/`)
3. Write project memory entries to `~/.claude/projects/-Users-ondrej-brendza-Desktop-AIPREMNA-SK/memory/`:
   - `project_aipremna_overview.md` — what the project is, content structure, stack decisions
   - `feedback_commit_convention.md` — user requires `feat/fix/docs:` commit messages, no `Co-Authored-By` if user prefers (will confirm at first commit)
   - `feedback_no_manual_testing.md` — user does not manually test; automated suites are the truth signal
   - `project_aipremna_scope.md` — vertical slice plan summary so future sessions know where we are
   - Update `MEMORY.md` index
4. Initial commit: `docs: add implementation plan and starting-point memory` containing the plan file copy. (The memory files live outside the repo and aren't committed.)
5. Verify clean working tree before slice 0 begins

## Commit Cadence

- One commit per slice minimum; sub-commits within a slice are encouraged when a logical chunk is done (e.g., parser before its tests)
- Convention: `feat:`, `fix:`, `docs:`, `test:`, `chore:`, `refactor:` prefixes
- No `--no-verify`, no force-push
- Will confirm with user before the first commit whether to include the `Co-Authored-By: Claude` trailer

## Risk Register (read before slice 0)

| # | Risk | Likelihood | Mitigation |
|---|---|---|---|
| 1 | `nuxi init` clobbers existing files | High if used | Don't use `nuxi init`. Manually create `package.json`, `nuxt.config.ts`, `tsconfig.json`, `app/` — same result. |
| 2 | `@nuxt/content` v3 not yet Nuxt 4-ready | Medium | Use Context7 MCP to fetch current peer-dep matrix before install. Fall back to Nuxt 3.x stable if needed — no plan changes. |
| 3 | Content folders not at `content/` default | Certain | Configure `content.config.ts` with explicit `source` pointing at `initial_info/`, `jednotlive_usecases/`, `jednotlive_tools/`, `impact_effort_map/`. No file moves. |
| 4 | MCP github+vercel servers fail without tokens | Certain until user sets env | Documented in `.env.example`. Non-blocking; context7 + playwright work without tokens. |
| 5 | Playwright browser download is slow | Low risk, just slow | Run once in slice 0; cached after. |
| 6 | Slovak diacritics break slugs | Medium | `slugify.ts` with NFD strip; Vitest fixtures cover real titles. |
| 7 | Vue Flow + dagre layout produces ugly graph at 70+ nodes | Medium | Pre-tune dagre spacing in slice 2; if still poor, switch to elkjs (drop-in). |
| 8 | EN guide files missing for some Slovak usecases | Certain (partial coverage) | EN-fallback to SK with "Translation pending" badge (slice 9). |
| 9 | FlexSearch index build slow at startup | Low | Lazy-load on first search focus (dynamic import). |
| 10 | Confetti fires on every reload at 100% | Medium UX | Track "celebrated" set in sessionStorage; only fire on fresh 0→100 transition. |

None of these block the plan. Items 1-3 require attention before slice 0/1; the rest have mitigations baked into the relevant slice.

## Slice Plan

Each slice ends in a green Playwright spec + green Vitest unit suite. No slice is "done" until both pass. Each slice ends with a `feat:` commit.

### Slice 0 — Scaffold
- Run `/init` skill → produces `CLAUDE.md` describing the project for future Claude sessions
- `pnpm dlx nuxi@latest init . --packageManager pnpm --gitInit false` (in-place scaffold)
- Install: `@nuxt/content`, `@nuxtjs/tailwindcss`, `@nuxtjs/i18n`, `@nuxt/icon`, `@vueuse/nuxt`, `@vue-flow/core`, `dagre`, `flexsearch`, `@headlessui/vue`, `canvas-confetti`
- Dev deps: `vitest`, `@playwright/test`, `@nuxt/test-utils`
- Configure `nuxt.config.ts` modules; `tailwind.config.ts` design tokens (colors + fontFamily); self-host fonts in `public/fonts/`
- Write `.mcp.json` (above) and `.env.example`
- Vitest config + first dummy test; Playwright config + first dummy spec
- **Verify**: `pnpm dev` boots Nuxt to a blank page; `pnpm test:unit` green; `pnpm test:e2e` green; `pnpm build && pnpm generate` succeed

### Slice 1 — Content pipeline
- `content.config.ts` defines collections: `foundation` (`initial_info/**` + `impact_effort_map/**`), `usecases` (`jednotlive_usecases/**`), `tools` (`jednotlive_tools/**`)
- `shared/parser/extractSections.ts` walks rendered AST, returns `{ title, goal, workflow, prompts, humanLoop, mastery, optional, links }`
- `shared/parser/extractChecklist.ts` returns `[{ id: hash(text), text }]` from the `^##\s*✅` section
- `shared/i18n/guideLocalePairing.ts` builds bidirectional map (`pisanie_emailu` ↔ `writing_email`, `chatgpt_sk` ↔ `chatgpt`); needs explicit table for usecases (filenames differ), pattern-derived for tools (`_sk` suffix)
- `shared/tree/buildGraph.ts` produces Vue Flow `{ nodes, edges }` from collections + dagre layout
- Slovak category labels live in `shared/labels.sk.ts` (e.g., `administrativa: "Administratíva"`); EN equivalents in `shared/labels.en.ts`
- **Vitest**: parses real fixtures from `jednotlive_usecases/administrativa/pisanie_emailu/pisanie_emailu.md` and `jednotlive_tools/chatboti/chatgpt/chatgpt_sk.md`, asserts heading extraction, checklist count, locale pairing
- **Playwright**: none yet (no UI)

### Slice 2 — Tree on homepage
- `pages/index.vue` mounts `RoadmapTree.vue`
- `RoadmapTree.vue` consumes `buildGraph()` output, renders Vue Flow with pan/zoom
- `CategoryNode.vue` non-clickable, styled per design (rounded, primary color)
- `LeafNode.vue` clickable, emits `select` event (no-op for now)
- `AppHeader.vue` static (logo + nav links, no behavior yet)
- **Playwright**: visits `/`, asserts tree renders ≥ 3 tier rows, leaf nodes are present, header logo visible
- **Vitest**: graph builder produces N nodes matching content collection counts

### Slice 3 — Learning Card modal
- `LearningCard.vue` is a Headless UI `Dialog`, fixed center, dimmed backdrop
- `useCardRoute.ts` reads `?card=<slug>` from URL; clicking a leaf node pushes the query; Esc / backdrop click clears it
- Card body renders sections via `CardSection.vue` (one per anchor: Cieľ, Postup, Prompts, Human-loop, Mastery, Optional, Links)
- `PromptWindow.vue` renders blockquote prompts with **copy-to-clipboard button** (uses Clipboard API + fallback that selects text)
- "Recently Opened" tracker NOT yet wired (slice 7)
- **Playwright**: click leaf node → modal opens with title → URL contains `?card=`; press Esc → modal closes → URL clean; reload with `?card=pisanie-emailu` → modal opens directly; click copy on a prompt → clipboard contains the prompt text
- **Vitest**: slugify round-trips Slovak titles

### Slice 4 — Progress tracking
- `ChecklistSection.vue` renders checklist items as custom checkboxes
- `useProgress.ts` keys progress per `(slug, itemId)` in `aipremna:progress` localStorage
- `ProgressRing.vue` shows `% = checked / total`; "100%" triggers confetti once per slug
- Leaf nodes in the tree get a visual "completed" treatment when 100%
- "Seen" status auto-set the first time `?card=X` is opened (separate `aipremna:seen` map)
- **Playwright**: open card → check 2 of 4 items → reload page → checks persist → ring shows 50% → check remaining → confetti fires → close → tree leaf shows completed style
- **Vitest**: `useProgress` percent calc, idempotent updates, localStorage write format stable

### Slice 5 — Search
- `useSearch.ts` builds FlexSearch index from all guide bodies + titles at app init (one index per locale)
- `HeaderSearch.vue` is a debounced input (250 ms) with results dropdown
- Results show title + snippet with `<mark>` around matches
- Click result → opens corresponding card (uses `useCardRoute`)
- Enter selects first; Esc closes
- **Playwright**: type "email" → dropdown appears → first result contains "email" → click → card opens; type gibberish → "no results" state
- **Vitest**: index size matches content count; query returns expected slugs for known terms

### Slice 6 — Bookmarks
- `useBookmarks.ts` manages two namespaces: `card` (whole guide) and `prompt` (per `(slug, promptIndex)`)
- Bookmark icon on `LearningCard.vue` top bar (card-level) and on each `PromptWindow.vue` (prompt-level)
- `/ulozene` route renders `BookmarksPanel.vue` with tabs: All / Prompts / Lessons
- Removing an item: ✕ button or toggle icon
- **Playwright**: bookmark a card → see it on `/ulozene` → unbookmark → list empty; bookmark a prompt inside a card → see it under Prompts tab
- **Vitest**: bookmark add/remove is idempotent; tab filtering correct

### Slice 7 — Last Used
- `useLastUsed.ts` starts a timer on card open; on close, if ≥10 s elapsed, push to `aipremna:lastused` (cap 20, most-recent-first, dedupe by slug)
- `/naposledy` route renders `LastUsedList.vue` (horizontal scroll desktop, vertical mobile)
- Each entry shows title, goal excerpt, category tag, relative time (`formatRelative` from `date-fns`), progress count
- "Clear all" button
- **Playwright**: open card, wait 11s, close → entry appears on `/naposledy` with correct title; open card, close after 2s → entry does NOT appear
- **Vitest**: 10-second rule, dedupe, 20-entry cap, ordering

### Slice 8 — Cheatsheet + Glossary
- `/tahak` route renders `CheatsheetGrid.vue` (3 cols desktop → 1 col mobile)
- Cards sourced from a new content collection `cheatsheet` (created in slice 8 — add a content authoring TODO that uses existing guide prompts as starter cards if no explicit cheatsheet content exists yet)
- Search/filter bar above grid
- Tab toggle: "Hlavný ťahák" / "Slovník pojmov" (latter renders `initial_info/glosar_pojmov.md` parsed)
- Print: CSS `@media print` stylesheet (browser print only in v1; server-side PDF out of scope)
- **Playwright**: visit `/tahak` → cards render; filter by keyword → list narrows; switch to glossary tab → terms render; copy button on micro-prompt → clipboard set
- **Vitest**: glossary parser extracts term/definition pairs from `glosar_pojmov.md`

### Slice 9 — i18n
- `@nuxtjs/i18n` configured with `sk` (default, prefix-less) + `en` (`/en/*`)
- `app/i18n/sk.json` + `en.json` contain every UI string (header labels, button texts, empty states, error messages — full list extracted from `dizajn_stranky/`)
- `LocaleToggle.vue` switches locale, persists to `aipremna:locale`
- Guide route resolver uses `guideLocalePairing` map; if EN version missing → render SK + show small "Translation pending" badge
- Tree node labels respect locale (`labels.sk.ts` / `labels.en.ts`)
- Search index switches with locale
- **Playwright**: toggle EN → header labels swap → click leaf → EN guide renders; click leaf with no EN version → SK with badge; reload → locale persisted
- **Vitest**: pairing map round-trip, fallback resolution

### Slice 10 — Polish & responsive
- Mobile breakpoints: `sm: 640`, `md: 768`, `lg: 1024`, `xl: 1280` (Tailwind defaults)
- Mobile tree: pinch-to-zoom + "list view" toggle (collapsible hierarchical list as fallback)
- Header collapses to hamburger on `< md`
- Last Used: vertical list on mobile
- Cheatsheet grid: 3 → 2 → 1 cols
- Accessibility pass: ARIA on modal, focus trap, keyboard tab order, `aria-current` on active nav
- Lighthouse / `nuxi analyze` bundle size check
- **Playwright**: mobile viewport (`375x812`) — tree shows, hamburger works, card modal usable, search dropdown sized correctly
- **Vitest**: no new units

## Final Verification

After slice 10:
1. `pnpm test:unit` — all Vitest green
2. `pnpm test:e2e` — full Playwright suite green (all slices)
3. `pnpm build && pnpm generate` — static build succeeds
4. `npx serve .output/public` — serves locally; agent visits `http://localhost:3000` and walks the user journey via Playwright MCP (open card, check items, search, bookmark, toggle locale)
5. Bundle size sanity: main JS chunk < 300 KB gzipped (FlexSearch + Vue Flow + canvas-confetti are the big three)

## Things Explicitly NOT in v1

- Server-side PDF export for cheatsheet (browser print only)
- Backend / accounts / sync
- Analytics / telemetry
- Service worker / full offline (localStorage persistence is enough)
- Content authoring UI (Markdown is hand-edited in the repo)
- `ai_generovana_roadmapa/`, `vyuzitie_ai/` content (out of scope)
- Vercel deployment automation (user has confirmed deploy is "future" — `.mcp.json` enables the Vercel MCP for when that work begins)

## Risks & Mitigations

| Risk | Mitigation |
|---|---|
| EN content files missing for some usecases | EN-fallback to SK with "Translation pending" badge (slice 9); pairing map flags coverage gaps |
| Vue Flow performance with 70+ nodes | dagre layout precomputed at build time, not runtime; nodes virtualized if needed |
| FlexSearch bundle size | Lazy-load on first search focus (dynamic import in `useSearch`) |
| `@nuxt/content` v3 API churn | Pin minor version; use Context7 MCP to fetch latest docs when API issues arise |
| Slovak diacritics in slugs | `slugify.ts` uses `unorm` NFD strip; covered by Vitest fixtures |
| Confetti firing on every reload at 100% | Track "fired" set in sessionStorage; reset on new mastery transitions only |
