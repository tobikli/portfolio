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
  <div class="flex justify-center text-center">
    <div class="flex items-center divide-x m-2">
      <div
        class="px-2 py-1 flex items-center space-x-1 hover-cursor cursor-hover hover:bg-black hover:text-white hover:dark:bg-white hover:dark:text-black"
        @click="openRepo"
      >
        <span class="text-xs">This page on</span>
        <font-awesome-icon :icon="'fa-brands fa-github'" size="xs" class="cursor-hover" />
      </div>
      <div
        class="px-2 py-1 flex items-center space-x-1 hover-cursor cursor-hover hover:bg-black hover:text-white hover:dark:bg-white hover:dark:text-black"
        @click="openBranch"
      >
        <span class="text-xs">{{ config.branch }}</span>
      </div>
      <div
        class="px-2 py-1 flex items-center space-x-1 hover-cursor cursor-hover hover:bg-black hover:text-white hover:dark:bg-white hover:dark:text-black"
        @click="openCommit"
      >
        <span class="text-xs">{{ config.commit }}</span>
      </div>
      <div class="px-2 py-1 flex items-center space-x-1">
        <span class="text-xs">{{ `Copyright © ${year} ${information.name}` }}</span>
      </div>
      <div class="px-2 py-1 flex items-center space-x-1">
        <span class="text-xs">Made with ♡ and Vue.js</span>
      </div>
    </div>
  </div>
</template>
