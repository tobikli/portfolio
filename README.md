# Portfolio
[![Build Vite App](https://github.com/tobikli/portfolio/actions/workflows/build.yml/badge.svg)](https://github.com/tobikli/portfolio/actions/workflows/build.yml)

Clean, animated personal portfolio built with Vue 3 + Vite. Content lives in simple Markdown files and a few small data helpers, so you can update sections without touching components.

> **_NOTE:_**  My live version of this site can be found here: [tobiwn.me](https://tobiwn.me)

## Features
- Modern Vue 3 + Vite setup with motion and custom cursor details
- Content-first: projects, education, work, and publications pulled from Markdown
- Easy theming with Tailwind-style utility classes and light/dark support
- Popup-driven detail views for projects, CV, and publications (PDF preview included)

## Quickstart
```bash
npm install
npm run dev
```

Recommended: Node 20 (package.json engines covers ^20.19.0 or >=22.12.0).

## Customization
- Edit content in Markdown under src/content (projects, education, work, publications). Entries are ordered by filename, so use numeric prefixes (e.g., 05-latest.md … 01-oldest.md) to keep newest first.
- Adjust small data helpers in src/data if you add new fields. Components read from those typed loaders.
- Assets like PDFs for publications live in src/assets/papers; reference filenames in the Markdown frontmatter.

> **_NOTE:_**  More information on customization [is here](src/data/README.md)

## Scripts
- Development: npm run dev
- Type-check: npm run type-check
- Build: npm run build
- Preview build: npm run preview

## Environment
- VITE_GIT_HASH and VITE_GIT_BRANCH are set automatically by the npm scripts for build metadata; you normally do not need to set them manually.
- SET VITE_BASE_URL as your site URL and VITE_GITHUB_URL as the repository hosting your instance

## Tech Stack
- Vue 3, Vite, TypeScript
- motion-v for animations
- @tato30/vue-pdf for inline PDF previews
- gray-matter for parsing Markdown content
