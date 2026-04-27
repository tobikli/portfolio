
export const config = {
  url: import.meta.env.VITE_BASE_URL ||  'https://localhost:5173',
  github: import.meta.env.VITE_GITHUB_URL || "https://github.com",
  version: import.meta.env.VITE_SITE_VERSION || '1.0.0',
  api: import.meta.env.VITE_API_URL || 'https://localhost:5173/api',
}
