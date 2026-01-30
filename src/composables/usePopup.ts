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
  componentKey: 0,
})

export function showPopup(payload: PopupPayload) {
  // clear previous immediately
  popupState.component = null
  popupState.componentProps = {}
  popupState.visible = false
  
  // Use requestAnimationFrame to ensure DOM cleanup before showing new popup
  requestAnimationFrame(() => {
    // set new
    popupState.title = payload.title ?? ''
    popupState.message = payload.message ?? ''
    popupState.component = payload.component ?? null
    popupState.componentProps = payload.componentProps ?? {}
    popupState.componentKey++
    popupState.visible = true
  })
}

export function hidePopup() {
  popupState.visible = false
  // Immediately clear component on close to free memory (especially important for heavy components like PDFs)
  requestAnimationFrame(() => {
    if (!popupState.visible) {
      popupState.component = null
      popupState.componentProps = {}
    }
  })
}

export function usePopup() {
  return { popupState, showPopup, hidePopup }
}
