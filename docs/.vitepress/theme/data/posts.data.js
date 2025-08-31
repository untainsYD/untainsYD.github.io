import { createContentLoader } from 'vitepress'

export default createContentLoader('posts/**/*.md', {
  includeSrc: false,
  render: false,
  excerpt: false,
  transform(rawData) {
    return rawData
      .filter(page => page.url !== '/posts/')
      .map(page => ({
        title: page.frontmatter.title || page.url.split('/').pop().replace('.html', ''),
        url: page.url,
        description: page.frontmatter.description || page.excerpt || '',
        date: page.frontmatter.date || new Date().toISOString(),
        tags: page.frontmatter.tags || []
      }))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5)
  }
})
