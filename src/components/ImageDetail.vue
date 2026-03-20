<script setup lang="ts">
import ImageWrapper from './ImageWrapper.vue'

defineProps<{
  image: string
}>()
</script>

<template>
  <div class="flex items-center justify-center p-4">
    <ImageWrapper :src="image" alt="Detail image" img-class="max-w-full max-h-[50dvh] object-contain" />
  </div>
</template>
