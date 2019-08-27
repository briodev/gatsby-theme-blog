import React from "react"
import { Link, graphql } from 'gatsby';
import {Container} from 'theme-ui'
import Layout from '../layouts/default-page-layout'

const Tags = ({ pageContext, data }) => {
  const tag = pageContext.tag
  const tagsPath = pageContext.tagsPath
  const { edges, totalCount } = data.allBlogPost
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? "" : "s"
  } tagged with "${tag}"`

  return (
    <Layout>
      <Container>
      <h1>{tagHeader}</h1>
      <ul>
        {edges.map(({ node }) => {
          const slug  = node.slug
          const title = node.title
          return (
            <li key={slug}>
              <Link to={`${slug}`}>{title}</Link>
            </li>
          )
        })}
      </ul>
      <Link to={tagsPath}>All tags</Link>
      </Container>
    </Layout>
  )
}


export default Tags

export const pageQuery = graphql`
  query($tag: String) {
    allBlogPost(filter: {tags: {in: [$tag]}}) {
      edges {
        node {
          slug
          title
          tags
          excerpt
        }
      }
      totalCount
    }
  }
`