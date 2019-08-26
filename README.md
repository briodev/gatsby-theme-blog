## Add a blog to your Gatsby site

```
npm install @briodev/gatsby-theme-blog
or
yarn add @briodev/gatsby-theme-blog

```

### Add to gatsby-config.js

```

module.exports = {
  siteMetadata: {
    title: `BrioDev Blog Theme`,
    description: `A simple starter blog with image and SEO`,
    keywords: ['BrioDev', 'Gatsby Blog', 'Gatsby Theme' ],
    siteUrl: 'https://brio.dev',
    twitter: {
      site: '@briodev',
      creator: '@briodev' //This can be overwritten in SEO by the author frontmatter
    },
    author: `BrioDev - https://brio.dev`,
  },
  plugins: [
    {
      resolve: "@briodev/gatsby-theme-blog",
      options: {
        contentPath: "src/content/blog-posts",
        basePath: "/blog",
        tagsPath: "/categories"
      }
    },

  ]
}

```