import React from 'react'
import { Link } from 'gatsby'
import styled from '@emotion/styled'
import { Styled } from 'theme-ui'
import {Container} from 'theme-ui'

import SEO from '../components/seo'


export default (props) => {
  const tags = props.tags
  const basePath = props.basePath.path
  return (
      <>
        <SEO title="Tags" />
        <Container>
            <h1>Tags</h1>
            {tags ? tags.map(( tag, index) => (
              <div key={index}>
                <Styled.a as={Link} to={`${basePath}/${tag}`}>
                  <TagTitle>{tag} </TagTitle>
                </Styled.a>
              </div>
            )): null }
        </Container>
      </>
  )
}

const TagTitle = styled.h3`
  display: inline;
  border-radius: 1em 0 1em 0;
  margin-bottom: 10px;
`