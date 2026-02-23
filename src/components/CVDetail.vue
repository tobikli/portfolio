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

const downloadPdf = () => {
  const linkEl = document.createElement('a')
  linkEl.href = information.cv
  linkEl.download = information.cv.split('/').pop() || 'certificate.pdf'
  linkEl.target = '_blank'
  linkEl.rel = 'noopener noreferrer'
  linkEl.click()
}
</script>

<template>
  <div class="flex justify-center items-center">
    <div
      v-if="loading"
      class="w-8 h-8 m-20 border-4 border-gray-300 border-t-gray-700 rounded-full animate-spin"
    />
    <VuePDF v-show="!loading" :pdf="pdf" :fit-parent="true" @loaded="loading = false" />
  </div>
  <div class="flex justify-center mt-5">
    <button
      class="border p-2 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
      @click="downloadPdf"
    >
      Download
    </button>
  </div>
</template>
