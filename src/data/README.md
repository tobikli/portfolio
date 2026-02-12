# Portfolio Data

Files in this folder configure the portfolio site. To configure it to you needs, consider the following:

- Set the needed env variables, as seen in __config.ts__
- Add your education stages, with rising index, as .MD files in the __content/education__ folder, follow the meta tags as seen in the examples
- Add your work experience stages, with rising index, as .MD files in the __content/work__ folder, follow the meta tags as seen in the examples
- Add your projects, with rising index, as .MD files in the __content/projects__ folder, follow the meta tags as seen in the examples
- Configure __informations.ts__ too your personal information. The section in the about section is defined by the *about(Site)Html* variables
- If you need a SEO optimized page, configure the __meta.ts__ file with your information


- If you want to add a new section, create a new __View.vue__ and add it to the __sections.ts__, so it will automatically be added to site and header

> **_NOTE:_**  Don't forget to modify the files in __@/assets__, especially the __cv.pdf__, the logos, and your profile photo in __@/assets/images__

> **_NOTE:_**  Make clear, where the source of this portfolio comes from, e.g. a mention and link to this repo