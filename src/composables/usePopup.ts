import { reactive } from 'vue'

/* eslint-disable  @typescript-eslint/no-explicit-any */


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
})

export function showPopup(payload: PopupPayload) {
  popupState.title = payload.title ?? ''
  popupState.message = payload.message ?? ''
  popupState.component = payload.component ?? null
  popupState.componentProps = payload.componentProps ?? {}
  popupState.visible = true
}

export function hidePopup() {
  popupState.visible = false
  // optional: clear data
  // popupState.title = ''
  // popupState.message = ''
  // popupState.component = null
  // popupState.componentProps = {}
}

export function usePopup() {
  return { popupState, showPopup, hidePopup }
}
