<script setup lang="ts">
import { information } from '@/data/information'
import { education } from '@/data/education'
import { work } from '@/data/work'

import { motion } from 'motion-v'
import { showPopup } from '@/composables/usePopup'
import AnimationButton from '@/components/AnimationButton.vue'
import CVDetail from '@/components/CVDetail.vue'
import ImageDetail from '@/components/ImageDetail.vue'
import PublicationsOverview from '@/components/PublicationsOverview.vue'
</script>

<template>
  <div class="w-full flex flex-col items-center justify-start px-6 pb-20 md:pb-28">
    <div class="text-center w-full max-w-4xl">
      <h1 class="text-3xl mb-12">About me</h1>
      <!-- Information -->
      <div class="grid grid:cols-1 lg:grid-cols-[1fr_auto_1fr] mb-40">
        <div class="text-left p-5">
          <div class="flex justify-center mb-6">
            <div class="relative w-30 h-30 mb-5">
              <img
                :src="information.profilePic"
                :alt="`Portrait of ${information.name}`"
                class="relative w-full h-full object-cover rounded-full hover:cursor-crosshair"
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
          <p class="mt-3 mb-3">I have experience with:</p>
          <div class="flex flex-wrap gap-2">
            <motion.a
              v-for="tech in information.techstack"
              :key="tech.name"
              :title="tech.name"
              class="p-1"
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
          <div class="border-gray-400/40 p-2 mb-10 text-center">
            <div class="flex items-center gap-4">
              <span class="status-dot status-green"></span>
              <p class="m-0">{{ information.status }}</p>
            </div>
          </div>
          <div class="space-y-3" v-html="information.aboutSideHtml"></div>

          <div>
            <div class="justify-center grid grid-cols-1 sm:grid-cols-2 mt-5">
              <AnimationButton
                text="Curriculum Vitae"
                title="Curriculum Vitae"
                :component="CVDetail"
              />
              <AnimationButton
                text="Publications"
                title="Publications"
                :component="PublicationsOverview"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Education column -->
        <div>
          <h2 class="text-xl mb-6">Education</h2>
          <ul class="space-y-4 flex flex-col items-center">
            <li v-for="edu in education" :key="edu.degree" class="w-full max-w-100">
              <div
                class="border border-gray-200 dark:border-gray-400 p-5 flex flex-col items-center text-center hover:bg-black/3 hover:dark:bg-white/3"
              >
                <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {{ edu.degree }}
                </h3>
                <p class="text-md text-gray-500 dark:text-gray-400 mt-1">
                  {{ edu.school }}
                </p>
                <time class="text-xs text-gray-400 mt-2">
                  {{ edu.time }}
                </time>
                <p class="mt-3 text-sm text-gray-700 dark:text-gray-300">
                  {{ edu.information }}
                </p>
              </div>
            </li>
          </ul>
        </div>

        <!-- Work column -->
        <div>
          <h2 class="text-xl mb-6">Work</h2>
          <ul class="space-y-4 flex flex-col items-center">
            <li v-for="job in work" :key="job.role" class="w-full max-w-100">
              <div
                class="border border-gray-200 dark:border-gray-400 p-5 flex flex-col items-center text-center hover:bg-black/3 hover:dark:bg-white/3"
              >
                <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {{ job.role }}
                </h3>
                <p class="text-md text-gray-500 dark:text-gray-400 mt-1">
                  {{ job.place }}
                </p>
                <time class="text-xs text-gray-400 mt-2">
                  {{ job.time }}
                </time>
                <p class="mt-3 text-sm text-gray-700 dark:text-gray-300">
                  {{ job.information }}
                </p>
              </div>
            </li>
          </ul>
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
</style>
