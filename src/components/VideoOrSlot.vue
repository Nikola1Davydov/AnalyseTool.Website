<script setup lang="ts">
/**
 * A screen recording when `src` is set, otherwise a labelled placeholder
 * naming the file the recording is expected at.
 */
defineProps<{
  src: string
  slotPath: string
  label: string
  /** Draw the divider between the media and the panel body below it. */
  bordered?: boolean
}>()
</script>

<template>
  <video
    v-if="src"
    class="video"
    :class="{ bordered }"
    :src="src"
    autoplay
    muted
    loop
    playsinline
    controls
  ></video>
  <div v-else class="video-slot" :class="{ bordered }">
    <span class="video-slot-play" aria-hidden="true">▶</span>
    <span class="video-slot-text">{{ label }}</span>
    <span class="video-slot-path">{{ slotPath }}</span>
  </div>
</template>

<style scoped>
.bordered { border-bottom: 1px solid var(--color-neutral-800); }
</style>
