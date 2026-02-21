<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import { nextTick } from 'vue'

const isDark = useDark({
  storageKey: 'vueuse-color-scheme',
  valueDark: 'dark',
  valueLight: 'light',
  initialValue: 'dark',
})
const toggleDark = useToggle(isDark)

const toggleTheme = async () => {
  toggleDark()

  // iOS Safari only recalculates the status bar color when a full-screen
  // compositing layer is inserted/removed (exactly what the popup overlay does).
  // Briefly inject a transparent fixed overlay to force that recalculation.
  await nextTick()
  const overlay = document.createElement('div')
  overlay.style.cssText =
    'position:fixed;inset:0;z-index:99999;pointer-events:none;backdrop-filter:blur(0px);-webkit-backdrop-filter:blur(0px)'
  document.body.style.overflow = 'hidden'
  document.body.appendChild(overlay)
  await new Promise((r) => requestAnimationFrame(r))
  await new Promise((r) => requestAnimationFrame(r))
  document.body.removeChild(overlay)
  document.body.style.overflow = ''
}
</script>

<template>
  <div class="fixed bottom-4 right-4 z-9000 pb-safearea">
    <button
      @click="toggleTheme"
      class="inline-flex items-center rounded-full justify-center w-10 h-10 bg-gray-600/5 backdrop-blur-xs hover:scale-105 hover:cursor-pointer transform-gpu transition cursor-hover"
    >
      <i v-if="isDark" class="pi pi-sun" />
      <i v-else class="pi pi-moon" />
    </button>
  </div>
</template>

<style>
.pb-safearea {
  padding-bottom: env(safe-area-inset-bottom, 0);
}
</style>
