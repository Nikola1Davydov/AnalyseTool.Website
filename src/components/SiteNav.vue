<script setup lang="ts">
import { navLinks } from '@/data/site'
</script>

<template>
  <nav class="nav" aria-label="Site">
    <a
      v-for="link in navLinks"
      :key="link.href"
      :href="link.href"
      :target="link.external ? '_blank' : undefined"
      :rel="link.external ? 'noopener' : undefined"
    >{{ link.label }}</a>
  </nav>
</template>

<style scoped>
.nav {
  display: flex;
  flex-wrap: wrap;
  gap: 6px 20px;
  padding: 14px 0;
  font-size: 12.5px;
  letter-spacing: 0.04em;
  color: var(--color-neutral-400);
}
</style>
