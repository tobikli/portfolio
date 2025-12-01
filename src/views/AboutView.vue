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
      <div class="grid grid:cols-1 md:grid-cols-[1fr_auto_1fr] mb-30">
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
          <motion.a
            v-for="tech in information.techstack"
            :key="tech.name"
            :title="tech.name"
            class="p-2"
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
        <div
          class="inline-block h-0.5 md:h-auto md:w-0.5 self-stretch bg-neutral-100 dark:bg-white/10"
        ></div>
        <div class="text-left p-5">
          <div class="border-gray-400 p-2 mb-3 text-center">
            <p class="sf-indicator">
              <span class="status-dot status-green"></span>
              <span class="status-text">Currently employed at Siemens Cybersecurity </span>
            </p>
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
.sf-indicator {
  --sf-indicator-size: 8px;
  --sf-indicator-green: #0bbf0b;
  --sf-indicator-red: #c51b1b;
  --sf-indicator-orange: #db8719;
}
.sf-indicator {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 10px 0;
}

.sf-indicator .status-dot {
  width: var(--sf-indicator-size);
  height: var(--sf-indicator-size);
  border-radius: 50%;
  position: relative;
}

.sf-indicator .status-dot::before,
.sf-indicator .status-dot::after {
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

.sf-indicator .status-dot::after {
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

.status-green {
  background-color: var(--sf-indicator-green);
}
.status-red {
  background-color: var(--sf-indicator-red);
}
.status-orange {
  background-color: var(--sf-indicator-orange);
}
</style>
