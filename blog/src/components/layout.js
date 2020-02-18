import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import "./layout.css"

const mapStyle ={
  margin: `0 auto`,
  // maxWidth: 960,
  // padding: `0 1.0875rem 1.45rem`,
}
const blogStyle={
    margin: `0 auto`,
    maxWidth: 960,
    padding: `0 1.0875rem 1.45rem`,
  }
const Layout = ({ children, content }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} content={content}/>
      <div
        style={content =='map' ? mapStyle : blogStyle }
      >
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a> and {" "}
          <a href="http://strapi.io">Strapi</a>
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  content: PropTypes.string,
}

export default Layout
