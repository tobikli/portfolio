<script setup lang="ts">
import { useDark } from '@vueuse/core'
import CustomCursor from './ui-components/CustomCursor.vue'
import { RouterView } from 'vue-router'
const isDark = useDark()

</script>

<template>
  <custom-cursor
    :targets="['img', 'a', 'button', 'cursor-hover']"
    :circleColor="isDark ? '#fff' : '#000'"
    :circleColorHover="isDark ? '#fff' : '#000'"
    :dotColor="isDark ? '#fff' : '#000'"
    :dotColorHover="isDark ? '#fff' : '#000'"
    :hoverSize="1"
  />
  <RouterView />
</template>
