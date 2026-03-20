<script setup lang="ts">
import { information } from '@/data/information'
import { onMounted, ref } from 'vue'
import { motion } from 'motion-v'
import { showPopup } from '@/composables/usePopup'
import AnimationButton from '@/components/AnimationButton.vue'
import CVDetail from '@/components/CVDetail.vue'
import ImageDetail from '@/components/ImageDetail.vue'
import ImageWrapper from '@/components/ImageWrapper.vue'
import PublicationsOverview from '@/components/PublicationsOverview.vue'
import axios from 'axios'
import { config } from '@/data/config'
import CertificatesOverview from '@/components/CertificatesOverview.vue'


const status = ref(information.status)


onMounted(async () => {
  try {
    const response = (await axios.get(`${config.api}/status`)).data.response
    if (response) {
      status.value = response
    }
  } catch (error) {
    console.error('Failed to fetch status:', error)
  }
})
</script>

<template>
  <div class="w-full flex flex-col items-center justify-start px-6">
    <div class="text-center w-full max-w-4xl about-no-anchor">
      <h1 class="text-3xl mb-12">About me</h1>
      <!-- Information -->
      <div class="grid grid:cols-1 lg:grid-cols-[1fr_auto_1fr] mb-40 items-center">
        <div class="text-left p-5">
          <div class="flex justify-center mt-3 mb-6">
            <div class="relative w-30 h-30 mb-5">
              <ImageWrapper
                :src="information.profilePic"
                :alt="`Portrait of ${information.name}`"
                wrapper-class="w-full h-full rounded-full overflow-hidden"
                img-class="relative w-full h-full object-cover hover:cursor-crosshair"
                @click="
                  showPopup({
                    title: 'Me',
                    component: ImageDetail,
                    componentProps: {
                      image: information.profilePic,
                    },
                  })
                "
              />
            </div>
          </div>
          <h2 class="text-lg mb-3">My name is {{ information.name }}</h2>
          <div class="space-y-3" v-html="information.aboutHtml"></div>
          <p class="mt-6 mb-3">I have experience with:</p>
          <div
            class="grid grid-cols-6 mt-5 border dark:border-white/10 border-black/10 p-4 gap-4 place-items-center"
          >
            <motion.a
              v-for="tech in information.techstack"
              :key="tech.name"
              :title="tech.name"
              class=""
              :initial="{ opacity: 0, y: 20 }"
              :animate="{ opacity: 1, y: 0 }"
              :transition="{ duration: 0.5, delay: 0 }"
              :whileHover="{ scale: 1.2, rotate: 10 }"
              :whileTap="{ scale: 0.9 }"
            >
              <font-awesome-icon
                :icon="tech.icon"
                size="lg"
                class="transition-all duration-300 hover:scale-110"
              />
            </motion.a>
          </div>
        </div>
        <div
          class="inline-block h-0.5 lg:h-auto lg:w-0.5 self-stretch bg-black/10 dark:bg-white/10"
        ></div>
        <div class="text-left p-5">
          <div class="bg-black/3 dark:bg-white/3 p-2 mb-8">
            <div class="border-gray-400/40 m-2 text-center">
              <div class="flex items-center gap-4 justify-center">
                <span class="status-dot status-green"></span>
                <p>{{ status }}</p>
              </div>
            </div>
            <hr class="mx-2 border-black/20 dark:border-white/20 my-4" />
            <div class="m-2 text-center">
              <div class="flex items-center gap-4 justify-center">
                <font-awesome-icon :icon="'fa-solid fa-location-dot'" size="sm" />
                <p>Currently located in {{ information.location }}</p>
              </div>
            </div>
          </div>
          <div class="space-y-3" v-html="information.aboutSideHtml"></div>

          <div>
            <div class="justify-center grid grid-cols-1 sm:grid-cols-2 mt-5">
              <AnimationButton
                text="Certificates"
                title="Certificates"
                :component="CertificatesOverview"
              />
              <AnimationButton
                text="Publications"
                title="Publications"
                :component="PublicationsOverview"
              />
            </div>
          </div>
          <div class="mr-4">
            <AnimationButton
              text="Curriculum Vitae"
              title="Curriculum Vitae"
              class="w-full"
              :component="CVDetail"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Status indicator container (optional reusable class) */
.sf-indicator {
  display: flex;
  align-items: flex-start; /* aligns dot with top of text */
  gap: 10px; /* space between dot and text */
  margin: 10px 0;
}

/* Status dot */
.status-dot {
  --size: 8px; /* dot size */
  width: var(--size);
  height: var(--size);
  border-radius: 50%;
  position: relative;
  flex-shrink: 0; /* prevents dot from shrinking */
  margin-top: 2px; /* tweak to align with text baseline */
  background-color: var(--sf-indicator-green); /* default green */
}

/* Pulse animation */
.status-dot::before,
.status-dot::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  background: inherit;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  animation: sf-indicator-pulse 2s infinite linear;
  opacity: 0.3;
}

.status-dot::after {
  animation-delay: 1s;
}

@keyframes sf-indicator-pulse {
  0% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.6;
  }
  100% {
    transform: translate(-50%, -50%) scale(2.5);
    opacity: 0;
  }
}

/* Status colors */
.status-green {
  background-color: #0bbf0b;
}

.status-red {
  background-color: #c51b1b;
}

.status-orange {
  background-color: #db8719;
}

.about-no-anchor {
  overflow-anchor: none;
}
</style>
