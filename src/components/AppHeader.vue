<script setup lang="ts">
import { useDark } from '@vueuse/core'
import logo_dark from '@/assets/logo_dark.svg'
import logo_light from '@/assets/logo_light.svg'
import { sections } from '@/data/sections'
import { ref, onMounted, onBeforeUnmount } from 'vue'

const isDark = useDark()
const currentAnchor = ref(sections[0]?.id ?? '')
const previousAnchor = ref(sections[0]?.id ?? '')
const isMobileMenuOpen = ref(false)
const scrollDirection = ref<'up' | 'down'>('down')
const headerRef = ref<HTMLElement | null>(null)
const mobileNavRef = ref<HTMLElement | null>(null)

const replaceHash = (id: string) => {
  if (!id) return
  const next = `${window.location.pathname}${window.location.search}#${id}`
  if (window.location.hash !== `#${id}`) {
    window.history.replaceState(null, '', next)
  }
}

const updateActiveSection = () => {
  const headerOffset = 64 // matches --header-height
  const sectionsInDom = Array.from(document.querySelectorAll<HTMLElement>('main .section[id]'))

  let bestId = currentAnchor.value
  let bestDist = Number.POSITIVE_INFINITY

  sectionsInDom.forEach((el) => {
    const rect = el.getBoundingClientRect()
    if (rect.bottom <= 0 || rect.top >= window.innerHeight) return
    const dist = Math.abs(rect.top - headerOffset)
    if (dist < bestDist) {
      bestDist = dist
      bestId = el.id
    }
  })

  if (bestId && bestId !== currentAnchor.value) {
    previousAnchor.value = currentAnchor.value
    currentAnchor.value = bestId
    replaceHash(bestId)
  }
}

let lastScrollY = 0
const detectScrollDirection = () => {
  const currentScrollY = window.scrollY
  if (currentScrollY > lastScrollY) {
    scrollDirection.value = 'down'
  } else if (currentScrollY < lastScrollY) {
    scrollDirection.value = 'up'
  }
  lastScrollY = currentScrollY
}

let ticking = false
const handleScroll = () => {
  if (ticking) return
  ticking = true
  requestAnimationFrame(() => {
    detectScrollDirection()
    updateActiveSection()
    ticking = false
  })
}

