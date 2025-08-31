import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "untainsYD blog",
  description: "Yaroslav Doroshenko - Software Engineer & Functional Programming Enthusiast",
  base: "/untainsYD.github.io/",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Posts', link: '/posts' }
    ],

    sidebar: [
      {
        text: 'Posts',
        items: [
          { text: 'All Posts', link: '/posts' },
          { text: 'Google Summer of Code 2025', link: '/posts/gsoc25' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/untainsYD' }
    ],

    lastUpdated: true,
  },
})
