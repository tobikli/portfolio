import { Buffer } from 'buffer'

// Make Buffer available in the browser build for libraries that expect it
if (typeof (globalThis as { Buffer?: typeof Buffer }).Buffer === 'undefined') {
  ;(globalThis as { Buffer?: typeof Buffer }).Buffer = Buffer
}
