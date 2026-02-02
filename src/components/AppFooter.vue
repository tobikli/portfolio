<script setup lang="ts">
import { information } from '@/data/information'
import ScrollVelocity from '@/ui-components/ScrollVelocity.vue'
const year = new Date().getFullYear()
</script>

<template>
  <ScrollVelocity
    :texts="[`| Copyright ${year} ${information.name_short}`, 'Made with ♡ and vue.js |']"
    :velocity="6"
    :damping="10"
    :stiffness="500"
    :velocity-mapping="{ input: [0, 1000], output: [0, 5] }"
    class-name="text-sm font-light"
    parallax-class-name="custom-parallax"
    scroller-class-name="custom-scroller"
  />
</template>
