<script setup lang="ts">
import { onMounted, onBeforeUnmount, watch } from 'vue'
import { popupState, hidePopup, returnPopup } from '@/composables/usePopup'
import { motion } from 'motion-v'

let previousBodyOverflow = ''
let previousBodyTouchAction = ''
let previousBodyOverscroll = ''
let previousHtmlOverflow = ''
let previousHtmlTouchAction = ''
let previousHtmlOverscroll = ''
let scrollLockApplied = false

const setScrollLock = (locked: boolean) => {
  if (locked && !scrollLockApplied) {
    previousBodyOverflow = document.body.style.overflow
    previousBodyTouchAction = document.body.style.touchAction
    previousBodyOverscroll = document.body.style.overscrollBehavior
    previousHtmlOverflow = document.documentElement.style.overflow
    previousHtmlTouchAction = document.documentElement.style.touchAction
    previousHtmlOverscroll = document.documentElement.style.overscrollBehavior

    document.body.style.overflow = 'hidden'
    document.body.style.touchAction = 'none'
    document.body.style.overscrollBehavior = 'none'
    document.documentElement.style.overflow = 'hidden'
    document.documentElement.style.touchAction = 'none'
    document.documentElement.style.overscrollBehavior = 'none'
    scrollLockApplied = true
    return
  }

  if (!locked && scrollLockApplied) {
    document.body.style.overflow = previousBodyOverflow
    document.body.style.touchAction = previousBodyTouchAction
    document.body.style.overscrollBehavior = previousBodyOverscroll
    document.documentElement.style.overflow = previousHtmlOverflow
    document.documentElement.style.touchAction = previousHtmlTouchAction
    document.documentElement.style.overscrollBehavior = previousHtmlOverscroll
    scrollLockApplied = false
  }
}

function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape') hidePopup()
}

onMounted(() => {
  window.addEventListener('keydown', onKey)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKey)
  setScrollLock(false)
})

watch(
  () => popupState.visible,
  (visible) => {
    setScrollLock(visible)
  },
)
</script>

<template>
  <div
    v-if="popupState.visible"
    class="fixed inset-0 z-9998 flex items-center justify-center"
    aria-modal="true"
    role="dialog"
  >
    <div class="absolute inset-0 backdrop-blur-md" @click="hidePopup" />

    <Transition name="popup-tint" appear>
      <div class="absolute inset-0 bg-black/10" @click="hidePopup" />
    </Transition>

    <Transition name="popup-panel" appear>
      <div
        class="relative z-10 w-[min(90vw,900px)] max-h-[85vh] overflow-auto bg-white/60 dark:bg-black/60 backdrop-blur-2xl text-gray-900 dark:text-gray-100 p-6"
        @click.stop
      >
        <header class="flex items-start justify-between gap-4 mb-4">
          <div class="flex items-center gap-2">
            <button
              v-if="popupState.history.length > 0"
              class="px-2 py-1 text-sm hover:bg-black hover:text-white hover:dark:bg-white hover:dark:text-black cursor-hover"
              @click="returnPopup"
              aria-label="Go back"
            >
              <i class="pi pi-arrow-left"></i>
            </button>
            <h3 class="text-lg font-semibold">{{ popupState.title }}</h3>
          </div>
          <motion.button
            @click="hidePopup"
            class="ml-4 p-2 cursor-hover"
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
    </Transition>
  </div>
</template>

<style scoped>
.popup-tint-enter-active,
.popup-tint-leave-active {
  transition: opacity 150ms ease;
}

.popup-tint-enter-from,
.popup-tint-leave-to {
  opacity: 0;
}

.popup-panel-enter-active,
.popup-panel-leave-active {
  transition: opacity 170ms ease, transform 170ms ease;
}

.popup-panel-enter-from,
.popup-panel-leave-to {
  opacity: 0;
  transform: scale(0.98);
}
</style>
