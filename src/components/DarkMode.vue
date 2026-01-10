<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark({
  storageKey: 'vueuse-color-scheme',
  valueDark: 'dark',
  valueLight: 'light',
  initialValue: 'dark',
})
const toggleDark = useToggle(isDark)
</script>

<template>
  <div class="fixed bottom-4 right-4 z-9999 pb-safearea">
    <button
      @click="toggleDark()"
      class="inline-flex items-center rounded-full justify-center w-10 h-10 bg-gray-600/5 backdrop-blur-xs hover:scale-105 hover:cursor-pointer transform-gpu transition"
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
