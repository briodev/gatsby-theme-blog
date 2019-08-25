const fs = require("fs")
const path = require(`path`)
const mkdirp = require(`mkdirp`)
const Debug = require(`debug`)
const { createFilePath } = require('gatsby-source-filesystem')

const debug = Debug(`gatsby-theme-blog-core`)
const withDefaults = require(`./utils/default-options`)

// Make sure the data directory exists
exports.onPreBootstrap = ({ store, reporter }, themeOptions) => {
  const { program } = store.getState()
  const { contentPath } = withDefaults(themeOptions)

  const dirs = [
    path.join(program.directory, contentPath),
  ]

  dirs.forEach(dir => {
    debug(`Initializing ${dir} directory`)
    if (!fs.existsSync(dir)) {
      mkdirp.sync(dir)
    }
  })
}


exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  // We only want to operate on `Mdx` nodes. If we had content from a
  // remote CMS we could also check to see if the parent node was a
  // `File` node here
  if (node.internal.type === "Mdx") {
    const value = createFilePath({ node, getNode })

    createNodeField({
      // Name of the field you are adding
      name: "slug",
      // Individual MDX node
      node,
      // Generated value based on filepath with "blog" prefix. We
      // don't need a separating "/" before the value because
      // createFilePath returns a path with the leading "/".
      value: `${value}`,
    })
  }
}

// Query graphQl and create pages (async)
exports.createPages = async ({ graphql, actions }, themeOptions) => {
  const { contentPath, basePath, tagsPath } = withDefaults(themeOptions)
  const { createPage } = actions

  const result = await graphql(`
    {
      mdxBlogPosts: allMdx (
        sort: {order: DESC, fields: frontmatter___date}
        filter: {frontmatter: {article: {eq: true}}}
      ){
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              title
            }
            parent {
              ... on File {
                name
                base
                relativePath
                sourceInstanceName
              }
            }
          }
        }
      }
      mdxBlogTags: allMdx {
        distinct(field: frontmatter___tags)
      }
    }
  `);

  if(result.errors) {
    reporter.panic('error loading content', reporter.errors);
    return
  }

  //Create tag list page
  createPage({
    path: tagsPath,
    component: require.resolve('./src/templates/tag-list-template.js'),
  });
  //Create individual tag pages
  const{ mdxBlogTags } = result.data
  const distictTags = mdxBlogTags.distinct
  distictTags.forEach(tag => {
    createPage({
      path: `${tagsPath}/${tag}`,
      component: require.resolve(`./src/templates/tag-page-template.js`),
      context: {
        tag: tag,
        basePath: basePath,
        tagsPath: tagsPath
      },
    })
  })

  //Create blog post list page
  createPage({
    path: basePath,
    component: require.resolve('./src/templates/post-list-template.js'),
  });

  //Create individual blog pages
  const { mdxBlogPosts } = result.data
  const blogPosts = mdxBlogPosts.edges.filter(
    ({ node }) => node.parent.sourceInstanceName === `${contentPath}`
  )

  blogPosts.forEach(({ node }, index) => {
    const previous = index === blogPosts.length - 1 ? null : blogPosts[index + 1]
    const next = index === 0 ? null : blogPosts[index - 1]

    createPage({
      // This is the slug we created before
      // (or `node.frontmatter.slug`)
      path: `/${basePath}/${node.fields.slug}`.replace(/\/\/+/g, "/"),
      // This component will wrap our MDX content
      component: require.resolve(`./src/templates/post-page-template.js`),
      // We can use the values in this context in
      // our page layout component
      context: { 
        id: node.id,
        slug: node.fields.slug,
        title: node.frontmatter.title,
        previous: previous ? ({
          title: previous.node.frontmatter.title,
          path: `/${basePath}/${previous.node.fields.slug}`.replace(/\/\/+/g, "/")
        }) : null,
        next:  next ? ({
          title: next.node.frontmatter.title,
          path: `/${basePath}/${next.node.fields.slug}`.replace(/\/\/+/g, "/")
        }) : null
      },
    })
  })
}