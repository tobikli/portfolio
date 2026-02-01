<script setup lang="ts">
import { showPopup } from '@/composables/usePopup'

/* eslint-disable  @typescript-eslint/no-explicit-any */

defineProps<{
  text: string
  title: string
  component: any
}>()
</script>

<template>
  <button
    class="group relative text-md overflow-hidden hover:cursor-pointer bg-black/3 dark:bg-white/3 p-3 m-2 min-w-40 transition-all hover:text-white hover:dark:text-black"
    @click="
      showPopup({
        title: title,
        component: component,
      })
    "
  >
    <span class="relative z-10">{{ text }}</span>

    <span
      class="absolute inset-0 bg-black dark:bg-white -translate-x-[110%] group-hover:translate-x-0 transition-transform duration-300 ease-in-out"
    ></span>
  </button>
</template>
