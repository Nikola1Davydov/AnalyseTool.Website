<script setup lang="ts">
import { links } from '@/data/site'
import ProseSection from '@/components/ProseSection.vue'
</script>

<template>
  <ProseSection id="models" kicker="Local or cloud. Your call." title="Your model data stays where you decide.">
    <p class="prose">Run AI on your own machine with <a :href="links.ollama" target="_blank" rel="noopener">Ollama</a> or LM Studio — nothing leaves your workstation, nothing is billed. Or point AnalyseTool at any OpenAI-compatible API: OpenAI, OpenRouter, Mistral, your company’s own endpoint. Keys are stored encrypted with Windows DPAPI, on your machine, tied to your account.</p>
    <p class="prose">Switch models in one place. The tools you built don’t care which brain is behind them.</p>
  </ProseSection>
</template>
