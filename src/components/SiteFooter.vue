<script setup lang="ts">
import { links } from '@/data/site'

const footerLinks = [
  { label: 'GitHub', href: links.github },
  { label: 'Releases', href: links.releases },
  { label: 'Wiki', href: links.wiki },
  { label: 'Issues', href: links.issues },
  { label: 'YouTube', href: links.youtube },
] as const
</script>

<template>
  <footer class="footer">
    <span>AnalyseTool — Apache 2.0; the SDK is MIT. Built by Nikolai Davydov.</span>
    <span class="links">
      <template v-for="(l, i) in footerLinks" :key="l.label">
        <span v-if="i > 0" aria-hidden="true">·</span>
        <a :href="l.href" target="_blank" rel="noopener">{{ l.label }}</a>
      </template>
    </span>
  </footer>
</template>

<style scoped>
.footer {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 6px 24px;
  padding: 14px 0 0;
  border-top: 1px solid var(--color-neutral-800);
  font-size: 12px;
  color: var(--color-neutral-500);
}
.links { display: flex; gap: 6px; flex-wrap: wrap; }
</style>
