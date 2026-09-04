<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { runs } from '@/data/runs'
import VideoOrSlot from '@/components/VideoOrSlot.vue'

/**
 * "Ask in plain language": pick an example request on the left and
 * watch its steps light up one per beat of the page clock on the right.
 */
const props = defineProps<{ tick: number }>()

const runIndex = ref(0)
const shown = ref(0)

const run = computed(() => runs[runIndex.value] ?? runs[0])
const total = computed(() => run.value.steps.length + 1)

watch(
  () => props.tick,
  () => {
    if (shown.value < total.value) shown.value += 1
  },
)

function select(i: number): void {
  if (i === runIndex.value) return
  runIndex.value = i
  shown.value = 0
}

const num = (i: number): string => String(i + 1).padStart(2, '0')
</script>

<template>
  <section id="ai" class="ask">
    <p class="kicker ask-kicker">Ask in plain language — pick a request and watch the run</p>

    <div class="grid">
      <div class="prompts">
        <p class="prompts-label" id="example-requests">Example requests</p>
        <div role="group" aria-labelledby="example-requests">
          <button
            v-for="(r, i) in runs"
            :key="r.title"
            type="button"
            class="prompt"
            :class="{ active: i === runIndex }"
            :aria-pressed="i === runIndex"
            @click="select(i)"
          >
            <span class="num">{{ num(i) }}</span>
            <span>{{ r.title }}</span>
          </button>
        </div>
      </div>

      <div class="frame run-frame">
        <p class="frame-head"><span>AnalyseTool · Canvas</span><span>{{ run.model }}</span></p>
        <VideoOrSlot :src="run.video" :slot-path="run.videoSlot" label="Screen recording of this request" bordered />
        <div class="run" aria-live="polite">
          <p class="who-row"><span class="who">You asked</span></p>
          <p class="asked">{{ run.prompt }}</p>
          <p class="intro">{{ run.intro }}</p>
          <ol class="steps">
            <li v-for="(s, i) in run.steps" :key="s" class="step" :class="{ pending: shown <= i }">
              <span class="n">[{{ i + 1 }}]</span>
              <span>{{ s }}</span>
            </li>
          </ol>
          <p class="done" :class="{ pending: shown <= run.steps.length }">
            <span class="who">Done</span>
            <span class="done-text">{{ run.done }}</span>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.ask { padding: 0 0 56px; }
.ask-kicker { margin-bottom: 20px; }
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(290px, 1fr));
  gap: 28px clamp(20px, 3vw, 42px);
  align-items: start;
}
.prompts,
.run-frame { min-width: 0; }
.prompts-label { margin: 0 0 10px; font-size: 12px; color: var(--color-neutral-500); }

.prompt {
  display: flex;
  align-items: baseline;
  gap: 10px;
  width: 100%;
  text-align: left;
  background: transparent;
  color: var(--color-neutral-400);
  border: 0;
  border-left: 2px solid var(--color-neutral-800);
  padding: 8px 12px;
  margin-bottom: 2px;
  cursor: pointer;
}
.prompt:hover { background: var(--color-neutral-900); }
.prompt.active {
  background: var(--color-neutral-900);
  color: var(--color-bg);
  border-left-color: var(--color-accent-300);
}
.num { color: var(--color-neutral-800); }
.prompt.active .num { color: var(--color-accent-300); }

.run { padding: 14px; }
.who-row { display: flex; gap: 10px; }
.who { color: var(--color-accent-2-400); white-space: nowrap; flex: 0 0 auto; }
.asked { margin: 2px 0 0; color: var(--color-bg); }
.intro { margin: 14px 0 0; color: var(--color-neutral-400); }
.steps { list-style: none; margin: 10px 0 0; padding: 0; }
.step { display: flex; align-items: baseline; gap: 10px; padding: 2px 0; }
.n { color: var(--color-accent-300); }
.done { display: flex; gap: 10px; margin: 14px 0 0; }
.done-text { margin-left: 10px; }
.pending { opacity: 0.15; }
</style>
