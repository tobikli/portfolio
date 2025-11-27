<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core';

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
    <button
    @click="toggleDark()"
    class="fixed bottom-4 right-4 z-9999 inline-flex items-center justify-center w-12 h-12 rounded-full
           bg-gray-600/5 backdrop-blur-xs
           hover:scale-105 transform-gpu transition"
    >
    <i v-if="isDark" class="pi pi-sun"/>
    <i v-else class="pi pi-moon"/>
    </button>
</template>

<style>
button {
  padding-bottom: env(safe-area-inset-bottom, 0.5rem);
}
</style>
