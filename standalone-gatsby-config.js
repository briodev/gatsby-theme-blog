module.exports = {
    siteMetadata: {
      title: `BrioDev Starter Theme`,
      description: `Kick off your next, great Gatsby project with this default theme. This barebones starter ships with the main Gatsby configuration files you might need.`,
      author: `@briodev`,
    },
    plugins: [
      `gatsby-plugin-react-helmet`,
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: `posts`,
          path: `${__dirname}/src/data`,
        },
      },
      'gatsby-plugin-sharp',
      'gatsby-transformer-sharp',
      {
        resolve: `gatsby-transformer-remark`,
        options: {
          plugins: [ `gatsby-remark-images` ],
        },
      },
      {
        resolve: `gatsby-plugin-mdx`,
        options: {
          extensions: [`.mdx`, `.md`],
          gatsbyRemarkPlugins: [
            {
              resolve: `gatsby-remark-images`,
              options: {
                maxWidth: 1090,
              },
            },
          ],
          defaultLayouts: {
            posts: require.resolve("./src/templates/post-layout.js"),
            default: require.resolve("./src/layouts/default-page-layout.js"),
          },
        },
      },
    ],
  }