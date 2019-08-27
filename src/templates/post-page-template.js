import React from "react"
import { graphql } from "gatsby"
import MDXRenderer from "gatsby-plugin-mdx/mdx-renderer"
import styled from '@emotion/styled'
import Img from 'gatsby-image'
import Layout from '../layouts/default-page-layout'
import PreviousNext from '../components/previousNext'
import SEO from '../components/seo'


export default ({data}) => {
  const post = data.blogPost
  const site = data.site.siteMetadata
  
  const image = post.headerImage ? post.headerImage.childImageSharp.fluid : null
  const description = post.description || site.description
  const keywords = post.keywords || site.keywords
  const canonical = post.canonical ? `${post.canonical}` : `${site.siteUrl}${post.slug}` || site.siteMetadata.siteUrl
  const twitterCreator = post.twitterCreator || site.twitter.creator

  const previous = data.previous
  const next = data.next

  return (
    <>
    <SEO 
      canonical={canonical}
      title = {post.title}
      description = {description}
      keywords = {keywords}
      image = {image}
      twitterCreator = {twitterCreator}
      slug = {post.slug}
      />
      <Layout>
        <HeaderImage>{ image ? (<Img fluid={image} />):null }</HeaderImage>
        <PostWrapper>
          <Heading>{post.title}</Heading>

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
  query PostPageQuery($id: String!, $previousId: String, $nextId: String) {
    site {
      siteMetadata {
        siteUrl
        title
        description
        keywords
        twitter {
          creator
        }
      }
    }
    blogPost(id: { eq: $id }) {
      id
      excerpt
      body
      slug
      title
      description
      headerImage {
          childImageSharp {
            fluid(maxWidth: 1920, quality: 90) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      tags
      keywords
      canonical
      date(formatString: "MMMM DD, YYYY")
    }
    previous: blogPost(id: { eq: $previousId }) {
      id
      excerpt
      slug
      title
      date(formatString: "MMMM DD, YYYY")
    }
    next: blogPost(id: { eq: $nextId }) {
      id
      excerpt
      slug
      title
      date(formatString: "MMMM DD, YYYY")
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