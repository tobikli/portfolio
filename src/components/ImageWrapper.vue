<script setup lang="ts">
import { ref, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    src: string
    alt: string
    imgClass?: string
    wrapperClass?: string
    showSpinner?: boolean
  }>(),
  {
    imgClass: '',
    wrapperClass: '',
    showSpinner: true,
  },
)

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const isLoading = ref(true)

watch(
  () => props.src,
  () => {
    isLoading.value = true
  },
  { immediate: true },
)

const onLoad = () => {
  isLoading.value = false
}

const onError = () => {
  isLoading.value = false
}
</script>

<template>
  <div :class="['relative', wrapperClass]">
    <div
      v-if="showSpinner && isLoading"
      class="absolute inset-0 flex items-center justify-center pointer-events-none"
    >
      <div
        class="absolute w-8 h-8 border-4 border-gray-300 border-t-gray-700 rounded-full animate-spin"
      ></div>
    </div>

    <img
      :src="src"
      :alt="alt"
      :class="[
        imgClass,
        'transition-opacity duration-150',
        showSpinner && isLoading ? 'opacity-0' : 'opacity-100',
      ]"
      @load="onLoad"
      @error="onError"
      @click="emit('click', $event)"
    />
  </div>
</template>
