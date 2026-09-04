<script setup lang="ts">
import { links } from '@/data/site'
</script>

<template>
  <section class="cta">
    <h2 class="section-title">Start with a question.</h2>
    <p class="prose">Install AnalyseTool, open a chat, and ask for the tool you’ve always wanted.</p>
    <div class="actions cta-actions">
      <a class="btn-outline" :href="links.latestRelease" target="_blank" rel="noopener">Download</a>
      <a class="btn-quiet" :href="links.github" target="_blank" rel="noopener">GitHub</a>
      <a class="btn-quiet" :href="links.wiki" target="_blank" rel="noopener">Get started guide</a>
    </div>
  </section>
</template>

<style scoped>
.cta { padding: 42px 0; border-top: 1px solid var(--color-neutral-800); }
.cta-actions { margin-top: 14px; }
</style>
