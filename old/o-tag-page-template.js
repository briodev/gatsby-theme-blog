import React from "react"
import PropTypes from "prop-types"
import {Container} from 'theme-ui'
import Layout from '../layouts/default-page-layout'

// Components
import { Link, graphql } from "gatsby"

const Tags = ({ pageContext, data }) => {
  const tag = pageContext.tag
  const basePath = pageContext.basePath
  const tagsPath = pageContext.tagsPath
  const { edges, totalCount } = data.allMdx
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? "" : "s"
  } tagged with "${tag}"`

  return (
    <Layout>
      <Container>
      <h1>{tagHeader}</h1>
      <ul>
        {edges.map(({ node }) => {
          const { slug } = node.fields
          const { title } = node.frontmatter
          return (
            <li key={slug}>
              <Link to={`${basePath}/${slug}`}>{title}</Link>
            </li>
          )
        })}
      </ul>
      <Link to={tagsPath}>All tags</Link>
      </Container>
    </Layout>
  )
}

Tags.propTypes = {
  pageContext: PropTypes.shape({
    tag: PropTypes.string.isRequired,
    basePath: PropTypes.string.isRequired,
  }),
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
            }),
            fields: PropTypes.shape({
              slug: PropTypes.string.isRequired,
            }),
          }),
        }).isRequired
      ),
    }),
  }),
}

export default Tags

export const pageQuery = graphql`
  query($tag: String) {
    allMdx(
      limit: 1000,
      sort: {fields: frontmatter___date, order: DESC}, 
      filter: {frontmatter: {tags: {in: [$tag]}}}, 
    ) {
      totalCount
      edges {
        node {
          frontmatter {
            title
          }
          fields {
            slug
          }
        }
      }
    }
  }
`