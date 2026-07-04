<script setup lang="ts">
//import CustomCursor from './ui-components/CustomCursor.vue'
import { computed } from 'vue'
import { RouterView } from 'vue-router'
import { useHead } from '@unhead/vue'
import { useRoute } from 'vue-router'
import { createGlobalMeta } from '@/data/meta'
import ToggleMenu from '@/components/ToggleMenu.vue'
import Badge from '@/components/Badge.vue'


const route = useRoute()

const currentUrl = computed(() => new URL(route.path || '/', window.location.origin).href)

// Keep the canonical/og:url in sync with the current route for JS-capable
// clients. All other meta is static in index.html for crawlers.
useHead(() => createGlobalMeta(currentUrl.value))
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
  <ToggleMenu />
  <Badge />
</template>
