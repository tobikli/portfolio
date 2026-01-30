import { reactive } from 'vue'

export type PopupPayload = {
  title?: string
  message?: string
  component?: any
  componentProps?: Record<string, any>
}

export const popupState = reactive({
  visible: false,
  title: '',
  message: '',
  component: null as any,
  componentProps: {} as Record<string, any>,
  componentKey: 0, // add key
})

let cleanupTimer: ReturnType<typeof setTimeout> | null = null

export function showPopup(payload: PopupPayload) {
  // Clear any pending cleanup
  if (cleanupTimer) {
    clearTimeout(cleanupTimer)
    cleanupTimer = null
  }
  // clear previous
  popupState.visible = false
  popupState.component = null
  popupState.componentProps = {}
  // set new
  popupState.title = payload.title ?? ''
  popupState.message = payload.message ?? ''
  popupState.component = payload.component ?? null
  popupState.componentProps = payload.componentProps ?? {}
  popupState.componentKey++
  popupState.visible = true
}

export function hidePopup() {
  popupState.visible = false
  // Clear component after a short delay to allow transition/cleanup
  // Clear any existing timer first to prevent race conditions
  if (cleanupTimer) {
    clearTimeout(cleanupTimer)
  }
  cleanupTimer = setTimeout(() => {
    if (!popupState.visible) {
      popupState.component = null
      popupState.componentProps = {}
    }
    cleanupTimer = null
  }, 100)
}

export function usePopup() {
  return { popupState, showPopup, hidePopup }
}
