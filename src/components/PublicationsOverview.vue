<script setup lang="ts">
import { publications } from '@/data/publications'
import { showPopup } from '@/composables/usePopup'
import PublicationsDetail from './PublicationsDetail.vue'
</script>

<template>
  <div class="text-center p-5">
    <div v-for="publication in publications" :key="publication.title">
      <button
        class="p-3 w-full"
        @click="
          showPopup({
            title: publication.title,
            component: PublicationsDetail,
            componentProps: {
              detail: publication.description,
              pdfthesis: publication.pdfthesis,
              pdfpresentation: publication.pdfpresentation,
            },
          })
        "
      >
        <div class="grid grid-cols-[65%_20%] gap-4 w-full">
          <a class="text-right underline-offset-5 underline hover:cursor-pointer">{{
            publication.title
          }}</a>
          <a class="text-left">{{ publication.date }}</a>
        </div>
      </button>
    </div>
  </div>
</template>
