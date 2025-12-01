<script setup lang="ts">
import { VuePDF, usePDF } from '@tato30/vue-pdf'
import CV from '@/assets/cv.pdf'
const { pdf } = usePDF(CV)

</script>

<template>
  <div class="flex justify-center">
    <VuePDF :fit-parent="true" :pdf="pdf" />
  </div>
</template>
