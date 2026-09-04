<script setup lang="ts">
import ProseSection from '@/components/ProseSection.vue'
</script>

<template>
  <ProseSection id="how" kicker="Ask for a tool. Get a button." title="Anyone can build a Revit tool now. Including you.">
    <p class="prose">Open a chat and describe what you need. The AI does the rest over MCP — and you choose how much you want back.</p>
    <p class="prose"><span class="em">A real tool, with its own window.</span> “A panel that lists every door on level 2 with an empty fire rating, lets me pick some, and fills them in.” The AI writes the command and the interface — inputs, a table, a result — and AnalyseTool gives it a button and an icon on your ribbon. It opens in its own window or docks beside your model. It looks like it shipped with Revit, because it runs on the same rails our own tools do.</p>
    <p class="prose"><span class="em">Or a quick script.</span> No interface needed? Ask for just the command. It lands in the Scripts pane, one click to run, and you can pin it to the ribbon if it earns a place.</p>
    <p class="prose"><span class="em">Same chat, same loop for both.</span> It doesn’t work the first time? Say “look at it and fix it.” The AI reads its own code back, sees the exact compiler error, and tries again. Ask, run, refine — that’s the whole development process, and it happens in a conversation, not an IDE.</p>
    <p class="prose">Everything you make stays yours: a folder you can share with your team, drop into another project, or hand to a colleague who has never opened a code editor.</p>
  </ProseSection>
</template>
