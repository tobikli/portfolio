<script setup lang="ts">
import { VuePDF, usePDF } from '@tato30/vue-pdf'
import { showPopup } from '@/composables/usePopup'
import { ref, onBeforeUnmount } from 'vue'
import CertificatesOverview from './CertificatesOverview.vue'

const props = defineProps<{
  issuer: string
  pdf: string
  link: string | null
  date: Date
}>()

const { pdf: pdf } = usePDF(props.pdf)

const loading = ref(true)

onBeforeUnmount(() => {
  if (pdf.value) {
    try {
      pdf.value.destroy()
    } catch (e) {
      console.error(e)
    }
  }
})

const openVerify = () => {
  if (props.link) {
    window.open(props.link, "_blank");
  }
}

const downloadPdf = () => {
  const linkEl = document.createElement('a')
  linkEl.href = props.pdf
  linkEl.download = props.pdf.split('/').pop() || 'certificate.pdf'
  linkEl.target = '_blank'
  linkEl.rel = 'noopener noreferrer'
  linkEl.click()
}
</script>

<template>
  <button
    class="px-2 py-1 hover:cursor-pointer mb-4 text-sm hover:bg-black hover:text-white hover:dark:bg-white hover:dark:text-black cursor-hover"
    @click="
      showPopup({
        title: 'Certificates',
        component: CertificatesOverview,
      })
    "
  >
    <i class="pi pi-arrow-left"></i>
  </button>
  <div class="flex items-center">
    <div>
      <div>
        Issued by: <span class="font-bold"> {{ props.issuer }}</span>
      </div>
      <div>
        Issuing date: <span class="font-bold"> {{ props.date.toLocaleDateString() }}</span>
      </div>
    </div>
    <div class="flex flex-1 justify-end gap-2 ml-2">
      <button
        class="border p-2 hover:cursor-pointer hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
        @click="downloadPdf"
      >
        Download
      </button>
      <button
        :class="['border p-2', { 'opacity-50 cursor-not-allowed': !props.link },{ 'hover:bg-black hover:cursor-pointer hover:text-white dark:hover:bg-white dark:hover:text-black ': props.link } ]"
        :disabled="!props.link"
        @click='openVerify'
      >
        Verify
      </button>
    </div>
  </div>

  <div class="relative flex justify-center items-center my-5">
    <div
      v-if="loading"
      class="absolute w-8 h-8 border-4 border-gray-300 border-t-gray-700 rounded-full animate-spin"
    />
    <VuePDF :fit-parent="true" :pdf="pdf" @loaded="loading = false" />
  </div>
</template>
