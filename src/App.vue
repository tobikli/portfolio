<script setup lang="ts">
import CustomCursor from './ui-components/CustomCursor.vue'
import { RouterView } from 'vue-router'

</script>

<template>
  <custom-cursor
    :targets="['img', 'a', 'button', 'cursor-hover']"
    :circleColor="'#fff'"
    :circleColorHover="'#fff'"
    :dotColor="'#fff'"
    :dotColorHover="'#fff'"
    :hoverSize="1"
  />
  <RouterView />
</template>
