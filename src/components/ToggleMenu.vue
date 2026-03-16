<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import { nextTick, onMounted, ref } from 'vue'
import bg from '@/assets/bg.mp3'

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
var audio = new Audio(bg)
onMounted(() => {
  audio.volume = 0.2
  audio.loop = true
  audio.autoplay = true
  audio.play()
})
const isMusicOn = ref(true)
const toggleMusic = () => {
  isMusicOn.value = !isMusicOn.value
  if (isMusicOn.value) {
    audio.play()
  } else {
    audio.pause()
  }
}

</script>

<template>
  <div class="fixed bottom-4 right-4 z-9000 pb-safearea rounded-full hover:bg-gray-600/10  bg-gray-600/5 backdrop-blur-xs grid grid-cols-1">
    <button
      @click="toggleMusic"
      class="inline-flex items-center rounded-full justify-center w-10 h-10 hover:scale-105 transform-gpu transition cursor-hover"
    >
      <span class="icon-cross-wrap">
          <i class="pi pi-volume-up" />
          <Transition name="strike">
            <span v-if="!isMusicOn" class="strike-line" />
          </Transition>
        </span>
    </button>
    <div class="w-6 h-px bg-gray-500/40 mx-auto" />
    <button
      @click="toggleTheme"
      class="inline-flex items-center rounded-full justify-center w-10 h-10 hover:scale-105 transform-gpu transition cursor-hover"
    >
      <Transition name="icon-cross" mode="out-in">
        <span :key="isDark ? 'sun' : 'moon'" class="icon-cross-wrap">
          <i :class="isDark ? 'pi pi-sun' : 'pi pi-moon'" />
        </span>
      </Transition>
    </button>
  </div>
</template>

<style>
.pb-safearea {
  padding-bottom: env(safe-area-inset-bottom, 0);
}

.icon-cross-wrap {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.icon-cross-enter-active,
.icon-cross-leave-active {
  transition: opacity 0.2s ease;
}
.icon-cross-enter-from,
.icon-cross-leave-to {
  opacity: 0;
}

.strike-line {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top right,
    transparent calc(50% - 0.7px),
    currentColor calc(50% - 0.7px),
    currentColor calc(50% + 0.7px),
    transparent calc(50% + 0.7px)
  );
}

.strike-enter-active {
  animation: strike-in 0.2s ease forwards;
}
.strike-leave-active {
  animation: strike-in 0.2s ease reverse forwards;
}

@keyframes strike-in {
  from { clip-path: inset(0 100% 0 0); }
  to   { clip-path: inset(0 0% 0 0); }
}
</style>
