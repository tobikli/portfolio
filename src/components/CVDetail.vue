<script setup lang="ts">
import { ref, onBeforeUnmount } from 'vue'
import { VuePDF, usePDF } from '@tato30/vue-pdf'
import { information } from '@/data/information'
const { pdf } = usePDF(information.cv)
const loading = ref(true)

onBeforeUnmount(() => {
  if (pdf.value) {
    try {
      pdf.value.destroy()
    } catch (e) {
      console.log(e)
    }
  }
})
</script>

<template>
  <div class="flex justify-center items-center">
    <div
      v-if="loading"
      class="w-8 h-8 m-20 border-4 border-gray-300 border-t-gray-700 rounded-full animate-spin"
    />

    <VuePDF v-show="!loading" :pdf="pdf" :fit-parent="true" @loaded="loading = false" />
  </div>
</template>
