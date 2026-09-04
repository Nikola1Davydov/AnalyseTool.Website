<script setup lang="ts">
import { site } from '@/data/site'
import ProseSection from '@/components/ProseSection.vue'
import VideoOrSlot from '@/components/VideoOrSlot.vue'
</script>

<template>
  <ProseSection id="mcp" kicker="Works with the AI you already pay for" title="MCP: plug your agent into Revit.">
    <p class="prose">AnalyseTool is an MCP server. Connect Claude Desktop, Claude Code, or any MCP client, and your agent can read your model, analyze your parameters, and — when you allow it — change things.</p>
    <p class="prose">You bring your own subscription. There’s no AnalyseTool token bill, no middleman, no second account. The agent you use for everything else now understands your Revit model.</p>
    <p class="prose">Every command tells the agent what it costs and whether it writes, so it reads before it acts. Writes happen inside Revit transactions, Revit’s own warnings are reported back instead of silently dismissed, and irreversible operations are flagged as such. Placing a family waits for your click. The agent does the work; you keep the last word.</p>
    <div class="frame mcp-frame">
      <p class="frame-head"><span>Claude Desktop → AnalyseTool over MCP</span><span>your subscription</span></p>
      <VideoOrSlot :src="site.mcpVideo" :slot-path="site.mcpVideoSlot" label="Screen recording — an agent driving Revit over MCP" />
    </div>
  </ProseSection>
</template>

<style scoped>
.mcp-frame { margin: 20px 0 0; }
</style>
