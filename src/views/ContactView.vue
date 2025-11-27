<script setup lang="ts">
import { ref } from 'vue'
import { information } from '@/data/information'
import { showPopup } from '@/composables/usePopup'
import AppFooter from '@/components/AppFooter.vue'
const email = ref('')
const message = ref('')

const EMAIL_RGX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const sendMessage = () => {
  if (EMAIL_RGX.test(email.value)) {
    showPopup({ title: 'Under Construction', message: 'This feature is currently in development' })
  } else {
    showPopup({ title: 'Error', message: 'Invalid Email' })
  }
}
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-start px-6 pt-5">
    <div class="text-center">
      <h1 class="text-3xl mb-12">Contact</h1>
      <p class="text-md">Contact me directly</p>
      <a class="hover:underline" :href="'mailto:' + information.mail">{{ information.mail }}</a>
      <p class="mb-5 mt-5 text-md">Or here</p>
      <div class="grid p-10 bg-black/5 dark:bg-white/2">
        <input
          class="border-b mb-5 focus:outline-none focus:"
          type="email"
          placeholder="Your email"
          v-model="email"
        />
        <textarea
          class="max-h-50 min-h-30 border-b mb-5 focus:outline-none focus:"
          placeholder="Your message"
          v-model="message"
        />
        <button class="anim p-6 hover:cursor-pointer" @click="sendMessage()" type="submit">
          Submit
        </button>
      </div>
    </div>
  </div>
  <AppFooter />
</template>

<style>
button.anim {
  position: relative;
  display: inline-block;
  line-height: 0.2;
  color: inherit;
}

button.anim::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: -12px;
  transform: translateX(-50%) scaleX(0);
  transform-origin: center;
  width: calc(30%);
  height: 1px;
  background: currentColor;
  opacity: 1;
  transition:
    transform 180ms cubic-bezier(0.2, 0.9, 0.4, 1),
    opacity 120ms;
  border-radius: 2px;
  pointer-events: none;
}

button.anim:hover::after,
button.anim:focus::after,
button.anim.active::after {
  transform: translateX(-50%) scaleX(1);
}
button.anim:active::after {
  transition-duration: 120ms;
}
</style>
