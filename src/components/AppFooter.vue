<script setup lang="ts">
import { information } from '@/data/information'
import { config } from '@/data/config';
import ScrollVelocity from '@/ui-components/ScrollVelocity.vue'
const year = new Date().getFullYear()
const openGitHub = () => {
  window.location.replace(config.github);
}
</script>

<template>

  <div class="flex justify-center text-center">
    <div class="flex items-center divide-x m-2 border">
      <div class="px-2 py-1 flex items-center space-x-1 hover-cursor hover:bg-black hover:text-white hover:dark:bg-white hover:dark:text-black" @click="openGitHub">
        <span class="text-xs">This page on</span>
        <font-awesome-icon :icon="'fa-brands fa-github'" size="xs" class="cursor-hover" />
      </div>
      <div class="px-2 flex items-center space-x-1">
        <span class="text-xs">{{ config.commit }}</span>
      </div>
    </div>
  </div>

  <ScrollVelocity
    :texts="[`| Copyright ${year} ${information.name_short}`]"
    :velocity="6"
    :damping="10"
    :stiffness="500"
    :velocity-mapping="{ input: [0, 1000], output: [0, 5] }"
    class-name="text-sm font-light pb-2"
    parallax-class-name="custom-parallax"
    scroller-class-name="custom-scroller"
  />
</template>
