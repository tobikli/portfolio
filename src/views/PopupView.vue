<script setup lang="ts">
import { onMounted, onBeforeUnmount, computed, watch } from 'vue'
import { popupState, hidePopup } from '@/composables/usePopup'
import { motion } from 'motion-v'

// Detect iOS
const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent)

// ESC key handler
function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape') hidePopup()
}

onMounted(() => {
  window.addEventListener('keydown', onKey)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKey)
})

// Blur classes - disable blur on iOS to prevent GPU issues
const overlayBlurClass = computed(() => (isIOS ? '' : 'backdrop-blur-md'))
const modalBlurClass = computed(() => (isIOS ? '' : 'backdrop-blur-2xl'))

// Motion hover (disable rotate on iOS)
const motionHover = computed(() => (isIOS ? {} : { rotate: 90 }))

watch(() => popupState.visible, (visible) => {
  document.body.style.overflow = visible ? 'hidden' : ''
})
</script>

<template>
  <Teleport to="body">
    <div
      v-if="popupState.visible"
      class="fixed inset-0 z-9998 flex items-center justify-center"
      aria-modal="true"
      role="dialog"
    >
      <!-- Background overlay -->
      <div class="absolute inset-0 bg-black/30" :class="overlayBlurClass" @click="hidePopup" />

      <!-- Modal content -->
      <div
        class="relative z-10 w-[min(90vw,900px)] max-h-[85vh] overflow-y-scroll touch-scroll bg-white/90 dark:bg-black/70 text-gray-900 dark:text-gray-100 p-6"
        :class="modalBlurClass"
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
            :whileHover="motionHover"
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
  </Teleport>
</template>
