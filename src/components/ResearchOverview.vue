<script setup lang="ts">
import { researches } from '@/data/research'
import { showPopup } from '@/composables/usePopup'
import ResearchDetail from './ResearchDetail.vue'
</script>

<template>
  <div class="text-center p-5">
    <div v-for="research in researches" :key="research.title">
      <button
        class="p-3 w-full"
        @click="
          showPopup({
            title: research.title,
            component: ResearchDetail,
            componentProps: {
              detail: research.description,
              pdfthesis: research.pdfthesis,
              pdfpresentation: research.pdfpresentation,
            },
          })
        "
      >
        <div class="grid grid-cols-[65%_20%] gap-4 w-full cursor-hover">
          <a class="text-right underline-offset-5 underline">{{
            research.title
          }}</a>
          <a class="text-left">{{ research.date }}</a>
        </div>
      </button>
    </div>
  </div>
</template>
