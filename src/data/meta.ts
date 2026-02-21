export const createGlobalMeta = (currentUrl: string, imageUrl: string) => ({
  title: 'Tobias Klingenberg – Software Engineer & Computer Science Student',
  meta: [
    {
      name: 'description',
      content:
        'Portfolio of Tobias Klingenberg, Computer Science student at TUM. Projects in software engineering, web development, and system design.',
    },
    {
      name: 'keywords',
      content:
        'Tobias Klingenberg, Tobias Wen Klingenberg, TWK, software engineer, computer science, TUM, portfolio',
    },
    {
      name: 'author',
      content: 'Tobias Klingenberg',
    },
    {
      property: 'image',
      content: imageUrl,
    },
    {
      property: 'og:title',
      content: 'Tobias Klingenberg – Portfolio',
    },
    {
      property: 'og:description',
      content:
        'Personal portfolio of Tobias Klingenberg, showcasing software engineering and computer science projects.',
    },
    {
      property: 'og:type',
      content: 'website',
    },
    {
      property: 'og:url',
      content: currentUrl,
    },
    {
      property: 'og:image',
      content: imageUrl,
    },
    {
      property: 'og:image:alt',
      content: 'Tobias Klingenberg — profile photo',
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image',
    },
    {
      name: 'twitter:title',
      content: 'Tobias Klingenberg – Portfolio',
    },
    {
      name: 'twitter:description',
      content: 'Portfolio of Tobias Klingenberg, Computer Science student at TUM.',
    },
    {
      name: 'twitter:image',
      content: imageUrl,
    },
  ],
  link: [
    {
      rel: 'canonical',
      href: currentUrl,
    },
    {
      rel: 'image_src',
      href: imageUrl,
    },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'ProfilePage',
        name: 'Tobias Klingenberg',
        url: currentUrl,
        dateCreated: '2024-12-23T12:34:00-05:00',
        dateModified: '2025-03-27T14:53:00-05:00',
        mainEntity: {
          '@type': 'Person',
          name: 'Tobias Klingenberg',
          alternateName: 'tobikli',
          identifier: 'tobiwn',
          description: 'CS Student at TUM, Software Engineer',
          image: imageUrl,
          sameAs: ['https://www.linkedin.com/in/klingenberg', 'https://github.com/tobikli'],
          interactionStatistic: [
            {
              '@type': 'InteractionCounter',
              interactionType: 'https://schema.org/FollowAction',
              userInteractionCount: 1,
            },
            {
              '@type': 'InteractionCounter',
              interactionType: 'https://schema.org/LikeAction',
              userInteractionCount: 5,
            },
          ],
          agentInteractionStatistic: {
            '@type': 'InteractionCounter',
            interactionType: 'https://schema.org/WriteAction',
            userInteractionCount: 2346,
          },
        },
      }),
    },
  ],
})
