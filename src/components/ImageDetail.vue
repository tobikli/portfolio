<script setup lang="ts">
defineProps<{
  image: string
}>()
</script>

<template>
  <div class="flex items-center justify-center p-4">
    <img :src="image" alt="Detail image" class="max-w-full max-h-[50dvh] object-contain" />
  </div>
</template>
