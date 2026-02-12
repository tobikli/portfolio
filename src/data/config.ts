
export const config = {
  url: import.meta.env.VITE_BASE_URL ||  'https://localhost:5173',
  github: import.meta.env.VITE_GITHUB_URL || "https://github.com",
  commit: import.meta.env.VITE_GIT_HASH || 'latest',
  branch: import.meta.env.VITE_GIT_BRANCH || 'local'
}
