<template>
  <div class="custom-cursor">
    <div class="custom-cursor__circle" ref="circleEl"></div>
    <div class="custom-cursor__dot" ref="dotEl"></div>
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
    dotColor?: string
    dotColorHover?: string
    hoverSize?: number
  }>(),
  {
    targets: () => [],
    circleColor: '#2f2f2f',
    circleColorHover: '#2f2f2f',
    dotColor: '#2f2f2f',
    dotColorHover: '#2f2f2f',
    hoverSize: 1.8,
  },
)

const circleEl = ref<HTMLDivElement | null>(null)
const dotEl = ref<HTMLDivElement | null>(null)

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
  const dot = dotEl.value
  if (!circle || !dot) return

  const hovered = isHoverMatch(e.target)
  const scale = hovered ? props.hoverSize : 1

  const circleX = e.clientX - circle.clientWidth / 2
  const circleY = e.clientY - circle.clientHeight / 2
  const dotX = e.clientX - dot.clientWidth / 2
  const dotY = e.clientY - dot.clientHeight / 2

  circle.style.transform = `translate(${circleX}px,${circleY}px) scale(${scale})`
  dot.style.transform = `translate(${dotX}px,${dotY}px)`
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
  width: 20px;
  height: 20px;
  border: 1px solid #fff;
  border-radius: 50%;
  transform: translate(-100%, -100%);
  transition: transform 0.4s $ease;
  z-index: inherit;
}

.custom-cursor__dot {
  position: fixed;
  cursor: none;
  top: 1px;
  left: 1px;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: #fff;
  transform: translate(-100%, -100%);
  transition: transform 0.2s $ease;
  z-index: inherit;
}

@media (hover: none) {
  .custom-cursor {
    display: none !important;
  }
}
</style>

<style>

* { cursor: none; }

.cursor-hover {
  cursor: none;
}

</style>
