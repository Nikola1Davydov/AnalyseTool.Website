<script setup lang="ts">
import { onUnmounted, ref } from 'vue'
import { officialExtensions, site } from '@/data/site'
import ProseSection from '@/components/ProseSection.vue'

const copied = ref(false)
let resetTimer: ReturnType<typeof setTimeout> | undefined

async function copySdk(): Promise<void> {
  try {
    await navigator.clipboard?.writeText(site.sdkCommand)
  } catch {
    // Clipboard access can be denied; the label still confirms the intent,
    // and the command stays selectable right next to the button.
  }
  copied.value = true
  clearTimeout(resetTimer)
  resetTimer = setTimeout(() => {
    copied.value = false
  }, 1600)
}

onUnmounted(() => clearTimeout(resetTimer))
</script>

<template>
  <ProseSection id="open" kicker="Open, all the way down" title="Free. Apache-2.0. Extensible by design.">
    <p class="prose">The core is open source. The SDK is on NuGet. Our own Family Manager runs as an extension on exactly the rails that are open to you — if we could build it that way, so can you. Browse the catalog, install from a GitHub repository in one click, or publish your own with a git tag.</p>
    <p class="prose">For developers who want more than scripts: the same command you write once runs from the UI, from an agent over MCP, and from your own panels. Write it once. Call it everywhere.</p>

    <p class="kicker ext-kicker">Official extensions</p>
    <div class="extensions">
      <a v-for="x in officialExtensions" :key="x.name" class="ext" :href="x.href" target="_blank" rel="noopener">
        <span class="ext-name">{{ x.name }}</span>
        <span class="ext-note">{{ x.note }}</span>
      </a>
    </div>

    <div v-if="site.showDevelopers" class="sdk">
      <code class="sdk-cmd">{{ site.sdkCommand }}</code>
      <button type="button" class="sdk-copy" @click="copySdk">{{ copied ? 'Copied' : 'Copy' }}</button>
    </div>
  </ProseSection>
</template>

<style scoped>
.ext-kicker { margin: 20px 0 8px; }
.extensions {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 2px;
  margin: 0 0 20px;
}
.ext {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 10px 12px;
  border: 1px solid var(--color-neutral-800);
  color: var(--color-neutral-300);
}
.ext:hover { border-color: var(--color-accent-300); color: var(--color-neutral-300); text-decoration: none; }
.ext-name { color: var(--color-accent-300); }
.ext-note { font-size: 12.5px; color: var(--color-neutral-400); }

.sdk { display: flex; align-items: stretch; flex-wrap: wrap; gap: 10px; margin-top: 6px; }
.sdk-cmd {
  font: inherit;
  padding: 9px 14px;
  border: 1px solid var(--color-neutral-800);
  background: var(--color-neutral-900);
  color: var(--color-bg);
}
.sdk-copy {
  padding: 9px 14px;
  background: none;
  border: 1px solid var(--color-neutral-700);
  color: var(--color-neutral-300);
  cursor: pointer;
}
.sdk-copy:hover { border-color: var(--color-accent-300); color: var(--color-accent-300); }
</style>
