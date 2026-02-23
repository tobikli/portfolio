<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { config } from '@/data/config'
const version = 'v0.3'
const prefix = '> '
const prefixLength = prefix.length

const outputRef = ref<HTMLTextAreaElement | null>(null)
const inputRef = ref<HTMLInputElement | null>(null)

let adminCode: string | undefined
let name: string | undefined

const welcomeText = `
████████╗ ██████╗ ██████╗ ██╗██╗    ██╗███╗   ██╗
╚══██╔══╝██╔═══██╗██╔══██╗██║██║    ██║████╗  ██║
   ██║   ██║   ██║██████╔╝██║██║ █╗ ██║██╔██╗ ██║
   ██║   ██║   ██║██╔══██╗██║██║███╗██║██║╚██╗██║
   ██║   ╚██████╔╝██████╔╝██║╚███╔███╔╝██║ ╚████║
   ╚═╝    ╚═════╝ ╚═════╝ ╚═╝ ╚══╝╚══╝ ╚═╝  ╚═══╝

Welcome to my Shell! ${version}
Here you can quickly find information about me.
Run help for a overview of possible commands.
This is a WIP shell, for full features including auth, visit https://v2.tobiwn.me/shell
`

const enforceCursorPosition = (input: HTMLInputElement) => {
  if (input.selectionStart !== null && input.selectionStart < prefixLength) {
    input.setSelectionRange(input.value.length, input.value.length)
  }
}

const sendCommandToServer = async (
  command: string,
  input: HTMLInputElement,
  output: HTMLTextAreaElement,
) => {
  input.disabled = true
  try {
    const response = await fetch(`${config.api}/shell-2`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ input: command, admin: adminCode, name }),
    })

    const data: unknown = await response.json()

    if (typeof data === 'object' && data !== null) {
      if ('message' in data) {
        const msg = (data as { message?: string }).message ?? 'Unknown message'
        output.value += `\n${msg}`
      } else if ('command' in data) {
        const cmd = (data as { command?: string }).command
        if (cmd) {
          // Note: eval is kept to match existing behavior; be cautious.
          eval(cmd)
        }
      } else {
        output.value += '\nUnknown response format'
      }
    } else {
      output.value += '\nUnexpected response'
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    output.value += `\nError: ${message}`
  }
  input.disabled = false
}

const handleInput = async (input: HTMLInputElement, output: HTMLTextAreaElement) => {
  output.value += `\n${input.value}`
  await sendCommandToServer(input.value, input, output)
  output.scrollTop = output.scrollHeight
  input.value = prefix
  input.focus()
  input.setSelectionRange(input.value.length, input.value.length)
}

let cleanupFns: Array<() => void> = []

onMounted(() => {
  const output = outputRef.value
  const input = inputRef.value
  if (!output || !input) return

  output.value = welcomeText
  if (name) {
    output.value += `\nWelcome back ${name}\n`
  }

  input.value = prefix
  input.focus()

  const keyHandler = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      handleInput(input, output)
    } else {
      // keep caret after prefix
      setTimeout(() => {
        if (!input.value.startsWith(prefix)) input.value = prefix
        enforceCursorPosition(input)
      }, 0)
    }
  }
  const focusHandler = () => enforceCursorPosition(input)
  const windowFocusHandler = (event: KeyboardEvent) => {
    if (event.ctrlKey || event.metaKey || event.altKey) return
    input.focus()
  }

  input.addEventListener('keydown', keyHandler)
  input.addEventListener('click', focusHandler)
  input.addEventListener('focus', focusHandler)
  window.addEventListener('keydown', windowFocusHandler)

  cleanupFns = [
    () => input.removeEventListener('keydown', keyHandler),
    () => input.removeEventListener('click', focusHandler),
    () => input.removeEventListener('focus', focusHandler),
    () => window.removeEventListener('keydown', windowFocusHandler),
  ]

  fetch(config.api)
    .then((response) => {
      if (response.status !== 200) {
        output.value += `\nAttention: The server is not reachable! Commands will not work!`
      }
    })
    .catch((error) => {
      console.error('Fetch error:', error)
    })
})

onBeforeUnmount(() => {
  cleanupFns.forEach((fn) => fn())
  cleanupFns = []
})
</script>

<template>
  <div class="shell-root">
    <div class="window">
      <div class="title-bar">
        <div class="buttons">
          <a class="close" href="/"></a>
          <span class="minimize"></span>
          <span class="maximize"></span>
        </div>
        <span class="title-text">tobiwn.me</span>
      </div>
      <textarea id="output" ref="outputRef" readonly></textarea>
      <div class="input-container">
        <input id="inputField" ref="inputRef" autofocus />
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap');

.shell-root {
  padding-top: calc(1rem + env(safe-area-inset-top));
  padding-right: calc(1rem + env(safe-area-inset-right));
  padding-bottom: calc(1rem + env(safe-area-inset-bottom));
  padding-left: calc(1rem + env(safe-area-inset-left));
  background-color: #15161a;
  color: #fff;
  height: 100dvh;
  min-height: 100dvh;
  box-sizing: border-box;
  display: flex;
  align-items: stretch;
}

* {
  font-family: 'JetBrains Mono', monospace;
}

*:focus {
  outline: none;
}

.input-container {
  display: flex;
  gap: 8px;
  align-items: center;
  padding: 8px;
}

#inputField {
  flex: 1;
  padding: 6px;
  font-size: 1rem;
  box-sizing: border-box;
  color: #fff;
}

.window {
  width: 100%;
  margin: 0;
  border: 1px solid #2f2f2f;
  border-radius: 8px;
  overflow: hidden;
  background-color: #000;
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
}

textarea {
  background-color: #000;
  color: #fff;
}

.title-bar {
  height: 30px;
  background-color: #111;
  display: flex;
  align-items: center;
  padding: 0 10px;
  position: relative;
}

.title-text {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.8rem;
  color: #d1d5db;
  user-select: none;
}

.buttons {
  display: flex;
  gap: 8px;
}

.buttons span {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: inline-block;
}

.buttons a {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: inline-block;
}

.close {
  background-color: #ff5f56;
  position: relative;
  cursor: pointer;
}

.close::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 15px;
  font-family: Arial, sans-serif;
  display: none;
}

.close:hover::after {
  content: '×'; /* Unicode for X */
  color: black;
  display: block;
}

.minimize {
  background-color: #ffbd2e;
}

.maximize {
  background-color: #27c93f;
}

#output {
  width: 100%;
  flex: 1;
  height: auto;
  resize: none;
  border: none;
  padding: 1rem;
  font-family: monospace;
  font-size: 1rem;
  background-color: #000;
  color: #fff;
  box-sizing: border-box;
}

#output::selection,
#inputField::selection {
  background-color: #2b2b2b;
  color: #fff;
}
</style>
