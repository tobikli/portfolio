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

export function showPopup(payload: PopupPayload) {
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
}

export function usePopup() {
  return { popupState, showPopup, hidePopup }
}
