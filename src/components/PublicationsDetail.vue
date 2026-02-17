<script setup lang="ts">
import { VuePDF, usePDF } from '@tato30/vue-pdf'
import { showPopup } from '@/composables/usePopup'
import { ref, onBeforeUnmount } from 'vue'
import PublicationsOverview from './PublicationsOverview.vue'
/* eslint-disable  @typescript-eslint/no-explicit-any */

const props = defineProps<{
  detail: string
  pdfthesis: string
  pdfpresentation: string | null
}>()

const thesisPage = ref(1)
const presentationPage = ref(1)

const { pdf: thesis, pages: thesisPages } = usePDF(props.pdfthesis)

let presentation: any = null
let presentationPages: any = null
if (props.pdfpresentation) {
  const { pdf, pages } = usePDF(props.pdfpresentation)
  presentation = pdf
  presentationPages = pages
}

const loading1 = ref(true)
const loading2 = ref(true)

const increaseThesis = () => {
  if (thesisPage.value + 1 <= thesisPages.value) thesisPage.value++
}

const decreaseThesis = () => {
  if (thesisPage.value - 1 >= 0) thesisPage.value--
}

const increasePresentation = () => {
  if (presentationPage.value + 1 <= presentationPages.value) presentationPage.value++
}

const decreasePresentation = () => {
  if (presentationPage.value - 1 >= 0) presentationPage.value--
}

const downloadFile = (url: string, fallbackName: string) => {
  const linkEl = document.createElement('a')
  linkEl.href = url
  linkEl.download = url.split('/').pop() || fallbackName
  linkEl.target = '_blank'
  linkEl.rel = 'noopener noreferrer'
  linkEl.click()
}

const downloadThesis = () => {
  downloadFile(props.pdfthesis, 'paper.pdf')
}

const downloadPresentation = () => {
  if (props.pdfpresentation) {
    downloadFile(props.pdfpresentation, 'presentation.pdf')
  }
}

onBeforeUnmount(() => {
  if (thesis.value) {
    try {
      thesis.value.destroy()
    } catch (e) {
      console.error(e)
    }
  }
  if (presentation?.value) {
    try {
      presentation.value.destroy()
    } catch (e) {
      console.error(e)
    }
  }
})
</script>

<template>
  <div>
    <Button
      class="px-2 py-1 hover:cursor-pointer mb-4 text-sm hover:bg-black hover:text-white hover:dark:bg-white hover:dark:text-black cursor-hover"
      @click="
        showPopup({
          title: 'Publications',
          component: PublicationsOverview,
        })
      "
    >
      <i class="pi pi-arrow-left"></i>
    </Button>
    <p>{{ detail }}</p>
    <div class="flex justify-center items-center p-4">
      <h1 class="text-xl underline-offset-3 underline">Paper</h1>
    </div>
    <div>
      <div class="relative flex justify-center items-center">
        <div
          v-if="loading1"
          class="absolute w-8 h-8 border-4 border-gray-300 border-t-gray-700 rounded-full animate-spin"
        />

        <VuePDF :fit-parent="true" :pdf="thesis" :page="thesisPage" @loaded="loading1 = false" />
      </div>
      <div class="flex justify-center items-center p-4">
        <button @click="decreaseThesis" class="m-2 hover:cursor-pointer">&lt;</button>
        <input
          type="number"
          v-model.number="thesisPage"
          :min="1"
          :max="thesisPages"
          class="m-2 w-16 text-center border px-2 py-1 bg-white dark:bg-black text-gray-900 dark:text-gray-100"
          aria-label="Current thesis page"
        />
        <span class="m-2 text-gray-900 dark:text-gray-100">/ {{ thesisPages }}</span>
        <button @click="increaseThesis" class="m-2 hover:cursor-pointer">&gt;</button>
      </div>
      <div class="flex justify-center pb-6">
        <button
          class="text-sm border px-3 py-1 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
          @click="downloadThesis"
        >
          Download Paper
        </button>
      </div>
    </div>
    <div v-if="presentation">
      <div class="flex justify-center items-center p-4">
        <h1 class="text-xl underline-offset-3 underline">Presentation</h1>
      </div>
      <div>
        <div class="relative flex justify-center items-center">
          <div
            v-if="loading2"
            class="absolute w-8 h-8 border-4 border-gray-300 border-t-gray-700 rounded-full animate-spin"
          />

          <VuePDF
            :fit-parent="true"
            :pdf="presentation"
            :page="presentationPage"
            @loaded="loading2 = false"
          />
        </div>
        <div class="flex justify-center items-center p-4">
          <button @click="decreasePresentation" class="m-2 hover:cursor-pointer">&lt;</button>
          <input
            type="number"
            v-model.number="presentationPage"
            :min="1"
            :max="presentationPages"
            class="m-2 w-16 text-center border px-2 py-1 bg-white dark:bg-black text-gray-900 dark:text-gray-100"
            aria-label="Current thesis page"
          />
          <span class="m-2 text-gray-900 dark:text-gray-100">/ {{ presentationPages }}</span>
          <button @click="increasePresentation" class="m-2 hover:cursor-pointer">&gt;</button>
        </div>
        <div class="flex justify-center pb-6">
          <button
            class="text-sm border px-3 py-1 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
            @click="downloadPresentation"
          >
            Download Presentation
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
