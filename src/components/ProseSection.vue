<script setup lang="ts">
/** A kicker, a title and whatever prose the caller slots in. */
defineProps<{
  id: string
  kicker: string
  title: string
}>()
</script>

<template>
  <section :id="id" class="prose-section">
    <p class="kicker">{{ kicker }}</p>
    <h2 class="section-title">{{ title }}</h2>
    <slot />
  </section>
</template>

<style scoped>
.prose-section { padding: 0 0 42px; }
</style>
