# AnalyseTool website

Static landing page for [AnalyseTool](https://github.com/Nikola1Davydov/AnalyzeTool), the free Revit plugin.
Implements the "AnalyseTool Website v3 terminal" design from Claude Design as a Vue 3 + TypeScript 7 single page, built with Vite into plain HTML/CSS/JS.

## Commands

```bash
npm install        # once
npm run dev        # dev server with HMR at http://localhost:5173
npm run build      # typecheck + production build into dist/
npm run preview    # serve dist/ locally at http://localhost:4173
npm run typecheck  # TypeScript 7 native tsc on src/**/*.ts and vite.config.ts
```

`dist/` is self-contained and uses relative asset paths (`base: './'`), so it can be dropped on any static host: GitHub Pages, Netlify, an S3 bucket, or a plain folder opened over HTTP.

## Layout

```
index.html                 document shell, meta tags, favicon
src/main.ts                mounts App, loads global styles
src/App.vue                page container; owns the one 620 ms clock the animations share
src/styles/tokens.css      Broadsheet design-system tokens (colors, ramps, mono font stack)
src/styles/base.css        page-wide rules and the shared vocabulary (.kicker, .prose, .frame, buttons, video slot)
src/data/site.ts           version, links, flags (showScreenshot, showDevelopers), MCP video slot, official extensions
src/data/runs.ts           the four example requests shown in "Ask in plain language"
src/composables/useTicker.ts   the interval counter
src/components/
  TopBar, SiteNav, HeroSection, HowSection
  HostIllustration         the animated Revit window (ribbon story, plan, MCP log), 22-beat cycle
  AskSection               example requests + step-by-step run, VideoOrSlot for the recording
  McpSection, ModelsSection, ParametersSection, WorkflowSection (ProseSection wrapper)
  OpenSourceSection        official extensions + "dotnet add package" copy button
  InstallSection, CtaSection, SiteFooter
```

## Content knobs

- **Version and links**: `src/data/site.ts`.
- **Screen recordings**: put the files under `public/videos/` and set `video` on the matching entry in `src/data/runs.ts` (for example `videos/doors-fire-rating.mp4`) or `site.mcpVideo`. While a slot is empty the page shows the placeholder with the expected path.
- **Hide the Revit illustration or the SDK row**: `site.showScreenshot`, `site.showDevelopers`.

## Toolchain notes

- TypeScript 7 ships the native compiler as `tsc`. `vue-tsc` does not support it yet, so `npm run typecheck` runs the native `tsc` over the `.ts` sources (data, composables, config) with a `*.vue` module shim in `src/env.d.ts`. Types inside `.vue` files are checked by the Vue language server in the editor and by Vite's SFC compiler at build time.
- The Broadsheet design system's serif face and component classes are not used by this page (the design overrides everything to monospace), so only its tokens were ported and no web font is loaded.
