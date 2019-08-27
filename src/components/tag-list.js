import React from 'react'
import { Link } from 'gatsby'
import styled from '@emotion/styled'
import { Styled } from 'theme-ui'
import {Container} from 'theme-ui'

import SEO from '../components/seo'

export default (props) => {
  const tagsPath = props.tagsPath.path
  const tags = props.tags
  return (
      <>
        <SEO title="Tags" />
        <Container>
          <h1>Tags</h1>

          {tags ? tags.map( (tag, index) => (
            <div key={index}>
              <Styled.a as={Link} to={`${tagsPath}/${tag}`}>
                <Title>{tag}</Title>
              </Styled.a>
            </div>
          )): null }

        </Container>
      </>
  )
}


const Title = styled.h3`
  font-weight: 500;
`