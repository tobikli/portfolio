import { createApp, h, type Component } from 'vue'

export type PopupPayload = {
  title?: string
  message?: string
  component?: Component
  componentProps?: Record<string, any>
}

// Detect iOS
const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent)

// Keep track of current popup instance
let currentPopupApp: any = null
let currentPopupContainer: HTMLElement | null = null
let keyHandler: ((e: KeyboardEvent) => void) | null = null

export function showPopup(payload: PopupPayload) {
  // Close any existing popup first
  if (currentPopupApp) {
    hidePopup()
  }

  // Create container for popup
  currentPopupContainer = document.createElement('div')
  currentPopupContainer.className = 'popup-root'
  document.body.appendChild(currentPopupContainer)

  // Lock body scroll
  document.body.style.overflow = 'hidden'

  // ESC key handler
  keyHandler = (e: KeyboardEvent) => {
    if (e.key === 'Escape') hidePopup()
  }
  window.addEventListener('keydown', keyHandler)

  // Create the popup wrapper component using render function
  const PopupWrapper = {
    render() {
      const overlayBlurClass = isIOS ? '' : 'backdrop-blur-md'
      const modalBlurClass = isIOS ? '' : 'backdrop-blur-2xl'

      return h(
        'div',
        {
          class: `fixed inset-0 z-9998 flex items-center justify-center ${isIOS ? 'ios-popup' : ''}`,
          role: 'dialog',
          'aria-modal': 'true',
          onClick: (e: MouseEvent) => {
            if (e.target === e.currentTarget) hidePopup()
          },
        },
        [
          // Background overlay
          h('div', {
            class: `absolute inset-0 bg-black/30 ${overlayBlurClass}`,
            onClick: () => hidePopup(),
          }),
          // Modal content
          h(
            'div',
            {
              class: `relative z-10 w-[min(90vw,900px)] max-h-[85vh] overflow-y-scroll touch-scroll bg-white/90 dark:bg-black/70 text-gray-900 dark:text-gray-100 p-6 ${modalBlurClass}`,
              onClick: (e: MouseEvent) => e.stopPropagation(),
            },
            [
              // Header
              h(
                'header',
                { class: 'flex items-start justify-between gap-4 mb-4' },
                [
                  h('div', {}, [
                    h('h3', { class: 'text-lg font-semibold' }, payload.title ?? ''),
                  ]),
                  h(
                    'button',
                    {
                      class: 'ml-4 p-2 hover:cursor-pointer',
                      'aria-label': 'Close',
                      onClick: () => hidePopup(),
                    },
                    [h('i', { class: 'pi pi-times' })]
                  ),
                ]
              ),
              // Content
              h('section', { class: 'prose dark:prose-invert' }, [
                payload.component
                  ? h(payload.component, payload.componentProps ?? {})
                  : h('p', { innerHTML: payload.message ?? '' }),
              ]),
            ]
          ),
        ]
      )
    },
  }

  // Create and mount the app
  currentPopupApp = createApp(PopupWrapper)
  currentPopupApp.mount(currentPopupContainer)
}

export function hidePopup() {
  if (!currentPopupApp || !currentPopupContainer) return

  // Remove key handler
  if (keyHandler) {
    window.removeEventListener('keydown', keyHandler)
    keyHandler = null
  }

  // Restore body scroll
  document.body.style.overflow = ''

  // Unmount the app - this triggers onBeforeUnmount hooks in child components
  currentPopupApp.unmount()
  
  // Remove container from DOM
  if (currentPopupContainer.parentNode) {
    currentPopupContainer.parentNode.removeChild(currentPopupContainer)
  }

  // Clear references immediately
  const containerToCleanup = currentPopupContainer
  currentPopupApp = null
  currentPopupContainer = null

  // Aggressive cleanup for iOS to help Safari release memory
  if (isIOS) {
    // Use requestIdleCallback if available, otherwise setTimeout
    const cleanup = () => {
      // Force removal of any lingering event listeners
      if (containerToCleanup) {
        const clone = containerToCleanup.cloneNode(false)
        if (containerToCleanup.parentNode) {
          containerToCleanup.parentNode.replaceChild(clone, containerToCleanup)
        }
      }
      
      // Trigger garbage collection hints
      // Force a reflow
      void document.body.offsetHeight
      
      // Clear any cached styles
      if (document.body.style.cssText) {
        const currentStyle = document.body.style.cssText
        document.body.style.cssText = ''
        document.body.style.cssText = currentStyle
      }
    }

    if ('requestIdleCallback' in window) {
      requestIdleCallback(cleanup, { timeout: 100 })
    } else {
      setTimeout(cleanup, 50)
    }
  }
}

export function usePopup() {
  return { showPopup, hidePopup }
}
