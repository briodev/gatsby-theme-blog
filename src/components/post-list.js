import React from 'react'
import { Link } from 'gatsby'
import styled from '@emotion/styled'
import { Styled } from 'theme-ui'
import {Container} from 'theme-ui'

import SEO from '../components/seo'

const ArticleDate = styled.h5`
  display: inline;
  color: #606060;
  margin-bottom: 10px;
`

const PostTitle = styled.h3`
  display: inline;
  border-radius: 1em 0 1em 0;
  margin-bottom: 10px;
`

const ReadingTime = styled.h5`
  display: inline;
  color: #606060;
  margin-bottom: 1em;
  margin-left: .5em;
`

const Excerpt = styled.div`
    margin: 1em 0 2em 0;
    font-family: -apple-system, BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
`


export default (props) => {
  const posts = props.posts
  const basePath = props.basePath.path
  return (
      <>
        <SEO title="Blog" />
        <Container>
            <h1>Blog</h1>
            {posts ? posts.map(({ node }) => (
              <div key={node.id}>
                <Styled.a as={Link} to={`${basePath}${node.fields.slug}`}>
                  <PostTitle>{node.frontmatter.title} </PostTitle>
                </Styled.a>
                <div>
                  <ArticleDate>{node.frontmatter.date}</ArticleDate>
                  <ReadingTime>&nbsp;-&nbsp;{node.timeToRead}&nbsp;min read</ReadingTime>
                </div>
                <Excerpt>{node.excerpt}</Excerpt>
              </div>
            )): null }
          </Container>
      </>
  )
}