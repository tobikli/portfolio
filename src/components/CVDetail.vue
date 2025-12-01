<script setup lang="ts">
import { VuePDF, usePDF } from '@tato30/vue-pdf'
import CV from '@/assets/cv.pdf'
const { pdf } = usePDF(CV)
</script>

<template>
  <div class="flex justify-center">
    <VuePDF :pdf="pdf" />
  </div>
</template>
