<script setup lang="ts">
import { motion } from 'motion-v'
import { information } from '@/data/information'
import { useDark } from '@vueuse/core'
import ParticlesBackground from '@/ui-components/ParticlesBackground.vue'

const isDark = useDark()

const lines = [
  { text: `Hello, I'm ${information.name}`, size: 'text-3xl', weight: 'font-semibold' },
  { text: 'Welcome to my portfolio!', size: 'text-xl', weight: 'font-medium' },
  { text: information.slogan, size: 'text-2xl', weight: 'font-medium' },
]

const splitLines = lines.map((line) => ({
  ...line,
  words: line.text.split(' '),
}))
</script>

<template>
  <!-- Add 'relative z-10' to your main content container -->
  <div class="min-h-screen flex flex-col items-center justify-start px-6 pt-5 relative z-10">
    <div class="h-50"></div>
    <div class="backdrop-blur-sm bg-black/2 dark:bg-white/2 p-5">
      <div
        v-for="(line, lineIndex) in splitLines"
        :key="lineIndex"
        :class="[line.size, 'text-center']"
      >
        <motion.span
          v-for="(word, wordIndex) in line.words"
          :key="wordIndex"
          class="inline-block mr-2 mb-2 transition-transform hover:cursor-default"
          :initial="{ opacity: 0, y: 20 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{
            duration: 0.5,
            delay:
              wordIndex * 0.2 + (lineIndex > 0 ? splitLines[lineIndex - 1]!.words.length * 0.2 : 0),
          }"
          :whileHover="{ scale: 1.15, y: -4 }"
          :hoverTransition="{ duration: 0.15, delay: 0 }"
          :class="line.weight"
        >
          {{ word }}
        </motion.span>
      </div>
    </div>
    <motion.div class="mt-15 p-5 backdrop-blur-sm bg-black/2 dark:bg-white/2"
        :initial="{ opacity: 0, y: 20 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.5, delay: 2 }"
    >
      <motion.a
        v-for="link in information.links"
        :key="link.name"
        :href="link.link"
        class="m-6 "
        :initial="{ opacity: 0, y: 20 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.5, delay: 2 }"
        :whileHover="{ scale: 1.2, rotate: 10 }"
        :whileTap="{ scale: 0.9 }"
      >
        <font-awesome-icon
          :icon="link.icon"
          size="2xl"
          class="transition-all duration-300 hover:scale-110 "
        />
      </motion.a>
    </motion.div>
  </div>
  <ParticlesBackground
    :particle-count="700"
    :particle-spread="10"
    :speed="0.1"
    :particle-colors="[isDark ? '#ffffff' : '#000000']"
    :move-particles-on-hover="true"
    :particle-hover-factor="1"
    :alpha-particles="false"
    :particle-base-size="80"
    :size-randomness="10"
    :camera-distance="40"
    :disable-rotation="false"
  />
</template>