const closeMobileMenu = () => {
  if (isMobileMenuOpen.value) {
  isMobileMenuOpen.value = false
  }
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const handleResize = () => {
  if (window.innerWidth >= 640) {
    closeMobileMenu()
  }
}

const handleClickOutside = (e: MouseEvent) => {
  if (
    isMobileMenuOpen.value &&
    headerRef.value &&
    mobileNavRef.value &&
    !headerRef.value.contains(e.target as Node) &&
    !mobileNavRef.value.contains(e.target as Node)
  ) {
    closeMobileMenu()
  }
}

onMounted(() => {
  updateActiveSection()
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('resize', handleScroll, { passive: true })
  window.addEventListener('resize', handleResize, { passive: true })
  document.addEventListener('click', handleClickOutside, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', handleScroll)
  window.removeEventListener('resize', handleResize)
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <header
    ref="headerRef"
    class="sticky top-0 left-0 right-0 z-50 backdrop-blur-md h-16 border-b border-gray-300/60 dark:border-gray-200/7"
  >
    <div class="max-w-6xl mx-auto w-full px-4 flex items-center gap-4 h-full">
      <img :src="isDark ? logo_light : logo_dark" alt="Logo" class="w-10 h-10 shrink-0" />
      <div class="sm:hidden flex-1 min-w-0 text-center">
        <Transition :name="`section-${scrollDirection}`" mode="out-in">
          <span
            :key="currentAnchor"
            class="inline-block mt-2 text-sm font-medium text-gray-900 dark:text-gray-100 truncate max-w-full"
          >
            {{ sections.find((section) => section.id === currentAnchor)?.name ?? 'Menu' }}
          </span>
        </Transition>
      </div>

      <div class="hidden sm:flex flex-1 justify-center">
        <nav class="flex gap-2" role="navigation" aria-label="Main">
          <a
            v-for="section in sections"
            :key="section.id"
            :href="'#' + section.id"
            :class="[
              'nav-link px-3 py-2 rounded text-sm underline-offset-8',
              currentAnchor === section.id ? 'active' : '',
              'text-gray-900 dark:text-gray-100',
            ]"
          >
            {{ section.name }}
          </a>
        </nav>
      </div>

      <button
        type="button"
        class="sm:hidden inline-flex items-center justify-center w-10 h-10 rounded text-gray-900 dark:text-gray-100 cursor-hover"
        :aria-expanded="isMobileMenuOpen"
        aria-controls="mobile-nav"
        aria-label="Toggle navigation menu"
        @click="toggleMobileMenu"
      >
        <Transition name="menu-icon" mode="out-in">
          <i
            :key="isMobileMenuOpen ? 'close' : 'open'"
            :class="isMobileMenuOpen ? 'pi pi-times' : 'pi pi-bars'"
          />
        </Transition>
      </button>

      <div class="w-10 h-10 shrink-0 hidden sm:block" aria-hidden="true"></div>
    </div>
  </header>

  <Transition name="mobile-menu">
    <nav
      v-if="isMobileMenuOpen"
      ref="mobileNavRef"
      id="mobile-nav"
      class="sm:hidden fixed top-18 right-4 z-40"
      role="navigation"
      aria-label="Mobile"
    >
      <div
        class="mobile-menu-panel w-max max-w-[calc(100vw-2rem)] border border-gray-300/60 dark:border-gray-200/7 p-3"
      >
        <a
          v-for="section in sections"
          :key="`mobile-${section.id}`"
          :href="'#' + section.id"
          class="mobile-menu-link block px-5 py-2 text-sm text-gray-900 dark:text-gray-100 whitespace-nowrap"
          :class="
            currentAnchor === section.id
              ? 'bg-black/80 text-white dark:bg-gray-100/80 dark:text-gray-900'
              : 'hover:bg-gray-900/7 dark:hover:bg-gray-100/10'
          "
          @click="closeMobileMenu"
        >
          {{ section.name }}
        </a>
      </div>
    </nav>
  </Transition>
</template>

<style scoped>
nav a.nav-link {
  position: relative;
  display: inline-block;
  line-height: 0.2;
  color: inherit;
}

nav a.nav-link::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: -6px;
  transform: translateX(-50%) scaleX(0);
  transform-origin: center;
  width: calc(80%);
  height: 1px;
  background: currentColor;
  opacity: 1;
  transition:
    transform 400ms cubic-bezier(0.2, 0.9, 0.4, 1),
    opacity 400ms;
  border-radius: 2px;
  pointer-events: none;
}

nav a.nav-link:hover::after,
nav a.nav-link:focus::after,
nav a.nav-link.active::after {
  transform: translateX(-50%) scaleX(1);
}

nav a.nav-link:active::after {
  transition-duration: 400ms;
}

.mobile-menu-panel {
  position: relative;
  overflow: hidden;
  isolation: isolate;
}

:global(.dark) .mobile-menu-panel {
  background: transparent;
}

.mobile-menu-panel::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  background: rgba(255, 255, 255, 0);
  -webkit-backdrop-filter: blur(15px);
  backdrop-filter: blur(15px);
}

:global(.dark) .mobile-menu-panel::before {
  background: rgba(15, 16, 19, 0);
}

.mobile-menu-link {
  position: relative;
  z-index: 1;
}

.menu-icon-enter-active,
.menu-icon-leave-active {
  transition:
    opacity 120ms ease,
    transform 120ms ease;
}

.menu-icon-enter-from,
.menu-icon-leave-to {
  opacity: 0.5;
  transform: scale(0.9);
}

.section-name-enter-active,
.section-name-leave-active {
  transition:
    opacity 300ms ease,
    transform 300ms ease;
}

.section-name-enter-from,
.section-name-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

/* Scroll down: old goes up, new comes from bottom */
.section-down-enter-active,
.section-down-leave-active {
  transition:
    opacity 300ms ease,
    transform 300ms ease;
}

.section-down-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

.section-down-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

/* Scroll up: old goes down, new comes from top */
.section-up-enter-active,
.section-up-leave-active {
  transition:
    opacity 300ms ease,
    transform 300ms ease;
}

.section-up-enter-from {
  opacity: 0;
  transform: translateY(-8px);
}

.section-up-leave-to {
  opacity: 0;
  transform: translateY(8px);
}


</style>
