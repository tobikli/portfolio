<script setup lang="ts">
import { information } from '@/data/information'
</script>

<template>
  <ul class="list-disc pl-5 space-y-4 text-left">
    <li v-for="interest in information.interests" :key="interest.name">
      <span class="font-medium">{{ interest.name }}</span>
      <ul v-if="interest.subfields.length" class="mt-2 list-[circle] pl-5 space-y-1">
        <li v-for="subfield in interest.subfields" :key="subfield">
          {{ subfield }}
        </li>
      </ul>
    </li>
  </ul>
</template>
