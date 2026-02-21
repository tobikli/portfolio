<script setup lang="ts">
//import CustomCursor from './ui-components/CustomCursor.vue'
import { computed } from 'vue'
import { RouterView } from 'vue-router'
import { useHead } from '@unhead/vue'
import { useRoute } from 'vue-router'
import profileUrl from '@/assets/images/profile.png'
import { createGlobalMeta } from '@/data/meta'

const route = useRoute()

const currentUrl = computed(() => new URL(route.path || '/', window.location.origin).href)
const absoluteProfileUrl = computed(() => new URL(profileUrl, window.location.origin).href)

useHead(() => createGlobalMeta(currentUrl.value, absoluteProfileUrl.value))

</script>

<template>
  <!--
  <custom-cursor
    :targets="['img', 'a', 'button', 'cursor-hover']"
    :circleColor="'#fff'"
    :circleColorHover="'#fff'"
    :dotColor="'#fff'"
    :dotColorHover="'#fff'"
    :hoverSize="1"
  />-->
  <RouterView />
</template>
