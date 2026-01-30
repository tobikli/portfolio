<script setup lang="ts">
import { onMounted, onBeforeUnmount, watch } from 'vue'
import { popupState, hidePopup } from '@/composables/usePopup'
import { motion } from 'motion-v'
function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape') hidePopup()
}

onMounted(() => {
  window.addEventListener('keydown', onKey)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKey)
})

watch(
  () => popupState.visible,
  (visible) => {
    document.body.style.overflow = visible ? 'hidden' : ''
  },
)
</script>

<template>
  <div
    v-show="popupState.visible"
    class="fixed inset-0 z-9998 flex items-center justify-center"
    aria-modal="true"
    role="dialog"
  >
    <div class="absolute inset-0 bg-black/10 backdrop-blur-md" @click="hidePopup" />
    <div
      class="relative z-10 w-[min(90vw,900px)] max-h-[85vh] overflow-auto bg-white/80 dark:bg-black/50 backdrop-blur-2xl text-gray-900 dark:text-gray-100 p-6"
      @click.stop
    >
      <header class="flex items-start justify-between gap-4 mb-4">
        <div>
          <h3 class="text-lg font-semibold">{{ popupState.title }}</h3>
        </div>
        <motion.button
          @click="hidePopup"
          class="ml-4 p-2 hover:cursor-pointer"
          aria-label="Close"
          :whileHover="{ rotate: 90 }"
        >
          <i class="pi pi-times"></i>
        </motion.button>
      </header>

      <section class="prose dark:prose-invert">
        <component
          v-if="popupState.component"
          :is="popupState.component"
          v-bind="popupState.componentProps"
          :key="popupState.componentKey"
        />
        <p v-else v-html="popupState.message" />
      </section>
    </div>
  </div>
</template>
