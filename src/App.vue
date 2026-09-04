<script setup lang="ts">
import { useTicker } from '@/composables/useTicker'
import { site } from '@/data/site'
import TopBar from '@/components/TopBar.vue'
import SiteNav from '@/components/SiteNav.vue'
import HeroSection from '@/components/HeroSection.vue'
import HowSection from '@/components/HowSection.vue'
import HostIllustration from '@/components/HostIllustration.vue'
import AskSection from '@/components/AskSection.vue'
import McpSection from '@/components/McpSection.vue'
import ModelsSection from '@/components/ModelsSection.vue'
import ParametersSection from '@/components/ParametersSection.vue'
import WorkflowSection from '@/components/WorkflowSection.vue'
import OpenSourceSection from '@/components/OpenSourceSection.vue'
import InstallSection from '@/components/InstallSection.vue'
import CtaSection from '@/components/CtaSection.vue'
import SiteFooter from '@/components/SiteFooter.vue'

// One clock for the whole page, as in the prototype: the ribbon story
// and the example-run steps both advance on it.
const tick = useTicker(620)
</script>

<template>
  <div class="page">
    <TopBar />
    <SiteNav />
    <main>
      <HeroSection />
      <HowSection />
      <HostIllustration v-if="site.showScreenshot" :tick="tick" />
      <McpSection />
      <AskSection :tick="tick" />
      <ModelsSection />
      <ParametersSection />
      <WorkflowSection />
      <OpenSourceSection />
      <InstallSection />
      <CtaSection />
    </main>
    <SiteFooter />
  </div>
</template>

<style scoped>
.page {
  max-width: 1060px;
  margin: 0 auto;
  padding: 0 clamp(16px, 4vw, 48px) 84px;
}
</style>
