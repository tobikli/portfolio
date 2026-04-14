<script setup lang="ts">
import router from '@/router'
import { legal } from '@/data/legal'
const returnHome = () => {
  router.push('/')
}
</script>

<template>
  <div class="w-full flex justify-center">
    <div class="w-full max-w-4xl px-4">
      <header class="text-xl p-3">
        <div class="flex gap-3">
          <button
            class="px-2 py-0.5 text-sm hover:bg-black hover:text-white hover:dark:bg-white hover:dark:text-black cursor-hover"
            @click="returnHome"
            aria-label="Go back"
          >
            <i class="pi pi-arrow-left"></i>
          </button>
          <h3>Legal Notice & Privacy Policy</h3>
        </div>
        <hr class="my-3" />
      </header>
      <p v-html="legal" />
    </div>
  </div>
</template>
