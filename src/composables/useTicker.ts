import { onMounted, onUnmounted, ref, type Ref } from 'vue'

/**
 * A monotonically increasing counter that advances every `intervalMs`
 * while the component is mounted. Consumers derive their own cycles
 * from it (`tick % 22` for the ribbon story, a step counter for runs),
 * so the whole page moves on one clock as the prototype did.
 */
export function useTicker(intervalMs: number): Ref<number> {
  const tick = ref(0)
  let handle: ReturnType<typeof setInterval> | undefined

  onMounted(() => {
    handle = setInterval(() => {
      tick.value += 1
    }, intervalMs)
  })
  onUnmounted(() => {
    if (handle !== undefined) clearInterval(handle)
  })

  return tick
}
