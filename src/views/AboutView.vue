<script setup lang="ts">
import { information, work } from '@/data/information'
import { education } from '@/data/information'
import { motion } from 'motion-v'
import AnimationButton from '@/components/AnimationButton.vue'
import CVDetail from '@/components/CVDetail.vue'
import PublicationsOverview from '@/components/PublicationsOverview.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-start px-6 pt-5">
    <div class="text-center w-full max-w-4xl">
      <h1 class="text-3xl mb-12">About me</h1>
      <!-- Information -->
      <div class="grid grid:cols-1 md:grid-cols-[1fr_auto_1fr] mb-40">
        <div class="text-left p-5">
          <h2 class="text-lg mb-3">My name is {{ information.name }}</h2>
          <p>
            I'm currently in my <b>Master of Science</b> studies of
            <a
              class="underline"
              href="https://www.cit.tum.de/en/cit/studies/degree-programs/master-informatics/"
              >Informatics / Computer Science</a
            >
            at the
            <a class="underline" href="https://tum.de">Technical University of Munich (TUM)</a>.
            <br />
          </p>
          <p>
            During my Bachelor studies, next to mandatory courses in maths, algorithms and logic, I
            focused on <b>Software Engineering</b> and <b>Cloud Technologies</b>.
          </p>
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
          class="inline-block h-0.5 md:h-auto md:w-0.5 self-stretch bg-neutral-100 dark:bg-white/10"
        ></div>
        <div class="text-left p-5">
          <div class="border-gray-400 p-2 mb-3 text-center">
            <div class="flex items-center gap-4">
              <span class="status-dot status-green"></span>
              <p class="m-0">Currently employed at Siemens Cybersecurity</p>
            </div>
          </div>
          <p>
            I embrace technology, science and building digital infrastructure, applications and
            experiences.
          </p>
          <p class="mt-3">
            Furthermore, I love traveling the world, trying out culinary exquisites and I love most
            animals.
          </p>

          <p class="mt-3">More information about myself and my work can be seen below.</p>

          <div>
            <div class="flex justify-center mt-2">
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
            <li v-for="edu in education" :key="edu.degree" class="w-full max-w-[400px]">
              <div
                class="border border-gray-200 dark:border-gray-400 p-5 flex flex-col items-center text-center"
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
            <li v-for="job in work" :key="job.role" class="w-full max-w-[400px]">
              <div
                class="border border-gray-200 dark:border-gray-400 p-5 flex flex-col items-center text-center"
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
