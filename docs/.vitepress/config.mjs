import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: 'untainsYD blog',
    description:
        'Yaroslav Doroshenko - Software Engineer & Functional Programming Enthusiast',

    // base: '/',

    ignoreDeadLinks: true,

    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        outline: {
            level: [2, 3],
            label: 'Table of content'
        },
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Posts', link: '/posts/' },
        ],

        sidebar: [
            {
                text: 'Posts',
                items: [
                    { text: 'All Posts', link: '/posts/' },
                    {
                        text: 'Google Summer of Code 2025',
                        link: '/posts/gsoc25/',
                    },
                ],
            },
        ],

        socialLinks: [{ icon: 'github', link: 'https://github.com/untainsYD' }],

        lastUpdated: true,
    },
});
