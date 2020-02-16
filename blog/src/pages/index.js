import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'
import "../styles/global.css"  

const IndexPage = ({ data }) => (
  <Layout>
    <div>Render Map Box Components here </div>

    <Link to="/blog/">All BLog Post</Link>
  </Layout>
)

export default IndexPage

export const pageQuery = graphql`  
  query IndexQuery {
    allStrapiArticle {
      edges {
        node {
          id
          image {
            childImageSharp {
              fixed(width: 200, height: 125) {
                ...GatsbyImageSharpFixed
              }
            }
          }
          title
          content
        }
      }
    }
  }
`