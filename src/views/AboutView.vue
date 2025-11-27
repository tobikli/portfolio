<script setup lang="ts">
import { work } from '@/data/information'
import { education } from '@/data/information'
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-start px-6 pt-5">
    <div class="text-center w-full max-w-4xl">
      <h1 class="text-3xl mb-12">About me</h1>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Education column -->
        <div>
          <h2 class="text-xl mb-6">Education</h2>
          <ul class="space-y-4 flex flex-col items-center">
            <li v-for="edu in education" :key="edu.degree" class="w-full max-w-[400px]">
              <div
                class="border border-gray-100 dark:border-gray-400 p-5 flex flex-col items-center text-center"
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
                class="border border-gray-100 dark:border-gray-400 p-5 flex flex-col items-center text-center"
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
