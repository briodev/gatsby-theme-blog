import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Layout from '../layouts/default-page-layout';
import PostList from '../components/post-list';

const PostsTemplate = (path) => {
  const data = useStaticQuery(graphql`
    query {
      allMdx(
        sort: {order: DESC, fields: frontmatter___date}
        filter: {frontmatter: {article: {eq: true}}}
        ) {
        edges {
          node {
            id
            frontmatter {
              title
              draft
              date(formatString: "MMMM Do YYYY")
            }
            fields {
              slug
            }
            excerpt
            timeToRead
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
    }
  `)

  const posts = data.allMdx.edges
  const basePath = path;
  return (
    <Layout>
      <PostList posts={posts} basePath={basePath}/>
    </Layout>
  )
}

export default PostsTemplate
