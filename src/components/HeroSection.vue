<script setup lang="ts">
import { links } from '@/data/site'
</script>

<template>
  <section class="hero">
    <h1 class="title">Your Revit. Your AI. Your buttons.<span class="cursor" aria-hidden="true"></span></h1>
    <p class="lede">AnalyseTool turns Revit into something you can extend by asking. Describe the tool you need — the AI builds it, interface and all, and it shows up as a button on your ribbon. No Visual Studio, no build step, no developer.</p>
    <div class="actions cta">
      <a class="btn-outline" :href="links.latestRelease" target="_blank" rel="noopener">Download — free</a>
      <a class="btn-quiet" href="#how">See how it works</a>
    </div>
    <p class="note">Free · open source · Revit 2025–2027</p>
  </section>
</template>

<style scoped>
.hero { padding: 56px 0 42px; }
.title {
  font-size: clamp(24px, 3.4vw, 40px);
  line-height: 1.3;
  letter-spacing: -0.02em;
  max-width: 36ch;
}
.cursor {
  display: inline-block;
  width: 0.5em;
  height: 0.95em;
  margin-left: 0.18em;
  background: var(--color-accent-2-400);
  vertical-align: -0.1em;
  animation: blink 1.1s steps(1) infinite;
}
@media (prefers-reduced-motion: reduce) {
  .cursor { animation: none; }
}
.lede { margin: 28px 0 0; max-width: 70ch; color: var(--color-neutral-300); }
.cta { margin-top: 28px; }
.note { margin: 20px 0 0; font-size: 12.5px; color: var(--color-neutral-500); }
</style>
