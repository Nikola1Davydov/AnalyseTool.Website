<script setup lang="ts">
import { links } from '@/data/site'
</script>

<template>
  <section id="install" class="install">
    <p class="kicker install-kicker">Installation</p>
    <ol class="steps">
      <li class="step">
        <span class="n">1.</span>
        <span class="text">Download the latest installer from <a :href="links.latestRelease" target="_blank" rel="noopener">Releases</a> — pick <span class="em">SingleUser</span> (current user, no admin) or <span class="em">MultiUser</span> (all users, needs admin).</span>
      </li>
      <li class="step">
        <span class="n">2.</span>
        <span class="text">Switching between the two? Uninstall the previous AnalyseTool first, or you end up with two copies and a duplicate ribbon.</span>
      </li>
      <li class="step">
        <span class="n">3.</span>
        <span class="text">Close Revit, run the installer. SmartScreen may warn “unknown publisher” — the build isn’t code-signed yet — so choose More info, then Run anyway.</span>
      </li>
      <li class="step">
        <span class="n">4.</span>
        <span class="text">Start Revit and open the <span class="em">AnalyseTool</span> ribbon tab.</span>
      </li>
    </ol>
    <p class="requirements">Requires Revit 2025, 2026 or 2027 on Windows, plus the Microsoft Edge WebView2 Runtime — present on most up-to-date Windows installations, and the plugin prompts with a download link when it is missing. Blank window? <a :href="links.webview2" target="_blank" rel="noopener">Install WebView2</a> and restart Revit. Logs: <span class="em">%LOCALAPPDATA%\AnalyseTool\logs</span>.</p>
  </section>
</template>

<style scoped>
.install { padding: 0 0 56px; }
.install-kicker { margin-bottom: 20px; }
.steps { list-style: none; margin: 0; padding: 0; max-width: 74ch; }
.step { display: flex; gap: 12px; padding: 6px 0; }
.n { color: var(--color-accent-300); }
.text { color: var(--color-neutral-300); }
.requirements { margin: 20px 0 0; max-width: 74ch; color: var(--color-neutral-400); }
</style>
