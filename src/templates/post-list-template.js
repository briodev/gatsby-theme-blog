import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Layout from '../layouts/default-page-layout';
import PostList from '../components/post-list';

const PostsTemplate = (path) => {
  const data = useStaticQuery(graphql`
    query PostsQuery {
      site {
        siteMetadata {
          title
          social {
            name
            url
          }
        }
      }
      allBlogPost(sort: { fields: [date, title], order: DESC }, limit: 1000) {
        edges {
          node {
            id
            excerpt
            slug
            title
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  `)

  const posts = data.allBlogPost.edges
  const basePath = path || '/blog';
  return (
    <Layout>
      <PostList posts={posts} basePath={basePath}/>
    </Layout>
  )
}

export default PostsTemplate
