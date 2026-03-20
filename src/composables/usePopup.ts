import { reactive, markRaw } from 'vue'

/* eslint-disable  @typescript-eslint/no-explicit-any */

export type PopupPayload = {
  title?: string
  message?: string
  component?: any
  componentProps?: Record<string, any>
}

type PopupSnapshot = {
  title: string
  message: string
  component: any
  componentProps: Record<string, any>
}

export const popupState = reactive({
  visible: false,
  title: '',
  message: '',
  component: null as any,
  componentProps: {} as Record<string, any>,
  componentKey: 0,
  history: [] as PopupSnapshot[],
})

export function showPopup(payload: PopupPayload, options: { pushHistory?: boolean } = {}) {
  const { pushHistory = true } = options

  if (pushHistory && popupState.visible && (popupState.component || popupState.message)) {
    popupState.history.push({
      title: popupState.title,
      message: popupState.message,
      component: popupState.component,
      componentProps: { ...popupState.componentProps },
    })
  }

  popupState.visible = false
  popupState.component = null
  popupState.componentProps = {}

  popupState.title = payload.title ?? ''
  popupState.message = payload.message ?? ''
  popupState.component = payload.component ? markRaw(payload.component) : null
  popupState.componentProps = payload.componentProps ?? {}
  popupState.componentKey++
  popupState.visible = true
}

export function returnPopup() {
  const previous = popupState.history.pop()

  if (!previous) {
    hidePopup()
    return
  }

  showPopup(previous, { pushHistory: false })
}

export function hidePopup() {
  popupState.visible = false
  popupState.history = []
}

export function usePopup() {
  return { popupState, showPopup, hidePopup, returnPopup }
}
