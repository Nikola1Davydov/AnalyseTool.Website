<script setup lang="ts">
import { site } from '@/data/site'
import { useLatestVersion } from '@/composables/useLatestVersion'

const version = useLatestVersion()
</script>

<template>
  <header class="topbar">
    <span>AnalyseTool <span class="version">{{ version }}</span> — {{ site.revitVersions }}</span>
    <span>Windows · Apache 2.0 (SDK: MIT)</span>
  </header>
</template>

<style scoped>
.topbar {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 6px 24px;
  padding: 14px 0;
  font-size: 12px;
  letter-spacing: 0.06em;
  color: var(--color-neutral-400);
  border-bottom: 1px solid var(--color-neutral-800);
}
.version { color: var(--color-accent-300); }
</style>
