// Global, crawler-critical meta (title, description, Open Graph, Twitter,
// JSON-LD) lives statically in index.html so it is present in the raw HTML that
// search engines and social scrapers read without executing JavaScript.
//
// This runtime layer only handles what genuinely depends on the current route:
// the canonical URL and og:url. Keeping it minimal avoids injecting duplicate
// meta tags on top of the static ones.
export const createGlobalMeta = (currentUrl: string) => ({
  meta: [
    {
      property: 'og:url',
      content: currentUrl,
    },
  ],
  link: [
    {
      rel: 'canonical',
      href: currentUrl,
    },
  ],
})
