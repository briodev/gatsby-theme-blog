import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Layout from '../layouts/default-page-layout';
import TagList from '../components/tag-list';

const TagsTemplate = ( path ) => {
  const data = useStaticQuery(graphql`
    query PostTagsQuery {
      allBlogPost(sort: { fields: [date, title], order: DESC }, limit: 1000) {
        edges {
          node {
            tags
          }
        }
      }
    }
  `)

  const posts = data.allBlogPost.edges
  const tagsPath = path

  function getUniqueTags() {
    let tags = []
    posts.forEach(({node}) => {
      node.tags.forEach(tag => {
        tags.push(tag)
      })
    });
    const uniqueTags = [...new Set(tags)]
    return uniqueTags
  }

  const tagsList = getUniqueTags()

  return (
    <Layout>
      <TagList posts={posts} tagsPath={tagsPath} tags={tagsList}/>
    </Layout>
  )
}

export default TagsTemplate
