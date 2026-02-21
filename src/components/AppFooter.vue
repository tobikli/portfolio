<script setup lang="ts">
import { information } from '@/data/information'
import { config } from '@/data/config'
const year = new Date().getFullYear()
const openRepo = () => {
  window.location.href = config.github
}
const openBranch = () => {
  window.location.href = `${config.github}/tree/${config.branch}`
}
const openCommit = () => {
  window.location.href = `${config.github}/commit/${config.commit}`
}
</script>

<template>
  <div class="flex justify-center text-center mb-2">
    <div
      class="inline-grid grid-flow-row auto-rows-max items-center justify-items-center divide-y divide-black/10 dark:divide-white/10 sm:divide-y-0 sm:grid-flow-col sm:auto-cols-max"
    >
      <div
        class="flex items-center justify-center divide-x divide-black/10 dark:divide-white/10 sm:divide-x-0 sm:contents"
      >
        <div
          class="px-2 py-1 flex items-center hover:cursor-pointer justify-center space-x-1 hover-cursor cursor-hover hover:bg-black hover:text-white hover:dark:bg-white hover:dark:text-black"
          @click="openRepo"
        >
          <span class="text-xs">This page on</span>
          <font-awesome-icon :icon="'fa-brands fa-github'" size="xs" class="cursor-hover" />
        </div>
        <div
          class="px-2 py-1 flex items-center hover:cursor-pointer justify-center space-x-1 hover-cursor cursor-hover hover:bg-black hover:text-white hover:dark:bg-white hover:dark:text-black sm:border-l sm:border-black/10 sm:dark:border-white/10"
          @click="openBranch"
        >
          <span class="text-xs">{{ config.branch }}</span>
        </div>
        <div
          class="px-2 py-1 flex items-center hover:cursor-pointer justify-center space-x-1 hover-cursor cursor-hover hover:bg-black hover:text-white hover:dark:bg-white hover:dark:text-black sm:border-l sm:border-black/10 sm:dark:border-white/10"
          @click="openCommit"
        >
          <span class="text-xs">{{ config.commit }}</span>
        </div>
      </div>
      <div
        class="px-2 py-1 flex items-center justify-center space-x-1 sm:border-l sm:border-black/10 sm:dark:border-white/10"
      >
        <span class="text-xs">{{ `Copyright © ${year} ${information.name}` }}</span>
      </div>
    </div>
  </div>
</template>
