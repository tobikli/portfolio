<script setup lang="ts">
const badgeText = import.meta.env.VITE_BADGE_TEXT
</script>

<template>
  <div v-if="badgeText" class="ribbon-wrapper">
    <div class="ribbon">{{ badgeText }}</div>
  </div>
</template>

<style scoped>
.ribbon-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 150px;
  height: 150px;
  overflow: hidden;
  z-index: 9999;
  pointer-events: none;
}

.ribbon {
  position: absolute;
  top: 38px;
  left: -42px;
  width: 180px;
  padding: 7px 0;
  background-color: #e4405f;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.35);
  color: #fff;
  font-family: sans-serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-align: center;
  text-transform: uppercase;
  transform: rotate(-45deg);
  pointer-events: auto;
}
</style>
