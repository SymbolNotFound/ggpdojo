import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "GGP Dojo",
  description: "Training for a General Game Player",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' }
      //, { text: 'github', link: 'https://github.com/SymbolNotFound/ggpdojo' }
    ],

    sidebar: [
      {
        text: 'GDL',
        items: [
        ]
      },
      {
        text: 'Zillions',
        items: [
        ]
      },
      {
        text: 'Ludii',
        items: [
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/SymbolNotFound/ggpdojo' }
    ]
  }
})
