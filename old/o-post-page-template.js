import React from "react"
import { graphql } from "gatsby"
import MDXRenderer from "gatsby-plugin-mdx/mdx-renderer"
import styled from '@emotion/styled'
import Img from 'gatsby-image'
import Layout from '../layouts/default-page-layout'
import PreviousNext from '../components/previousNext'
import SEO from '../components/seo'


export default ({data, pageContext}) => {
  const post = data.mdx
  let image = null
  if(post.frontmatter.headerImage) {
    image = post.frontmatter.headerImage.childImageSharp.fluid
  }

  const isArticle = post.frontmatter.article || false
  const previous = pageContext.previous
  const next = pageContext.next

  return (
    <>
    <SEO 
      canonical={post.frontmatter.canonical}
      title = {post.frontmatter.title}
      description = {post.frontmatter.description}
      keywords = {post.frontmatter.keywords}
      image = {image}
      article = {isArticle}
      twitterCreator = {post.frontmatter.twitterCreator}
      slug = {post.fields.slug}
      />
      <Layout>
        <HeaderImage>{ image ? (<Img fluid={image} />):null }</HeaderImage>
        <PostWrapper>
          <Heading>{post.frontmatter.title}</Heading>

          <Body>
            <MDXRenderer>{post.body}</MDXRenderer>
          </Body>

        </PostWrapper>
        <PreviousNext previous={previous} next={next} />
      </Layout>
    </>
  )
}

export const pageQuery = graphql`
  query BlogPostQuery($id: String) {
    mdx(id: { eq: $id }) {
      id
      fields {
        slug
      }
      frontmatter {
        canonical
        title
        description
        keywords
        article
        twitterCreator
        headerImage {
          childImageSharp {
            fluid(maxWidth: 1920, quality: 90) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      body
    }
  }
`

const PostWrapper = styled.div`
  display: grid;
  grid-template-columns: minmax(1.2rem, 1fr) minmax(auto, 3fr) minmax(1.2rem, 1fr);
`

const Heading = styled.h1`
  grid-column: 2;
`

const Body = styled.article`
  font-family: -apple-system, BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
  grid-column: 2;
`


const HeaderImage = styled.div`
  max-width: 1650px;
  height: auto;
  margin: 0 auto;
  margin-bottom: 3em;
`