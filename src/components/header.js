import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Link } from "gatsby"
import styled from "@emotion/styled"
import PropTypes from "prop-types"


const Header = ({ siteTitle }) => {

  const data = useStaticQuery(graphql`
    query PathQuery {
      sitePlugin(name: {eq: "@briodev/gatsby-theme-blog"}) {
        pluginOptions {
          basePath
          tagsPath
        }
      }
    }
  `)
  const basePath = data.sitePlugin.pluginOptions.basePath
  const tagsPath = data.sitePlugin.pluginOptions.tagsPath
  
  return (
  <SiteHeader>
    <Content>
      <p>
        <HomeLink to="/">{siteTitle}</HomeLink>
        <NavLink to={basePath}>Blog</NavLink>
        <NavLink to={tagsPath}>Tags</NavLink>
        <ExtLink href="https://github.com/briodev/">GitHub</ExtLink>
      </p>
    </Content>
  </SiteHeader>
)}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header



const Content = styled.div`
  max-width: 860px;
  padding: 1rem 1.0875rem;
  font-size: 1.2rem;
`

const NavLink = styled(Link)`
  color: black;
  margin-left: 1em;
  text-decoration: none;
  display: inline-block;
  position: relative;

  ::after {
    content: "";
    position: absolute;
    width: 100%;
    transform: scaleX(0);
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.8);
    transform-origin: bottom right;
    transition: transform 0.4s cubic-bezier(0.86, 0, 0.07, 1);
  }

  :hover::after {
    transform: scaleX(1);
    transform-origin: bottom left;
  }
`

const ExtLink = styled.a`
  color: black;
  margin-left: 1em;
  text-decoration: none;
  display: inline-block;
  position: relative;

  ::after {
    content: "";
    position: absolute;
    width: 100%;
    transform: scaleX(0);
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.8);
    transform-origin: bottom right;
    transition: transform 0.4s cubic-bezier(0.86, 0, 0.07, 1);
  }

  :hover::after {
    transform: scaleX(1);
    transform-origin: bottom left;
  }
`

const HomeLink = styled(NavLink)`
  margin-left: 0;
`

const SiteHeader = styled.header`
  background: transparent;
  display: flex;
  align-content: center;
  justify-content: center;
`
