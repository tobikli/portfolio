<script setup lang="ts">
import { VuePDF, usePDF } from '@tato30/vue-pdf'
import { ref } from 'vue'
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
</script>

<template>
  <div>
    <p>{{ detail }}</p>
    <h1 class="text-center text-xl p-4">Paper</h1>
    <div>
      <div class="flex justify-center">
        <VuePDF :fit-parent="true" :pdf="thesis" :page="thesisPage" />
      </div>
      <div class="flex justify-center p-4">
        <button @click="decreaseThesis" class="m-2 hover:cursor-pointer">&lt;</button>
        <a class="m-2">{{ thesisPage }}/{{ thesisPages }}</a>
        <button @click="increaseThesis" class="m-2 hover:cursor-pointer">&gt;</button>
      </div>
    </div>
    <div v-if="presentation">
      <h1 class="text-center text-xl p-4">Presentation</h1>
      <div>
        <div class="flex justify-center">
          <VuePDF :fit-parent="true" :pdf="presentation" :page="presentationPage" />
        </div>
        <div class="flex justify-center p-4">
          <button @click="decreasePresentation" class="m-2 hover:cursor-pointer">&lt;</button>
          <a class="m-2">{{ presentationPage }}/{{ presentationPages }}</a>
          <button @click="increasePresentation" class="m-2 hover:cursor-pointer">&gt;</button>
        </div>
      </div>
    </div>
  </div>
</template>
