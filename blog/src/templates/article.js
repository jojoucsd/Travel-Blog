import React from 'react'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../components/layout' 
import ReactMarkdown from "react-markdown"

const ArticleTemplate = ({ data }) => {

  console.log("template", data.strapiArticle.images[0])
  console.log("image", data.strapiArticle.image)

  return (
  <Layout>
    <h1>{data.strapiArticle.title}</h1>
    <p>by <Link to={`/authors/User_${data.strapiArticle.author.id}`}>{data.strapiArticle.author.username}</Link></p>
    <Img fluid={data.strapiArticle.image.childImageSharp.fluid}/>
    <ReactMarkdown 
      source={data.strapiArticle.content.substring(0,400).concat(" ...")}
      transformImageUri={uri => uri.startsWith('http') ? uri: `${process.env.IMAGE_BASE_URL}${uri}`} 
      className="articleContent"
      escapeHtml={false}
    />
  </Layout>
)
}

export default ArticleTemplate

export const query = graphql`
  query ArticleTemplate($id: String!) {
    strapiArticle(id: {eq: $id}) {
      title
      content
      image {
        childImageSharp {
            fluid(maxWidth: 960) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      author {
        id
        username
      }
      images {
        id
      }
    }
  }
`