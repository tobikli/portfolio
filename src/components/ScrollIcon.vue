<script setup lang="ts">
import { motion } from 'motion-v'

const scrollToNextAnchor = () => {
  location.hash = '#about'
}
</script>

<template>
  <div class="z-50" aria-hidden="true">
    <motion.button
      @click="scrollToNextAnchor"
      class="opacity-80 cursor-hover"
      title="More Information"
      :animate="{ y: [0, -8, 0] }"
      :transition="{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      }"
    >
      <i class="text-xl pi pi-chevron-down" />
    </motion.button>
  </div>
</template>

<style>
.pb-safearea {
  padding-bottom: env(safe-area-inset-bottom, 0);
}
</style>
