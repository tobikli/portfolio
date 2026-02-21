<template>
  <div class="custom-cursor">
    <div
      class="custom-cursor__circle"
      ref="circleEl"
      :class="{ 'is-hover': isHovering }"
      :style="circleStyle"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, computed } from 'vue'

type TargetList = string[]

const props = withDefaults(
  defineProps<{
    targets?: TargetList
    circleColor?: string
    circleColorHover?: string
    hoverSize?: number
  }>(),
  {
    targets: () => [],
    circleColor: '#ffffff',
    circleColorHover: '#ffffff',
    hoverSize: 1.5,
  },
)

const circleEl = ref<HTMLDivElement | null>(null)
const isHovering = ref(false)

const circleStyle = computed(() => ({
  backgroundColor: isHovering.value ? props.circleColorHover : props.circleColor,
  borderColor: isHovering.value ? props.circleColorHover : props.circleColor,
}))

const targetSet = computed(() => new Set((props.targets ?? []).map((t) => t.toLowerCase())))

const isHoverMatch = (eventTarget: EventTarget | null): boolean => {
  const list = targetSet.value
  if (!list.size || !eventTarget) return false

  const hasMatch = (el: Element) => {
    const tag = el.tagName?.toLowerCase()
    if (tag && list.has(tag)) return true
    return Array.from(el.classList).some((cls) => list.has(cls.toLowerCase()))
  }

  let el = eventTarget as HTMLElement | null
  while (el && el !== document.documentElement) {
    if (el instanceof Element && hasMatch(el)) return true
    el = el.parentElement
  }

  return false
}

const handleMouseMove = (e: MouseEvent) => {
  const circle = circleEl.value
  if (!circle) return

  const hovered = isHoverMatch(e.target)
  isHovering.value = hovered

  const circleScale = hovered ? props.hoverSize : 1
  const rotation = hovered ? -18 : 0

  const circleX = e.clientX - circle.clientWidth / 2
  const circleY = e.clientY - circle.clientHeight / 2

  circle.style.transform = `translate(${circleX}px,${circleY}px) scale(${circleScale}) rotate(${rotation}deg)`
}

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('mousemove', handleMouseMove)
})
</script>

<style lang="scss" scoped>
$ease: cubic-bezier(0.23, 1, 0.32, 1);

.custom-cursor {
  position: fixed;
  inset: 0;
  cursor: none;
  pointer-events: none;
  z-index: 10000;
  mix-blend-mode: difference;
}
.custom-cursor__circle {
  position: fixed;
  cursor: none;
  top: 0;
  left: 0;
  width: 14px;
  height: 14px;
  border: 0 solid currentColor;
  border-radius: 50%;
  transform: translate(-100%, -100%);
  transform-origin: 20% 20%;
  transition:
    transform 0.25s $ease,
    clip-path 0.2s $ease,
    background-color 0.2s ease,
    border-radius 0.2s ease;
  z-index: inherit;
}

.custom-cursor__circle.is-hover {
  width: 20px;
  height: 20px;
  clip-path: polygon(50% 0%, 47% 6%, 43% 14%, 38% 24%, 32% 36%, 26% 50%, 20% 64%, 14% 78%, 10% 88%, 18% 90%, 28% 92%, 40% 93%, 52% 93%, 64% 92%, 74% 90%, 84% 88%, 80% 78%, 74% 66%, 67% 54%, 61% 42%, 56% 30%, 53% 18%, 51% 8%);
  border-radius: 7px;
}

@media (hover: none) {
  .custom-cursor {
    display: none !important;
  }
}
</style>

<style>
* {
  cursor: none;
}

.cursor-hover {
  cursor: none;
}
</style>
