import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Layout from '../layouts/default-page-layout';
import TagList from '../components/tag-list';

const TagsTemplate = (path) => {
  const data = useStaticQuery(graphql`
    query {
      allMdx {
        distinct(field: frontmatter___tags)
      }
    }
  `)

  const tags = data.allMdx.distinct
  return (
    <Layout>
      <TagList tags={tags} basePath={path}/>
    </Layout>
  )
}

export default TagsTemplate