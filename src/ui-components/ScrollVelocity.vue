<template>
  <section>
    <div
      v-for="(text, index) in texts"
      :key="index"
      ref="containerRef"
      :class="`${parallaxClassName} relative overflow-hidden`"
      :style="parallaxStyle"
    >
      <div
        ref="scrollerRef"
        :class="`${scrollerClassName} flex whitespace-nowrap text-center font-sans text-4xl font-bold tracking-[-0.02em] drop-shadow md:text-[5rem] md:leading-[5rem]`"
        :style="{ transform: `translateX(${scrollTransforms[index] || '0px'})`, ...scrollerStyle }"
      >
        <span
          v-for="spanIndex in calculatedCopies[index] || 15"
          :key="spanIndex"
          :class="`flex-shrink-0 ${className}`"
          :ref="spanIndex === 1 ? (el) => setCopyRef(el, index) : undefined"
        >
          {{ text }}&nbsp;
        </span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick, type ComponentPublicInstance } from 'vue'

interface ScrollVelocityProps {
  scrollContainerRef?: HTMLElement | null
  texts?: string[]
  velocity?: number
  className?: string
  parallaxClassName?: string
  scrollerClassName?: string
  parallaxStyle?: Record<string, string | number>
  scrollerStyle?: Record<string, string | number>
}

const props = withDefaults(defineProps<ScrollVelocityProps>(), {
  texts: () => [],
  velocity: 100,
  className: '',
  parallaxClassName: '',
  scrollerClassName: '',
  parallaxStyle: () => ({}),
  scrollerStyle: () => ({}),
})

const containerRef = ref<HTMLDivElement[]>([])
const scrollerRef = ref<HTMLDivElement[]>([])
const copyRefs = ref<HTMLSpanElement[]>([])

const baseX = ref<number[]>([])
const copyWidths = ref<number[]>([])
const calculatedCopies = ref<number[]>([])

let rafId: number | null = null
let lastTime = 0
let resizeTimeout: number | null = null

const setCopyRef = (el: Element | ComponentPublicInstance | null, index: number) => {
  if (el && el instanceof HTMLSpanElement) {
    copyRefs.value[index] = el
  }
}

const updateWidths = () => {
  props.texts.forEach((_, index) => {
    if (copyRefs.value[index] && containerRef.value[index]) {
      const singleCopyWidth = copyRefs.value[index].offsetWidth
      const containerWidth = containerRef.value[index].offsetWidth
      const viewportWidth = window.innerWidth

      const effectiveWidth = Math.max(containerWidth, viewportWidth)
      const minCopies = Math.ceil((effectiveWidth * 2.5) / singleCopyWidth)
      const optimalCopies = Math.max(minCopies, 8)

      copyWidths.value[index] = singleCopyWidth
      calculatedCopies.value[index] = optimalCopies
    }
  })
}

const debouncedUpdateWidths = () => {
  if (resizeTimeout) {
    clearTimeout(resizeTimeout)
  }
  resizeTimeout = window.setTimeout(() => {
    updateWidths()
    resizeTimeout = null
  }, 150)
}

const wrap = (min: number, max: number, v: number): number => {
  const range = max - min
  if (range === 0) return min
  const mod = (((v - min) % range) + range) % range
  return mod + min
}

const scrollTransforms = computed(() => {
  return props.texts.map((_, index) => {
    const singleWidth = copyWidths.value[index]
    if (singleWidth === undefined || singleWidth === 0) return '0px'
    return `${wrap(-singleWidth, 0, baseX.value[index] || 0)}px`
  })
})

const animate = (currentTime: number) => {
  if (lastTime === 0) lastTime = currentTime
  const delta = currentTime - lastTime
  lastTime = currentTime

  props.texts.forEach((_, index) => {
    const baseVelocity = index % 2 !== 0 ? -props.velocity : props.velocity
    const moveBy = baseVelocity * (delta / 1000)
    baseX.value[index] = (baseX.value[index] || 0) + moveBy
  })

  rafId = requestAnimationFrame(animate)
}

onMounted(async () => {
  await nextTick()

  baseX.value = new Array(props.texts.length).fill(0)
  copyWidths.value = new Array(props.texts.length).fill(0)
  calculatedCopies.value = new Array(props.texts.length).fill(15)

  setTimeout(() => {
    updateWidths()
  }, 100)

  updateWidths()

  rafId = requestAnimationFrame(animate)

  window.addEventListener('resize', debouncedUpdateWidths, { passive: true })
})

onUnmounted(() => {
  if (rafId) {
    cancelAnimationFrame(rafId)
  }
  if (resizeTimeout) {
    clearTimeout(resizeTimeout)
  }
  window.removeEventListener('resize', debouncedUpdateWidths)
})
</script>
